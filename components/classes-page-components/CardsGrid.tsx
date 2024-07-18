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
import Search from "./Search";
import SortBy from "./SortBy";
import Pagination from "./Pagiantion";
import ToolTip from "../ui/Tooltip";
import Snack from "../ui/Snack";

type Profile = {
  profileId: string;
  teacherFullName: string;
  teacherFullNameFa: string;
  topicName: string;
  topicNameFa: string;
  englishFluency: string;
  englishFluencyFa: string;
  price: number;
  rating: number;
  status: string | null;
  availability: string | null;
};

type CategoryQType = Pick<DCategory, "id" | "name" | "nameFa" | "level">;

type SubcategoryQType = DCategory;

type ProfileQType = DSiteProfile & { topic: Pick<DTopic, "name" | "nameFa"> } & {
  teacher: Pick<DTeacher, "englishFluency"> & { course: { feedback: Pick<DFeedback, "studentRating">[] }[] } & {
    expertise: Pick<DExpertise, "sessionPriceInCAD" | "sessionDurationOnWebsiteInMinute" | "endDate">[];
  } & { user: Pick<DUser, "firstname" | "lastname" | "firstnameFa" | "lastnameFa"> };
} & { profileSubcategory: { categoryId: Pick<DProfileSubcategory, "categoryId"> } };

const PAGE_SIZE = 12;

