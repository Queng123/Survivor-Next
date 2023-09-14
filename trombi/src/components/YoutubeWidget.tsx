import React from 'react';

import { Alert, Text, View } from 'react-native';

import {WidgetData} from '../utils/WidgetTypes';
import { WidgetFrame } from './WidgetFrame';
import { GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { getTokens } from '../utils/TokenFunctions';
import { loginAndStoreToken } from '../utils/GoogleLogin';

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
                {token !== '' && (
                    <Text>Token: {token}</Text>
                )}
            </View>
        </WidgetFrame>
    );
}

export const createYoutubeWidget = (): WidgetData => {
    return {
        widgetType: 'YoutubeWidget',
        widgetParams: {},
        key: '',
    };
}
