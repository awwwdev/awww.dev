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

export default function Works() {
  const { t } = useTranslation();

  return (
    <section className="relative">
      <BluredCircle radius={100} top="20%" left="95%" bg="bg-brand-light-amber" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-brand-light-blue" blur="200px" />

      <div className="mx-auto max-w-70rem  ">
        

      </div>
    </section>
  );
}
