import { 
  doc, 
  getDoc, 
  setDoc, 
  getDocFromServer,
  FirestoreError
} from 'firebase/firestore';
import { auth, db } from '../firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. ");
    }
  }
}

export async function ensureUserProfile(uid: string, email: string | null, username?: string, gender?: string) {
  const userRef = doc(db, 'users', uid);
  try {
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      // Create default profile
      const defaultProfile = {
        teamName: username ? `${username}'s Team` : `Team ${uid.substring(0, 5)}`,
        stadiumName: "Main Arena",
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
        motivation: 70,
        momentum: 50,
        chemistry: 60,
        reputation: 10,
        fansCount: 500,
        fanEnthusiasm: 50,
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
