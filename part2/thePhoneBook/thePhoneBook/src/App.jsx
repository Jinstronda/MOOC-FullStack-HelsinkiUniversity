import { useState, useEffect } from 'react'
import Filter from "./components/filter.jsx"
import Persons from "./components/persons.jsx"
import Search from "./components/search.jsx"
import backEnd from "./services/backend.js"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null)
  const [displayName,setDisplay] = useState("") // Mais complicado do que deveria ser mas ok, ja entendi
  
  const Notification = ({name}) => {
    const green = {
      color: "green",
      background: "lightgrey",
      fontStyle: "Italic",
      fontSize: 20,
      borderStyle: "solid", 
      borderRadius: 5, 
      padding: 10,
      marginBottom: 10 


    }

    if (message === null) {
      return null 

    
    }
    return (
      <div style = {green}>Congrats you added {name} to the list!</div>
    )

  }
  useEffect(() => {
    
    backEnd
      .getAll()
      .then(response => {
        
        setPersons(response);
      });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    console.log("Button Clicked", event.target);

    if (!persons.map(person => person.name).includes(newName)) {
      if (newName === "") {
        window.alert(`${newName} can't be blank`);
        return; // Exit early so we don't create a blank entry
      }

      const PersonName = {
        name: newName,
        number: newNumber
      };
      
      backEnd.create(PersonName).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setDisplay(newName)
        setMessage("Lets go!")
        setTimeout(() => { setMessage(null)},5000)
        setNewName("");
        setNewNumber("");
      });

     

    } else {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const personToReplace = persons.find(p => p.name === newName);
        if (!personToReplace) return;
        
        const updatedData = {
          ...personToReplace,
          number: newNumber
        };
        console.log("Updating ID:", updatedData.id);
        backEnd.update(personToReplace.id, updatedData)
          .then((returnedPerson) => {
            setPersons(
              persons.map(p => p.id === personToReplace.id ? returnedPerson : p)
            );
            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            console.error("Error updating person:", error);
          });
      }
    }
  };

  const handleNameChange = (event) => {
    
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
   
    setFilter(event.target.value);
  };

  const listToShow = persons.filter(person =>
    person.name && person.name.toLowerCase().includes((filter || "").toLowerCase())
  );

  const removePerson = (id) => {
    if (window.confirm(`Do you really want to remove this person?`)) {
      backEnd.remove(id)
        .then(() => backEnd.getAll())
        .then(updatedPersons => setPersons(updatedPersons))
        .catch(error => console.error("Remove failed:", error));
    }
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <h1>PhoneBook</h1>
        <Notification name = {displayName}/>
        Filter: <Filter value={filter} handleChange={handleFilterChange} />
        <div>
          <h1>Add a New</h1>
          name:
          <Search value={newName} handleChange={handleNameChange} />
        </div>
        <div>
          Number:
          <Search value={newNumber} handleChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons list={listToShow} removeFunction={removePerson} />
    </div>
  );
};

export default App;
