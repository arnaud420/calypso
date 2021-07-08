import Constants from 'expo-constants';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import { Button, Platform, Text } from 'react-native';
import { logout } from '../../redux/features/authentication/authenticationHelper';
import { BottomTabsParamList, SCREENS } from '../../routing/Router';
import { MainLayout } from '../MainLayout';
import { sendUserToken } from '../../redux/features/user/userAction';
import { PostsFeed } from '../Post/PostsFeed';
import { NewsFeed } from '../News/NewsFeed';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

type Props = {
  navigation: StackNavigationProp<BottomTabsParamList, SCREENS.HOME_SCREEN>;
};

const Home = ({ navigation }: Props) => {
  const logoutPressed = () => {
    logout()
  }

  useEffect(() => {
    registerForPushNotificationsAsync()
  }, []);

  return (
    <NewsFeed />
  );
};

export default Home;

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    sendUserToken(token)
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}
