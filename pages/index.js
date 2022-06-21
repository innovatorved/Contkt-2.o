import Head from "next/head";
import { useContext, useEffect } from "react";
import Router from "next/router";
import { StateManager } from "../context/data";

import Chat from "../components/Chat";
export default function Home() {
  const { setUserInfo, LogOut, host, data, setData, setrecipentName } =
    useContext(StateManager);

  useEffect(() => {
    fetch(`${host}/api/getUserInfo`, {
      headers: {
        authtoken: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === false) {
          localStorage.removeItem("token");
          Router.push("/login");
        } 
      }
      ).catch((err) => {
        console.log(err);
      }
      );
    setUserInfo({
      name: localStorage.getItem("name"),
      username: localStorage.getItem("username"),
    });
    setrecipentName(localStorage.getItem("recipent"));
    if (localStorage.getItem("token")) return;
    localStorage.getItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    setUserInfo({
      name: "",
      username: "",
    });
    setData([]);
    Router.push("/login");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [1]);

  return (
    <div>
      <Head>
        <title>Contkt-2.o</title>
        <meta name="description" content="Contkt App : Web Based Messaging App"/>
        <link rel="icon" href="/logonew.png" />
      </Head>

        <div className="flex justify-end">
        <img
          className="mt-2 cursor-pointer mr-16 fixed"
          src="/logout.png"
          alt="Logout Button"
          title={"Logout Button"}
          width={24}
          height={24}
          onClick={()=>{
            Router.push("/login");
            LogOut();
          }}
        />
        </div>

      <main>
        <Chat />
      </main>
    </div>
  );
}
