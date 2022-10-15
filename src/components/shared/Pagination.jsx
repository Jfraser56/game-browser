import React from "react";
import { paginateFetch } from "../../features/fetchedData/fetchedDataSlice";
import { useDispatch, useSelector } from "react-redux";

const Pagination = ({ scrollToTop }) => {
  const { gameData } = useSelector((store) => store.fetchedData);
  const dispatch = useDispatch();

  const handlePaginationPrev = () => {
    scrollToTop();
    dispatch(paginateFetch(gameData.previous));
  };

  const handlePaginationNext = () => {
    scrollToTop();
    dispatch(paginateFetch(gameData.next));
  };

  return (
    <div className="w-full flex justify-center space-x-8 mt-4">
      {gameData.previous && (
        <button
          onClick={handlePaginationPrev}
          type="button"
          className="btn px-12"
        >
          Back
        </button>
      )}
      {gameData.next && (
        <button
          onClick={handlePaginationNext}
          type="button"
          className="btn px-12"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
