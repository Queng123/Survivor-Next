import React from 'react';
import { View, Text, Button } from 'react-native';

import { WidgetData, WidgetType, WidgetContainerFunctions, WidgetViewProps } from './WidgetTypes';
import { moveWidget, removeWidget } from './WidgetFunctions';

export const TestWidget = ({data}: {data: WidgetData}): JSX.Element => {
    return (
        <View>
            <Text>{data.widgetParams.text}</Text>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                <Button title="Supprimer" onPress={() => removeWidget(data.key)} />
                <Button title="▲" onPress={() => moveWidget(data.key, 'up')} />
                <Button title="▼" onPress={() => moveWidget(data.key, 'down')} />
            </View>
        </View>
    );
};
