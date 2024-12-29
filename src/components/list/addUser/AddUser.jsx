import "./addUser.css";
import { db } from "../../../lib/firebase";
import {
  doc,
  setDoc,
  query,
  where,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useState } from "react";
import { useUserStore } from "../../../lib/userStore";

export default function AddUser({ setAddMode }) {
  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userName = formData.get("username");

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", userName));
      const docSnap = await getDocs(q);
      console.log(docSnap.size);
      if (!docSnap.empty) {
        setUser(docSnap.docs[0].data());
      }
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const handleAdd = async () => {
    try {
      const chatRef = doc(collection(db, "chats"));
      await setDoc(chatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      updateDoc(doc(db, "userChats", user.id), {
        chats: arrayUnion({
          chatId: chatRef.id,
          lastMessage: "Chat created",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });
      updateDoc(doc(db, "userChats", currentUser.id), {
        chats: arrayUnion({
          chatId: chatRef.id,
          lastMessage: "Chat created",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (error) {
      console.log("error =", error);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" name="username" />
        <button type="submit">Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src="avatar.png" alt="avatar" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
}
