import React from "react";
import FilterBar from "../components/shared/FilterBar";

const Home = () => {
  const year = new Date().getFullYear();

  return (
    <div>
      <h1 className="text-7xl font-bold text-white">Best of {year} </h1>
      <FilterBar />
    </div>
  );
};

export default Home;
