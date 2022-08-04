import React from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FaFastForward, FaShoppingCart } from "react-icons/fa";
import { BsFillCalendarMonthFill } from "react-icons/bs";
import { BiCodeAlt } from "react-icons/bi";
import { IoLogoGameControllerB } from "react-icons/io";
import actionIcon from "../../assets/png/actionIcon.png";
import adventureIcon from "../../assets/png/adventureIcon.png";
import puzzleIcon from "../../assets/png/puzzleIcon.png";
import racingIcon from "../../assets/png/racingIcon.png";
import rpgIcon from "../../assets/png/rpgIcon.png";
import shooterIcon from "../../assets/png/shooterIcon.png";
import sportsIcon from "../../assets/png/sportsIcon.png";
import strategyIcon from "../../assets/png/strategyIcon.png";

const AsideNav = () => {
  const navList1 = [
    { icon: AiFillStar, url: "discover/last-30-days", label: "Last 30 days" },
    { icon: FaFastForward, url: "discover/next-week", label: "Next week" },
    {
      icon: BsFillCalendarMonthFill,
      url: "release-calendar",
      label: "Upcoming Releases",
    },
  ];

  const navList2 = [
    { icon: IoLogoGameControllerB, url: "/platforms", label: "Platforms" },
    { icon: FaShoppingCart, url: "/stores", label: "Stores" },
    {
      icon: BiCodeAlt,
      url: "/developers",
      label: "Developers",
    },
  ];

  const navList3 = [
    { icon: actionIcon, url: "games/action", type: "Action" },
    { icon: adventureIcon, url: "games/adventure", type: "Adventure" },
    { icon: puzzleIcon, url: "games/puzzle", type: "Puzzle" },
    { icon: racingIcon, url: "games/racing", type: "Racing" },
    { icon: rpgIcon, url: "games/role-playing-games", type: "RPG" },
    { icon: shooterIcon, url: "games/shooters", type: "Shooter" },
    { icon: sportsIcon, url: "games/sports-games", type: "Sports" },
    { icon: strategyIcon, url: "games/strategy-games", type: "Strategy" },
  ];

  return (
    <aside className="hidden lg:block w-[15rem] pl-8 py-8">
      <ul className="space-y-4 text-white">
        <li>
          <Link
            to="/"
            className="transition text-2xl font-bold hover:text-gray-600"
          >
            Home
          </Link>
        </li>
        <li className="h-[1px] w-full bg-base-100"></li>

        <li>
          <h1 className=" text-2xl font-bold">New Releases</h1>
        </li>
        {navList1.map((item, index) => (
          <li key={index}>
            <Link
              to={item.url}
              className="transition flex items-center space-x-2 group"
            >
              <div className="transition h-8 w-8 bg-gray-800 group-hover:bg-white rounded flex justify-center items-center">
                <item.icon
                  size="1.2rem"
                  className="group-hover:fill-gray-800"
                />
              </div>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}

        <li className="h-[1px] w-full bg-base-100"></li>
        <li>
          <Link
            to="/games"
            className="transition text-2xl font-bold hover:text-gray-600"
          >
            Browse Games
          </Link>
        </li>

        {navList2.map((item, index) => (
          <li key={index}>
            <Link
              to={item.url}
              className="transition flex items-center space-x-2 group"
            >
              <div className="transition h-8 w-8 bg-gray-800 group-hover:bg-white rounded flex justify-center items-center">
                <item.icon
                  size="1.2rem"
                  className="group-hover:fill-gray-800"
                />
              </div>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}

        <li className="h-[1px] w-full bg-base-100"></li>
        <li>
          <h1 className="text-2xl font-bold">Genres</h1>
        </li>

        {navList3.map((genre, index) => (
          <li key={index}>
            <Link
              to={genre.url}
              className="transition flex items-center space-x-2 group"
            >
              <div className="h-8 w-8 rounded">
                <img className="w-full h-full" src={genre.icon} alt="" />
              </div>
              <span>{genre.type}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AsideNav;
