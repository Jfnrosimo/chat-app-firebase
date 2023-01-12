import React, { useState } from "react";
import Auth from "./components/Auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  if (!isAuth) {
    return (
      <div>
        <Auth />
      </div>
    );
  }

  return (
    <div>
      {room ? (
        <div>Chat</div>
      ) : (
        <div>
          <label>Enter Room Name: </label>
          <input type="text" />
          <button>Enter Chat</button>
        </div>
      )}
    </div>
  );
};

export default App;
