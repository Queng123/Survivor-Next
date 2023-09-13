import {configureStore} from '@reduxjs/toolkit';
import widgetReducer from './WidgetSlice';
import customReducer from './CustomSlice';
import tokenReducer from './TokenSlice';

export const store = configureStore({
  reducer: {
    widget: widgetReducer,
    custom: customReducer,
    token: tokenReducer,
  },
});
