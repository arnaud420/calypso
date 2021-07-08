import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  Text, Button, Icon, Layout,
} from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from '../../../redux/store';
import { RootStackParamList, SCREENS } from '../../../routing/Router';
import TrackList from '../../TrackList';
import { orderTrackList } from '../../../redux/features/user/userAction';
import { Track } from '../../../models/UserModel';
import { MainLayout } from '../../MainLayout';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, SCREENS.TOP_SCREEN>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Top = ({ navigation }: Props) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    setTracks(currentUser?.top);
  }, [currentUser]);

  const PlusIcon = (props) => (
    <Icon {...props} name="plus-circle-outline" />
  );

  const orderPlaylist = async ({ data, from, to }:
    { data: Array<Track>, from: number, to: number }) => {
    if (from === to) return null;
    setTracks(data);
    await orderTrackList(data);
  };

  return (
    <MainLayout disableScrollView>
      <View style={{
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 13,
      }}
      >
        <Text>Mon top titre</Text>
        <Button
          appearance="ghost"
          status="info"
          accessoryLeft={PlusIcon}
          onPress={() => navigation.navigate(SCREENS.SEARCH_TRACK_SCREEN)}
        />
      </View>

      <View style={{ flex: 2, paddingBottom: 30 }}>
        <TrackList tracks={tracks} isDraggable orderPlaylist={orderPlaylist} isPlayable={false} />
      </View>

    </MainLayout>
  );
};

export default Top;
