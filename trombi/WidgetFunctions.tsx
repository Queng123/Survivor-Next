import {store} from './GlobalStore';
import {v4 as uuidv4} from 'uuid';

export const addWidget = (widgetType: string, widgetParams: any) => {
    const uuidg = uuidv4();
    store.dispatch({
        type: 'widget/addWidget',
        payload: {
            widgetType,
            key: uuidg,
            widgetParams,
        },
    });
}

export const moveWidget = (key: string, direction: 'up' | 'down') => {
    store.dispatch({
        type: 'widget/moveWidget',
        payload: {
            key,
            direction,
        },
    });
}

export const removeWidget = (key: string) => {
    store.dispatch({
        type: 'widget/removeWidget',
        payload: key,
    });
}
