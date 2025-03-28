import FilterBar from "../components/shared/FilterBar";
import CardGrid from "../components/shared/CardGrid";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateReleaseDate,
  fetchGames,
  resetStore,
} from "../features/fetchedData/fetchedDataSlice";

const Discover = () => {
  const { id } = useParams();
  const scrollRef = useRef();

  const dispatch = useDispatch();
  const { orderBy, platforms, releaseDate } = useSelector(
    (store) => store.fetchedData
  );

  const pageData = {
    "last-30-days": {
      title: "Popular this month",
      dateFilter: `${new Date(new Date().setDate(new Date().getDate() - 30))
        .toJSON()
        .slice(0, 10)},${new Date().toJSON().slice(0, 10)}`,
    },
    "next-week": {
      title: "Next week",
      dateFilter: `${new Date().toJSON().slice(0, 10)},${new Date(
        new Date().setDate(new Date().getDate() + 7)
      )
        .toJSON()
        .slice(0, 10)}`,
    },
  };

  const thisYear = `${new Date(new Date().getFullYear(), 0, 1)
    .toJSON()
    .slice(0, 10)},${new Date().toJSON().slice(0, 10)}`;

  useEffect(() => {
    //clear the store before submitting new request
    dispatch(resetStore());

    //update release date depending on which discover page user is on
    if (pageData[id] || !id) {
      if (id) {
        dispatch(updateReleaseDate(pageData[id].dateFilter));
      } else {
        dispatch(
          updateReleaseDate(
            `${new Date(new Date().getFullYear(), 0, 1)
              .toJSON()
              .slice(0, 10)},${new Date().toJSON().slice(0, 10)}`
          )
        );
      }
    }
  }, [id]);

  const scrollToTop = () => {
    scrollRef.current.scrollIntoView();
  };

  //Fetch here
  useEffect(() => {
    if (
      (id && releaseDate === pageData[id].dateFilter) ||
      (!id && releaseDate === thisYear)
    ) {
      dispatch(fetchGames({ platforms, orderBy, releaseDate }));
    }
  }, [platforms, orderBy, releaseDate]);

  return pageData[id] || !id ? (
    <div>
      <h1
        ref={scrollRef}
        className="text-4xl text-center md:text-7xl md:text-left font-bold text-white"
      >
        {id ? pageData[id].title : "Best of 2022 🎉"}
      </h1>
      <FilterBar
        orderByFilter={true}
        platformFilter={true}
        releaseDateFilter={false}
      />
      <CardGrid scrollToTop={scrollToTop} />
    </div>
  ) : (
    <Navigate to="/not-found" />
  );
};

export default Discover;
