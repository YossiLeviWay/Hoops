import { 
  doc, 
  getDoc, 
  setDoc, 
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';

export async function ensureUserProfile(uid: string, email: string | null, teamNameInput?: string, gender?: string, stadiumNameInput?: string) {
  const userRef = doc(db, 'users', uid);
  try {
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      // Create default profile
      const defaultProfile = {
        teamName: teamNameInput || `Team ${uid.substring(0, 5)}`,
        stadiumName: stadiumNameInput || "Main Arena",
        bio: "New manager on the block.",
        gender: gender || "Not specified",
        avatar: "https://picsum.photos/seed/manager/200/200",
        balance: 1000000, // 1M starting balance
        reputation: 10,
        changesCountToday: 0,
        lastChangeDate: new Date().toISOString(),
        role: 'user'
      };
      await setDoc(userRef, defaultProfile);
      
      // Also create a default team
      const teamRef = doc(db, 'teams', uid); // Using UID as team ID for simplicity in this demo
      await setDoc(teamRef, {
        name: defaultProfile.teamName,
        leagueId: 'rookie-league',
        points: 0,
        wins: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        motivation: 35, // Lowered for start of season
        momentum: 20,   // Lowered for start of season
        chemistry: 30,  // Lowered for start of season
        reputation: 10,
        fansCount: 500,
        fanEnthusiasm: 40,
        isBot: false,
        ticketPrice: 20,
        merchandisePrice: 15,
        tactics: {
          style: 'Balanced',
          pace: 'Normal',
          focus: 'Mixed'
        },
        rotationLogic: {
          mode: 'Balanced',
          benchDepth: 7
        },
        facilities: {
          stadium: 1,
          training: 1,
          medical: 1,
          youth: 1
        }
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${uid}`);
  }
}
