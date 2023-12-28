const apiKey = '86bc0c7700ff45abb28175214230911';

const forecastAQ = 'http://api.weatherapi.com/v1/forecast.json?key=86bc0c7700ff45abb28175214230911&q=college park&days=3&aqi=yes&alerts=no';
fetch(forecastAQ, {
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
        const currentTemperatureFahrenheit = data.current.temp_f;
        const currentWindSpeed = data.current.wind_mph;
        const currentCloud = data.current.cloud;
        const currentHumidity = data.current.humidity;

        //Today's forecast temperatures
        const morningTemperature = data.forecast.forecastday[0].hour[7].temp_f; //@7:00 am
        const afternoonTemperature = data.forecast.forecastday[0].hour[13].temp_f; //@1:00 pm
        const eveningTemperature = data.forecast.forecastday[0].hour[18].temp_f; //@6:00 pm
        const nightTemperature = data.forecast.forecastday[0].hour[22].temp_f; //@10:00 pm

        //Today's forecast image links
        const morningIconLink = data.forecast.forecastday[0].hour[7].condition.icon;
        const afternoonIconLink = data.forecast.forecastday[0].hour[13].condition.icon;
        const eveningIconLink = data.forecast.forecastday[0].hour[18].condition.icon;
        const nightIconLink = data.forecast.forecastday[0].hour[22].condition.icon;

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
        document.getElementById('headingLocation').innerText = locationName + ', ' + country;
        document.getElementById('headingTime').innerText = localTime;
        document.getElementById('headingTemp').innerText = currentTemperatureFahrenheit + '° ' + locationName + ', ' + region;

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


    })
    .catch(error => console.error('Error:', error));