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