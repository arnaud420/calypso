import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator, TransitionPresets, StackHeaderProps, HeaderBackButton,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Splash from '../components/Splash';
import Signup from '../components/Authentication/Signup';
import Home from '../components/Home';
import Account from '../components/Account';
import Authentication from '../components/Authentication';
import { NewsFeed } from '../components/News/NewsFeed';
import RouterHeader from './RouterHeader';
import { myTheme } from '../../custom-theme';
import Search from '../components/Account/Search';
import TabBarIcon from './TabBarIcon';
import { Top } from '../components/Account/Top';
import { SearchTrack } from '../components/Account/SearchTrack';
import Artist from '../components/Account/Artist/Artist';
import { CreatePost } from '../components/Post/CreatePost';
import { PostsFeed } from '../components/Post/PostsFeed';

export enum SCREENS {
  HOME_SCREEN = 'Home',
  AUTHENTICATION_SCREEN = 'Authentication',
  SIGNUP_SCREEN = 'Signup',
  ACCOUNT_SCREEN = 'Account',
  TOP_SCREEN = 'Top',
  SEARCH_SCREEN = 'Search',
  ARTIST_SCREEN = 'Artist',
  SEARCH_TRACK_SCREEN = 'SearchTrack',
  NEWS_FEED_SCREEN = 'NewsFeed',
  BOTTOM_TAB_NAVIGATOR = 'BottomTabNavigator',
  CREATE_POST_SCREEN = 'CreatePost',
  ACTIVITIES_SCREEN = 'Activities',
}

export type RootStackParamList = {
  // For app root stack navigator
  [SCREENS.AUTHENTICATION_SCREEN]: undefined;
  [SCREENS.SIGNUP_SCREEN]: undefined;
  [SCREENS.BOTTOM_TAB_NAVIGATOR]: undefined;
  [SCREENS.SEARCH_SCREEN]: undefined;
  [SCREENS.ARTIST_SCREEN]: { id: string, name: string };
  [SCREENS.TOP_SCREEN]: undefined;
  [SCREENS.SEARCH_TRACK_SCREEN]: undefined;
};

export type BottomTabsParamList = {
  // For bottom tab navigator
  [SCREENS.HOME_SCREEN]: any;
  [SCREENS.ACTIVITIES_SCREEN]: any;
  [SCREENS.CREATE_POST_SCREEN]: any;
  [SCREENS.NEWS_FEED_SCREEN]: any;
  [SCREENS.ACCOUNT_SCREEN]: any;
}

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{ showLabel: false }}
  >
    <Tab.Screen
      name={SCREENS.HOME_SCREEN}
      component={Home}
      options={{
        tabBarIcon: (props) => <TabBarIcon {...props} name="home-outline" focusedColor={myTheme['color-primary-500']} />,
      }}
    />
    <Tab.Screen
      name={SCREENS.ACTIVITIES_SCREEN}
      component={PostsFeed}
      options={{
        tabBarIcon: (props) => <TabBarIcon {...props} name="people-outline" focusedColor={myTheme['color-success-500']} />,
      }}
    />
    <Tab.Screen
      name={SCREENS.CREATE_POST_SCREEN}
      component={CreatePost}
      options={{
        tabBarIcon: (props) => <TabBarIcon {...props} name="plus-circle-outline" focusedColor={myTheme['color-info-500']} />,
      }}
    />
    <Tab.Screen
      name={SCREENS.NEWS_FEED_SCREEN}
      component={NewsFeed}
      options={{
        tabBarIcon: (props) => <TabBarIcon {...props} name="book-open-outline" focusedColor={myTheme['color-warning-500']} />,
      }}
    />
    <Tab.Screen
      name={SCREENS.ACCOUNT_SCREEN}
      component={Account}
      options={{
        tabBarIcon: (props) => <TabBarIcon {...props} name="person" focusedColor={myTheme['color-danger-500']} />,
      }}
    />
  </Tab.Navigator>
)

const Navigator = () => {
  const { isLoading, currentUser } = useSelector((state: RootState) => state.authentication);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props: StackHeaderProps) => <RouterHeader {...props} />,
      }}
    >
      {currentUser
        // Logged routes
        ? (
          <>
            {/* Use the bottom tab navigator below to add routes within the app */}
            <Stack.Screen name={SCREENS.BOTTOM_TAB_NAVIGATOR} component={BottomTabNavigator} />
            <Stack.Screen name={SCREENS.TOP_SCREEN} component={Top} />
            <Stack.Screen name={SCREENS.SEARCH_TRACK_SCREEN} component={SearchTrack} />
            <Stack.Screen
              name={SCREENS.SEARCH_SCREEN}
              component={Search}
              options={{ ...TransitionPresets.ModalPresentationIOS }}
            />
            <Stack.Screen
              name={SCREENS.ARTIST_SCREEN}
              component={Artist}
              options={{ ...TransitionPresets.ModalPresentationIOS }}
            />
          </>
        )
        // Not logged routes
        : (
          <>
            <Stack.Screen
              name={SCREENS.AUTHENTICATION_SCREEN}
              component={Authentication}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name={SCREENS.SIGNUP_SCREEN}
              component={Signup}
              options={{
                header: () => null,

              }}
            />
          </>
        )}
    </Stack.Navigator>
  );
};

const Router = () => (
  <NavigationContainer>
    <Navigator />
  </NavigationContainer>
);

export default Router;
