//-------------------last update------------------//
const dateObj = new Date();
const year = dateObj.getFullYear();
document.querySelector("#currentYear").textContent = year;

const lastUpdated = document.lastModified;
document.querySelector("#lastUpdated").textContent = lastUpdated;

//-------------------Navigational bar--------------//
function toggleMenu() {
  document.getElementById("primaryNav").classList.toggle("open");
  document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;

//------------------Weather------------------------//
const currentTemp = document.querySelector("#temperature");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("#description");
const humidity = document.querySelector("#humidity");
const forecast1 = document.querySelector("#forecast1");
const forecast2 = document.querySelector("#forecast2");
const forecast3 = document.querySelector("#forecast3");

const urlw =
  "https://api.openweathermap.org/data/2.5/weather?q=Carlsbad,USA&appid=ac62c32e0537fc708a489b00c343f912&units=imperial";

const urlforecast =
  "https://api.openweathermap.org/data/2.5/forecast?lat=33.1581&lon=-117.3506&appid=ac62c32e0537fc708a489b00c343f912&units=imperial";

async function apiFetch() {
  try {
    const response = await fetch(urlw);
    const response2 = await fetch(urlforecast);
    if (response.ok && response2.ok) {
      const data = await response.json();
      const data2 = await response2.json();
      //   console.log(data); // this is for testing the call
      displayResults(data);
      displayResultsforecast(data2);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

function displayResults(weatherData) {
  let t = weatherData.main.temp.toFixed(0);
  currentTemp.innerHTML = `<strong>${t}</strong>`;
  let h = weatherData.main.humidity;
  humidity.textContent = `${h}`;

  const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  const desc = weatherData.weather[0].description;

  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", desc);
  captionDesc.innerHTML = `<i>${desc}</i>`;
}

function displayResultsforecast(weatherData) {
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };
  let t = weatherData.list[8].main.temp.toFixed(0);
  forecast1.textContent = `Tomorrow: ${t}˚`;
  let t2 = weatherData.list[16].main.temp.toFixed(0);
  forecast2.innerHTML = `After tomorrow: ${t2}˚`;
  let t3 = weatherData.list[24].main.temp.toFixed(0);
  forecast3.textContent = `In three days: ${t3}˚`;
}

//-------------------------fresh.html--------------------//

const urlFruits = "https://brotherblazzard.github.io/canvas-content/fruit.json";

const selectFruit1 = document.querySelector("#fruit1");
const selectFruit2 = document.querySelector("#fruit2");
const selectFruit3 = document.querySelector("#fruit3");

async function getFruitData() {
  const response = await fetch(urlFruits);
  const data = await response.json();
  displaySelectFruit(data, selectFruit1);
  displaySelectFruit(data, selectFruit2);
  displaySelectFruit(data, selectFruit3);
}

getFruitData();

const displaySelectFruit = (fruits, selectElement) => {
  fruits.forEach((fruit) => {
    // Create element option to add to the select element
    let option = document.createElement("option");
    
    // Build name content to show fruit's name 
    option.textContent = `${fruit.name}`;

    // Set attribute value with fruit name
    option.setAttribute("value", fruit.name);

    // Append select element with the created option
    selectElement.appendChild(option);
  });
  // end of forEach loop
};
