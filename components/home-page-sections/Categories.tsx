import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";

import Space from "@/components/ui/Space";
import { categorySlugs } from "@/constants/categories";

import categoryImageArt from "@/public/static/category-images/art-2.jpeg";
import categoryImageMusic from "@/public/static/category-images/music-2.jpg";
import categoryImageFarsi from "@/public/static/category-images/farsi.jpg";
import categoryImageSport from "@/public/static/category-images/sport.jpg";
import categoryImageScience from "@/public/static/category-images/science.jpg";
import categoryImageLanguage from "@/public/static/category-images/languages.jpg";
import categoryImageProgramming from "@/public/static/category-images/programming.jpg";
import categoryImageChess from "@/public/static/category-images/chess.jpg";
import LinkButton from "../ui/button/LinkButton";

const categories = [
  {
    id: 2,
    created_at: "2023-12-09T17:26:05.277829+00:00",
    name: "Music",
    nameFa: "موسیقی",
    parentId: null,
    youngParentId: null,
    level: 1,
    bg: "bg-brand-blue",
    imageSrc: "/static/category-images/music-2.jpg",
    image: categoryImageMusic,
    gradientTo: "to-brand-warm-black",
    icon: "bf-i-ph-music-note",
  },
  {
    id: 5,
    created_at: "2023-12-09T17:26:05.277829+00:00",
    name: "Language",
    nameFa: "زبان",
    parentId: null,
    youngParentId: null,
    level: 1,
    bg: "bg-brand-blue",
    imageSrc: "/static/category-images/languages.jpg",
    image: categoryImageLanguage,

    gradientTo: "to-brand-pink",
    icon: "bf-i-ph-translate",
  },

  {
    id: 4,
    created_at: "2023-12-09T17:26:05.277829+00:00",
    name: "Farsi",
    nameFa: "فارسی",
    parentId: null,
    youngParentId: null,
    level: 1,
    bg: "bg-brand-blue",
    imageSrc: "/static/category-images/farsi.jpg",
    image: categoryImageFarsi,
    gradientTo: "to-brand-coral",
    icon: "bf-i-ph-book-open-text",
  },
  {
    id: 8,
    created_at: "2023-12-09T17:26:05.277829+00:00",
    name: "Chess",
    nameFa: "شطرنج",
    parentId: null,
    youngParentId: null,
    level: 1,
    bg: "bg-brand-blue",
    imageSrc: "/static/category-images/chess.jpg",
    image: categoryImageChess,
    gradientTo: "to-brand-blue",
    icon: "bf-i-ph-horse",
  },
  {
    id: 7,
    created_at: "2023-12-09T17:26:05.277829+00:00",
    name: "Science",
    nameFa: "ریاضی و علوم",
    parentId: null,
    youngParentId: null,
    level: 1,
    bg: "bg-brand-blue",
    imageSrc: "/static/category-images/science.jpg",
    image: categoryImageScience,
    gradientTo: "to-brand-green",
    icon: "bf-i-ph-atom",
  },
  {
    id: 6,
    created_at: "2023-12-09T17:26:05.277829+00:00",
    name: "Sport",
    nameFa: "ورزش",
    parentId: null,
    youngParentId: null,
    level: 1,
    bg: "bg-brand-blue",
    image: categoryImageSport,
    imageSrc: "/static/category-images/sport.jpg",
    gradientTo: "to-brand-orange",
    icon: "bf-i-ph-football",
  },

  {
    id: 3,
    created_at: "2023-12-09T17:26:05.277829+00:00",
    name: "Programming",
    nameFa: "برنامه نویسی",
    parentId: null,
    youngParentId: null,
    level: 1,
    bg: "bg-brand-blue",
    imageSrc: "/static/category-images/programming.jpg",
    image: categoryImageProgramming,
    gradientTo: "to-brand-amber",
    icon: "bf-i-ph-code-bold",
  },

  {
    id: 1,
    created_at: "2023-12-09T17:26:05.277829+00:00",
    name: "Art",
    nameFa: "هنر",
    parentId: null,
    youngParentId: null,
    level: 1,
    bg: "bg-brand-blue",
    imageSrc: "/static/category-images/music.jpg",
    image: categoryImageArt,
    gradientTo: "to-brand-brown",
    icon: "bf-i-ph-palette",
  },
];

