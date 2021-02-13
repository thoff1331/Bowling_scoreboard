import React, { Component } from 'react'


const checkStrike = (attempt) => {
  return attempt === 10 || attempt === 'X'
}

class Frame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attempt: ['', ''],
      attemptDisplay: ['',''],
      strike: false,
      spare: false,
      score: '',
    }

  }
  componentDidUpdate(prevState) {
    if(prevState.score !== this.state.score) {
      if(this.state.score > 10 && this.props.index !== 10) {
   alert('Frame total cannot exceed 10')

    }
    if(prevState.error && !this.state.error) {
    }
  }
  }
  isStrike = (attempt) => {

    return attempt[0] === 10 || attempt[0] === 'X' ? true : false
  }
  isSpare = (attempt) => {

    return (attempt[0] !== 10) && (attempt[0] + attempt[1] === 10 || attempt[1] === '/');
  }
  attempt = (frameIndex, pins) => {
    const { attempt } = this.state
    const { handleChange, index } = this.props

    let newattempt = [
      ...attempt
    ]
    let attemptDisplay = [ ...attempt ]
    let pinsDisplay = pins;


   if(pins.toUpperCase() === 'X') {
      pinsDisplay = 10
      attemptDisplay[frameIndex - 1] = 'X'
      newattempt[frameIndex - 1] = 10
      if(index !== 10) {
        attemptDisplay[1] = ''
        newattempt[1] = ''
      }
    } else if(pins === '/') {
      pinsDisplay = 10 - newattempt[0]
      attemptDisplay[frameIndex - 1] = '/'
      newattempt[frameIndex - 1] = pinsDisplay
    } else {
      attemptDisplay[frameIndex - 1] = pins
      newattempt[frameIndex - 1] = pins;
    }

    if(frameIndex === 2 && index !== 10 && (Number(newattempt[0]) + Number(pins) === 10)) {
      pinsDisplay = 10 - newattempt[0]
      attemptDisplay[1] = '/'
      newattempt[1] = pinsDisplay
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        attempt: newattempt,
        attemptDisplay: attemptDisplay,
        isSpare: this.isSpare(newattempt),
        isStrike: this.isStrike(newattempt),
        score: newattempt.reduce((acc, val) => {
          return acc + Number(val)
        }, 0)
      }
    })
  

    handleChange(index, frameIndex, pinsDisplay)

  }
  validate = (value) => {

    if((value <= 9 && value >= 0) || (value === '/' || value.toUpperCase() === 'X')) {
        return true
      } 
  }
  handleOnChange = (event)  =>{

    const {
      target: {
        dataset: { attempt },
        value
      }
    } = event


    if(!this.validate(value, attempt)) {
      return
    }

    this.attempt(parseInt(attempt, 10), value);
  
  }

  render() {
    const {attemptDisplay,} = this.state

    const { index } = this.props


    const extraFrameVisible = index === 10;
    const extraFrameDisabled = index === 10 && checkStrike(attemptDisplay[0])  ? true : false;



    return(
      <div className={`player col-Frame frame-${index}`}>
        <div className={'score score-inputs'}>
          <input ref="attempt1" data-attempt="1" type="text" className="form-control" value={attemptDisplay[0]} onChange={this.handleOnChange} />
          <input ref="attempt2" data-attempt="2" disabled={checkStrike(attemptDisplay[0]) ? true : false} value={attemptDisplay[1]} onChange={this.handleOnChange} type="text" className={`form-control`}/>
        {index === 10 ?  <input ref="attempt3" data-attempt="3" disabled={extraFrameDisabled ? false: true } onChange={this.handleOnChange} type="text" className={ extraFrameVisible ? 'form-control' : 'form-control hidden'}/> : null}
        </div>
      </div>
    )
  }
}

export default Frame
