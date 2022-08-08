import React from "react";
import FilterBar from "../components/shared/FilterBar";
import { useParams } from "react-router-dom";
import CardGrid from "../components/shared/CardGrid";

const Games = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-4xl text-center md:text-7xl md:text-left font-bold text-white">
        {id ? id[0].toUpperCase() + id.slice(1) : "Games"}
      </h1>
      <FilterBar releaseDateFilter={true} />
      <CardGrid />
    </div>
  );
};

export default Games;
