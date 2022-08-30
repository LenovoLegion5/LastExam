import React, { useEffect } from "react";
import { useState } from "react";

function Repos(props) {
  const [search, setSearch] = useState("");
  useEffect(() => {
    props.getDataFunc();
  }, [search]);
  function renderRepo(db, html) {
    if (html) {
      document.querySelector(".repos").innerHTML = null;
      db.forEach((repo) => {
        let card = document.createElement("div");
        card.classList.add("repos__repo");
        let div = document.createElement("div");
        div.classList.add("repo__wrap2");

        let link = document.createElement("a");
        link.classList.add("over__title");
        link.classList.add("repo__title");
        link.href = `/${repo.id}`;
        link.textContent = repo.name;

        let star = document.createElement("button");
        star.classList.add("repo__star");
        star.textContent = "Star";

        let wrap = document.createElement("div");
        wrap.classList.add("repo__wrap");

        let lang = document.createElement("p");
        lang.classList.add("repo__lang");
        lang.textContent = repo.language;

        let visib = document.createElement("p");
        visib.classList.add("over__visib");
        visib.classList.add("repo__visib");
        visib.textContent = repo.visibility;

        let lang_color = document.createElement("span");
        if (repo.language === "HTML") {
          lang_color.classList.add("lang_color");
        } else if (repo.language === "CSS") {
          lang_color.classList.add("lang_color2");
        } else if (repo.language === "JavaScript") {
          lang_color.classList.add("lang_color3");
        } else if (repo.language === "SCSS") {
          lang_color.classList.add("lang_color4");
        }
        lang.appendChild(lang_color);
        div.appendChild(link);
        div.appendChild(visib);
        wrap.appendChild(div);
        wrap.appendChild(star);
        card.appendChild(wrap);
        card.appendChild(lang);
        html.appendChild(card);
      });
    }
  }
  function setValue(e) {
    e.preventDefault();
    setSearch(document.querySelector(".repos__search").value);
  }
  let filtered = [];
  let repos = document.querySelector(".repos");

  function filter() {
    let filter = props.data.filter((repo) => repo.name.includes(search));
    filtered.push(...filter);
  }
  filter();

  let langFiltered = [];

  let renderLang = function (db) {
    if (db) {
      if (document.querySelector(".language__list"))
        document.querySelector(".language__list").innerHTML = null;
      let langF = db.map((repo) => {
        if (!langFiltered.includes(repo.language)) {
          langFiltered.push(repo.language);
          if (document.querySelector(".posA__list2")) {
            document.querySelector(".posA__list2").innerHTML = null;
          }
        }
      });
    }
  };
  renderLang(props.data);

  return (
    <section className="repos-section">
      <div className="repos__wrapper">
        <form onSubmit={(e) => setValue(e)}>
          <label></label>
          <input
            type="text"
            name="reposSearch"
            className="repos__search"
            placeholder="Find a repository..."
          />
        </form>
        <div className="modal posAbsolute hide">
          <h6 className="list__title">Select type</h6>
          <ul className="posA__list">
            <li className="pos__li">All</li>
            <li className="pos__li">Public</li>
            <li className="pos__li">Private</li>
          </ul>
        </div>
        <div className="modal posAbsolute2 hide">
          <h6 className="list__title">Select language</h6>
          <ul className="posA__list2"></ul>
        </div>
        <div className="modal posAbsolute3 hide">
          <h6 className="list__title">Select order</h6>
          <ul className="posA__list">
            <li className="pos__li">Last updated</li>
            <li className="pos__li">Name</li>
            <li className="pos__li">Stars</li>
          </ul>
        </div>
        <div className="repos__btns">
          <button
            onClick={() => {
              document.querySelector(".posAbsolute").classList.toggle("hide");
            }}
            className="repos__type"
          >
            Type
          </button>
          <button
            onClick={() => {
              document.querySelector(".posAbsolute2").classList.toggle("hide");
            }}
            className="repos__type"
          >
            Language
          </button>
          <button
            onClick={() => {
              document.querySelector(".posAbsolute3").classList.toggle("hide");
            }}
            className="repos__type"
          >
            Sort
          </button>
        </div>
        <div className="repos">
          {renderRepo(filtered, document.querySelector(".repos"))}
        </div>
      </div>
    </section>
  );
}

export default Repos;
