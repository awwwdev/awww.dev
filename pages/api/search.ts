import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { term } = req.query;

  if (!term) {
    return res.status(400).json({ error: "Missing term" });
  }

  const { data: categoryData, error: categoryError } = await supabase
    .from("category")
    .select("id, name, nameFa, parentId")
    .or(`name.ilike.%${term}%,nameFa.ilike.%${term}%`);

  if (categoryError) {
    console.error(categoryError);
    return res.status(500).json({ error: "An error occurred while fetching category data" });
  }

  const categories = categoryData.filter((category) => category.parentId === null);
  const subcategories = categoryData.filter((category) => category.parentId !== null);

  const { data: teacherData, error: teacherError } = await supabase
    .from("siteProfile")
    .select(`id, teacher(user(firstname, lastname, firstnameFa, lastnameFa))`);

  if (teacherError) {
    console.error(teacherError);
    return res.status(500).json({ error: "An error occurred while fetching teacher data" });
  }

  const fullNames = teacherData.map((profile) => ({
    id: profile.id,
    name: `${profile.teacher.user.firstname} ${profile.teacher.user.lastname}`,
    nameFa: `${profile.teacher.user.firstnameFa} ${profile.teacher.user.lastnameFa}`,
  }));

  const matchingProfiles = fullNames.filter(
    (profile) => profile.name.toLowerCase().includes(term.toLowerCase()) || profile.nameFa.includes(term)
  );

res.status(200).json({ data: { categories, subcategories, teachers: matchingProfiles } })}
