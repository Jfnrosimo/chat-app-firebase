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
      <div className="h-screen bg-sky-500 text-white flex flex-col justify-center items-center">
        <h1 className="text-4xl text-center mb-24">Chat App</h1>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      <nav className="text-white bg-blue-600 h-16 flex justify-between items-center px-5">
        <h1 className="text-2xl font-bold">Chat App</h1>
        <button onClick={signUserOut}>Sign Out</button>
      </nav>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="flex flex-col h-96 justify-center items-center">
          <div>
            <label className="mx-2">Enter Room Name: </label>
            <input
              className="border border-zinc-600"
              type="text"
              ref={roomInputRef}
            />
          </div>
          <button
            className="mt-10 w-4/5 text-2xl bg-sky-400"
            onClick={() => setRoom(roomInputRef.current.value)}
          >
            Enter Chat
          </button>
        </div>
      )}
    </>
  );
};

export default App;
