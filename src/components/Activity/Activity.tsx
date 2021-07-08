import React, { useEffect } from 'react'
import { EvaProp, withStyles } from '@ui-kitten/components'
import { useSelector } from 'react-redux'
import styles from './ActivityStyles'
import Text from '../Common/Text'
import { RootState } from '../../redux/store'
import ActivityModel from '../../models/ActivityModel'
import { FeedItemTop } from '../Feed/FeedItemTop'
import BorderedContainer from '../Common/BorderedContainer'
import TrackList from '../TrackList'

interface Props {
  eva?: EvaProp;
  activity: ActivityModel;
}

const Activity = ({ eva, activity }: Props) => {
  const { activities } = useSelector((state: RootState) => state.activities)
  useEffect(() => {

  }, [])

  return (
    <>
      <FeedItemTop
        title={`${activity.user!.firstname} ${activity.user!.lastname}`}
        dateInSeconds={activity.date / 1000}
      />
      <BorderedContainer>
        <Text category="p2" children="J'ai mis à jour mon Top 50 !" />
        {activity.removedSongs.map(removedSong => (
          <Text category="c2" style={eva?.style?.removedSong}>
            {removedSong.title} ({removedSong.artist.name})
          </Text>
        ))}
        <TrackList tracks={activity.addedSongs} />
      </BorderedContainer>
    </>
  )
}

export default withStyles(Activity, styles)
