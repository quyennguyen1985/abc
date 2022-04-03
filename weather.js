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
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "d7155e05c6be5bad99f376b3098391fb";
  let searchInput = document.querySelector("#afterCity");
  let city = searchInput.value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchCity);
