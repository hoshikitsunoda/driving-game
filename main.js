/* eslint-disable no-unused-vars */

const $car = document.createElement('img')

$car.setAttribute('class', 'car')
$car.setAttribute('src', 'car.jpg')

$car.setAttribute('style', 'width: 100px; height: 140px;')

document.body.appendChild($car)

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
    setInterval(function () {
      car.move()
      car.position()
    }, 500)
  }
}

const chronoJet = new Car($car, 'south', 10, [10, 10])

document.body.addEventListener('keydown', function () {
  const key = event.keyCode
  if (key === 32) {
    chronoJet.move()
    Car.start(chronoJet)
  }
})
