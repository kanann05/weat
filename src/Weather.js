import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



function App() {
  let [input, setInput] = useState(false);
  let [bg, setBg] = useState(null);
  let [iconn, setIcon] = useState(null);
  let nav  = useNavigate();
  let ui = {"01d" : "1", "01n" : "1", "02d" : "1", "02n" : "1", "03d" : "2", "03n" : "2",  "04d" : "3", "04n" : "3", "09d" : "4", "09n" : "4",  "10d" : "4", "10n" : "4", "11d" : "5", "11n" : "5", "13d" : "6", "13n" : "6", "50d" : "7", "50n" : "7" };
  let [details, setDetails] = useState(null);
 
 useEffect(() => {console.log(details)}, [details])
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      let icon = data.weather[0].icon;
      console.log(data.name)
      setDetails(data);
      console.log(details)
      let n = ui[icon];
      console.log(n)
      setBg(`url(${n}_bg.png)`);
      setIcon(`${n}_icon.png`);
      console.log(iconn)

    }
  }, []);

  return (
    <div className="Weather" style = {{ overflow : 'hidden', display : 'flex', alignItems : 'center', justifyContent : 'center', backgroundColor : 'white', backgroundImage : bg , backgroundSize : 'cover', backgroundRepeat : 'no-repeat', height : '100vh', minHeight : '100vh', maxHeight : '100vh', width : '100vw', minWidth : '100vw', maxWidth : '100vw'}}> 
      <div style = {{position : 'absolute', left : '35px', top : '20px', border : '1px solid black', padding : '5px 10px', borderRadius : '5px'}} onClick={() => {nav("/")}}>Back</div>
      <div className = "cont" style = {{borderRadius : '10px', display : 'flex', flexDirection : 'row',  backgroundColor : "rgba(0, 0, 0, 0.7)", width : 'fit-content', height : 'fit-content', padding : '50px 50px'}}>
        <div className = "details-wrapper" style = {{width : '450px'}}>
          <h1>{details ? (details.name + ", " + details.sys.country): ""}</h1>
          <h2 style = {{color : "#FFBEBE"}}>Brief</h2>
          <h3>Temperature : <span style = {{fontWeight : '400', color : '#FFBEBE'}}>{details ? (details.main.temp-273.15).toFixed(1) + " °C" : ""} <span style = {{color : 'white'}}>feels like</span> {details ?(details.main.feels_like -273.15).toFixed(1)+ " °C" : ""} </span></h3>
          <div style = {{display : 'flex', flexDirection : 'row', justifyContent : 'start', gap : '70px', marginBottom : '20px'}}>
            <h3>Humidity : <span style = {{fontWeight : '400', color : '#FFBEBE'}}>{details ? details.main.humidity + "%" : ""}</span></h3>
            <h3>Pressure : <span style = {{fontWeight : '400', color : '#FFBEBE'}}>{details ? details.main.pressure  + " hPa" : ""}</span></h3>

          </div>

          <h2 style = {{color : "#D7F1FF"}}>Wind</h2>
          <div style = {{display : 'flex', flexDirection : 'row', justifyContent : 'start', gap : '70px', marginBottom : '20px'}}>
            <h3>Speed : <span style = {{fontWeight : '400', color : '#D7F1FF'}}>{details ? details.wind.speed + " m/s": ""}</span></h3>
            <h3>Degree : <span style = {{fontWeight : '400', color : '#D7F1FF'}}>{details ? details.wind.deg + " deg" : ""}</span></h3>

          </div>

          <h2 style = {{color : "#FFF4BC"}}>Levels</h2>
          <div style = {{display : 'flex', flexDirection : 'row', justifyContent : 'start', gap : '70px', width : '500'}}>
            <h3>Sea Level : <span style = {{fontWeight : '400', color : '#FFF4BC'}}>{details ? details.main.sea_level + " m/s": ""}</span></h3>
            <h3>Ground Level : <span style = {{fontWeight : '400', color : '#FFF4BC'}}>{details ? details.main.grnd_level + " m/s": ""}</span></h3>

          </div>
        </div>
        <div className = "icon-wrapper" style = {{width : '90px', height : 'fit-content', aspectRatio: '1/1', padding : '10px 10px', justifyContent : 'center', alignItems : 'center',borderRadius : '7px'}}>
          <img src = {iconn} style = {{borderRadius : '4px', width : '80px', aspectRatio : '1/1', backgroundColor : 'rgba(255, 255, 255, 0.8)', padding : '10px 10px'}}/>
          <h2 style = {{textAlign : 'center',fontSize : '20px', color : 'rgba(255, 255, 255, 0.9)'}}>{details ? details.weather[0].description : ""}</h2>
        </div>

      </div>
    </div>
  );
}

export default App;
