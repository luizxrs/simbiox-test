import axios from "axios";

// const API_TOKEN = process.env.API_TOKEN;
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjhjNmFhM2I0MmMzN2I4YjQ4ZTVmZGM5OTY1MGIwYSIsInN1YiI6IjY2MjQ4N2RhZTI5NWI0MDE4NzlhODIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hKjf2B2sQ5NnLWMbNlg7qmIW3Qc-BNnEBPiIV34a2Wc";
export async function getMovieList({
  paths,
  query,
}: {
  paths?: string[];
  query?: { [key: string]: string }[];
}): Promise<unknown> {
  const fullRoute: string[] = [];
  const base = `https://api.themoviedb.org/3`;
  const path = paths?.join("/");
  const queryParams = query
    ?.map((obj) => new URLSearchParams(obj).toString())
    .join("&");

  fullRoute.push(base);
  if (path) fullRoute.push(path);
  if (queryParams) fullRoute.push("?" + queryParams);
  try {
    const response = await axios.get(fullRoute.join("/"), {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    console.log({ response });
    console.log({ responseData: response.data });
    if (response.status !== 200) throw new Error(response.statusText);

    return response.data;
  } catch (error) {
    console.error("getMovieList ERROR >> ", error);
    return null;
  }
}
