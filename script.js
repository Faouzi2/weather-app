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

      temperature.innerHTML = `  ${city}  ${parseInt(json.main.temp)}°C`;
      description.innerHTML = `  ${json.weather[0].description}`;
      humidity.innerHTML = `HUMIDITY: ${json.main.humidity}%`;
      windSpeed.innerHTML = `WIND SPEED: ${json.wind.speed}`;

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "pics/clear.png";
          break;

        case "Rain":
          image.src = "pics/rain.png";
          break;
        case "Cloud":
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
});

