/* eslint-disable no-unused-vars */

const $car = document.createElement('img')

$car.setAttribute('class', 'car')
$car.setAttribute('src', 'car.jpg')

$car.setAttribute('style', 'width: 100px; height: 140px;')
$car.style.transform = 'rotate(180deg)'

document.body.appendChild($car)

let started = false

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
    const $car = document.querySelector('img')
    const {top, left} = $car.style
    Object.assign($car.style, {
      left: this.location[0] + 'px',
      top: this.location[1] + 'px'
    })
  }

  static start(car) {
    if (started === false) {
      started = true
      this.id = setInterval(function () {
        car.move()
        car.position()
      }, 500)
    }
  }

  static stop(car) {
    started = false
    clearInterval(this.id)
  }

  turn(direction) {
    this.direction = direction
  }
}

const chronoJet = new Car($car, 'south', 20, [10, 10])

document.body.addEventListener('keydown', function () {
  const key = event.keyCode
  if (key === 32) {
    chronoJet.move()
    Car.start(chronoJet)
  }
})

document.body.addEventListener('keydown', function () {
  const key = event.keyCode
  if (key === 83) {
    Car.stop(chronoJet)
  }
})

document.body.addEventListener('keydown', function (event) {
  const key = event.keyCode
  if (key === 38) {

  }
})
