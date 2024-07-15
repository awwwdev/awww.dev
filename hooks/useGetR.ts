import { useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase";

const getRData = async ({ table, selectQuery, matchFilter }) => {
  const { data, error } = await supabase.from(table).select(selectQuery).match(matchFilter);
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Sessions not found");
  return data;
};

export default function useGetR(table, selectQuery, matchFilter = {}) {
  let key = `${table} ${selectQuery}`;
  key = key.replace(" ", "");

  return useQuery({
    queryKey: [key],
    queryFn: () => getRData({ table, selectQuery, matchFilter }),
  });
}
