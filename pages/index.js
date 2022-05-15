import Head from 'next/head';
import { useContext , useEffect } from 'react';
import Router from 'next/router';
import { StateManager } from '../context/data';

export default function Home() {

  const { setUserInfo, LogOut, host, data, setData } = useContext(StateManager);

  useEffect(() => {
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
  },[1])

  return (
    <div>
      <Head>
        <title>Contkt-2.o</title>
        <meta name="description" content="Chat with your friends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        
      </main>
    </div>
  )
}
