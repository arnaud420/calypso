import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigationState } from '@react-navigation/native'
import { HeaderBackButton, StackHeaderProps } from '@react-navigation/stack'

import { Icon } from '@ui-kitten/components'
import styles from './RouterStyles'
import { myTheme } from '../../custom-theme'
import Text from '../components/Common/Text'
import { SCREENS } from './Router'

const RouterHeader = ({ navigation }: StackHeaderProps) => {
  const [currentRouteName, setCurrentRouteName] = useState<boolean|string>(false)
  const [isHeaderLeftVisible, setIsHeaderLeftVisible] = useState(false)

  const routes = useNavigationState(state => state.routes)

  useEffect(() => {
    if (routes && routes.length) {
      setCurrentRouteName(routes[routes.length - 1].name)
    }
  }, [routes])

  useEffect(() => {
    if (currentRouteName !== SCREENS.BOTTOM_TAB_NAVIGATOR) {
      setIsHeaderLeftVisible(true)
    } else {
      setIsHeaderLeftVisible(false)
    }
  }, [currentRouteName])

  const _displaySearchIfNeeded = () => {
    if (currentRouteName !== SCREENS.SEARCH_SCREEN) {
      navigation.push(SCREENS.SEARCH_SCREEN)
    }
  }

  return (
    <LinearGradient style={styles.header} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={[myTheme['color-warning-600'], myTheme['color-danger-400']]}>
      {isHeaderLeftVisible
        ? (
          <HeaderBackButton
            onPress={() => navigation.canGoBack() && navigation.goBack()}
            label=" "
            tintColor="#fff"
            style={styles.backBtn}
          />
        ) : <View />}
      <Text
        category="h1"
        style={{
          ...styles.brand,
          marginRight: isHeaderLeftVisible ? -7 : -45,
        }}
      >
        CALYPSO
      </Text>
      <TouchableOpacity onPress={_displaySearchIfNeeded} style={styles.searchBtn}>
        <Icon name="search" style={styles.searchIcon} fill="#fff" />
      </TouchableOpacity>
    </LinearGradient>
  )
}

export default RouterHeader
