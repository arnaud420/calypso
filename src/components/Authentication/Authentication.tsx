import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Layout, Button, withStyles } from '@ui-kitten/components';
import { Image } from 'react-native';

import { RootStackParamList, SCREENS } from '../../routing/Router';
import Signin from './Signin';
import FadeInView from '../Common/FadeInView';
import styles from './AuthenticationStyles';
import Text from '../Common/Text';

type ProfileScreenNavigationProp
  = StackNavigationProp<RootStackParamList, SCREENS.AUTHENTICATION_SCREEN>;

type Props = {
  navigation: ProfileScreenNavigationProp,
  eva: any
};

const logo = require('../../../assets/logo.png');

const Authentication = ({ navigation, eva }: Props) => (
  <Layout style={eva.style.layout}>
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[eva.theme['color-warning-600'], eva.theme['color-danger-400']]} style={eva.style.gradientContainer}>
      <FadeInView style={eva.style.topPart} fadeInDuration={900}>
        <Image source={logo} style={eva.style.logo} />
        <Text category="h1" style={eva.style.brand}>CALYPSO</Text>
      </FadeInView>
      <FadeInView style={eva.style.bottomPart} fadeInDuration={1800}>
        <Signin eva={eva} />
        <Button style={eva.style.btn} onPress={() => navigation.navigate(SCREENS.SIGNUP_SCREEN)}>
          {evaProps => <Text {...evaProps} children="S'inscrire" />}
        </Button>
      </FadeInView>
    </LinearGradient>
  </Layout>
)

export default withStyles(Authentication, styles);
