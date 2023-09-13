import React, {useState, useEffect} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Geolocation from '@react-native-community/geolocation';
import {
  WidgetData
} from '../utils/WidgetTypes';
import {WidgetFrame} from './WidgetFrame';
import { getCustomState } from '../utils/CustomFunctions';

export const MeteoWidget = ({data}: {data: WidgetData}): JSX.Element => {
    const [loc, setLoc] = useState({latitude: 0, longitude: 0});
    const [meteoData, setMeteoData] = useState({} as any);
    const [fetched, setFetched] = useState(false);

    const getMeteoData = async ({latitude, longitude}: any) => {
        const url = `https://api.weatherapi.com/v1/current.json?key=${getCustomState()['extern-api-token']['weather']}&q=${latitude},${longitude}&aqi=no`;
        // TODO: do not push API key in the code
        const response = await fetch(url);
        const data = await response.json();
        setMeteoData(data);
        setFetched(true);
    }

    useEffect(() => {
        Geolocation.requestAuthorization(() => {
          Geolocation.getCurrentPosition((position) => {
              setLoc({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
              });
              getMeteoData({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
              });
          }, (error) => {
              console.log(error.code, error.message);
          }, { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 });
        }, (error) => {
          console.log(error.code, error.message);
        });
    }, []);

    return (
        <WidgetFrame data={data} title="Meteo" backgroundColor="#00ccff" foregroundColor='black'>
          <View style={styles.container}>
            {fetched && (
                <>
                  <FastImage
                      style={{width: 60, height: 60}}
                      source={{
                          uri: `https:${meteoData.current?.condition?.icon}`
                      }}
                  />
                  <View style={styles.meteoData}>
                    <Text style={styles.meteoDataText}>{meteoData.location?.name}, {meteoData.location?.country}</Text>
                    <Text style={styles.meteoDataText}>{meteoData.current?.temp_c}°C</Text>
                  </View>
                </>
                )
            }
            </View>
        </WidgetFrame>
    );
}

export const createMeteoWidget = (): WidgetData => {
  return {
    widgetType: 'MeteoWidget',
    widgetParams: {},
    key: ''
  };
}

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
    fontSize: 16
  },
});
