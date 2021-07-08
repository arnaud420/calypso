import React from 'react'
import {
  Button, EvaProp, Layout, withStyles,
} from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import styles from './UserInfosStyles'
import Text from '../../Common/Text';
import ImagePicker from '../../Common/ImagePicker';
import User from '../../../models/UserModel';
import BorderedContainer from '../../Common/BorderedContainer';
import { updateProfilePicture, logout } from '../../../redux/features/authentication/authenticationHelper';
import { RootStackParamList, SCREENS } from '../../../routing/Router';
import TrackList from '../../TrackList';

type Props = {
  user: User,
  eva?: EvaProp,
  isEdit?: boolean,
  navigation?: StackNavigationProp<RootStackParamList, SCREENS.TOP_SCREEN>,
}

const UserInfos = ({
  user, isEdit = false, eva, navigation,
}: Props) => (
  <Layout>
    <View style={eva?.style?.topContainer}>
      <ImagePicker
        eva={eva}
        setImage={(uri) => updateProfilePicture(user, uri)}
        isEditable={isEdit}
        image={user.profilePicture}
      />
      <View style={eva?.style?.topRightContainer}>
        <View style={eva?.style?.identityContainer}>
          <Text category="h6" style={eva?.style?.bold}>{user.firstname}</Text>
          <Text category="h6">{user.lastname}</Text>
        </View>
        <View style={eva?.style?.followStatsContainer}>
          <Text category="c2" appearance="hint">
            {user.followers.length}
            {' '}
            abonnés
          </Text>
          <Text category="c2" appearance="hint">
            {user.followings.length}
            {' '}
            abonnements
          </Text>
        </View>
      </View>
    </View>
    <View style={eva?.style?.descriptionContainer}>
      <Text category="p2">{user.description}</Text>
    </View>
    <View style={eva?.style?.playlistTitleContainer}>
      <Text category="h6" style={{ ...eva?.style?.bold, ...eva?.style?.playlistTitle }}>
        Top titres de
        {' '}
        {user.firstname}
      </Text>
      {isEdit && (
        <TouchableOpacity style={eva?.style?.editBtn}>
          <Text
            onPress={() => navigation?.navigate(SCREENS.TOP_SCREEN)}
            style={eva?.style?.editBtnText}
          >
            Modifier
          </Text>
        </TouchableOpacity>
      )}
    </View>
    <View style={eva?.style?.trackList}>
      <BorderedContainer>
        <TrackList tracks={user.top} />
      </BorderedContainer>
    </View>
    {isEdit && <Button children="Se déconnecter" onPress={logout} style={eva?.style?.logout} status="warning" />}
  </Layout>
)

export default withStyles(UserInfos, styles);
