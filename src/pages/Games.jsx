import React from "react";
import FilterBar from "../components/shared/FilterBar";

const Games = () => {
  return (
    <div>
      <h1 className="text-4xl text-center md:text-7xl md:text-left font-bold text-white">
        Games
      </h1>
      <FilterBar releaseDateFilter={true} />
    </div>
  );
};

export default Games;
