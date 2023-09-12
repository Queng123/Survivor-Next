import { configureStore } from '@reduxjs/toolkit';
import widgetReducer from './WidgetSlice';

export const store = configureStore({
    reducer: {
        widget: widgetReducer
    }
});
