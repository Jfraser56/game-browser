import React from "react";
import GamesCard from "./GamesCard";

const CardGrid = () => {
  return (
    <div className="py-5 w-full grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <GamesCard />
      <GamesCard />
      <GamesCard />
      <GamesCard />
      <GamesCard />
      <GamesCard />
      <GamesCard />
      <GamesCard />
      <GamesCard />
      <GamesCard />
      <GamesCard />
      <GamesCard />
      <GamesCard />
      <GamesCard />
      <GamesCard />
      <GamesCard />
    </div>
  );
};

export default CardGrid;
