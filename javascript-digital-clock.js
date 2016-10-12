var COLORS = ['aqua', 'fuchsia', 'gray',
              'green', 'lime', 'maroon',
              'navy', 'olive', 'purple',
              'red', 'silver', 'teal',
              'yellow'];

var DIGITS_HOUR_MIN_SEC = 2;
var DIGITS_MILLISECOND = 3;
var REFRESH_INTERVAL = 500;
var BACKGROUND_CHANGE_INTERVAL = 5;
var MINUTES_PER_HOUR = 60;
var TIMER;
var PREVIOUS_TIME;
var CURRENT_TIME;
var BACKGROUND_CHANGE_TIME;

function refreshTime() {
	PREVIOUS_TIME = CURRENT_TIME;
	CURRENT_TIME = new Date();
}

function refreshTimeValues() {
	// get current time values
	var currentHours = CURRENT_TIME.getHours();
	var currentMinutes = CURRENT_TIME.getMinutes();
	var currentSeconds = CURRENT_TIME.getSeconds();
	var currentMilliseconds = CURRENT_TIME.getMilliseconds();

	// set time values in DOM
	var hours = document.getElementById('hours');
	hours.innerHTML = zeroPadValue(currentHours, DIGITS_HOUR_MIN_SEC);

	var minutes = document.getElementById('minutes');
	minutes.innerHTML = zeroPadValue(currentMinutes, DIGITS_HOUR_MIN_SEC);

	var seconds = document.getElementById('seconds');
	seconds.innerHTML = zeroPadValue(currentSeconds, DIGITS_HOUR_MIN_SEC);

	var milliseconds = document.getElementById('milliseconds');
	milliseconds.innerHTML = zeroPadValue(currentMilliseconds, DIGITS_MILLISECOND);
}

function refreshBackgroundChangeTime() {
	BACKGROUND_CHANGE_TIME = CURRENT_TIME;
}

function refreshMinuteBasedColor() {
	var currentMinutes = CURRENT_TIME.getMinutes();

	var even = (currentMinutes % 2 == 0);

	// change the color to black if it
	// is an odd minute and another color
	// if it is an even minute
	var color;

	if (even) {
		color = 'blue';
	} else {
		color = 'black';
	}

	var minutes = document.getElementById('minutes');
	minutes.style.color = color;
}
function refreshHourBasedColor() {
	if (PREVIOUS_TIME.getHours() != CURRENT_TIME.getHours()) {
		var color = selectRandomColor();

		var clock = document.getElementById('clock');
		clock.style.color = color;
	}
}

function refreshBackgroundColor() {
	var currentMinutes = CURRENT_TIME.getMinutes();
	var backgroundChangeMinutes = BACKGROUND_CHANGE_TIME.getMinutes();

	// current time went over the hour
	// add minutes per hour to simplify
	// math
	if (currentMinutes < backgroundChangeMinutes) {
		currentMinutes += MINUTES_PER_HOUR;
	}

	if (currentMinutes - backgroundChangeMinutes > BACKGROUND_CHANGE_INTERVAL) {
		setBackgroundToRandomColor();
		refreshBackgroundChangeTime();
	}
}

function setBackgroundToRandomColor() {
	var color = selectRandomColor();
	document.body.style.backgroundColor = color;
}

function selectRandomColor() {
	var index = Math.trunc(Math.random() * COLORS.length);
	var color = COLORS[index];
	return color;
}

function refreshClock() {
	refreshCurrentTime();
	refreshTimeValues();
	refreshHourBasedColor();
	refreshMinuteBasedColor();
	refreshBackgroundColor();
}

function zeroPadValue(value, digits) {
	// convert to string
	var stringValue = value.toString();

	// pad zeroes if less than desired digits
	if (stringValue.length < digits) {
		var zeroesToAppend = digits - stringValue.length + 1;
		return Array(zeroesToAppend).join('0') + stringValue;
	} else {
		return stringValue;
	}
}

function refreshRefreshInterval() {
	document.getElementById('refreshInterval').innerHTML = REFRESH_INTERVAL;
}

function initializeRefreshControls() {
	document.getElementById('increaseRefresh').onclick = function() {
		stopTimer();
		REFRESH_INTERVAL += 10;
		refreshRefreshInterval();
		startTimer();
	}

	document.getElementById('decreaseRefresh').onclick = function() {
		stopTimer();
		REFRESH_INTERVAL -= 10;
		refreshRefreshInterval();
		startTimer();
	}
}

function hideLoadingStatus() {
	var loading = document.getElementById('loading');
	loading.style.display = 'none';
}

function showClock() {
	var clock = document.getElementById('clock');
	clock.style.display = 'block';
}

function initialize() {
	initializeRefreshControls();
	refreshRefreshInterval();
	refreshTime();
	refreshBackgroundChangeTime();
	refreshTimeValues();
	hideLoadingStatus();
	showClock();
	startTimer();
}

function startTimer() {
	TIMER = setInterval(refreshClock, REFRESH_INTERVAL);
}

function stopTimer() {
	clearTimeout(TIMER);
}

initialize();
