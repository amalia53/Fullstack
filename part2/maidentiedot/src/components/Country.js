import React, { useEffect, useState } from 'react'
import axios from 'axios'
import List from './List'

const Country = ({ country }) => {
  const [coord, setCoord] = useState([])
  const [weather, setWeather] = useState([])
  const languages = Object.values(country.languages)
  const capital = country.capital[0]

  const coordUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + capital + '&limit=1&appid=' + process.env.REACT_APP_APPID

  useEffect(() => {
    axios
      .get(coordUrl)
      .then(response => {
        setCoord({ lat: response.data[0].lat, long: response.data[0].lon })
      })
  }, [])

  const weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + coord.lat + '&lon=' + coord.long + '&exclude=hourly,daily&appid=' + process.env.REACT_APP_APPID + '&units=metric'

  useEffect(() => {

    if (coord.lat !== undefined) {
      axios
        .get(weatherUrl)
        .then(response => {
          setWeather({ temperature: response.data.current.temp, wind: response.data.current.wind_speed, icon: 'http://openweathermap.org/img/wn/' + response.data.current.weather[0].icon + '@2x.png' })
        })
    }
  }, [coord])


  return (
    <>
      <h2>{country.name.common}</h2>
      <li>Capital: {capital}</li>
      <li>Area: {country.area}</li>
      <p><b>Languages:</b></p>
      {languages.map(language => <List key={language} listItem={language}></List>)}
      <p></p>
      <img src={country.flags.png} alt='Flag'></img>
      <h3>Weather in {capital}</h3>
      Temperature is {weather.temperature} celcius
      <p></p>
      <img src={weather.icon}></img>
      <p>Wind {weather.wind} m/s</p>
    </>
  )
}

export default Country