import "./style.css";

import { assembleSite } from "./site.js";
import { renderHome } from "./views/home.js";


const site = assembleSite();

const app = document.querySelector("#app");

if (!app) {
    throw new Error("Could not find the #app element.");
}

app.innerHTML = renderHome(site);