import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

import {WidgetFrameProps} from '../utils/WidgetTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moveWidget, removeWidget} from '../utils/WidgetFunctions';

export const WidgetFrame = ({
  children,
  data,
  title,
  backgroundColor,
  foregroundColor,
}: WidgetFrameProps): JSX.Element => {
  return (
    <View style={{...styles.frame, backgroundColor: backgroundColor}}>
      <View style={{...styles.header}}>
        <Text style={{...styles.title, color: foregroundColor}}>{title}</Text>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <View style={{flexDirection: 'row', gap: 12}}>
            <Pressable
              style={{width: 22, height: 22}}
              onPress={() => {
                moveWidget(data.key, 'up');
              }}>
              <Ionicons
                name="chevron-up-outline"
                size={20}
                color={foregroundColor}
              />
            </Pressable>
            <Pressable
              style={{width: 22, height: 22}}
              onPress={() => {
                moveWidget(data.key, 'down');
              }}>
              <Ionicons
                name="chevron-down-outline"
                size={20}
                color={foregroundColor}
              />
            </Pressable>
            <Pressable
              style={{width: 22, height: 22}}
              onPress={() => {
                removeWidget(data.key);
              }}>
              <Ionicons
                name="trash-outline"
                size={20}
                color={foregroundColor}
              />
            </Pressable>
          </View>
        </View>
      </View>
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  header: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
