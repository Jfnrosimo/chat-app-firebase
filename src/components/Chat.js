import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

//Import UI
import { AiOutlineSend } from "react-icons/ai";

export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });

    setNewMessage("");
  };

  return (
    <div className="flex justify-between items-center flex-col h-full border border-zinc-600 mx-4 my-5">
      <div className="mt-3">
        <h1 className=" text-3xl bg-sky-200 rounded-sm p-2">
          Welcome to: <span className="">{room}</span>
        </h1>
      </div>
      <div className="my-4">
        {messages.map((message) => (
          <div className="mt-1 mx-2" key={message.id}>
            <p>
              <span className="font-bold mx-2">{message.user}:</span>
              {message.text}
            </p>
          </div>
        ))}
      </div>
      <form className="w-full flex justify-center" onSubmit={handleSubmit}>
        <input
          className="w-3/5 border border-zinc-600 rounded mr-2"
          type="text"
          placeholder="Type message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="ml-2 bg-sky-400 px-2 py-1 rounded flex items-center"
          type="submit"
        >
          Send <AiOutlineSend className="mx-1" />
        </button>
      </form>
    </div>
  );
};
