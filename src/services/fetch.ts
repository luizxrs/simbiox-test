import axios from "axios";

const API_TOKEN = process.env.API_TOKEN;

export async function getMovieList(props: { [key: string]: string }[]) {
  const base = `www.api.themoviedb.org/`;

  const queryParams = props
    .map((obj) => new URLSearchParams(obj).toString())
    .join("&");
  const fullRoute = base + queryParams;
  console.log(base);

  try {
    const response = await axios.get(fullRoute, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    if (response.status !== 200) throw new Error(response.statusText);

    return await response.data;
  } catch (error) {
    console.error("getMovieList ERROR >> ", error);
    return null;
  }
}
