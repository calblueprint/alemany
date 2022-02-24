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
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import 'firebase/compat/firestore';

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
    treeCollection.doc(ref.id).update({ uuid: ref.id });
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

export const uploadImageAsync = async (uri, uuid) => {
  // const blob = await new Promise((resolve, reject) => {
  //   const xhr = new XMLHttpRequest();

  //   xhr.onload = () => {
  //     resolve(xhr.response);
  //   };
  //   xhr.onerror = () => {
  //     reject(new TypeError('Network request failed'));
  //   };

  //   xhr.responseType = 'blob';
  //   xhr.open('GET', uri, true);
  //   xhr.send(null);
  // });
  const img = await fetch(uri);
  const bytes = await img.blob();

  const fileRef = refStorage(getStorage(), uuid);

  // const result = await uploadBytes(fileRef, bytes);

  // blob.close();
  const uploadTask = uploadBytesResumable(fileRef, bytes);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    'state_changed',
    snapshot => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default:
      }
    },
    error => {
      // this.setState({ isLoading: false });

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          console.log("User doesn't have permission to access the object");
          break;
        case 'storage/canceled':
          console.log('User canceled the upload');
          break;
        case 'storage/unknown':
          console.log('Unknown error occurred, inspect error.serverResponse');
          break;
        default:
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        console.log('File available at', downloadURL);
        // perform your task
      });
    },
  );

  // const imageUrl = await getDownloadURL(result);
  // return imageUrl;
};

export default firebase;
