import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector} from 'react-redux';
import {WidgetData, WidgetViewProps} from './WidgetTypes';
import {store} from './GlobalStore';
import {v4 as uuid} from 'uuid'
import { TestWidget } from './TestWidget';
import { Provider } from 'react-redux';

export const WidgetContainer = (): JSX.Element => {
    const widget = useSelector((state: any) => state.widget);
    
    return (
        <Provider store={store}>
            <View>
            {widget.items.map((item: WidgetData) => (
                item.widgetType === 'TestWidget' && <TestWidget data={item} key={item.key}/>
            ))}
            </View>
        </Provider>
    )
};