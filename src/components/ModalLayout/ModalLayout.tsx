import React, { ReactElement } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Icon, Layout, Spinner } from '@ui-kitten/components'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList, SCREENS } from '../../routing/Router'
import styles from './ModalLayoutStyles'

type Props = {
  children?: ReactElement | ReactElement[],
  navigation: StackNavigationProp<RootStackParamList, SCREENS.SEARCH_SCREEN>,
  isLoading: Boolean | undefined,
}

const ModalLayout = ({ children, navigation, isLoading }: Props) => {
  const _closeScreen = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }

  return (
    <Layout style={styles.f1}>
      <View style={styles.closeContainer}>
        <View />
        <TouchableOpacity
          style={styles.closeBar}
          onPress={_closeScreen}
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={_closeScreen}
        >
          <Icon name="close-outline" fill="#666666" style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      {
        isLoading
          ? (
            <View style={styles.loader}>
              <Spinner size="small" status="success" />
            </View>
          )
          : null
      }
      <ScrollView style={styles.childrenContainer} contentContainerStyle={styles.childrenContainer}>
        {children}
      </ScrollView>
    </Layout>
  )
}

export default ModalLayout
