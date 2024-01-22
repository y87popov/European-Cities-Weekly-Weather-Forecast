async function selectFunction() {
    coordinates = document.getElementById('selectId').value;
    url = "https://www.7timer.info/bin/api.pl?" + coordinates + "&product=civillight&output=json";
    showResult(url);
}
async function showResult(url) {
    for (x = 0; x < 5; x++) {

        try {

            weatherData = [];
            const response = await fetch(url);
            var weatherData = await response.json();
            for (i = 0; i < 7; i++) {
                const d = (weatherData["dataseries"][i]["date"]);
                var dateString = JSON.stringify(d);
                var year = dateString.substring(0, 4);
                var month = dateString.substring(4, 6);
                var day = dateString.substring(6, 8);
                var date = new Date(year, month - 1, day);
                const weather = (weatherData["dataseries"][i]["weather"]);
                const tempMax = (weatherData["dataseries"][i]["temp2m"]["max"]);
                const tempMin = (weatherData["dataseries"][i]["temp2m"]["min"]);
                const wind10m_max = (weatherData["dataseries"][i]["wind10m_max"]);
                document.getElementById("date" + i).innerHTML = date.toDateString();
                document.getElementById("weather" + i).innerHTML = JSON.stringify(weather);
                document.getElementById("tempMax" + i).innerHTML = "Temp Max: " + JSON.stringify(tempMax) + "ºC";
                document.getElementById("tempMin" + i).innerHTML = "Temp Min: " + JSON.stringify(tempMin) + "ºC";
                document.getElementById("wind10m_max" + i).innerHTML = "Wind max: " + JSON.stringify(wind10m_max);
                selectWeatherImage(weather, i);
                    asdasdsad;

            }
            document.getElementById("hiddenDiv").style.display = "block"
            console.log("Result shown successfully.");
            break;
        }

        catch (err) {

            console.log("Error!");

            if (x == 4) {
                alert("We cannot show you the forecast at this time. Please, try again later.");
                console.log("We cannot show you the forecast at this time. Please, try again later.");
                break;

            }


        }

    }
}
function selectWeatherImage(weather, i) {
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