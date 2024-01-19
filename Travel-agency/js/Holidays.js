async function getHolidays() {
  const countryInput = document.getElementById("searchCountry").value;
  const yearInput = document.getElementById("searchYear").value;

  // Holidays API URL

  const holidayUrl = `https://api.api-ninjas.com/v1/holidays?X-Api-Key=yBgXLgi2xsi8mrK422zDsQ==nYjEJj5Lqbx2fQd9&country=${countryInput}&year=${yearInput}`;

  try {
    const result = await fetch(holidayUrl);
    const myHolidays = await result.json();

    // Log the fetched holidays for debugging
    console.log(myHolidays);

    // Clear existing content in the holiday table
    const holidayTableBody = document.querySelector("#holidayTable tbody");
    holidayTableBody.innerHTML = "";

    if (!countryInput.trim() || !yearInput.trim()) {
      alert("Country and Year are required fields.");
      return;
    } else {
      // Iterate through each holiday in the array
      for (let i = 0; i < myHolidays.length; i++) {
        const holiday = myHolidays[i];

        // Here I created a new table row for each holiday
        const holidayRow = document.createElement("tr");

        // Update HTML elements for each holiday
        holidayRow.innerHTML = `
            <td>${holiday.date}</td>
            <td>${holiday.name}</td>
            <td>${holiday.type}</td>
          `;

        // Append the holiday row to the table body
        holidayTableBody.appendChild(holidayRow);
      }
    }
  } catch (error) {
    console.error("Error fetching holidays:", error);
  }

  document.getElementById("destinationTitle").innerHTML = `${countryInput}`;
  document.getElementById(
    "destinationTitleHolidays"
  ).innerHTML = `in ${countryInput}`;
  document.getElementById("tempC").innerHTML = `c`;

  // Search Photo by Country API URL

  const searchPhotoUrl = `https://api.unsplash.com/search/photos?query=${countryInput}&client_id=bafav7h4vq6gtFO4iXzQtwinqfKhSA6KVWQ5UATp5a8`;

  const response = await fetch(searchPhotoUrl);
  const photoData = await response.json();
  console.log(photoData);

  var image = photoData.results[1].urls.raw;
  var imageElement = document.getElementById("photo");
  imageElement.src = image;
  console.log(imageElement);

  const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=180d3e8aa32945f2968170915232012&q=${countryInput}`;
  const weatherResponse = await fetch(currentWeatherUrl);
  const weatherData = await weatherResponse.json();

  const temp_c = weatherData.current.temp_c;
  document.getElementById("temp").innerHTML = temp_c;
  console.log(weatherData);

  const icon = weatherData.current.condition.icon;
  const iconElement = document.getElementById("icon");
  iconElement.src = icon;

  const weatherForecastUrl = `https://api.weatherapi.com/v1/forecast.json?q=${countryInput}&key=180d3e8aa32945f2968170915232012&days=7`;
  const weatherForecastResponse = await fetch(weatherForecastUrl);
  const weatherForecastData = await weatherForecastResponse.json();

  // Clear existing content in the forecast table
  const weatherTableBody = document.querySelector("#weatherTable tbody");
  weatherTableBody.innerHTML = "";

  // Iterate through each forecast day
  for (let i = 0; i < weatherForecastData.forecast.forecastday.length; i++) {
    const forecastDay = weatherForecastData.forecast.forecastday[i];

    // Create a new table row for each forecast day
    const forecastRow = document.createElement("tr");

    // Update HTML elements for each forecast day

    const icon = weatherForecastData.current.condition.icon;
    forecastRow.innerHTML = `
      <td>${forecastDay.date}</td>
      <td> <span style="margin-left:5px">${forecastDay.day.avgtemp_c} <img src="${icon}" alt=""></span></td>
      
    `;

    // Append the forecast row to the table body
    weatherTableBody.appendChild(forecastRow);
  }
}

document
  .getElementById("searchCountry")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      getHolidays();
    }
  });

document
  .getElementById("searchYear")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      getHolidays();
    }
  });
