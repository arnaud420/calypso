import {Medias} from '../models/news';

const MEDIAS: Medias = {
  INROCKS: {
    rss: 'https://www.lesinrocks.com/musique/feed/',
    title: 'Les Inrocks',
    fields: {
      title: 'title',
      publishDate: 'pubDate',
      link: 'link',
      content: 'content:encodedSnippet',
      imageUrl: ['enclosure', 'url'],
    },
  },
  RFI: {
    rss: 'https://musique.rfi.fr/actu-musique/rss',
    title: 'Musique RFI',
    fields: {
      title: 'title',
      publishDate: 'pubDate',
      link: 'link',
      content: 'contentSnippet',
      imageUrl: ['enclosure', 'url'],
    },
  },
};

module.exports.mediasList = MEDIAS;
