import React, { useState } from 'react'
import { List } from '@ui-kitten/components'
import { StackNavigationProp } from '@react-navigation/stack'
import { useDispatch } from 'react-redux'
import styles from './ResultsStyles'
import { News } from '../../../../models/NewsModel'
import User from '../../../../models/UserModel'
import { RootStackParamList, SCREENS } from '../../../../routing/Router'
import { setSelectedNewsId } from '../../../../redux/features/news/newsSlice'
import { NewsDetails } from '../../../News/NewsDetails'
import ListItem from './ListItem'
import { setSelectedUser } from '../../../../redux/features/user/userSlice';

type Props = {
  results: (News|User)[],
  navigation: StackNavigationProp<RootStackParamList, SCREENS.SEARCH_SCREEN>,
}

const Results = ({ results, navigation }: Props) => {
  const dispatch = useDispatch()
  const [selectedNews, setSelectedNews] = useState<News|undefined>()

  return (
    <>
      <List
        data={results}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onItemPress={() => {
              if ('title' in item) {
                dispatch(setSelectedNewsId(item.id))
                setSelectedNews(item)
              } else {
                dispatch(setSelectedUser(item))
              }
            }}
          />
        )}
        style={styles.fullWidth}
      />
      <NewsDetails
        defaultNews={selectedNews}
        removeDefaultNews={() => setSelectedNews(undefined)}
      />
    </>
  )
}

export default Results
