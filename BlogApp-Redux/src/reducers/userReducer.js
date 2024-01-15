import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    getUser(state, _) {
      const loggedUserInfo = localStorage.getItem("loggedUserInfo");
      return loggedUserInfo ? JSON.parse(loggedUserInfo) : state;
    },
    setUserInfo(_, action) {
      localStorage.setItem("loggedUserInfo", JSON.stringify(action.payload));
      return action.payload;
    },
    removeUser() {
      localStorage.removeItem("loggedUserInfo");
      return null;
    }
  }
});

export const { getUser, setUserInfo, removeUser } = userSlice.actions;


export const setUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials);
    dispatch(setUserInfo(user));
  }
}


export default userSlice.reducer;