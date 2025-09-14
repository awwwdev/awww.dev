type WorkDataItem = {
  company: string;
  title: string;
  start: string;
  end: string;
  startMobile: string;
  endMobile: string;
  whatIDid: string[];
};
type WorkData = Record<string, WorkDataItem>;

const EXPERIENCES_DATA: WorkData = {
  bitPin: {
    company: "BitPin Cryptocurrency Exchange",
    title: "Full Stack Web Developer",
    start: "November 2024",
    end: "September 2025",
    startMobile: "Nov 2024",
    endMobile: "Sep 2025",
    whatIDid: [
      "Implemented the redesign of OTC, the company’s primary revenue stream, significantly improving user experience and performance, resulting in a 4.6-star average rating across +3500 feedback responses",
      "Actively participated in product and UI/UX design meetings, offering technical insights and accessibility recommendations",
      "Partnered with the SEO team to integrate essential SEO enhancements into legacy codebase",
      "Refactored and debugged legacy code to reduce technical debt, introducing a disposable software strategy for accelerated development",
      "Performed an accessibility audit on the company’s design system, consulting designers to achieve an accessible color palette",
      "Initiated performance optimization and improved visibility by adding trackers to collect UX insights",
      "Contributed to the internal design system by implementing reusable components and promoting best practices",
      "Collaborated with back-end developers to define REST API structures and data models for scalable integration",
      "Held a “Front-end Development for Back-end Developers” workshop as a knowledge-sharing initiative within the team",
    ],
  },
  darsoon: {
    company: "Darsoon Inc.",
    title: "Full Stack Web Developer",
    start: "November 2023",
    end: "November 2024",
    startMobile: "Nov 2023",
    endMobile: "Nov 2024",
    whatIDid: [
      "Built a complex dashboard app for a private tutoring platform using ReactJS and Supabase, with dynamic tables, graphs and forms, for 3 different user roles",
      "Designed and Developed a brand new UI for all pages with Glassmorphism effect, leading to 5x improvement in speed",
      "Designed a normalized relation-based data schema with 15 entities in PostgreSQL",
      "Coded a NodeJS program to migrate +80000 records of data from semi-structured Google Sheets to PostgreSQL",
      "including the automated clean data inspection, data validation layer and handling feign-key creation on the fly.",
      "Added Total Type Safety in TypeScript, Row-level Security in PostgreSQL, and Server-Side Rendering in Next to ensure solid security and enhance website performance and UX",
      "Automated Data Entries for more than 10 points, eliminating 30 hours per week of manual work",
    ],
  },
  jacksHouse: {
    company: "Jack's House",
    title: "Front End Developer",
    start: "May 2023",
    end: "October 2023",
    startMobile: "May 2023",
    endMobile: "Oct 2023",
    whatIDid: [
      "Developed the front-end for an Online Casino for E-Sports and Gamers community with React, NextJS, Tailwind and React-Query",
      "Led UI design with a team of 3 designers from “look and feel” exploration to wire-framing and high-fidelity prototypes",
      "Improved UX and performance by removing heavy animating libraries and rewriting complex 2D game animations with modern CSS and React core features",
      "Built a UI Component library UI with built-in accessibility support and a neumorphic style using Radix UI library",
    ],
  },
  momenta: {
    company: "Momenta Web Agency",
    title: "Front End Developer",
    start: "September 2021",
    end: "April 2023",
    startMobile: "Sep 2021",
    endMobile: "Apr 2023",
    whatIDid: [
      "Contributed to the design and development of 6 projects; 4 NFT marketplaces, a video-call platform and the Agency's Website",
      "Closed +200 bugs in 10 days by rewriting UI source code, resulting in 60% less code and better mobile responsiveness thanks to the Atomic Design Architecture Model and modern CSS features",
      "Initiated and took ownership of visual tasks such as visual language and logo design, UI design/redesign, and designing Pitch-decks, saving more than $40K for the startup",
      "Reduced page load time by 80% by leveraging bundle-size analytics, lazy-loading and Server-Side Rendering",
      "Ideated, prototyped and coded and deployed the Agency Portfolio Website containing complex scroll-based animations in 2 weeks",
      "Coded a NodeJS script to generate, and saves 100 million unique typographic artwork that could be run a laptop with 8GB of RAM",
    ],
  },
  webFreelancer: {
    title: "",
    company: "Freelance Web Developer and UI Designer",
    start: "May 2019",
    end: "February 2023",
    startMobile: "May 2019",
    endMobile: "Feb 2023",
    whatIDid: [
      "Created, Deployed and maintained websites for clients using WordPress, WIX or Vanilla HTML, CSS and JavaScript",
      "Delivered outstanding User Interfaces by rewriting CSS for WordPress, Developed custom functionalities with JS and JQuery",
      "Improved Search Result Ranking (SERP) to the top 3 links on Google for main keywords through comprehensive keyword research, coaching content the team and utilization of SEO tools such as Yoast SEO, HotJar, Google Analytics, and Google Search Console",
    ],
  },
  designerFreelancer: {
    title: "",
    company: "Freelance Graphic Designer",
    start: "March 2015",
    end: "May 2019",
    startMobile: "Mar 2015",
    endMobile: "May 2019",
    whatIDid: [
      "Carried out branding projects, including designing logos, establishing branding guidelines, and creating stationery sets",
      "Visualized raw data and created infographic booklet reports",
      "Designed an animated pitch deck for a venture, resulting in raising 10x co-venture investment",
      "Consulted and educated clients on different approaches and media; conducted discovery meetings to understand and define the problem and find the right solution within the client's constraints",
      "Managed projects with clients simultaneously under demanding times, provided regular updates, sought feedback, iterated on designs, adopted the changes from clients and documented the process",
    ],
  },
};
export default EXPERIENCES_DATA;
