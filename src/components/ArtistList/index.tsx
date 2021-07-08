import React from 'react';
import {
  ListItem, List, Avatar,
} from '@ui-kitten/components';
import { Artist } from '../../models/UserModel';
import { RootStackParamList, SCREENS } from '../../routing/Router';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  artists: Array<Artist> | null;
  onItemPress?: any;
};
const ArtistList = ({ artists, onItemPress, navigation }: Props) => {
  const renderItemImg = (props: any, item: Artist) => (
    <Avatar
      {...props}
      style={[props.style, { tintColor: null }]}
      source={{ uri: item.picture }}
    />
  );

  const renderItem = ({ item, index }: { item: Artist, index: number }) => (
    <ListItem
      title={item.name}
      accessoryLeft={(props) => renderItemImg(props, item)}
      onPress={() => navigation.navigate(SCREENS.ARTIST_SCREEN, { id: item.id, name: item.name })}
    // accessoryRight={InstallButton}
    />
  );

  if (artists === null) return null;

  return (
    <List
      data={artists}
      renderItem={renderItem}
    />
  );
}

export default ArtistList;
