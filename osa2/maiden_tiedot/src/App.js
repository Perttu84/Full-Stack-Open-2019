import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries] =  useState([])
  const [ filter, setFilter ] = useState('')

    useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
    }, [])

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

 const handleCountrySelection = (event) => {
    setFilter(event.target.value)
 }
  return (
    <>
    <div>find countries <input value={filter} onChange={handleFilterChange}></input></div>
    <Countries countries={countriesToShow} countrySelectionFunction={handleCountrySelection} />
    </>
  )
}
export default App;
