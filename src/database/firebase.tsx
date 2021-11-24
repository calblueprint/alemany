import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  // eslint-disable-next-line import/no-unresolved
} from '@env';
import firebase from 'firebase';

import 'firebase/firestore';
import { Tree, Comment, Additional } from '@types';

export const config = {
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
export const checkID = async (uuid: string): Promise<boolean> => {
  try {
    const doc = await treeCollection.doc(uuid).get();
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
export const getTree = async (uuid: string): Promise<Tree> => {
  try {
    const doc = await treeCollection.doc(uuid).get();
    return doc.data() as Tree;
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

/**
 * getAllTrees returns an array containing all entries in the `trees` table.
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
    await treeCollection.doc(tree.uuid).set(tree);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const addTree = async (tree: Tree) => {
  try {
    const ref = await treeCollection.add(tree);
    treeCollection.doc(ref.id).update({ uuid: ref.id });
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const saveComment = async (comment: Comment) => {
  try {
    const ref = await commentCollection.add(comment);
    commentCollection.doc(ref.id).update({ uuid: ref.id });
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const addComment = async (comment: Comment, uuid: string) => {
  try {
    // setTree({ ...entry, comments: [...(entry.comments ?? []), comment] });
    // 1. Fetch current data for tree id
    // 2. assign that data to a ref
    const ref = await treeCollection.doc(uuid).get();
    // 3. create a new Comment array with new comment appended to old comments from that data
    // 4. line 90:
    treeCollection
      .doc(uuid)
      .update({ comments: [...(ref.data().comments ?? []), comment] });
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
export const getComment = async (uuid: string): Promise<Comment> => {
  try {
    const doc = await commentCollection.doc(uuid).get();
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
// export const setComment = async (comment: Comment) => {
//   try {
//     await commentCollection.doc(comment.uuid).set(comment);
//   } catch (e) {
//     console.warn(e);
//     throw e;
//     // TODO: Add error handling.
//   }
// };

/**
 * getAdditional queries the `additional` table and
 * returns an Additional if the ID is found and an empty entry otherwise.
 */
export const getAdditional = async (uuid: string): Promise<Additional> => {
  try {
    const doc = await additionalCollection.doc(uuid).get();
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
    await additionalCollection.doc(additional.uuid).set(additional);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};
export default firebase;
