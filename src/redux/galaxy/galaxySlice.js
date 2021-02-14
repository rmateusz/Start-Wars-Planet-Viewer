import { createSlice } from '@reduxjs/toolkit';
import { fetchPlanetDetails, fetchPlanets } from './galaxyThunks';
import { StatesEnum } from './StatesEnum';

export const galaxySlice = createSlice({
  name: 'galaxy',
  initialState: {
    chosenPlanet: null,
    error: '',
    loadingCounter: 0,
    planets: [],
    shipState: StatesEnum.idle,
  },
  reducers: {
    choosePlanet: (state, action) => {
        state.chosenPlanet = action.payload;
    },
    setGalaxyView: state => {
      state.shipState = StatesEnum.galaxy;
    },
    setPlanetView: state => {
      state.shipState = StatesEnum.planet;
    },
    setShipState: (state, action) => {
      state.shipState = (state, action) ;
    },
  },
  extraReducers: {
    [fetchPlanets.pending]: (state) => {
      state.loadingCounter++;
      state.shipState = StatesEnum.loading;
    },
    [fetchPlanets.fulfilled]: (state, action) => {
      state.loadingCounter--;
      state.planets = action.payload;
      state.shipState = StatesEnum.galaxy;
    },
    [fetchPlanets.rejected]: (state, action) => {
      state.chosenPlanet = null;
      state.loadingCounter -= state.loadingCounter;
      state.shipState = StatesEnum.galaxy;
      state.planets = [];      
      state.error = action.error.message;
    },
    [fetchPlanetDetails.pending]: (state) => {
      state.loadingCounter++;
      state.shipState = StatesEnum.warp;
    },
    [fetchPlanetDetails.fulfilled]: (state, action) => {      
        state.chosenPlanet = action.payload;
        state.loadingCounter--;
    },
    [fetchPlanetDetails.rejected]: (state, action) => {
      state.chosenPlanet = null;
      state.loadingCounter -= state.loadingCounter;
      state.status = 'failed';
      state.planets = [];      
      state.error = action.error.message;
    },
  },
});

export const { choosePlanet, setGalaxyView, setPlanetView } = galaxySlice.actions;

export const selectAllPlanets = state => state.galaxy.planets;
export const selectChosenPlanet = state => state.galaxy.chosenPlanet;
export const selectShipState = state => state.galaxy.shipState;

export default galaxySlice.reducer;