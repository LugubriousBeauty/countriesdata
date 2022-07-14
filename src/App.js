import { useState, useEffect } from 'react';
import axios from 'axios'


function ShowCountries(props) {
  if(props.countries.length <= 10 && props.countries.length > 1) {
      const newArray = props.countries.map(c => {
      return {name: c.name.common}
    })
    console.log(newArray)
    return (
      <ul>
        {newArray.map(c => 
          <li key={c.name}>{c.name}</li>
        )}
      </ul>
    )
  } else if(props.countries.length === 1) {
      const languages = Object.values(props.countries[0].languages)
      return (
        <div>
          <h1>
            {props.countries[0].name.common}
          </h1>
          <p>capital {props.countries[0].capital[0]}</p>
          <span>area {props.countries[0].area}</span>
          <h3>languages:</h3>
          <ul>
            {languages.map(l => 
              <li key={l}>{l}</li>)}
          </ul>
          <div>
            <img src={props.countries[0].flags.png}/>
          </div>
        </div>
      )
  }
}


function App() {
  const [countries, setCountries] = useState([])
  const [input, setInput] = useState('')
  const handleInput = (event) => {
    setInput(event.target.value)
  }
  
  const searchCountries = (event) => {
    event.preventDefault()
    axios
      .get(`https://restcountries.com/v3.1/name/${input}`)
      .then(response => {
        console.log(response.data)
        if(response.data.length > 10)
          return alert('too many matches, specify another filter')
        setCountries(response.data)
    })
  }


  return (
    <div>
      <form onSubmit={searchCountries}>
        <span>find countries  </span>
        <input value={input} onChange={handleInput}></input>
      </form>
      <ShowCountries countries={countries}/>
    </div>
  );
}

export default App;