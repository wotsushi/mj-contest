import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

export type Doc<T> =
  T extends (infer S)[] ? Record<number, Doc<S>>
  : T extends object ?
    {
      [K in keyof T]: Doc<T[K]>;
    }
  : T;

export const useDoc = <T>(id: string) => {
  const [state, setter] = useState<T | null>(null);
  const ref = React.useMemo(() => doc(db, collection, id), [id]);
  useEffect(() => {
    return onSnapshot(ref, (d) => {
      if (d.exists()) {
        setter(deserialize(d.data()) as T);
      }
    });
  }, [ref]);
  const put = () => setDoc(ref, serialize(state));
  const update = (...keys: (string | number)[]) => {
    const field = keys.join(".");
    updateDoc(ref, { [field]: serialize(get(state, keys)) });
  };
  return { state, setter, put, update };
};

const firebaseConfig = {
  apiKey: "AIzaSyDoz5GN1Ahoy4jhqIa03qzZ4G6NPwdiJBY",
  authDomain: "mj-contest.firebaseapp.com",
  projectId: "mj-contest",
  storageBucket: "mj-contest.firebasestorage.app",
  messagingSenderId: "598367005786",
  appId: "1:598367005786:web:472eb70031347d5363fc63",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collection = process.env.NODE_ENV === "production" ? "prod" : "dev";

/* eslint-disable @typescript-eslint/no-explicit-any */
const deserialize = (doc: any): unknown => {
  if (
    doc === null ||
    doc === undefined ||
    typeof doc === "number" ||
    typeof doc === "string" ||
    typeof doc === "boolean"
  ) {
    return doc;
  }
  const keys = Object.keys(doc);
  if (keys.every((key) => !isNaN(Number(key)))) {
    return keys.map((key) => deserialize(doc[key]));
  }
  return Object.fromEntries(keys.map((key) => [key, deserialize(doc[key])]));
};

export const serialize = (data: any): any => {
  if (
    data === null ||
    data === undefined ||
    typeof data === "number" ||
    typeof data === "string" ||
    typeof data === "boolean"
  ) {
    return data;
  }
  if (Array.isArray(data)) {
    return Object.fromEntries(data.map((x, i) => [i, serialize(x)]));
  }
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k, serialize(v)]),
  );
};

const get = (data: any, keys: (string | number)[]): any =>
  keys.length === 0 ? data : get(data[keys[0]], keys.slice(1));
/* eslint-enable @typescript-eslint/no-explicit-any */
