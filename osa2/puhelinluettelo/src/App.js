import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const Numbers = ({persons}) => {
    const rows = () => persons.map((person) => <div key={person.name}>{person.name}</div>)
    return (
      <>
        {rows()}
      </>
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
    }

    if (persons.map(person => person.name).indexOf(newName) === -1) {
      setPersons(persons.concat(personObject))
    } else {
      alert(`${newName} is already added to phonebook`)
    }

    
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )

}

export default App