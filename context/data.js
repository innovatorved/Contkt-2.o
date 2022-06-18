import { createContext, useState } from "react";

// Createcontext
const StateManager = createContext();

const States = (props) => {
  const host = "";

  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
  });
  const [recipent, setrecipentName] = useState("");
  const setRecipent = () => {
    const recipentName = prompt("Enter recipent name");
    setrecipentName(recipentName);
    localStorage.setItem("recipent", recipentName);
  };
  const ChangeRecipentName=(name)=>{
    setrecipentName(name);
  }

  const list = [];

  const [data, setData] = useState(list);

  const LogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("recipent");
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
        recipent,
        setRecipent,
        setrecipentName,
        ChangeRecipentName
      }}
    >
      {props.children}
    </StateManager.Provider>
  );
};

export default States;
export { StateManager };
