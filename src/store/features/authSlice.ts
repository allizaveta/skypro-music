import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SinginFormType, Tokens, StaredUserType } from "../../types/user";
import { fetchTokens, LoginApi } from "@/app/components/api/tracks";

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ email, password }: SinginFormType) => {
    const user = await LoginApi({ email, password });
    return user;
  }
);

export const getTokens = createAsyncThunk(
  "user/getTokens",
  async ({ email, password }: SinginFormType) => {
    const tokens = await fetchTokens({ email, password });
    return tokens;
  }
);

type AuthStateType = {
  user: StaredUserType | null;
  tokens: {
    access: string | null;
    refresh: string | null;
  };
};

const initialState: AuthStateType = {
  user: null,
  tokens: {
    access: null,
    refresh: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    quitUser: (state) => {
      state.user = null;
      state.tokens.access = null;
      state.tokens.refresh = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getUser.fulfilled,
      (state, action: PayloadAction<StaredUserType>) => {
        state.user = action.payload;
      }
    );
    builder.addCase(
      getTokens.fulfilled,
      (state, action: PayloadAction<Tokens>) => {
        state.tokens.access = action.payload.access;
        state.tokens.refresh = action.payload.refresh;
      }
    );
  },
});

export const { quitUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
