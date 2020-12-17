// console.log("heeey");
import mapboxgl from "mapbox-gl";

const inputItem = document.getElementById("inpt");
const display = document.getElementById("show-it");
const form = document.getElementById("form-one");

const whereAmI = (event) => {
  event.preventDefault();
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputItem.value}.json?access_token={API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      const long = data.features[0].center[0];
      const lat = data.features[0].center[1];
      const mapResult = `
        <p class="gps">${long} ${lat}</p>
        `;
      display.insertAdjacentHTML("beforeend", mapResult);
      // console.log(lat);
      // console.log(long);
      mapboxgl.accessToken =
        "{API_KEY}";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v9",
        center: [long, lat],
        zoom: 12,
      });
      new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);
    });
};

form.addEventListener("submit", whereAmI);
