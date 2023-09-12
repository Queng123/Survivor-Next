import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {WidgetData} from './WidgetTypes';
import {store} from './GlobalStore';
import { TestWidget } from './TestWidget';
import { getWidgetsFromStorage } from './WidgetFunctions';

export const WidgetContainer = (): JSX.Element => {
    const widget = useSelector((state: any) => state.widget);

    useEffect(() => {
        getWidgetsFromStorage().then((widgets) => {
            store.dispatch({
                type: 'widget/importWidgets',
                payload: widgets,
            });
        });
    }, []);
    
    return (
        <View>
        {widget.items.map((item: WidgetData) => (
            item.widgetType === 'TestWidget' && <TestWidget data={item} key={item.key}/>
        ))}
        </View>
    )
};