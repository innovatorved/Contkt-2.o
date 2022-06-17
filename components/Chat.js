import Head from "next/head";
import SendMessage from "./SendMessage";

import { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
let socket;

import Messages from "./Messages";
import dynamic from "next/dynamic";

import { StateManager } from '../context/data';

let prevMsg = {};

function Home() {
  const { userInfo , recipent} = useContext(StateManager);
  const userName = userInfo.username;

  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const socketInitializer = async () => {
    await fetch("/api/server");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });
    
    socket.on(userName, (msg) => {
      if (JSON.stringify(prevMsg) !== JSON.stringify(msg)) {
        setMessages((messages) => [...messages, msg]);
      }
      prevMsg = msg;
    });
  };

  useEffect(() => {
    socketInitializer();
  },[1]);

  const SendChat = (data) => {
    socket.emit("chat", {
      data,
      recipent,
    });
  };

  function detectMobile() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  const [isMobile, setMobile] = useState(detectMobile());

  return (
    <div>
      <Head>
        <title>Contkt</title>
        <meta
          name="description"
          content="Contkt App : Online Messaging Application"
        />
        <link rel="icon" href="/logonew.png" />
      </Head>

      <img
        className="h-auto mx-auto mt-24"
        src="/contkt-logo-extra-low-quality.png"
        alt="Contkt Logo"
        width={200}
        height={200}
      />

      <main className="mb-32">
        {isMobile ? (
          <>
            <Messages
              messages={messages}
              userName={userName}
              isMobile={isMobile}
            />
            <SendMessage SendChat={SendChat} msg={msg} setMsg={setMsg} />
          </>
        ) : (
          <>
            <SendMessage SendChat={SendChat} msg={msg} setMsg={setMsg} setMessages={setMessages}/>
            <Messages messages={messages} userName={userName} />
          </>
        )}
      </main>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
