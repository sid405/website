---
title: "Topographic Line Art with WebGL"
excerpt: "I'm really happy with the way my landing page's background came out, here's how I built it"
date: "August 24, 2021"
tags: [graphics, webgl]
draft: false
---

I've been seeing this art style _everywhere_, especially in brandings. When I started planning out this blog on Figma, I had to give it a shot. I didn't really want a static image (I tried it, and it looked really dull). Here's how it is built:

![Finished product against real page](/webgl-topographic/final.png)

BTW the source of this website is open, so you can look at the final result [here](https://github.com/madebysid/website/blob/6ef63d6694e0530fa5f5d2a68097fa7597bd3880/lib/canvas/canvas.ts). If you're totally new to 3D graphics, I'd recommend doing some research before you dig into this!

The first thing I did was research; how were designers making this? It seemed too complex to build out by hand, and yet too organized to be random. It had to be procedurally generated, right? I found [this tutorial](https://www.youtube.com/watch?v=S_vZ-TAAg3c&t=313s), among others. The general idea seemed to be to start with some Perlin noise, blur it, adjust levels to increase contrast, and then detect edges. We're not _quite_ doing that, but we'll go a similar route.

[three.js](https://threejs.org/) is synonymous with WebGL, so we'll start there. I set up a simple scene with an orthographic camera and a single plane. The camera's `left` / `right` / `top` / `bottom` parameters were set so that the plane was the only thing you saw, and it spanned the entire screen. Next up, we'll give this plane a `ShaderMaterial` (remember to set the material's `side` parameter to `DoubleSide`), and wire up simple vertex & fragment shaders that do nothing. The vertex shader does the standard world-space to screen-space conversion:

```glsl
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

and the fragment shader sets a static color for all fragments:

```glsl
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0)
}
```

If everything went well, you should see a red canvas on your screen.

---

Alright, moving on to the cool stuff: let's create some Perlin noise. Now, we could do this on the JS side of things (on the CPU), but since we plan on animating the noise, doing this would get expensive real quick, especially for large screen sizes. So we'll do this on the GPU. You should never have to write a Perlin noise function from scratch, so I went out [looking for one](https://github.com/ashima/webgl-noise/blob/master/src/noise3D.glsl). From there, it was a matter of copying the whole thing to my fragment shader, and using the `snoise` function's return value to generate the fragment color:

```glsl
void main() {
  float noise = snoise(vec3(gl_FragCoord.xy, 1.0));
  gl_FragColor = vec4(vec3(noise), 1.0);
}
```

You won't see much yet, because the noise is far too small. Let's multiply `gl_FragCoord.xy` by `0.005` to "zoom in" a little:

![Noise-only fragment shader](/webgl-topographic/frag1.png)

You might notice that there's more black than white though, and that's because our `snoise` function returns values between 1 & -1. Fragment shader output is clipped to be between 0 & 1, so we'll need to "normalize" it. Normalizing is just fancy talk for scaling a value from whatever range to between 0 & 1.

```glsl
void main() {
  float noise = snoise(vec3(gl_FragCoord.xy, 1.0)); // get noise
  noise = (noise + 1.0) / 2.0; // normalize it
  gl_FragColor = vec4(vec3(noise), 1.0);
}
```

![Normalized, noise-only fragment shader](/webgl-topographic/frag2.png)

Next up, we want to change the noise so that it isn't continuous like that. We want "bands" of colors. This is exactly what [posterization](https://www.adobe.com/creativecloud/photography/discover/posterize-photo.html) is. A lot of graphics programming is kinda just knowing _exactly_ what you want to do I've realized, especially for beginners. [This](https://lettier.github.io/3d-game-shaders-for-beginners/posterization.html) is a great resource for learning about posterization (and tons of other stuff). I've also written a small [post](/posts/posterization) describing it, so I won't go into too much detail.

Let's posterize:

```glsl
void main() {
  float noise = snoise(vec3(gl_FragCoord.xy * 0.005, 0.0));
  noise = (noise + 1.0) / 2.0; // normalize it

  float levels = 5.0;
  float lower = floor(noise * levels) / levels;
  float lowerDiff = abs(noise - lower);
  float upper = ceil(noise * levels) / levels;
  float upperDiff = abs(upper - noise);

  float color = lowerDiff <= upperDiff ? lower : upper;

  gl_FragColor = vec4(color, color, color, 1.0);
}
```

![Normalized, posterized noise-only fragment shader](/webgl-topographic/frag3.png)

Hey, now we're getting there! What we want though aren't bands of colors, we want the _edges_ of these bands of colors. Instead of implementing a fancy edge detection algorithm, we can use the fact that posterization just rounds colors to the nearest (upper or lower) band color. **A band's edge is any pixel where this rounding error is less than 0.01 (or any threshold)**. Let's try that out:

```glsl
void main() {
  float noise = snoise(vec3(gl_FragCoord.xy * 0.005, 0.0));
  noise = (noise + 1.0) / 2.0; // normalize it

  float levels = 5.0;
  float lower = floor(noise * levels) / levels;
  float lowerDiff = abs(noise - lower);
  float upper = ceil(noise * levels) / levels;
  float upperDiff = abs(upper - noise);

  if(lowerDiff <= 0.01) {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  } else if(upperDiff <= 0.01) {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
}
```

![Edges of posterized noise](/webgl-topographic/frag4.png)

There we go! We could end here, but there are a few obvious performance improvements we can make here. For one, we don't need to check for the difference between _both_ the upper and lower bounds. This is because the "bands" share an edge. Finding one means we've found the other.

Also, instead of painting a fragment black, we can just discard it, or tell WebGL to not paint it at all. This also has the advantage that our final material becomes transparent. You'll have to enable `alpha` in the `WebGLRenderer` constructor call to see this.

And with that, here's our final shader:

```glsl
void main() {
  // `levels` is the number of distinct "bands" you want
  float levels = 10.0;

  float noise = snoise(vec3(gl_FragCoord.xy * 0.005 , 0.0)); // get noise value
  noise = (noise + 1.0) / 2.0; // normalize it

  float lower = floor(noise * levels) / levels; // find the lower band/level the noise matches at
  float lowerDiff = noise - lower; // and find the difference

  // if the difference between the lower level is within some range, paint the fragment, otherwise ignore it
  if (lowerDiff > 0.015)
    discard;

  gl_FragColor = vec4(color, 1.0);
}
```

![Finished product](/webgl-topographic/frag5.png)

That's it! To animate this, you can use the second parameter of the `snoise` function. Pass in a `time` uniform from three.js, and use that value in there! Let's compose this into our page, and here we go:

![Finished product against real page](/webgl-topographic/final.png)

---

I have a few more ideas that should make the effect massively better, but I'll explore them in a [part 2](/posts/webgl-topographic-2) or something.
