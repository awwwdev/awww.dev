import { renderNoData } from "@/components/RenderQ";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import persianJs from "persianjs";
import LinkButton from "@/components/ui/button/LinkButton";
import { En, Fa } from "@/components/ui/multilang";
import FAQItem from "@/components/ui/FAQItem";
import StarRating from "@/components/ui/StarRating";
import Avatar from "@/components/ui/Avatar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";
import Space from "../ui/Space";
import { useState } from "react";
import Button from "../ui/button";

export default function Works() {
  const { t } = useTranslation();

  return (
    <section className="relative">
      <BluredCircle radius={100} top="20%" left="95%" bg="bg-amber3" blur="200px" />
      <BluredCircle radius={50} top="60%" left="5%" bg="bg-purple3" blur="200px" />

      <div className="mx-auto max-w-page  ">
        <h2 className="H1">Works</h2>
        <Space size="h-8" />
        <ul
          className="list-square list-disc-outside pt-4 pis-3 b-l-2 b-base5 b-dashed"
          style={{
            listStyleImage: 'url("square-list-item-marker.svg")',
          }}
        >
          <WorkExperience company="Darsoon" title="Full-Stack Web Developer" start="November 2023" end="Present">
            <Li>
              Built a complex dashboard app for a private tutoring platform using ReactJS and Supabase, with dynamic
              tables, graphs and forms, for 3 different user roles
            </Li>
            <Li>
              Designed and Developed a brand new UI for all pages with Glassmorphism effect, leading to 5x improvement
              in speed
            </Li>
            <Li>Designed a normalized relation-based data schema with 15 entities in PostgreSQL</Li>
            <Li>
              Coded a NodeJS program to migrate +80000 records of data from semi-structured Google Sheets to PostgreSQL,
              including the automated clean data inspection, data validation layer and handling feign-key creation on
              the fly.
            </Li>
            <Li>
              Added Total Type Safety in TypeScript, Row-level Security in PostgreSQL, and Server-Side Rendering in Next
              to ensure solid security and enhance website performance and UX
            </Li>
            <Li>Automated Data Entries for more than 10 points, eliminating 30 hours per week of manual work</Li>
          </WorkExperience>
          <WorkExperience
            company={<>Jack&apos;s House</>}
            title="Front End Developer"
            start="May 2023"
            end="October 2023"
          >
            <Li>
              Developed the front-end for an Online Casino for E-Sports and Gamers community with React, NextJS,
              Tailwind and React-Query
            </Li>
            <Li>
              Led UI design with a team of 3 designers from “look and feel” exploration to wire-framing and
              high-fidelity prototypes
            </Li>
            <Li>
              Improved UX and performance by removing heavy animating libraries and rewriting complex 2D game animations
              with modern CSS and React core features
            </Li>
            <Li>
              Built a UI Component library UI with built-in accessibility support and a neumorphic style using Radix UI
              library
            </Li>
          </WorkExperience>
          <WorkExperience
            company={<>Momenta Web Agency</>}
            title="Front End Developer"
            start="September 2021"
            end="April 2023"
          >
            <Li>
              Contributed to the design and development of 6 projects; 4 NFT marketplaces, a video-call platform and the
              Agency&apos;s Website
            </Li>
            <Li>
              Closed +200 bugs in 10 days by rewriting UI source code, resulting in 60% less code and better mobile
              responsiveness thanks to the Atomic Design Architecture Model and modern CSS features
            </Li>
            <Li>
              Initiated and took ownership of visual tasks such as visual language and logo design, UI design/redesign,
              and designing Pitch-decks, saving more than $40K for the startup
            </Li>
            <Li>
              Reduced page load time by 80% by leveraging bundle-size analytics, lazy-loading and Server-Side Rendering
            </Li>
            <Li>
              Ideated, prototyped and coded and deployed the Agency Portfolio Website containing complex scroll-based
              animations in 2 weeks
            </Li>
            <Li>
              Coded a NodeJS script to generate, and saves 100 million unique typographic artwork that could be run a
              laptop with 8GB of RAM
            </Li>
          </WorkExperience>
          <WorkExperience
            company={<></>}
            title="Freelance Web Developer and UI Designer"
            start="May 2019"
            end="February 2023"
          >
            <Li>
              Created, Deployed and maintained websites for clients using WordPress, WIX or Vanilla HTML, CSS and
              JavaScript
            </Li>
            <Li>
              Delivered outstanding User Interfaces by rewriting CSS for WordPress, Developed custom functionalities
              with JS and JQuery
            </Li>
            <Li>
              Improved Search Result Ranking (SERP) to the top 3 links on Google for main keywords through comprehensive
              keyword research, coaching content the team and utilization of SEO tools such as Yoast SEO, HotJar, Google
              Analytics, and Google Search Console
            </Li>
          </WorkExperience>
          <WorkExperience company={<></>} title="Freelance Graphic Designer" start="March 2015" end="May 2019">
            <Li>
              Carried out branding projects, including designing logos, establishing branding guidelines, and creating
              stationery sets
            </Li>
            <Li> Visualized raw data and created infographic booklet reports</Li>
            <Li> Designed an animated pitch deck for a venture, resulting in raising 10x co-venture investment</Li>
            <Li>
              Consulted and educated clients on different approaches and media; conducted discovery meetings to
              understand and define the problem and find the right solution within the client&apos;s constraints
            </Li>
            <Li>
              Managed projects with clients simultaneously under demanding times, provided regular updates, sought
              feedback, iterated on designs, adopted the changes from clients and documented the process
            </Li>
          </WorkExperience>
        </ul>
      </div>
    </section>
  );
}

