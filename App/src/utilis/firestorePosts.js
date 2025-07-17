import { db } from "./firebase";
import {
  collection,
  doc,
  updateDoc,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

const postsRef = collection(db, "posts");

export async function createPost({ uid, name, message }) {
  await addDoc(postsRef, {
    uid,
    name,
    message,
    timestamp: serverTimestamp(),
    reactions: {
      like: 0,
      love: 0,
      fire: 0,
    },
    comments: [],
  });
}

export async function getAllPosts() {
  const q = query(postsRef, orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export const updateReactions = async (postId, newReactions) => {
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, { reactions: newReactions });
};
