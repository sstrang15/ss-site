import { renderHeader } from "../components/header.js"

export function renderHome() {
  return `
    <div class="site-shell">

      ${renderHeader()}

      <div class="page-layout">
        <aside class="left-sidebar">
          <h2>Sections</h2>

          <nav aria-label="Page sections">
            <a href="#overview">Overview</a>
            <a href="#story">Story</a>
            <a href="#architecture">Architecture</a>
            <a href="#repository">Repository</a>
          </nav>
        </aside>

        <main class="main-content">
          <section id="overview">
            <h2>Overview</h2>
            <p>Main page content will appear here.</p>
          </section>
        </main>

        <aside class="right-sidebar">
          <h2>Projects</h2>

          <nav aria-label="Project navigation">
            <a href="#music-dna">Music DNA</a>
            <a href="#marketscope">MarketScope</a>
            <a href="#resume">Resume</a>
          </nav>
        </aside>
      </div>
    </div>
  `;
}