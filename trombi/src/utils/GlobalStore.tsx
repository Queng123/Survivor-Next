import {configureStore} from '@reduxjs/toolkit';
import widgetReducer from './WidgetSlice';
import customReducer from './CustomSlice';

export const store = configureStore({
  reducer: {
    widget: widgetReducer,
    custom: customReducer,
  },
});
