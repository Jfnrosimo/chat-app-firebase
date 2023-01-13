import React, { useState, useRef } from "react";
import Auth from "./components/Auth";

import { Chat } from "./components/Chat";

import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      <nav className="text-white bg-blue-600">
        <h1 className="text-2xl font-bold">Chat App</h1>
        <button onClick={signUserOut}>Sign Out</button>
      </nav>
      {room ? (
        <Chat room={room} />
      ) : (
        <div>
          <label>Enter Room Name: </label>
          <input type="text" ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}
    </>
  );
};

export default App;
