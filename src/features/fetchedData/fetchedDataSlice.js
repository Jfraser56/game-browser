import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { platformIDs, genreIDs } from "./API_IDs";
import { dummyData } from "../../dummydata";

const initialState = {
  orderBy: "popularity",
  platforms: platformIDs.all,
  releaseDate: "",
  genres: "",
  stores: "",
  developers: "",
  gameData: [],
  page: 1,
  loading: false,
  error: "",
};

//Query params are dependent on where the fetch is being requested from ie. discover page vs. games page
export const fetchGames = createAsyncThunk(
  "fetchedData/fetchGames",
  async ({ platforms, orderBy, releaseDate, genres, stores, developers }) => {
    const url = `https://api.rawg.io/api/games?ordering=${orderBy}&dates=${releaseDate}&platforms=${platforms}&page=${
      initialState.page
    }${genres ? `&genres=${genres}` : ""}${stores ? `&stores=${stores}` : ""}${
      developers ? `&developers=${developers}` : ""
    }&page-size=20&key=${process.env.REACT_APP_GAMELIB_API_KEY}`;

    const games = await axios(url);
    return games.data;
  }
);

export const paginateFetch = createAsyncThunk(
  "fetchedData/paginateFetch",
  async (url) => {
    const games = await axios(url);
    return games.data;
  }
);

const fetchedDataSlice = createSlice({
  name: "fetchedData",
  initialState,
  reducers: {
    updateOrderByWithFilterBar: (state, { payload }) => {
      state.orderBy = payload;
    },
    updatePlatformsWithFilterBar: (state, { payload }) => {
      state.platforms = payload;
    },
    updatePlatformsByID: (state, { payload }) => {
      state.platforms = platformIDs[payload];
    },
    updateReleaseDate: (state, { payload }) => {
      state.releaseDate = payload;
    },
    updateGenres: (state, { payload }) => {
      state.genres = payload;
    },
    updateStoresByID: (state, { payload }) => {
      state.stores = payload;
    },
    updateDevelopersByID: (state, { payload }) => {
      state.developers = payload;
    },
    resetStore: (state) => {
      state.orderBy = "popularity";
      state.platforms = platformIDs.all;
      state.releaseDate = "";
      state.genres = "";
      state.stores = "";
      state.developers = "";
      state.gameData = [];
      state.page = 1;
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.gameData = action.payload;
        state.error = false;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.gameData = [];
        state.error = action.error.message;
      })
      .addCase(paginateFetch.pending, (state) => {
        state.loading = true;
      })
      .addCase(paginateFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.gameData = action.payload;
        state.error = false;
      })
      .addCase(paginateFetch.rejected, (state, action) => {
        state.loading = false;
        state.gameData = [];
        state.error = action.error.message;
      });
  },
});

export const {
  orderBy,
  platforms,
  releaseDate,
  genres,
  loading,
  gameData,
} = (state) => state.fetchedData;

export const {
  updateOrderByWithFilterBar,
  updatePlatformsWithFilterBar,
  updatePlatformsByID,
  updateReleaseDate,
  updateGenres,
  updateStoresByID,
  updateDevelopersByID,
  resetStore,
} = fetchedDataSlice.actions;

export default fetchedDataSlice.reducer;
