import React, { Component } from "react";
import Titles from "./components/Titles";
import Weather from "./components/Weather";
import "./App.css";

import Form from "./components/Form";

const API_KEY = "740df5c4e1922ff2467000128a9bb1a6";

class App extends Component {
  state = {
    place: null,
    city: null,
    country: null,
    description: null,
    humidity: null,
    pressure: null,
    temp: null,
    temp_max: null,
    temp_min: null,
    error: null,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  getWeather = async e => {
    console.clear();
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();
    this.setState({
      city: data.name,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      temp: data.main.temp,
      temp_max: data.main.temp_max,
      temp_min: data.main.temp_min,
      description: data.weather.description,
      country: data.sys.country
    });
    console.log(data);
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temp}
                    temp_min={this.state.temp_min}
                    temp_max={this.state.temp_max}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
