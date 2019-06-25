import React from 'react'

const Persons = ({persons}) => {
  const rows = () => persons.map((person) => <div key={person.name}>{person.name} {person.number}</div>)
  return (
    <>
      {rows()}
    </>
  )
}

export default Persons