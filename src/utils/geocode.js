const request = require("request");

const geocode = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoieWZlcjgwcyIsImEiOiJja2UzNXdwaGkwZzVnMnJ1bGw1eWk4ZWhqIn0.5PomoVQ81gO5tjw9Pf-xsg&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      cb("Unable to find location. Try another search.", undefined);
    } else {
      cb(undefined, {
        lat: body.features[0].center[1],
        lon: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
