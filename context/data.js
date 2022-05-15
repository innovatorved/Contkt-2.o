import { createContext, useState } from "react";

// Createcontext
const StateManager = createContext();

const States = (props) => {
  const host = "";

  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
  });

  const list = [];

  const [data, setData] = useState(list);

  const LogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    setUserInfo({
      name: "",
      username: "",
    });
    setData([]);
  };

  return (
    <StateManager.Provider
      value={{
        host,
        data,
        setData,
        LogOut,
        userInfo,
        setUserInfo,
      }}
    >
      {props.children}
    </StateManager.Provider>
  );
};

export default States;
export { StateManager };
