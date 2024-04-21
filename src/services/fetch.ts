import axios from "axios";

const API_TOKEN = process.env.API_TOKEN;

export async function getMovieList({
  paths,
  query,
}: {
  paths?: string[];
  query?: { [key: string]: string }[];
}) {
  const fullRoute: string[] = [];
  const base = `www.api.themoviedb.org`;
  const path = paths?.join("/");
  const queryParams = query
    ?.map((obj) => new URLSearchParams(obj).toString())
    .join("&");

  fullRoute.push(base);
  if (path) fullRoute.push(path);
  if (queryParams) fullRoute.push("?" + queryParams);
  console.log(fullRoute);
  try {
    const response = await axios.get(fullRoute.join("/"), {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    if (response.status !== 200) throw new Error(response.statusText);

    console.log(response);
    return response.data;
  } catch (error) {
    console.error("getMovieList ERROR >> ", error);
    return null;
  }
}
