const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const id = "43c2ec102a516a092fcb7b8484427014&units";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    id +
    "=metric";
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      //   console.log(data);
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const url = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(weatherData);
      console.log("The temperature is " + temperature);
      console.log("Description of Weather : " + description);

      res.write(
        "<h1>The Temperature in " +
          query +
          " is : " +
          temperature +
          " degree Celcius.</h1>"
      );
      res.write("<h4>The Weather is currently : " + description + " .</h4>");
      res.write("<img src=" + url + ">");

      res.send();
    });
  });
});

app.listen(port, function () {
  console.log("Server is running on port 3000.");
});
