/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { createAsyncThunk } from '@reduxjs/toolkit';
import firebase from '../../../firebase';
import store from '../../store';
import Activity, { FirestoreActivity } from '../../../models/ActivityModel';
import User from '../../../models/UserModel';

export const getActivities = createAsyncThunk(
  'activities/getActivities',
  async (): Promise<Activity[]> => {
    const { currentUser } = store.getState().authentication

    if (currentUser) {
      try {
        if (currentUser.followings.length) {
          const activities: Activity[] = []
          const firestoreActivities: FirestoreActivity[] = []
          const userIds: string[] = []
          const userPromises: Promise<User>[] = []

          const snapshots = await firebase
            .db?.collection('activities')
            .where('user', 'in', currentUser.followings)
            .get()

          if (snapshots && snapshots.size > 0) {
            snapshots.forEach(snapshot => {
              const firestoreActivity = snapshot.data() as FirestoreActivity
              const activity: Activity = {
                removedSongs: firestoreActivity.removedSongs,
                addedSongs: firestoreActivity.addedSongs,
                date: firestoreActivity.date,
              }

              if (!userIds.includes(firestoreActivity.user)) {
                // We are setting an array of Promise because we don't want to fetch
                // twice the same user
                userPromises.push(new Promise((resolve) => {
                  firebase
                    .db?.doc(`/users/${firestoreActivity.user}`)
                    .get()
                    .then(snapshot => {
                      if (snapshot.exists) {
                        resolve(snapshot.data() as User)
                      }
                    })
                }))
                userIds.push(firestoreActivity.user)
              }

              // No user in the activity for now
              activities.push(activity)
              // User id in it
              firestoreActivities.push(firestoreActivity)
            })

            // Fetching the users and assigning them to the related activity
            const users = await Promise.all(userPromises)
            if (users.length) {
              for (const index in activities) {
                // Here firestoreActivities = activities except that
                // the activity doesn't contain any user
                activities[index].user = users.find(u => u.uid === firestoreActivities[index].user)
              }
            }
          }

          return activities
        }
      } catch (e) {
        console.error(e)
      }

      return []
    }

    return []
  },
)
