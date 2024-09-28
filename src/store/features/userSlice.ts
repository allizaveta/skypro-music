import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserAPI } from "@/api/users";
import { ErrorMessage, getEmptyError, isError } from "@/types/errorsTypes";
import { TokensPair, UserType } from "@/types/usersTypes";

const signIn = createAsyncThunk("user/getUser", UserAPI.signIn);
const signUp = createAsyncThunk("user/addUser", UserAPI.signUp);
const getTokens = createAsyncThunk("user/getTokens", UserAPI.getTokens);
const refreshTokens = createAsyncThunk(
  "user/refreshTokens",
  UserAPI.refreshTokens
);

interface UserState {
  errorMsg: ErrorMessage | null;
  user: UserType | null;
  tokens: TokensPair;
}

const initialState: UserState = {
  errorMsg: getEmptyError(),
  user: null,
  tokens: {
    access: null,
    refresh: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    publicError: (state, action: PayloadAction<ErrorMessage>) => {
      state.errorMsg = action.payload;
    },
    signOut: (state) => {
      state.errorMsg = getEmptyError();
      state.user = null;
      state.tokens.access = null;
      state.tokens.refresh = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        signIn.fulfilled,
        (state, action: PayloadAction<UserType | ErrorMessage>) => {
          if (isError(action.payload)) {
            state.errorMsg = action.payload;
            state.user = null;
          } else {
            state.errorMsg = getEmptyError();
            state.user = action.payload;
          }
        }
      )
      .addCase(signIn.rejected, (state, action) => {
        console.error("Error:", action.error.message);
      })
      .addCase(
        signUp.fulfilled,
        (state, action: PayloadAction<UserType | ErrorMessage>) => {
          if (isError(action.payload)) {
            state.errorMsg = action.payload;
            state.user = null;
          } else {
            state.errorMsg = getEmptyError();
            state.user = action.payload;
          }
        }
      )
      .addCase(signUp.rejected, (state, action) => {
        console.error("Error:", action.error.message);
      })
      .addCase(
        getTokens.fulfilled,
        (state, action: PayloadAction<TokensPair | ErrorMessage>) => {
          if (isError(action.payload)) {
            state.errorMsg = action.payload;
            state.tokens.access = null;
            state.tokens.refresh = null;
          } else {
            state.errorMsg = getEmptyError();
            state.tokens.access = action.payload.access;
            state.tokens.refresh = action.payload.refresh;
          }
        }
      )
      .addCase(getTokens.rejected, (state, action) => {
        console.error("Error:", action.error.message);
      })
      .addCase(
        refreshTokens.fulfilled,
        (state, action: PayloadAction<TokensPair>) => {
          state.tokens.access = action.payload.access;
          state.tokens.refresh = action.payload.refresh;
        }
      )
      .addCase(refreshTokens.rejected, (state, action) => {
        console.error("Error:", action.error.message);
      });
  },
});

export { signIn, signUp, getTokens, refreshTokens };
export const { publicError, signOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
