import App from './App';
import { getTemperature } from './App';
import { render, fireEvent, waitFor } from '@testing-library/react';
import dotenv from 'dotenv';

dotenv.config()

describe('getTemperature', () => {
    it('should convert the temperature from Kelvin to Celsius', () => {
        const temp = 300; // 27°C
        const unit = 'metric';
        const expected = '27°C';
        const result = getTemperature(temp, unit);
        expect(result).toEqual(expected);
    });

    it('should convert the temperature from Kelvin to Fahrenheit', () => {
        const temp = 300; // 80.6°F
        const unit = 'imperial';
        const expected = '80.6°F';
        const result = getTemperature(temp, unit);
        expect(result).toEqual(expected);
    });
});



describe('handleSubmit', () => {
    it('should make an API request and update the state with the weather data', async () => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const city = 'New York';
        const temperature = 15;

        const mockData = {
            name: city,
            main: {
                temp: temperature,
            },
        };

        // Mock the `fetch` function to return a fake response
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            })
        );

        const { getByLabelText, getByText, getByTestId } = render(<App />);
        const input = getByLabelText('City:');
        const submitButton = getByText('Get Weather');

        fireEvent.change(input, { target: { value: city } });
        fireEvent.click(submitButton);

        // Wait for the API response to be processed
        const weatherData = await waitFor(() => getByTestId('weather-data'));

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        expect(weatherData).toHaveTextContent(city);
        expect(weatherData).toHaveTextContent(`${temperature}°C`);
    });
});