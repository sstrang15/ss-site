import './style.css'
import { Home } from './views/home.js'

document.querySelector('#hero').innerHTML = Home()

document.querySelector('#story').innerHTML = `
  <div class="background"></div>

<div class="content">
  <h2>Story</h2>

  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Suspendisse potenti. Integer vel magna non est
    ullamcorper interdum.
  </p>

  <p>
    Sed ut perspiciatis unde omnis iste natus error sit
    voluptatem accusantium doloremque laudantium.
  </p>

  <p>
    Nemo enim ipsam voluptatem quia voluptas sit aspernatur
    aut odit aut fugit.
  </p>

  <p>
    Ut enim ad minima veniam, quis nostrum exercitationem
    ullam corporis suscipit laboriosam.
  </p>

  <p>
    Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur.
  </p>

  <p>
    Excepteur sint occaecat cupidatat non proident,
    sunt in culpa qui officia deserunt mollit anim id est
    laborum.
  </p>

  <p>
    Curabitur pretium tincidunt lacus. Nulla gravida orci
    a odio. Nullam varius, turpis et commodo pharetra.
  </p>

  <p>
    Vestibulum ante ipsum primis in faucibus orci luctus
    et ultrices posuere cubilia curae.
  </p>

  <p>
    Aenean fermentum, elit eget tincidunt condimentum,
    eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.
  </p>

  <p>
    Donec non enim in turpis pulvinar facilisis.
    Ut felis.
  </p>
</div>
`

document.querySelector('#services').innerHTML = `
  <h2>Services</h2>

  <p>
    Services section content.
  </p>
`

document.querySelector('#writing').innerHTML = `
  <h2>Writing</h2>

  <p>
    Writing section content.
  </p>
`


document.querySelector('#contact').innerHTML = `
  <h2>Contact</h2>

  <p>
    Contact section content.
  </p>
`