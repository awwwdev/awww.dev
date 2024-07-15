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
import Icon from "@/components/ui/Icon";


export default function Features() {
  const { t } = useTranslation();

  return (
    <section className=" ">
      <div className="max-w-page mx-auto">
        <h2 className="sr-only H2 c-title  ">{t("home:why.title")}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3  sm:gap-4 gap-6">
          <FeatureCard
            title={t("home:why.first.title")}
            description={t("home:why.first.description")}
            color="bg-pink4"
            icon='bf-i-ph-devices'
            />
          <FeatureCard
            title={t("home:why.second.title")}
            description={t("home:why.second.description")}
            color="bg-sky4"
            icon='bf-i-ph-piggy-bank'
            />
          <FeatureCard
            title={t("home:why.third.title")}
            description={t("home:why.third.description")}
            color="bg-yellow4"
            icon='bf-i-ph-star'
          />
        </ul>
      </div>
    </section>
  );
}

function FeatureCard({ color, title, description , icon}) {
  const { t } = useTranslation();

  return (
    <li className="rd-4 text-sm  flex sm:flex-col sm:items-start md:flex-row gap-3 items-center">
      <FeatureIcon color={color} icon={icon}/>
      <div className="flex-1 leading-tight c-melow">
        <p className="font-bold   ">{title}</p>
        <p>{description}</p>
      </div>
    </li>
  );
}

function FeatureIcon({ color, icon }) {
  return (
    <div className={`w-12 h-12 rd-full ${color} flex justify-center items-center shd-tinted-3`}>
      {/* <Icon name="bf-i-ph-list" /> */}
      <Icon name={icon} className='text-lg c-brand-dark-blue' subdued={false} />
    </div>
  );
}
