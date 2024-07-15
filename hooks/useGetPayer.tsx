import { useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase";

const getPayer = async (id) => {
  const { data, error } = await supabase
    .from("payer")
    .select(
      `
    *,
    student (*, user(*)),
    paymentByPayer (* , payer (* , user (*))),
    user (*)
  `
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Payer not found");
  return data;
};

export default function useGetPayer(id) {
  return useQuery({
    queryKey: ["payers", id],
    queryFn: () => getPayer(id),
  });
}
