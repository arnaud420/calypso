import { Layout, Spinner } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews } from '../../redux/features/news/newsAction'
import { dataLoaded } from '../../redux/features/authentication/authenticationSlice'
import { fetchPosts } from '../../redux/features/post/postAction'
import Text from '../Common/Text'
import { getActivities } from '../../redux/features/activities/activitiesAction'
import { RootState } from '../../redux/store'

const Splash = () => {
  const dispatch = useDispatch()
  const [newsFetched, setNewsFetched] = useState(false)
  const [postsFetched, setPostsFetched] = useState(false)
  const [activitiesFetched, setActivitiesFetched] = useState(false)
  const { isLoading: activitiesLoading } = useSelector((state: RootState) => state.activities)
  const { currentUser } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    fetchNews().then(() => setNewsFetched(true))

    const noUserTimeout = setTimeout(() => {
      if (!currentUser) {
        dispatch(dataLoaded())
      }
    }, 3000)

    if (currentUser) {
      dispatch(fetchPosts())
      setPostsFetched(true)
      dispatch(getActivities())
    }

    return () => clearTimeout(noUserTimeout)
  }, [currentUser])

  useEffect(() => {
    if (newsFetched && postsFetched && activitiesFetched) {
      dispatch(dataLoaded())
    }
  }, [newsFetched, postsFetched, activitiesFetched])

  useEffect(() => {
    if (!activitiesLoading) {
      setActivitiesFetched(true)
    }
  }, [activitiesLoading])

  return (
    <Layout style={{ flex: 1 }}>
      <Image
        source={require('../../../assets/splash.png')}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
      <Text
        style={{
          color: '#fff',
          position: 'absolute',
          bottom: 200,
          width: '100%',
          textAlign: 'center',
        }}
      >
        {'Chargement des données   '}
        <Spinner status="info" />
      </Text>
    </Layout>
  )
}

export default Splash
