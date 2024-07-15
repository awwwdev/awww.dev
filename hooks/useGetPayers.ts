import { useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase";

const getPayers = async () => {
  const { data, error } = await supabase.from("payer").select(`
    *,
    student (*, user(*)),
    user (*)
  `);

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Payers not found");
  return data;
};

export default function useGetPayers() {
  return useQuery({
    queryKey: ["payers"],
    queryFn: () => getPayers(),
  });
}
