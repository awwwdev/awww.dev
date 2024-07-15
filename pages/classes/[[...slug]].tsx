import { NextPage } from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getFullName, getFullNameFa } from "@/utils/formatter";
import React, { useMemo, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import WithSidebar from "@/components/ui/WithSidebar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Skeleton } from "@/components/ui/Skeleton";

import { DCategory, DExpertise, DFeedback, DProfileSubcategory, DSiteProfile, DTeacher, DTopic, DUser } from "@/types";
import shuffleArray from "@/utils/shuffleArray";
import CardsGrid from "@/components/classes-page-components/CardsGrid";
import Filters from "@/components/classes-page-components/Filters";
import SubCategoriesTags from "@/components/classes-page-components/SubCategoryTags";
import CategoryTags from "@/components/classes-page-components/CategoryTags";
import Search from "@/components/classes-page-components/Search";
import SortBy from "@/components/classes-page-components/SortBy";
import Space from "@/components/ui/Space";
import { En, Fa } from "@/components/ui/multilang";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

type CategoryQType = Pick<DCategory, "id" | "name" | "nameFa" | "level">;

type SubcategoryQType = DCategory;

type ProfileQType = DSiteProfile & { topic: Pick<DTopic, "name" | "nameFa"> } & {
  teacher: Pick<DTeacher, "englishFluency"> & { course: { feedback: Pick<DFeedback, "studentRating">[] }[] } & {
    expertise: Pick<DExpertise, "sessionPriceInCAD" | "sessionDurationOnWebsiteInMinute" | "endDate">[];
  } & { user: Pick<DUser, "firstname" | "lastname" | "firstnameFa" | "lastnameFa"> };
} & { profileSubcategory: { categoryId: Pick<DProfileSubcategory, "categoryId"> } };

const PAGE_SIZE = 24;

const categoryIds = {
  all: "",
  art: "1",
  music: "2",
  programming: "3",
  farsi: "4",
  language: "5",
  sport: "6",
  science: "7",
  chess: "8",
};

export async function getServerSideProps(ctx) {
  const { locale } = ctx;

  const [categorySlug, subcategoryId] = ctx.params.slug ?? [null, null];

  const categoryId = categorySlug ? categoryIds[categorySlug] : null;

  const queryClient = new QueryClient();

  const supabase = createServerSupabaseClient(ctx);

  await queryClient.prefetchQuery({
    queryKey: ["categoryNewWebsite-1"],
    queryFn: async () => {
      const { data, error }: any = await supabase
        .from("category")
        .select(`id, name, nameFa, level`)
        .filter("parentId", "is", null);
      if (error) throw error;
      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["subcategoryNewWebsite-1", categoryId],
    queryFn: async () => {
      const { data, error }: any = await supabase
        .from("category")
        .select(`*`)
        .eq("level", "2")
        .eq("parentId", categoryId);

      if (error) throw error;
      return data;
    },
    enabled: !!categoryId,
  });

  await queryClient.prefetchQuery({
    queryKey: ["siteProfileTutors", categoryId ?? null, subcategoryId ?? null],
    queryFn: async () => {
      let query = supabase
        .from("siteProfile")
        .select(
          `*, 
          topic (name, nameFa), 
          teacher(
            course(feedback(studentRating)), 
            englishFluency, 
            expertise(sessionPriceInCAD, sessionDurationOnWebsiteInMinute, endDate),
            user(firstname, lastname, firstnameFa, lastnameFa)
          ), 
          profileSubcategory!inner(categoryId)`
        )
        .eq("isTeacherIn", true);
      if (!!categoryId) {
        query = query.match({ categoryId });
      }
      if (!!subcategoryId) {
        query = query.filter("profileSubcategory.categoryId", "eq", subcategoryId);
      }
      const { data, error }: any = await query;
      if (error) throw error;
      return data;
    },
    // select: (data) => shuffleArray(data),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      locale,
      ...(await serverSideTranslations(locale, ["common", "classes", "header", "footer"])),
    },
  };
}


const Page: NextPage = () => {
  const router = useRouter();
  const params = router.query.slug;
  const categorySlug = params?.[0];
  const subcategoryId = params?.[1];
  const categoryId = useMemo( () => {
    return categorySlug ? categoryIds[categorySlug] : null;
  } , [categorySlug])

  const supabase = useSupabaseClient();

  type FiltersType = {
    englishFluency: string[];
    ageGroup: string[];
    sort: "random" | "highest-price" | "lowest-price";
  };

  const [filters, setFilters] = useState<FiltersType>({
    englishFluency: [],
    ageGroup: [],
    sort: "random",
  });

  const categoryQ = useQuery<CategoryQType[]>({
    queryKey: ["categoryNewWebsite-1"],
    queryFn: async () => {
      const { data, error }: any = await supabase
        .from("category")
        .select(`id, name, nameFa, level`)
        .filter("parentId", "is", null);
      if (error) throw error;
      return data;
    },
  });

  const subcategoryQ = useQuery<SubcategoryQType[]>({
    queryKey: ["subcategoryNewWebsite-1", categoryId],
    queryFn: async () => {
      const { data, error }: any = await supabase
        .from("category")
        .select(`*`)
        .eq("level", "2")
        .eq("parentId", categoryId);

      if (error) throw error;
      return data;
    },
    enabled: !!categoryId,
  });

  const profileQ = useQuery<ProfileQType[]>({
    queryKey: ["siteProfileTutors", categoryId, subcategoryId],
    queryFn: async () => {
      let query = supabase
        .from("siteProfile")
        .select(
          `*, 
          topic (name, nameFa), 
          teacher(
            course(feedback(studentRating)), 
            englishFluency, 
            expertise(sessionPriceInCAD, sessionDurationOnWebsiteInMinute, endDate),
            user(firstname, lastname, firstnameFa, lastnameFa)
          ), 
          profileSubcategory!inner(categoryId)`
        )
        .eq("isTeacherIn", true);
      if (!!categoryId) {
        query = query.match({ categoryId });
      }
      if (!!subcategoryId) {
        query = query.filter("profileSubcategory.categoryId", "eq", subcategoryId);
      }
      const { data, error }: any = await query;
      if (error) throw error;
      return data;
    },
    // select: (data) => shuffleArray(data),
  });

  const onCheckboxChange = (checked: boolean, value: string, filterGroup: string) => {
    switch (filterGroup) {
      case "englishFluency":
        setFilters((prevFilters) => {
          if (checked) {
            return { ...prevFilters, englishFluency: [...prevFilters.englishFluency, value] };
          } else {
            return {
              ...prevFilters,
              englishFluency: prevFilters.englishFluency.filter((fluency) => fluency !== value),
            };
          }
        });
        break;
      case "ageGroup":
        setFilters((prevFilters) => {
          if (checked) {
            return { ...prevFilters, ageGroup: [...prevFilters.ageGroup, value] };
          } else {
            return { ...prevFilters, ageGroup: prevFilters.ageGroup.filter((age) => age !== value) };
          }
        });
        break;
    }
  };

  const onSortChange = (sortOption) => {
    setFilters((prevFilters) => ({ ...prevFilters, sort: sortOption }));
  };

  const filteredData = useMemo(() => {
    if (!profileQ.data) return null;
    const correctFormatData = profileQ.data.map((profile) => {
      return {
        ...profile,
        price: profile.teacher.expertise.find((exp) => exp.endDate === null)?.sessionPriceInCAD,
      };
    });
    const filtered = correctFormatData.filter((profile) => {
      let englishFluencyMatch =
        filters.englishFluency.length === 0 ||
        (profile.teacher.englishFluency && filters.englishFluency.includes(profile.teacher.englishFluency));
      const ageGroupMatch =
        filters.ageGroup.length === 0 ||
        (profile.studentRange && profile.studentRange.some((range) => filters.ageGroup.includes(range)));
      return englishFluencyMatch && ageGroupMatch;
    });
    return filtered;
  }, [profileQ.data, filters.englishFluency, filters.ageGroup]);

  function NumOrZero(num: number | string | null | undefined) {
    if (!num) return 0;
    return Number(num);
  }

  const sortedAndFilteredData = useMemo(() => {
    if (!filteredData) return null;

    let sorted = [...filteredData];
    switch (filters.sort) {
      case "lowest-price":
        sorted.sort((a, b) => NumOrZero(a.price) - NumOrZero(b.price));
        break;
      case "highest-price":
        sorted.sort((a, b) => NumOrZero(b.price) - NumOrZero(a.price));
        break;
      case "random":
        sorted = shuffleArray(sorted);
        break;
    }
    return sorted;
  }, [filteredData, filters.sort]);

  const { locale } = useRouter();

  const breadcrumbSteps = [
    { title: "Home", href: "" },
    { title: "Classes", href: "/classes" },
  ];

  const theCategory = useMemo(() => {
    if (categoryId && categoryQ.data) {
      return categoryQ.data.find((cat) => `${cat.id}` === categoryId);
    }
  }, [categoryId, categoryQ.data]);

  const theSubCategory = useMemo(() => {
    if (categoryId && subcategoryId && subcategoryQ.data) {
      return subcategoryQ.data.find((subC) => `${subC.id}` === subcategoryId);
    }
  }, [categoryId, subcategoryId, subcategoryQ.data]);

  if (categoryId && categoryQ.data) {
    breadcrumbSteps.push({ title: theCategory?.name ?? "", href: `/classes/${categorySlug}` });
  }
  if (categoryId && subcategoryId && subcategoryQ.data) {
    breadcrumbSteps.push({ title: theSubCategory?.name ?? "", href: `/classes/${categorySlug}/${subcategoryId}` });
  }


  
  return (
    <div className="mx-auto max-w-70rem">
      <h1 className="H1 sr-only">
        <Fa>
          {theCategory?.nameFa ?? "همه کلاس‌ها"} {theSubCategory && ` - ${theSubCategory.nameFa}`}
        </Fa>
        <En>
          {theCategory?.name ?? "All Classes"} {theSubCategory && ` - ${theSubCategory.name}`}
        </En>
      </h1>
      <Space size="h-2" />
      <div className="">
        <nav id={locale === "en" ? "classes" : "کلاس‌ها"} className=" bg-brand-app-bg">
          <CategoryTags />
          <div className="h-2"></div>
          <hr />
          {categoryId && categoryQ.data && subcategoryQ.data && subcategoryQ.data.length > 0 && (
            <>
              <Space size="h-3" />
              <SubCategoriesTags subcategoryQ={subcategoryQ} categorySlug={categorySlug} />
              <Space size="h-3" />
              <hr />
            </>
          )}
        </nav>
        {/* <div className=''>
        <Space size="h-3" />
        <Breadcrumb steps={breadcrumbSteps} />
        <Space size="h-3" />
          <hr />
        </div> */}

        <div className="flex flex-col sm:flex-row-reverse sm:gap-6" style={{ gridTemplateColumns: "1fr" }}>
          <div className="sm:w-12.5rem shrink-0 relative ">
            <Filters onCheckboxChange={onCheckboxChange} filters={filters} />
          </div>
          <div className="grow ">
            {profileQ.isLoading && <CardsGridSkeleton />}
            {sortedAndFilteredData && (
              <CardsGrid
                data={sortedAndFilteredData.map((profile) => {
                  return {
                    profileId: profile.id,
                    teacherFullName: getFullName(profile.teacher.user),
                    teacherFullNameFa: getFullNameFa(profile.teacher.user),
                    topicName: profile.topic.name,
                    topicNameFa: profile.topic.nameFa,
                    englishFluency: profile.teacher.englishFluency,
                    englishFluencyFa: profile.teacher.englishFluency,
                    price: profile.teacher.expertise.find((exp) => exp.endDate === null)?.sessionPriceInCAD,
                    rating: calculateTeacherRating(profile),
                    status: profile.status,
                    availability: profile.availability,
                    availabilityFa: profile.availabilityFa
                  };
                })}
                onSortChange={onSortChange}
                filters={filters}
              />
            )}
          </div>
        </div>
      </div>
      <div className="h-10"></div>
    </div>
  );
};

function CardsGridSkeleton() {
  return (
    <div className=" lt-sm:max-table-width-in-mobile sm:max-w-main relative">
      <div className="sticky top-0 z-10 b-b-1 b-sand5">
        <div className="relative pb-4 bg-[#FCF9F7] py-4 ">
          <div className="flex flex-wrap ac gap-8 justify-between bg-[#FCF9F7]">
            <Search value="" onChange={() => {}} placeholder="Search tutors, topics" />
            <SortBy onSortChange={() => {}} filters={{}} />
          </div>
          {/* Shadow effect */}
          <div className="h-10 absolute top-0 w-full translate-y-90%    -z-1 px-10 ">
            <div className=" bg-sand8 opacity-80 blur-20 rd-b-50%  w-full h-full  "></div>
          </div>
        </div>
      </div>
      <Space size="h-19" />
      <ul className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(15rem , 100%), 1fr ))" }}>
        {Array.from(Array(PAGE_SIZE).keys()).map((i) => {
          return <ClassCardSkeleton key={i} />;
        })}
      </ul>
    </div>
  );
}

