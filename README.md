# Weather App 🌦️

This Weather App is a simple web application that allows users to search for real-time weather conditions and a short-term hourly forecast for any city around the world using the OpenWeatherMap API.

# 🚀 Features

- Search weather by city
- Display weather icon, temperature, and details
- Filter by minimum and maximum temperature
- Responsive and clean UI
- Real-time data from OpenWeatherMap API
- Load-balanced deployment on multiple servers

---

# 🛠️ Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **API:** [OpenWeatherMap](https://openweathermap.org/)
- **Load Balancer:** Nginx
- **Deployment:** Ubuntu instances on AWS

# 📦 Installation (Local Development)

# Prerequisites

- Node.js installed (`v18+`)
- An API key from [OpenWeatherMap](https://openweathermap.org/api)

# 📁 Project Structure
WeatherApp/ ├── public/ │ ├── index.html # HTML layout │ ├── style.css # App styling │ └── script.js # Frontend JavaScript to handle API calls ├── .gitignore # Ignoring sensitive and unnecessary files ├── .env # API key (NOT uploaded to GitHub) ├── package.json # Dependencies and scripts ├── package-lock.json # Lock file for exact package versions ├── server.js # Node.js + Express backend server └── README.md #
