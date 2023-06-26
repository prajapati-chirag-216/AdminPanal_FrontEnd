import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admins: [],
  updateAdminId: "",
  fetchAdminData: { status: true, activity: "Fetching.." },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmins(state, action) {
      state.admins = action.payload;
    },
    setFetchAdminData(state, action) {
      state.fetchAdminData.status = action.payload.status;
      state.fetchAdminData.activity = action.payload.activity;
    },
    setUpdateAdminId(state, action) {
      state.updateAdminId = action.payload;
    },
  },
});

export const adminActions = adminSlice.actions;

export default adminSlice.reducer;
