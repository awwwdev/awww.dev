---
title: Why I love Frontend Development
subtitle: "And why it's really different from any other type of coding"
date: 2024-03-14

---

Front End Code is messy. Things are different here. First, there is HTML, which many argue is not even a programming language. Second there is CSS which requires another mindset to deal with it. And last, JavaScript, which is known for being the weirdest of all programming languages. In this article, I want to explain why front-end development is different and why I love it.

In every program you code, there is an input and an output. In most cases, the output from a program, is the input for another program. I mean, those programs talk to each other.

But in a front end application, your program talks to a human. Your program might get inputs from a human, and deliver outputs to a human (through screen, voice, ...). The frontend program is part of human-machine interface, and that is to make it different. 

Machines are very predictable. What a machine expect of a program for input or output is clear, and it is called Application Programming Interface, or for short API. Basically, the API of each program tells you what input it can receive, in what forms, and what outputs it will give. 

In other hand, a Human is not that predictable. Let's say you are launching a website for a big online store, and your users could be anyone. It could a teenager, it could be an old person, it could be a person with difficulty to read, or a person who can not use a mouse. 

## Accessibility

Here is the first thing that makes thing complicated and add up to your source code. People interact with your website in many different ways, and you need to be prepared. This is the accessibility aspect of your website. I don't want to get deep in this, but in short, you need to make sure all people, apart from their ability or disabilities, could work with your website.

## Visual Aesthetics
After accessibility, we get to visual part. While there are some accessibility guidelines and limitations for colors, sizes you could use, still there are so many things you can do visually. And As your design get fancier, your CSS code gets wilder. It could easily get difficult to maintain, if you don't use a good design strategy like, atomic design or design systems.

## Content
Next, is content itself. I am talking about the texts, and every piece of it. Your front-end code holds the content in itself. Most of the time, there are editors and copywriters who want to be able to edit the code, but they don't have coding skills. So, you need to separate the content from your source code. Headless Content Management Systems (CMS) helps you achieve this. But you have to wire up the CMS to your frontend applications. It's not a difficult task, but definitely makes your front-end code level more complex. 

Also, things are also won't work that smooth. Sometimes, a content change requires some layout or graphical change. For that, developers need to work close to the content team.

## Multilingual
I hope your frontend app is not multilingual, and it is, all the languages are in Left to Right direction. While, again CMSs help you with multilingual content, but still it add up another layer of complexity to your code.

## Functionality
Ok, now with get to the part which sound more like actually programming. Like, you program a button to do a specific task when it's clicked. Here, if you are working on a large scale app, you probably don't want to use vanilla JavaScript. So, here comes in Frontend Frameworks, like React, Vue, Angular, Svelte, Solid, Astro, ....
The framework you use  have the most influence on how your code. They come with a bunch of configurations, build tools, dependencies which again make it more complex. 

## SEO and Semantics

Finally, while your app should be prepared to interact with Humans, it also should be able to talk to some robots, such as search engine crawlers and screen readers. For this, you might need some extra meta tags in the head of your pages, or might need to change your rendering strategy to be able to get good results. 

## Optimization

After you contoured all the above, you want your website work fast. Specially if your target users have a slow internet connection. Optimization sometimes means simplifying or removing things, like removing unused dependencies, but sometimes goes in the complexity direction. For example, you might need to render some page server side, and it means adding some codes to your project.

## All of them together

These layers don't live apart from each other. They are all intertwine in your code. Let's say you want to add a button. Some attributes (like onClick and type) you define the behavior of it. With `style` and `class` you define how it looks. The label text goes inside the element. Other attributes like `ara-disabled` are used to ensure people with serenader know if the button is clickable or not. 

So each element, has its own content, styles, accessibility features, and SEO considerations. That's the part it gets tricky and the thing I love about Front end Development. Every time I want to create an element, I have to think about 7 different aspects. What makes it more challenging is sometimes they are dependent on each other. For example, a specific type of layout, requires some change in your content, or markup. It's to make it more crucial how you define your components, what are your building atoms, what code you abstract and how.

Front end coding keeps me in a complex and multidimensional problems. It's not something you could think before you face the project, and solve it once for all. You need it to see what each project needs, and then you can plan your solution. I love front end web development because each project is a new Challenge.