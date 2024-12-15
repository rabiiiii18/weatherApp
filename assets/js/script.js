const cityInput = document.querySelector(".cityName");
const searchBtn = document.querySelector(".search");

const mainSection = document.querySelector(".mainSection");
const notFoundSection = document.querySelector(".notFound");
const searchCitySection = document.querySelector(".cityFound");

const locationTxt = document.querySelector(".location");
const tempText = document.querySelector(".temp-text");
const humidityText = document.querySelector(".humidity-txt");
const windSpeedTxt = document.querySelector(".windSpeed-txt");
const weatherTxt = document.querySelector(".weather-txt");
const smallWeatherTxt=document.querySelector(".smallWeatherTxt");
const dateTxt = document.querySelector(".currentDate-text");
const imgDesc = document.querySelector(".imgDescription");
const time=document.querySelector(".CurrentTime");

const apiKey = "60e036ffca9ddd83be2aa9eef15661a3";

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != "") {
        updateWeather(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
})

cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && cityInput.value.trim() != "") {
        updateWeather(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
})

async function getFetchData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    const response = await fetch(url);
    return response.json()
}
async function updateWeather(city) {
    const weatherData = await getFetchData(city);
    if (weatherData.cod == 404) {
        showSection(notFoundSection);
        return
    }
    console.log(weatherData);
    const { name: country,
        main: { temp, humidity,pressure, },
        wind: { speed },
        weather: [{ id, main }]

    } = weatherData;

    locationTxt.textContent = country;
    tempText.innerHTML = `${Math.round(temp)}<sup>°C</sup>`;
    humidityText.innerHTML = Math.round(humidity) + "%";
    windSpeedTxt.innerHTML = Math.round(speed) + " mph";
    weatherTxt.textContent = main;
    smallWeatherTxt.textContent=main;
    dateTxt.textContent = getCurrentDate();
    imgDesc.src = `./assets/image/weather/${getWeatherIcon(id)}`
    // time.innerHTML = getCurrentTime();
    

    showSection(mainSection);
}


function getWeatherIcon(id) {
    console.log(id);
    if (id < 232) return 'thunderstorm.svg'
    if (id < 321) return 'drizzle.svg'
    if (id < 531) return 'rain.svg'
    if (id < 622) return 'snow.svg'
    if (id < 781) return 'atmosphere.svg'
    if (id < 800) return 'clear.svg'
    else return 'clouds.svg'
}


function getCurrentDate() {
    const date = new Date();
    const option = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return date.toLocaleDateString('en-GB', option);
}

 



function showSection(section) {
    [mainSection, notFoundSection, searchCitySection].forEach(section =>
        section.style.display = 'none')
    section.style.display = 'flex';
}

