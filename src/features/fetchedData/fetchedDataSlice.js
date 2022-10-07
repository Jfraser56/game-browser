import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { platformIDs, genreIDs } from "./API_IDs";

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

//Query params are dependent on where the fetch is being requested from ie. genres page vs. platforms page
export const fetchGames = createAsyncThunk(
  "fetchedData/fetchGames",
  async ({ platforms, orderBy, releaseDate, genres, stores, developers }) => {
    const games = await axios(
      `https://api.rawg.io/api/games?ordering=${orderBy}&dates=${releaseDate}&platforms=${platforms}&page=${
        initialState.page
      }${genres ? `&genres=${genres}` : ""}${
        stores ? `&stores=${stores}` : ""
      }${developers ? `&developers=${developers}` : ""}&page-size=20&key=${
        process.env.REACT_APP_GAMELIB_API_KEY
      }`
    );
    return games.data;
  }
);

const fetchedDataSlice = createSlice({
  name: "fetchedData",
  initialState,
  reducers: {
    updateOrderBy: (state, { payload }) => {
      state.orderBy = payload;
    },
    updatePlatforms: (state, { payload }) => {
      state.platforms = platformIDs[payload];
    },
    updateReleaseDate: (state, { payload }) => {
      state.releaseDate = payload;
    },
    updateGenres: (state, { payload }) => {
      state.genres = genreIDs[payload];
    },
    updateStores: (state, { payload }) => {
      state.stores = payload;
    },
    updateDevelopers: (state, { payload }) => {
      state.developers = payload;
    },
    resetStore: (state) => {
      state.orderBy = "popularity";
      state.platforms = "187,18,16,15,27,186,1,14,80,4,7,8,83,11";
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
      });
  },
});

export const {
  orderBy,
  platforms,
  releaseDate,
  genres,
} = (state) => state.fetchedData;

export const {
  updateOrderBy,
  updatePlatforms,
  updateReleaseDate,
  updateGenres,
  updateStores,
  updateDevelopers,
  resetStore,
} = fetchedDataSlice.actions;

export default fetchedDataSlice.reducer;
