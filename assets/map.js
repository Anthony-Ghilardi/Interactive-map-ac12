/********** Function to get user coords WORKING CREATES POPUP RETURNS COORDS IN CONSOLE **********/
async function getCoords(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]
}

console.log(getCoords())

/********** Leaflet map for user location **********/
async function initMap() {
    const coords = await getCoords();
    if (coords) {
        const map = L.map('map').setView(coords, 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: '12',
        }).addTo(map);

        const marker = L.marker(coords).addTo(map);
        marker.bindPopup("<p1><b>Your Location</b></p1>").openPopup();
    }
}

initMap();

/********** Function for getting users selection from dropdown **********/
const userChoice = document.querySelector('#dropdown')
    userChoice.addEventListener('change', (event) =>{ // possibly change to 'select' if encountering future errors
        const userSelection = event.target.value;
        console.log(userSelection)
    });

/********** API key for foursquare fsq3fxuow2pv/x9i9sOHpmFU+wMflDDDJE5RI/kZdVBivGc=**********/
/********** Fecth request for coffee **********/
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'fsq3fxuow2pv/x9i9sOHpmFU+wMflDDDJE5RI/kZdVBivGc='
    }
  };
  
  fetch('https://api.foursquare.com/v3/places/search?query=Coffee&ll=36.3003904%2C-115.2483328&limit=5', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));