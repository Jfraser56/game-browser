import React from "react";
import FilterBar from "../components/shared/FilterBar";
import { useParams } from "react-router-dom";

const Discover = () => {
  const { id } = useParams();

  const titles = {
    "last-30-days": "Popular this month",
    "next-week": "Next week",
  };

  return (
    <div>
      <h1 className="text-4xl text-center md:text-7xl md:text-left font-bold text-white">
        {id ? titles[id] : "Best of 2022"}
      </h1>
      <FilterBar />
    </div>
  );
};

export default Discover;
