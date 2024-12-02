const apiKey = "883a9e3d3eba428290528b1cf4d82dc1";
let apiURL = "https://api.ipgeolocation.io/ipgeo?apiKey=" + apiKey;
let data;
let ip;
let ipInput = document.getElementById("ip");

const requestOptions = {
	method: "GET",
	redirect: "follow"
};

var map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 21,
}).addTo(map);

function updateMap(latitude, longitude) {
	map.setView([latitude, longitude], 13);
	L.marker([latitude, longitude]).addTo(map);
}

function setData() {
	console.log(data.ip);
	  if (!data.ip)
	  {
		document.getElementById("ip-address-value").innerHTML = "No IP found";
		document.getElementById("location-value").innerHTML = "No location found";
		document.getElementById("timezone-value").innerHTML = "No timezone found";
		document.getElementById("isp-value").innerHTML = "No ISP found";
		document.getElementById("currency").innerHTML = "No currency found";
		document.getElementById("languages").innerHTML = "No languages found";
		document.getElementById("calling-code").innerHTML = "No calling code found";
		document.getElementById("country").innerHTML = "No country found";
		document.getElementById("capital").innerHTML = "No capital found";
		return;
	  }
	  document.getElementById("ip-address-value").innerHTML = data.ip;
	  document.getElementById("location-value").innerHTML = data.city + ", " + data.country_name + " " + data.country_emoji;
	  document.getElementById("timezone-value").innerHTML = data.time_zone.name;
	  document.getElementById("isp-value").innerHTML = data.isp;
	  document.getElementById("currency").innerHTML = data.currency.name + " (" + data.currency.code + ")";
	  document.getElementById("languages").innerHTML = data.languages.split(",")[0].toUpperCase();
	  document.getElementById("calling-code").innerHTML = data.calling_code;
	  document.getElementById("country").innerHTML = data.country_name_official;
	  document.getElementById("capital").innerHTML = data.country_capital;
	updateMap(data.latitude, data.longitude);
}

async function getIP() {
	const response = await fetch(apiURL, requestOptions);
	data = await response.json();
	setData();
}

getIP();

function take_ip() {
	ip = ipInput.value;
	apiURL = "https://api.ipgeolocation.io/ipgeo?apiKey=" + apiKey + "&ip=" + ip;
	ipInput.value = "";
	getIP();
}
