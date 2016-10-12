/*------------------------------------------------------------------------------
 * CONSTANTS
 *-----------------------------------------------------------------------------*/
var MINUTES_PER_HOUR = 60;
var DIGITS_HOUR_MIN_SEC = 2;
var DIGITS_MILLISECOND = 3;
var BACKGROUND_CHANGE_INTERVAL_MINUTES = 5;
var COLOR_EVEN = 'blue';
var COLOR_ODD = 'black';


/*------------------------------------------------------------------------------
 * HELPERS
 *-----------------------------------------------------------------------------*/
var COLORS = ['aqua', 'fuchsia', 'gray',
              'green', 'lime', 'maroon',
              'navy', 'olive', 'purple',
              'red', 'silver', 'teal',
              'yellow'];

/*
 * Returns a random color value.
 */
function selectRandomColor() {
	var index = Math.trunc(Math.random() * COLORS.length);
	var color = COLORS[index];
	return color;
}

/*
 * Returns a color based on whether the parameter is even or odd
 */
function selectEvenOddColor(parameter) {
	if (parameter % 2 == 0) {
		return COLOR_EVEN;
	} else {
		return COLOR_ODD;
	}
}

/*
 * Given a numeric value and the desired number of digits, returns a string
 * with the parameter number zero-padded as specified.
 */
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


/*------------------------------------------------------------------------------
 * STATE
 *
 * - previousDate, backgroundChangeDate, and currentDate are all initialized to
 *   the same values
 * - background color and clock color are initialized to random color values
 *-----------------------------------------------------------------------------*/
var refreshIntervalMilliseconds = 500;
var previousDate = new Date();
var backgroundChangeDate = previousDate;
var currentDate = previousDate;
var backgroundColor = selectRandomColor();
var clockColor = selectRandomColor();
var minuteColor = selectEvenOddColor(currentDate.getMinutes());

/*
 * Updates tracking of the previous date and the current date.
 */
function updateDates() {
	previousDate = currentDate;
	currentDate = new Date();
}

/*
 * Updates the date the background was changed to the current date.
 */
function updateBackgroundChangeDate() {
	backgroundChangeDate = currentDate;
}

/*
 * Updates the background color to a random color value.
 */
function updateBackgroundColor() {
	backgroundColor = selectRandomColor();
}

/*
 * Updates the clock color to a random color value.
 */
function updateClockColor() {
	clockColor = selectRandomColor();
}

/*
 * Updates the minute color based on the current time.
 */
function updateMinuteColor() {
	minuteColor = selectEvenOddColor(currentDate.getMinutes());
}


/*------------------------------------------------------------------------------
 * DISPLAY
 *-----------------------------------------------------------------------------*/

/*
 * Updates the DOM with the display value of the refresh interval.
 */
function updateRefreshIntervalDisplay() {
	document.getElementById('refreshIntervalDisplay').innerHTML = refreshIntervalMilliseconds;
}

/*
 * Updates the DOM with the display value of the background color.
 */
function updateBackgroundColorDisplay() {
	document.getElementById('backgroundColorDisplay').innerHTML = backgroundColor;
}

/*
 * Updates the background color of the page.
 */
function updatePageBackgroundColor() {
	document.body.style.backgroundColor = backgroundColor;
}

/*
 * Updates the DOM with the display value of the clock color.
 */
function updateClockColorDisplay() {
	document.getElementById('clockColorDisplay').innerHTML = clockColor;
}

/*
 * Updates the color of the clock elements on the page.
 */
function updatePageClockColor() {
	document.getElementById('clock').style.color = clockColor;
}

/*
 * Updates the DOM with the display value of the minute color.
 */
function updateMinuteColorDisplay() {
	document.getElementById('minuteColorDisplay').innerHTML = minuteColor;
}

/*
 * Updates the color of the minutes element on the page.
 */
function updatePageMinuteColor() {
	document.getElementById('minutes').style.color = minuteColor;
}

/*
 * Updates the DOM with the display values of the current date.
 */
