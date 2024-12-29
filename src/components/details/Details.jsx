import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import "./details.css";
import { useUserStore } from "../../lib/userStore";

export default function Details() {
  const { currentUser } = useUserStore();
  const { user, changeBlock, isReceiverBlocked } = useChatStore();

  const handleBlock = () => {
    updateDoc(doc(db, "users", currentUser.id), {
      blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
    });
    changeBlock();
  };

  return (
    <div className="details">
      <div className="user">
        <img src="avatar.png" alt="avatar" />
        <div className="texts">
          <span>{user.username} </span>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="arrowUp.png" alt="arrow up" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="arrowUp.png" alt="arrow up" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="arrowDown.png" alt="arrow up" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetails">
                <img src="wallpaper.png" alt="image" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="download.png" alt="download" className="download" />
            </div>
            <div className="photoItem">
              <div className="photoDetails">
                <img src="wallpaper.png" alt="image" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="download.png" alt="download" className="download" />
            </div>
            <div className="photoItem">
              <div className="photoDetails">
                <img src="wallpaper.png" alt="image" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="download.png" alt="download" className="download" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="arrowUp.png" alt="arrow up" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isReceiverBlocked ? "Unblock User" : "Block User"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
}
