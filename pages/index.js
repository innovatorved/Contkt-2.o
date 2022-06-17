import Head from 'next/head';
import { useContext , useEffect } from 'react';
import Router from 'next/router';
import { StateManager } from '../context/data';

import Chat from '../components/Chat';
export default function Home() {

  const { setUserInfo, LogOut, host, data, setData , setrecipentName} = useContext(StateManager);
  

  useEffect(() => {
    setUserInfo(
      {
        name: localStorage.getItem("name"),
        username: localStorage.getItem("username"),
      }
    )
    setrecipentName(localStorage.getItem("recipent"));
    if (localStorage.getItem('token')) return;

    localStorage.getItem('token')
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    setUserInfo({
      name: "",
      username: "",
    });
    setData([]);
    Router.push('/login');
  })

  return (
    <div>
      <Head>
        <title>Contkt-2.o</title>
        <meta name="description" content="Chat with your friends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Chat />
      </main>
    </div>
  )
}
