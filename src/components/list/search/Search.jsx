import { useState } from "react";
import "./search.css";

export default function Search() {
  const [addMode, setAddMode] = useState(false);
  return (
    <div className="search">
      <div className="searchBar">
        <img src="search.png" alt="search" />
        <input type="text" placeholder="Search" />
      </div>
      <img
        src={addMode ? "minus.png" : "plus.png"}
        alt="plus"
        className="add"
        onClick={() => setAddMode((p) => !p)}
      />
    </div>
  );
}
