---
title: "My website is now in P3 colors"
subtitle: "thanks to the little library I created"
date: 2025-01-16
---

## The Problem

I use UnoCSS for styling, which is more extendable version of Tailwind. UnoCSS use Tailwind Color palette under the hood, but I use Radix-ui Palette for two reasons. First, it has built-in accessibility support. Second, it is more vibrant and beautiful.

Until now, I used "unocss-preset-radix" to integrate and use Radix colors. But it has some drawbacks.

First, it didn't have support for P3 colors that were add in Radix Color Palette V3.
Second, you have to add all steps of a colors in order to use it. For example if you only need step 3 of red, it will add all 12 steps of red plus 12 steps of red for dark mode.

## The Solution `unocss-preset-radix-ui-colors`

I decided to solve this by creating my own unocss-preset. It wasn't easy but I finally found ways to only generate the minimum required CSS. Moreover, if you use P3 colors, it will add fallback colors for browsers that don't support it. Also there is a little cool feature that could save a lot of developing frontend. I will explain it in the end.

## Results

With this preset I managed to reduce my CSS bundle size by 25%, plus you need less configurations to use it.

## Usage

Now you can install it via `npm i unocss-preset-radix-ui-colors` and use it in your `unocss.config.ts` like example below.

```ts
import { presetUno, defineConfig } from "unocss";
import { presetRadix } from "unocss-preset-radix-ui-colors";

export default defineConfig({
  presets: [
    presetRadix({
      prefix: "--rx-",
      aliases: {
        accent: "cyan",
        base: "slate",
        success: "jade",
        warning: "amber",
        error: "tomato",
        info: "blue",
      },
      useP3Colors: true,
      onlyOneTheme: "dark",
      safelist: ["red", "brown3", "info", "error4"],
    }),
  ],
});
```

Let's break it down.

The `prefix` option is used to prefix all generated CSS variables from this preset.

Unlike `unocss-preset-radix`, this preset doesn't have `palette` option. It automatically detects usage of Radix Colors and adds the corresponding CSS variables to the generated CSS.

With `aliases` option, you can define aliases for your colors. For example, if you want to use `accent` color instead of `cyan`, you can add `aliases: { accent: "cyan" }` to the config.

The `useP3Colors` option is used to generate CSS variables for P3 colors. It also adds fallback colors for browsers that don't support P3 colors.

The `onlyOneTheme` option is used to generate CSS variables for only one theme. For instance, my website is only in dark mode, and I don't light mode colors. By using this option, I can tell the preset ot only add the dark mode version of each color, and don't make my CSS bundle larger with unnecessary CSS variables.

The `safelist` option is used to specify a list of colors that are not currently used in the source code, but might be dynamically add in the run time. You can safe list all steps of a color like `red` or an specific step like `brown3`. Same goes for aliases. You can safe list all steps of an alias like `info` or an specific step like `error4`.

## The Cool Feature

I added a UnoCSS rule to this preset, to reset the color of an alias in the source code. It is super useful when you have component that you want to use it with different color hues. You only need to color the component with an alias, and reset the alias in different places you use that component.

### The Problem

Without this you have to pass colors as props, which become messy very soon. Let say I have this component:

```jsx
function MyComp() {
  return (
    <div className="p-4 rd-2 flex justify-between flex-wrap gap-2">
      <p>This is a component with accent color</p>
      <button className="p-2 px-4 rd-1">Button</button>
    </div>
  );
}
```

and I want to change the color of background, texts and the button, in different places I use it. I have to change my component definition to:

```jsx
function MyComp({ bgColor = "", textColor = "", buttonColor = "" }) {
  return (
    <div className={`bg-accent3 text-white p-4 rd-2 flex justify-between flex-wrap gap-2 ${bgColor} ${textColor}`}>
      <p>This is a component with accent color</p>
      <button className={`bg-accent9 p-2 px-4 rd-1 ${buttonColor}`}>Button</button>
    </div>
  );
} 
```

and use it like this:

```jsx
<MyComp bgColor="bg-cyan3" textColor="text-slate11" buttonColor="bg-cyan9" /> 
<MyComp bgColor="bg-red3" textColor="text-slate11" buttonColor="bg-red9" /> 
<MyComp bgColor="bg-pink3" textColor="text-blue11" buttonColor="bg-pink9" /> 
```

It is doable. But it's a lot of work. Notice that I have to have a prop for every color I want to control. Also, I need to pass a complete className (like "bg-red9") for it to work. I can't send "red9" or just "9" (unless I have safelisted those colors and in my component I do something like `bg-red${step}`, which is even more work to do.)

There is also another disadvantage. If the component is part of design system and is going to be used by other developers, there is a risk that they pass other classes in those props and break the intended look of your component. For example, they could pass `bg-transparent` or `absolute` to `buttonColor` prop. We want to avoid this. But even using typescript can not protect us, since those are valid strings.

### The Solution

That's why we need a better solution. So far Tailwind and UnoCSS don't provide a good solution for this problem as far as I know. So I created one in this package.

