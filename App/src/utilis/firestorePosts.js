import { db } from "./firebase";
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from "firebase/firestore";

const postsRef = collection(db, "posts");

export async function createPost({ uid, name, message }) {
  await addDoc(postsRef, {
    uid,
    name,
    message,
    timestamp: serverTimestamp(),
    likes: 0,
    comments: []
  });
}

export async function getAllPosts() {
  const q = query(postsRef, orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
