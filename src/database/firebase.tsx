import firebase from 'firebase';
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from 'react-native-dotenv';
import 'firebase/firestore';

import { Tree, Comment, Additional } from '@types';

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

/**
 * checkID validates that this ID exists in the `trees` table.
 */
export const checkID = async (id: string): Promise<boolean> => {
  try {
    const doc = await treeCollection.doc(id).get();
    return doc.exists;
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

/**
 * getTree queries the `trees` table and returns a Tree if the ID is found
 * and an empty entry otherwise.
 */
export const getTree = async (id: string): Promise<Tree> => {
  try {
    const doc = await treeCollection.doc(id).get();
    return doc.data() as Tree;
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

/**
 * getAllTrees returns a Dictionary containing all entries in the `trees` table.
 */
export const getAllTrees = async (): Promise<Tree[]> => {
  try {
    const response = await treeCollection.get();
    return response.docs.map(doc => doc.data() as Tree);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling
  }
};

/**
 * setTree creates/updates an entry in the `trees` table given a Tree.
 */
export const setTree = async (tree: Tree) => {
  try {
    await treeCollection.doc(tree.id).set({ tree });
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

/**
 * getComment queries the `comments` table and
 * returns a Comment if the ID is found and an empty entry otherwise.
 */
export const getComment = async (id: string): Promise<Comment> => {
  try {
    const doc = await commentCollection.doc(id).get();
    return doc.data() as Comment;
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

/**
 * setComment creates/updates an entry in the `comments` table given a Comment.
 */
export const setComment = async (comment: Comment) => {
  try {
    await commentCollection.doc(comment.id).set({ comment });
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

/**
 * getAdditional queries the `additional` table and
 * returns an Additional if the ID is found and an empty entry otherwise.
 */
export const getAdditional = async (id: string): Promise<Additional> => {
  try {
    const doc = await additionalCollection.doc(id).get();
    return doc.data() as Additional;
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

/**
 * setAdditional creates/updates an entry in the `additional` table given a Additional.
 */
export const setAdditional = async (additional: Additional) => {
  try {
    await additionalCollection.doc(additional.id).set({ additional });
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};
export default firebase;
