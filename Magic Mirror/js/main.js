﻿var weatherNightIcons = {};
weatherNightIcons["chanceflurries"] = "wi wi-night-alt-snow-wind";
weatherNightIcons["chancerain"] = "wi wi-night-alt-showers";
weatherNightIcons["chancesleet"] = "wi wi-night-alt-sleet";
weatherNightIcons["chancesnow"] = "wi wi-night-alt-snow";
weatherNightIcons["chancetstorms"] = "wi wi-night-alt-thunderstorm";
weatherNightIcons["clear"] = "wi wi-night-clear";
weatherNightIcons["cloudy"] = "wi wi-night-alt-cloudy";
weatherNightIcons["flurries"] = "wi wi-night-alt-snow-wind";
weatherNightIcons["fog"] = "wi wi-night-fog";
weatherNightIcons["mostlycloudy"] = "wi wi-night-alt-cloudy";
weatherNightIcons["partlycloudy"] = "wi wi-night-alt-cloudy";
weatherNightIcons["rain"] = "wi wi-night-alt-rain";
weatherNightIcons["snow"] = "wi wi-night-alt-snow";
weatherNightIcons["tstorms"] = "wi wi-night-alt-thunderstorm";
weatherNightIcons["unknown"] = "wi wi-night-clear";


var weatherDayIcons = {};
weatherDayIcons["chanceflurries"] = "wi wi-snow-wind";
weatherDayIcons["chancerain"] = "wi wi-showers";
weatherDayIcons["chancesleet"] = "wi wi-sleet";
weatherDayIcons["chancesnow"] = "wi wi-snow";
weatherDayIcons["chancetstorms"] = "wi wi-thunderstorm";
weatherDayIcons["clear"] = "wi wi-day-sunny";
weatherDayIcons["cloudy"] = "wi wi-cloudy";
weatherDayIcons["flurries"] = "wi wi-snow-wind";
weatherDayIcons["fog"] = "wi wi-fog";
weatherDayIcons["hazy"] = "wi wi-day-haze";
weatherDayIcons["mostlycloudy"] = "wi wi-cloudy";
weatherDayIcons["mostlysunny"] = "wi wi-day-sunny";
weatherDayIcons["partlycloudy"] = "wi wi-day-cloudy";
weatherDayIcons["partlysunny"] = "wi wi-day-sunny-overcast";
weatherDayIcons["rain"] = "wi wi-rain";
weatherDayIcons["snow"] = "wi wi-snow";
weatherDayIcons["sunny"] = "wi wi-day-sunny";
weatherDayIcons["tstorms"] = "wi wi-thunderstorm";
weatherDayIcons["unknown"] = "wi wi-day-sunny";
var complimentList = ["You look hawt today.", "Hello", "You look particularly stunning today."]
var complimentElement = document.getElementById('compliment');
complimentElement.textContent = complimentList[1];

var currentWeatherIconElement = document.getElementById("current_icon");
var currentTempElement = document.getElementById("current_temp");

var weatherRequest = new XMLHttpRequest();
var weatherAPIKey = "806dfebcbac5da18";
var currentWeatherAPIRequestWU = "http://api.wunderground.com/api/" + weatherAPIKey + "/forecast/conditions/forecast10day/astronomy/q/41.5749088,-85.8396612.json";
weatherRequest.open("GET", currentWeatherAPIRequestWU, true);
weatherRequest.send();

weatherRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var jsonObj = JSON.parse(this.responseText);
        var dateNow = new Date();
        var sunrise = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), parseInt(jsonObj.sun_phase.sunrise.hour), parseInt(jsonObj.sun_phase.sunrise.minute))
        var sunset = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), parseInt(jsonObj.sun_phase.sunset.hour), parseInt(jsonObj.sun_phase.sunset.minute))
        if (sunrise < dateNow && dateNow < sunset) { currentWeatherIconElement.className = weatherDayIcons[jsonObj.current_observation.icon]; }
        else { currentWeatherIconElement.className = weatherNightIcons[jsonObj.current_observation.icon]; }

        currentTempElement.innerHTML = jsonObj.current_observation.temp_f + "&#176;";
        var simpleForecastDay = jsonObj.forecast.simpleforecast.forecastday;
        for (var i = 0; i < 5; i++) {
            var rowIncrement = 35;
            var positionFromTop = (70 + rowIncrement * i).toString();
            var positionFromTopIcon = (75 + rowIncrement * i).toString();
            var incrementFromDayToWeatherIcon = 50;
            var incrementFromWeatherIconToUpIcon = 55;
            var incrementFromUpIconToHigh = 13;
            var incrementFromHighToDownIcon = 55;
            var incrementFromDownIconToLow = 13;
            var distanceFromLeft = 0;

            var dayElement = document.getElementById("day-" + i.toString());
            dayElement.innerText = simpleForecastDay[i].date.weekday_short;
            dayElement.style.position = "absolute";
            dayElement.style.top = positionFromTop + "px";
            dayElement.style.left = "0px";
            dayElement.style.color = "#808080";

            var weatherIconElement = document.getElementById("icon-" + i.toString());
            weatherIconElement.className = weatherDayIcons[simpleForecastDay[i].icon];
            weatherIconElement.style.position = "absolute";
            weatherIconElement.style.top = positionFromTopIcon + "px";
            weatherIconElement.style.left = incrementFromDayToWeatherIcon.toString() + "px";
            weatherIconElement.style.color = "#D3D3D3";
            distanceFromLeft += incrementFromDayToWeatherIcon;

            var upIconElement = document.getElementById("dir-up-" + i.toString());
            upIconElement.style.position = "absolute";
            upIconElement.style.top = positionFromTopIcon + "px"
            upIconElement.style.left = (distanceFromLeft + incrementFromWeatherIconToUpIcon).toString() + "px";
            upIconElement.style.color = "#808080";
            distanceFromLeft += incrementFromWeatherIconToUpIcon;

            var highElement = document.getElementById("high-" + i.toString());
            highElement.innerHTML = simpleForecastDay[i].high.fahrenheit + "&#176;";
            highElement.style.position = "absolute";
            highElement.style.top = positionFromTop + "px";
            highElement.style.left = (distanceFromLeft + incrementFromUpIconToHigh).toString() + "px";
            highElement.style.color = "white";
            distanceFromLeft += incrementFromUpIconToHigh;

            var downIconElement = document.getElementById("dir-down-" + i.toString());
            downIconElement.style.position = "absolute";
            downIconElement.style.top = positionFromTopIcon + "px";
            downIconElement.style.left = (distanceFromLeft + incrementFromHighToDownIcon).toString() + "px";
            downIconElement.style.color = "#808080";
            distanceFromLeft += incrementFromHighToDownIcon;

            var lowElement = document.getElementById("low-" + i.toString());
            lowElement.innerHTML = simpleForecastDay[i].low.fahrenheit + "&#176;";
            lowElement.style.position = "absolute";
            lowElement.style.top = positionFromTop + "px";
            lowElement.style.left = (distanceFromLeft + incrementFromDownIconToLow).toString() + "px";
            lowElement.style.color = "white";
        }
    }
}

var datetimeElement = document.getElementById('datetime');
var date = null;

var updateTime = function () {
    date = moment(new Date());
    datetimeElement.innerHTML = date.format('h:mm a');
}

document.addEventListener('DOMContentLoaded', function () {
    updateTime();
    setInterval(updateTime, 1000);
}, false);

