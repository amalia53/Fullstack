import React, { useEffect, useState } from 'react'
import axios from 'axios'
import List from './components/List'
import Filter from './components/Filter'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState(false)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const shown = filtered
    ? Filter(countries, search)
    : []

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setFiltered(event.target.value.length !== 0)
  }

  return (
    <div>
      Find countries <input
        value={search}
        onChange={handleSearch}
      ></input>
      <p></p>
      {showResults(shown)}
    </div>
  )
}

const showResults = (shown) => {
  if (shown.length > 10) {
    return 'Too many matches, specify another filter'
  }
  else if (shown.length > 1) {
    return shown.map(country =>
      <List key={country.name.common} listItem={country.name.common}></List>)
  }
  else if (shown.length === 1) {
    return <Country key={shown[0].name.common} country={shown[0]}></Country>
  } else {
    return ''
  }
}

export default App;
