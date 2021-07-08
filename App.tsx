/* eslint-disable react/style-prop-object */
/* eslint-disable camelcase */
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {
  KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux'

import { ApplicationProvider, Layout, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useFonts, Amarante_400Regular } from '@expo-google-fonts/amarante';
import { Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { myTheme } from './custom-theme'

import Firebase from './src/firebase' // Do not delete as it instanciate firebase
import Router from './src/routing/Router';
import store from './src/redux/store'

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Amarante_400Regular,
  });

  if (fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...myTheme }}>
            <Layout style={styles.container}>
              <Provider store={store}>
                <Router />
              </Provider>
              <FlashMessage position="bottom" />
              <StatusBar style="auto" />
            </Layout>
          </ApplicationProvider>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
});
