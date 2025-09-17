import { useEffect, useState } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_OWM_KEY

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.isFound) {
    return <p>not found...</p>
  }

  return (
    <div>
      <h2>{country.data.name.official}</h2>
      <p>population: {country.data.population}</p>
      <p>capital: {country.data.capital}</p>
    </div>
  )
}

const Weather = ({ weather }) => {
  if (!weather) {
    return null
  } else
    return (
      <>
        <strong> Weather </strong>
        <p> Temperature: {(parseFloat(weather.main.temp) - 273.15).toFixed(1)} °C </p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p> Wind: {weather.wind.speed} m/s </p>
      </>
    )
}

const useField = type => {
  const [value, setValue] = useState('')
  const onChange = e => setValue(e.target.value)
  return [{ type, value, onChange }, setValue]
}

const useQuery = (activeSearch, url, initialResource) => {
  const [resource, setResource] = useState(initialResource)
  useEffect(() => {
    // console.log('--App: fetching from ', url)
    axios
      .get(url)
      .then(response => {
        // console.log('--App: fetch successful: ', response.data)
        setResource({
          isFound: true,
          data: response.data,
        })
      })
      .catch(error => {
        // console.log('--App: fetch unsuccesful, error: ', error.response.statusText)
        setResource(initialResource)
      })
  }, [activeSearch])
  return resource
}

const App = () => {
  const [search, setSearch] = useField('text')
  const [activeSearch, setActiveSearch] = useState('')

  const handleSearchSubmit = event => {
    event.preventDefault()
    setActiveSearch(search.value)
    setSearch('')
  }

  const country = useQuery(activeSearch, `https://studies.cs.helsinki.fi/restcountries/api/name/${activeSearch}`, {
    isFound: false,
    data: null,
  })

  const weatherURL = country.data 
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${country.data.latlng[0]}&lon=${country.data.latlng[1]}&exclude=hourly,daily,minutely,alerts&appid=${api_key}` 
    : 'https://api.openweathermap.org/data/2.5/weather?'
  const weather = useQuery(country, weatherURL, {
    isFound: false,
    data: null,
  })

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <input {...search} />
        <button>find</button>
      </form>
      <Country country={country} />
      <Weather weather={weather.data} />
    </>
  )
}

export default App
