const fetchlocation = (address) => {
  fetch(`http://localhost:3000/weather?address=${address}`).then((res) => {
    res.json().then((data) => {
      data.error
        ? console.log(data.error)
        : console.log(data.location, data.forecast);
    });
  });
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#one");
const messageTwo = document.querySelector("#two");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  if (location) {
    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
      res.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    });
  }
});
