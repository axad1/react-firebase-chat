import "./list.css";
import UserInfo from "./userInfo/userInfo";
import ChatList from "./chatList/chatList";
import Search from "./search/Search";

export default function List() {
  return (
    <div className="list">
      <UserInfo />
      {/* <div> */}
      <Search />
      <ChatList />
      {/* </div> */}
    </div>
  );
}
