// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.initiate = {
      minutes: 25,
      seconds: 0,
      isActive: false,
    }
    this.state = this.initiate
  }

  tick = () => {
    const {seconds, minutes} = this.state

    const newSec = seconds + 1
    this.setState({seconds: newSec})
    const isTimeOver = minutes * 60 - newSec === 0
    if (isTimeOver) {
      this.getRestartButton()
    }
  }

  getTimerStart = () => {
    console.log('Timer start')
    this.timerId = setInterval(this.tick, 1000)
  }

  getTimerStop = () => {
    console.log('Timer stop')
    clearInterval(this.timerId)
  }

  onStartTime = () => {
    const {isActive} = this.state
    this.setState({isActive: !isActive})

    if (!isActive) {
      this.getTimerStart()
    } else {
      this.getTimerStop()
    }
  }

  decreaseTime = () => {
    const {isActive, minutes} = this.state
    if (!isActive && minutes > 1) {
      this.setState(prevState => ({minutes: prevState.minutes - 1}))
    }
  }

  increaseTime = () => {
    const {isActive} = this.state
    if (!isActive) {
      this.setState(prevState => ({minutes: prevState.minutes + 1}))
    }
  }

  getRestartButton = () => {
    this.getTimerStop()
    this.setState({minutes: 25, seconds: 0, isActive: false})
    console.log('Restart Button clicked')
  }

  getTimeStaticString = () => {
    const {seconds, minutes} = this.state
    const newMinutes = Math.floor((minutes * 60 - seconds) / 60)
    const newSeconds = Math.floor((minutes * 60 - seconds) % 60)
    const newM = newMinutes > 9 ? newMinutes : `0${newMinutes}`
    const newS = newSeconds > 9 ? newSeconds : `0${newSeconds}`

    return `${newM}:${newS}`
  }

  render() {
    const {isActive, minutes, seconds} = this.state
    console.log(seconds)
    const timeStaticString = this.getTimeStaticString()
    const startAndPauseImg = isActive
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const restartImg =
      'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png'
    const restartAlt = isActive ? 'pause icon' : 'play icon'
    const textFor = isActive ? 'Restart' : 'Start'
    const timeStatus = isActive ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1>Digital Timer</h1>
        <div className="image-bg-container">
          <h1>{timeStaticString}</h1>
          <p>{timeStatus}</p>
        </div>
        <div className="buttons-class">
          <div>
            <button
              onClick={this.onStartTime}
              type="button"
              className="startButton"
            >
              <img
                className="startRestart"
                src={startAndPauseImg}
                alt={restartAlt}
              />
              <p>{textFor}</p>
            </button>
            <button onClick={this.getRestartButton} type="button">
              <img className="restartImg" src={restartImg} alt="reset icon" />
              <p>Reset</p>
            </button>
          </div>
          <p>Set Timer limit</p>
          <div className="increaseAndDecreaseTime">
            <button onClick={this.decreaseTime} type="button">
              -
            </button>
            <p>{minutes}</p>
            <button onClick={this.increaseTime} type="button">
              +
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
