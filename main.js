/* eslint-disable no-unused-vars */

const $car = document.createElement('img')

$car.setAttribute('class', 'car')
$car.setAttribute('src', 'car.jpg')

$car.setAttribute('style', 'width: 100px; height: 130px;')

document.body.appendChild($car)

class Car {
  constructor(car, direction, speed, location) {
    this.direction = direction
    this.speed = speed
    this.location = location
  }

  move() {
    if (this.direction === 'north') {
      this.location[1] += this.speed
    }
    else if (this.direction === 'south') {
      this.location[1] -= this.speed
    }
    else if (this.direction === 'west') {
      this.location[0] -= this.speed
    }
    else if (this.direction === 'east') {
      this.location[0] += this.speed
    }
    return this.location
  }

  static start(car) {
    setInterval(function () {
      car.move()
    }, 16)
  }
}

const chronoJet = new Car($car, 'north', 30, [0, 0])

chronoJet.move()
Car.start(chronoJet)