export default function CardsGrid({ data, onSortChange, filters }: { data: any[]; onSortChange: any; filters: any }) {
  const columnHelper = createColumnHelper<Profile>();
  const columns = [
    columnHelper.accessor("profileId", {}),
    columnHelper.accessor("teacherFullName", {}),
    columnHelper.accessor("teacherFullNameFa", {}),
    columnHelper.accessor("topicName", {}),
    columnHelper.accessor("topicNameFa", {}),
    columnHelper.accessor("englishFluency", {}),
    columnHelper.accessor("englishFluencyFa", {}),
    columnHelper.accessor("price", {}),
    columnHelper.accessor("rating", {}),
    columnHelper.accessor("status", {}),
    columnHelper.accessor("availability", {}),
  ];

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

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

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isIntersecting, setIntersecting] = useState(false);

  const pageSize = 24;

  // const usedData = useMemo(() => {
  //   return data.filter((d, index) => index < (pageIndex + 1) * pageSize);
  // }, [data, pageIndex]);

  // const totalFetched = useMemo(() => {
  //   return (pageIndex + 1) * pageSize;
  // }, [pageIndex]);

  // const canGoToNextPage = useMemo(() => {
  //   return data.length > (pageIndex + 1) * pageSize;
  // }, [pageIndex, data]);

  // const totalDBRowCount = data.length;

  // const fetchNextPage = useCallback(() => {
  //   if (canGoToNextPage) {
  //     setPageIndex((s) => s + 1);
  //     // setIntersecting(false);
  //     toast.success("fetched next page");
  //     // setIsFetching(false);
  //   }
  // }, [data, pageIndex]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
      // pagination: {
      //   pageSize: pageSize,
      //   pageIndex: 0
      // }
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
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
  // const fetchMoreOnBottomReached = React.useCallback(
  //   (containerRefElement?: HTMLDivElement | null) => {
  //     if (containerRefElement) {
  //       const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
  //       //once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
  //       if (scrollHeight - scrollTop - clientHeight < 500 && !isFetching && totalFetched < totalDBRowCount) {
  //         fetchNextPage();
  //       }
  //     }
  //   },
  //   [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  // );

  function getPaginatedData(bigArray: any[], size = 24): any[] {
    const arrayOfArrays = [];
    for (let i = 0; i < bigArray.length; i += size) {
      arrayOfArrays.push(bigArray.slice(i, i + size));
    }
    return arrayOfArrays;
  }

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

  const { locale } = useRouter();

  return (
    <div className="  relative flex flex-col  min-h-40rem w-full ">
      <div className="sticky top-0 z-10 b-b-1 b-sand5 ">
        <div className="relative pb-4 bg-[#FCF9F7] py-4 ">
          <div className="flex flex-wrap ac gap-4 justify-between bg-[#FCF9F7] ">
            <Search
              value={globalFilter}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder={locale === "en" ? "Search tutors, topics" : "جستوجو بین آموزگاران، موضوع‌ها،..."}
            />
            <SortBy onSortChange={onSortChange} filters={filters} />
          </div>
          {/* <div>{JSON.stringify({ pageIndex }, null, 2)}</div> */}

          {/* {isShadowVisiable && <Sahdow />} */}
          <Shadow />
        </div>
      </div>
      <div
      //  onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
      // ref={tableContainerRef}
      >
        <Space size="h-8" />
        <ul
          // ref={ref}
          className=""
          // className="grid gap-6"
          // style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(15rem , 100%), 1fr ))" }}
        >
          {getPaginatedData(table.getRowModel().rows).map((groupData, index) => {
            return (
              <li key={index}>
                {/* <Space size="h-12" />
                <p className="c-sand11 text-center italic">Page {index + 1}</p>
                <Space size="h-2" /> */}
                <ul
                  className="grid gap-6 "
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(15rem , 100%), 1fr ))" }}
                >
                  {groupData.map((row) => {
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
                        availability={row.getValue("availability")}
                      />
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <div>{isFetching && <LoadingSpinner />}</div> */}
      <div className="mt-auto"></div>
      {/* {canGoToNextPage && <LoadMoreButton fetchNextPage={fetchNextPage} />} */}
      {/* <InfinitScrollObserver fetchNextPage={fetchNextPage} setIsFetching={setIsFetching} /> */}
      {/* 
      {table.getPageCount() > 1 && 
      <Pagination table={table} pageIndex={pageIndex} />
      } */}
    </div>
  );
}

function Shadow() {
  return (
    <div className="h-10 absolute top-0 w-full translate-y-90%    -z-1 px-10 ">
      <div className=" bg-[#301f12] opacity-10 blur-20 rd-b-50%  w-full h-full  mix-blend-multiply  "></div>
    </div>
  );
}

function LoadMoreButton({ fetchNextPage }) {
  return (
    <div className="flex justify-center py-8">
      <Button
        variation="ghost"
        className=""
        onClick={() => {
          fetchNextPage();
        }}
      >
        Load More...
      </Button>
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
  availability,
}) {
  const supabase = useSupabaseClient();
  const imageUrl = supabase.storage.from("teacher").getPublicUrl(`photo/${profileId}`);

  return (
    <li key={profileId} className="">
      <Link href={`/tutors/${profileId}`} className="block">
        <div className="grid relative isolate">
          <Image
            src={imageUrl.data.publicUrl}
            width={225}
            height={225}
            alt="avatar"
            className="rd-xl bg-gray5 object-cover aspect-ratio-1/1 w-full"
            loading="lazy"
          />
          <div className="absolute bottom-2 left-2 z-10 flex gap-1.5">
            <EnglishFluency englishFluency={englishFluency} />
            <Status status={status} availability={availability} />
          </div>
        </div>
        <div className="h-3"></div>
        <div className="flex justify-between items-center">
          
            <h3 className="c-sand11 text-xl fw-900">{topicNameFa}</h3>
          
          
            <h3 className="c-sand11 fs-xl sm:fs-2xl fw-600">{topicName}</h3>
          
        </div>
        <div className="text-sm line-height-1.05">
          <p className="c-sand11 ">
            {teacherFullNameFa}
            {teacherFullName}
          </p>
          <p className="c-sand11 "></p>
          <div className="flex justify-between items-baseline  ">
            <p className="c-sand11 flex items-baseline">
              <span className="  ">
                {price}
                {` `}
              </span>

              <span className="mis-1  ">CAD / session</span>
            </p>
            <div className="text-xs">
              <StarRating number={rating} />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

function Status({ status, availability }) {
  if (!status) return <></>;
  return (
    <div>
      <ToolTip
        trigger={
          <p
            className={` px-2 py-0.5 rd-2 w-fit flex items-center gap-1 
        ${status.toLowerCase() === "new" && "c-accent3 primary-gradient"}
        ${status.toLowerCase() === "busy" && "c-tomato3 bg-tomato11"}
        ${status.toLowerCase() === "semibusy" && "c-sand12 bg-amber9"}
        `}
          >
            {status.toLowerCase() === "new" && <Icon name="bf-i-ph-sparkle" subdued={false} />}
            {status.toLowerCase() === "busy" && <Icon name="bf-i-ph-calendar-x" subdued={false} />}
            {status.toLowerCase() === "semibusy" && <Icon name="bf-i-ph-calendar-dots" subdued={false} />}
            <span className=" tracking-wider text-xs fw-500">
              {status.toLowerCase() === "new" && <>New</>}
              {status.toLowerCase() === "busy" && <>Busy</>}
              {status.toLowerCase() === "semibusy" && <>Limited Times</>}
            </span>
          </p>
        }
      >
        <div>
          <p className="flex gap-2">
            <Icon name="bf-i-ph-warning" />
            {availability}
             {availability}
          </p>
        </div>
      </ToolTip>
    </div>
  );
}

function EnglishFluency({ englishFluency }) {
  return (
    <ToolTip
      trigger={
        <div
          className={`w-7 h-7 shrink-0  rd-2  flex justify-center items-basline 
                  ${!englishFluency ? "c-sand10 bg-sand4" : ""}
                  ${englishFluency?.toLowerCase() === "basic" ? "c-sand8 bg-sand3" : ""}
                  ${englishFluency?.toLowerCase() === "intermediate" ?"c-blue11 bg-blue3" : ""}
                  ${englishFluency?.toLowerCase() === "advanced" ?  "c-teal11 bg-teal3" : ""}
                  ${englishFluency?.toLowerCase() === "fluent" ? "c-plum11 bg-plum3" : ""}
                  `}
        >
          <Icon name="bf-i-ph-globe " className='mt-0.5' subdued={false} />
        </div>
      }
    >
      <div>
        <p
          className={`text-sm tracking-wide fw-500
                  ${!englishFluency ? "c-sand11" : ""}
                  ${englishFluency?.toLowerCase() === "basic" ? "c-sand11" : ""}
                  ${englishFluency?.toLowerCase() === "intermediate" ? "c-teal11" : ""}
                  ${englishFluency?.toLowerCase() === "advanced" ? "c-teal11 " : ""}
                  ${englishFluency?.toLowerCase() === "fluent" ? "c-plum11" : ""}
                  `}
        >
          
            مهارت انگلیسی: {` `}
            {englishFluency}
          
          
            English Fluency: {` `}
            {englishFluency}
          
        </p>
      </div>
    </ToolTip>
  );
}
