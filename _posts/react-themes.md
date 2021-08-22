---
title: "useTheme hooks are deceptively hard"
excerpt: "Me, 2 days ago: There's no way I'm shipping this blog without themes. How hard can it really be? I'll do it myself."
date: "August 22, 2021"
tags: [web, react]
draft: false
---

**Me, 2 days ago, naïvely**: There's no way I'm shipping this blog without themes. How hard can it really be? I'll do it myself.

**Me, today**: Oh.

Okay let's step back for a second, here's all I wanted:

- A theme system that respects OS preferences
- But one that'll still let you override it
- All packaged up in a neat, slick `useTheme` hook

Here's the thing: you can whip up a `useTheme` hook that does all this in a few hours (like [I did](https://github.com/madebysid/useTheme/blob/ecb593cb5dc1404b0c61599a78320d2650cd2080/src/lib.ts)!), but what you'll miss are the subtle details.

### The Flash

This is a seriously jarring thing. Let's say you're on a dark OS, you load up a webpage. It renders with a blinding white background, but it goes dark almost instantly after. ALMOST. In the 300ms it took to switch themes, you've already made up your mind: this website is janky and sloppy (even [YouTube](https://youtube.com) has this problem, and it's pretty bad in their case).

Here's why this happens:

![Page execution timeline](/react-hooks/timeline.svg)

Read the timeline from left to right. When you set your "initial" theme from within a React `useState`, there are multiple things that need to happen before your browser knows what the "correct" theme is.

But there's more to it than "there's just more stuff happening". Your browser prioritizes painting _something_. In the first case, it has multiple opportunities to do so. Right after the initial HTML loads, the browser paints your page as it fetches your React (or any other framework) bundle. This is why the first thing you see is incorrect.

The way to fix this is to make sure that when the browser first paints your page, it does so "correctly". Because you're using React, there's no way for you to stop this first paint from happening. The only way to do this is to make it so the initial HTML document applies the correct classes / assigns the correct CSS variables. We can do so by inlining some JS to the initial HTML document. This JS script would do a `window.matchMedia("(prefers-color-scheme: light)")` or read from `localStorage` to set the initial theme. We can rest easy that this JS will be evaluated before the first paint. But doing so (usually) means breaking out of React. (Some tools like [Astro](https://astro.build) do some clever things to make this possible without you having to!)

The takeaway here is that a React hook in and of itself cannot do this because it cannot append a `<script>` to the initial HTML document, and that's why no `useTheme` hook can get rid of this flash _on its own_. The fix to this problem depends heavily on your build system. If you use a static site generator like Next, Astro or Gatsby, they can expose APIs to let you do this. For example, using `next/head`, you can append this script to the document's head, and Next will take care of this at build time. Astro does this out-of-the-box, and I'm sure Gatsby does some convoluted stuff to make this possible as well.

### Sharing theme value

This is more of a DX issue. Let's say you've created a `useTheme` hook that does everything you want. Now you want access to the currently active theme in 2 places in your app. You call the hook in two places, but wait, changing the theme from one place does not reflect in the other! You see, no matter how you implemented your hook, you'll use some kind of React state to hold the current theme, right? Well, React state is local to the component you initialize it in. If you use your `useTheme` hook in two places, those two places will have two different instances of state, and they will not automagically "sync up"

```jsx
function Component1() {
	const { theme } = useTheme()

	return <>Current theme: {theme}</>
}


function Component2() {
	const { theme, setTheme } = useTheme()

	return (
		<>
			Current theme: {theme}
			<button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
		</>
	)
}
```

If you click on the `button` of Component 2, the theme will only change for Component 2! I was _extremely_ surprised by this, before realizing that this is, in fact, how React has always been. To fix this, you can either move your state up the component tree to a common ancestor, and then pass the theme (and the setter) down to these components, or you can save this theme inside React context. That'll force you to wrap your app in a `ThemeProvider`, and there goes your slick hook :(

---

Anyway so for this blog I just ended up using [next-themes](https://github.com/pacocoursey/next-themes)
