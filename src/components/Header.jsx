import React from "react";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-start flex-1">
        <h1 className="text-md md:text-2xl font-bold text-white px-5">
          GameRev.
        </h1>
      </div>
      <div className="navbar-center flex-auto">
        <div className="input-group input-group-xs md:input-group-lg">
          <span className="bg-white/20">
            <FiSearch />
          </span>
          <input
            className="input w-full input-sm md:input-md bg-white/20 focus:bg-white focus:text-black"
            type="text"
            placeholder="Search for games"
          />
        </div>
      </div>
      <div className="navbar-end flex-1 hidden md:flex justify-end space-x-5 px-5">
        <a className="btn btn-info btn-sm" href="#">
          Github
        </a>
        <a className="btn btn-success btn-sm" href="#">
          Portfolio
        </a>
        <a className="btn btn-warning btn-sm" href="#">
          Resume
        </a>
      </div>
      <div className="navbar-end flex-1 md:hidden">
        <div className="dropdown dropdown-end ">
          <div tabindex="0" class="btn btn-ghost m-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul class="dropdown-content menu menu-compact bg-white text-black w-56 p-1 rounded-box">
            <li>
              <h1 className="text-lg font-bold">Home</h1>
            </li>
            <li></li>
            <li>
              <h1 className="text-lg font-bold">Browse</h1>
            </li>
            <li>
              <a>Platforms</a>
            </li>
            <li>
              <a>Stores</a>
            </li>
            <li>
              <a>Developers</a>
            </li>
            <li></li>
            <li>
              <h1 className="text-lg font-bold">Genres</h1>
            </li>
            <li>
              <a>Action</a>
            </li>
            <li>
              <a>Strategy</a>
            </li>
            <li>
              <a>Shooter</a>
            </li>
            <li>
              <a>Adventure</a>
            </li>
            <li>
              <a>Puzzle</a>
            </li>
            <li>
              <a>Racing</a>
            </li>
            <li>
              <a>Sports</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
