import { Link } from "react-router-dom";
import MobileNavigation from "../MobileNavigation";
import { openModal } from "../../features/modal/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { FaGithub, FaLaptop, FaRegFileAlt } from "react-icons/fa";
import SearchBar from "../SearchBar";

const Header = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store) => store.modal);

  return (
    <nav className="flex justify-between items-center w-screen space-x-4 bg-transparent p-4 pb-8 border-b border-white/30">
      <div className="hidden md:block">
        <Link to={"/"}>
          <h1 className="text-md p-2 lg:text-2xl text-white font-bold tracking-wider">
            GAME.REV
          </h1>
        </Link>
      </div>
      <SearchBar />

      <div className="hidden lg:flex space-x-2 px-5">
        <a
          target="_blank"
          className="btn btn-sm bg-gray-600 text-white"
          href="https://github.com/Jfraser56/game-browser"
        >
          <FaGithub className="mr-2" size="1.2rem" /> Github
        </a>
        <a
          target="_blank"
          className="btn btn-sm bg-gray-600 text-white"
          href="https://www.johnfraser.dev/"
        >
          <FaLaptop className="mr-2" size="1.2rem" /> Portfolio
        </a>
        <a
          target="_blank"
          className="btn btn-sm bg-gray-600 text-white"
          href="https://drive.google.com/file/d/19qtWKI_p6Vtn8QyDEPoOMYArEV1UFQFc/view?usp=sharing"
        >
          <FaRegFileAlt className="mr-2" size="1.2rem" /> Resume
        </a>
      </div>
      {/* Only on Small Screens */}
      <div className="lg:hidden">
        <div
          onClick={() => dispatch(openModal())}
          tabIndex="0"
          className="btn btn-ghost"
        >
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
        {isOpen && <MobileNavigation />}
      </div>
    </nav>
  );
};

export default Header;
