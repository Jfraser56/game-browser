import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiNintendo } from "react-icons/si";
import { FaPlaystation, FaXbox, FaWindows } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const GamesCard = ({ game }) => {
  const store = useSelector((store) => store.fetchedData);

  const [platforms, setPlatforms] = useState([]);
  const releaseDate = useRef();

  const navigate = useNavigate();

  const {
    background_image,
    name,
    metacritic,
    parent_platforms,
    genres,
    released,
    esrb_rating,
  } = game;

  useEffect(() => {
    parent_platforms.forEach((cur) => {
      setPlatforms((prev) => [...prev, cur.platform.id]);
    });

    releaseDate.current = released;
    releaseDate.current = new Date(released).toUTCString().slice(5, 16);
  }, [store]);

  return (
    <div className="transition relative md:hover:z-10 md:hover:scale-105 group">
      <div className="card h-72 md:hover:h-96 bg-base-100 md:hover:absolute top-0 left-0 right-0">
        <figure
          style={{ backgroundImage: `url(${background_image})` }}
          className="h-36 w-full bg-center bg-cover"
        ></figure>
        <main className="py-2 px-5">
          <div className="flex items-center justify-between w-full h-8">
            <ul className="flex space-x-1">
              <li className={`${platforms.includes(2) ? "block" : "hidden"}`}>
                <FaPlaystation />
              </li>
              <li className={`${platforms.includes(3) ? "block" : "hidden"}`}>
                <FaXbox />
              </li>
              <li className={`${platforms.includes(1) ? "block" : "hidden"}`}>
                <FaWindows />
              </li>
              <li className={`${platforms.includes(7) ? "block" : "hidden"}`}>
                <SiNintendo />
              </li>
            </ul>
            <div
              className={`${metacritic && "border"} ${
                metacritic > 70
                  ? "border-success"
                  : metacritic > 50
                  ? "border-warning"
                  : "border-error"
              } rounded px-2 `}
            >
              {metacritic}
            </div>
          </div>
          <header className="space-y-2">
            <div>
              <h1
                onClick={() => navigate("/game/stray")}
                className="inline-block font-bold text-xl text-white hover:opacity-50 cursor-pointer"
              >
                {name}
              </h1>
            </div>
            {genres.map((cur, index) => (
              <Link
                to={`${
                  cur.slug !== "role-playing-games-rpg"
                    ? `/games/genres/${cur.slug}`
                    : "/games/genres/RPG"
                }`}
                className="badge badge-sm badge-outline hover:badge-outline hover:badge-primary text-white mr-2"
                key={index}
              >
                {cur.name}
              </Link>
            ))}
          </header>
          <article className="mt-5 space-y-5 text-sm hidden md:group-hover:block">
            <div className="flex justify-between items-center pb-1 border-b border-white/10">
              Release Date <span>{releaseDate.current}</span>
            </div>
            <div className="flex justify-between items-center pb-1 border-b border-white/10">
              ESRB Rating{" "}
              <span>{esrb_rating ? esrb_rating.name : "Not rated"}</span>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};

export default GamesCard;
