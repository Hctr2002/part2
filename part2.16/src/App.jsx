import { useState, useEffect } from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import personService from './services/persons.js'
import Notification from './components/Notification.jsx'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService.getAll().then((initialPersons) => {
      console.log('promise fulfilled')
      setPersons(initialPersons)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPersonAndNumber = (event, name, number) => {
    event.preventDefault()
    
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService.putPerson(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          setNotification(`Updated ${name}'s number`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
      }
      return
    }
    if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    const personObject = {
      name: name,
      number: number
    }
    
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    
    setNotification(`Added ${name}`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addPersonAndNumber={addPersonAndNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App