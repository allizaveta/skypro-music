import { fetchFavoriteTracks } from "@/app/components/api/tracks";
import { TrackType } from "@/types/tracks";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getFavoriteTracks = createAsyncThunk(
  "playlist/getFavoriteTracks",
  async (Tokens: { access: string; refresh: string }) => {
    const favoriteTracks = await fetchFavoriteTracks(Tokens);
    return favoriteTracks;
  }
);

type PlaylistStateType = {
  defaultPlaylist: TrackType[];
  currentTrack: null | TrackType;
  currentPlaylist: TrackType[];
  favoriteTracksList: TrackType[];
  shuffledPlaylist: TrackType[];
  isPlaying: boolean;
  isLoop: boolean;
  isShuffle: boolean;
  filterOptions: {
    author: string[];
    genre: string[];
    searchValue: string;
  };
  filteredTracks: TrackType[];
};

const initialState: PlaylistStateType = {
  defaultPlaylist: [],
  currentTrack: null,
  currentPlaylist: [],
  favoriteTracksList: [],
  shuffledPlaylist: [],
  isPlaying: false,
  isLoop: false,
  isShuffle: false,
  filterOptions: {
    author: [],
    genre: [],
    searchValue: "",
  },
  filteredTracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (
      state,
      action: PayloadAction<{ track: TrackType; tracks: TrackType[] }>
    ) => {
      state.currentTrack = action.payload.track;
      state.currentPlaylist = action.payload.tracks;
      state.shuffledPlaylist = [...action.payload.tracks].sort(
        () => 0.5 - Math.random()
      );
      state.isPlaying = true;
    },
    setDefaultPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.defaultPlaylist = action.payload;
      state.filteredTracks = action.payload;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      const newTrack = playlist[currentTrackIndex + 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      const newTrack = playlist[currentTrackIndex - 1];
      if (newTrack) {
        state.currentTrack = newTrack;
        state.isPlaying = true;
      }
    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setIsLoop: (state, action: PayloadAction<boolean>) => {
      state.isLoop = action.payload;
    },
    setIsShuffled: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },

    setLikeTrack: (state, action: PayloadAction<TrackType>) => {
      const trackId = action.payload;

      state.favoriteTracksList.push(trackId);
    },
    setDisLikeTrack: (state, action: PayloadAction<TrackType>) => {
      const trackId = action.payload;

      state.favoriteTracksList = state.favoriteTracksList.filter(
        (id) => id !== trackId
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(getFavoriteTracks.fulfilled, (state, action) => {
      state.favoriteTracksList = action.payload.data;
      state.defaultPlaylist = action.payload.data;
      state.filteredTracks = action.payload.data;
    });
  },
});

export const {
  setCurrentTrack,
  setDefaultPlaylist,
  setPrevTrack,
  setNextTrack,
  setIsPlaying,

  setIsLoop,
  setIsShuffled,
  setLikeTrack,
  setDisLikeTrack,
} = playlistSlice.actions;

export const playlistReducer = playlistSlice.reducer;
