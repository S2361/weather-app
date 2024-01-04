const apiKey = '86bc0c7700ff45abb28175214230911';
const firstForecast = 'http://api.weatherapi.com/v1/forecast.json?key=86bc0c7700ff45abb28175214230911&q=';
const secondForecast = '&days=3&aqi=yes&alerts=no';
const searchAutocomplete = 'http://api.weatherapi.com/v1/search.json?key=86bc0c7700ff45abb28175214230911&q=';
const collegePark = firstForecast + 'college park' + secondForecast;
let recentURL = collegePark;
function dataLoader(weatherURL, day) {    
    recentURL = weatherURL;
    fetch(weatherURL, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        // Accessing values from the response
        const locationName = data.location.name;
        const region = data.location.region;
        const country = data.location.country;
        const localTime = data.location.localtime;
        const currentConditionLink = data.current.condition.icon;
        
        //const currentTemperatureCelsius = data.current.temp_c;
        const currentTemperatureFahrenheit = data.current.temp_f; //idk how to adjust when changing day
        const currentWindSpeed = data.current.wind_mph;
        const currentCloud = data.current.cloud;
        const currentHumidity = data.current.humidity;

        //Today's forecast temperatures
        const morningTemperature = data.forecast.forecastday[day].hour[7].temp_f; //@7:00 am
        const afternoonTemperature = data.forecast.forecastday[day].hour[13].temp_f; //@1:00 pm
        const eveningTemperature = data.forecast.forecastday[day].hour[18].temp_f; //@6:00 pm
        const nightTemperature = data.forecast.forecastday[day].hour[22].temp_f; //@10:00 pm

        //Today's forecast image links
        const morningIconLink = data.forecast.forecastday[day].hour[7].condition.icon;
        const afternoonIconLink = data.forecast.forecastday[day].hour[13].condition.icon;
        const eveningIconLink = data.forecast.forecastday[day].hour[18].condition.icon;
        const nightIconLink = data.forecast.forecastday[day].hour[22].condition.icon;

        //Future forecast 3 days MAX temperatures (includes current day)
        //Should include min temperatures next to max
        const todayMaxTemp = data.forecast.forecastday[0].day.maxtemp_f;
        const tomorrowMaxTemp = data.forecast.forecastday[1].day.maxtemp_f;
        const followingTomorrowMaxTemp = data.forecast.forecastday[2].day.maxtemp_f;

        //Future forecasts 3 days image links (includes current day)
        const todayOverallLink = data.forecast.forecastday[0].day.condition.icon;
        const tomorrowOverallLink = data.forecast.forecastday[1].day.condition.icon;
        const followingTomorrowOverallLink = data.forecast.forecastday[2].day.condition.icon;

        //Writing to the html by ID for header
        document.getElementById('headingTime').innerText = localTime;
        if(region.length == 0) {
            document.getElementById('headingTemp').innerText = currentTemperatureFahrenheit + '° ' + locationName + ', ' + country;
            document.getElementById('headingLocation').innerText = locationName + ', ' + country;
        } else {
            document.getElementById('headingTemp').innerText = currentTemperatureFahrenheit + '° ' + locationName + ', ' + region + " " + country;
            document.getElementById('headingLocation').innerText = locationName + ', ' + region;
        }

        //Writing to the html by ID for the general weather info
        document.getElementById('temperature').innerText = `Temperature: ${currentTemperatureFahrenheit} °F`;
        document.getElementById('wind').innerText = `Wind: ${currentWindSpeed} mph`;
        document.getElementById('cloud').innerText = `Cloud Coverage: ${currentCloud}%`;
        document.getElementById('humidity').innerText = `Humidity: ${currentHumidity}%`;

        //Writing to the html by ID for the temperatures
        document.getElementById('morningTemp').innerText = morningTemperature + '°';
        document.getElementById('afternoonTemp').innerText = afternoonTemperature + '°';
        document.getElementById('eveningTemp').innerText = eveningTemperature + '°';
        document.getElementById('nightTemp').innerText = nightTemperature + '°';

        //Writing to the html by ID for the current condition image
        document.getElementById('currentIcon').src = `https:${currentConditionLink}`;

        //Writing to the html by ID for the condition images
        document.getElementById('morningIcon').src = `https:${morningIconLink}`;
        document.getElementById('afternoonIcon').src = `https:${afternoonIconLink}`;
        document.getElementById('eveningIcon').src = `https:${eveningIconLink}`;
        document.getElementById('nightIcon').src = `https:${nightIconLink}`;

        //Writing to the html by ID for the forecasted overall temperatures
        document.getElementById('todayTemp').innerText = todayMaxTemp + '°';
        document.getElementById('tomorrowTemp').innerText = tomorrowMaxTemp + '°';
        document.getElementById('followingTomorrowTemp').innerText = followingTomorrowMaxTemp + '°';

        //Writing to the html by ID for the forecasted days images 
        document.getElementById('todayIcon').src = `https:${todayOverallLink}`;
        document.getElementById('tomorrowIcon').src = `https:${tomorrowOverallLink}`;
        document.getElementById('followingTomorrowIcon').src = `https:${followingTomorrowOverallLink}`;

        //Retrieving 24 hours and icons from API
        const hourlyAPI = data.forecast.forecastday[day].hour;
        const hourlyTempsIcons = [];
        hourlyAPI.forEach(hour => {
            let tempArray = [];
            tempArray.push(hour.temp_f);
            tempArray.push(hour.condition.icon);
            hourlyTempsIcons.push(tempArray);
        });

        const timesContainer = document.getElementById('timesContainer');

        //Clear hourly temperatures
        timesContainer.innerHTML = '';

        //Creating hour div elements
        let hourNumber = 12;
        hourlyTempsIcons.forEach(tempIcon => {
            const hourTemp = tempIcon[0];
            const hourIconLink = tempIcon[1];
            const timeElement = createTimeElement(hourNumber, hourIconLink, hourTemp);
            timesContainer.appendChild(timeElement);
            hourNumber++;
            if(hourNumber > 12){
                hourNumber = 1;
            }
        });



    })
    .catch(error => console.error('Error:', error));
    console.log("dataLoader executed for: " + weatherURL);
}

