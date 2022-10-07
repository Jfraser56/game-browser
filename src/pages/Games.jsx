import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FilterBar from "../components/shared/FilterBar";
import { useParams } from "react-router-dom";
import CardGrid from "../components/shared/CardGrid";
import { useEffect } from "react";
import {
  updateReleaseDate,
  fetchGames,
  updateGenres,
  updatePlatforms,
  updateStores,
  updateDevelopers,
  resetStore,
} from "../features/fetchedData/fetchedDataSlice";

const Games = () => {
  const { filter, id } = useParams();

  const dispatch = useDispatch();
  const { orderBy, platforms, releaseDate, genres, stores, developers } =
    useSelector((store) => store.fetchedData);

  //Clear store on filter change
  useEffect(() => {
    dispatch(resetStore());
  }, [filter]);

  //Update id depending on which filter
  useEffect(() => {
    switch (filter) {
      case "genres":
        dispatch(updateGenres(id));
        return;
      case "platforms":
        dispatch(updatePlatforms(id));
        return;
      case "stores":
        dispatch(updateStores(id));
        return;
      case "developers":
        dispatch(updateDevelopers(id));
        return;
    }
  }, [id]);

  useEffect(() => {
    if (genres) {
      dispatch(
        fetchGames({
          orderBy,
          platforms,
          releaseDate,
          genres,
          stores,
          developers,
        })
      );
    }
  }, [orderBy, platforms, releaseDate, genres, stores, developers]);
  return (
    <div>
      <h1 className="text-4xl text-center md:text-7xl md:text-left font-bold text-white">
        {id ? id[0].toUpperCase() + id.slice(1) : "Games"}
      </h1>
      <FilterBar
        orderByFilter={true}
        platformFilter={filter === "developers" || filter === "genres"}
        releaseDateFilter={true}
      />
      <CardGrid />
    </div>
  );
};

export default Games;
