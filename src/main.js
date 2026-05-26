import { Home } from './views/home.js'

const state = {
  count: 0
}

function paint() {
  const root = document.querySelector('#app')

  root.innerHTML = Home(state)

  wire()
}

function wire() {
  const button = document.querySelector('#increment')

  button.addEventListener('click', () => {
    state.count++

    paint()
  })
}

paint()