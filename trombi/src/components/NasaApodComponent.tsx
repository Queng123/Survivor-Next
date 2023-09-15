import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';

export const NasaApodComponent = () => {
  const token = useSelector(
    (state: any) => state.custom.customState['extern-api-token'].apod,
  );
  const [photoInfo, setPhotoInfo] = useState(null);

  useEffect(() => {
    const GetPhotoInfo = async (token: string) => {
      const response = await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=' + token,
      );
      const json = await response.json();
      return json;
    };
    if (photoInfo === null) {
      GetPhotoInfo(token).then(json => {
        console.log(json);
        setPhotoInfo(json);
      });
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  if (photoInfo === null) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      {photoInfo && (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.title}>{photoInfo.title}</Text>
          <FastImage
            source={{
              uri: photoInfo.hdurl,
              headers: {
                'Content-Type': 'image/jpeg',
              },
            }}
            style={{width: 200, height: 200}}
          />
        </View>
      )}
    </View>
  );
};

export default NasaApodComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
});
