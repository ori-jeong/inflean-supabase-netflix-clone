"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

// export async function searchMovies({ search = "" }) {
//   const supabase = await createServerSupabaseClient();

//   const { data, error } = await supabase
//     .from("movie")
//     .select("*")
//     .like("title", `%${search}%`);
//   handleError(error);
//   return data;
// }

// export async function getMovie(id) {
//   const supabase = await createServerSupabaseClient();
//   const { data, error } = await supabase
//     .from("movie")
//     .select("*")
//     .eq("id", id)
//     .maybeSingle();
//   handleError(error);
//   return data;
// }

export async function searchMovies({ search, page, pageSize }) {
  const supabase = await createServerSupabaseClient();

  const { data, count, error } = await supabase
    .from("movie")
    .select("*", { count: "exact" })
    .like("title", `%${search}%`)
    .order("favorit", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  const hasNextPage = count > page * pageSize;

  if (error) {
    console.error(error);
    return {
      data: [],
      count: 0,
      page: null,
      pageSize: null,
      error,
    };
  }

  return {
    data,
    page,
    pageSize,
    hasNextPage,
  };
}

export async function getMovie(id) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  handleError(error);

  return data;
}

export async function setFavorit(id) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("movie")
    .update({
      favorit: supabase.raw("CASE WHEN favorit = 1 THEN 0 ELSE 1 END"),
    })
    .eq("id", id);
  handleError(error);

  return data;
}
