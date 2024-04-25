import * as React from "react";
import styles from "./MoviesList.module.scss";
import type { IMoviesListProps } from "./IMoviesListProps";
import { escape } from "@microsoft/sp-lodash-subset";
import "../../../../assets/dist/tailwind.css";
import { getMovieList } from "../../../services/fetch";
import { AxiosError } from "axios";

export default function MovieList(
  props: IMoviesListProps
): React.ReactElement<React.PropsWithChildren<IMoviesListProps>> {
  const {
    description,
    isDarkTheme,
    environmentMessage,
    hasTeamsContext,
    userDisplayName,
  } = props;

  const [movies, setMovies] = React.useState<unknown>();

  React.useEffect(() => {
    console.log(
      getMovieList({ paths: ["movie", "popular"] })
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
      <div>
        <h3>Welcome to SharePoint Framework!</h3>
        <p>
          The SharePoint Framework (SPFx) is a extensibility model for Microsoft
          Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to
          extend Microsoft 365 with automatic Single Sign On, automatic hosting
          and industry standard tooling.
        </p>
        <h4>Learn more about SPFx development:</h4>
        <ul className={styles.links}>
          <li>
            <a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">
              SharePoint Framework Overview
            </a>
          </li>
          <li>
            <a
              href="https://aka.ms/spfx-yeoman-graph"
              target="_blank"
              rel="noreferrer"
            >
              Use Microsoft Graph in your solution
            </a>
          </li>
          <li>
            <a
              href="https://aka.ms/spfx-yeoman-teams"
              target="_blank"
              rel="noreferrer"
            >
              Build for Microsoft Teams using SharePoint Framework
            </a>
          </li>
          <li>
            <a
              href="https://aka.ms/spfx-yeoman-viva"
              target="_blank"
              rel="noreferrer"
            >
              Build for Microsoft Viva Connections using SharePoint Framework
            </a>
          </li>
          <li>
            <a
              href="https://aka.ms/spfx-yeoman-store"
              target="_blank"
              rel="noreferrer"
            >
              Publish SharePoint Framework applications to the marketplace
            </a>
          </li>
          <li>
            <a
              href="https://aka.ms/spfx-yeoman-api"
              target="_blank"
              rel="noreferrer"
            >
              SharePoint Framework API reference
            </a>
          </li>
          <li>
            <a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">
              Microsoft 365 Developer Community
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
