const Countries = ({ countriesToShow, onShowCountry }) => {
  return (
    <div>
      {countriesToShow.map((country, index) =>
        <div key={index} style={{ marginBottom: '10px' }}>
          {country.name.common} 
          <button 
            onClick={() => onShowCountry(country)}
            style={{ marginLeft: '10px' }}
          >
            show
          </button>
        </div>
      )}
    </div>
  )
}

export default Countries