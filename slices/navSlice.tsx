import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,  //intial origin has been set to null
  destination: null,
  travelTimeInformation: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState: initialState,
  reducers: {  //pass in reducers (make sure there are no spelling errors)
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;

// Selectors
export const selectOrigin = (state: { nav: { origin: any; }; }) => state.nav.origin;
//change how selectOrigin is defined:
/*
export const selectOrigin = createSelector(
  (state) => state.navigation.origin,
  (origin) => origin
) */
export const selectDestination = (state: { nav: { destination: any; }; }) => state.nav.destination;
export const selectTravelTimeInformation = (state: { nav: { travelTimeInformation: any; }; }) => state.nav.travelTimeInformation;

export default navSlice.reducer;