const Persons = ({ list }) => {
    return (
      <ul>
        {list.map(person => (
          <li key={person.key}>
            Name: {person.name} Number: {person.number}
          </li>
        ))}
      </ul>
    );
  };
  
  export default Persons;
  