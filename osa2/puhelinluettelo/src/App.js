import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import contactService from './services/contacts'

const App = () => {
  const [ persons, setPersons] =  useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ messageType, setMessageType ] = useState(null)

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

    if (persons.map(person => person.name.toLowerCase()).indexOf(newName.toLowerCase()) === -1) {
      contactService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setMessage(`Successfully added ${newName}`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
        }, 2000)
        })
        .catch(error => {
          setMessage(error.response.data.error)
          setMessageType('error')
          setTimeout(() =>{
            setMessage(null)
            setMessageType(null)
          }, 2000)
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        contactService
          .update(personToUpdate.id, { name: newName, number: newNumber})
          .then(response => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : response.data))
            setMessage(`Successfully updated ${newName}'s number`)
            setMessageType('success')
            setTimeout(() => {
              setMessage(null)
              setMessageType(null)
            }, 2000)
          })
          .catch(error => {
            if (error.response.data.error === "Validation failed: name: Cannot read property 'ownerDocument' of null") {
              setMessage(`Information of ${newName} has already been removed from server`)
              setPersons(persons.filter(p => p.id !== personToUpdate.id))
            } else {
              setMessage(error.response.data.error)
            }
            setMessageType('error')
            setTimeout(() => {
              setMessage(null)
              setMessageType(null)
            }, 2000)
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
    const personToRemove = persons.find(p => p.id === id)
    contactService.remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage(`Successfully removed ${personToRemove.name}`)
        setMessageType('success')
        setTimeout(() => {
        setMessage(null)
        setMessageType(null)
        }, 2000)
      })
      .catch(error => {
         setMessage(`Information of ${personToRemove.name} has already been removed from server`)
         setPersons(persons.filter(p => p.id !== personToRemove.id))
         setMessageType('error')
         setTimeout(() => {
           setMessage(null)
           setMessageType(null)
            }, 2000)
          })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={messageType} />
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