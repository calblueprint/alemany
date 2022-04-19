import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  // eslint-disable-next-line import/no-unresolved
} from '@env';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

if (firebase.apps.length) {
  firebase.app();
} else {
  firebase.initializeApp(config);
}

const database = firebase.firestore();
const treeCollection = database.collection('trees');
const userCollection = database.collection('users');

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

export const deleteTree = async uuid => {
  try {
    await treeCollection.doc(uuid).delete();
  } catch (e) {
    console.warn(e);
    throw e;
    // TODO: Add error handling.
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

/** Adds a tree to the trees collection. */
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

export const uploadImageAsync = async uri => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      // TODO: handle error
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const fileRef = firebase.storage().ref(uuidv4());
  await fileRef.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return fileRef.getDownloadURL();
};

export default firebase;