//Default display
dataLoader(collegePark, 0);

//Creating possible suggestions for search-bar
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', updateSuggestions);

//Allowing forecasted Days to be clickable
const forecastedDays = document.querySelectorAll('.days .time');
forecastedDays.forEach(forecastedDay => {
    forecastedDay.addEventListener('click', function(){
        if(forecastedDay.classList.contains("today")) {
            console.log("today");
            dataLoader(recentURL, 0);
        } else if(forecastedDay.classList.contains("tomorrow")){
            console.log("tomorrow");
            dataLoader(recentURL, 1);
        } else {
            console.log("following tomorrow");
            dataLoader(recentURL, 2);
        }
    });
});

function updatePage() {
    // Get the user input
    const userInput = document.getElementById('searchInput').value;

    // Clearing suggestionsList
    suggestionsList.innerHTML = '';

    dataLoader(firstForecast + userInput + secondForecast, 0);
}

async function updateSuggestions(){ 
    // Cleaning input value  
    const inputValue = searchInput.value.trim().toLowerCase();
   
    // Clearing suggestionsList
    suggestionsList.innerHTML = '';

    if(inputValue.length == 0){
        return;
    }
    console.log(inputValue);

    // Determining what possible cities it could be
    const possibleCities = await possibleSuggestions(inputValue);
    console.log(possibleCities);

    // Display the search results
    possibleCities.forEach(result => {
        const resultElement = document.createElement('li');
        resultElement.textContent = result;
        resultElement.classList.add('location');
        resultElement.addEventListener('click', function() {
            dataLoader(firstForecast + resultElement.textContent + secondForecast, 0);
            document.getElementById('searchInput').value = resultElement.textContent;
            suggestionsList.innerHTML = '';
        });
        suggestionsList.appendChild(resultElement);
    });

    // Show/hide suggestions container
    if (possibleCities.length > 0) {
        suggestionsContainer.style.display = 'block';
    } else {
        suggestionsContainer.style.display = 'none';
    }

    //dataLoader(firstForecast + userInput + secondForecast);
}

async function possibleSuggestions(inputCity){
    let listCities = [];

    try {
        const res = await fetch(searchAutocomplete + inputCity, {
            method: 'GET',
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await res.json();

        data.forEach(location => {
            const countryName = location.country;
            const regionName = location.region;
            const cityName = location.name;
            if(regionName.length == 0) {
                listCities.push(cityName + ", " + countryName);
            } else {
                listCities.push(cityName + ", " + regionName);
            }
        });

        console.log("LIST CITIES:", listCities);
        return listCities;
    } catch (error) {
        console.error('Error fetching data:', error);
        return listCities; // Return an empty array or handle the error as needed
    }
}

//Creates a div element for hourly temperatures
function createTimeElement(time, iconLink, temperature) {
    const timeElement = document.createElement('div');
    timeElement.className = 'time';

    timeElement.innerHTML = `
      <h3>${time} AM/PM</h3>
      <div class="weather-icon">
        <img src="https:${iconLink}" alt="Weather Icon">
      </div>
      <p>${temperature}°</p>
    `;
    return timeElement;
  }