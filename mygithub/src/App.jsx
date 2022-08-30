import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main/Main";
import Nav from "./Components/Nav/Nav";
import Repo from "./Components/Repo/Repo";

function App() {
  // const USERS_URL = `https://api.github.com/users/${user_name}`;
  // const FOLLOWERS_URL = `https://api.github.com/users/${user_name}/followers`;
  // const REPOS_URL = `https://api.github.com/users/${user_name}/repos`;
  const [data, setData] = useState([]);
  const [fullData, setFulldata] = useState([]);

  const getRepos = async function () {
    let req = await fetch("https://api.github.com/users/LenovoLegion5/repos");
    let res = await req.json();
    let needed = res.slice(0, 6);
    setFulldata(res);
    setData(needed);
  };
  return (
    <>
      <Nav />
      <Main send={fullData} data={data} getData={getRepos} />
      <Footer />
    </>
  );
}

export default App;