function ClassCardSkeleton() {
  return (
    <li role="presentation" className="">
      <div className="grid ">
        <Skeleton className=" rd-xl object-cover aspect-ratio-1/1 w-full " />
      </div>
      <div className="h-3"></div>
      <p className="text-xl skeleton-text w-40% "></p>
      <div className="h-1"></div>
      <div className='text-sm line-height-1.05'>

      <p className="skeleton-text w-60%  "></p>
      <p className="skeleton-text w-40% "></p>
      <div className="flex justify-between">
        <p className="skeleton-text w-40% "></p>
        <p className="skeleton-text w-20%  "></p>
      </div>
      </div>
    </li>
  );
}

export default Page;


export function calculateTeacherRating(profile: ProfileQType){

  const hasRatings =   profile.teacher.course.some((course) =>
    course.feedback.some((feedback) => feedback.studentRating !== null));
  // console.log("🚀 ~ hasRatings:", hasRatings)

  if (!hasRatings) return -1;

  const numberOfFeebacks =  profile.teacher.course
  .filter((course) => course.feedback.some((feedback) => feedback.studentRating !== null))
  .reduce((totalFeedbacks, course) => totalFeedbacks + course.feedback.length, 0);
  console.log("🚀 ~ numberOfFeebacks:", numberOfFeebacks)

  const sumOfFeedbacks = profile.teacher.course
  .filter((course) => course.feedback.some((feedback) => feedback.studentRating !== null))
  .reduce((totalRatings, course) => {
    const courseRatings = course.feedback.reduce(
      (acc, feedback) => acc + (feedback.studentRating || 0),
      0
    );
    return totalRatings + courseRatings;
  }, 0);

return ( sumOfFeedbacks / numberOfFeebacks)
};
