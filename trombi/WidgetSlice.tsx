import { createSlice } from '@reduxjs/toolkit';
import { WidgetData } from './WidgetTypes';

const initialState = {
    items: [] as WidgetData[]
};

export const widgetSlice = createSlice({
    name: 'widget',
    initialState,

    reducers: {
        addWidget(state, action: {payload: WidgetData, type: string}) {
            state.items.push(action.payload);
        },
        importWidgets(state, action: {payload: WidgetData[]}) {
            state.items = action.payload;
        },
        moveWidget(state, action: {payload: {key: string, direction: 'up' | 'down'}, type: string}) {
            const index = state.items.findIndex(item => item.key === action.payload.key);
            if (index === -1) {
                return;
            }
            const item = state.items[index];
            state.items.splice(index, 1);
            if (action.payload.direction === 'up') {
                state.items.splice(index - 1, 0, item);
            } else {
                state.items.splice(index + 1, 0, item);
            }
        },
        removeWidget(state, action: {payload: string, type: string}) {
            const index = state.items.findIndex(item => item.key === action.payload);
            if (index === -1) {
                return;
            }
            state.items.splice(index, 1);
        }
    }
});

export const { addWidget, moveWidget, removeWidget } = widgetSlice.actions;

export default widgetSlice.reducer;

export const selectWidgets = (state: {widget: {items: WidgetData[]}}) => state.widget.items;
