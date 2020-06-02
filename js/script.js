let input_value = document.querySelector(".input_city_name");
let form = document.querySelector("form");
let degrees = document.querySelector('.degrees');
let weather_icon = document.querySelector('.icon');
let city_weather_name = document.querySelector('.city_weather_name');
let feelsLike = document.querySelector(".feelsLike");
let min_weather = document.querySelector('.min_weather');
let max_weather = document.querySelector('.max_weather');
let windSpeed = document.querySelector('.windSpeed');
let weather_item = document.querySelector('.weather_item');
let additional_info = document.querySelector(".additional_info");


document.addEventListener("DOMContentLoaded", function() {
    request("Kyiv")
});
function request(city) { 
   
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=abd5b263f66694a87d607ad8892804e6`)
  .then((response) => {
      return response.json();
    })
    .then((data) => {
      
      addTohtml( data)
    })}
form.addEventListener('submit',function(e) {
    e.preventDefault();
    request(input_value.value);
    input_value.value = ""
})

function addTohtml( data) {
  let getCelsiusDegrees = (data.main.temp - 273.15).toFixed(1);
  let getCelsiusDegreesforFeelsLike = (data.main.feels_like - 273.15).toFixed(0);
  let iconLink = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let temp_min = (data.main.temp_min - 273.15).toFixed(0);
  let temp_max = (data.main.temp_max - 273.15).toFixed(0);
  
  degrees.innerHTML = `${getCelsiusDegrees}°`;
  weather_icon.innerHTML = `<img src=${iconLink}></img> <p>${data.weather[0].description}</p>`;
  city_weather_name.innerHTML = `${data.name }` //input_value.value;
  feelsLike.innerHTML = `<span class="feels">Feels like</span> ${getCelsiusDegreesforFeelsLike}°`;
  min_weather.innerHTML = `<span class="min">Min</span> ${temp_min}°`;
  max_weather.innerHTML = `<span class="max">Max</span> ${temp_max}°`;
  windSpeed.innerHTML =  `<span class="wind">Wind speed</span> ${data.wind.speed} km/h`;
}

weather_item.addEventListener('click', function check() {
  additional_info.classList.toggle("hide")
})
 
