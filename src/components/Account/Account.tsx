import React from 'react'
import { useSelector } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootState } from '../../redux/store'
import { BottomTabsParamList, SCREENS } from '../../routing/Router'
import { MainLayout } from '../MainLayout'
import UserInfos from './UserInfos'

type Props = {
  navigation: StackNavigationProp<BottomTabsParamList, SCREENS.ACCOUNT_SCREEN>;
};

const Account = ({ navigation }: Props) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <MainLayout>
      <>
        {currentUser && <UserInfos navigation={navigation} isEdit user={currentUser} />}
      </>
    </MainLayout>
  )
}

export default Account;
