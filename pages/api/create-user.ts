// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import supabaseAdmin from "@/utils/supabaseAdmin";
import passGenerator from "generate-password";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { schema } from "@/components/forms/AddUserForm";
const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const supabase = createServerSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({
      error: "not_authenticated",
      description: "The user does not have an active session or is not authenticated",
    });
  }

  const fromValues = JSON.parse(req.body);
  try {
    schema.parse(fromValues);
  } catch (err) {
    res.status(422).json({ error: err.message, data: null });
  }

  const password = passGenerator.generate({ length: 10, numbers: true });
  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.admin.createUser({
    email: fromValues.email,
    password,
    email_confirm: true,
  });

  supabaseAdmin.auth.admin.listUsers()

  const { data: userData, error: updateError } = await supabaseAdmin
    .from("user")
    .update(fromValues)
    .eq("id", user.id)
    .select();

  const statusCode = error || updateError ? 400 : 200;
  res.status(statusCode).json({ error: error ?? updateError, data: userData });
};

export default handler;
