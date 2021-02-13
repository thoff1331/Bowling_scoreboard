import React from 'react'


const headers = [
  'Name',
 1,2,3,4,5,6,7,8,9,10,
  'Score'
]

function Header(){
  return (
      <>
    <h1 className='table-header'>Best Buy Bowling</h1>
    <div className="header">
        
      { headers.map((header, id) => {
        const className =  typeof header === String ? header.replace(' ', '') : null;
        return <div key={id}className={`header-col header-${className}`}>{header}</div>
      })
      }
    </div>
    </>
  )
}

export default Header
