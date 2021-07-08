import React, { useEffect, useState } from 'react';
import {
  Button, Icon, ListItem, Avatar, List,
} from '@ui-kitten/components';
import { Audio, AVPlaybackStatus } from 'expo-av';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Alert } from 'react-native';
import { Track } from '../../models/UserModel';
import { removeTrack } from '../../redux/features/user/userAction';
import { SoundType } from '../Account/Artist/Artist';

type Props = {
  tracks: Array<Track> | null;
  isDraggable?: boolean;
  orderPlaylist?: any;
  onItemPress?: any;
  isPlayable?: boolean;
};

const TrackList = ({
  tracks, isDraggable, orderPlaylist, onItemPress, isPlayable = true,
}: Props) => {
  const [sound, setSound] = useState<SoundType | null>(null);

  useEffect(() => () => {
    if (sound) {
      stopPlay(true);
    }
  }, [sound])

  const _onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
        console.error(`Encountered a fatal error during playback: ${playbackStatus.error}`);
      }
    } else if (playbackStatus.didJustFinish) {
      stopPlay();
    }
  };

  const playAudio = async (track: Track) => {
    try {
      if (sound !== null) {
        await stopPlay();
      }

      const { sound: playbackObject } = await Audio.Sound.createAsync({ uri: track.preview }, {
        shouldPlay: true,
        volume: 1,
      });

      playbackObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate)
      setSound({
        track,
        isPlaying: true,
        playbackObject,
      });
    } catch (e) {
      console.error('playAudio: error', e)
    }
  }

  const stopPlay = async (isUnmonted: boolean = false) => {
    try {
      if (!isUnmonted) {
        setSound(null);
      }
      await sound?.playbackObject.pauseAsync();
      await sound?.playbackObject.unloadAsync();
    } catch (error) {
      console.log('stopPlay: error', error);
    }
  }

  const DeleteAlert = (track: Track) => {
    Alert.alert(
      'Confirmation de suppression',
      'Voulez-vous vraiment retirer cette musique de votre playlist ?',
      [
        {
          text: 'Annuler',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Confirmer',
          onPress: async () => {
            await removeTrack(track);
          },
        },
      ],
      { cancelable: false },
    );
  };

  const RenderIcon = (props, name) => (
    <Icon {...props} name={name} />
  );

  const renderItemImg = (props: any, item: Track) => (
    <Avatar
      {...props}
      style={[props.style, { tintColor: null }]}
      source={{ uri: item.album.cover }}
    />
  );

  const renderDragableIcon = (props: any, track: Track, drag: DragEvent) => (
    <>
      <Button
        style={{ ...props.style }}
        appearance="ghost"
        onLongPress={drag}
        delayLongPress={100}
        accessoryLeft={(props) => RenderIcon(props, 'move-outline')}
      />
      <Button
        {...props}
        onPress={() => DeleteAlert(track)}
        appearance="ghost"
        status="info"
        accessoryLeft={(props) => RenderIcon(props, 'trash-2-outline')}
      />
    </>
  );

  const renderPlayIcon = (props, track) => {
    if (sound && sound.track && sound.track.id === track.id) {
      return (
        <Button
          style={{ ...props.style, backgroundColor: 'transparent' }}
          appearance="ghost"
          accessoryLeft={(props) => (
            <Icon
              {...props}
              name="stop-circle-outline"
              onPress={() => stopPlay()}
            />
          )}
        />
      )
    }
    return (
      <Button
        style={{ ...props.style, backgroundColor: 'transparent' }}
        appearance="ghost"
        accessoryLeft={(props) => (
          <Icon
            {...props}
            name="play-circle-outline"
            onPress={() => playAudio(track)}
          />
        )}
      />
    )
  };

  const renderItemRight = (props: any, track: Track) => (
    <>
      {
        onItemPress
          ? (
            <Button
              {...props}
              onPress={onItemPress ? () => onItemPress(track) : undefined}
              appearance="ghost"
              status="info"
              accessoryLeft={(props) => RenderIcon(props, 'plus-circle-outline')}
            />
          )
          : null
      }
      {
        isPlayable
          ? renderPlayIcon(props, track)
          : null
      }
    </>
  )

  const renderItem = ({ item, index }: { item: Track, index: number }) => (
    <ListItem
      key={item.id}
      title={item.title}
      description={item.artist.name}
      accessoryLeft={(props) => renderItemImg(props, item)}
      accessoryRight={
        isPlayable || onItemPress
          ? (props) => renderItemRight(props, item)
          : undefined
      }
    />
  );

  const renderItemDraggable = ({ item, drag }: { item: Track, drag: DragEvent }) => (
    <ListItem
      title={item.title}
      description={item.artist.name}
      accessoryLeft={(props) => renderItemImg(props, item)}
      accessoryRight={(props) => renderDragableIcon(props, item, drag)}
    />
  );

  if (!tracks || tracks === null || tracks.length <= 0) return null;

  return (
    <>
      {
        !isDraggable
          ? (
            <List
              keyboardShouldPersistTaps="handled"
              data={tracks}
              renderItem={renderItem}
            />
          )
          : (
            <DraggableFlatList
              keyboardShouldPersistTaps="handled"
              data={tracks}
              renderItem={renderItemDraggable}
              keyExtractor={(item) => `draggable-item-${item.id}`}
              onDragEnd={(params) => orderPlaylist(params)}
            />
          )
      }
    </>
  );
};

export default TrackList;
