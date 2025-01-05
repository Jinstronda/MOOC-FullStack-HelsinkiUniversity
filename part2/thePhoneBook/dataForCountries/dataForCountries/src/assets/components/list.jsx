import { useState,useEffect } from 'react'

const List = ({listValues}) => {

    const [selectedCountry,setSelectedCountry] = useState("")
    const [show,setShow] = useState(null)
    if (listValues.length > 10) {
        return <div>Too many matches, specify another filter</div> } 
    if  (1 < listValues.length && listValues.length < 10) {
        return (
            <div>
            <ul>
              {listValues.map((countries, index) => (
                <li key={index}>
                  {countries.name.common}
                  <button onClick={() => setSelectedCountry(countries)}>Show</button>
                </li>
              ))}
            </ul>
            {selectedCountry && (
              <div>
                <h1>{selectedCountry.name.common}</h1>
                <p>Capital: {selectedCountry.capital}</p>
                <p>Area: {selectedCountry.area}</p>
                <h1>Languages:</h1>
                <ul>
                  {Object.values(selectedCountry.languages).map((language, langIndex) => (
                    <li key={langIndex}>{language}</li>
                  ))}
                </ul>
                <img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt} />
              </div>
            )}
          </div>
            )
        
        }
    if (listValues.length === 1) {
        return (
        <div>
            <h1>{listValues.map(country => country.name.common)}</h1>
            <p>Capital: {listValues.map(country=> country.capital)}</p>
            <p>Area: {listValues.map(country=> country.area)}</p>
            <h1>Languages:</h1>
            <ul>
                {listValues.map(countries =>  Object.values(countries.languages).map(language => ( <li>{language}</li> ))) }
            </ul>
            <img src= {listValues.map(country=> country.flags.png)} alt = {listValues.map(country=> country.flags.alt)}/>

        </div>
    )}

    }



export default List 
    


