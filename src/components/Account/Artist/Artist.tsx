import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native';
import {
  Avatar, Button, Card, Icon, Layout, List, ListItem, Spinner, Text,
} from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ModalLayout from '../../ModalLayout';
import { RootStackParamList, SCREENS } from '../../../routing/Router';
import { Album, Artist, Track } from '../../../models/UserModel';
import { addTrackToTop } from '../../../redux/features/user/userAction';
import styles from './ArtistStyles';
import { getAlbums, getArtist } from '../../../helpers/deezer';
import { RootState } from '../../../redux/store';

const maxTracksLength = 5;

type Props = {
  navigation: StackNavigationProp<RootStackParamList, SCREENS.ARTIST_SCREEN>,
  route: RouteProp<RootStackParamList, SCREENS.ARTIST_SCREEN>,
}

export type SoundType = {
  track: Track | null;
  isPlaying: Boolean;
  playbackObject: any;
}

const addNewTrack = async ({ track, artist, album }) => {
  await addTrackToTop({
    ...track,
    artist: { ...artist },
    album: { ...album },
  });
}

const ArtistScreen = ({ navigation, route }: Props) => {
  const pulseIconRef = useRef();
  const userState = useSelector((state: RootState) => state.user);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<Array<Album> | null>(null);
  const [sound, setSound] = useState<SoundType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const artist = await getArtist(route.params.id);
        const albums = await getAlbums(route.params.id, maxTracksLength);
        setIsLoading(false);
        setArtist(artist);
        setAlbums(albums);
      } catch (error) {
        setIsLoading(false);
        setError(error);
        setAlbums(null);
      }
    })();
  }, [route.params])

  useEffect(() => {
    if (pulseIconRef && pulseIconRef.current) {
      pulseIconRef.current.startAnimation();
    }
  }, [])

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
    } else if (!playbackStatus.isPlaying
      || (playbackStatus.didJustFinish && !playbackStatus.isLooping)) {
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
      console.error(e)
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
      console.log('stop play error', error);
    }
  }

  const renderItemHeader = (headerProps, album) => (
    <View
      {...headerProps}
      style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
    >
      <Avatar
        style={{ ...styles.avatar, tintColor: null, }}
        source={{ uri: album.cover }}
      />
      <Text>{album.title}</Text>
    </View>
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
              ref={pulseIconRef}
              animationConfig={{ cycles: Infinity }}
              animation="pulse"
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

  const renderPlusIcon = (props, data) => (
    <Button
      {...props}
      onPress={() => addNewTrack(data)}
      status="info"
      appearance="ghost"
      accessoryLeft={(props) => <Icon {...props} name="plus-circle-outline" />}
    />
  );

  const renderItem = ({ item, index }) => (
    <Card
      style={styles.item}
      status="basic"
      header={headerProps => renderItemHeader(headerProps, item)}
    >
      {
        item.tracks.slice(0, item.trackSliced).map((track: Track) => (
          <ListItem
            key={item.id}
            accessoryLeft={(props) => renderPlayIcon(props, track)}
            accessoryRight={(props) => renderPlusIcon(props, { track, album: item, artist })}
            title={track.title}
          />
        ))
      }
      {
        item.tracks.length > maxTracksLength && item.trackSliced !== item.tracks.length
          ? (
            <Button
              appearance="ghost"
              status="basic"
              onPress={() => {
                const albumsCopy = [...albums] as Album[];
                albumsCopy[index].trackSliced = item.tracks.length;
                setAlbums(albumsCopy);
              }}
            >
              Voir plus
            </Button>
          )
          : null
      }
    </Card>
  );

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <Spinner size="small" status="success" />
      </View>
    );
  }

  return (
    <ModalLayout navigation={navigation} isLoading={userState.isLoading}>
      <Layout style={{ flex: 1 }}>
        {
          error
            ? <Text style={styles.error}>Une erreur s'est produite</Text>
            : (
              <View>
                <Text style={styles.title} category="h6">{route.params.name.toUpperCase()}</Text>
                <List
                  data={albums}
                  renderItem={renderItem}
                />
              </View>
            )
        }
      </Layout>
    </ModalLayout>
  )
}

export default ArtistScreen
