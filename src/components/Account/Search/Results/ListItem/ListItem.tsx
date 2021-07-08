import React, { useEffect, useState } from 'react'
import {
  Button, Divider, Icon, ListItem as UIKittenListItem,
} from '@ui-kitten/components'
import { Image, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { News } from '../../../../../models/NewsModel'
import User from '../../../../../models/UserModel'
import { RootState } from '../../../../../redux/store'
import Text from '../../../../Common/Text'
import styles from './ListItemStyles'
import { toggleFollow } from '../../../../../redux/features/user/userAction'

const ListItem = ({ item, onItemPress }: { item: News|User, onItemPress: () => void }) => {
  const { currentUser } = useSelector((state: RootState) => state.user)
  const [isFollowed, setIsFollowed] = useState(false)
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUser && 'email' in item && (currentUser.followings.includes(item.uid) || item.uid === currentUser.uid)) {
      setIsFollowed(true)
    } else {
      setIsFollowed(false)
    }
    setTitle('title' in item ? item.title : `${item.firstname} ${item.lastname}`)
  }, [currentUser, item])

  const Description = ({ item }: { item: News|User }) => {
    if ('title' in item) {
      return (
        <Text children={item.media} status="success" category="c2" style={styles.newsDescription} />
      )
    }

    return null
  }

  const ResultImage = ({ item }: { item: News|User }) => (
    <Image source={{ uri: 'title' in item ? item.imageUrl : item.profilePicture }} style={'title' in item ? styles.newsImage : styles.userImage} />
  )

  return (
    <View>
      <UIKittenListItem
        title={title}
        onPress={onItemPress}
        description={() => <Description item={item} />}
        accessoryLeft={() => <ResultImage item={item} />}
        accessoryRight={() => {
          if (currentUser && 'email' in item && item.uid !== currentUser?.uid) {
            return (
              <Button
                appearance="ghost"
                status="info"
                accessoryRight={(props) => (
                  <Icon
                    {...props}
                    name={isFollowed ? 'checkmark-circle-2' : 'plus-circle'}
                  />
                )}
                onPress={() => {
                  dispatch(toggleFollow({
                    follow: !isFollowed,
                    currentUser,
                    target: item,
                  }))
                }}
              />
            )
          }

          return <></>
        }}
      />
      <Divider />
    </View>
  )
}

export default ListItem
