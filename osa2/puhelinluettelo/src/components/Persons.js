import React from 'react'

const Persons = ({ persons, deleteFunction }) => {
  const removeConfirmation = (person, deleteFunction) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      deleteFunction(person.id)
    }
  }
  const rows = () => persons.map((person) => <div key={person.name}>{person.name} {person.number}
    <button onClick={() => removeConfirmation(person, deleteFunction)}>delete</button></div>)
  return (
    <>
      {rows()}
    </>
  )
}

export default Persons