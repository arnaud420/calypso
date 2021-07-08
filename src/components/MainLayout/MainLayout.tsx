import { Spinner } from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import {
  KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View,
} from 'react-native';
import styles from './MainLayoutStyles';
import UserInfos from '../Account/UserInfos';
import { Modal } from '../Modal';
import { UserModal } from '../Account/UserModal';

interface Props {
  children: ReactElement | ReactElement[],
  canCancelContentTouches?: boolean,
  isLoading?: Boolean | undefined,
  disableScrollView?: boolean,
}

const MainLayout: React.FC<Props> = (props: Props) => {
  const {
    children, canCancelContentTouches, isLoading, disableScrollView,
  } = props;

  return (
    <SafeAreaView style={styles.safeArea}>
      {
        isLoading
          ? (
            <View style={styles.loader}>
              <Spinner size="small" status="success" />
            </View>
          )
          : null
      }

      {
        disableScrollView
          ? (
            <View style={styles.layout}>
              {children}
            </View>
          )
          : (
            <ScrollView
              style={styles.layout}
              keyboardShouldPersistTaps="handled"
              canCancelContentTouches={canCancelContentTouches !== undefined ? canCancelContentTouches : true}
            >
              {children}
            </ScrollView>
          )
      }

      <UserModal />
    </SafeAreaView>
  );
}

export default MainLayout;
