/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { View, ImageProps } from 'react-native'
import {
  Icon, Input, Spinner, Tab, TabBar,
} from '@ui-kitten/components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import ModalLayout from '../../ModalLayout';
import { RootStackParamList, SCREENS } from '../../../routing/Router';
import styles from './SearchStyles'
import { useSearch } from '../hooks/SearchHook';
import Text from '../../Common/Text';
import Results from './Results';
import { myTheme } from '../../../../custom-theme'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, SCREENS.SEARCH_SCREEN>
}

const useTabBarState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

const SearchTabBar = ({ onChange }: { onChange: (tabSelected: string) => void }) => {
  const tabBarState = useTabBarState();

  return (
    <>
      <TabBar
        {...tabBarState}
        style={{ width: '100%' }}
        onSelect={index => {
          onChange(index === 0 ? 'news' : 'users')
          tabBarState.onSelect(index)
        }}
        indicatorStyle={{ backgroundColor: myTheme['color-info-500'] }}
      >
        <Tab icon={(props) => (
          <Icon
            {...props}
            name="book-open-outline"
            style={[styles.tabIcon, {
              tintColor: tabBarState.selectedIndex === 0 ? myTheme['color-info-500'] : props?.style.tintColor,
            }]}
          />
        )}
        />
        <Tab icon={(props) => (
          <Icon
            {...props}
            name="person-outline"
            style={[styles.tabIcon, {
              tintColor: tabBarState.selectedIndex === 1 ? myTheme['color-info-500'] : props?.style.tintColor,
            }]}
          />
        )}
        />
      </TabBar>

    </>
  );
};

const Search = ({ navigation }: Props) => {
  const [value, setValue] = useState('');
  const [resultsVisible, setResultsVisible] = useState('news');
  const { search, isLoading: loading, results } = useSearch();

  const clearInput = () => {
    setValue('');
    search(null)
  };

  const EraseSearchIcon = (props: Partial<ImageProps>) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon {...props} name={value !== '' ? 'close' : 'search'} />
    </TouchableWithoutFeedback>
  );

  return (
    <ModalLayout navigation={navigation}>
      <Input
        value={value}
        placeholder="Rechercher une news, un utilisateur, ..."
        accessoryRight={(props) => <EraseSearchIcon {...props} />}
        onChangeText={(text) => {
          setValue(text)
          search(text)
        }}
      />
      <SearchTabBar onChange={(tabSelected) => setResultsVisible(tabSelected)} />
      <View style={styles.container}>
        {loading && <Spinner status="success" />}
        {results !== null && results.length === 0 && <Text children="Aucun résultat" />}
        {results !== null && results.length
          ? (
            <>
              {resultsVisible === 'news'
                ? <Results results={results.filter(r => 'title' in r)} navigation={navigation} />
                : <Results results={results.filter(r => 'firstname' in r)} navigation={navigation} />}
            </>
          )
          : null}
      </View>
    </ModalLayout>
  )
}

export default Search
