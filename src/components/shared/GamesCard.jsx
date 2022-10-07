import { useNavigate } from "react-router-dom";
import { SiNintendo } from "react-icons/si";
import {
  FaPlaystation,
  FaXbox,
  FaApple,
  FaWindows,
  FaLinux,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const GamesCard = () => {
  const navigate = useNavigate();

  return (
    <div className="transition relative md:hover:z-10 md:hover:scale-105 group">
      <div className="card h-72 md:hover:h-96 bg-base-100 md:hover:absolute top-0 left-0 right-0">
        <figure className="h-36 w-full bg-[url(https://media.rawg.io/media/crop/600/400/games/cd3/cd3c9c7d3e95cb1608fd6250f1b90b7a.jpg)] bg-center bg-cover"></figure>
        <main className="py-2 px-5">
          <div className="flex items-center justify-between w-full h-8">
            <ul className="flex space-x-1">
              <li>
                <FaPlaystation />
              </li>
              <li>
                <FaXbox />
              </li>
              <li>
                <FaWindows />
              </li>
              <li>
                <FaApple />
              </li>
              <li>
                <FaLinux />
              </li>
              <li>
                <SiNintendo />
              </li>
            </ul>
            <div className="border border-success rounded px-2 ">74</div>
          </div>
          <header className="space-y-2">
            <div>
              <h1
                onClick={() => navigate("/game/stray")}
                className="inline-block font-bold text-2xl text-white hover:opacity-50 cursor-pointer"
              >
                Stray 🎯
              </h1>
            </div>
            <Link
              to="/games/genres/action"
              className="badge badge-outline hover:badge-outline hover:badge-info text-white mr-2"
            >
              Action
            </Link>
            <Link
              to="/games/genres/adventure"
              className="badge badge-outline hover:badge-outline hover:badge-info text-white"
            >
              Adventure
            </Link>
          </header>
          <article className="mt-5 space-y-5 text-sm hidden md:group-hover:block">
            <div className="flex justify-between items-center pb-1 border-b border-white/10">
              Release Date <span>July, 7 2022</span>
            </div>
            <div className="flex justify-between items-center pb-1 border-b border-white/10">
              ESRB Rating <span>Everyone 10+</span>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};

export default GamesCard;
