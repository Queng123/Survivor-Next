import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector} from 'react-redux';
import {WidgetData, WidgetViewProps} from './WidgetTypes';
import {store} from './GlobalStore';
import {v4 as uuid} from 'uuid'
import { TestWidget } from './TestWidget';

export const WidgetContainer = (): JSX.Element => {
    const state = store.getState();
    const widget = useSelector((state: any) => state.widget);
    
    return (
        <View>
            {widget.items.map((item: WidgetData) => (
                item.widgetType === 'TestWidget' && <TestWidget data={item} key={item.key} containerFunctions={{
                    removeWidget: (key: string) => store.dispatch({type: 'widget/removeWidget', payload: key}),
                    moveWidget: (key: string, direction: 'up' | 'down') => store.dispatch({type: 'widget/moveWidget', payload: {key, direction}})
                }}/>
            ))}
        </View>
    )
};