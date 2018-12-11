"use strict"

searchButton.addEventListener('click', searchWeather);

function searchWeather(){
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';
    var cityName = searchCity.value;
    if(cityName.trim().length == 0){
        return alert('Write something, fool!');
    }
    var http = new XMLHttpRequest();
    var apiKey = '*get your own APIKEY*';
    var URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
    var method = 'GET';

    http.open(method, URL);
    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE &&  http.status === 200) {
            var data = JSON.parse(http.responseText);   
            var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase()); 
            weatherData.temperature = data.main.temp;
            updateWheather(weatherData);
            
        } else if (http.readyState === XMLHttpRequest.DONE) {
            alert('Something went wrong!! Not good');
        }
    };

    http.send();
}

function updateWheather(weatherData) {
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;

    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}

