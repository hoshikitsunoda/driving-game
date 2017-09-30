/* eslint-disable no-unused-vars */

const $car = document.createElement('img')
const $over = document.createElement('img')
const $music = document.createElement('embed')
const $sound = document.createElement('embed')
const $sad = document.createElement('embed')
const $button = document.createElement('button')

$car.setAttribute('class', 'car')
$car.setAttribute('src', 'car.jpg')

$over.setAttribute('class', 'over')
$over.setAttribute('src', 'gameover.jpg')

$music.setAttribute('src', 'game.mp3')
$music.setAttribute('autostart', 'true')
$music.setAttribute('loop', 'true')
Object.assign($music.style, {
  width: '2px',
  height: '0'
})

$sound.setAttribute('src', 'explosion.wav')
$sound.setAttribute('autostart', 'true')
Object.assign($sound.style, {
  width: '2px',
  height: '0'
})

$sad.setAttribute('src', 'sadmusic.mp3')
$sad.setAttribute('autostart', 'true')
$sad.setAttribute('loop', 'true')
Object.assign($sad.style, {
  width: '2px',
  height: '0'
})

$button.textContent = 'Continue?'

$car.setAttribute('style', 'width: 60px; height: 80px;')
$car.style.transform = 'rotate(180deg)'

document.body.appendChild($car)

let started = false
let startedBgm = false

class Car {
  constructor(car, direction, speed, location) {
    this.direction = direction
    this.speed = speed
    this.location = location

  }

  move() {
    if (this.direction === 'north') {
      this.location[1] -= this.speed
    }
    else if (this.direction === 'south') {
      this.location[1] += this.speed
    }
    else if (this.direction === 'west') {
      this.location[0] -= this.speed
    }
    else if (this.direction === 'east') {
      this.location[0] += this.speed
    }
  }

  position() {
    Object.assign($car.style, {
      left: this.location[0] + 'px',
      top: this.location[1] + 'px'
    })
    if (this.location[0] > 1300 || this.location[0] <= -1) {
      $car.setAttribute('src', 'explode.png')
      this.speed = 0
      document.body.removeChild($music)
      document.body.appendChild($sound)
      setTimeout(function update() {
        document.body.appendChild($over)
      }, 700)
      setTimeout(function update() {
        document.body.appendChild($sad)
      }, 1200)
      setTimeout(function update() {
        document.body.appendChild($button)
      }, 5000)
    }
    else if (this.location[1] > 600 || this.location[1] <= -1) {
      $car.setAttribute('src', 'explode.png')
      this.speed = 0
      document.body.removeChild($music)
      document.body.appendChild($sound)
      setTimeout(function update() {
        document.body.appendChild($over)
      }, 700)
      setTimeout(function update() {
        document.body.appendChild($sad)
      }, 1200)
      setTimeout(function update() {
        document.body.appendChild($button)
      }, 5000)
    }
  }

  static start(car) {
    if (started === false) {
      started = true
      this.id = setInterval(function () {
        car.move()
        car.position()
      }, 60)
    }
  }

  static stop(car) {
    started = false
    clearInterval(this.id)
  }

  turn(direction) {
    this.direction = direction
  }

  accelerate(amount) {
    this.speed += amount
  }

  decelerate(amount) {
    if (this.speed > 0) {
      this.speed -= amount
    }
    else {
      this.speed = 0
    }
  }
}

$button.addEventListener('click', function refresh() {
  location.reload()
})

const chronoJet = new Car($car, 'south', 8, [0, 0])

document.body.addEventListener('keydown', function () {
  const key = event.keyCode
  if (key === 32) {
    Car.start(chronoJet)
    const $body = document.querySelector('body')
    if (startedBgm === false) {
      startedBgm = true
      $body.appendChild($music)
    }
  }
  else if (key === 83) {
    Car.stop(chronoJet)
  }
})

document.body.addEventListener('keydown', function (event) {
  const key = event.keyCode
  if (key === 38) {
    chronoJet.turn('north')
    $car.style.transform = 'rotate(0deg)'
  }
  else if (key === 40) {
    chronoJet.turn('south')
    $car.style.transform = 'rotate(180deg)'
  }
  else if (key === 39) {
    chronoJet.turn('east')
    $car.style.transform = 'rotate(90deg)'
  }
  else if (key === 37) {
    chronoJet.turn('west')
    $car.style.transform = 'rotate(270deg)'
  }
})

document.body.addEventListener('keydown', function () {
  const key = event.keyCode
  if (key === 65) {
    chronoJet.accelerate(10)
  }
  else if (key === 90) {
    chronoJet.decelerate(10)
  }
})
