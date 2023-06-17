import { createSlice, configureStore } from "@reduxjs/toolkit";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const initialAuth = () => {
  if (localStorage.getItem("loggedIn")) return true;
  return false;
};
//IMPORTANT
//ADD USER LIST THAT CONTAINS THE LIST OF ALL USERS EXCEPT THE CURRENT USER
const userData = {
  username: "demoUser",
  isAdmin: false,
  groupList: ["Maths", "Science", "English"],
  peopleList: ["userOne", "secondUser", "thirdUser"],
  groupData: [
    {
      groupName: "Maths",
      members: ["userOne", "secondUser", "thirdUser"],
      messages: [
        {
          user: "userOne",
          messageContent: "this is funny",
          messageReaction: false,
        },
        {
          user: "userTwo",
          messageContent: "this is not funny",
          messageReaction: true,
        },
        {
          user: "userTwo",
          messageContent: "this is almost funny",
          messageReaction: true,
        },
      ],
    },
    {
      groupName: "Science",
      members: ["three", "Four", "five"],
      messages: [
        {
          user: "three",
          messageContent: "this is very funny",
          messageReaction: false,
        },
        {
          user: "Four",
          messageContent: "this is not funny",
          messageReaction: false,
        },
        {
          user: "five",
          messageContent: "this is almost funny funny",
          messageReaction: true,
        },
      ],
    },
    {
      groupName: "English",
      members: ["Six", "Seven", "Eight"],
      messages: [
        {
          user: "six",
          messageContent: "this is very funny",
          messageReaction: false,
        },
        {
          user: "seven",
          messageContent: "this is not funny",
          messageReaction: true,
        },
        {
          user: "eight",
          messageContent: "this is almost funny funny",
          messageReaction: true,
        },
      ],
    },
  ],
};
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isauth: initialAuth(),
    userData: userData,
  },
  reducers: {
    setUserInit(state, action) {
      const data = action.payload;
      state.userData.username = data.username;
      state.userData.isAdmin = data.isAdmin;
      console.log("this is form setUser", state.userData.username);
      localStorage.setItem("loggedIn", "1");
      state.isauth = true;
    },
    loggedIn(state, action) {
      console.log("this is from logged in data changes");
      const userData = action.payload;
      state.userData = userData.data;
      console.log(state.userData);
    },
    loggedOut(state) {
      localStorage.removeItem("loggedIn");
      state.isauth = false;
    },
    addNewMessage(state, action) {
      const { currentGroup, newmsg } = action.payload;
      for (let i = 0; i < state.userData.groupData.length; i++) {
        if (
          state.userData.groupData[i].groupName ===
          state.userData.groupData[currentGroup].groupName
        ) {
          console.log(currentGroup);
          state.userData.groupData[i].messages.push({
            user: state.userData.username,
            messageContent: newmsg,
            messageReaction: false,
          });
          const len = state.userData.groupData[currentGroup].messages.length;
          console.log(
            state.userData.groupData[currentGroup].messages[len - 1]
              .messageContent,
            len
          );
        }
      }
    },
    toggleLike(state, action) {
      const { currentGrp, messageId } = action.payload;
      state.userData.groupData[currentGrp].messages[messageId].messageReaction =
        !state.userData.groupData[currentGrp].messages[messageId]
          .messageReaction;
    },
    removeUser(state, action) {
      const username = action.payload;
      const people = state.userData.peopleList;
      for (let i = 0; i < people; i++) {
        if (username === people[i]) people.splice(i, 1);
      }
      console.log(state.userData.peopleList);
    },
  },
});

const pageSlice = createSlice({
  name: "page",
  initialState: { pageno: 1, grpNo: 0 },
  reducers: {
    setPage(state, action) {
      const newPage = action.payload;
      state.pageno = newPage;
    },
    setGroup(state, action) {
      const newGroup = action.payload;
      state.grpNo = newGroup;
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
