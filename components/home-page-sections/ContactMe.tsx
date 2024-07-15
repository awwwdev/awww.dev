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

export default function ContactMe() {
  const { t } = useTranslation();

  return (
    <section className="relative">
      <BluredCircle radius={100} top="20%" left="95%" bg="bg-amber2" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-blue3" blur="200px" />

      <div className="mx-auto max-w-page  ">
        <div className="max-w-page mx-auto  b-t-1 pt-12">
          <h2 className="H1">Contact</h2>

          <div className="h-12"></div>
          <p className="c-sand11">Let&apos;s get in touch</p>
          <p className="c-gray11">Feel free to contact me. I try to reach back to you soon.</p>
          <div className="h-6"></div>
          <ul className="flex flex-wrap gap-4 ac">
            <li>
              <LinkButton
                variation="ghost"
                href="https://github.com/vashmeen"
                className="c-gray11 before:c-gray12 bg-gradient-to-r from-gray1 to-transparent hover:b-gray3A hover:from-gray2 hover:to-gray1 bg-origin-border py-4 b-1.5 b-gray4A px-8 rd-xl  flex ac bf-i-logos-github-icon before:opacity-80 dark:before:filter-invert-100"
              >
                My GitHub
              </LinkButton>
            </li>
            <li>
              <LinkButton
                variation="ghost"
                href="https://www.linkedin.com/in/hamidddev/"
                className="c-gray11 before:c-gray12 bg-gradient-to-r from-gray1 to-transparent hover:b-gray3A hover:from-gray2 hover:to-gray1 bg-origin-border py-4 b-1.5 b-gray4A px-8 rd-xl flex ac before:c-blue4 bf-i-logos-linkedin-icon before:opacity-80"
              >
                My Linkedin
              </LinkButton>
            </li>
            <li>
              <LinkButton
                variation="solid-accent"
                href="mailto:hamidpm@proton.me"
                className="b-1 fw-500 rd-xl b-orange6A dark:b-orange7A c-accent11 bg-gradient-to-r from-accent1 to-sand1 active:b-orange8A active:from-accent5 active:to-sand2 hover:b-orange7A hover:from-accent2 hover:to-accent1 focus:b-orange8A focus:from-accent4 focus:to-accent2  disabled:btn-disabled bg-origin-border c-accent11 fw-500 py-4 b-1.5 px-8 rd-xl flex gap-4 ac "
              >
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.666 27.3333H9.33268C5.33268 27.3333 2.66602 25.3333 2.66602 20.6667V11.3333C2.66602 6.66666 5.33268 4.66666 9.33268 4.66666H22.666C26.666 4.66666 29.3327 6.66666 29.3327 11.3333V20.6667C29.3327 25.3333 26.666 27.3333 22.666 27.3333Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M24.5 10L18.494 15.3333C17.1207 16.4267 14.8673 16.4267 13.494 15.3333L7.5 10"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                {/* <img src="/icons/email.svg" alt="" height={20} width={20} className"c-orange11" /> */}
                Email Me
              </LinkButton>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
