import React, { useEffect, useState } from 'react';
import './PostsFeedStyles';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, RefreshControl } from 'react-native';
import { MainLayout } from '../../MainLayout';
import { fetchPosts } from '../../../redux/features/post/postAction';
import { RootState } from '../../../redux/store';
import { Loading } from '../../Common/Loading';
import { Post } from '../../../models/PostModel';
import { PostItem } from '../PostItem';
import { getActivities } from '../../../redux/features/activities/activitiesAction';
import ActivityModel from '../../../models/ActivityModel';
import Activity from '../../Activity';

const PostsFeed: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { isLoading: postsAreLoading, posts, allowScroll } = useSelector((state: RootState) => state.postReducer);
  const { isLoading: activitiesAreLoading, activities } = useSelector((state: RootState) => state.activities);
  const [items, setItems] = useState<(ActivityModel|Post)[]>([])
  const [itemsLoaded, setItemsLoaded] = useState(false)
  const dispatch = useDispatch();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchPosts());
    dispatch(getActivities());
  }, []);

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts());
    }
    if (!activities.length) {
      dispatch(getActivities());
    }
  }, [])

  useEffect(() => {
    if (!postsAreLoading && !activitiesAreLoading) {
      const itemsToPush = [...posts, ...activities].sort((a, b) => {
        const aPublishDate = 'content' in a ? (a.publishDate as number) * 1000 : a.date
        const bPublishDate = 'content' in b ? (b.publishDate as number) * 1000 : b.date

        return bPublishDate - aPublishDate
      })
      setItems(itemsToPush)
      setItemsLoaded(true)
      setRefreshing(false)
    }
  }, [postsAreLoading, activitiesAreLoading, posts, activities])

  if (!items.length) {
    return <Loading />;
  }

  return (
    <MainLayout canCancelContentTouches={allowScroll} disableScrollView>
      {items.length ? (
        <FlatList
          keyboardShouldPersistTaps="handled"
          canCancelContentTouches={allowScroll}
          data={items}
          renderItem={({ item }) => {
            if ('content' in item) {
              return <PostItem post={item} />
            }
            return <Activity activity={item} />
          }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      ) : <></>}
    </MainLayout>
  )
}

export default PostsFeed;
