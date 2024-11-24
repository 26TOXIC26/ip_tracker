const api = "https://ipapi.co/json/";
let data;

async function getIP() {
	const response = await fetch(api);
	data = await response.json();
	console.log(data);
}

getIP();

var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 21,
}).addTo(map);
