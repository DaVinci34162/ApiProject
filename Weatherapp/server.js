require('dotenv').config(); 
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

const API_KEY = process.env.OPENWEATHERMAP_API_KEY; 

if (!API_KEY) {
    console.error('Error: Missing OPENWEATHERMAP_API_KEY in .env file');
    process.exit(1); 
}

app.use(express.json());
app.use(express.static('public')); 

// Endpoint to fetch weather data by city
app.get('/weather', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    try {
        const response = await axios.get(weatherUrl);
        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'City not found' });
        } else {
            console.error('Error fetching weather data:', error);
            res.status(500).json({ error: 'Failed to fetch weather data' });
        }
    }
});

// Endpoint to fetch forecast data by city
app.get('/forecast', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

    try {
        const response = await axios.get(forecastUrl);
        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'City not found' });
        } else {
            console.error('Error fetching forecast data:', error);
            res.status(500).json({ error: 'Failed to fetch forecast data' });
        }
    }
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
