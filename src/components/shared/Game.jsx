import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dummyData } from "../../dummydata";
import { setAppBackgroundImage } from "../../features/appBackground/appBackgroundSlice";
import { FaPlaystation, FaXbox, FaWindows } from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import LoaderGrid from "../LoaderGrid";

const Game = () => {
  const [game, setGame] = useState();
  const [parentPlatforms, setParentPlatforms] = useState([]);
  const [rating, setRating] = useState();
  const [fullDesc, setFullDesc] = useState(false);

  const releaseDate = useRef();

  const { id } = useParams();
  const dispatch = useDispatch();

  //Fetch game data
  useEffect(() => {
    const fetchSingularGame = async () => {
      const result = await axios(
        `https://api.rawg.io/api/games/${id}?key=${process.env.REACT_APP_GAMELIB_API_KEY}`
      );

      setGame(result.data);
    };

    fetchSingularGame();
  }, []);

  useEffect(() => {
    if (game) {
      game.parent_platforms.forEach((cur) => {
        setParentPlatforms((prev) => [...prev, cur.platform.id]);
      });

      releaseDate.current = new Date(game.released).toUTCString().slice(5, 16);

      setRating(game.ratings.reduce((a, b) => (a.percent > b.percent ? a : b)));

      dispatch(setAppBackgroundImage(game.background_image));
    }
  }, [game]);

  return rating && parentPlatforms ? (
    <div>
      <main className="w-1/2">
        <nav className="text-xs font-light text-white/30 tracking-wider mb-8">
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
          <div className="flex space-x-5 items-center tracking-widest mb-8">
            <div className="text-gray-700 px-3 text-sm bg-white rounded-md">
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
          <h1 className="text-6xl font-bold text-white mb-8">{game.name}</h1>
          <div className="flex items-center justify-start h-16 space-x-8">
            <div className="flex flex-col items-center justify-between h-full">
              <h3 className="text-white font-semibold tracking-wider text-2xl">
                {rating.title[0].toUpperCase() + rating.title.slice(1)}
              </h3>
              <h5 className="text-xs font-light text-white/30 tracking-widest ">
                {game.ratings_count} RATINGS
              </h5>
            </div>
            <div className="h-full w-[0.5px] bg-white/30 rounded"></div>
            <div className="flex flex-col items-center justify-between h-full">
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
            </div>
          </div>
        </header>
        <section>
          <div className="mb-8">
            <h3 className="text-white font-semibold text-2xl mb-2">About</h3>
            <p className="inline text-white font-light">
              {game.description_raw.length > 350 && !fullDesc
                ? game.description_raw.slice(0, 350)
                : game.description_raw}
            </p>
            {game.description_raw.length > 350 && (
              <button
                onClick={() => setFullDesc(!fullDesc)}
                className="inline-block ml-2 bg-white px-2 text-gray-700 rounded text-sm"
              >
                {!fullDesc ? "... read more" : "...read less"}
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
                  to={`${
                    cur.slug !== "role-playing-games-rpg"
                      ? `/games/genres/${cur.slug}`
                      : "/games/genres/RPG"
                  }`}
                  className="transition underline whitespace-nowrap hover:text-white/30"
                >
                  {cur.name}
                </Link>
                {index < game.stores.length - 1 && ", "}
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
          <div>
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
        <section>
          <h3 className="text-white font-semibold text-2xl mb-2">
            System requirements for PC
          </h3>
        </section>
      </main>
    </div>
  ) : (
    <div className="text-center mt-48">
      <LoaderGrid />
    </div>
  );
};

export default Game;
