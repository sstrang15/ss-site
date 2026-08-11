import "./style.css";

import Prism from "prismjs";
import "prismjs/components/prism-javascript";

import { assembleSite } from "./site.js";
import { renderHome } from "./views/home.js";


const site = assembleSite();

const app = document.querySelector("#app");

if (!app) {
    throw new Error("Could not find the #app element.");
}

console.log(site);

app.innerHTML = renderHome(site);
Prism.highlightAll();

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});