Let me show you how it works with an example.

First, you have an alias `accent` set to color `cyan` in your `unocss.config.ts`.

```ts
aliases: {
  accent: "cyan",
},
```

Now you have a component that you want to use it with different color hues. You need to color it with `accent` color. Like this:

```jsx
function MyComp() {
  return (
    <div className="bg-accent3 text-white p-4 rd-2 flex justify-between flex-wrap gap-2">
      <p>This is a component with accent color</p>
      <button className="bg-accent9 p-2 px-4 rd-1">Button</button>
    </div>
  );
}
```

By default when you use the component, it has `cyan` background. But you can reset it to other colors like this:

```jsx
<MyComp /> // this has cyan background.
<div className='alias-accent-red'>
  <MyComp /> // this has a red background.
</div>
<div className='alias-accent-pink'>
  <MyComp /> // this has a pink background.
</div>
```

The code above renders as:

<div className="bg-accent3 text-white p-4 rd-2 flex justify-between flex-wrap gap-2">
  <p>This is a component with accent color</p>
  <button className="bg-accent9 p-2 px-4 rd-1">Button</button>
</div>
<div className='alias-accent-red'>
  <div className="bg-accent3 text-white p-4 rd-2 flex justify-between flex-wrap gap-2">
    <p>This is a component with accent color</p>
    <button className="bg-accent9 p-2 px-4 rd-1">Button</button>
  </div>
</div>
<div className='alias-accent-pink'>
  <div className="bg-accent3 text-white p-4 rd-2 flex justify-between flex-wrap gap-2">
    <p>This is a component with accent color</p>
    <button className="bg-accent9 p-2 px-4 rd-1">Button</button>
  </div>
</div>

If you don't want wrap your component in an extra div, you can pass a className to your component:

```jsx
function MyComp({ classname = "" }) {
  return (
    <div className={`bg-accent3 text-white p-4 rd-2 flex justify-between flex-wrap gap-2 ${className}`}>
      <p>This is a component with accent color</p>
      <button className="bg-accent9 p-2 px-4 rd-1">Button</button>
    </div>
  );
}
```

and use it like this:

```jsx
<MyComp /> // this has cyan background.
<MyComp className='alias-accent-red' /> // this has a red background.
<MyComp className='alias-accent-pink' /> // this has a pink background.
```

Which renders as the same:

<div className="bg-accent3 text-white p-4 rd-2 flex justify-between flex-wrap gap-2">
  <p>This is a component with accent color</p>
  <button className="bg-accent9 p-2 px-4 rd-1">Button</button>
</div>
<div className="bg-accent3 text-white p-4 rd-2 flex justify-between flex-wrap gap-2 alias-accent-red">
  <p>This is a component with accent color</p>
  <button className="bg-accent9 p-2 px-4 rd-1">Button</button>
</div>
<div className="bg-accent3 text-white p-4 rd-2 flex justify-between flex-wrap gap-2 alias-accent-pink">
  <p>This is a component with accent color</p>
  <button className="bg-accent9 p-2 px-4 rd-1">Button</button>
</div>

You can also use two or more aliases in one component. For example you can use another alias for text colors:

```jsx
function MyComp({ classname = "" }) {
  return (
    <div className={`bg-accent3 text-base11 p-4 rd-2 flex justify-between flex-wrap gap-2 ${className}`}>
      <p>This is a component with accent color</p>
      <button className="bg-accent9 p-2 px-4 rd-1 text-base12">Button</button>
    </div>
  );
}
```

Now you can set each alias to a separate color like:

```jsx
<MyComp /> // this has cyan background.
<MyComp className='alias-accent-red alias-base-slate' /> // this has a red background.
<MyComp className='alias-accent-pink alias-base-blue' /> // this has a pink background.
```

which renders as:

<div className="bg-accent3 text-base11 p-4 rd-2 flex justify-between flex-wrap gap-2">
  <p>This is a component with accent color</p>
  <button className="bg-accent9 p-2 px-4 rd-1 text-base12">Button</button>
</div>
<div className="bg-accent3 text-base11 p-4 rd-2 flex justify-between flex-wrap gap-2 alias-accent-red alias-base-slate">
  <p>This is a component with accent color</p>
  <button className="bg-accent9 p-2 px-4 rd-1 text-base12">Button</button>
</div>
<div className="bg-accent3 text-base11 p-4 rd-2 flex justify-between flex-wrap gap-2 alias-accent-pink alias-base-blue">
  <p>This is a component with accent color</p>
  <button className="bg-accent9 p-2 px-4 rd-1 text-base12">Button</button>
</div>

This will save you a lot of time! You don't need to hardcode colors into components, or pass them as props.

## Conclusion

This is my first serious npm package I release and it's was different experience. But I am very happy with the results.
Please see the [npm page](https://www.npmjs.com/package/unocss-preset-radix-ui-colors) for more information or checkout the source code in [my GitHub](https://github.com/awwwdev/unocss-preset-radix-colors). If you liked, please don't forget to give it a star.
