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
};
type WorkData = Record<string, WorkDataItem>;

const WORKS_DATA: WorkData = {
  dbilia: {
    title: "Dbilia",
    subtitle: "An NFT Marketplace withouth lock-ins",
    tools: ["NextJs", "React", "T3-Stack", "Prisma"],
    description:
      "An NFT Marketplace, where your NFTs are not locked in. You can bring in you NFTs from other markets into Dbilia or create NFT's on Dbilia and take them to other markets. Dbilia is for users who are not very tech savvy and new to NFT and blockchain technology. Therefore it has a very streightforward UX, plus it explains all the technical details in step-by-step tutorial..",
    imgs: [DbiliaImage, DbiliaImage2, DbiliaImage3, DbiliaImage4],
  },
  darsoon: {
    title: "Darsoon",
    subtitle: "A platform for finding online tutors",
    tools: ["NextJS", "React", "TypeScript", "Server Components", "Tailwind CSS"],
    description:
      "Darsoon is a platform for finding online tutors. You can find tutors, on many diffenret subject, such as Art, Math, Music, Languages and more. Dbilia offer prefessional tutor in each subject, while has a very competetive price for learners.",
    imgs: [DarsoonImage],
  },
  dbiliaPremier: {
    title: "Dbilia Premier",
    subtitle: "A platform to pre-order Music Videos with NFT, before they are released publicly",
    tools: ["NextJs", "React", "Prisma", "T3 Stack", "PostgreSQL"],
    description: "A platform to pre-order Music Videos with NFT, before they are released publicly.",
    imgs: [DbiliaPremierImage],
  },
  momenta: {
    title: "Momenta",
    subtitle: "Business Website for Momenta Web3 Agency",
    tools: ["NextJs", "React", "Framer Motion"],
    description:
      "Momenta.app is the business website for Momenta Web3 Agency. Momenta is the web agency behind varius products in the web3 area, such as Dbilia, Dbilia Premium, NumberForThings and more.",
    imgs: [MomentaImage],
  },
  numbersForThings: {
    title: "Numbers4Things",
    subtitle: "An NFT Project, consisting numbers from 1 to 100,000,000.",
    tools: ["NextJs", "React", "MetaMask"],
    description:
      "An NFT Project, consisting numbers from 1 to 100,000,000. It is world largest NFT collection, and created to be used by gamer community. Each NFT has a image it's number on unique gradient. ",
    whatIDid:
      "In order to create and host such a large number of images, we couldn't use raster file format such as .png of jpeg. (Let's say each image sizes 50Kb, the wole collection would take 4.65 Terrabytes) Therefore I wrote a script that genrate the svg for each item, base on the number. This way we only store the necessary information to produce each number and stored it on JSON.",
    imgs: [NumbersForThingsImage],
  },
  jacksHouse: {
    title: "Jack's House",
    subtitle: "An Online Casino and E-Sports platform for Gamers Community",
    tools: ["NextJs", "React", "UnoCSS"],
    description:
      "A Casino and E-Sport Platform for Gamer Community. While it offers all the features of a classic online casino, it provide gamers with an environment to gamble on E-Sport. Jack's House has fantastic game UI that resonates with gamers.",
    imgs: [JacksHouseImage],
  },
};

export default WORKS_DATA;
