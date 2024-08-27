---
title: "Two Crazy Landings"
subtitle: The Story behind Momnta's landing page
date: 2023-02-03
color: "c-purple11"
bg: "bg-gradient-to-br from-purple4 via-plum4 to-pink4"
logoSrc: "/momenta/logo.png"
href: "/works/momenta"
darkLogoSrc: "/momenta/logo-dark.png"
features:
  - Ideated and created a low-fidelity prototype
  - Created complex and performant scroll animations
  - Delivered the whole project in 2 weeks
img: <img
  slot='showcase'
  src='/momenta/mockup.png'
  alt=''
  class="lt-xs:static lt-xs:fade-y-from-30%-to-70% lt-xs:-mb-26 lt-xs:!-mt-5 lt-xs:-mie-5  lt-xs:w-4/5 lt-xs:mis-auto lt-xs:mt-8 lt-xs:fade-y-from-10%-to-80% lt-xs:!-mb-32  xs:abs  -z-1  xs:right-0 xs:top-5 xs:w-45  sm:-right-0  sm:top-5 sm:w-65 ) md:-right-13 md:-top-10 md:w-80 drop-shadow-xl `}
  />

stackLogos:
  - icon: i-logos-sass
    name: SASS and CSS
  - icon: i-logos-react
    name: React.js
  - icon: i-logos-figma
    name: Figma
---

<br/>
<a class="af-i-ph-arrow-right " href="https://momenta.app" target="_blank">Visit Momenta</a>
<br/>

<div className='h-3' ></div>
It was December 2021, and our agency, which is a web3 and NFT agency, needed a landing page.

We started as a team. We created some content and gathered some inspiring examples.

But, a few days after, a new client with a big project arrived. We needed to split the team, and everyone liked my UI prototypes so much. So, the whole landing page to me and everybody else went for the other project. At the same time, I was getting ready to move to Vancouver on the weekend.

<div class="grid  gap-4 " style="grid-template-columns: repeat( auto-fit, minmax(min(100%, 12rem), 1fr) )">
  <img src="/momenta/m1.png" alt="Coloe Pallet Option 1" class="rd-xl" />
  <img src="/momenta/m2.png" alt="Coloe Pallet Option 2" class="rd-xl"/>
  <img src="/momenta/m3.png" alt="Coloe Pallet Option 3" class="rd-xl"/>
  <img src="/momenta/m4.png" alt="Coloe Pallet Option 4" class="rd-xl"/>
  <img src="/momenta/m5.png" alt="Coloe Pallet Option 5" class="rd-xl"/>
  <img src="/momenta/m6.png" alt="Coloe Pallet Option 6" class="rd-xl"/>
</div>

## The Hardest Part

I flew to Vancouver with two suitcases. My plan was to quickly get a desk and chair and get to work. But I learned there had been a flood recently in British Columbia, and everything was out of stock! Hopefully, this was available:

<img src="/momenta/desk.png" alt='a small desk to work when you are sitting on the ground' class='rd-xl' />

Anyway, I got started. 🤷‍♂️

I was given the complete freedom to design it and one week.

I asked for more time but still needed to find the design by myself, which was the hardest part.

Our agency was WEB3 and NFT agency, so it needed a landing page with those sick, crazy vibes of NFTs. It cannot be a typical boring about us page.

## The Workflow

It is always hard to know where to start to end up with a cool and impressive idea. There was no linear or predictable workflow. Only try and errors and iterate.

For days, I searched and visited other designs, sketched on paper, created some Figma prototypes, and coded a little bit.

Eventually, it all came together, and I found out what to do. I described it to my supervisor and got his approval. The idea was to bring together some distributed NFT cards and shape an NFT marketplace through interactive animation.

From this point on, it went much faster. Now the problem was how to implement it.

I created the global layout, designed the non-animating sections, searched for a React animation library, picked Framer Motion, watched some YouTube tutorials, and made some basic scroll-based animations and parallax effects.

The animation had many parts and soon got complicated. So, I created some composable animating components and used them to interleave each other. Then I tried with adjusted the speed and locations through the props.

The other was to create a solid layout for things that work both on mobile and desktop, and it wouldn't be possible without amazing CSS lessons from [Kevin Powel](https://www.youtube.com/user/KepowOb).

## Result

After two weeks, I deployed the first publicly available version. It can be seen at:

[https://momenta.app](https://momenta.app)

Since then, I have polished it more based on the feedback. Also, I added support for reduced motion. If you don't see any animation, you probably have to enable less-animations mode in your OS settings.

## Learning

I learned how to work with Framer Motion, which is a very well-maintained library, and I would use it again.

I faced my fear and used Adobe After Effects for the first time. It was the only Adobe software I hadn't learned, and I was scared of it. I created a fluid animation in the background with it. It took two hours to render it on my poor laptop!

## Concolusion

What I like most about this project is not the final result. (It looked 25-40% cooler in my imagination).

The thing I like about it is how I could use my design knowledge and coding knowledge together simultaneously on each step.

For example, knowing how elements are positioned with CSS, I know what my constraints are for placing cards and how they can be animated along the scrolling.
On the other hand, there were times I reconsidered and improved the design after learning about a new feature in Framer Motion development guides.

Knowing design and development helped me quickly find the possibilities and limitations I have and manage to deliver this project on time.

<a class="b-1 w-fit af-i-ph-arrow-right  fw-500  rd-xl b-orangeA-6  dark:b-orangeA-7 c-accent11 bg-gradient-to-r from-accent1 to-base1  active:(b-orangeA-8 from-accent5 to-base2) hover:b-orangeA-7 hover:from-accent2 hover:to-accent1 )  focus-visible:b-orangeA-8 focus-visible:from-accent4 focus-visible:to-accent2  bg-origin-border  c-accent11  fw-500 py-4 b-1.5  px-8 rd-xl flex gap-2 ac  !mt-20 " href="https://momenta.app" target="_blank">Visit Momenta</a>
