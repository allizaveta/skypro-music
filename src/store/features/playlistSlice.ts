import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TracksAPI } from "@/api/tracks";
import {
  CatalogsCollectionType,
  PlaylistType,
  TrackType,
} from "@/types/tracksTypes";
import { isError } from "@/types/errorsTypes";

const getTracks = createAsyncThunk("playlist/getTracks", TracksAPI.getTracks);
const getfavoriteTracks = createAsyncThunk(
  "playlist/getfavoriteTracks",
  TracksAPI.getfavoriteTracks
);
const getCatalogs = createAsyncThunk(
  "playlist/getCatalogs",
  TracksAPI.getCatalogs
);

interface PlaylistState {
  activePlaylist: PlaylistType;
  shuffledPlaylist: PlaylistType;
  favoriteTracks: PlaylistType;
  catalogs: CatalogsCollectionType;
  catalogName: string;
  currentTrack: TrackType | null;
  isPaused: boolean;
  isShuffled: boolean;
}

interface PlaylistInfo {
  playlist: PlaylistType;
  track: TrackType;
}

const initialState: PlaylistState = {
  activePlaylist: [],
  shuffledPlaylist: [],
  favoriteTracks: [],
  catalogs: [],
  catalogName: "",
  currentTrack: null,
  isPaused: true,
  isShuffled: false,
};

export function getEmptyTrack(): TrackType {
  return {
    _id: 0,
    name: "",
    author: "",
    release_date: "",
    genre: [],
    duration_in_seconds: 0,
    album: "",
    track_file: "",
    staredUser: [],
    logo: {
      type: "",
      data: [],
    },
  };
}

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setActivePlaylist(state, action: PayloadAction<PlaylistType>) {
      state.activePlaylist = action.payload;
    },
    setActivePlaylistAndTrackInside(
      state,
      action: PayloadAction<PlaylistInfo>
    ) {
      state.activePlaylist = action.payload.playlist;
      state.currentTrack = action.payload.track;

      if (state.isShuffled)
        state.shuffledPlaylist = state.activePlaylist.toSorted(
          () => 0.5 - Math.random()
        );
      else state.shuffledPlaylist = state.activePlaylist;
    },
    setCatalogName(state, action: PayloadAction<string>) {
      state.catalogName = action.payload;
    },
    setCurrentTrack(state, action: PayloadAction<TrackType>) {
      state.currentTrack = action.payload;
    },
    selectPrevTrack(state) {
      const index = state.shuffledPlaylist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      const track = state.shuffledPlaylist[index - 1];

      if (track) state.currentTrack = track;
    },
    selectNextTrack(state, action: PayloadAction<boolean>) {
      const index = state.shuffledPlaylist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      const track = state.shuffledPlaylist[index + 1];

      if (track) state.currentTrack = track;
      else if (action.payload) state.isPaused = true;
    },
    setIsPaused(state, action: PayloadAction<boolean>) {
      state.isPaused = action.payload;
    },
    toggleIsShuffled(state) {
      console.log("toggleIsShuffled", state.isShuffled);

      state.isShuffled = !state.isShuffled;

      if (state.isShuffled)
        state.shuffledPlaylist = state.activePlaylist.toSorted(
          () => 0.5 - Math.random()
        );
      else state.shuffledPlaylist = state.activePlaylist;
    },
    likeTrack(state, action: PayloadAction<TrackType>) {
      state.favoriteTracks.push(action.payload);
    },
    dislikeTrack(state, action: PayloadAction<TrackType>) {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload._id
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTracks.fulfilled, (state, action) => {
        if (!isError(action.payload)) state.activePlaylist = action.payload;
      })
      .addCase(getTracks.rejected, (state, action) => {
        console.error("Error:", action.error.message);
      })
      .addCase(getfavoriteTracks.fulfilled, (state, action) => {
        state.favoriteTracks = action.payload;
      })
      .addCase(getfavoriteTracks.rejected, (state, action) => {
        console.error("Error:", action.error.message);
      })
      .addCase(getCatalogs.fulfilled, (state, action) => {
        state.catalogs = action.payload;
      })
      .addCase(getCatalogs.rejected, (state, action) => {
        console.error("Error:", action.error.message);
      });
  },
});

export { getTracks, getfavoriteTracks, getCatalogs };
export const {
  setActivePlaylist,
  setActivePlaylistAndTrackInside,
  setCatalogName,
  setIsPaused,
  selectPrevTrack,
  selectNextTrack,
  toggleIsShuffled,
  likeTrack,
  dislikeTrack,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
