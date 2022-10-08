import { useEffect } from "react";
import GamesCard from "./GamesCard";
import { useDispatch, useSelector } from "react-redux";
import LoaderGrid from "../LoaderGrid";

const CardGrid = () => {
  const { gameData } = useSelector((store) => store.fetchedData);

  return gameData.results ? (
    <div className="py-5 w-full grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {gameData.results.map((game, index) => (
        <GamesCard key={index} game={game} />
      ))}
    </div>
  ) : (
    <div className="h-screen w-full flex justify-center items-center">
      <LoaderGrid />
    </div>
  );
};

export default CardGrid;
