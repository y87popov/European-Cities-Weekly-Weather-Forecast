document.addEventListener('DOMContentLoaded', function () {
    // Read the CSV file and populate the select element
    fetch('city_coordinates.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip header row
            const selectElement = document.getElementById('selectId');

            rows.forEach(row => {
                const [latitude, longitude, city, country] = row.split(',');

                // Check if country is available, else handle the error
                const optionText = country ? `${city}, ${country}` : city;
                
                const option = document.createElement('option');
                option.value = `${longitude},${latitude}`;
                option.textContent = optionText;
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Error reading CSV file:', error));
});

function selectFunction() {
    const selectElement = document.getElementById('selectId');
    const selectedOption = selectElement.options[selectElement.selectedIndex];

    if (selectedOption) {
        const [longitude, latitude] = selectedOption.value.split(',');
        const locationString = `lon=${longitude}&lat=${latitude}`;
        console.log(locationString);
        var url = "https://www.7timer.info/bin/api.pl?" + locationString + "&product=civillight&output=json";
        showResult(url);
        // Further processing with locationString
    } else {
        console.error('No option selected');
    }
}

async function showResult(url) { //Showing result, but also catching an error if there is no proper response from the server.
    for (x = 0; x < 5; x++) { // It will try to fetch data and show the result 5 times in total, if there is a proper response it will stop/break.
        try {
            console.log("Getting weather forecast...");
            var weatherData = []; // Declaring an Array where the data will be written. 
            var response = await fetch(url); // Getting data from the url.
            weatherData = await response.json(); // Assigns the fetched data to the variable WeatherData. 
            for (i = 0; i < 7; i++) { // A for loop for each day of the week. 
                var d = (weatherData["dataseries"][i]["date"]); // Getting the date. For now it is just a number, not a proper date format.
                var dateString = JSON.stringify(d); // Casting the date from a number to a string.
                var year = dateString.substring(0, 4); // Taking the first 4 symbols as an year.
                var month = dateString.substring(4, 6); // Taking the 5th and 6th symbols as a month.
                var day = dateString.substring(6, 8); // Taking the last 2 symbols as a day of the month.
                var date = new Date(year, month - 1, day); // Casting the above into a regular date format.
                var weather = (weatherData["dataseries"][i]["weather"]); // Saving the weather for each day into the weather variable.
                var tempMax = (weatherData["dataseries"][i]["temp2m"]["max"]); // Saving the maximum temperature for each day into the tempMax variable.
                var tempMin = (weatherData["dataseries"][i]["temp2m"]["min"]); // Saving the minimum temperature for each day into the tempMin variable.
                var wind = (weatherData["dataseries"][i]["wind10m_max"]); // Saving the wind speed for each day into the wind variable.
                document.getElementById("date" + i).innerHTML = date.toDateString(); // Showing the date for each day.
                document.getElementById("weather" + i).innerHTML = JSON.stringify(weather); // Showing the weather for each day.
                document.getElementById("tempMax" + i).innerHTML = JSON.stringify(tempMax) + "ºC "; // Showing the maximum temperatures for each day.
                document.getElementById("tempMin" + i).innerHTML = JSON.stringify(tempMin) + "ºC"; // Showing the minimum temperatures for each day.
                document.getElementById("wind" + i).innerHTML = "Wind: " + JSON.stringify(wind); // Showing the wind speed for each day.
                selectWeatherImage(weather, i); // Calling the function that determines the image for the weather.
            }
            document.getElementById("hiddenDiv").style.display = "block" // Showing the cards. (They are not shown before this.)
            console.log("Result shown successfully.");
            break; // If the response from the server is correct it will stop executing the for loop.
        }
        catch (err) {
            if (x != 4) { // If the error was repeated less than 5 times it will just continue.
                console.log("Error!");
            }
            else { // If the error has being repeated for the 5th time it will show an alert and stop.
                alert("We cannot show you the forecast at this time. Please, try again later.");
                console.log("We cannot show you the forecast at this time. Please, try again later.");
            }
        }
    }
}
async function selectWeatherImage(weather, i) { // Selecting an image for each weather.
    if (weather == "clear") { document.getElementById("img" + i).src = "images/clear.png"; }
    if (weather == "cloudy") { document.getElementById("img" + i).src = ("images/cloudy.png"); }
    if (weather == "fog") { document.getElementById("img" + i).src = ("images/fog.png"); }
    if (weather == "humid") { document.getElementById("img" + i).src = ("images/humid.png"); }
    if (weather == "ishower") { document.getElementById("img" + i).src = ("images/ishower.png"); }
    if (weather == "lightrain") { document.getElementById("img" + i).src = ("images/lightrain.png"); }
    if (weather == "lightsnow") { document.getElementById("img" + i).src = ("images/lightsnow.png"); }
    if (weather == "mcloudy") { document.getElementById("img" + i).src = ("images/mcloudy.png"); }
    if (weather == "oshower") { document.getElementById("img" + i).src = ("images/oshower.png"); }
    if (weather == "pcloudy") { document.getElementById("img" + i).src = ("images/pcloudy.png"); }
    if (weather == "rainsnow") { document.getElementById("img" + i).src = ("images/rainsnow.png"); }
    if (weather == "snow") { document.getElementById("img" + i).src = ("images/snow.png"); }
    if (weather == "tsrain") { document.getElementById("img" + i).src = ("images/tsrain.png"); }
    if (weather == "tstorm") { document.getElementById("img" + i).src = ("images/tstorm.png"); }
    if (weather == "windy") { document.getElementById("img" + i).src = ("images/windy.png"); }
}