export interface News {
  media: string;
  title: string;
  publishDate: string;
  link: string;
  content: string;
  imageUrl: string;
}

export enum FIELDS {
  TITLE = 'title',
  PUBLISH_DATE = 'publishDate',
  LINK = 'link',
  CONTENT = 'content',
  IMAGE_URL = 'imageUrl',
}

export interface MediaFields {
  [FIELDS.TITLE]: string;
  [FIELDS.PUBLISH_DATE]: string;
  [FIELDS.LINK]: string;
  [FIELDS.CONTENT]: string;
  [FIELDS.IMAGE_URL]: string|string[],
}

export interface Media {
  rss: string;
  title: string;
  fields: MediaFields;
}

export interface Medias {
  [key: string]: Media;
}
