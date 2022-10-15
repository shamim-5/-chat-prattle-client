import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: false,
};

const collapsedSlice = createSlice({
  name: "collapsed",
  initialState,
  reducers: {
    setCollapsed: (state, action) => {
      state.type = action.payload.type;
    },
  },
});

export const { setCollapsed } = collapsedSlice.actions;
export default collapsedSlice.reducer;
