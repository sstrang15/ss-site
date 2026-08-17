import "./style.css";

import Prism from "prismjs";
import "prismjs/components/prism-javascript";

import { assembleSite } from "./site.js";
import { renderHome } from "./views/home.js";
import { initializeNavigation } from "./components/header.js";
import { initializePageNavigation } from "./components/rightSidebar.js"


/* =========================================================
   APPLICATION SETUP
   ========================================================= */

const site = assembleSite();

const app = document.querySelector("#app");

if (!app) {
    throw new Error("Could not find the #app element.");
}

console.log(site);


/* =========================================================
   INITIAL RENDER
   ========================================================= */

renderApp();


/* =========================================================
   GLOBAL BEHAVIOR
   ========================================================= */

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


function renderApp() {
    app.innerHTML = renderHome(site);

    Prism.highlightAll();

    initializeNavigation(site, renderApp);

    initializePageNavigation(site, renderApp);
}