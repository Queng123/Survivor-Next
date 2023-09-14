import React from 'react';

import {Text, View, StyleSheet, ScrollView, Pressable} from 'react-native';

import {WidgetData} from '../utils/WidgetTypes';
import {WidgetFrame} from './WidgetFrame';
import {CustomGoogleLoginButton} from '../utils/GoogleLogin';
import {Linking} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const YoutubeFavorites = ({token}: {token: string}): JSX.Element => {
  const {t} = useTranslation();
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
      <Text style={styles.favoriteTitle}>
        {t('widgets.youtube.yourFavoriteVideos')}
      </Text>
      <ScrollView nestedScrollEnabled={true}>
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
  const token = useSelector((state: any) => state.token.tokens['google-oauth']);

  return (
    <WidgetFrame
      data={data}
      title={t('widgets.youtube.title')}
      backgroundColor="red"
      foregroundColor="black">
      <View>
        {token === '' && <CustomGoogleLoginButton />}
        {token !== '' && (
          <View>
            <YoutubeFavorites token={token} />
          </View>
        )}
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
    maxHeight: 280,
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
  userInfoView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    alignItems: 'center',
  },
  userEmail: {
    flex: 1,
    marginRight: 10,
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
    borderRadius: 10,
  },
  logoutButton: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    width: 40,
    height: 40,
  },
});

export const createYoutubeWidget = (): WidgetData => {
  return {
    widgetType: 'YoutubeWidget',
    widgetParams: {},
    key: '',
  };
};
