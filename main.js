const api = {
	key: "bff06cdb42994571cf3e664ad94824d1",
	base: "https://api.openweathermap.org/data/2.5/",
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
	if(evt.keyCode == 13) {  //13 is for enter key
		getResults(searchbox.value);
		console.log(searchbox.value);
	}	
}

function getResults(city) {
	fetch(`${api.base}weather?q=${city}&units=imperial&appid=${api.key}`)
	.then(weather => {
		return weather.json();
	}).then(displayResults);
}

function displayResults(weather) {
	console.log(weather);
	let city = document.querySelector('.location .city');
	city.innerText = `${weather.name}, ${weather.sys.country}`;
	
	let currentdate = new Date();
	let date = document.querySelector('.location .date');
	date.innerText = dateBuilder(currentdate);
	
	let temp = document.querySelector('.current .temp');
	temp.innerText = `${Math.round(weather.main.temp)}`+ '°F';
	
	let wc = document.querySelector('.current .weather');
	wc.innerText = `${weather.weather[0].main}`;
	
	let hilo = document.querySelector('.current .hilo');
	hilo.innerText = `${Math.round(weather.main.temp_min)}` + '°F' +'/' + `${Math.round(weather.main.temp_max)}`+ '°F';
	
	
}

function dateBuilder(d) {
	let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	
	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();
	
	return `${day}, ${date} ${month} ${year}`;
}


