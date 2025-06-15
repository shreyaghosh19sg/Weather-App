const API_KEY = "7ccdbf30f16d4ff19e145358242112"; // Replace with your own WeatherAPI key

const searchBtn = document.getElementById("search-btn");
const currentLocationBtn = document.getElementById("current-location-btn");
const locationInput = document.getElementById("location");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const icon = document.getElementById("icon");
const details = document.getElementById("details");
const weatherInfo = document.getElementById("weather-info");

searchBtn.addEventListener("click", () => {
  const location = locationInput.value.trim();
  if (location) fetchWeather(location);
  else alert("Please enter a valid city name.");
});

currentLocationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => alert("Unable to access location. Please enable location services.")
    );
  } else {
    alert("Geolocation not supported by this browser.");
  }
});

function fetchWeather(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWeather(data))
    .catch(() => alert("❌ Error fetching weather data."));
}

function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWeather(data))
    .catch(() => alert("❌ Unable to fetch weather for your location."));
}

function displayWeather(data) {
  weatherInfo.style.display = "block";
  cityName.textContent = `${data.location.name}, ${data.location.country}`;
  temperature.textContent = `🌡 Temperature: ${data.current.temp_c}°C`;
  condition.textContent = `⛅ Condition: ${data.current.condition.text}`;
  icon.src = `https:${data.current.condition.icon}`;
  details.textContent = `💧 Humidity: ${data.current.humidity}% | 🌬 Wind: ${data.current.wind_kph} km/h`;
}
