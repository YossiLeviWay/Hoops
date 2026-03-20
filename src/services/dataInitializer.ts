import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  query, 
  where,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';

const TEAM_NAMES = [
  "Lions", "Tigers", "Eagles", "Hawks", "Sharks", 
  "Wolves", "Bulls", "Celtics", "Lakers", "Warriors",
  "Rockets", "Suns", "Nets", "Knicks", "Heat", "Bucks"
];

const CITIES = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
  "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
  "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "San Francisco"
];

const POSITIONS = ["PG", "SG", "SF", "PF", "C"];

function generatePlayer(teamId: string, isStarter: boolean) {
  const firstName = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"][Math.floor(Math.random() * 10)];
  const lastName = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"][Math.floor(Math.random() * 10)];
  const pos = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
  
  const overall = isStarter ? 75 + Math.floor(Math.random() * 15) : 60 + Math.floor(Math.random() * 15);
  const onTransferList = Math.random() < 0.1; // 10% chance to be on transfer list
  
  return {
    name: `${firstName} ${lastName}`,
    nationality: "USA",
    height: 180 + Math.floor(Math.random() * 40),
    weight: 80 + Math.floor(Math.random() * 40),
    position: pos,
    attributes: {
      shooting: overall - 5 + Math.floor(Math.random() * 10),
      defense: overall - 5 + Math.floor(Math.random() * 10),
      passing: overall - 5 + Math.floor(Math.random() * 10),
      rebounding: overall - 5 + Math.floor(Math.random() * 10),
      athleticism: overall - 5 + Math.floor(Math.random() * 10),
    },
    overall,
    fatigue: 0,
    energy: 100,
    form: 50,
    totalMinutes: 0,
    injuryStatus: "Healthy",
    teamId,
    isCaptain: false,
    isStarter,
    isRoster: true,
    onTransferList,
    transferPrice: overall * 10000,
    individualTraining: "None"
  };
}

export async function initializeLeagueData(userTeamId: string) {
  try {
    const teamsSnap = await getDocs(collection(db, 'teams'));
    if (teamsSnap.size > 1) return; // Already initialized

    const batch = writeBatch(db);
    const teamIds: string[] = [userTeamId];
    
    // Generate 15 bot teams
    for (let i = 0; i < 15; i++) {
      const teamId = `bot-team-${i}`;
      teamIds.push(teamId);
      const teamName = `${CITIES[i]} ${TEAM_NAMES[i]}`;
      
      const teamRef = doc(db, 'teams', teamId);
      batch.set(teamRef, {
        name: teamName,
        leagueId: 'rookie-league',
        points: 0,
        wins: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        motivation: 40,
        momentum: 30,
        chemistry: 35,
        reputation: 15,
        fansCount: 1000 + Math.floor(Math.random() * 2000),
        fanEnthusiasm: 45,
        isBot: true,
        ticketPrice: 25,
        merchandisePrice: 20,
        tactics: { style: 'Balanced', pace: 'Normal', focus: 'Mixed' },
        rotationLogic: { mode: 'Balanced', benchDepth: 7 },
        facilities: { stadium: 1, training: 1, medical: 1, youth: 1 }
      });
    }

    // Generate players for all teams
    for (const teamId of teamIds) {
      for (let i = 0; i < 15; i++) {
        const playerRef = doc(collection(db, 'players'));
        const isStarter = i < 5;
        const playerData = generatePlayer(teamId, isStarter);
        if (i === 0) playerData.isCaptain = true;
        batch.set(playerRef, playerData);
      }
    }

    // Generate Schedule (Round Robin)
    const rounds = teamIds.length - 1;
    const matchesPerRound = teamIds.length / 2;
    const startDate = new Date('2026-03-21T19:00:00Z');

    for (let r = 0; r < rounds; r++) {
      const matchDate = new Date(startDate.getTime() + r * 3 * 24 * 60 * 60 * 1000);
      
      for (let m = 0; m < matchesPerRound; m++) {
        const home = (r + m) % (teamIds.length - 1);
        let away = (teamIds.length - 1 - m + r) % (teamIds.length - 1);
        
        if (m === 0) away = teamIds.length - 1;
        
        const matchRef = doc(collection(db, 'matches'));
        batch.set(matchRef, {
          homeTeamId: teamIds[home],
          awayTeamId: teamIds[away],
          date: matchDate.toISOString(),
          status: 'scheduled',
          leagueId: 'rookie-league',
          score: { home: 0, away: 0 },
          log: []
        });
      }
    }

    await batch.commit();
    console.log("League data initialized successfully!");
  } catch (error) {
    console.error("Error initializing league data:", error);
  }
}
