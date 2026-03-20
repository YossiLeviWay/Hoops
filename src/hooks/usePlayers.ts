import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';

export interface Player {
  id: string;
  name: string;
  nationality: string;
  height: number;
  weight: number;
  position: string;
  attributes: {
    shooting: number;
    defense: number;
    passing: number;
    rebounding: number;
    athleticism: number;
  };
  overall: number;
  fatigue: number;
  energy: number;
  form: number;
  totalMinutes: number;
  injuryStatus: string;
  teamId: string;
  isCaptain: boolean;
  isStarter: boolean;
  isRoster: boolean;
  onTransferList: boolean;
  transferPrice: number;
  individualTraining: string;
}

export function usePlayers(teamId?: string) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const effectiveTeamId = teamId || auth.currentUser?.uid;
    if (!effectiveTeamId) {
      setPlayers([]);
      setLoading(false);
      return;
    }

    const playersQuery = query(
      collection(db, 'players'),
      where('teamId', '==', effectiveTeamId)
    );

    const unsubscribe = onSnapshot(playersQuery, (snap) => {
      const playersData = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Player[];
      setPlayers(playersData);
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'players');
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [teamId]);

  return { players, loading, error };
}
