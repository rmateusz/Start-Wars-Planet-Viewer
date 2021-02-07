import { configureStore } from '@reduxjs/toolkit';
import galaxyReducer from './galaxy/galaxySlice';

export default configureStore({
  reducer: {
    galaxy: galaxyReducer,
  },
});
