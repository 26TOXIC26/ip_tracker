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
	  document.getElementById("ip-address-value").innerHTML = data.ip;
	  console.log(data.ip);
	  document.getElementById("location-value").innerHTML = data.city + ", " + data.country_name + " " + data.country_emoji;
	  console.log(data.city + ", " + data.country_name);
	  document.getElementById("timezone-value").innerHTML = data.time_zone.name;
	  console.log(data.time_zone.name);
	  document.getElementById("isp-value").innerHTML = data.isp;
	  console.log(data.isp);
	  document.getElementById("currency").innerHTML = data.currency.name + " (" + data.currency.code + ")";
	  console.log(data.currency.name + " (" + data.currency.code + ")");
	  document.getElementById("languages").innerHTML = data.languages.split(",")[0].toUpperCase();
	  console.log(data.languages.split(",")[0].toUpperCase());
	  document.getElementById("calling-code").innerHTML = data.calling_code;
	  console.log(data.calling_code);
	  document.getElementById("country").innerHTML = data.country_name_official;
	  console.log(data.country_name_official);
	  document.getElementById("capital").innerHTML = data.country_capital;
	  console.log(data.country_capital);
	updateMap(data.latitude, data.longitude);
}

async function getIP() {
	const response = await fetch(apiURL, requestOptions);
	data = await response.json();
	console.log(apiURL);
	console.log(data);
	setData();
}


getIP();

function show_more_info() {
	if (document.getElementById("hidden-info").style.left == "75%") {
		document.getElementById("more-info").style.transform = "translate(-50%, -50%) rotate(0deg)";
		document.getElementById("hidden-info").style.left = "-100%";
	}
	else
	{
		document.getElementById("more-info").style.transform = "translate(-50%, -50%) rotate(180deg)";
		document.getElementById("hidden-info").style.left = "75%";
	}
}


function take_ip() {
	ip = ipInput.value;
	apiURL = "https://api.ipgeolocation.io/ipgeo?apiKey=" + apiKey + "&ip=" + ip;
	ipInput.value = "";
	getIP();
}
