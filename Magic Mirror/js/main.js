// Client ID and API key from the Developer Console
var CLIENT_ID = '327785858957-8t0s1cfdo379juri6pgkba07uoaneqcb.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

var complimentList = ["You look hawt today.", "Morning", "You look particularly stunning today."]
var complimentElement = document.getElementById('compliment');
complimentElement.textContent = complimentList[1];

var datetimeElement = document.getElementById('datetime');
var date = null;

var updateTime = function () {
    date = moment(new Date());
    datetimeElement.innerHTML = date.format('dddd, MMMM Do YYYY, h:mm:ss a');
}

var weatherElement = document.getElementById("weather")

var request = new XMLHttpRequest();

request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var jsonObj = JSON.parse(this.responseText);
        weatherElement.innerHTML = "weather: " + jsonObj.query.results.channel.item.condition.text;
        weatherElement.innerHTML += "<br/>current temp: " + jsonObj.query.results.channel.item.condition.temp;
        weatherElement.innerHTML += "<br/>day high: " + jsonObj.query.results.channel.item.forecast[0].high;
        weatherElement.innerHTML += "<br/>day low: " + jsonObj.query.results.channel.item.forecast[0].low;
        weatherElement.innerHTML += "<br/>day forecast: " + jsonObj.query.results.channel.item.forecast[0].text;
    }
}

var yahooConditionCodesToIconsListCurrent = ['wi-tornado', 'wi-hurricane', 'wi-hurricane', 'wi-thunderstorm', 'wi-thunderstorm', 'wi-rain-mix', 'wi-sleet', 'wi-snow', 'wi-sleet', 'wi-showers', 'wi-sleet', 'wi-showers', 'wi-showers']
var currentWeatherAPIRequest = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid = 12777784&format=json"
request.open("GET", currentWeatherAPIRequest, true);
request.send();


document.addEventListener('DOMContentLoaded', function () {
    updateTime();
    setInterval(updateTime, 1000);
}, false);

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listUpcomingEvents();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function (response) {
        var events = response.result.items;
        appendPre('Upcoming events:');

        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                appendPre(event.summary + ' (' + when + ')')
            }
        } else {
            appendPre('No upcoming events found.');
        }
    });
}