function updateCurrentDateDisplay() {
	// get current time values
	var currentHours = currentDate.getHours();
	var currentMinutes = currentDate.getMinutes();
	var currentSeconds = currentDate.getSeconds();
	var currentMilliseconds = currentDate.getMilliseconds();

	// set time values in DOM
	var hoursElement = document.getElementById('hours');
	hoursElement.innerHTML = zeroPadValue(currentHours, DIGITS_HOUR_MIN_SEC);

	var minutesElement = document.getElementById('minutes');
	minutesElement.innerHTML = zeroPadValue(currentMinutes, DIGITS_HOUR_MIN_SEC);

	var secondsElement = document.getElementById('seconds');
	secondsElement.innerHTML = zeroPadValue(currentSeconds, DIGITS_HOUR_MIN_SEC);

	var millisecondsElement = document.getElementById('milliseconds');
	millisecondsElement.innerHTML = zeroPadValue(currentMilliseconds, DIGITS_MILLISECOND);
}

/*
 * Hide loading indicator
 */
function hideLoading() {
	var loading = document.getElementById('loading');
	loading.style.display = 'none';
}

/*
 * Display clock components
 */
function showClockComponents() {
	var clockComponents = document.getElementById('clockComponents');
	clockComponents.style.display = 'block';
}


/*------------------------------------------------------------------------------
 * USER INPUT
 *-----------------------------------------------------------------------------*/

/*
 * Sets up event handlers for the control buttons.
 */
function initializeControls() {
	// increase refresh interval button
	document.getElementById('increaseRefreshIntervalButton').onclick = function() {
		stopTimer();
		refreshIntervalMilliseconds += 10;
		updateRefreshIntervalDisplay();
		startTimer();
	}

    // decrease refresh interval button
	document.getElementById('decreaseRefreshIntervalButton').onclick = function() {
		stopTimer();
		refreshIntervalMilliseconds -= 10;
		updateRefreshIntervalDisplay();
		startTimer();
	}

	// change background color button
	document.getElementById('changeBackgroundColorButton').onclick = function() {
		updateBackgroundColor();
		updateBackgroundColorDisplay();
		updatePageBackgroundColor();
	}

	// chnage clock color button
	document.getElementById('changeClockColorButton').onclick = function() {
		updateClockColor();
		updateClockColorDisplay();
		updatePageClockColor();
	}
}


/*------------------------------------------------------------------------------
 * APPLICATION
 *-----------------------------------------------------------------------------*/
var timer;

/*
 * Updates the current date.
 */
function refreshCurrentDate() {
	updateCurrentDateDisplay();
}

/*
 * Updates the background color every 5 minutes.
 */
function refreshBackgroundColor() {
	var currentMinutes = currentDate.getMinutes();
	var backgroundChangeMinutes = backgroundChangeDate.getMinutes();

	// current time went over the hour
	// add minutes per hour to simplify
	// math
	if (currentMinutes < backgroundChangeMinutes) {
		currentMinutes += MINUTES_PER_HOUR;
	}

	if (currentMinutes - backgroundChangeMinutes > BACKGROUND_CHANGE_INTERVAL_MINUTES) {
		updateBackgroundColor();
		updateBackgroundColorDisplay();
		updatePageBackgroundColor();
	}
}

/*
 * Updates the clock color on every hour change.
 */
function refreshClockColor() {
	if (previousDate.getHours() != currentDate.getHours()) {
		updateClockColor();
		updateClockColorDisplay();
		updatePageClockColor();
	}
}

/*
 * Updates the application based on the current minute.
 */
function refreshMinuteColor() {
	updateMinuteColor();
	updateMinuteColorDisplay();
	updatePageMinuteColor();
}

/*
 * Runs all application logic
 */
function runApplicationLogic() {
	updateDates();

	refreshCurrentDate();
	refreshBackgroundColor();
	refreshClockColor();
	refreshMinuteColor();
}

/*
 * Start the timer for the application.
 */
function startTimer() {
	timer = setInterval(runApplicationLogic, refreshIntervalMilliseconds);
}

/*
 * Stops the timer for the application.
 */
function stopTimer() {
	clearTimeout(timer);
}

/*
 * Sets up event handlers, initializes data, then starts the timer.
 */
function initialize() {
	initializeControls();

	updateRefreshIntervalDisplay();

	updateMinuteColorDisplay();
	updatePageMinuteColor();

	updateBackgroundColorDisplay();
	updatePageBackgroundColor();

	updateClockColorDisplay();
	updatePageClockColor();

	updateCurrentDateDisplay();

	startTimer();
	hideLoading();
	showClockComponents();
}



// MAIN ENTRY POINT
initialize();
