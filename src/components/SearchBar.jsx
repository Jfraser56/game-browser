import { useState, useRef } from "react";
import axios from "axios";
import { searchResults } from "../dummydata";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import LoaderGrid from "./LoaderGrid";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);

  const counterRef = useRef(0);

  useEffect(() => {
    const handleSearch = async () => {
      const fetchGamesBySearch = async () => {
        const searchResults = await axios(
          `https://api.rawg.io/api/games?search=${searchInput}&key=${process.env.REACT_APP_GAMELIB_API_KEY}`
        );

        setResults(searchResults.data);
        setLoading(false);
      };

      if (counterRef.current < 2) {
        counterRef.current += 1;
      } else {
        counterRef.current = 0;
        setLoading(true);
        fetchGamesBySearch();
      }
    };

    handleSearch();
  }, [searchInput]);

  const handleClearResults = () => {
    setResults(null);
    setSearchInput("");
  };

  return (
    <div className="relative flex-1">
      <div className="input-group input-group-xs lg:input-group-lg">
        <span className="bg-white/20">
          <FiSearch />
        </span>
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          className="input w-full input-sm lg:input-md bg-white/20 focus:bg-white focus:text-black"
          type="text"
          placeholder="Search for games"
        />
      </div>
      {results && !loading ? (
        <ul className="absolute top-10 left-0 right-0 lg:top-14 bg-black/95 rounded p-4 z-10 text-white">
          <li className="mb-4">
            <span className="font-bold text-lg">{results.count}</span> Games
          </li>
          {results.results.map((cur, index) =>
            index < 10 ? (
              <li key={index} onClick={handleClearResults}>
                <Link
                  to={`/game/${cur.id}`}
                  className="flex justify-start items-center my-1 py-2 w-fit group border-white/30 cursor-pointer"
                >
                  <figure className="h-12 w-10 rounded mr-4 overflow-hidden">
                    <img
                      className="object-cover w-full h-full"
                      src={cur.background_image}
                      alt="game cover image"
                    />
                  </figure>
                  <div>
                    <h5 className="transition font-bold group-hover:text-white/30">
                      {cur.name}
                    </h5>
                  </div>
                </Link>
              </li>
            ) : null
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default SearchBar;
