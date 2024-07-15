import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const Invoice = async (req, res) => {
  const { error } = await supabase.from("teacher").update({ invoiceSubmitted: false });

  if (error) {
    console.error("Error updating invoiceSubmitted: ", error);
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json({ message: "Successfully updated invoiceSubmitted for all teachers" });
  }
};

export default Invoice;
