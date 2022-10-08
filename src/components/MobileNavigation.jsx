import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";

const MobileNavigation = () => {
  const dispatch = useDispatch();

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
    <div
      onClick={() => dispatch(closeModal())}
      className="fixed top-0 right-0 left-0 bottom-0 z-20 bg-black/60"
    >
      <ul className="absolute top-20 right-0 h-3/4 overflow-y-scroll bg-white text-black w-3/4 rounded-lg px-3 py-2 space-y-3">
        <li>
          <Link to="/" className="block text-lg font-bold">
            Home 🏠
          </Link>
        </li>
        <li className="h-[1px] bg-gray-100 rounded-full"></li>
        <li>
          <span className="block text-lg font-bold">New Releases 🆕</span>
        </li>
        <li>
          <Link to="/discover/last-30-days" className="block">
            Last 30 days
          </Link>
        </li>
        <li>
          <Link to="/discover/next-week" className="block">
            Next week
          </Link>
        </li>
        <li>
          <Link to="/release-calendar" className="block">
            Upcoming Releases
          </Link>
        </li>

        <li className="h-[1px] bg-gray-100 rounded-full"></li>

        <li>
          <Link to="/games" className="block text-lg font-bold">
            Browse Games 🔎
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
          <span className="block text-lg font-bold">Genres 📚</span>
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
  );
};

export default MobileNavigation;
