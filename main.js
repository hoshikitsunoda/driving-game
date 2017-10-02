/* eslint-disable no-unused-vars */

alert('Hit space bar to start, A key to accelerate, Z key to decelerate and S key to stop.')

const $car = document.createElement('img')
const $over = document.createElement('img')
const $music = document.createElement('embed')
const $sound = document.createElement('embed')
const $sad = document.createElement('embed')
const $button = document.createElement('button')
const $box1 = document.createElement('div')
const $box2 = document.createElement('div')
const $box3 = document.createElement('div')
const $box4 = document.createElement('div')
const $box5 = document.createElement('div')
const $box6 = document.createElement('div')
const $beat = document.createElement('div')
const $message = document.createElement('h1')
const $endMusic = document.createElement('embed')

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

$endMusic.setAttribute('src', 'nothing.mp3')
$endMusic.setAttribute('autostart', 'true')
Object.assign($endMusic.style, {
  width: '2px',
  height: '0'
})

$box1.setAttribute('class', 'box1')
$box2.setAttribute('class', 'box2')
$box3.setAttribute('class', 'box3')
$box4.setAttribute('class', 'box4')
$box5.setAttribute('class', 'box5')
$box6.setAttribute('class', 'box6')

$car.setAttribute('style', 'width: 60px; height: 80px;')
$car.style.transform = 'rotate(180deg)'

$beat.setAttribute('class', 'beat')
$message.setAttribute('class', 'message')

$button.textContent = 'Continue?'
$message.textContent = 'Do nothing. And everything will be done.'

document.body.appendChild($car)
document.body.appendChild($box1)
document.body.appendChild($box2)
document.body.appendChild($box3)
document.body.appendChild($box4)
document.body.appendChild($box5)
document.body.appendChild($box6)
document.body.appendChild($endMusic)

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
    if (this.location[0] > 1350 || this.location[0] <= -1) {
      $car.setAttribute('src', 'explode.png')
      this.speed = 0
      document.body.removeChild($music)
      document.body.appendChild($sound)
      setTimeout(function update() {
        document.body.appendChild($over)
      }, 1200)
      setTimeout(function update() {
        document.body.appendChild($sad)
      }, 1500)
      setTimeout(function update() {
        document.body.appendChild($button)
      }, 7300)
    }
    else if (this.location[1] > 690 || this.location[1] <= -1) {
      $car.setAttribute('src', 'explode.png')
      this.speed = 0
      document.body.removeChild($music)
      document.body.appendChild($sound)
      setTimeout(function update() {
        document.body.appendChild($over)
      }, 1200)
      setTimeout(function update() {
        document.body.appendChild($sad)
      }, 1500)
      setTimeout(function update() {
        document.body.appendChild($button)
      }, 7300)
    }
    else if (this.location[1] > 500 && this.location[0] < 120) {
      document.body.removeChild($box1)
      setTimeout(function reappear() {
        document.body.appendChild($box1)
      }, 1000)
    }
    else if (this.location[0] > 1200 && this.location[1] < 120) {
      document.body.removeChild($box2)
      setTimeout(function reappear() {
        document.body.appendChild($box2)
      }, 1000)
    }
    else if (this.location[0] > 1200 && this.location[1] > 550) {
      document.body.removeChild($box3)
      setTimeout(function reappear() {
        document.body.appendChild($box3)
      }, 1000)
    }
    else if (this.location[1] < 120 && this.location[0] < 120) {
      document.body.removeChild($box4)
      setTimeout(function reappear() {
        document.body.appendChild($box4)
      }, 1000)
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
    else if (this.speed === 0) {
      setTimeout(function () {
        document.body.appendChild($beat)
      }, 15000)
      setTimeout(function () {
        document.body.appendChild($message)
      }, 17000)
    }
    else {
      this.speed = 0
    }
  }
}

$button.addEventListener('click', function refresh() {
  location.reload()
})

const chronoJet = new Car($car, 'south', 27, [660, 10])

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
    setTimeout(function () {
      document.body.appendChild($beat)
    }, 15000)
    setTimeout(function () {
      document.body.appendChild($message)
    }, 17000)
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
    if (started) {
      chronoJet.accelerate(3)
    }
  }
  else if (key === 90) {
    chronoJet.decelerate(3)
  }
})
