import * as React from "react";
import styles from "./MoviesList.module.scss";
import type { IMoviesListProps } from "./IMoviesListProps";
import { escape } from "@microsoft/sp-lodash-subset";
import "../../../../assets/dist/tailwind.css";
import { getMovieList } from "../../../services/fetch";
import { AxiosError } from "axios";

const MovieList: React.ReactNode = ({
  description,
  isDarkTheme,
  environmentMessage,
  hasTeamsContext,
  userDisplayName,
}: React.PropsWithChildren<IMoviesListProps>) => {
  const [movies, setMovies] = React.useState<unknown>();

  React.useEffect(() => {
    console.log(
      getMovieList({ paths: ["movied", "popular"] })
        .then((res) => setMovies(res))
        .catch((e): AxiosError => {
          setMovies(e);
          throw new Error(`Erro! -> ${e}`);
        })
    );
  }, []);

  return (
    <section
      className={`${styles.moviesList} ${hasTeamsContext ? styles.teams : ""}`}
    >
      <div className={styles.welcome}>
        <img
          alt=""
          src={
            isDarkTheme
              ? require("../assets/welcome-dark.png")
              : require("../assets/welcome-light.png")
          }
          className={styles.welcomeImage}
        />
        <button onClick={() => console.log(movies)}>TESTE</button>
        <button
          onClick={() =>
            getMovieList({ paths: ["movie", "popular"] })
              .then((res) => console.log(res))
              .catch((e) => {
                console.log(`Erro! -> ${e}`);
              })
          }
        >
          Fetch again
        </button>
        <h2>Well done, {escape(userDisplayName)}!</h2>
        <div>{environmentMessage}</div>
        <div>
          Web part property value: <strong>{escape(description)}</strong>
        </div>
        <div>
          Current Time:
          <strong>
            {(() => {
              const date = new Date();
              return `${date.getMinutes()}:${date.getSeconds()}`;
            })()}
          </strong>
        </div>
      </div>
      <div className="w-full bg-zinc-200 text-zinc-900"></div>
    </section>
  );
};

export default MovieList;
