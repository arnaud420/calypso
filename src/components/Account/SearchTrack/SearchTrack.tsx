/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { useState } from 'react';
import { ImageProps, View } from 'react-native';
import {
  Icon, Input, Layout, Text, Divider,
} from '@ui-kitten/components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { DEEZER_URI } from '../../../config';
import TrackList from '../../TrackList';
import { Artist, Track } from '../../../models/UserModel';
import ArtistList from '../../ArtistList';
import { addTrackToTop } from '../../../redux/features/user/userAction';
import { MainLayout } from '../../MainLayout';
import { RootStackParamList, SCREENS } from '../../../routing/Router';
import { RootState } from '../../../redux/store';

interface Results {
  tracks: Array<Track> | null;
  artists: Array<Artist> | null;
}
interface Props {
  navigation: StackNavigationProp<RootStackParamList, SCREENS.ARTIST_SCREEN>
}

const initialDataState = {
  tracks: null,
  artists: null,
};

const filterResults = (data: Array<Track>) => {
  const artists: { [artist: string]: Track[] } = {};
  const results: Results = {
    tracks: [],
    artists: [],
  };

  for (let i = 0; i < data.length; i++) {
    if (artists[data[i].artist.id] === undefined) {
      artists[data[i].artist.id] = [data[i]];
    } else {
      artists[data[i].artist.id].push(data[i]);
    }
  }

  for (const artist in artists) {
    if (artists[artist].length === 1) {
      results.tracks?.push(artists[artist][0]);
    }
    if (artists[artist].length > 1) {
      results.artists?.push(artists[artist][0].artist);
    }
  }

  return results;
};

const SearchTrack: React.FC<Props> = ({ navigation }: Props) => {
  const userState = useSelector((state: RootState) => state.user);
  const [value, setValue] = useState<string>('');
  const [data, setData] = useState<Results>(initialDataState);
  const [resultsLength, setResultsLength] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);

  const search = (value: string) => {
    setValue(value);
    clearTimeout(timer);
    setTimer(window.setTimeout(async () => {
      try {
        const data = await fetch(`${DEEZER_URI}/search?q=${value}`);
        const json = await data.json();
        const results = filterResults(json.data);
        setData(results);
        if (results.tracks && results.artists) {
          setResultsLength(results.tracks.length + results.artists.length);
        }
      } catch (error) {
        console.log('err', error);
        setData(initialDataState);
        setResultsLength(0);
      }
    }, 300));
  };

  const clearInput = () => {
    setValue('');
    setResultsLength(0);
    setData(initialDataState);
  };

  const EraseSearchIcon = (props: Partial<ImageProps>) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon {...props} name={value !== '' ? 'close' : 'search'} />
    </TouchableWithoutFeedback>
  );

  const onItemPress = async (track: Track) => {
    try {
      await addTrackToTop(track);
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <MainLayout isLoading={userState.isLoading}>
      <>
        <Input
          value={value}
          placeholder="Rechercher un titre, artiste ..."
          accessoryRight={(props) => <EraseSearchIcon {...props} />}
          onChangeText={(value) => search(value)}
        />

        {
          resultsLength >= 1
            ? (
              <View style={{ paddingBottom: 30, paddingTop: 15 }}>
                <Text style={{ paddingBottom: 10 }}>
                  {`${resultsLength.toString()} résultat${resultsLength > 1 ? 's' : ''}`}
                </Text>
                <Divider />

                {
                  data.tracks && data.tracks.length >= 1
                    ? (
                      <>
                        <TrackList tracks={data.tracks} onItemPress={onItemPress} />
                        <Divider />
                      </>
                    )
                    : null
                }

                {
                  data.artists && data.artists.length >= 1
                    ? <ArtistList navigation={navigation} artists={data.artists} />
                    : null
                }

              </View>
            )
            : null
        }
      </>
    </MainLayout>
  );
};

export default SearchTrack;
