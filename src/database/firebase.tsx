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
import { Tree, Comment, Additional, Dictionary } from '@types';

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
  try {
    const doc = await treeCollection.doc(id).get();
    return doc.data() as Tree;
  } catch (e) {
    throw e;
    // TODO: Add error handling.
  }
};

/*
 * getAllTrees returns a Dictionary containing all entries in the `trees` table.
 */
export const getAllTrees = async function (): Promise<Dictionary> {
  try {
    const response = await treeCollection.get();
    const trees: Dictionary = {};
    response.docs.map(doc => {
      const tree: Tree = doc.data() as Tree;
      trees[tree.id] = tree;
    });
    return trees;
  } catch (e) {
    throw e;
    // TODO: Add error handling
  }
};

/*
 * setTree creates/updates an entry in the `trees` table given a Tree.
 */
export const setTree = async function (
  tree: Tree,
) {
  try { 
    await treeCollection.doc(tree.id).set({tree});
  } catch (e) {
    throw e;
    // TODO: Add error handling.
  }
};

/*
 * getComment queries the `comments` table and returns a Comment if the ID is found and an empty entry otherwise.
 */
export const getComment = async function (id: string): Promise<Comment> {
  try {
    const doc = await commentCollection.doc(id).get();
    return doc.data() as Comment;
  } catch (e) {
    throw e;
    // TODO: Add error handling.
  }
};

/*
 * setComment creates/updates an entry in the `comments` table given a Comment.
 */
export const setComment = async function (
  comment: Comment,
) {
  try { 
    await commentCollection.doc(comment.id).set({comment});
  } catch (e) {
    throw e;
    // TODO: Add error handling.
  }
};

/*
 * getAdditional queries the `additional` table and returns an Additional if the ID is found and an empty entry otherwise.
 */
export const getAdditional = async function (id: string): Promise<Additional> {
  try {
    const doc = await additionalCollection.doc(id).get();
    return doc.data() as Additional;
  } catch (e) {
    throw e;
    // TODO: Add error handling.
  }
};

/*
 * setAdditional creates/updates an entry in the `additional` table given a Additional.
 */
export const setAdditional = async function (
  additional: Additional,
) {
  try { 
    await additionalCollection.doc(additional.id).set({additional});
  } catch (e) {
    throw e;
    // TODO: Add error handling.
  }
};
export default firebase;
