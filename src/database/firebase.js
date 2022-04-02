import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  // eslint-disable-next-line import/no-unresolved
} from '@env';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

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
const userCollection = database.collection('users');
const commentCollection = database.collection('comments');
const additionalCollection = database.collection('additional');

/**
 * checkID validates that this ID exists in the `trees` table.
 */
export const checkID = async uuid => {
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
 * checkPhoneNumber queries the `users` table and returns True if the phone number
 * is a valid id and False otherwise.
 */
export const checkPhoneNumber = async phoneNumber => {
  try {
    const formattedPhoneNumber = phoneNumber.substring(2); // Remove +1
    const doc = await userCollection.doc(formattedPhoneNumber).get();
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
export const getTree = async uuid => {
  try {
    const doc = await treeCollection.doc(uuid).get();
    return doc.data();
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

/**
 * getAllTrees returns an array containing all entries in the `trees` table.
 */
export const getAllTrees = async () => {
  try {
    const response = await treeCollection.get();
    return response.docs.map(doc => doc.data());
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling
  }
};

/**
 * setTree creates/updates an entry in the `trees` table given a Tree.
 */
export const setTree = async tree => {
  try {
    await treeCollection.doc(tree.uuid).set(tree);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const addTree = async tree => {
  try {
    const ref = await treeCollection.add(tree);
    const newId = ref.id;
    treeCollection.doc(newId).update({ uuid: newId });
    return newId;
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

/**
 * same functionality as addTree but for comments:
 * assigns uuid to comment and adds to commentCollection.
 */
export const saveComment = async comment => {
  try {
    const ref = await commentCollection.add(comment);
    commentCollection.doc(ref.id).update({ uuid: ref.id });
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

export const addComment = async (comment, uuid) => {
  try {
    treeCollection
      .doc(uuid)
      .update({ comments: firebase.firestore.FieldValue.arrayUnion(comment) });
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
export const getComment = async uuid => {
  try {
    const doc = await commentCollection.doc(uuid).get();
    return doc.data();
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

/**
 * setComment creates/updates an entry in the `comments` table given a Comment.
 */
export const setComment = async comment => {
  try {
    await commentCollection.doc(comment.uuid).set(comment);
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
export const getAdditional = async uuid => {
  try {
    const doc = await additionalCollection.doc(uuid).get();
    return doc.data();
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};

/**
 * setAdditional creates/updates an entry in the `additional` table given a Additional.
 */
export const setAdditional = async additional => {
  try {
    await additionalCollection.doc(additional.uuid).set(additional);
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
  }
};
export default firebase;
