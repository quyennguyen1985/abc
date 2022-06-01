let updateDate = document.querySelector(".time");
let now = new Date();
let hour = now.getHours();
let min = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
updateDate.innerHTML = `${day} ${hour}:${min}`;

function changeCity(search) {
  search.preventDefault();
  let searchPlace = document.querySelector("#afterCity");
  let currentPlace = document.querySelector("#prevCity");
  currentPlace.innerHTML = searchPlace.value;
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#afterCity");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastEle = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="weather-forecast-date ">${formatDay(
                  forecastDay.dt
                )}</div>
               <br / > 
                <img class="weather-forecast-icon" src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="icon" width="70"/> <br />
                <span class="max">${Math.round(
                  forecastDay.temp.max
                )}°</span> <br />
                <span class="min">${Math.round(forecastDay.temp.min)}°</span>
                </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastEle.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "d7155e05c6be5bad99f376b3098391fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", changeCity);
//search engine
function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#prevCity").innerHTML = response.data.name;
  document.querySelector("#headTemp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#weather-today").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  celsiusTemp = response.data.main.temp;
  let iconEle = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  iconEle.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconEle.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function displayFtemp(event) {
  event.preventDefault();
  let fTempElement = document.querySelector("#headTemp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  fTempElement.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}
function displayCtemp(event) {
  event.preventDefault();
  let cTempElement = document.querySelector("#headTemp");
  cTempElement.innerHTML = `${Math.round(celsiusTemp)}°C`;
}
function searchCity(city) {
  let apiKey = "d7155e05c6be5bad99f376b3098391fb";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function showPosition(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;

  let apiKey = "d7155e05c6be5bad99f376b3098391fb";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiURL}`).then(displayWeatherCondition);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

getCurrentLocation();
let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", search);
let celsiusTemp = null;
let fLink = document.querySelector("#fdegree");
fLink.addEventListener("click", displayFtemp);
let cLink = document.querySelector("#cdegree");
cLink.addEventListener("click", displayCtemp);
searchCity("Ho Chi Minh City");
