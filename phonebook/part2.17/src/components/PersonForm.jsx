const PersonForm = ({ addPersonAndNumber, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={event => addPersonAndNumber(event, newName, newNumber)}>
      <div>name: <input value={newName} onChange={handleNameChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm