import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Geolocation from '@react-native-community/geolocation';
import {WidgetData} from '../utils/WidgetTypes';
import {WidgetFrame} from './WidgetFrame';
import {getCustomState} from '../utils/CustomFunctions';
import {useTranslation} from 'react-i18next';
import i18n from 'i18next';

export const MeteoWidget = ({data}: {data: WidgetData}): JSX.Element => {
  const {t} = useTranslation();
  const [meteoData, setMeteoData] = useState({} as any);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const getMeteoData = async ({latitude, longitude}: any) => {
      const url = `https://api.weatherapi.com/v1/current.json?key=${
        getCustomState()['extern-api-token'].weather
      }&q=${latitude},${longitude}&aqi=no&lang=${i18n.language}`;
      const response = await fetch(url);
      const data = await response.json();
      setMeteoData(data);
      setFetched(true);
    };

    Geolocation.requestAuthorization(
      () => {
        Geolocation.getCurrentPosition(
          position => {
            getMeteoData({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
        );
      },
      error => {
        console.log(error.code, error.message);
      },
    );
  }, [i18n.language]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetFrame
      data={data}
      title={t('widgets.meteo.title')}
      backgroundColor="#00ccff"
      foregroundColor="black">
      <View style={styles.container}>
        {fetched && (
          <>
            <FastImage
              style={{width: 60, height: 60}}
              source={{
                uri: `https:${meteoData.current?.condition?.icon}`,
              }}
            />
            <View style={styles.meteoData}>
              <Text style={styles.meteoDataText}>
                {meteoData.location?.name}, {meteoData.location?.country} -{' '}
                {meteoData.current?.condition.text}
              </Text>
              <Text style={styles.meteoDataText}>
                {meteoData.current?.temp_c}°C
              </Text>
            </View>
          </>
        )}
      </View>
    </WidgetFrame>
  );
};

export const createMeteoWidget = (): WidgetData => {
  return {
    widgetType: 'MeteoWidget',
    widgetParams: {},
    key: '',
  };
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
  },
  meteoData: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  meteoDataText: {
    fontSize: 16,
  },
});
