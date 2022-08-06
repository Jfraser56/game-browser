import { useSelector, useDispatch } from "react-redux";
import {
  updateOrderBy,
  updatePlatforms,
  updateReleaseDate,
} from "../../features/searchFilters/searchFiltersSlice";

const FilterBar = ({ releaseDateFilter }) => {
  const dispatch = useDispatch();
  const { orderBy, platforms, releaseDate } = useSelector(
    (store) => store.searchFilters
  );

  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col md:flex-row md:space-x-4 pt-4">
      <div>
        <label className="label">Order by:</label>
        <select
          id="order-by"
          onChange={(e) => dispatch(updateOrderBy(e.target.value))}
          value={orderBy}
          className="select select-bordered select-sm w-full md:w-48 outline-none "
        >
          <option value="added">Date added</option>
          <option value="name">Name</option>
          <option value="popuarity">Popularity</option>
          <option value="rating">Average Rating</option>
        </select>
      </div>
      <div>
        <label className="label">Platforms</label>
        <select
          id="platforms"
          onChange={(e) => dispatch(updatePlatforms(e.target.value))}
          value={platforms}
          className="select select-bordered select-sm w-full md:w-48 outline-none "
        >
          <option disabled value="">
            Platforms
          </option>
          <option value="playstation">Playstation</option>
          <option value="xbox">Xbox</option>
          <option value="pc">PC</option>
          <option value="nintendo">Nintendo</option>
          <option value="">Clear</option>
        </select>
      </div>
      {releaseDateFilter && (
        <div>
          <label className="label">Release Date</label>
          <select
            id="release-date"
            onChange={(e) => dispatch(updateReleaseDate(e.target.value))}
            value={releaseDate}
            className="select select-bordered select-sm w-full md:w-48 outline-none "
          >
            <option disabled value="">
              Release Date
            </option>
            <option value="1970-01-01-1979-12-31">1970-1979</option>
            <option value="1980-01-01-1989-12-31">1980-1989</option>
            <option value="1990-01-01-1999-12-31">1990-1999</option>
            <option value="2000-01-01-2009-12-31">2000-2009</option>
            <option value="2010-01-01-2019-12-31">2010-2019</option>
            <option value="2020-01-01-2022-12-31">2020-{year}</option>
            <option value="">Clear</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
