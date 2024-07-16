import { useEffect, useState } from "react";
import Icon from "../ui/Icon";
import { InputDebaounced } from "../Table/Filter";
import * as Popover from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import LoadingSpinner from "../ui/LoadingSpinner";
import HeroSearchResultsGrid from "./HeroSearchResultsGrid";
import { getFullName, getFullNameFa } from "@/utils/formatter";
import Button from "../ui/button";
import { En, Fa } from "../ui/multilang";
import Space from "../ui/Space";
import { calculateTeacherRating } from "@/pages/classes/[[...slug]]";

export default function HeroSearch() {
  const [searchTerm, setSearchTerm] = useState();
  const [isResultsOpen, _setIsResultsOpen] = useState<boolean>(false);

  const setIsResultsOpen = (v) => {
    const d = document.getElementById("search-box-top");
    d?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
    _setIsResultsOpen(v);
  };

  useEffect(() => {
    setIsResultsOpen(!!searchTerm);
  }, [searchTerm]);

  return (
    <>
      <div className=" relative h-12">
        <Overlay isResultsOpen={isResultsOpen} setIsResultsOpen={setIsResultsOpen} />
        <div id="search-box-top" className="h-2"></div>
        <div className="z-100 absolute w-full  ">
          <SearchBox
            value={searchTerm}
            setValue={setSearchTerm}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsResultsOpen(false);
              }
            }}
          />
        </div>
        {/* <SearchResultsPopover {...{ isResultsOpen, setIsResultsOpen, searchTerm }} /> */}
        <Space size="h-4" />
        {isResultsOpen && (
          <div
            className={`absolute top-16 left-0  sm:max-w-page bg-white/80 b-1 b-white glass-effect rd-6 px-2  shd-tinted-3  z-100 
        lt-sm:left-50% lt-sm:-translate-x-50%  
        `}
            style={{
              width: "calc(100vw - 2rem)",
            }}
          >
            <div className="px-4 grid items-center py-4 h-full overflow-y-auto min-h-30 max-h-100 ">
              <SaerchResults searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Overlay({ isResultsOpen, setIsResultsOpen }) {
  return (
    <div
      onClick={() => {
        if (isResultsOpen) setIsResultsOpen(false);
      }}
      className={`fixed w-200vw h-200vh z-10 inset-0 bg-sand3A backdrop-blur-5 -translate-x-50% -translate-y-50% transform-250ms select-none 
        ${isResultsOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      style={{
        transform: "opacity 500ms ease",
      }}
    ></div>
  );
}

function SearchBox({ value, setValue, onKeyDown }) {
  return (
    <div className=" px-4 py-2 rd-full shd-tinted-3  b-1 b-sand5 bg-sand1  w-full fw-400 min-w-40 max-w-140  flex-1 text-base flex items-center gap-2 focus-within:outline-brand-accent focus-within:outline-1px focus-within:outline-solid">
      <Icon name="bf-i-ph-magnifying-glass" className=" pt-1" />
      <label className="flex gap-2 items-center grow">
        <span className="sr-only">Search</span>
        <div className="grid grow">
          <InputDebaounced
            value={value ?? ""}
            onChange={setValue}
            className="focus:outline-none bg-transparent "
            placeholder="Search tutors, topics, ..."
            onKeyDown={onKeyDown}
          />
        </div>
      </label>
    </div>
  );
}

// function SearchResultsPopover({ isResultsOpen, setIsResultsOpen, searchTerm, setSearchTerm }) {
//   return (
//     <div className="">
//       <Popover.Root open={isResultsOpen} onOpenChange={setIsResultsOpen} >
//         <Popover.Trigger asChild>
//           {/* <button
//             className="rounded-full   w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline-none"
//             aria-label="Update dimensions"
//           >
//             H
//           </button> */}
//           {/* <input className=' h-8 b-1 bg-white w-full'  placeholder='dfdkf' /> */}
//           <div></div>
//         </Popover.Trigger>

//         <Popover.Portal>
//           <>
//             <Popover.Content
//               className={`rd-6 px-2 w-100vw  max-w-page h-80 bg-white shd-tinted-5 relative
//           will-change-[transform,opacity]
//           data-[state=open]:data-[side=top]:animate-slideDownAndFade
//           data-[state=open]:data-[side=right]:animate-slideLeftAndFade
//           data-[state=open]:data-[side=bottom]:animate-slideUpAndFade
//           data-[state=open]:data-[side=left]:animate-slideRightAndFade`}
//               sideOffset={10}

//               align="start"
//               // onOpenAutoFocus={(e) => e.preventDefault()}
//               onBlur={(e) => e.preventDefault()}
//             >
//               <div className="grid gap-2.5 overflow-y-auto h-full ">
//                 <SaerchResults searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//               </div>
//               <Popover.Close className=" absolute -top-5 -right-5" aria-label="Close">
//                 <Button iconButton variation="ghost" className="text-xl bg-white">
//                   <Icon name="bf-i-ph-x" subdued={false} />
//                 </Button>
//               </Popover.Close>
//               {/* <Popover.Arrow className="fill-white" /> */}
//             </Popover.Content>
//           </>
//         </Popover.Portal>
//       </Popover.Root>
//     </div>
//   );
// }

type ProfileQType = any;

function SaerchResults({ searchTerm, setSearchTerm }) {
  const supabase = useSupabaseClient();

  const profileQ = useQuery<ProfileQType[]>({
    queryKey: ["siteProfileTutors-hero-banner"],
    queryFn: async () => {
      let query = supabase
        .from("siteProfile")
        .select(
          `*, 
          category (name , nameFa),
          topic (name, nameFa ), 
          teacher(
            course(feedback(studentRating) ), 
            englishFluency, 
            expertise(sessionPriceInCAD, sessionDurationOnWebsiteInMinute, endDate),
            user(firstname, lastname, firstnameFa, lastnameFa)
          ), 
          profileSubcategory!inner(categoryId)`
        )
        .eq("isTeacherIn", true);

      const { data, error }: any = await query;
      if (error) throw error;
      return data;
    },
  });

  console.log("🚀 ~ profileQ:", profileQ.data?.[0]);
  return (
    <>
      {profileQ.isLoading && (
        <div className="flex justify-center items-center h-full ">
          <LoadingSpinner />
        </div>
      )}
      {profileQ.data && profileQ.data.length > 0 && (
        <HeroSearchResultsGrid
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          data={profileQ.data.map((profile) => {
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
              categoryName: profile.category.name,
              categoryNameFa: profile.category.nameFa,
              status: profile.status,
            };
          })}
        />
      )}
    </>
  );
}
