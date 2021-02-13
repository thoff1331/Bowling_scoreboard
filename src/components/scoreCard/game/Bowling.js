import React from 'react'
import Players from '../players/Players'
import Header from '../../../Header'


function Bowling() {
    return (
      <div className="bowling-container">
        <Header />
        <Players index={1} name={'Trevor'} />
        <Players index={2} name={'Jacy'} />
        <Players index={3} name={'Adam'} />
      </div>
    )
  }
export default Bowling
