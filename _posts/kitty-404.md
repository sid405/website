---
title: "Kitty 404"
excerpt: "I need people to see my 404 page"
date: "August 25, 2021"
tags: [web, css]
draft: false
---

I need people to see my [404 page](/404), I couldn't just leave it to chance!

![404 page screenshot](/kitty-404/screenshot.png)

What's special about it you ask? It's freaking adorable, that's what. The cat's shy, so if you try to touch it, it hides behind the `0`! It's a simple effect, but there's a few subtle details to it that need trickery to work:

1. The `0` is transparent, how does the hidden cat not show through?
2. If the cat hides after you hover, that should take your cursor outside the cat's hit-area, right? Why doesn't the cat come back up then?

### Hiding behind transparency

The solution to this is good ol' `z-index` stacking. You create a dummy `div` that only serves to hide the cat, and stack things this way:

![Page layer stacking order](/kitty-404/stacking.svg)

The `border-color` around the `div` in the illustration is only for clarity, you wouldn't actually want it. What happens here is that the cat hides behind the div, which is the same color as the background, so it looks like the cat hides behind the text. There's small detail here though: your `div`'s `border-radius` needs some value so it doesn't poke from behind the text. This depends on your text, the font, and even the character you're hiding behind. In my case, I had to manually match the `border-radius` to `IBM Plex Mono`'s `0` (which is the font I use for headings on this blog).

### Extending the hit-area

This is a common problem with hover-based translation effects: you translate an element on hover, but that causes the element's hit-area to no longer intersect the cursor's position, which means the element is no longer hovered, which causes it to return to its initial position. But now it intersects the cursor's position again, so it gets translated again, and the cycle continues: the element keeps jumping around. There's a simple fix for this, add some padding around the element so that it keeps intersecting the cursor.

My rule-of-thumb is to add the same amount of padding as the element's dimensions. This has the effect of "replacing" the element with empty space (the padding). It usually works pretty well for small elements. Of course, this will only work if the element's `box-sizing` is `border-box`, but you should be doing that anyway. If you're only translating in one direction, you don't need padding all around it, just in one direction.

---

The cat's colors are, of course, my IRL cat's colors. Fair warning: I might deliberately leave broken links scattered across this blog just so people stumble across the 404 :D
