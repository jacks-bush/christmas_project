var complimentList = ["You look hawt today.", "Morning", "You look particularly stunning today."]
var complimentElement = document.getElementById('compliment');
complimentElement.textContent = complimentList[1];

var datetimeElement = document.getElementById('datetime');
var date = null;

var updateTime = function () {
    date = moment(new Date());
    datetimeElement.innerHTML = date.format('dddd, MMMM Do YYYY, h:mm:ss a');
}

var currentWeatherIconElement = document.getElementById("current_icon");
var currentTempElement = document.getElementById("current_temp");
var currentWeatherTextElement = document.getElementById("weather")

var weatherRequest = new XMLHttpRequest();
var weatherAPIKey = "806dfebcbac5da18"
var currentWeatherAPIRequestWU = "http://api.wunderground.com/api/" + weatherAPIKey + "/forecast/conditions/forecast10day/q/41.5749088,-85.8396612.json";
weatherRequest.open("GET", currentWeatherAPIRequestWU, true);
weatherRequest.send();

weatherRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var jsonObj = JSON.parse(this.responseText);
        currentWeatherIconElement.className = "wi wi-wu-" + jsonObj.current_observation.icon;
        currentTempElement.innerHTML = jsonObj.current_observation.temp_f + "&#176;";
        var simpleForecastDay = jsonObj.forecast.simpleforecast.forecastday;
        for (var i = 0; i < 5; i++)
        {
            var rowIncrement = 30;
            var positionFromTop = (70 + rowIncrement * i).toString();
            var positionFromTopIcon = (75 + rowIncrement * i).toString();
            var positionFromLeftIncrement = 45;


            var dayElement = document.getElementById("day-" + i.toString());
            dayElement.innerText = simpleForecastDay[i].date.weekday_short;
            dayElement.style.position = "absolute";
            dayElement.style.top = positionFromTop + "px";
            dayElement.style.left = (positionFromLeftIncrement * 0).toString() + "px";
            dayElement.style.color = "white";

            var weatherIconElement = document.getElementById("icon-" + i.toString());
            weatherIconElement.className = "wi wi-wu-" + simpleForecastDay[i].icon;
            weatherIconElement.style.position = "absolute";
            weatherIconElement.style.top = positionFromTopIcon + "px";
            weatherIconElement.style.left = (positionFromLeftIncrement * 1).toString() + "px";
            weatherIconElement.style.color = "white";

            var upIconElement = document.getElementById("dir-up-" + i.toString());
            upIconElement.style.position = "absolute";
            upIconElement.style.top = positionFromTopIcon + "px"
            upIconElement.style.left = (positionFromLeftIncrement * 2).toString() + "px";
            upIconElement.style.color = "white";

            var highElement = document.getElementById("high-" + i.toString());
            highElement.innerHTML = simpleForecastDay[i].high.fahrenheit + "&#176;";
            highElement.style.position = "absolute";
            highElement.style.top = positionFromTop + "px";
            highElement.style.left = (positionFromLeftIncrement * 2.2).toString() + "px";
            highElement.style.color = "white";

            var downIconElement = document.getElementById("dir-down-" + i.toString());
            downIconElement.style.position = "absolute";
            downIconElement.style.top = positionFromTopIcon + "px";
            downIconElement.style.left = (positionFromLeftIncrement * 3).toString() + "px";
            downIconElement.style.color = "white";

            var lowElement = document.getElementById("low-" + i.toString());
            lowElement.innerHTML = simpleForecastDay[i].low.fahrenheit + "&#176;";
            lowElement.style.position = "absolute";
            lowElement.style.top = positionFromTop + "px";
            lowElement.style.left = (positionFromLeftIncrement * 3.2).toString() + "px";
            lowElement.style.color = "white";
        }
    }
}


document.addEventListener('DOMContentLoaded', function () {
    updateTime();
    setInterval(updateTime, 1000);
}, false);
