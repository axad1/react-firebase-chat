import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";
import Login from "./components/login/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

const App = () => {
  const { currentUser, loading, fetchUser } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log("user => ", user);
      fetchUser(user?.uid);
    });

    return unSub;
  }, [fetchUser]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <>
      <div className="container">
        {currentUser ? (
          <>
            <List />
            {chatId && <Chat />}
            {chatId && <Details />}
          </>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
};

export default App;
