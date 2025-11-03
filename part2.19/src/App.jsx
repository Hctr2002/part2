import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import Countries from './components/Countries.jsx'
import CountryDetails from './components/CountryDetails.jsx'
import countryService from './services/countries.js'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)


  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries)
    })
  }, [])

  const filteredCountries = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : []

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  const renderContent = () => {
    if (!filter) {
      return null
    }

    if (filteredCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>
    }

    if (filteredCountries.length === 0) {
      return <div>No countries found</div>
    }

    if (selectedCountry) {
      return (
        <div>
          <button onClick={() => setSelectedCountry(null)} style={{ marginBottom: '20px' }}>
            Back to list
          </button>
          <CountryDetails country={selectedCountry} />
        </div>
      )
    }

    if (filteredCountries.length === 1) {
      return <CountryDetails country={filteredCountries[0]} />
    }

    return <Countries countriesToShow={filteredCountries} onShowCountry={handleShowCountry}/>
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      {renderContent()}
    </div>
  )
}

export default App