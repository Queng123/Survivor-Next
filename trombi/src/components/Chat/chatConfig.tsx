import { getCurrentUserInfos } from "../../utils/getCurrentUserInfos";
import { useEffect, useState } from "react";
import { CHAT_KEY, CHAT_SECRET } from '@env';
import { StreamChat } from 'stream-chat';

const getInfos = async () => {
  try {
    const userInformation = await getCurrentUserInfos();
    return userInformation;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const ChatComponent = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [chatValues, setChatValues] = useState<any>(null);

  useEffect(() => {
    const initializeChat = async () => {
      const userInformation = await getInfos();
      setUserInfo(userInformation);

      if (userInformation) {
        const api_key = CHAT_KEY;
        const api_secret = CHAT_SECRET;

        const serverClient = StreamChat.getInstance(api_key, api_secret);
        const chatUserId = `${userInformation.name}-${userInformation.surname}`;
        const chatUserToken = serverClient.createToken(chatUserId);
        const chatUserName = `${userInformation.name} ${userInformation.surname}`;

        setChatValues({ userId: chatUserId, userToken: chatUserToken, userName: chatUserName, apiKey: api_key });
      }
    };

    initializeChat();
  }, []);

  return chatValues;
};
