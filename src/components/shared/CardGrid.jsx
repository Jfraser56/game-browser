import GamesCard from "./GamesCard";
import { useSelector } from "react-redux";
import LoaderGrid from "../LoaderGrid";
import Pagination from "./Pagination";

const CardGrid = ({ scrollToTop }) => {
  const { gameData } = useSelector((store) => store.fetchedData);

  return gameData.results ? (
    <>
      <div className="py-5 w-full grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {gameData.results.map((game, index) => (
          <GamesCard key={index} game={game} />
        ))}
      </div>
      <Pagination scrollToTop={scrollToTop} />
    </>
  ) : (
    <div className="text-center mt-20 h-screen">
      <LoaderGrid />
    </div>
  );
};

export default CardGrid;
