import './App.css';
import Weather from './Weather.js'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cities from './cities_list.json';


function HomeSearch( {setInput} ) {
  let nav = useNavigate();
  let [inp, setInp] = useState("");
  let [locArr, setLocArr] = useState([]);

  function DropDown({ city })   {
    return <div onClick = {() => {setInp(city); }}style={{ padding: "5px", cursor: "pointer", color: "white" }}>{city}</div>;
  }
 

  useEffect(() => {
    if (inp.trim() === "") {
      setLocArr([]);
    } else if(cities.find(c => c.name === inp)) {
      setLocArr([]);
    } else {
      setLocArr(cities.filter(c => c.name.toLowerCase().includes(inp.toLowerCase())));
    }
  }, [inp]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#202020' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '25px' }}>
        <input 
          value={inp} 
          onChange={(e) => setInp(e.target.value)}
          className="input-home" 
          placeholder="City name/coords/zip"
          style={{ padding: '10px', width: '250px', borderRadius: '5px' }}
        />
        {locArr.length > 0 ? (
          <div style={{ backgroundColor: '#333', borderRadius: '5px', padding: '10px', width: '250px' }}>
            {locArr.slice(0, 5).map((e, i) => (
              <DropDown key={i} city={e.name} />
            ))}
          </div>
        ) : (null)}

        <button className="button-home" onClick = {async () => {
          let city_check = cities.find(c => c.name === inp.trim());
          if(!city_check) {alert('Enter a valid city name.'); return;}
          try {
            const getReq  = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inp.trim().toLowerCase()}&appid=6e0ec8fc3aa004939b5abb43acc9bd24`);
            // console.log(getReq);
            console.log(getReq.data.weather[0]);
            localStorage.setItem('data', JSON.stringify(getReq.data))
            setInput(true);
            nav("/weather");

          }
          catch {
            console.log("error occured while fetching")
          }
        }}>Get Weather</button>
      </div>
    </div>
  );
}

function App() {
  let [input, setInput] = useState(false)
  return (
    <div className="App" style = {{height : '100vh', minHeight : '100vh', maxHeight : '100vh', width : '100vw', minWidth : '100vw', maxWidth : '100vw'}}> 
      <Router>
        <Routes>
          <Route exact path = "/" element = {<HomeSearch setInput = {setInput}/>}/>
          <Route exact path = "weather" element = {input ? <Weather/> :  <Navigate to = "/" /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
