import { createSlice } from '@reduxjs/toolkit';
import { fetchPlanetDetails, fetchPlanets } from './galaxyThunks';
import { StatesEnum } from './StatesEnum';

export const galaxySlice = createSlice({
  name: 'galaxy',
  initialState: {
    chosenPlanet: null,
    error: '',
    gridVisible: false,
    loadingCounter: 0,
    shipState: StatesEnum.idle,
    planets: [],
  },
  reducers: {
    choosePlanet: (state, action) => {
        state.chosenPlanet = action.payload;
    },
    gridVisibility: state => {
      state.gridVisible = !state.gridVisible;
    },
    loadPlanets: (state, action) => {
      state.planets = (state, action) ;
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

export const { choosePlanet, loadPlanets, setPlanetView, setShipState } = galaxySlice.actions;

export const selectAllPlanets = state => state.galaxy.planets;
export const selectPlanetsByName = (state, name) => state.galaxy.planets.find(planet => planet.name === name);
export const selectChosenPlanet = state => state.galaxy.chosenPlanet;
export const selectLoadings = state => state.galaxy.loadingCounter;
export const selectShipState = state => state.galaxy.shipState;

export default galaxySlice.reducer;