import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  game: null,
  screenshots: [],
  achievements: [],
  parentPlatforms: [],
  requirements: [],
  rating: null,
  backgroundImage: "",
  loading: false,
  viewingScreenshot: false,
  error: false,
};

export const fetchGameDetails = createAsyncThunk(
  "gameDetails/fetchGameDetails",
  async (id) => {
    const results = await axios(
      `https://api.rawg.io/api/games/${id}?key=${process.env.REACT_APP_GAMELIB_API_KEY}`
    );

    return results.data;
  }
);

export const fetchScreenshots = createAsyncThunk(
  "gameDetails/fetchScreenshots",
  async (id) => {
    const results = await axios(
      `https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.REACT_APP_GAMELIB_API_KEY}`
    );

    return results.data.results;
  }
);

export const fetchAchievements = createAsyncThunk(
  "gameDetails/fetchAchievements",
  async (id) => {
    const results = await axios(
      `https://api.rawg.io/api/games/${id}/achievements?key=${process.env.REACT_APP_GAMELIB_API_KEY}`
    );

    return results.data.results;
  }
);

export const gameDetailsSlice = createSlice({
  name: "gameDetails",
  initialState,
  reducers: {
    setParentPlatforms: (state, { payload }) => {
      state.parentPlatforms = [...state.parentPlatforms, payload];
    },
    setRequirements: (state, { payload }) => {
      state.requirements = payload;
    },
    setRating: (state, { payload }) => {
      state.rating = payload;
    },

    setAppBackgroundImage: (state, { payload }) => {
      state.backgroundImage = payload;
    },
    toggleViewingScreenshot: (state) => {
      state.viewingScreenshot = !state.viewingScreenshot;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload;
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.error = true;
      })
      .addCase(fetchScreenshots.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchScreenshots.fulfilled, (state, action) => {
        state.screenshots = action.payload;
        state.loading = false;
      })
      .addCase(fetchAchievements.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAchievements.fulfilled, (state, action) => {
        state.achievements = action.payload;
        state.loading = false;
      });
  },
});

export const {
  backgroundImage,
  parentPlatforms,
  requirements,
  rating,
  viewingScreenshot,
} = (state) => state.gameDetails;

export const {
  setAppBackgroundImage,
  setParentPlatforms,
  setRequirements,
  setRating,
  toggleViewingScreenshot,
} = gameDetailsSlice.actions;

export default gameDetailsSlice.reducer;
