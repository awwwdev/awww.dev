---
title: CSS Gotchas
subtitle:  "A list CSS gotchas and work arounds them "
date: 2024-08-24
draft: true
---

Learning CSS is when you start with `background-color` or `padding`.
Then it gets serious with `flex` and `grid`.
And after a years, that you have mastered CSS, it hits you with some exceptions. 

In this article I want to list the ones I have hit with, describe why, and possible workarounds.

## `<input>` and `<select>`

- `<input />` has a `size=20` that rewrites `maxWidth` in CSS🥴🤕.
flex works better as parent than a grid on inputs 🤷‍♂️ because it shrinks it!
- Icon inside `<option />`. just text lol! Oh btw only color and background-color works on option :)

- vertial padding on `select` 

- Don’t try to make a consistent styling on meter. see this https://developer.mozilla.org/en-US/docs/Learn/Forms/Advanced_form_styling#what_can_be_done_about_the_ugly_elements


## `<body>` and `<html>` elements
- If you apply overflow: scroll to <body> it will be applied to <html>
- If you have `html { height:50%; background: red; }`
your html tag is half the height of viewport, but the whole viewport is red.
- `window.document.innerHeight` changes in safari when you "pull down from top to update", doesn’t in Firefox.

## `sticky` position
- position: sticky; top:0; behaves like fixed, it’s not relative to it's container 😓
- position: sticky; top:0; doesn't work if the parent has height:100%; 🤒

## `relative` and `absolute` position
- A parent can not be a relative position and at the same time pass the relative origin to an upper element

## `filter` and `position: absolute` are not friends

- Avoid using width 100%  and `100vw` as much as possible. `width: 100%;` could make overflow with and inline margin and `width: 100vw` could make overflow with none overlaying scrollbar (like in chrome desktop)

- there is no background-opacity property, also no color-opacity?

## `<table >` is a differnet kinf of creature 
- try to make a `<table />` with rounded borders. lol!
- Container Query does not work on `table`. (Which make sens)



## Learn `@import` so you never use it
- .css file and @import is always add one more network request and bad for website speed.

## Want to `<video>` or `<audio>` ?

## setting a css variable on a child


## Containing Block? What the heck?

## drop-shadow is nice but also differnet

- drop-shadow makes intenser shadows with the same values in compare to box-shadow.

- you can not have styled <video > without .JS same for <audio/>
- Styling <video > without JS
- Styling inputs without JS
- No background-opacity! use ::before, ::after hacks to get it done.
- No background-opacity!
use after hacks to get it done.
- No color-opacity 🤦‍♂️
- Highlight current page link!! there is no pseudo class for it (coming soon)
- flexible typography (base on clamp) is sweet. but no way to make it accessible.
- Scoped CSS


## `height` and `%` unit`
- Percentage Padding on top and bottom are based on width (which make sens)
- CSS Grid
    
    ![css-grid.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/6f90030c-0305-4ee5-a91f-9045cf81314a/13e34e14-6006-45bd-a6a1-cffcc4ca425b/css-grid.png)