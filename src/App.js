import { useState, useEffect } from 'react'
import Loading from './components/Loading'
function App() {


  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(true)
  const [value, setValue] = useState('dharan')


  useEffect(() => {
    fetchWeather()
    // eslint-disable-next-line 
  }, [])


  const fetchWeather = async () => {
    setLoading(true)
    try {
      let response = await fetch(`/.netlify/functions/fetch-weather?value=${value}`)

      setWeather(await response.json())

    } catch (error) {
      console.log('Unable to extract the data')
    }
    setLoading(false)
  }


  const handleSearch = () => {
    fetchWeather()
  }



  return (
    <div>

      <div className="weather-wrapper">
        <h1 className="header-weather">Weather App</h1>
        <div className="input">
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="boxes">
          {
            loading ? <Loading /> :
              weather.cod + "" === "200" ?
                <><p className="latitude">Latitude: {weather.coord.lat}</p><p className="longitude">Longitude: {weather.coord.lon}</p><h4>{weather.name} <br /> ({weather.weather[0].main})</h4><div className="weather-img-and-temp">
                  <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather-icon" />
                  <div className="temp">
                    <h1>{(weather.main.temp - 273.15).toFixed(0)}°C</h1>
                  </div>
                </div><p>Feels like {(weather.main.feels_like - 273.15).toFixed(0)}°C, {weather.weather[0].description}</p><p>Pressure: {weather.main.pressure} pa</p><p>WindSpeed: {weather.wind.speed} km/h</p><p className="sunrise">Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p><p className="sunset">Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p></>
                :
                <h1>No Results Found </h1>
          }
        </div>


      </div>
    </div>

  );
}

export default App;
