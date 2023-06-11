import { createSlice, configureStore } from "@reduxjs/toolkit";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const initialAuth = () => {
  if (localStorage.getItem("loggedIn")) return true;
  return false;
};
const authSlice = createSlice({
  name: "auth",
  initialState: { isauth: initialAuth() },
  reducers: {
    loggedIn(state) {
      //user login info here
      localStorage.setItem("loggedIn", "1");
      state.isauth = true;
    },
    loggedOut(state) {
      localStorage.removeItem("loggedIn");
      state.isauth = false;
    },
  },
});

const pageSlice = createSlice({
  name: "page",
  initialState: { pageno: 1 },
  reducers: {
    setPage(state, action) {
      const newPage = action.payload;
      state.pageno = newPage;
    },
  },
});

const showGroupsTabSlice = createSlice({
  name: "hideGroupsTab",
  initialState: { show: true },
  reducers: {
    showTab(state) {
      state.show = true;
    },
    hideTab(state) {
      state.show = false;
    },
  },
});
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pageno: pageSlice.reducer,
    showgrpTab: showGroupsTabSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const pageActions = pageSlice.actions;
export const showgrpTab = showGroupsTabSlice.actions;
export default store;
