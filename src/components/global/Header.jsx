import React from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {
  const genres = [
    { url: "/games/action", label: "Action" },
    { url: "/games/adventure", label: "Adventure" },
    { url: "/games/puzzle", label: "Puzzle" },
    { url: "/games/racing", label: "Racing" },
    { url: "/games/role-playing-games", label: "RPG" },
    { url: "/games/shooters", label: "Shooter" },
    { url: "/games/sports-games", label: "Sports" },
    { url: "/games/strategy-games", label: "Strategy" },
  ];

  return (
    <nav className="navbar bg-transparent py-5">
      <div className="navbar-start flex-1">
        <h1 className="text-md lg:text-3xl font-bold text-white px-5">
          GameRev.
        </h1>
      </div>
      <div className="navbar-center flex-auto">
        <div className="input-group input-group-xs lg:input-group-lg">
          <span className="bg-white/20">
            <FiSearch />
          </span>
          <input
            className="input w-full input-sm lg:input-md bg-white/20 focus:bg-white focus:text-black"
            type="text"
            placeholder="Search for games"
          />
        </div>
      </div>
      <div className="navbar-end flex-1 hidden lg:flex justify-end space-x-5 px-5">
        <a className="btn btn-sm" href="#">
          Github
        </a>
        <a className="btn btn-sm" href="#">
          Portfolio
        </a>
        <a className="btn btn-sm" href="#">
          Resume
        </a>
      </div>
      <div className="navbar-end flex-1 lg:hidden">
        <div className="dropdown dropdown-end ">
          <div tabIndex="0" className="btn btn-ghost m-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul className="dropdown-content bg-white text-black w-56 rounded px-3 py-2 space-y-3">
            <li>
              <Link to="/" className="block text-lg font-bold">
                Home
              </Link>
            </li>
            <li className="h-[1px] bg-gray-100 rounded-full"></li>
            <li>
              <Link to="/games" className="block text-lg font-bold">
                Browse Games
              </Link>
            </li>
            <li>
              <Link to="/platforms" className="block">
                Platforms
              </Link>
            </li>
            <li>
              <Link to="/stores" className="block">
                Stores
              </Link>
            </li>
            <li>
              <Link to="/developers" className="block">
                Developers
              </Link>
            </li>

            <li className=" h-[1px] bg-gray-100 rounded-full"></li>

            <li>
              <Link to="/genres" className="block text-lg font-bold">
                Genres
              </Link>
            </li>
            {genres.map((item, index) => (
              <li key={index}>
                <Link to={item.url} className="block">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
