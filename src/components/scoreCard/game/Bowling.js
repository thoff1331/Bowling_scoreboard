import React, { useState } from 'react'
import Players from '../players/Players'
import Header from '../../../Header'


function Bowling() {
const [inputs,setInputs] = useState({})  
    return (
      <div className="bowling-container">
        <Header />
       
        <Players index={1} name={ inputs.input1 ? inputs.input1 :'Trevor'} />
        <Players index={2} name={ inputs.input2 ? inputs.input2 :'Jacy'} />
        <Players index={3} name={ inputs.input3 ? inputs.input3 : 'Adam'} />
        <div className='change-name-inputs'>
        <input key='input1' name='input1' onChange={({target}) => setInputs(state =>({...state,input1: target.value}))} value={inputs.input1} placeholder='Change Player 1 name'  />
        <input key='input2' name='input2' onChange={({target}) => setInputs(state =>({...state,input2: target.value}))} value={inputs.input2} placeholder='Change Player 2 name' />
        <input key='input3'  name='input3' onChange={({target}) => setInputs(state => ({...state,input3: target.value}))} value={inputs.input3}  placeholder='Change Player 3 name' />
        </div>
      </div>
    )
  }
export default Bowling
