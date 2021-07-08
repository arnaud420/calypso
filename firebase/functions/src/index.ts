const functions = require('firebase-functions');
const admin = require('firebase-admin');
const escapeHtml = require('escape-html');
const news = require('./commands/news');
const posts = require('./commands/posts');
const activity = require('./commands/activity');

const serviceAccount = require('./../credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.getNews = functions.https.onRequest((request: any, response: any) => {
  return news(admin, response);
});

exports.getPosts = functions.https.onRequest((request: any, response: any) => {
  const userId = escapeHtml(request.query.userId || request.body.userId || '')
  return posts(admin, response, userId);
})

exports.watchActivity = functions.firestore
  .document('users/{userId}')
  .onUpdate((change: any) => activity(admin, change))
