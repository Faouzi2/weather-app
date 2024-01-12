document.getElementById("btn").addEventListener("click", () => {
  const APIkey = "8a2a1a01e8ab3529babe58c9b8a6e5b5";
  const city = document.getElementById("search-box").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
  )
    .then((response) => response.json())
    .then((json) => {
      const temperature = document.querySelector(".weather-stat .temp");
      const description = document.querySelector(".weather-stat .sky");
      const image = document.querySelector(".weather-stat img");
      const humidity = document.querySelector(".weather-stat .humid");
      const windSpeed = document.querySelector(".weather-stat .wind");

      temperature.innerHTML = `${city}<br> ${parseInt(json.main.temp)}°C`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `HUMIDITY: ${json.main.humidity}%`;
      windSpeed.innerHTML = `WIND SPEED: ${json.wind.speed} MPH`;

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "pics/clear.png";
          break;

        case "Rain":
          image.src = "pics/rain.png";
          break;
        case "Clouds":
          image.src = "pics/cloud.png";
          break;
        case "Mist":
          image.src = "pics/mist.png";
          break;
        case "Snow":
          image.src = "pics/snow.png";
          break;
        default:
          image.src = "pics/cloud.png";
          break;
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIkey}`
  )
    .then((response) => response.json())
    .then((json) => {
      for (let i = 0; i < 4; i++) {
        const dayStat = document.querySelector(`.day${i + 1}-stat`);
        const img = document.querySelector(`.day${i + 1}img`);
        const temp = document.querySelector(`.day${i + 1}temp`);
        const sky = document.querySelector(`.day${i + 1}sky`);

        const date = new Date(json.list[i * 8].dt * 1000);
        const dayOfWeek = date.toLocaleDateString("en-UK", {
          weekday: "short",
        });

        dayStat.innerHTML = dayOfWeek;
        img.src = getWeatherIcon(json.list[i * 8].weather[0].main);
        temp.innerHTML = `${parseInt(json.list[i * 8].main.temp)} °C`;
        sky.innerHTML = json.list[i * 8].weather[0].description;
      }
    })
    .catch((error) => {
      console.error("Error fetching forecast data:", error);
    });
});

function getWeatherIcon(weatherMain) {
  switch (weatherMain) {
    case "Clear":
      return "pics/clear.png";
    case "Rain":
      return "pics/rain.png";
    case "Clouds":
      return "pics/cloud.png";
    case "Mist":
      return "pics/mist.png";
    case "Snow":
      return "pics/snow.png";
    default:
      return "pics/cloud.png";
  }
}

