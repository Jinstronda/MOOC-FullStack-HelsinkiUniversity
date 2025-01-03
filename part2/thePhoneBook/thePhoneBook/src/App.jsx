import { useState, useEffect } from 'react'
import Filter from "./components/filter.jsx"
import Persons from "./components/persons.jsx"
import Search from "./components/search.jsx"
import axios from 'axios'
import backEnd from "./services/backend.js"
import backend from './services/backend.js'

const App = () => {
  const [persons, setPersons] = useState([])  // Array que vai ser modificado, no primeiro render eu vou colocar ele igual ao servidor
  const [newName, setNewName] = useState('') // Variaveis do Novo Nome
  const [newNumber,setNewNumber] = useState("") // Varias do numero inicial 
  const [filter,setFilter] = useState("")

  useEffect(()=> {
    console.log("Effect")
    backEnd
      .getAll()
      .then(response=>{
        console.log("Data Fetched")
        setPersons(response)
      })
  },[])

  const addNote = (event) => { // Oque vai acontencer quando o botão for clicado para não dar refresh
    event.preventDefault()
    console.log("Buttom Clicked",event.target)
    if (!persons.map(person => person.name).includes(newName)) { // Bem simples If Statement para não adicionar coisas repetidas


  if (newName === "") {
    window.alert(`${newName} cant be blank`)
  }

  const PersonName = {
    name: newName, // Adicionar ids tava gerando bugs entao vou deixar o server criar eles
    number: newNumber
  }
    backEnd.create(PersonName).then((createdPerson) => {
    setPersons(persons.concat(createdPerson))  
    setNewName("") // Agora tudo fez MUITO mais sentido, newNote vai ser a variavle do que ta sendo escrito na hora e nós vamos resetar ela.
    setNewNumber("") // Basicamente fazemos tudo mas usando a logica do servidor
  })
   
  
} else { 
  window.alert(`${newName} is already added to the phonebook`)
}
}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) // Coloca a variavel newNAME igual ao evento, atualizando ela conforme nós escrevemos
  }

  const handleNumberChange = (event) => {
    console.log("number being written", event.target.value) // Coloca no console os numeros
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log("Current Filter",event.target.value)
    setFilter(event.target.value)
  }

  const listToShow = persons.filter(person =>
    person.name && person.name.toLowerCase().includes((filter || "").toLowerCase())
  );

   const removePerson = (id) => {
      if (window.confirm(`Do you really wanna remove him?`)) {
        backEnd
        .remove(id)
        .then(() => { 
          return backEnd.getAll()
        }
      ).then(updatedPersons => (setPersons([...updatedPersons]))  ) 
      
      
      }

    };

  return (
    <div>

      <form onSubmit = {addNote}>
        <h1>PhoneBook</h1>
        Filter: <Filter value = {filter} handleChange = {handleFilterChange}/> 
        <div>
          <h1>Add a New</h1>
          name: <Search value = {newName} handleChange = {handleNameChange}/> {/* handleNoteChange vai cuidar das mudanças de texto */}
         </div>
         <div>
          Number: <Search  value = {newNumber} handleChange = {handleNumberChange} /> {/* handleNoteChange vai cudar das mudanças de texto */}
         </div>
        <div>
          <button type="submit">add</button>
          
          
        </div>
      </form>
      <h2>Numbers</h2>    
      <Persons list = {listToShow} removeFunction={removePerson} /> 
    </div>
  )
}

export default App