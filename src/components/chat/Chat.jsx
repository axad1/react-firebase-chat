import { useEffect, useRef, useState } from "react";
import "./chat.css";

export default function Chat() {
  const [text, setText] = useState("");
  const endRef = useRef();
  useEffect(() => {
    endRef.current?.scrollIntoView({
      // behavior: "smooth",
    });
  }, []);

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="avatar.png" alt="avatar" />
          <div className="texts">
            <span>John Doe</span>
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
        <div className="message">
          <img src="avatar.png" alt="avatar" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
              architecto earum a sed dolorum neque doloribus quod excepturi sunt
              assumenda quaerat, id iure in dicta, ad quam fuga cupiditate
              dolores.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="wallpaper.png" alt="image" />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
              architecto earum a sed dolorum neque doloribus quod excepturi sunt
              assumenda quaerat, id iure in dicta, ad quam fuga cupiditate
              dolores.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="avatar.png" alt="avatar" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
              architecto earum a sed dolorum neque doloribus quod excepturi sunt
              assumenda quaerat, id iure in dicta, ad quam fuga cupiditate
              dolores.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
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
        <img src="emoji.png" alt="emoji" />
        {/* <div className="emoji">
        </div> */}
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
}
