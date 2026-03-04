const button = document.querySelector(".search-button");
const card = document.querySelector("#card");
const input = document.querySelector("#search-bar");
const icon = document.querySelector("#weather_icon");
const weath = document.querySelector("#weath");
const area = document.querySelector("#area");
const theme = document.querySelector("#theme");
const body = document.querySelector("body");
const temper = document.querySelector("#weatemp");
const dateNow = document.querySelector("#date");
const humidity = document.querySelector("#humidity");
const windsp = document.querySelector("#Wind");
const feel = document.querySelector("#feel");
const precipi = document.querySelector("#precip");
const visibi = document.querySelector("#visib");
const winnddir = document.querySelector("#winnddir");
const subcat = document.querySelector(".other");


const d = new Date();
const subthem = ["light", "dark"]
const themeClasses = ["morning", "afternoon", "evening", "night"];
const dayAray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const day = dayAray[d.getDay()];
const month = monthArray[d.getMonth()];
const date = d.getDate();
const finalToday = `${day}, ${date} ${month}`;
console.log(finalToday);
dateNow.innerHTML = finalToday;

function setTimeBasedTheme(hour) {
  let currentTheme;

  if (hour >= 5 && hour < 10) {
    currentTheme = "morning";
    body.classList.add("lighttheme");
    theme.innerHTML = '<i class="fa-solid fa-moon"></i>';
    theme.style.color = "black";
    theme.style.backgroundColor = "white";
     theme.style.padding = "15px 20.5px";
   } else if (hour >= 10 && hour < 16) {
    currentTheme = "afternoon";
     body.classList.add("lighttheme");
    theme.innerHTML = '<i class="fa-solid fa-moon"></i>';
    theme.style.color = "black";
    theme.style.backgroundColor = "white";
     theme.style.padding = "15px 20.5px"; 
  } else if (hour >= 16 && hour < 20) {
    currentTheme = "evening";
    body.classList.remove ("lighttheme"); 
    theme.innerHTML = '<i class="fa-solid fa-sun"></i>';
    theme.style.color = "white";
    theme.style.backgroundColor = "black"; 
    theme.style.padding = "15px 16.5px"  
  } else {
    currentTheme = "night";
    body.classList.remove("lighttheme"); 
    theme.innerHTML = '<i class="fa-solid fa-sun"></i>';
    theme.style.color = "white";
    theme.style.backgroundColor = "black"; 
    theme.style.padding = "15px 16.5px"
  }

  card.classList.remove(...themeClasses);
  card.classList.add(currentTheme);
}


const now = new Date();
const currentHour = now.getHours();
setTimeBasedTheme(currentHour);

