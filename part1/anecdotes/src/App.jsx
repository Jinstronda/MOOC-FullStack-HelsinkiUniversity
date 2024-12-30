import { useState } from 'react'

const Button = ({text,onClick}) => {
  return <button onClick = {onClick}>{text}</button>
}
const Text = ({text,points}) => {
  return <p>{text}{points}</p>
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [values,setValues] = useState(new Array(anecdotes.length).fill(0))

  const randomClick = () => {
    
    setSelected(Math.floor(Math.random()*anecdotes.length))
    console.log(selected)
  }
  const increasePoints = () => {
    const newSetValues = [...values] 
    newSetValues[selected] += 1 
    setValues(newSetValues)
    console.log(values)
  }

  const maxVotesIndex = values.indexOf(Math.max(...values));
  
  return (
    <div>
      <h1>Anedocte of the Data:</h1>
      {anecdotes[selected]}
      <Text text = "Points:" points = {values[selected]}/>
      <Button text = "next Anecdote" onClick = {randomClick} />
      <Button text = "Vote" onClick={increasePoints}/> 
      <h1> Anedocte with the most votes</h1>
      {anecdotes[maxVotesIndex]}
    </div>
  )
}

export default App
