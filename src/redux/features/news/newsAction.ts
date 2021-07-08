import firebase from '../../../firebase';
import store from '../../store';
import { setNews } from './newsSlice';
import { News } from '../../../models/NewsModel';

export const fetchNews = async () => {
  try {
    const querySnapshot = await firebase
      .db?.collection('news')
      .get();

    const news: News[] = [];

    querySnapshot?.forEach((doc) => {
      const itemData = doc.data();
      const publishDate = itemData.publishDate.seconds;

      news.push({
        ...itemData as News,
        id: doc.id,
        publishDate,
      });
    });

    store.dispatch(setNews(news));
  } catch (e) {
    console.error(`Error while fetching news : ${e}`);
  }
};
