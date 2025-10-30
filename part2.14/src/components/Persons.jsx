const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      {personsToShow.map((person, index) =>
        <div key={index}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>Delete</button></div>
      )}
    </div>
  )
}

export default Persons