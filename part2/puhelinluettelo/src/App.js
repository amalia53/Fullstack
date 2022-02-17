import { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import NewPerson from './components/NewPerson'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1231244'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState(false)

  const shown = filtered
    ? Filter(persons, search)
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(NewPerson(newName, newNumber)))
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
        <Person key={person.name} name={person.name} number={person.number}></Person>)}
    </div>
  )
}

export default App