const Countries = ({ countriesToShow }) => {
  return (
    <div>
      {countriesToShow.map((country, index) =>
        <div key={index} style={{ marginBottom: '10px' }}>
          {country.name.common} 
        </div>
      )}
    </div>
  )
}

export default Countries