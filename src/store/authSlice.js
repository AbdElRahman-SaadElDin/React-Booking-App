import { createSlice } from "@reduxjs/toolkit";

const getLocal = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
};

const initialState = {
  logedUser: getLocal("logedUser", {}),
  users: getLocal("users", []),
  isLogin: getLocal("isLogin", false),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const found = state.users.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );
      if (found) {
        state.logedUser = found;
        state.isLogin = true;
        localStorage.setItem("logedUser", JSON.stringify(found));
        localStorage.setItem("isLogin", JSON.stringify(true));
      } else {
        state.logedUser = {};
        state.isLogin = false;
        localStorage.setItem("logedUser", JSON.stringify({}));
        localStorage.setItem("isLogin", JSON.stringify(false));
      }
    },
    logout: (state) => {
      state.logedUser = {};
      state.isLogin = false;
      localStorage.removeItem("logedUser");
      localStorage.setItem("isLogin", JSON.stringify(false));
    },
    register: (state, action) => {
      const exists = state.users.some((u) => u.email === action.payload.email);
      if (!exists) {
        state.users.push(action.payload);
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
  },
});
