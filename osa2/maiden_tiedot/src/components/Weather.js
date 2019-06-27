import React ,{ useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState({current: {temp_c: '', wind_kph: '', wind_dir: '', condition: {icon: '', text: ''}}})
	useEffect(() => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=8b0b7389d44749cdad8201314192706&q=${capital}`)
      .then(response => {
        setWeather(response.data)
      })
    }, [capital])
    return (
     <>
      <h2>Weather in {capital}</h2>
      <div><strong>temperature:</strong> {weather.current.temp_c} Celsius</div>
      <img src={weather.current.condition.icon} alt={weather.current.condition.text}></img>
      <div><strong>wind: </strong>{weather.current.wind_kph} kph direction {weather.current.wind_dir}</div>
     </>
    )
}

export default Weather