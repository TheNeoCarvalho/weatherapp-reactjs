import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Form from "./components/Form";

const API_KEY = "740df5c4e1922ff2467000128a9bb1a6";

class App extends Component {
  state = {
    city: undefined,
    country: undefined,
    description: undefined,
    humidity: undefined,
    pressure: undefined,
    temp: undefined,
    temp_max: undefined,
    temp_min: undefined,
    error: undefined,
    temperature: undefined
  };

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();

    this.setState({
      temperature: data.main.temp,
      temp_max: data.main.temp_max,
      temp_min: data.main.temp_min
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Weather Application</h1>
        </header>
        <div className="App-body">
          <Form getWeather={this.getWeather} />
        </div>
      </div>
    );
  }
}

export default App;

//740df5c4e1922ff2467000128a9bb1a6
