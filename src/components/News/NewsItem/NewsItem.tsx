import React from 'react';
import { withStyles } from '@ui-kitten/components';
import { TouchableHighlight } from 'react-native';
import { useDispatch } from 'react-redux';
import { News } from '../../../models/NewsModel';
import styles from './NewsItemStyles';
import { FeedItemImage } from '../../Feed/FeedItemImage';
import { FeedItemTop } from '../../Feed/FeedItemTop';
import { FeedItemTitle } from '../../Feed/FeedItemTitle';
import { FeedItemText } from '../../Feed/FeedItemText';
import { setSelectedNewsId } from '../../../redux/features/news/newsSlice';

interface Props {
  news: News;
  eva?: any;
}

const NewsItem: React.FC<Props> = ({ news, eva }: Props) => {
  const dispatch = useDispatch();

  return (
    <TouchableHighlight
      style={eva.style.container}
      onPress={() => dispatch(setSelectedNewsId(news.id))}
      underlayColor="white"
    >
      <>
        <FeedItemTop title={news.media} dateInSeconds={news.publishDate} />
        <FeedItemImage uri={news.imageUrl} />
        <FeedItemTitle title={news.title} />
        <FeedItemText text={news.content} />
      </>
    </TouchableHighlight>
  );
};

export default withStyles(NewsItem, styles);
