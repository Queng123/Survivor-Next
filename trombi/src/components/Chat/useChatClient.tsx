import {getCurrentUserInfos} from '../../utils/getCurrentUserInfos';
import {useEffect, useState} from 'react';
import {StreamChat} from 'stream-chat';
import {CHAT_KEY, CHAT_SECRET, ADMIN_API_URL} from '@env';

const getInfos = async () => {
  try {
    const userInformation = await getCurrentUserInfos();
    return userInformation;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchTokenFromServer = async chatUserId => {
  try {
    const url = `${ADMIN_API_URL}/chat/token/${chatUserId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const token = await response.text();
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};
export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);

  useEffect(() => {
    const initializeChat = async () => {
      const userInformation = await getInfos();

      if (userInformation) {
        const api_key = CHAT_KEY;
        const api_secret = CHAT_SECRET;

        const serverClient = StreamChat.getInstance(api_key, api_secret);
        const chatUserId = `${userInformation.name}-${userInformation.surname}`;
        const chatUserToken = await fetchTokenFromServer(chatUserId);
        const chatUserName = `${userInformation.name} ${userInformation.surname}`;
        const user = {id: chatUserId, name: chatUserName};
        try {
          serverClient.connectUser(user, chatUserToken);
          setClientIsReady(true);
        } catch (error) {
          console.error(
            `An error occurred while connecting the user: ${error.message}`,
          );
        }
      }
    };

    initializeChat();
  }, []);

  return {
    clientIsReady,
  };
};
