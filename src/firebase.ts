import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Contest } from "./contest";

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

const useContest = (id: string) => {
  const [contest, setContest] = useState<Contest | null>(null);
  useEffect(() => {
    if (id === "") return;
    return onSnapshot(doc(db, collection, id), (d) => {
      if (d.exists()) {
        const data = d.data() as Doc<Contest>;
        setContest({
          date: data.date,
          players: data.players,
          results: data.results.map((results) =>
            Object.entries(results).map(([, result]) => result),
          ),
        });
      }
    });
  }, [id]);
  const mutateContest = (mutate: (next: Contest) => void) => {
    if (contest === null) return;
    const next = structuredClone(contest);
    mutate(next);
    setContest(next);
  };
  return [contest, mutateContest] as const;
};

const saveContest = async (id: string, contest: Contest) => {
  const ref = doc(db, collection, id);
  await setDoc(ref, {
    date: contest.date,
    players: contest.players,
    results: contest.results.map((results) =>
      Object.fromEntries(results.map((result, i) => [i, result])),
    ),
  });
  window.alert("保存しました");
};

export const Docs = {
  useContest,
  saveContest,
};

type Doc<T> =
  T extends (infer S)[][] ? Record<number, Doc<S>>[]
  : T extends object ?
    {
      [K in keyof T]: Doc<T[K]>;
    }
  : T;
