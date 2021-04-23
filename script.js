

const apikey = "2d3b99707c7e5fc1a2d2be9b13f06519";

const main = document.getElementById("main");
const formularz = document.getElementById("formularz");
const szukaj = document.getElementById("szukaj");

const url = (miasto) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${miasto}&appid=${apikey}`;

async function pobierzPogode(miasto) {
    const resp = await fetch(url(miasto), { origin: "cors" });
    const respData = await resp.json();

    console.log(respData);

    dodajPogode(respData);
}

function dodajPogode(data) {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
    `;

    
    main.innerHTML = "";

    main.appendChild(weather);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

formularz.addEventListener("submit", (e) => {
    e.preventDefault();

    const miasto = szukaj.value;

    if (miasto) {
        pobierzPogode(miasto);
    }
});