function googleCalendarEvent(name, startTime, endTime) {
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
    this.getDisplayString = function () {
        var googleCalDate;
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        if (this.startTime.hasOwnProperty('date')) {
            googleCalDate = getDateObjectFromRFC3339String(startTime.date, false);
            return dayNames[googleCalDate.getDay()] + " " + monthNames[googleCalDate.getMonth()] + " " + googleCalDate.getDate().toString() + " " + name;
        }
        else {
            googleCalDate = getDateObjectFromRFC3339String(startTime.dateTime, true);
            var hourDispStr;
            if (googleCalDate.getHours() > 12) {
                hourDispStr = (googleCalDate.getHours() % 12).toString() + "pm";
            }
            else {
                hourDispStr = googleCalDate.getHours().toString() + "am";
            }
            return dayNames[googleCalDate.getDay()] + " " + monthNames[googleCalDate.getMonth()] + " " + googleCalDate.getDate().toString() + " " + name + " " + hourDispStr;
        }
    }
}

// 2017-12-01T11:00:00-05:00
function getDateObjectFromRFC3339String(dateStr, isDateTime) {
    var year = parseInt(dateStr.substring(0, 4));
    var month = parseInt(dateStr.substring(5, 7)) - 1;
    var day = parseInt(dateStr.substring(8, 10));
    if (isDateTime) {
        var hour = parseInt(dateStr.substring(11, 13));
        var minute = parseInt(dateStr.substring(14, 16));
        return new Date(year, month, day, hour, minute)
    }
    else {
        return new Date(year, month, day);
    }
}

var request = new XMLHttpRequest();
var googleCalendarContainerElement = document.getElementById("google-calendar-events");

request.onload = function () {

    var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
    var data = JSON.parse(request.responseText); // Returned data, e.g., an HTML document.
    var accessToken = data.access_token;
    var expiresIn = data.expires_in;
    var eventsList = [];

    var requestCalendarList = new XMLHttpRequest();
    requestCalendarList.open("GET", "https://www.googleapis.com/calendar/v3/users/me/calendarList/", true);

    requestCalendarList.setRequestHeader("Authorization", "Bearer " + accessToken);
    requestCalendarList.setRequestHeader("HOST", "www.googleapis.com")
    requestCalendarList.onload = function () {
        var status = requestCalendarList.status;
        var data = JSON.parse(requestCalendarList.responseText);
        var calendarIdList = [];
        var count = 0;
        for (var i = 0; i < data.items.length; i++) {
            calendarIdList.push(data.items[i].id);
            var requestEventList = new XMLHttpRequest();
            var dateMax = new Date();
            var dateMin = new Date();
            dateMin.setHours(0, 0, 0, 0);
            dateMax.setHours(23, 59, 59);
            var eventPostData = "timeMax=" + Timestamp.start(addDays(dateMax, 7)) + "&timeMin=" + Timestamp.start(dateMin);
            //var eventPostData = "timeMax=" + rfc3339(dateMax) + "&timeMin=" + rfc3339(dateMin);
            requestEventList.open("GET", "https://www.googleapis.com/calendar/v3/calendars/" + calendarIdList[i] + "/events?" + eventPostData, false);

            requestEventList.setRequestHeader("Authorization", "Bearer " + accessToken);
            requestEventList.setRequestHeader("HOST", "www.googleapis.com")
            requestEventList.onload = function () {
                var status = requestEventList.status;
                if (status == 200) {
                    var items = JSON.parse(requestEventList.responseText).items;
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].summary != "Payday ") {
                            eventsList.push(new googleCalendarEvent(items[j].summary, items[j].start, items[j].end));
                        }
                    }
                }
                count += 1;
            }
            requestEventList.send(null);
        }
        eventsList.sort(function (a, b) {
            var dateA;
            var dateB;
            if (a.startTime.hasOwnProperty('date')) {
                dateA = getDateObjectFromRFC3339String(a.startTime.date, false);
            }
            else {
                dateA = getDateObjectFromRFC3339String(a.startTime.dateTime, true);
            }
            if (b.startTime.hasOwnProperty('date')) {
                dateB = getDateObjectFromRFC3339String(b.startTime.date, false);
            }
            else {
                dateB = getDateObjectFromRFC3339String(b.startTime.dateTime, true);
            }
            return dateA - dateB;
        });
        for (var i = 0; i < eventsList.length; i++) {
            var rowIncrement = 20;
            var positionFromTop = rowIncrement * i;

            var eventDiv = document.createElement("div");
            eventDiv.style.position = "absolute";
            eventDiv.style.top = positionFromTop.toString() + "px";
            eventDiv.innerHTML = eventsList[i].getDisplayString();

            googleCalendarContainerElement.appendChild(eventDiv);
        }
    }

    // Actually sends the request to the server.
    requestCalendarList.send(null);
}

