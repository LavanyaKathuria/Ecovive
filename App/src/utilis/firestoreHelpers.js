import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

/* ========== POSTS ========== */
export const createPost = async (user, content) => {
  return await addDoc(collection(db, "posts"), {
    userId: user.uid,
    userName: user.displayName || user.email,
    content,
    createdAt: serverTimestamp(),
    likes: [],
    comments: [],
  });
};

export const fetchPosts = async () => {
  const snapshot = await getDocs(collection(db, "posts"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/* ========== TEAMS ========== */
export const createTeam = async (teamData, creatorId) => {
  return await addDoc(collection(db, "teams"), {
    ...teamData,
    members: [creatorId],
    currentProgress: 0,
    createdAt: serverTimestamp(),
  });
};

export const fetchTeams = async () => {
  const snapshot = await getDocs(collection(db, "teams"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const joinTeam = async (teamId, userId) => {
  const teamRef = doc(db, "teams", teamId);
  await updateDoc(teamRef, {
    members: arrayUnion(userId),
  });
};

export const updateTeamProgress = async (teamId, amount) => {
  const teamRef = doc(db, "teams", teamId);
  const teamSnap = await getDoc(teamRef);
  if (teamSnap.exists()) {
    const prev = teamSnap.data().currentProgress || 0;
    await updateDoc(teamRef, {
      currentProgress: prev + amount,
    });
  }
};
