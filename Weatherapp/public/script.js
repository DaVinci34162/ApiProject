// Global variable to store the original forecast data
let originalForecastData = [];

function getWeather() {
    const apiKey = 'cebed6f7150905c2feb5cb17813edb1d';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            originalForecastData = data.list; // Store original data
            applyFilter(); // Apply any existing filters
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function applyFilter() {
    const minTemp = parseFloat(document.getElementById('min-temp').value);
    const maxTemp = parseFloat(document.getElementById('max-temp').value);
    
    let filteredData = [...originalForecastData]; // Create a copy of original data

    // Apply temperature filters if values are provided
    if (!isNaN(minTemp)) {
        filteredData = filteredData.filter(item => {
            const temp = item.main.temp - 273.15; // Convert to Celsius
            return temp >= minTemp;
        });
    }

    if (!isNaN(maxTemp)) {
        filteredData = filteredData.filter(item => {
            const temp = item.main.temp - 273.15; // Convert to Celsius
            return temp <= maxTemp;
        });
    }

    displayHourlyForecast(filteredData);
}

// Update displayHourlyForecast to handle empty results
function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = '';

    if (hourlyData.length === 0) {
        hourlyForecastDiv.innerHTML = '<p class="no-results">No hourly data matches your filters</p>';
        return;
    }

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

// Rest of your existing functions remain the same...
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}
