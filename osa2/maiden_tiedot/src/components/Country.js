import React from 'react'
import Weather from './Weather'

const Country = ({country}) => {
	return (
	  <>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <ul>
          {country.languages.map((language)=> <li key={language.iso639_1}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt="flag" height="80px"/>
        <Weather capital={country.capital} />
      </>
    )
}

export default Country