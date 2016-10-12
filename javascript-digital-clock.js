var MILLISECONDS_PER_SECOND = 1000;

function refreshTimeValues() {
	// get current time values
	var now = new Date();
	var currentHours = now.getHours();
	var currentMinutes = now.getMinutes();
	var currentSeconds = now.getSeconds();

	// set time values in DOM
	var hours = document.getElementById('hours');
	hours.innerHTML = zeroPadValue(currentHours);

	var minutes = document.getElementById('minutes');
	minutes.innerHTML = zeroPadValue(currentMinutes);

	var seconds = document.getElementById('seconds');
	seconds.innerHTML = zeroPadValue(currentSeconds);
}

function zeroPadValue(value) {
	if (value < 10) {
		return "0" + value;
	} else {
		return value;
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
	refreshTimeValues();
	hideLoadingStatus();
	showClock();	
}

function startTimer() {
	setInterval(refreshTimeValues, MILLISECONDS_PER_SECOND);
}

initialize();
startTimer();
