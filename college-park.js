const apiKey = '86bc0c7700ff45abb28175214230911';

const forecastAQ = 'http://api.weatherapi.com/v1/forecast.json?key=86bc0c7700ff45abb28175214230911&q=College Park&days=1&aqi=yes&alerts=no';


fetch('http://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=College Park', {
    method: 'GET',
})
/*
    .then(res => {
        if(res.ok){
            res.json();
            console.log('Success');
        } else {
            console.log('UNSUCCESSFUL');
        }
    })
*/
    .then(res => res.json())
    .then(data => {
        // Accessing values from the response
        const locationName = data.location.name;
        const region = data.location.region;
        const country = data.location.country;
        
        //const currentTemperatureCelsius = data.current.temp_c;
        const currentTemperatureFahrenheit = data.current.temp_f;
        const currentWindSpeed = data.current.wind_mph;
        const currentCloud = data.current.cloud;
        const currentHumidity = data.current.humidity;

        //indicate night or day?
        const isDay = data.current.is_day;
        
        const conditionText = data.current.condition.text;
        const conditionIconURL = data.current.condition.icon;
        

        
        // Log or use the values
        /*
        console.log('Location:', locationName, region, country);
        console.log('Current Temperature:', currentTemperatureCelsius, '°C /', currentTemperatureFahrenheit, '°F');
        console.log('Is Day:', isDay === 1 ? 'Yes' : 'No');
        console.log('Condition:', conditionText);
        console.log('Condition Icon URL:', conditionIconURL);
        */

        //document.getElementById('location').innerText = `Location: ${locationName}`;
        document.getElementById('temperature').innerText = `Temperature: ${currentTemperatureFahrenheit} °F`;
        document.getElementById('wind').innerText = `Wind: ${currentWindSpeed} mph`;
        document.getElementById('cloud').innerText = `Cloud Coverage: ${currentCloud}%`;
        document.getElementById('humidity').innerText = `Humidity: ${currentHumidity}%`;

    })
    .catch(error => console.error('Error:', error));