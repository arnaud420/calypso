import React, { useEffect, useState } from 'react';
import './NewsDetailsStyles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { News } from '../../../models/NewsModel';
import { setSelectedNewsId } from '../../../redux/features/news/newsSlice';
import { FeedItemTop } from '../../Feed/FeedItemTop';
import { FeedItemImage } from '../../Feed/FeedItemImage';
import { FeedItemTitle } from '../../Feed/FeedItemTitle';
import { FeedItemText } from '../../Feed/FeedItemText';
import Modal from '../../Modal/Modal';

interface Props {
  defaultNews?: News,
  removeDefaultNews?: () => void,
}

const NewsDetails: React.FC<Props> = ({ defaultNews, removeDefaultNews }: Props) => {
  const { selectedNewsId, news } = useSelector((state: RootState) => state.newsReducer);
  const [selectedNews, setSelectedNews] = useState<null|undefined|News>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!defaultNews) {
      setSelectedNews(
        selectedNewsId
          ? news.find((n: News) => n.id === selectedNewsId)
          : null,
      );
    } else {
      setSelectedNews(defaultNews);
    }
  }, [selectedNewsId]);

  return (
    <Modal
      isVisible={selectedNews !== null}
      onClose={() => {
        if (removeDefaultNews) {
          removeDefaultNews()
        }
        dispatch(setSelectedNewsId(null))
      }}
    >
      <>
        {selectedNews && (
          <>
            <FeedItemTop title={selectedNews.media} dateInSeconds={selectedNews.publishDate} />
            <FeedItemImage uri={selectedNews.imageUrl} />
            <FeedItemTitle title={selectedNews.title} />
            <FeedItemText text={selectedNews.content} limit={selectedNews.content.length} />
          </>
        )}
      </>
    </Modal>
  );
};

export default NewsDetails;
