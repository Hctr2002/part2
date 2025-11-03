const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      
      <div>
        <strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}
      </div>
      
      <div>
        <strong>Area:</strong> {country.area.toLocaleString()} km²
      </div>
      
      <div>
        <strong>Languages:</strong>
        <ul>
          {Object.values(country.languages || {}).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.name.common}`}
          style={{ width: '200px', height: 'auto', border: '1px solid #ccc' }}
        />
      </div>
    </div>
  )
}

export default CountryDetails