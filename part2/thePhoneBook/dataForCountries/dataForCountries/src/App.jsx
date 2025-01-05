import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Search from "../src/assets/components/search"
import List from "../src/assets/components/list" 
const App = () => {

  const [info, setInfo] = useState(null)
  const [countryName, setCountryName] = useState("")


  useEffect(()=> {
    
    if (!info) {
      console.log("Updating Countries")
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then(response => {console.log(response.data); setInfo(response.data)})
        

    }
  },[])

  const updateSearch = (event) => {
    setCountryName(event.target.value)
    console.log(filteredList)

  }

  const filteredList = info 
  ? info.filter(item => item.name.common.includes(countryName)) 
  : [];
  
return (
  <div>
    Find Countries
     <Search handleChange = {updateSearch} value = {countryName}/> 
     <List listValues = {filteredList}/>


  </div>

)




} 


export default App