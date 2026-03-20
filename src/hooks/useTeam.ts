import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';

export interface TeamData {
  id: string;
  name: string;
  leagueId: string;
  points: number;
  wins: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  motivation: number;
  momentum: number;
  chemistry: number;
  reputation: number;
  fansCount: number;
  fanEnthusiasm: number;
  facilities: {
    stadium: number;
    training: number;
    medical: number;
    youth: number;
  };
  isBot?: boolean;
  ticketPrice?: number;
  merchandisePrice?: number;
  tactics?: {
    style: string;
    pace: string;
    focus: string;
  };
  rotationLogic?: {
    mode: string;
    benchDepth: number;
  };
  trainingFocus?: Record<string, number>;
}

export function useTeam() {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setTeamData(null);
      setLoading(false);
      return;
    }

    // In this demo, we use user UID as team ID
    const teamRef = doc(db, 'teams', user.uid);
    const unsubscribe = onSnapshot(teamRef, (docSnap) => {
      if (docSnap.exists()) {
        setTeamData({ id: docSnap.id, ...docSnap.data() } as TeamData);
      } else {
        setTeamData(null);
      }
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, `teams/${user.uid}`);
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { teamData, loading, error };
}
