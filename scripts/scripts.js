//-------------------last update------------------//
const dateObj = new Date();
const year = dateObj.getFullYear();
document.querySelector("#currentYear").textContent = year;

const lastUpdated = document.lastModified;
document.querySelector("#lastUpdated").textContent = lastUpdated;

//----------------date for forecast----------------//
// Select the HTML element to manipulate
// const date1 = document.querySelector("#day-1");
// const message = document.querySelector("#emessage");

// // Try to complete the method with options
// try {
// const options = {
//   weekday: "short",
//   day: "numeric",
//   month: "short",
// };
// console.log(dateObj);
// let date1 = `${dateObj.toLocaleDateString("en-US", options)}`;
// console.log(date1);
// date1.innerHTML = `${new Date().toLocaleDateString("en-US", options)}`;
// } catch (e) {
// 	console.log("Error with code or your browser does not support Locale");
// }

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
  let firstday = new Date(weatherData.list[8].dt);
  console.log(firstday);
  forecast1.innerHTML = `${firstday.toLocaleDateString(
    "en-US",
    options
  )} ${t}˚ `;

  let t2 = weatherData.list[16].main.temp.toFixed(0);
  let secondDay = new Date(weatherData.list[16].dt);
  console.log(secondDay);
  forecast2.innerHTML = `${secondDay.toLocaleDateString(
    "en-US",
    options
  )} ${t2}˚ `;

  let t3 = weatherData.list[24].main.temp.toFixed(0);
  let thirdDay = new Date(weatherData.list[24].dt);
  console.log(thirdDay);
  forecast3.innerHTML = `${thirdDay.toLocaleDateString(
    "en-US",
    options
  )} ${t3}˚ `;
}

//-------------------------fresh.html--------------------//

const urlFruits = "https://brotherblazzard.github.io/canvas-content/fruit.json";

const selectFruit = document.querySelector("select");

async function getFruitData() {
  const response = await fetch(urlFruits);
  const data = await response.json();
  displaySelectFruit(data);
  // I added an new argument to this function displayCompanies to pass cards element.
  // console.table(data.companies);
  // note that we reference the prophet array of the data object given the structure of the json file
}

getFruitData();

const displaySelectFruit = (fruits) => {
  // const cards = document.querySelector("article");
  // select the output container element

  fruits.forEach((fruit) => {
    // Create elements to add to the div.cards element
    let option = document.createElement("option");
    
    // Build the name content out to show the companies'  name - finish the template string
    option.textContent = `${fruit.name}`;

    // Build the image by setting all the relevant attributes
    option.setAttribute("value", fruit.name);

    // Append the section(card) with the created elements
    selectFruit.appendChild(option);
  });
  // end of forEach loop
};
