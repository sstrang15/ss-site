export function Home(state) {
  return `
    <main>
      <h1>Stephen Systems</h1>

      <p>Count: ${state.count}</p>

      <button id="increment">
        Increment
      </button>
    </main>
  `
}