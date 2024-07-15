import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
import { getFullName, getFullNameFa } from "@/utils/formatter";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import WithSidebar from "@/components/ui/WithSidebar";
import LinkButton from "@/components/ui/button/LinkButton";
import { En, Fa } from "@/components/ui/multilang";
import StarRating from "@/components/ui/StarRating";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Skeleton } from "@/components/ui/Skeleton";
import Checkbox from "@/components/ui/Checkbox";
import Fieldset from "@/components/ui/Fieldset";
import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  createColumnHelper,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";

import { InputDebaounced } from "@/components/Table/Filter";
import { DCategory, DExpertise, DFeedback, DProfileSubcategory, DSiteProfile, DTeacher, DTopic, DUser } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useIntersectionObserver from "@/hooks/useInsersectionObserver";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import DesktopOnly from "@/components/ui/DesktopOnly";
import MobileOnly from "@/components/ui/MobileOnly";
import Icon from "@/components/ui/Icon";
import Space from "@/components/ui/Space";
import Button from "@/components/ui/button";

type Profile = {
  profileId: string;
  categoryName: string;
  categoryNameFa: string;
  teacherFullName: string;
  teacherFullNameFa: string;
  topicName: string;
  topicNameFa: string;
  englishFluency: string;
  englishFluencyFa: string;
  price: number;
  rating: number;
  status: string | null;
};

type CategoryQType = Pick<DCategory, "id" | "name" | "nameFa" | "level">;

type SubcategoryQType = DCategory;

type ProfileQType = DSiteProfile & { topic: Pick<DTopic, "name" | "nameFa"> } & {
  teacher: Pick<DTeacher, "englishFluency"> & { course: { feedback: Pick<DFeedback, "studentRating">[] }[] } & {
    expertise: Pick<DExpertise, "sessionPriceInCAD" | "sessionDurationOnWebsiteInMinute" | "endDate">[];
  } & { user: Pick<DUser, "firstname" | "lastname" | "firstnameFa" | "lastnameFa"> };
} & { profileSubcategory: { categoryId: Pick<DProfileSubcategory, "categoryId"> } };

const PAGE_SIZE = 12;

export default function HeroSearchResultsGrid({
  data,
  searchTerm,
  setSearchTerm,
}: {
  data: any[];
  searchTerm: any;
  setSearchTerm: any;
}) {
  const columnHelper = createColumnHelper<Profile>();

  const columns = [
    columnHelper.accessor("profileId", {}),
    columnHelper.accessor("categoryName", {}),
    columnHelper.accessor("categoryNameFa", {}),
    columnHelper.accessor("teacherFullName", {}),
    columnHelper.accessor("teacherFullNameFa", {}),
    columnHelper.accessor("topicName", {}),
    columnHelper.accessor("topicNameFa", {}),
    columnHelper.accessor("englishFluency", {}),
    columnHelper.accessor("englishFluencyFa", {}),
    columnHelper.accessor("price", {}),
    columnHelper.accessor("rating", {}),
    columnHelper.accessor("status", {}),
  ];

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const [globalFilter, setGlobalFilter] = useState("");

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter: searchTerm,
      // pagination: {
      //   pageSize: 24,
      //   pageIndex: 0
      // }
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setSearchTerm,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  // const tableContainerRef = React.useRef<HTMLDivElement>(null);

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table

  // check if the <ul> has reached the top of page to show the sahdows
  // const ref = useRef<HTMLUListElement>(null!);
  // const [isShadowVisiable, setIsShadowVisible] = useState(false);
  // useEffect(() => {
  //   const element = ref.current;
  //   const handleScroll = (e) => {
  //     console.log("do something", element.offsetTop);
  //     if (element.scrollTop  === 0) {
  //       setIsShadowVisible(true);
  //       // do whatever you want here
  //     }
  //   };
  //   document.addEventListener("scroll", handleScroll);
  //   return () => element.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div className="py-2 lt-sm:max-table-width-in-mobile sm:max-w-main relative flex flex-col h-full   ">
      <div
        //  onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        // ref={tableContainerRef}
        className="h-full"
      >
        {table.getRowModel().rows.length === 0 && (
          <div className="flex justify-center items-center h-full gap-1">
            <Icon name="bf-i-ph-smiley-sad" className='text-lg' />
            <p>
              <En>No Result Found.</En>
              <Fa>نتیجه‌ای یافت نشد.</Fa>
            </p>
          </div>
        )}
        <ul
          className="grid gap-6 "
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(15rem , 100%), 1fr ))" }}
        >
          {table.getRowModel().rows.map((row, index) => {
            return (
              <ClassCardForTableHook
                key={row.getValue("profileId")}
                profileId={row.getValue("profileId")}
                topicName={row.getValue("topicName")}
                topicNameFa={row.getValue("topicNameFa")}
                teacherFullName={row.getValue("teacherFullName")}
                teacherFullNameFa={row.getValue("teacherFullNameFa")}
                englishFluency={row.getValue("englishFluency")}
                englishFluencyFa={row.getValue("englishFluencyFa")}
                price={row.getValue("price")}
                rating={row.getValue("rating")}
                status={row.getValue("status")}
                categoryName={row.getValue("categoryName")}
              />
            );
          })}
        </ul>
      </div>
      {/* <div>{isFetching && <LoadingSpinner />}</div> */}
      {/* <div className="mt-auto"></div> */}
      {/* <InfinitScrollObserver fetchNextPage={fetchNextPage} setIsFetching={setIsFetching} /> */}
      {/* {table.getPageCount() > 1 && 
      <Pagination table={table} pageIndex={pageIndex} />
      } */}
    </div>
  );
}

