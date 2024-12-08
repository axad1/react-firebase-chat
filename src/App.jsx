import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";

const App = () => {
  return (
    <div className="container">
      <List />
      <Chat />
      <Details />
    </div>
  );
};

export default App;
