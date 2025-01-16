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

```
import {
  presetUno,
  defineConfig
} from "unocss";
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
      safelist: ["red" ,"brown3" , "info" , "error4"]
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

## One Cool Feature

I added a UnoCSS rule to this preset, to reset the color of an alias in the source code. It is super useful when you have component that you want to use it with different color hues. You only need to color the component with an alias, and reset the alias in different places you use that component.

Let me show you an example.

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
    <div class="bg-accent3 text-black">
      <p>This is a component with accent color</p>
    </div>
  );
}
```

By default when you use the component, it has `cyan` background. But you can reset it to other colors like this:

```jsx

<MyComp /> // this has cyan background.
<div class='alias-accent-red'>
  <MyComp /> // this has a red background.
</div>
<div class='alias-accent-pink'>
  <MyComp /> // this has a pink background.
</div>

```

If you don't want wrap your component in an extra div, you can pass a className to your component:

```jsx
function MyComp({ classname = "" }) {
  return (
    <div className={`bg-accent3 text-black ${className}`}>
      <p>This is a component with accent color</p>
    </div>
  );
}
```

and use it like this:

```jsx

<MyComp /> // this has cyan background.
<MyComp className='alias-accent-red' /> // this has a red background.
<MyComp  className='alias-accent-pink' /> // this has a pink background.

```

## Conclusion

This is my first serious npm package I release and it's was different experience. But I am very happy with the results.
Please see the [npm page](https://www.npmjs.com/package/unocss-preset-radix-ui-colors) for more information or checkout the source code in [my GitHub](https://github.com/awwwdev/unocss-preset-radix-colors). If you liked, please don't forget to give it a star.
