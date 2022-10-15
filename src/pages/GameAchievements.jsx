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
} from "../features/gameDetails/gameDetailsSlice";
const GameAchievements = () => {
  const { achievements, game, parentPlatforms } = useSelector(
    (store) => store.gameDetails
  );
  const dispatch = useDispatch();

  const { id } = useParams();

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
    <div>
      <header className="text-white flex items-center justify-center md:justify-start w-full h-20 border-b border-white/30 mb-4">
        <Link
          to={`/game/${id}`}
          className="flex justify-center items-center h-20 mr-4"
        >
          <BsArrowLeft size="2rem" />
        </Link>
        <h1 className="text-xl xl:text-4xl font-bold mr-4">
          {game.name} Achievements
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
      <main className="p-8 space-y-4">
        {achievements.map((cur, index) => (
          <figure
            key={index}
            className="flex items-end px-4 py-2 bg-white/10 rounded"
          >
            <img
              className="h-16 w-16 mr-2"
              src={cur.image}
              alt="An achievement card"
            />
            <figcaption className="flex flex-col justify-center">
              <span className="text-white/30 text-xs">{cur.percent}%</span>
              <span className="font-bold">{cur.name}</span>
              <span className="text-xs">{cur.description}</span>
            </figcaption>
          </figure>
        ))}
      </main>
    </div>
  ) : null;
};

export default GameAchievements;
