var map = L.map("mapid");
var defaultLocation = [51.1657, 10.4515];
var defaultZoom = 6;

map.setView(defaultLocation, defaultZoom);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup("Your Location")
    .openPopup();

  map.setView([latitude, longitude], 13);

  addGameMarkers();
}
function animateBanner() {
  var banner = document.querySelector(".banner");
  banner.style.left = "-100%";
  var pos = -100;
  var speed = 1;

  function updatePosition() {
    pos += speed;
    banner.style.left = pos + "%";
    if (pos >= 100) {
      pos = -100;
    }
  }

  setInterval(updatePosition, 50);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

function addGameMarkers() {
  fetch("gamesData.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var gamesList = document.getElementById("games-list");

      gamesList.innerHTML = "";

      data.games.forEach(function (game) {
        var marker = L.marker(
          [game.location.latitude, game.location.longitude],
          {
            icon: redMarker,
          }
        ).addTo(map);
        marker
          .bindPopup(
            `<b>${game.sport}</b><br>Start Time: ${game.start_time}<br>End Time: ${game.end_time}<br>Organizer: ${game.organizer.first_name} ${game.organizer.last_name}<br>Email: ${game.organizer.email}`
          )
          .openPopup();

        var listItem = document.createElement("li");
        listItem.textContent = `${game.sport} ${game.start_time
          .split("T")[1]
          .slice(0, 5)} - ${game.end_time.split("T")[1].slice(0, 5)} ${
          game.place
        }`;
        gamesList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching games data:", error);
    });
}

var redMarker = L.icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  shadowSize: [41, 41],
});

getLocation();
window.onload = function () {
  animateBanner();
};
