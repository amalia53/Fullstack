import React from 'react'

const Person = ({ name, number, deletePerson }) => {
  return (
    <li>
      {name} : {number}
     &nbsp; <button onClick={deletePerson}>DELETE</button>
    </li>
  )
}

export default Person