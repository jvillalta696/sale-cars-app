import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { app } from '../firebase/firebase.js';

const db = getFirestore(app);
export const getById = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap;
};

export const getReference = (reference) => {
  return getDoc(reference);
};

export const update = async (collectionName, data, id) => {
  const newDocRef = doc(db, collectionName, id);
  await updateDoc(newDocRef, data);
};

export const insert = async (collectionName, data, id) => {
  const newDocRef = doc(db, collectionName, id);
  await setDoc(newDocRef, data);
};

export const remove = async (collectionName, id) => {
  const deleteDocRef = doc(db, collectionName, id);
  await deleteDoc(deleteDocRef);
};
