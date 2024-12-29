import { useState } from 'react'

const Button = ({onClick,text}) => {
  return <button onClick={onClick} > {text} </button>

}

const Stats = ({text,number,percentage}) => {
  return <p>{text} {number}{percentage}</p>
}



const Statistics = ({average,percentage,good,bad,neutral}) => {

  return (
    <div>
      <h1>Statistics</h1>
      <Stats text = "good" number = {good}/> 
      <Stats text = "neutral" number = {neutral}/>
      <Stats text = "bad" number = {bad}/> 
      <Stats text = "All" number = {good+bad+neutral}/> 
      <Stats text = "Average" number = {average}/> 
      <Stats text = "Percentage" number = {percentage} percentage = "%"/> 
      

    </div>
  )

}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks,setAll] = useState([])
  const average = allClicks.length > 0 ? (good - bad) / allClicks.length : 0 
  const percentage = allClicks.length > 0 ? (good / allClicks.length) * 100 : 0 
  const increaseGood = () => {
    setGood(good+1)
    setAll(allClicks.concat(1))

    
  }
  const increaseNeutral = () => {
    setNeutral(neutral+1)
    setAll(allClicks.concat(0))
    
  }
  const increasebad = () => {
    setBad(bad+1)
    setAll(allClicks.concat(-1))
    
  }

  

  return (
    <div>
      <h1>Give Feedback</h1>
      <div></div>
      <Button onClick = {increaseGood} text = "Good" />
      <Button onClick = {increaseNeutral} text = "Neutral" />
      <Button onClick = {increasebad} text = "Bad" />
      {allClicks.length > 0 ? <Statistics good = {good} bad = {bad} neutral = {neutral} percentage = {percentage} average = {average}/> : <h2>No Feedback Given</h2>}
      

    </div>
  )
}

export default App