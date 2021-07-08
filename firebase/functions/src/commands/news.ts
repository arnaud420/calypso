import {FIELDS, Media, News} from '../models/news';

const Parser = require('rss-parser');
const {mediasList} = require('../config/news');

const parser = new Parser();

/**
 * Fetch all Medias sources to sync news with Firestore database.
 *
 * @param {any} admin
 * @param {any} response
 * @return {Promise<void>}
 */
const syncNews = async (admin: any, response: any) => {
  const medias: Media[] = Object.values(mediasList);

  try {
    const existingNews = await getExistingNews(admin);
    const fetchedNews = await Promise.all(
        Object.values(medias).map((media: Media) => parser.parseURL(media.rss))
    );
    const batch = admin.firestore().batch();

    medias.forEach((media, index) => {
      fetchedNews[index].items.forEach((item: any) => {
        if (!newsExists(item, media, existingNews)) {
          const data = formatNewsData(item, media, admin);
          batch.set(admin.firestore().collection('news').doc(), data);
        }
      });
    });

    const commitResponse = await batch.commit();

    response.json({
      status: 'success',
      message: `${commitResponse.length} news has been synchronized`,
    });
  } catch (e) {
    response.json({
      status: 'error',
      message: e,
    });
  }
};

/**
 * Get all existing news on Firestore database.
 *
 * @param {any} admin
 * @return {Promise<[]>}
 */
const getExistingNews = async (admin: any) => {
  const news: News[] = [];
  const querySnapshot = await admin.firestore().collection('news').get();

  querySnapshot.forEach((doc: any) => {
    news.push(doc.data());
  });

  return news;
};

/**
 * Check if a news already exists in Firestore database
 *
 * @param {any} news
 * @param {Media} media
 * @param {News[]} existingNews
 *
 * @return {News|undefined}
 */
const newsExists = (news: any, media: Media, existingNews: News[]): News|undefined => (
  existingNews.filter((n) => n.media === media.title).find((n) => (
    n.title === getItemProperty(news, media, FIELDS.TITLE) &&
    n.link === getItemProperty(news, media, FIELDS.LINK)
  ))
);

/**
 * Dynamically get news property value, depending on the config (config/news.ts).
 *
 * @param {any} item
 * @param {Media} media
 * @param {FIELDS} propertyName
 * @return {*}
 */
const getItemProperty = (item: any, media: Media, propertyName: FIELDS) => {
  const itemProperty: string|string[] = media.fields[propertyName];
  let value: string;

  if (Array.isArray(itemProperty)) {
    value = item;

    itemProperty.forEach((prop) => {
      // @ts-ignore
      value = value[prop];
    });
  } else {
    value = item[itemProperty];
  }

  return value;
};

/**
 * Format a fetched news so that they all have the same final format.
 *
 * @param {any} item
 * @param {Media} media
 * @param {any} admin
 * @return {{imageUrl: *, publishDate: Timestamp, link: *, media, title: *, content: *}}
 */
const formatNewsData = (item: any, media: Media, admin: any): News => ({
  media: media.title,
  title: getItemProperty(item, media, FIELDS.TITLE),
  publishDate: admin.firestore.Timestamp.fromMillis(
      Date.parse(getItemProperty(item, media, FIELDS.PUBLISH_DATE))
  ),
  link: getItemProperty(item, media, FIELDS.LINK),
  content: getItemProperty(item, media, FIELDS.CONTENT),
  imageUrl: getItemProperty(item, media, FIELDS.IMAGE_URL),
});

module.exports = async (admin: any, response: Response) => syncNews(admin, response);
