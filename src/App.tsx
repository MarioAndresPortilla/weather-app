import React, { useState } from 'react';
import './styles.css';

type WeatherData = {
    city: string;
    temperature: number;
}
function WeatherApp ({}: any ) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [city, setCity] = useState('');
    const [unit, setUnit] = useState("metric");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`);
        console.log(response);
        const data = await response.json();

        setWeather({
            city: data.name,
            temperature: Math.round(data.main.temp)
        });
    }
    function getTemperature(temp: number) {
        if (unit === "imperial") {
            const fahrenheit = (temp - 273.15) * 9/5 + 32;
            return fahrenheit.toFixed(1) + "°F";
        } else {
            const celsius = temp - 273.15;
            return celsius.toFixed(1) + "°C";
        }
    }

    return (
        <div className="container">
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    City:
                    <input data-testid="weather-data" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </label>
                <label>
                    Temperature Unit:
                    <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                        <option value="metric">Celsius</option>
                        <option value="imperial">Fahrenheit</option>
                    </select>
                </label>
                <button type="submit">Get Weather</button>
            </form>
            {weather ? (
                <div className="weather-data">
                    <p>{weather.city}</p>
                    <p>{getTemperature(weather.temperature)}</p>
                </div>
            ) : (
                <p>Enter a city to get the weather.</p>
            )}
        </div>
    );
}

export default WeatherApp;