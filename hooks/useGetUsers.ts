import { useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase";

const getUsers = async () => {
  const { data, error } = await supabase.from("user").select(`
      *,
      teacher (*, user (*)),
      admin (* , user (*)),
      student (* , user (*)),
      payer (* , user (*))
    `);

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Users not found");
  return data;
};

export default function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
}
