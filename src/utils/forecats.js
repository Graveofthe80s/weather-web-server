const request = require("request");

const forecast = (lat, lon, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=5986c2ae459828bba2c31716b8dcd19b&query=${lat},${lon}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb("Unable to connect to weather service", undefined);
    } else if (body.error) {
      cb("Unable to find location.", undefined);
    } else {
      const { current } = body;
      const { temperature, feelslike } = current;
      cb(
        undefined,
        `It is currently ${temperature} degrees out, but it feels like ${feelslike}`
      );
    }
  });
};

module.exports = forecast;
