import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { News } from '../../../models/NewsModel';
import { RootState } from '../../../redux/store';
import { fetchNews } from '../../../redux/features/news/newsAction';
import { MainLayout } from '../../MainLayout';
import { NewsItem } from '../NewsItem';
import { NewsDetails } from '../NewsDetails';
import { Loading } from '../../Common/Loading';

interface Props {}

const NewsFeed: React.FC<Props> = (props: Props) => {
  const { news, isLoading } = useSelector((state: RootState) => state.newsReducer);

  useEffect(() => {
    // TODO: Define when to reload news
    if (!news.length) {
      fetchNews();
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MainLayout>
      <FlatList
        data={news}
        renderItem={({ item }) => <NewsItem news={item} />}
        keyExtractor={(item: News) => item.id}
      />

      <NewsDetails />
    </MainLayout>
  );
};

export default NewsFeed;