async function getData(cityName) {
  const promise = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=bc3dee1022b949b2a5f121559252105&q=${cityName}&aqi=yes`
  );
  return await promise.json();
}

async function fetchWeather() {
  const value = input.value;
  if (!value) return;

  const result = await getData(value);
  console.log(result);
  area.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
  area.style.textTransform = "capitalize";
  area.style.opacity = "0.75";

  const cloud = result.current.cloud;
  const precip = result.current.precip_mm;
  const humid = result.current.humidity;
  const visib = result.current.vis_km;
  const wind = result.current.wind_kph;
  const gust = result.current.gust_kph;
  const phase = result.current.is_day;
  const temp = result.current.temp_c;
  const uv = result.current.uv;
  const feels = result.current.feelslike_c;
  const winddir = result.current.wind_dir;
  winnddir.innerText = `${winddir}`;
  precipi.innerText = `${precip}mm`;
  visibi.innerText = `${visib}km`;
  humidity.innerText = `${humid}%`;
  windsp.innerText = `${wind}km/h`;
  feel.innerText = `${feels}°C`;

  if (cloud < 20 && precip === 0 && phase === 1) {
    
    icon.innerHTML = `<img src="sunny.png">`;
    temper.innerText = `${temp}°C`;
    weath.innerText = `Sunny`;
    card.classList.remove(...themeClasses);
    subcat.classList.remove(...subthem);
    card.classList.add("morning");
    subcat.classList.add("light");
  } else if (cloud < 20 && precip === 0 && phase === 0) {
    
    icon.innerHTML = `<img src="nightmoon.png">`;
    temper.innerText = `${temp}°C`;
    weath.innerText = `Clear`;
    card.classList.remove(...themeClasses);
    subcat.classList.remove(...subthem);
    card.classList.add("night");
    subcat.classList.add("dark");
  } else if (cloud >= 20 && cloud <= 60 && precip === 0 && phase === 1 && uv >= 3 && uv <= 6) {
    
    icon.innerHTML = `<img src="partialy.png">`;
    temper.innerText = `${temp}°C`;
    weath.innerText = `Partly Cloudy`;
    card.classList.remove(...themeClasses);
    subcat.classList.remove(...subthem);
    card.classList.add("afternoon");
    subcat.classList.add("light");
  } else if (cloud >= 20 && cloud <= 60 && precip === 0 && phase === 0) {
    
    icon.innerHTML = `<img src="cloudymoon.png">`;
    temper.innerText = `${temp}°C`;
    weath.innerText = `Partly Cloudy`;
    card.classList.remove(...themeClasses);
    subcat.classList.remove(...subthem);
    card.classList.add("night");
    subcat.classList.add("dark");
  } else if (cloud > 60 && precip === 0 && visib > 5) {
    
    icon.innerHTML = `<img src="cloudy.png">`;
    temper.innerText = `${temp}°C`;
    weath.innerText = `Cloudy`;
    card.classList.remove(...themeClasses);
    subcat.classList.remove(...subthem);
    card.classList.add(phase == 1 ? "afternoon" : "night");
    subcat.classList.add(phase == 1 ? "light" : "dark");
  } else if (precip > 0.1 && cloud > 50) {
    
    icon.innerHTML = `<img src="rainy.png">`;
    temper.innerText = `${temp}°C`;
    weath.innerText = `Raining`;
    card.classList.remove(...themeClasses);
    subcat.classList.remove(...subthem);
    card.classList.add(phase == 1 ? "afternoon" : "night");
    subcat.classList.add(phase == 1 ? "light" : "dark");
  } else if (precip > 2 && cloud > 70 && wind > 30 && humid > 80) {
    
    icon.innerHTML = `<img src="stormy.png">`;
    temper.innerText = `${temp}°C`;
    weath.innerText = `Stormy`;
    card.classList.remove(...themeClasses);
    subcat.classList.remove(...subthem);
    card.classList.add(phase == 1 ? "afternoon" : "night");
    subcat.classList.add(phase == 1 ? "light" : "dark");
  } else if (cloud >= 20 && visib < 6 && humid > 30) {
    
    icon.innerHTML = `<img src="foggymist.png">`;
    temper.innerText = `${temp}°C`;
    weath.innerText = `Mist`;
    card.classList.remove(...themeClasses);
    subcat.classList.remove(...subthem);
    card.classList.add(phase == 1 ? "afternoon" : "night");
    subcat.classList.add(phase == 1 ? "light" : "dark");
  } else if (wind > 30 && gust > 40) {
    
    icon.innerHTML = `<img src="windy.png">`;
    temper.innerText = `${temp}°C`;
    weath.innerText = `Windy`;
    card.classList.remove(...themeClasses);
    subcat.classList.remove(...subthem);
    card.classList.add(phase == 1 ? "afternoon" : "night");
    subcat.classList.add(phase == 1 ? "light" : "dark");
  }
}

button.addEventListener("click", fetchWeather);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchWeather();
  }
});

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);

      try {
     
        const result = await getData(`${lat},${lon}`);
        console.log("Auto-fetched weather data:", result);

        input.value = `${result.location.name}, ${result.location.region}`;
        
        fetchWeather();
      } catch (error) {
        console.error("Failed to fetch weather for current location:", error);
        
      }
    });
  } else {
    console.warn("Geolocation is not supported by this browser.");
  }
});

function themecha(){
  body.classList.toggle("lighttheme");
  if(theme.innerHTML === '<i class="fa-solid fa-moon"></i>') {
    theme.innerHTML = '<i class="fa-solid fa-sun"></i>';
    theme.style.color = "white";
    theme.style.backgroundColor = "black";
    theme.style.padding = "15px 16.5px"
  }else{
    theme.innerHTML = '<i class="fa-solid fa-moon"></i>'
    theme.style.color = "black";
    theme.style.backgroundColor = "white";
    theme.style.padding = "15px 20.5px"; 
  }
}
