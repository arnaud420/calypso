import { Activity } from './../models/activity';
import { User } from "../models/users";
const fetch = require('node-fetch');

const saveActivityAndDispatchNotifs = async (admin: any, change: any) => {
  const userOriginal: User = change.before.data();
  const userChanged: User = change.after.data();

  if (userOriginal.top?.length !== userChanged.top?.length) {
    // A song has been added or deleted

    // We are first creating and publishing a new content of type Activity
    const originalUserTopSongsIds: number[]|undefined = userOriginal.top?.map(t => t.id)
    const changedUserTopSongsIds: number[]|undefined = userChanged.top?.map(t => t.id)

    const removedSongs = userOriginal.top?.filter(t => !changedUserTopSongsIds?.includes(t.id)) ?? []
    const addedSongs = userChanged.top?.filter(t => !originalUserTopSongsIds?.includes(t.id)) ?? []

    const activity: Activity = {
      user: userChanged.uid,
      removedSongs: removedSongs,
      addedSongs: addedSongs,
      date: new Date().getTime(),
    }
    admin.firestore().collection('activities').add(activity)
    
    // We are then getting every follower that this user has
    const message: any = {
      title: `Calypso - Nouvelle activité`,
      body: `${userOriginal.firstname} ${userOriginal.lastname} a mis son top 50 à jour !`,
    };
    userChanged.followers.forEach(async (follower) => {
      const firebaseFollower: User = (await admin.firestore().collection('users').doc(follower).get())?.data()
      if (firebaseFollower.token) {
        message.to = firebaseFollower.token
        fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        }).then((response: any) => {
          // Response is a message ID string.
          console.log('Successfully sent message:', response);
        })
        .catch((error: any) => {
          console.log('Error sending message:', error);
        });
      }
    })
  }
}

module.exports = async (admin: any, change: any) => saveActivityAndDispatchNotifs(admin, change);