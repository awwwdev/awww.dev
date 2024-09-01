import DarsoonImage from "@/public/works/darsoon.png";
import DarsoonImage2 from "@/public/works/darsoon-dashboard.png";
import JacksHouseImage from "@/public/works/jackshouse.png";
import DbiliaImage from "@/public/works/dbilia.png";
import DbiliaImage2 from "@/public/works/dbilia-2.png";
import DbiliaImage3 from "@/public/works/dbilia-3.png";
import DbiliaImage4 from "@/public/works/dbilia-4.png";
import NumbersForThingsImage from "@/public/works/numbers-for-things.png";
import MomentaImage from "@/public/works/momenta.png";
import DbiliaPremierImage from "@/public/works/dbilia-premier.png";
import { StaticImageData } from "next/image";

type WorkDataItem = {
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
  imgs: StaticImageData[];
  whatIDid: string[];
};
type WorkData = Record<string, WorkDataItem>;

const WORKS_DATA: WorkData = {
  dbilia: {
    title: "Dbilia",
    subtitle: "An NFT Marketplace withouth lock-ins",
    tools: ["NextJs", "React", "T3-Stack", "Prisma"],
    imgs: [DbiliaImage, DbiliaImage2, DbiliaImage3, DbiliaImage4],
    description:
      "An NFT Marketplace, where your NFTs are not locked in. You can bring in you NFTs from other markets into Dbilia or create NFT's on Dbilia and take them to other markets. Dbilia is for users who are not very tech savvy and new to NFT and blockchain technology. Therefore it has a very streightforward UX, plus it explains all the technical details in step-by-step tutorial..",
    whatIDid: [
      "Desgined the whole UI and coded it with React and Next.js",
      "Closed +200 bugs in 10 days by rewriting UI source code, resulting in 60% less code and better mobile responsiveness thanks to the Atomic Design Architecture Model and modern CSS features",
      "Reduced page load time by 80% by leveraging bundle-size analytics, lazy-loading and Server-Side Rendering",
    ],
  },
  darsoon: {
    title: "Darsoon",
    subtitle: "A platform for finding online tutors",
    tools: ["NextJS", "React", "TypeScript", "Server Components", "Tailwind CSS"],
    imgs: [DarsoonImage],
    description:
      "Darsoon is a platform for finding online tutors. You can find tutors, on many diffenret subject, such as Art, Math, Music, Languages and more. Dbilia offer prefessional tutor in each subject, while has a very competetive price for learners.",
    whatIDid: [
      "Built a complex dashboard app for a private tutoring platform using ReactJS and Supabase, with dynamic tables, graphs and forms, for 3 different user roles",
      "Designed and Developed a brand new UI for all pages with Glassmorphism effect, leading to 5x improvement in speed",
      "Designed a normalized relation-based data schema with 15 entities in PostgreSQL",
      "Coded a NodeJS program to migrate +80000 records of data from semi-structured Google Sheets to PostgreSQL, including the automated clean data inspection, data validation layer and handling feign-key creation on the fly.",
      "Added Total Type Safety in TypeScript, Row-level Security in PostgreSQL, and Server-Side Rendering in Next to ensure solid security and enhance website performance and UX",
    ],
  },
  dbiliaPremier: {
    title: "Dbilia Premier",
    subtitle: "A platform to pre-order Music Videos with NFT, before they are released publicly",
    tools: ["NextJs", "React", "Prisma", "T3 Stack", "PostgreSQL"],
    imgs: [DbiliaPremierImage],
    description: "A platform to pre-order Music Videos with NFT, before they are released publicly.",
    whatIDid: ["Designed the UI in Figma"],
  },
  momenta: {
    title: "Momenta",
    subtitle: "Business Website for Momenta Web3 Agency",
    tools: ["NextJs", "React", "Framer Motion"],
    imgs: [MomentaImage],
    description:
      "Momenta.app is the business website for Momenta Web3 Agency. Momenta is the web agency behind varius products in the web3 area, such as Dbilia, Dbilia Premium, NumberForThings and more.",
    whatIDid: [],
  },
  numbersForThings: {
    title: "Numbers4Things",
    subtitle: "An NFT Project, consisting numbers from 1 to 100,000,000.",
    tools: ["NextJs", "React", "MetaMask"],
    description:
      "An NFT Project, consisting numbers from 1 to 100,000,000. It is world largest NFT collection, and created to be used by gamer community. Each NFT has a image it's number on unique gradient. ",
    imgs: [NumbersForThingsImage],
    whatIDid: [
      // "In order to create and host such a large number of images, we couldn't use raster file format such as .png of jpeg. (Let's say each image sizes 50Kb, the wole collection would take 4.65 Terrabytes) Therefore I wrote a script that genrate the svg for each item, base on the number. This way we only store the necessary information to produce each number and stored it on JSON.",
      "Coded a NodeJS script to generate, and saves 100 million unique typographic artwork that could be run a laptop with 8GB of RAM",
    ],
  },
  jacksHouse: {
    title: "Jack's House",
    subtitle: "An Online Casino and E-Sports platform for Gamers Community",
    tools: ["NextJs", "React", "UnoCSS"],
    imgs: [JacksHouseImage],
    description:
      "A Casino and E-Sport Platform for Gamer Community. While it offers all the features of a classic online casino, it provide gamers with an environment to gamble on E-Sport. Jack's House has fantastic game UI that resonates with gamers.",
    whatIDid: [
      "Developed the front-end for an Online Casino for E-Sports and Gamers community with React, NextJS, Tailwind and React-Query",
      "Led UI design with a team of 3 designers from “look and feel” exploration to wire-framing and high-fidelity prototypes",
      "Improved UX and performance by removing heavy animating libraries and rewriting complex 2D game animations with modern CSS and React core features",
      "Built a UI Component library UI with built-in accessibility support and a neumorphic style using Radix UI library",
    ],
  },
};

export default WORKS_DATA;