export default function Categoreis() {
  const { t } = useTranslation();
  const supabase = useSupabaseClient();
  const { locale } = useRouter();

  const categoryQ = useQuery({
    queryKey: ["categoryAdminDashReports-12"],
    queryFn: async () => {
      // const { data, error } = await supabase.from("topic").select(`category`);
      const { data, error } = await supabase.from("category").select(`*`).filter("parentId", "is", null);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="relative">
      <BluredCircle radius={200} top="50%" left="95%" bg="bg-pink3" blur="200px" />
      <BluredCircle radius={100} top="10%" left="5%" bg="bg-amber3" blur="200px" />
      <BluredCircle radius={200} top="80%" left="25%" bg="bg-green3" blur="100px" />

      <div className="max-w-page mx-auto">
        <h2 className="H2 c-title">{t("home:classes")}</h2>
        <Space size="h-4" />
        <ul
          className={` grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4
        lt-sm:grid-flow-row-dense
          `}
          style={{ gridTemplateRows: "repeat(16 , auto)" }}
        >
          {categories.map((cat) => {
            return <CategoryCard key={`category-card-${cat.id}`} category={cat} />;
          })}
          <li
            className={` md:g-row-9/10 md:g-col-4/5
            sm:g-row-8/12 sm:g-col-3/4
            grid-row-span-1 g-col-2/3 shd-tinted-3
          `}
          >
            <LinkButton
              width="parent"
              variation="solid"
              href="/classes"
              className={`!py-2em !rd-3 flex justify-between items-center 
           `}
            >
              View All Calsses
              <Icon name="bf-i-ph-arrow-right" className="mis-2 text-2xl" subdued={false} />
            </LinkButton>
          </li>
        </ul>
      </div>
    </section>
  );
}

const gridPosition = {
  music: `
  md:g-row-2/5 md:g-col-1/2
  sm:g-row-2/5 sm:g-col-1/2
  g-row-3/5 g-col-1/2
  
  `,
  language: `
    md:g-row-3/7 md:g-col-2/3
    sm:g-row-3/6 sm:g-col-2/3
    grid-row-span-6 g-col-2/3
  `,
  farsi: `
    md:g-row-4/6 md:g-col-3/4
    sm:g-row-1/5 sm:g-col-3/4
    grid-row-span-4 g-col-1/2
  `,
  chess: `
    md:g-row-1/5 md:g-col-4/5
    sm:g-row-5/8 sm:g-col-1/2
    grid-row-span-5 g-col-2/3
  `,
  science: `
    md:g-row-5/9 md:g-col-1/2
    sm:g-row-6/10 sm:g-col-2/3
    grid-row-span-6 g-col-1/2
  `,
  sport: `
    md:g-row-7/12 md:g-col-2/3
    sm:g-row-5/8 sm:g-col-3/4
    grid-row-span-5 g-col-2/3
  `,
  programming: `
    md:g-row-6/11 md:g-col-3/4
    sm:g-row-8/-2 sm:g-col-1/2
    grid-row-span-9 g-col-1/2
  `,
  art: `
    md:g-row-5/9 md:g-col-4/5
    sm:g-row-10/-1 sm:g-col-2/3
    grid-row-span-2 g-col-2/3`,
};

function CategoryCard({ category }) {
  const { t } = useTranslation();
  const supabase = useSupabaseClient();
  const { locale } = useRouter();
  const imageUrl = supabase.storage.from("base").getPublicUrl(`categories/${category.name.toLowerCase()}`);

  const categorySlug = category.id ? categorySlugs[category.id] : "";

  return (
    <li key={category.id} className={`${gridPosition[category.name.toLowerCase()]} `}>
      <Link
        href={`/classes/${categorySlug}`}
        className={` rd-xl overflow-hidden  shd-tinted-4 ${category.bg} h-full grid`}
        style={{
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr auto",
          // gridRow: `${categoryGridRow[category.name.toLowerCase()]}`,
          // gridColumn: `${categoryGridColumn[category.name.toLowerCase()]}`
        }}
      >
        <Image
          src={category.image}
          width={500}
          height={300}
          alt={locale === "fa" ? category.nameFa : category.name}
          className="w-full h-full  sm:h-full object-cover"
          style={{ gridArea: "1/1/-1/1" }}
          priority
        />
        <GradientOverlay gradient={`bg-gradient-to-b from-brand-orange/5  to-brand-orange/90  `} />
        <div className="flex justify-between items-end p-4 " style={{ gridArea: "2/1/-1/-1" }}>
          <h3 className="font-display c-melow text-xl sm:text-2xl tracking-tight c-white capitalize">
            <div>
              <Icon name={category.icon} subdued={false} className="text-2xl" />
              <div className="h-1"></div>
            </div>
            <span className="!fw-600">{locale === "fa" ? category.nameFa : category.name}</span>
          </h3>{" "}
          <span className="c-white  whitespace-nowrap item-end">
            <span className="sr-only">{t("home:tiles.explore")}</span>
            <span
              className={`before:opacity-100 text-xl ${
                locale === "fa" ? "bf-i-ph-caret-left-bold mie-1" : "bf-i-ph-caret-right-bold mis-1"
              }`}
            />
          </span>
        </div>
      </Link>
    </li>
  );
}

function GradientOverlay({ gradient }) {
  return <div className={`${gradient} `} style={{ gridArea: "1/1/-1/-1" }}></div>;
}
