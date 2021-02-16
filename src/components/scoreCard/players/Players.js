import React, { Component } from 'react'
import Frame from '../frames/Frames'

const Names = ({PlayerName}) => {
  return <div className="player col-Name">{PlayerName}</div>
}
const Scores = ({score}) => {
  return <div className="player col-Score">{ isNaN(score) ? 0 :score}</div>
}

const frameBox = () => {
  return [null, null]
}

const frameBoxes = () => {
  let frames = []
  for(let i = 0; i < 10; i++) {
    frames.push(frameBox(i))
  }
  return frames
}

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      frames: frameBoxes(),
      score: 0
    }
  }

  scoreChange() {
    const { frames } = this.state;
    let total = 0;

     frames.push([0])
     frames.forEach((frame, idx) => {
       frame.forEach((score) => { total += score; });
       if (idx >= 9) { return; }
       if (this.Spare(frame)) { total += frames[idx+1][0]; }
       if (this.Strike(frame)) {
         total += frames[idx+1][0]
         if (frames[idx+1].length >= 2) { total += frames[idx+1][1]; }
         if (this.Strike(frames[idx+1])) { total += frames[idx+2][0]; }
       }
     })
    
     this.setState((prevState) => {
       return {
         ...prevState,
         score: total
       }
     })
  }
  Spare = (frame) =>  {
    return (frame[0] !== 10) && (frame[0] + frame[1] === 10);
  }
  Strike = (frame)  => {
    return (frame[0] === 10);
  }
  handleChange = (index, attempt, pins) => {
    const { frames} = this.state

    let newFrames = [...frames]

    newFrames[index - 1][attempt - 1] = parseInt(pins, 10)

    let newState = {
      frames: newFrames
    }
    this.setState(() => {
      return newState
    })

    this.scoreChange()
  }
 
  render(){

    const { score, frames } = this.state
    const { index, name } = this.props
    return (
      <div className="player-rows ">
        <Names  PlayerName={name} />
        {frames.map((frames,idx) => {
          return <Frame player={index} index={idx + 1}  handleChange={this.handleChange} />
        })}
        <Scores score={score} />
      </div>
    )
  }
}

export default Player

