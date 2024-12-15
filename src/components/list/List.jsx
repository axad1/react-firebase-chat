import "./list.css";
import UserInfo from "./userInfo/userInfo";
import ChatList from "./chatList/chatList";
import Search from "./search/Search";
import AddUser from "./addUser/AddUser";
import { useState } from "react";

export default function List() {
  const [addMode, setAddMode] = useState(false);

  return (
    <div className="list">
      <UserInfo />
      <Search addMode={addMode} setAddMode={setAddMode} />
      <ChatList />
      {addMode && <AddUser setAddMode={setAddMode} />}
    </div>
  );
}
