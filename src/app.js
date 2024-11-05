// DON'T CHANGE THIS LINE
window.myBadAssGarage = 'fhat-rocket';
if (myBadAssGarage)
  document.querySelector('#garage-name').innerText = myBadAssGarage.replace(
    /-/g,
    ' ',
  );


const displayCars = (cars) => {
  carGarage.innerHTML = "";
  cars.forEach((car) => {
    const owner = car.owner;
    const plate = car.plate;
    const model = car.model;
    const brand = car.brand;
    // insert into list
    carGarage.insertAdjacentHTML(
      "beforeend", 
      `<div class="car">
        <div class="car-image">
          <img src="http://loremflickr.com/280/280/${brand},${model}" />
        </div>
        <div class="car-info">
          <h4>${brand} ${model}</h4>
          <p><strong>Owner:</strong> ${owner}</p>
          <p><strong>Plate:</strong> ${plate}</p>
        </div>
      </div>`
    );
  });
};

const addCar = (event) => {
  const buildRadCar = () => {
    return {
      owner: ownerInput.value,
      brand: brandInput.value,
      plate: plateInput.value,
      model: modelInput.value
    }
  }
  
  event.preventDefault();
  fetch(garageUrl, {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(buildRadCar())
  }).then(response => response.json())
  .then((data) => {
    console.log(data);
    refresh();
  })
}

// Get all the cars
// //////////////////////

// select cars-list
const carGarage = document.querySelector(".cars-list");
// fetch api get
const garageUrl = "https://garage.api.lewagon.com/fhat-rocket/cars"
const refresh = () => {fetch(garageUrl) 
  .then(res => res.json())
  .then((data) => {
    console.log(data);
    // iterate through the cars
    displayCars(data);
  });
};

refresh();

// Add a new car
// //////////////////////

// select inputs (four)
const brandInput = document.querySelector("#brand");
const modelInput = document.querySelector("#model");
const plateInput = document.querySelector("#plate");
const ownerInput = document.querySelector("#owner");
// select form 
const form = document.querySelector(".car-form");
// listen to a submit on the form

form.addEventListener("submit", addCar)
// fetch api post
// get all the cars again
