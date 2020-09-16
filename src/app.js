const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecats");

const app = express();
const port = process.env.PORT || 3000;

/** Define paths for Express config */
const pubDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views"); //Customized views directory
const partialsPath = path.join(__dirname, "../templates/partials");

/** Setup handlebars engine and views location */
app.set("view engine", "hbs"); // Allows to render dynamic web pages
app.set("views", viewsPath); // Views directory
hbs.registerPartials(partialsPath);

/** Setup static directory to serve */
app.use(express.static(pubDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Yago Ferreira",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Yago Ferreira",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Wsparczy",
    message: "To jest pomocny text.",
    name: "Yago Ferreira",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }

  geocode(req.query.address, (error, { lat, lon, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lat, lon, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Yago Ferreira",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Yago Ferreira",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
