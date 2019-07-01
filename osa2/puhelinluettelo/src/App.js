import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import contactService from './services/contacts'

const App = () => {
  const [ persons, setPersons] =  useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.map(person => person.name).indexOf(newName) === -1) {
      contactService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log('updatee')
        const personToUpdate = persons.find(person => person.name === newName)
        contactService
          .update(personToUpdate.id, { ...personToUpdate, number: newNumber})
          .then(response => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : response.data))
          })
      }
    }

    
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const removePerson = id => {
    contactService.remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} changeFunction={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName}
      newNumber={newNumber} handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deleteFunction={removePerson}/>
    </div>
  )

}

export default App