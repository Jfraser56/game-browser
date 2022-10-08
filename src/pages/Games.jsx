import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FilterBar from "../components/shared/FilterBar";
import { useParams } from "react-router-dom";
import CardGrid from "../components/shared/CardGrid";
import { useEffect } from "react";
import {
  fetchGames,
  updateGenres,
  updatePlatformsByID,
  updateStoresByID,
  updateDevelopersByID,
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
        dispatch(updatePlatformsByID(id));
        return;
      case "stores":
        dispatch(updateStoresByID(id));
        return;
      case "developers":
        dispatch(updateDevelopersByID(id));
        return;
    }
  }, [id]);

  useEffect(() => {
    const fetchGameData = () => {
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
    };

    //Makes sure store has genres, platforms, stores, or developer data before fetch request is sent
    switch (filter) {
      case "genres":
        if (genres) {
          fetchGameData();
        }
        return;
      case "platforms":
        if (platforms) {
          fetchGameData();
        }
        return;
      case "stores":
        if (stores) {
          fetchGameData();
        }
        return;
      case "developers":
        if (developers) {
          fetchGameData();
        }
        return;
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
