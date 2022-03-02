import { useEffect, useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import NewPerson from './components/NewPerson'
import numberService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState(false)

  const url = 'http://localhost:3001/persons'


  useEffect(() => {
    numberService
      .getAll()
      .then(initialPersons => { setPersons(initialPersons) })
  }, [])

  const shown = filtered
    ? Filter(persons, search)
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      const person = persons.filter(person => person.name === newName)[0]
      updateNumber(person, newNumber)
    } else {
      numberService
        .add(NewPerson(newName, newNumber))
        .then(newPerson => setPersons(persons.concat(newPerson)))
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id, name) => {
    window.confirm(`Are you sure you want to delete ${name}?`)
    numberService
      .remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
  }

  const updateNumber = (person, newNumber) => {
    const newPerson = { ...person, number: newNumber }
    window.confirm(`${person.name} is already added to phonebook. Do you want to replace the old number with a new one?`)
    
    numberService
      .update(person.id, newPerson)
      .then(setPersons(persons.map(person =>
        newPerson.id !== person.id
          ? person
          : newPerson
      )))
      .catch(error => alert(`${person.name} was already deleted from server`))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    const searchInput = event.target.value
    setSearch(searchInput)
    setFiltered(searchInput.length !== 0)
  }

  return (
    <div>
      <h3>Phonebook</h3>
      <div>
        Search for <input
          value={search}
          onChange={handleSearch}
        />
      </div>
      <h2>Add a new entry</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
          <p></p>
          phone number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <p></p>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {shown.map(person =>
        <Person key={person.name} name={person.name} number={person.number} deletePerson={() => deletePerson(person.id, person.name)}></Person>)}
    </div>
  )
}

export default App