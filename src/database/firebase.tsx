import firebase from 'firebase';
import 'firebase/firestore';
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from '@env';
import { Tree, Comment, Additional, Dictionary } from '../../types';

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

const database = firebase.firestore();
const treeCollection = database.collection('trees');
const commentCollection = database.collection('comments');
const additionalCollection = database.collection('additional');

/*
 * checkID validates that this ID exists in the `trees` table.
 */
export const checkID = async function (id: string): Promise<boolean> {
  await treeCollection
    .doc(id)
    .get()
    .then(doc => {
      return doc.exists;
    })
    .catch(error => {
      console.log('Error getting document:', error);
    });
  return false;
};

/*
 * getTree queries the `trees` table and returns a Tree if the ID is found and an empty entry otherwise.
 */
export const getTree = async function (id: string): Promise<Tree> {
  await treeCollection
    .doc(id)
    .get()
    .then(doc => {
      return doc.data() as Tree;
    })
    .catch(error => {
      console.log('Error getting document:', error);
    });
  return { id: '' } as Tree;
};

/*
 * getAllTrees returns a Dictionary containing all entries in the `trees` table.
 */
export const getAllTrees = async function (): Promise<Dictionary> {
  const response = await treeCollection.get();
  const trees: Dictionary = {};
  response.docs.map(doc => {
    const tree: Tree = doc.data() as Tree;
    trees[tree.id] = tree;
  });
  return trees;
};

/*
 * setTree creates/updates an entry in the `trees` table given a Tree.
 */
export const setTree = async function (
  id: string,
  tree: Tree,
): Promise<boolean> {
  await treeCollection
    .doc(id)
    .set({ tree })
    .then(() => {
      return true;
    })
    .catch(error => {
      console.error('Error writing document: ', error);
    });
  return false;
};

/*
 * getComment queries the `comments` table and returns a Comment if the ID is found and an empty entry otherwise.
 */
export const getComment = async function (id: string): Promise<Comment> {
  await commentCollection
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data() as Comment;
      }
    })
    .catch(error => {
      console.log('Error getting document:', error);
    });
  return {} as Comment;
};

/*
 * setComment creates/updates an entry in the `comments` table given a Comment.
 */
export const setComment = async function (
  id: string,
  comment: Comment,
): Promise<boolean> {
  await commentCollection
    .doc(id)
    .set({ comment })
    .then(() => {
      return true;
    })
    .catch(error => {
      console.error('Error writing document: ', error);
    });
  return false;
};

/*
 * getAdditional queries the `additional` table and returns an Additional if the ID is found and an empty entry otherwise.
 */
export const getAdditional = async function (id: string): Promise<Additional> {
  await additionalCollection
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data() as Additional;
      }
    })
    .catch(error => {
      console.log('Error getting document:', error);
    });
  return {} as Additional;
};

/*
 * setAdditional creates/updates an entry in the `additional` table given a Additional.
 */
export const setAdditional = async function (
  id: string,
  additional: Additional,
): Promise<boolean> {
  await additionalCollection
    .doc(id)
    .set({ additional })
    .then(() => {
      return true;
    })
    .catch(error => {
      console.error('Error writing document: ', error);
    });
  return false;
};

export default firebase;
