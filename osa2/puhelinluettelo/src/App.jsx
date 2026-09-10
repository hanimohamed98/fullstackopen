import {useState, useEffect} from 'react'
import personService from './services/persons'

const PersonForm = (props) => {
  return (

         <form onSubmit={props.addName}>
        <div>
          name: <input value = {props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input value = {props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Person = (props) => {
  return (
    <p>
      {props.person.name} {props.person.number}
     <button onClick={props.removePerson}>delete</button>
    </p>

    )

}

const Persons = (props) => {
  return (
    <div>
      {props.persons.map(person =>
        <Person key = {person.id} person={person} removePerson = {() => props.removePerson(person.id, person.name)} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


    useEffect (() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

const addName = (event) => {
  event.preventDefault()

  if (persons.some(person =>person.name ===newName)) {
    alert(`${newName} is already added to phonebook`)
    return
  }


  const personObject = {
    name: newName,
    number: newNumber
  }


  personService
  .create(personObject)
  .then(response => {
    setPersons(persons.concat(response.data))
    setNewName('')
    setNewNumber('')
  })

}

const handleNameChange = (event) => {
  setNewName(event.target.value)
  
}

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

const removePerson = (id, name) => {
  if (window.confirm(`Delete ${name}?`)) {
    personService
    .remove(id)
    .then (() => {
      setPersons(persons.filter(person => person.id !==id))
    })
  }
}


return (
    <div>
      <h2>Phonebook</h2>


      <PersonForm 
        
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber ={newNumber}
        handleNumberChange={handleNumberChange}

      />

      <h3>Numbers</h3>

      <Persons persons={persons} removePerson={removePerson}/>
    </div>
  )
}


export default App