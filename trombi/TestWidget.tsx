import React from 'react';
import { View, Text, Button } from 'react-native';

import { WidgetData, WidgetType, WidgetContainerFunctions, WidgetViewProps } from './WidgetTypes';


export const TestWidget = ({data, containerFunctions}: WidgetViewProps): JSX.Element => {
    console.debug("TestWidget data: ", data);

    return (
        <View>
            <Text>{data.widgetParams.text}</Text>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                <Button title="Supprimer" onPress={() => containerFunctions.removeWidget(data.widgetParams.key)} />
                <Button title="▲" onPress={() => containerFunctions.moveWidget(data.widgetParams.key, 'up')} />
                <Button title="▼" onPress={() => containerFunctions.moveWidget(data.widgetParams.key, 'down')} />
            </View>
        </View>
    );
};
