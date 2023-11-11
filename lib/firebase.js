import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { useState, useEffect } from "react";

// REPLACE THIS CONFIG WITH YOUR OWN
const configFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAlQnRBo0FOlSBwdr49Oug46sQ_HvjcLmY",
    authDomain: "sandbox-ca178.firebaseapp.com",
    databaseURL: "https://sandbox-ca178-default-rtdb.firebaseio.com",
    projectId: "sandbox-ca178",
    storageBucket: "sandbox-ca178.appspot.com",
    messagingSenderId: "694127892645",
    appId: "1:694127892645:web:d213cffe18349bedaa954c"
  };
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (e) {}
}
configFirebase()

export const useLiveData = (path) => {
  const [data, setData] = useState(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const fbRef = firebase.database().ref(path)
    const updated = (snap) => {
      setData(snap.val())
      setReady(true)
    }
    fbRef.on('value', updated)
    return () => {fbRef.off('value', updated)}
  }, [path])
  return {data, ready}
}

export const loadData = async (path) => {
  const snap = await firebase.database().ref(path).once('value')
  return snap.val()
}

export const saveData = (path, value) => {
  firebase.database().ref(path).set(value)
}

export const multiUpdate = (updates) => {
  firebase.database().ref().update(updates)
}

export const addData = async (path, value) => {
  const ref = firebase.database().ref(path).push()
  await ref.set(value)
  return ref.key
}

export const deleteData = (path) => {
  firebase.database().ref(path).remove()
}

export {firebase}