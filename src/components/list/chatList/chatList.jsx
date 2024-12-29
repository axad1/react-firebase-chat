import "./chatList.css";
import { useUserStore } from "../../../lib/userStore";
import { useChatStore } from "../../../lib/chatStore";
import { useEffect } from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useState } from "react";

export default function ChatList() {
  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    const docRef = doc(db, "userChats", currentUser.id);
    const unsub = onSnapshot(docRef, async (docSnap) => {
      const chats = docSnap.data().chats;
      const promises = chats.map(async (chat) => {
        const userDocRef = doc(db, "users", chat.receiverId);
        const userSnap = await getDoc(userDocRef);
        const userData = userSnap.data();
        return { ...chat, user: userData };
      });
      const chatsData = await Promise.all(promises);
      setChats(chatsData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return unsub;
  }, [currentUser.id]);

  const handleSelect = (chat) => {
    if (!chat.isSeen) {
      const userChats = chats.map(({ user, ...rest }) => rest);
      const chatIdx = userChats.findIndex((c) => c.chatId === chat.chatId);
      userChats[chatIdx].isSeen = true;
      updateDoc(doc(db, "userChats", currentUser.id), { chats: userChats });
    }

    changeChat(chat.chatId, chat.user);
  };

  return (
    <div className="chatList">
      {chats.map((chat, i) => {
        return (
          <div
            key={i}
            className="item"
            style={{ backgroundColor: chat.isSeen ? "transparent" : "#5183fe" }}
            onClick={() => handleSelect(chat)}
          >
            <img src="avatar.png" alt="avatar" />
            <div className="texts">
              <span>{chat.user.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
