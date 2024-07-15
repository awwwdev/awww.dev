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
import Emoji from '../Emoji';

export default function AboutMe() {
  const { t } = useTranslation();

  return (
    <section className="relative">
      <BluredCircle radius={100} top="20%" left="95%" bg="bg-amber3" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-blue3" blur="200px" />

      <div className="mx-auto max-w-70rem  ">
        <div className="flex gap-1 items-baseline mb-20">
          <h2 className="H1">About Me</h2>
          {/* <Emoji name="dino" /> */}
        </div>
        <div className="space-y-4 c-gray11">
          <p>
            I help businesses to discover their visual language, create wireframes, make high fidelity UI prototypes and
            develop it into production.
          </p>

          <p>During past 7 years, I have worked with many teams as a Designer, Developer or both.</p>

          <p>
            My experinces are most beneficial to competitons who want to stand apart from the competition, by delivering
            astonishing User Interfaces, but don't want to comprimise performance, accessiblity and development speed.
          </p>
          <p>
            Besides work, I spend my time with illustrating, Photography and Music. I'd love to explore areas that
            combine Art and Web Technologies together!
          </p>
        </div>
      </div>
    </section>
  );
}
