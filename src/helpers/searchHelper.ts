/* eslint-disable no-restricted-syntax */
import { News } from '../models/NewsModel';
import firebase from '../firebase';
import User from '../models/UserModel';

export const searchNewsAndUsers = async (text: string) => {
  const results: (News|User)[] = []

  const firebaseNewsResults = await firebase
    .db?.collection('news')
    .where('title', '>=', text)
    .get()
  if (firebaseNewsResults && firebaseNewsResults.size > 0) {
    for (const doc of firebaseNewsResults.docs) {
      const news: News = ({ id: doc.id, ...doc.data() } as News)
      results.push(news)
    }
  }

  const firebaseUsersFirstnameResults = await firebase
    .db?.collection('users')
    .where('firstname', '>=', text)
    .get()
  if (firebaseUsersFirstnameResults && firebaseUsersFirstnameResults.size > 0) {
    for (const doc of firebaseUsersFirstnameResults.docs) {
      const user: User = ({ uid: doc.id, ...doc.data() } as User)
      results.push(user)
    }
  }

  const firebaseUsersLastnameResults = await firebase
    .db?.collection('users')
    .where('lastname', '>=', text)
    .get()
  if (firebaseUsersLastnameResults && firebaseUsersLastnameResults.size > 0) {
    for (const doc of firebaseUsersLastnameResults.docs) {
      const user: User = ({ uid: doc.id, ...doc.data() } as User)
      results.push(user)
    }
  }

  const resultsFiltered: (News|User)[] = []
  results.forEach((re) => {
    const alreadyExists = resultsFiltered.findIndex(val => {
      if ('title' in val && 'title' in re) {
        if (val.title === re.title) {
          return true
        }
      } else if ('email' in val && 'email' in re) {
        if (val.email === re.email) {
          return true
        }
      }

      return false
    })
    if (alreadyExists === -1) {
      resultsFiltered.push(re)
    }
  })

  return resultsFiltered
}
