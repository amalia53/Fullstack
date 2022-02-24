import React from 'react'
import List from './List'

const Country = ({ country }) => {
  const languages = Object.values(country.languages)
  return (
    <>
      <h2>{country.name.common}</h2>
      <li>Capital: {country.capital}</li>
      <li>Area: {country.area}</li>
      <p><b>Languages:</b></p>
      {console.log('languages:', Object.keys(country.languages))}
      {languages.map(language => <List key={language} listItem={language}></List>)}
      <p></p>
      <img src={country.flags.png} alt='Flag'></img>
    </>
  )
}

export default Country