const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter show whit <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter