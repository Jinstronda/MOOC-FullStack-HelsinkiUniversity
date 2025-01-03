import backEnd from "../services/backend.js"
const Persons = ({ list, removeFunction}) => {
    return (
      <ul>
        {list.map(person => (
          <li key={person.id}> 
            Name: {person.name} Number: {person.number} <button onClick= {() => removeFunction(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };
  
  
  


  
  export default Persons;
  