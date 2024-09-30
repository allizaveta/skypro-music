import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";

import { TracksAPI } from "@/api/tracks";
import { isError } from "@/types/errorsTypes";
import { getDateNumber } from "@/utils/datetime";
import {
  CatalogsCollectionType,
  PlaylistType,
  SortOptions,
  TrackIndex,
  TrackType,
} from "@/types/tracksTypes";

const getTracks = createAsyncThunk("player/getTracks", TracksAPI.getTracks);
const getFavouriteTracks = createAsyncThunk(
  "player/getFavouriteTracks",
  TracksAPI.getFavouriteTracks
);
const getCatalogs = createAsyncThunk(
  "player/getCatalogs",
  TracksAPI.getCatalogs
);

interface PlayerState {
  playlists: {
    empty: PlaylistType;
    initial: PlaylistType;
    favourite: PlaylistType;
    active: PlaylistType;
    shuffled: PlaylistType;
    visible: PlaylistType;
    filtered: PlaylistType;
    sorted: PlaylistType;
    indexes: TrackIndex[];
  };
  catalogs: CatalogsCollectionType;
  catalogName: string;
  filters: {
    queryText: string;
    authors: string[];
    genres: string[];
    sort: SortOptions;
  };
  currentTrack: TrackType | null;
  isPaused: boolean;
  isShuffled: boolean;
}

interface PlayerInfo {
  playlist: PlaylistType;
  track: TrackType;
}

interface PlaylistInfo {
  kind:
    | "initial"
    | "favourite"
    | "active"
    | "shuffled"
    | "visible"
    | "filtered"
    | "sorted";
  playlist: PlaylistType;
}

interface PlayerFilterInfo {
  kind: FilterKeys;
  value: string | SortOptions;
}

export type FiltersType = PlayerState["filters"];
export type FilterKeys = keyof PlayerState["filters"];

