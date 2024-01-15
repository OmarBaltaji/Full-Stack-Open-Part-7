import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    hideNotification() {
      return null;
    }
  }
});

export const { setNotification, hideNotification } = notificationSlice.actions;

export const notify = (notification) => {
  return async dispatch => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  }
}

export default notificationSlice.reducer;
