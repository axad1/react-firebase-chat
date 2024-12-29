import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";

export default function Chat() {
  const [text, setText] = useState("");
  const [chat, setChat] = useState({ messages: [] });
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
  const endRef = useRef();
  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatId), (docSnap) => {
      const data = docSnap.data();
      console.log("chat data => ", data);
      setChat(data);
    });

    return unsub;
  }, [chatId]);

  const sendMessage = async () => {
    if (!text) return;
    updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion({
        senderId: currentUser.id,
        text,
        createdAt: new Date(),
      }),
    });
    [user.id, currentUser.id].forEach(async (id, i) => {
      const userChatsSnap = await getDoc(doc(db, "userChats", id));
      const userChats = userChatsSnap.data().chats;
      console.log("userChates = ", userChats);
      const chatIdx = userChats.findIndex((c) => c.chatId === chatId);
      userChats[chatIdx].lastMessage = text;
      userChats[chatIdx].isSeen = i === 1;
      userChats[chatIdx].updatedAt = Date.now();
      updateDoc(userChatsSnap.ref, { chats: userChats });
    });

    setText("");
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="avatar.png" alt="avatar" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
          <img src="phone.png" alt="phone" />
          <img src="video.png" alt="video" />
          <img src="info.png" alt="info" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((msg, i) => {
          return (
            <div
              key={i}
              className={
                msg.senderId === currentUser.id ? "message own" : "message"
              }
            >
              {msg.img && <img src="wallpaper.png" alt="image" />}
              <div className="texts">
                <p>{msg.text}</p>
                <span>1 min ago</span>
              </div>
            </div>
          );
        })}

        {/* <div className="message">
              <img src="avatar.png" alt="avatar" />
              <div className="texts">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
                  architecto earum a sed dolorum neque doloribus quod excepturi
                  sunt assumenda quaerat, id iure in dicta, ad quam fuga
                  cupiditate dolores.
                </p>
                <span>1 min ago</span>
              </div>
            </div> */}

        <div ref={endRef} />
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="img.png" alt="img" />
          <img src="camera.png" alt="camera" />
          <img src="mic.png" alt="microphone" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="emoji.png"
            alt="emoji"
            onClick={() => setIsOpenEmojiPicker((p) => !p)}
          />
          <div className="picker">
            <EmojiPicker
              open={isOpenEmojiPicker}
              searchDisabled
              skinTonesDisabled
              previewConfig={{
                showPreview: false,
              }}
              onEmojiClick={(e) => {
                setText((p) => p + e.emoji);
                setIsOpenEmojiPicker(false);
              }}
            />
          </div>
        </div>
        <button
          className="sendButton"
          onClick={sendMessage}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
}