function WorkExperience({ title, start, end, company, children }) {
  return (
    <li className="pis-2">
      <h3 className="">
        <div className="H5 line-height-0.8 tracking-wide">{company}</div>
        <div className="flex gap-1 tracking-wide">
          <div className="font-content fs-sm c-base11">{title}</div>
          <div className="c-base11 fs-xs ">
            {start} - {end}
          </div>
        </div>
      </h3>

      <Space size="h-6" />
      <ShowMore minHeight="3em">
        <ul
          className={`list-disc-outside  fs-xs space-y-0.5em `}
          style={{
            listStyleImage: 'url("circle-list-item-marker.svg")',
          }}
        >
          {children}
        </ul>
      </ShowMore>

      <Space size="h-2" />
    </li>
  );
}

function ShowMore({ children, minHeight = "0fr" }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="">
      <div
        className={`grid fade-to-b`}
        style={{
          gridTemplateRows: expanded ? `1fr ${minHeight}` : `0fr ${minHeight}`,
          maskImage: `linear-gradient(to bottom, black 0%,  rgba(0 0 0 / var(--fade-to-opacity)) 100%)`,
          "--fade-to-opacity": expanded ? "1" : "0",
          transition: "grid-template-rows 500ms,  --fade-to-opacity 500ms",
        }}
      >
        <div
          className={`overflow-hidden `}
          style={{
            gridRow: "1/-1",
          }}
        >
          {children}
        </div>
      </div>
      <Space size="h-3" />
      <div className="flex justify-center items-center">
        <div className="b-t-1 b-base5 h-1px grow"></div>
        <Button
          variation="ghost"
          rounded
          className="fs-2xs flex gap-1.5 items-center !h-2.25em"
          onClick={() => {
            setExpanded((s) => !s);
          }}
        >
          <span className={` ${expanded ? "rotate-180" : "rotate-0"}`} style={{ transition: "transform 500ms ease" }}>
            <Icon name="bf-i-ph-caret-down-bold" subdued />
          </span>
          <span className="c-base11">{expanded ? "Show Less" : "Show More"}</span>
        </Button>
        <div className="b-t-1 b-base5 h-1px grow"></div>
      </div>
    </div>
  );
}

function Overlay({ expanded }) {
  return (
    <div className="relative">
      {!expanded && (
        <div className="bg-gradient-to-b from-transparent  to-sand1 h-20 absolute w-full bottom-0 -translate-y-0% z-10 "></div>
      )}
    </div>
  );
}

function Li({ className = "", children }) {
  return (
    <li className={`${className} flex gap-1.5 items-baseline`}>
      <div className="pb-0.125em ">
        <div className="w-1.5 h-1.5 rd-full  bg-base6 shrink-0 " />
      </div>
      <div className="grow">{children}</div>
    </li>
  );
}
