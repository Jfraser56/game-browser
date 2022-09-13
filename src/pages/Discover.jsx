import FilterBar from "../components/shared/FilterBar";
import CardGrid from "../components/shared/CardGrid";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Discover = () => {
  const { id } = useParams();

  const { orderBy, platforms } = useSelector((store) => store.searchFilters);

  const titles = {
    "last-30-days": "Popular this month",
    "next-week": "Next week",
  };

  useEffect(() => {
    if (titles[id] || !id) {
      console.log("fetch " + id + ": " + orderBy + " " + platforms);
    }
  }, [id, orderBy, platforms]);

  {
    return titles[id] || !id ? (
      <div>
        <h1 className="text-4xl text-center md:text-7xl md:text-left font-bold text-white">
          {id ? titles[id] : "Best of 2022"}
        </h1>
        <FilterBar />
        <CardGrid />
      </div>
    ) : (
      <Navigate to="/not-found" />
    );
  }
};

export default Discover;
