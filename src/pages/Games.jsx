import React from "react";
import FilterBar from "../components/shared/FilterBar";
import { useParams } from "react-router-dom";
import CardGrid from "../components/shared/CardGrid";

const Games = () => {
  const { id } = useParams();

  //For Fetching: games/:id -> ID can be either a Genre, Platform, Store, or Developer
  //Maybe try to sort via another param ie. games/platform/playstation or games/dev/bungie

  //Another option is to fill out searchFilter state with values such as genre, or platform...then depending on which ones are present, conduct a fetch request

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
