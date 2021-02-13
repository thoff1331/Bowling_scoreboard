import React, { Component } from 'react';
class ScoreCard extends Component {
    state = { 
        frames:[1,2,3,4,5,6,7,8,9,10]
     }

  frames = () =>  {
 return this.state.frames.map((frame,index) => {
    return (
     <th key={index}>{frame}</th>
    )
 })
} 
    render() { 
        return (<div>
            <table>
<tbody>
    <tr>{ this.frames()}</tr>
</tbody>

            </table>
        </div>  );
    }
}
 
export default ScoreCard;