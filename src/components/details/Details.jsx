import "./details.css";

export default function Details() {
  return (
    <div className="details">
      <div className="user">
        <img src="avatar.png" alt="avatar" />
        <div className="texts">
          <span>John Doe</span>
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
        <button>Block User</button>
        <button className="logout">Logout</button>
      </div>
    </div>
  );
}