const initialState: PlayerState = {
  playlists: {
    empty: [],
    initial: [],
    favourite: [],
    active: [],
    shuffled: [],
    visible: [],
    filtered: [],
    sorted: [],
    indexes: [],
  },
  catalogs: [],
  catalogName: "",
  filters: {
    queryText: "",
    authors: [],
    genres: [],
    sort: SortOptions.disabled,
  },
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
    release_value: 0,
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

function doSearch(state: WritableDraft<PlayerState>, value: string) {
  state.filters.queryText = value.toLowerCase();

  doUpdateFilteredPlaylist(state);
}

function doFilter(
  state: WritableDraft<PlayerState>,
  value: string,
  kind: PlayerFilterInfo["kind"]
) {
  if (kind === "authors" || kind === "genres") {
    if (state.filters[kind].includes(value))
      state.filters[kind].splice(state.filters[kind].indexOf(value), 1);
    else state.filters[kind].push(value);
  }

  doUpdateFilteredPlaylist(state);
}

function doUpdateFilteredPlaylist(state: WritableDraft<PlayerState>) {
  state.playlists.filtered = state.playlists.visible.filter((track) => {
    let isVisible =
      state.filters.authors.length === 0 ||
      state.filters.authors.includes(track.author);

    if (!isVisible) return false;

    isVisible =
      state.filters.genres.length === 0 ||
      track.genre.reduce(
        (_, genre) => state.filters.genres.includes(genre),
        false
      );

    if (!isVisible) return false;

    isVisible =
      !state.filters.queryText ||
      track.author.toLowerCase().includes(state.filters.queryText) ||
      track.name.toLowerCase().includes(state.filters.queryText) ||
      track.album.toLowerCase().includes(state.filters.queryText);

    return isVisible;
  });
}

function doSort(state: WritableDraft<PlayerState>, value: SortOptions) {
  if (value === SortOptions.disabled) {
    state.filters.sort = value;
    state.playlists.sorted = state.playlists.filtered;
  } else {
    state.filters.sort = value;
    state.playlists.sorted = state.playlists.filtered.toSorted((lhs, rhs) => {
      const result = lhs.release_value - rhs.release_value;
      return value === SortOptions.oldOnTop ? result : -result;
    });
  }
}

function doShuffle(state: WritableDraft<PlayerState>) {
  if (!state.isShuffled) {
    state.playlists.shuffled = state.playlists.active;
    return;
  }

  state.playlists.shuffled = state.playlists.active.toSorted(
    () => 0.5 - Math.random()
  );

  const offset = state.playlists.shuffled.findIndex(
    (track) => track._id === state.currentTrack?._id
  );

  state.playlists.indexes = state.playlists.shuffled.map((track, index) => {
    const num = index - offset;

    return {
      _id: track._id,
      num: num > 0 ? num : state.playlists.shuffled.length + num,
    };
  });
}

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlaylist(state, action: PayloadAction<PlaylistInfo>) {
      state.playlists[action.payload.kind] =
        action.payload.playlist ?? state.playlists.empty;

      if (action.payload.kind === "initial") {
        state.playlists.initial.forEach((track) => {
          track.release_value = getDateNumber(track.release_date);
          track.genre = track.genre.map((genre) =>
            genre === "Рок музыка" ? "Рок-музыка" : genre
          );
        });
      } else if (action.payload.kind === "active") {
        doShuffle(state);
      } else if (action.payload.kind === "visible") {
        state.playlists.filtered = state.playlists.visible;
        state.playlists.sorted = state.playlists.visible;
      }
    },
    setActivePlaylistAndTrackInside(state, action: PayloadAction<PlayerInfo>) {
      state.playlists.active = action.payload.playlist;
      state.currentTrack = action.payload.track;

      doShuffle(state);
    },
    setCatalogName(state, action: PayloadAction<string>) {
      state.catalogName = action.payload;
    },
    setFilter(state, action: PayloadAction<PlayerFilterInfo>) {
      if (action.payload.kind === "sort")
        return doSort(state, action.payload.value as SortOptions);

      if (action.payload.kind === "queryText") {
        doSearch(state, action.payload.value as string);
        doSort(state, state.filters.sort);
      } else {
        doFilter(state, action.payload.value as string, action.payload.kind);
        doSearch(state, state.filters.queryText);
        doSort(state, state.filters.sort);
      }
    },
    selectPrevTrack(state) {
      const index = state.playlists.shuffled.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      const track = state.playlists.shuffled[index - 1];

      if (track) state.currentTrack = track;
      else
        state.currentTrack =
          state.playlists.shuffled[state.playlists.shuffled.length - 1];

      if (state.isShuffled)
        for (const record of state.playlists.indexes) {
          ++record.num;

          if (record.num >= state.playlists.shuffled.length) record.num = 1;
        }
    },
    selectNextTrack(state) {
      const index = state.playlists.shuffled.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      const track = state.playlists.shuffled[index + 1];

      if (track) state.currentTrack = track;
      else state.currentTrack = state.playlists.shuffled[0];

      if (state.isShuffled)
        for (const record of state.playlists.indexes) {
          --record.num;

          if (record.num < 0) record.num = state.playlists.shuffled.length - 1;
        }
    },
    setIsPaused(state, action: PayloadAction<boolean>) {
      state.isPaused = action.payload;
    },
    toggleIsShuffled(state) {
      state.isShuffled = !state.isShuffled;

      doShuffle(state);
    },
    likeTrack(state, action: PayloadAction<TrackType>) {
      state.playlists.favourite.push(action.payload);
    },
    dislikeTrack(state, action: PayloadAction<TrackType>) {
      state.playlists.favourite = state.playlists.favourite.filter(
        (track) => track._id !== action.payload._id
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTracks.fulfilled, (state, action) => {
        if (!isError(action.payload)) state.playlists.initial = action.payload;
      })
      .addCase(getTracks.rejected, (state, action) => {
        console.error("Error:", action.error.message);
      })
      .addCase(getFavouriteTracks.fulfilled, (state, action) => {
        state.playlists.favourite = action.payload;
      })
      .addCase(getFavouriteTracks.rejected, (state, action) => {
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

export { getTracks, getFavouriteTracks, getCatalogs };
export const {
  setPlaylist,
  setActivePlaylistAndTrackInside,
  setCatalogName,
  setFilter,
  setIsPaused,
  selectPrevTrack,
  selectNextTrack,
  toggleIsShuffled,
  likeTrack,
  dislikeTrack,
} = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
