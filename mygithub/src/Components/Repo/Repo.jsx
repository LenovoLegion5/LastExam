import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

function Repo() {
  let [repos, setRepo] = useState([]);
  let id = useParams();

  const getRepo = async function () {
    let req = await fetch(`https://api.github.com/users/LenovoLegion5/repos`);
    let res = await req.json();
    console.log(res);
    setRepo(res);
  };

  useEffect(() => {
    getRepo();
  }, []);

  return (
    <section className="reposetory">
      <div className="container">
        <a href="#" className="reposetory__link">
          <i className="fa-solid fa-code"></i>Code
        </a>
      </div>
      <Outlet />
    </section>
  );
}

export default Repo;
