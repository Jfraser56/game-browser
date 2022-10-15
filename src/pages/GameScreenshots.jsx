import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { FaPlaystation, FaXbox, FaWindows } from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGameDetails,
  fetchAchievements,
  fetchScreenshots,
  toggleViewingScreenshot,
} from "../features/gameDetails/gameDetailsSlice";
import { AiOutlineClose } from "react-icons/ai";

const GameScreenshots = () => {
  const { id } = useParams();
  const { game, parentPlatforms, screenshots, viewingScreenshot } = useSelector(
    (store) => store.gameDetails
  );
  const dispatch = useDispatch();

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
  }, []);

  return game ? (
    <>
      <header className="text-white flex items-center justify-center md:justify-start w-full h-20 border-b border-white/30 mb-4">
        <Link
          to={`/game/${id}`}
          className="flex justify-center items-center h-20 mr-4"
        >
          <BsArrowLeft size="2rem" />
        </Link>
        <h1 className="text-xl xl:text-4xl font-bold mr-4">
          {game.name} Screenshots
        </h1>

        <ul className="hidden lg:flex space-x-2">
          <li className={`${parentPlatforms.includes(2) ? "block" : "hidden"}`}>
            <FaPlaystation size="1.5rem" />
          </li>
          <li className={`${parentPlatforms.includes(3) ? "block" : "hidden"}`}>
            <FaXbox size="1.5rem" />
          </li>
          <li className={`${parentPlatforms.includes(1) ? "block" : "hidden"}`}>
            <FaWindows size="1.5rem" />
          </li>
          <li className={`${parentPlatforms.includes(7) ? "block" : "hidden"}`}>
            <SiNintendo size="1.5rem" />
          </li>
        </ul>
      </header>
      <main className="grid grid-cols-1 mx-auto md:mx-0 md:grid-cols-3 gap-2 w-fit">
        {screenshots &&
          screenshots.map(
            (cur, index) =>
              index < 4 && (
                <div
                  key={index}
                  className="relative hover:cursor-pointer overflow-hidden rounded-md"
                >
                  <img
                    className="transition object-cover h-48 w-full"
                    src={cur.image}
                    alt="screenshot of game"
                  />
                  <div
                    onClick={() => dispatch(toggleViewingScreenshot())}
                    id={index}
                    className="transition absolute top-0 bottom-0 right-0 left-0 hover:bg-black/50"
                  ></div>
                </div>
              )
          )}
        {viewingScreenshot && (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-black"></div>
            <button
              onClick={() => dispatch(toggleViewingScreenshot())}
              className="absolute flex justify-center items-center top-4 right-4 w-12 h-12 rounded-full bg-base-100 z-20"
            >
              <AiOutlineClose className="fill-white" size="2rem" />
            </button>
            <div className="absolute top-20 left-0 right-0 bottom-20 mx-auto carousel">
              {screenshots.map((cur, index) => (
                <div
                  key={index}
                  id={`slide${index}`}
                  className="carousel-item relative w-full"
                >
                  <img
                    src={cur.image}
                    className="w-full object-contain"
                    alt="large screenshot of game"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  ) : null;
};

export default GameScreenshots;