request.open("POST", "https://www.googleapis.com/oauth2/v4/token", true);

request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
request.setRequestHeader("HOST", "www.googleapis.com");

var postData = "client_id=" + clientId + "&client_secret=" + clientSecret + "&refresh_token=" + refreshToken + "&grant_type=refresh_token";
// Actually sends the request to the server.
request.send(postData);

var Timestamp = {
    start: function (date) {
        date = date ? date : new Date();
        var offset = date.getTimezoneOffset();
        return this.pad(date.getFullYear(), 4)
            + "-" + this.pad(date.getMonth() + 1, 2)
            + "-" + this.pad(date.getDate(), 2)
            + "T" + this.pad(date.getHours(), 2)
            + ":" + this.pad(date.getMinutes(), 2)
            + ":" + this.pad(date.getSeconds(), 2)
            + "Z";
    },
    pad: function (amount, width) {
        var padding = "";
        while (padding.length < width - 1 && amount < Math.pow(10, width - padding.length - 1))
            padding += "0";
        return padding + amount.toString();
    }
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}


var nyTimesWorldElement = document.getElementById("nytimes-world");

var nyTimesWorldRSSFeedRequest = new XMLHttpRequest();
nyTimesWorldURL = "http://rss.nytimes.com/services/xml/rss/nyt/World.xml";
nyTimesPoliticsYQL = "https://query.yahooapis.com/v1/public/yql?q=select * from rss where url = '" + nyTimesWorldURL + "'";
nyTimesWorldRSSFeedRequest.open("GET", nyTimesPoliticsYQL, true);
nyTimesWorldRSSFeedRequest.send();
nyTimesWorldRSSFeedRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(this.responseText, "text/xml");
        var items = xmlDoc.getElementsByTagName("title");
        for (var i = 2; i < 6; i++) {
            var rowIncrement = 17;
            var positionFromTop = rowIncrement * i;

            var eventDiv = document.createElement("div");
            eventDiv.style.position = "absolute";
            eventDiv.style.top = positionFromTop.toString() + "px";
            eventDiv.innerHTML = items[i].innerHTML;

            nyTimesWorldElement.appendChild(eventDiv);
        }
    }
}

var nyTimesPoliticsElement = document.getElementById("nytimes-politics");

var nyTimesPoliticsRSSFeedRequest = new XMLHttpRequest();
nyTimesPoliticsURL = "http://rss.nytimes.com/services/xml/rss/nyt/Politics.xml";
nyTimesPoliticsYQL = "https://query.yahooapis.com/v1/public/yql?q=select * from rss where url = '" + nyTimesPoliticsURL + "'";
nyTimesPoliticsRSSFeedRequest.open("GET", nyTimesPoliticsYQL, true);
nyTimesPoliticsRSSFeedRequest.send();
nyTimesPoliticsRSSFeedRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(this.responseText, "text/xml");
        var items = xmlDoc.getElementsByTagName("title");
        for (var i = 2; i < 6; i++) {
            var rowIncrement = 17;
            var positionFromTop = rowIncrement * i;

            var eventDiv = document.createElement("div");
            eventDiv.style.position = "absolute";
            eventDiv.style.top = positionFromTop.toString() + "px";
            eventDiv.innerHTML = items[i].innerHTML;

            nyTimesPoliticsElement.appendChild(eventDiv);
        }
    }
}