function Shadow() {
  return (
    <div className="h-10 absolute top-0 w-full translate-y-90%    -z-1 px-10 ">
      <div className=" bg-[#301f12] opacity-50 blur-20 rd-b-50%  w-full h-full  mix-blend-multiply  "></div>
    </div>
  );
}

const InfinitScrollObserver = ({ fetchNextPage, setIsFetching }) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    onChange: (inView) => {
      if (inView) {
        setIsFetching(true);
        fetchNextPage();
      }
      if (!inView) {
        setIsFetching(false);
      }
    },
  });

  return <div ref={ref}>{/* <h2>{`Header inside viewport ${inView}.`}</h2> */}</div>;
};

function ClassCardForTableHook({
  profileId,
  topicName,
  topicNameFa,
  teacherFullName,
  teacherFullNameFa,
  englishFluency,
  englishFluencyFa,
  price,
  rating,
  status,
  categoryName,
}) {
  const supabase = useSupabaseClient();
  const imageUrl = supabase.storage.from("teacher").getPublicUrl(`photo/${profileId}`);

  return (
    <li key={profileId} className="">
      <Link href={`/tutors/${profileId}`} target="_blank" className="flex gap-3 ">
        <div className="grid relative isolate w-20 h-20 shrink-0">
          <Image
            src={imageUrl.data.publicUrl}
            width={80}
            height={80}
            alt="avatar"
            className="rd-xl bg-gray5 object-cover aspect-ratio-1/1 w-full"
            loading="lazy"
          />
          {/* <div className="absolute top-2 right-2 z-10">
            <Status status={status} />
          </div> */}
        </div>
        <div>
   
          <h3 className=' gap-1 line-clamp-1'>
          <span className='text-sm opacity-50 mie-1 inline-flex items-baseline'>
              <CategoryIcon categoryName={categoryName} />
            </span>
            <Fa>
              <span className="c-sand11  fw-900 leading-5">{topicNameFa}</span>
            </Fa>
            <En>
              <span className="c-sand11  fw-600 leading-4">{topicName}</span>
            </En>
          </h3>
          <p className="c-sand11 text-xs">
            <Fa>{teacherFullNameFa}</Fa>
            <En>{teacherFullName}</En>
          </p>
          {/* <p className="c-sand11">
            <Fa>{englishFluency}</Fa>
            <En>{englishFluency}</En>
          </p> */}
          <p className="c-sand11 text-xs">CAD {price}/session</p>
          <div className="text-2xs">
            <StarRating number={rating} />
          </div>
        </div>
      </Link>
    </li>
  );
}

function CategoryIcon({ categoryName }) {
  return (
    <>
      {categoryName.toLowerCase() === "art" && <Icon name="bf-i-ph-palette" subdued={false} />}
      {categoryName.toLowerCase() === "music" && <Icon name="bf-i-ph-music-note" subdued={false} />}
      {categoryName.toLowerCase() === "programming" && <Icon name="bf-i-ph-code" subdued={false} />}
      {categoryName.toLowerCase() === "farsi" && <Icon name="bf-i-ph-book-open-text" subdued={false} />}
      {categoryName.toLowerCase() === "language" && <Icon name="bf-i-ph-translate" subdued={false} />}
      {categoryName.toLowerCase() === "sport" && <Icon name="bf-i-ph-football" subdued={false} />}
      {categoryName.toLowerCase() === "science" && <Icon name="bf-i-ph-atom" subdued={false} />}
      {categoryName.toLowerCase() === "chess" && <Icon name="bf-i-ph-horse" subdued={false} />}
    </>
  );
}

function Status({ status }) {
  if (!status) return <></>;
  return (
    <p
      className={`px-2 py-0.5 rd-2 w-fit flex items-baseline gap-1 
      ${status === "new" && "c-accent3 primary-gradient"}
      ${status === "busy" && "c-red3 bg-tomato9"}
      `}
    >
      {status === "new" && <Icon name="bf-i-ph-sparkle" className="before:opacity-100" />}
      {status === "busy" && <Icon name="bf-i-ph-calendar-x" className="before:opacity-100" />}
      {status}
    </p>
  );
}
