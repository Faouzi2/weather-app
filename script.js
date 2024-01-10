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

      temperature.innerHTML = `Temperature in  ${city}  ${parseInt(
        json.main.temp
      )} °C`;
      description.innerHTML = `With  ${json.weather[0].description}`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
});
