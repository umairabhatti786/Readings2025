import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface AuthState {
  user: any;
}
export const initialState: AuthState = {
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<any>) => {
      state.user = payload;
    },
  },
});

export const { setUserData } = authSlice.actions;
export default authSlice.reducer;

export const getUserData = (state: RootState) => state?.auth.user;
export const getToken = (state: RootState) => state?.auth.user?.token;
