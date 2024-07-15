import { NextPage } from "next";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { renderNoData } from "@/components/RenderQ";
import { getFullName, toReadableDate } from "@/utils/formatter";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DCourse, DWorkshopInfo, DUser } from "@/types";

type WorkshopQType = DCourse & {
  workshopInfo: DWorkshopInfo[];
  teacher: { user: Pick<DUser, "firstname" | "lastname"> };
};

const PAGE_SIZE = 10;

const Page: NextPage = () => {
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const workshopQ = useQuery<WorkshopQType[], Error>({
    queryKey: ["workshopNewWebsite-1", page],
    queryFn: async () => {
      const { data, error, count }: any = await supabase
        .from("course")
        .select(`*, teacher(user(firstname, lastname)), workshopInfo(*)`, { count: "exact" })
        .match({ isWorkshop: true })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
      if (error) throw error;
      setTotalPages(Math.ceil(count / PAGE_SIZE));
      return data;
    },
    // enabled: !!categoryId && !!subcategoryId
  });
  // Prefetch the next page
  useEffect(() => {
    if (!workshopQ.isFetching && workshopQ.data?.length > 0) {
      console.log(workshopQ.data);
      queryClient.prefetchQuery(["workshopNewWebsite-1", page + 1], async () => {
        const { data } = await supabase
          .from("course")
          .select(`*, teacher(user(firstname, lastname)), workshopInfo(*)`)
          .range((page + 1) * PAGE_SIZE, (page + 2) * PAGE_SIZE - 1); // Adjust the range for the next page
        return data;
      });
    }
  }, [workshopQ.data, workshopQ.isFetching, page, queryClient, supabase]);

  return (
    <div className="mx-auto max-w-70rem">
      <h1 className="H1 text-center mb-4">Choose the Workshop You Want</h1>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      <div className="h-4"></div>
      <ul className="flex flex-col gap-4 w-full">
        {renderNoData(workshopQ) ??
          workshopQ.data.map((w) => {
            //const imageUrl = supabase.storage.from("teacher").getPublicUrl(`photo/${w.id}`);
            return (
              <li key={w.id}>
                <Link
                  href={`/workshops/${w.id}`}
                  className="border block border-gray-300 p-4 rounded-lg bg-gray-50 hover:bg-prm2 hover:border-prm8"
                >
                  <div className=" w-full rounded-lg">
                    <h3 className="font-medium text-lg">{w.workshopInfo[0]?.name}</h3>
                    <h3 className="font-medium">{getFullName(w.teacher.user)}</h3>
                    <p>{w.workshopInfo[0]?.description}</p>
                    <p>{w.workshopInfo[0]?.price}</p>
                    <p>{toReadableDate(w.workshopInfo[0]?.from)}</p>
                    {w.workshopInfo[0]?.to && <p>{toReadableDate(w.workshopInfo[0]?.to)}</p>}
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
      <div className="h-4"></div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

const PaginatedPage = () => <Page />;

export default PaginatedPage;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from(Array(totalPages).keys()).map((i) => i + 1);

  const visiblePages = pages.filter(
    (page) => page === 1 || page === totalPages || (page - 1 >= currentPage - 2 && page - 1 <= currentPage + 2)
  );

  return (
    <div className="flex gap-2">
      {visiblePages.map((page, index, arr) => (
        <React.Fragment key={page}>
          <button
            className={`px-2 py-1 border rounded-lg ${
              currentPage === page - 1 ? "bg-prm9 text-white border-prm10" : "border-gray-300"
            }`}
            onClick={() => onPageChange(page - 1)}
          >
            {page}
          </button>
          {index < arr.length - 1 && arr[index + 1] > page + 1 && <div>...</div>}
        </React.Fragment>
      ))}
    </div>
  );
};
