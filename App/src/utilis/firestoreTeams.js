import { db } from "./firebase";
import { collection, doc, setDoc, getDocs, updateDoc, increment, getDoc, serverTimestamp } from "firebase/firestore";

const teamsRef = collection(db, "teams");

export async function createTeam({ teamName, description, goalKgCO2, createdBy }) {
  const teamDoc = doc(teamsRef);
  await setDoc(teamDoc, {
    teamName,
    description,
    goalKgCO2,
    createdBy,
    members: [createdBy],
    currentProgress: 0,
    createdAt: serverTimestamp()
  });
  return teamDoc.id;
}

export async function getAllTeams() {
  const snapshot = await getDocs(teamsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateTeamProgress(teamId, kgCO2) {
  const teamDoc = doc(db, "teams", teamId);
  await updateDoc(teamDoc, {
    currentProgress: increment(kgCO2),
  });
}


export async function joinTeam(teamId, userId) {
  const teamDoc = doc(db, "teams", teamId);
  const teamSnap = await getDoc(teamDoc);
  const teamData = teamSnap.data();
  if (!teamData.members.includes(userId)) {
    await updateDoc(teamDoc, {
      members: [...teamData.members, userId]
    });
  }
}
