import './style.css'
import { renderHome } from './views/home.js'


const app = document.querySelector("#app");

function startApplication() {
  if (!app) {
    throw new Error("Could not find the #app element.");
  }

  app.innerHTML = renderHome();
}

startApplication();