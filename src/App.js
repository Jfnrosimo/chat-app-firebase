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
        <div className="flex flex-col h-96 justify-center items-center border m-3 lg:w-1/2 lg:m-auto lg:mt-10 lg:border-zinc-800">
          <div className="px-2 flex flex-col text-center">
            <label className="mx-2">Enter Room Name: </label>
            <input
              className="border border-zinc-600"
              placeholder="Enter a room name..."
              type="text"
              ref={roomInputRef}
            />
          </div>
          <button
            className="mt-10 w-4/5 text-2xl bg-sky-400 lg:w-56"
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
