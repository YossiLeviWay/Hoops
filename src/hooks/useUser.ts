import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';

export interface UserData {
  id: string;
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
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUserData(null);
        setLoading(false);
        return;
      }

      const userRef = doc(db, 'users', user.uid);
      const unsubscribeSnap = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          setUserData({ id: docSnap.id, ...docSnap.data() } as UserData);
        } else {
          setUserData(null);
        }
        setLoading(false);
      }, (err) => {
        handleFirestoreError(err, OperationType.GET, `users/${user.uid}`);
        setError(err.message);
        setLoading(false);
      });

      return () => unsubscribeSnap();
    });

    return () => unsubscribeAuth();
  }, []);

  return { userData, loading, error };
}
