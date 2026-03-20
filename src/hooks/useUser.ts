import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { handleFirestoreError, OperationType } from '../services/firestoreService';

export interface UserData {
  teamName: string;
  stadiumName: string;
  bio: string;
  gender: string;
  avatar: string;
  balance: number;
  reputation: number;
  changesCountToday: number;
  lastChangeDate: string;
  role: string;
}

export function useUser() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setUserData(null);
      setLoading(false);
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data() as UserData);
      } else {
        setUserData(null);
      }
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, `users/${user.uid}`);
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { userData, loading, error };
}
