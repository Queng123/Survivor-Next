import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';

const GetPhotoInfo = async () => {
    const response = await fetch('https://api.nasa.gov/planetary/apod'/*need to add the key here*/);
    const json = await response.json();
    return json;
}

const NasaApodComponent = () => {
    const [photoInfo, setPhotoInfo] = useState(null);

    useEffect(() => {
        if (photoInfo === null) {
            GetPhotoInfo().then((json) => {
                setPhotoInfo(json);
            });
        }
    }, []);

    if (photoInfo === null) {
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View>
            <Text>{photoInfo.title}</Text>
            <FastImage
                source={{
                    uri: photoInfo.url,
                    headers: {
                        'Content-Type': 'image/jpeg',
                    },
                }}
                style={{ width: 200, height: 200 }}
            />
        </View>
    );
}

export default NasaApodComponent;
