import { useState } from 'react'
import Filter from "./components/filter.jsx"
import Persons from "./components/persons.jsx"
import Search from "./components/search.jsx"

const App = () => {
  const [persons, setPersons] = useState([ // Array que vai ser modificado com os nomes
    { name: 'Arto Hellas', key: 1, number: "040-1234567"} ,
    { name: 'Ada Lovelace', number: '39-44-5323523', key: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', key: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', key: 4 }
  ]) 
  const [newName, setNewName] = useState('') // Variaveis do Novo Nome
  const [newNumber,setNewNumber] = useState("") // Varias do numero inicial 
  const [filter,setFilter] = useState("")

  const addNote = (event) => { // Oque vai acontencer quando o botão for clicado para não dar refresh
    event.preventDefault()
    console.log("Buttom Clicked",event.target)
    if (!persons.map(person => person.name).includes(newName)) { // Bem simples If Statement para não adicionar coisas repetidas

    const PersonName = {
      name: newName,
      key: persons.length + 1, // Key adiciona para lista funcionar de maneira melhor.
      number: newNumber
    }
    setPersons(persons.concat(PersonName)) // Vamos criar uma nova lista e transformar persons na lista atualizada
    setNewName("") // Agora tudo fez MUITO mais sentido, newNote vai ser a variavle do que ta sendo escrito na hora e nós vamos resetar ela.
    setNewNumber("")
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

  const listToShow =  persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
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
      <Persons list = {listToShow} /> 
    </div>
  )
}

export default App