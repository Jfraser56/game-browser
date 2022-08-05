import React from "react";

const FilterBar = () => {
  const year = new Date().getFullYear();

  const handleFilterSelect = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  const resetSearch = (e) => {
    e.target.value = "Release Date";
  };

  return (
    <div className="flex pt-4 space-x-4">
      <div>
        <label className="label">Order by:</label>
        <select
          onChange={(e) => handleFilterSelect(e)}
          value={"Popularity"}
          className="select select-bordered select-sm w-48 outline-none "
        >
          <option>Date added</option>
          <option>Name</option>
          <option>Popularity</option>
          <option>Average Rating</option>
        </select>
      </div>
      <div>
        <label className="label">Platforms</label>
        <select
          onChange={(e) => handleFilterSelect(e)}
          value={"Platforms"}
          className="select select-bordered select-sm w-48 outline-none "
        >
          <option disabled>Platforms</option>
          <option>PC</option>
          <option>Playstation</option>
          <option>Xbox</option>
          <option>Nintendo</option>
          <option>Clear</option>
        </select>
      </div>
      <div>
        <label className="label">Release Date</label>
        <select
          onChange={(e) => resetSearch(e)}
          value={"Release Date"}
          className="select select-bordered select-sm w-48 outline-none "
        >
          <option disabled>Release Date</option>
          <option>1970-1979</option>
          <option>1980-1989</option>
          <option>1990-1999</option>
          <option>2000-2009</option>
          <option>2010-2019</option>
          <option>2020-{year}</option>
          <option>Clear</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
