import React from 'react';

import {
  Alert,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

import {WidgetData} from '../utils/WidgetTypes';
import {WidgetFrame} from './WidgetFrame';
import {
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {getTokens} from '../utils/TokenFunctions';
import {loginAndStoreToken} from '../utils/GoogleLogin';
import {Linking} from 'react-native';
import FastImage from 'react-native-fast-image';

const YoutubeFavorites = ({token}: {token: string}): JSX.Element => {
  const [videos, setVideos] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch(
      'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&myRating=like&mine=true&maxResults=50',
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(res => res.json())
      .then(res => {
        setVideos(res.items);
      })
      .catch(err => {
        console.error(err);
      });
  }, [token]);

  const youtubeDateToReadableDate = (date: string): string => {
    const dateObject = new Date(date);
    return `${dateObject.getDate()}/${dateObject.getMonth()}/${dateObject.getFullYear()}`;
  };

  return (
    <View style={styles.favoriteView}>
      <Text style={styles.favoriteTitle}>Vos vidéos favorites</Text>
      <ScrollView>
        {videos &&
          videos.map((video, index) => (
            <Pressable
              key={`youtube-favorite-${index}`}
              onPress={() =>
                Linking.openURL(`https://www.youtube.com/watch?v=${video.id}`)
              }>
              <View style={styles.favoriteWrapper}>
                <FastImage
                  style={styles.favoriteImage}
                  source={{uri: video.snippet.thumbnails.high.url}}
                />
                <View style={styles.favoriteDesc}>
                  <Text
                    numberOfLines={3}
                    style={{color: 'white', fontSize: 14}}>
                    {video.snippet.title}
                  </Text>
                  <View style={{height: 6}} />
                  <Text style={{color: 'white', fontSize: 12}}>
                    {video.snippet.channelTitle}
                  </Text>
                  <Text style={{color: 'white', fontSize: 12}}>
                    {youtubeDateToReadableDate(video.snippet.publishedAt)}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
};

export const YoutubeWidget = ({data}: {data: WidgetData}): JSX.Element => {
  const [token, setToken] = React.useState<string>(getTokens()['google-oauth']);

  const signIn = async () => {
    try {
      setToken(await loginAndStoreToken());
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Login is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play services are not available');
      } else {
        Alert.alert('Something went wrong', error.toString());
        console.error(error);
      }
    }
  };

  return (
    <WidgetFrame
      data={data}
      title="Youtube"
      backgroundColor="red"
      foregroundColor="black">
      <View>
        {token === '' && (
          <GoogleSigninButton
            style={{width: '100%', height: 52}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
        )}
        {token !== '' && <YoutubeFavorites token={token} />}
      </View>
    </WidgetFrame>
  );
};

export const styles = StyleSheet.create({
  favoriteView: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    minHeight: 160,
    maxHeight: 320,
  },
  favoriteTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  favoriteImage: {
    width: 160,
    height: 90,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
  },
  favoriteWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexBasis: 100,
    flexShrink: 1,
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  favoriteDesc: {
    marginLeft: 10,
    flex: 1,
  },
});

export const createYoutubeWidget = (): WidgetData => {
  return {
    widgetType: 'YoutubeWidget',
    widgetParams: {},
    key: '',
  };
};
