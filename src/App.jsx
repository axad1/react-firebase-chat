import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";
import Login from "./components/login/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

const App = () => {
  const user = false;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (res) => {
      console.log("user => ", res.user);
    });

    return unSub;
  }, []);

  return (
    <>
      <div className="container">
        {user ? (
          <>
            <List />
            <Chat />
            <Details />
          </>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
};

export default App;
