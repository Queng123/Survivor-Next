import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WidgetData} from '../utils/WidgetTypes';
import {WidgetFrame} from './WidgetFrame';
import {useTranslation} from 'react-i18next';
import {NasaApodComponent} from './NasaApodComponent';

export const NasaApodWidget = ({data}: {data: WidgetData}): JSX.Element => {
  const {t} = useTranslation();

  return (
    <WidgetFrame
      data={data}
      title={t('widgets.nasaApod.title')}
      backgroundColor="black"
      foregroundColor="white">
      <View style={styles.container}>
        <NasaApodComponent />
      </View>
    </WidgetFrame>
  );
};

export const createNasaApodWidget = (): WidgetData => {
  return {
    widgetType: 'NasaApodWidget',
    widgetParams: {},
    key: '',
  };
};

const styles = StyleSheet.create({
  container: {},
});
