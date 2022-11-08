import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAppBackgroundImage,
  setParentPlatforms,
  setRequirements,
  setRating,
  fetchGameDetails,
  fetchScreenshots,
  fetchAchievements,
} from "../../features/gameDetails/gameDetailsSlice";
import { FaPlaystation, FaXbox, FaWindows } from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import { AiFillCamera, AiOutlineEllipsis } from "react-icons/ai";
import LoaderGrid from "../LoaderGrid";

const Game = () => {
  const [showMore, setShowMore] = useState({
    fullDesc: false,
    viewRequirements: false,
  });

  const releaseDate = useRef();
  const parentPlatformsRef = useRef([]);

  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    parentPlatforms,
    requirements,
    rating,
    game,
    screenshots,
    achievements,
    loading,
  } = useSelector((store) => store.gameDetails);

  //Fetch game data
  useEffect(() => {
    if (game) {
      if (game.slug !== id && game.id !== +id) {
        dispatch(fetchGameDetails(id));
        dispatch(fetchScreenshots(id));
        dispatch(fetchAchievements(id));
      }
    } else {
      dispatch(fetchGameDetails(id));
      dispatch(fetchScreenshots(id));
      dispatch(fetchAchievements(id));
    }
  }, [id]);

  useEffect(() => {
    if (game) {
      parentPlatformsRef.current = [];
      game.parent_platforms.forEach((cur) => {
        parentPlatformsRef.current = [
          ...parentPlatformsRef.current,
          cur.platform.id,
        ];
      });

      dispatch(setParentPlatforms(parentPlatformsRef.current));

      game.platforms.forEach((cur) => {
        if (cur.platform.id === 4 && Object.keys(cur.requirements).length) {
          dispatch(
            setRequirements({
              minimum:
                cur.requirements.minimum &&
                cur.requirements.minimum.split("\n"),
              recommended:
                cur.requirements.recommended &&
                cur.requirements.recommended.split("\n"),
            })
          );
        }
      });

      releaseDate.current = new Date(game.released).toUTCString().slice(5, 16);

      if (game.ratings.length) {
        dispatch(
          setRating(
            game.ratings.reduce((a, b) => (a.percent > b.percent ? a : b))
          )
        );
      }

      dispatch(setAppBackgroundImage(game.background_image));
    }
  }, [game]);

  return game && !loading ? (
    <div className="flex flex-col lg:flex-row">
      <main className="w-full mb-8 lg:w-1/2 lg:m-0 lg:pr-4">
        <nav className="text-xs font-light text-white/50 tracking-wider mb-8">
          <Link className="transition hover:text-white" to="/discover">
            HOME
          </Link>{" "}
          /{" "}
          <Link className="transition hover:text-white" to="/games">
            GAMES
          </Link>{" "}
          / {game.name.toUpperCase()}
        </nav>
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-x-5 sm:items-center tracking-widest mb-8 whitespace-nowrap">
            <div className="text-gray-700 px-3 text-sm bg-white rounded-md w-fit">
              {releaseDate.current}
            </div>
            <ul className="flex space-x-2">
              <li
                className={`${
                  parentPlatforms.includes(2) ? "block" : "hidden"
                }`}
              >
                <FaPlaystation size="1.2rem" />
              </li>
              <li
                className={`${
                  parentPlatforms.includes(3) ? "block" : "hidden"
                }`}
              >
                <FaXbox size="1.2rem" />
              </li>
              <li
                className={`${
                  parentPlatforms.includes(1) ? "block" : "hidden"
                }`}
              >
                <FaWindows size="1.2rem" />
              </li>
              <li
                className={`${
                  parentPlatforms.includes(7) ? "block" : "hidden"
                }`}
              >
                <SiNintendo size="1.2rem" />
              </li>
            </ul>
            <h4 className="text-white font-light text-xs">
              AVERAGE PLAYTIME: {game.playtime} HOURS{" "}
            </h4>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8">
            {game.name}
          </h1>
          <div className="flex items-center justify-start h-16 space-x-8">
            <div className="flex flex-col items-center justify-between h-full">
              <h3 className="text-white font-semibold tracking-wider text-xl lg:text-2xl">
                {rating
                  ? rating.title[0].toUpperCase() + rating.title.slice(1)
                  : "No ratings 😴"}
              </h3>
              <h5 className="text-xs font-light text-white/30 tracking-widest ">
                {game.ratings_count} RATINGS
              </h5>
            </div>
            <div className="h-full w-[0.5px] bg-white/30 rounded"></div>
            <div className="flex flex-col items-center justify-between h-full">
              {game.metacritic && (
                <>
                  <div
                    className={`radial-progress ${
                      game.metacritic > 70
                        ? "text-success"
                        : game.metacritic > 50
                        ? "text-warning"
                        : "text-error"
                    }`}
                    style={{ "--value": game.metacritic, "--size": "2.5rem" }}
                  >
                    {game.metacritic}
                  </div>
                  <a
                    href={game.metacritic_url}
                    target="_blank"
                    className="transition text-xs font-light text-white/30 tracking-widest hover:text-white"
                  >
                    METASCORE
                  </a>
                </>
              )}
            </div>
          </div>
        </header>
        <section>
          <div className="mb-8">
            <h3 className="text-white font-semibold text-2xl mb-2">About</h3>
            <p className="inline text-white font-light">
              {game.description_raw.length > 350 && !showMore.fullDesc
                ? game.description_raw.slice(0, 350)
                : game.description_raw}
            </p>
            {game.description_raw.length > 350 && (
              <button
                onClick={() =>
                  setShowMore({
                    fullDesc: !showMore.fullDesc,
                    viewRequirements: showMore.viewRequirements,
                  })
                }
                className="inline-block ml-2 bg-white px-2 text-gray-700 rounded text-sm"
              >
                {!showMore.fullDesc ? "... read more" : "...read less"}
              </button>
            )}
          </div>
        </section>
        <div className="h-[0.5px] w-full rounded bg-gray-700 mb-8"></div>
        <section className="grid grid-cols-2 pr-10 gap-4 mb-8">
          <div>
            <h5 className="text-xs text-white/30 tracking-widest mb-1">
              Platforms
            </h5>
            {game.platforms.map((cur, index) => (
              <span key={index}>
                {cur.platform.name}
                {index < game.platforms.length - 1 && ", "}
              </span>
            ))}
          </div>
          <div>
            <h5 className="text-xs text-white/30 tracking-widest mb-1">
              Stores
            </h5>
            {game.stores.map((cur, index) => (
              <span key={index}>
                <Link
                  to={`/games/stores/${cur.store.slug}`}
                  className="transition underline whitespace-nowrap hover:text-white/30"
                >
                  {cur.store.name}
                </Link>
                {index < game.stores.length - 1 && ", "}
              </span>
            ))}
          </div>
          <div>
            <h5 className="text-xs text-white/30 tracking-widest mb-1">
              Genre
            </h5>
            {game.genres.map((cur, index) => (
              <span key={index}>
                <Link
                  to={`${`/games/genres/${cur.slug}`}`}
                  className="transition underline whitespace-nowrap hover:text-white/30"
                >
                  {cur.name}
                </Link>
                {index < game.genres.length - 1 && ", "}
              </span>
            ))}
          </div>
          <div>
            <h5 className="text-xs text-white/30 tracking-widest mb-1">
              Release Date
            </h5>
            {releaseDate.current}
          </div>
          <div>
            <h5 className="text-xs text-white/30 tracking-widest mb-1">
              Developers
            </h5>
            {game.developers.map((cur, index) => (
              <span key={index}>
                <Link
                  to={`/games/developers/${cur.id}`}
                  className="transition underline whitespace-nowrap hover:text-white/30"
                >
                  {cur.name}
                </Link>
                {index < game.developers.length - 1 && ", "}
              </span>
            ))}
          </div>
          <div>
            <h5 className="text-xs text-white/30 tracking-widest mb-1">
              Publishers
            </h5>
            {game.publishers.map((cur, index) => (
              <span key={index}>
                {cur.name}
                {index < game.publishers.length - 1 && ", "}
              </span>
            ))}
          </div>
          <div>
            <h5 className="text-xs text-white/30 tracking-widest mb-1">
              Age rating
            </h5>
            <span>
              {game.esrb_rating ? game.esrb_rating.name : "Not rated"}
            </span>
          </div>
          <div className="break-words">
            <h5 className="text-xs text-white/30 tracking-widest mb-1">
              Website
            </h5>
            <a
              className="transition underline hover:text-white/30"
              href={game.website}
              target="_blank"
            >
              {game.website ? game.website : "Not available"}
            </a>
          </div>
        </section>
        {Object.keys(requirements).length ? (
          <section className="relative">
            <div
              className={`${
                !showMore.viewRequirements && "h-32"
              } overflow-hidden`}
            >
              <h3 className="text-white font-semibold text-2xl mb-2">
                System requirements for PC
              </h3>
              {requirements.minimum && (
                <>
                  {" "}
                  <strong>Minimum</strong>
                  <ul className="list-disc m-2 ml-8 text-sm space-y-1">
                    {requirements.minimum.map(
                      (cur, index) =>
                        index > 0 && (
                          <li key={index}>
                            <span className="font-bold">
                              {cur.split(":")[0]}
                            </span>
                            :<span>{cur.split(":")[1]}</span>
                          </li>
                        )
                    )}
                  </ul>{" "}
                </>
              )}
              {requirements.recommended && (
                <>
                  <strong>Recommended</strong>
                  <ul className="list-disc m-2 ml-8 text-sm space-y-1">
                    {requirements.recommended.map(
                      (cur, index) =>
                        index > 0 && (
                          <li key={index}>
                            <span className="font-bold">
                              {cur.split(":")[0]}
                            </span>
                            :<span>{cur.split(":")[1]}</span>
                          </li>
                        )
                    )}
                  </ul>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() =>
                setShowMore({
                  fullDesc: showMore.fullDesc,
                  viewRequirements: !showMore.viewRequirements,
                })
              }
              className="flex items-center transition mt-4 bg-base-100 px-4 py-2 text-white hover:bg-white hover:text-gray-700 rounded-sm text-sm"
            >
              {!showMore.viewRequirements
                ? "View PC Requirements"
                : "Hide PC Requirements"}
              <FaWindows className="ml-1" size="1.2rem" />
            </button>
            {!showMore.viewRequirements && (
              <div
                style={{
                  background:
                    "linear-gradient(rgba(0,0,0,0), rgba(20,20,20,1) 70%)",
                }}
                className="absolute bottom-12 h-16 left-0 right-0"
              ></div>
            )}
          </section>
        ) : null}
      </main>
      <aside className="w-full pt-8 border-t-[0.5px] lg:w-1/2 lg:mt-28 lg:pl-4 lg:border-l-[0.5px] lg:border-t-0 border-gray-700">
        <div
          className={`grid grid-cols-2 gap-3 w-fit mx-auto lg:mx-0  ${
            screenshots ? "h-fit mb-8" : "h-96"
          }`}
        >
          {screenshots &&
            screenshots.map(
              (cur, index) =>
                index < 4 && (
                  <figure key={index}>
                    <img
                      className="object-cover h-32 w-full rounded-md"
                      src={cur.image}
                      alt="screenshot of game"
                    />
                  </figure>
                )
            )}
          {screenshots && (
            <Link
              to={`/games/${id}/screenshots`}
              className="flex items-center justify-center transition mt-4 bg-base-100 px-4 py-2 text-white hover:bg-white hover:text-gray-700 rounded-sm text-sm col-span-2"
            >
              View all screenshots{" "}
              <AiFillCamera className="ml-2" size="1.2rem" />
            </Link>
          )}
        </div>
        {achievements && achievements.length ? (
          <>
            <Link
              to={`/games/${id}/achievements`}
              className="transition text-white font-semibold text-2xl border-b hover:text-white/30 hover:border-white/30"
            >
              {game.name} Achievements
            </Link>
            <div className="mt-8 space-y-4">
              {achievements.map(
                (cur, index) =>
                  index < 5 && (
                    <figure key={index} className="flex items-end">
                      <img
                        className="h-16 w-16 mr-2"
                        src={cur.image}
                        alt="An achievement card"
                      />
                      <figcaption className="flex flex-col justify-center">
                        <span className="text-white/30 text-xs">
                          {cur.percent}%
                        </span>
                        <span className="font-bold">{cur.name}</span>
                        <span className="text-xs">{cur.description}</span>
                      </figcaption>
                    </figure>
                  )
              )}
              {achievements.length > 5 && (
                <Link
                  to={`/games/${id}/achievements`}
                  className="flex items-center w-fit group"
                >
                  <AiOutlineEllipsis className="transition w-16 h-16 p-2  bg-base-100 group-hover:bg-white group-hover:fill-black rounded mr-2" />
                  <span className="transition text-white/30 group-hover:text-white">
                    View all achievements
                  </span>
                </Link>
              )}
            </div>
          </>
        ) : null}
      </aside>
    </div>
  ) : (
    <div className="text-center mt-48">
      <LoaderGrid />
    </div>
  );
};

export default Game;
