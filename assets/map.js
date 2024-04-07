/********** API key for foursquare fsq3fxuow2pv/x9i9sOHpmFU+wMflDDDJE5RI/kZdVBivGc=**********/

/********** Function to get user coords WORKING CREATES POPUP RETURNS COORDS IN CONSOLE **********/
async function getCoords(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]
}

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

/********** Function for placing locations on map **********/
    async function placeSearch(userSelection, coords) {
        try {
            const searchParams = new URLSearchParams({
              query: userSelection,
              ll: coords,
              open_now: 'true',
              sort: 'DISTANCE'
            });
            const results = await fetch(
              `https://api.foursquare.com/v3/places/search?${searchParams}`,
              {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  Authorization: 'fsq3fxuow2pv/x9i9sOHpmFU+wMflDDDJE5RI/kZdVBivGc=',
                }
              }
            );
            const data = await results.json();
            return data;
        } catch (err) {
            console.error(err);
        }
    }

    async function locationMarkers(locations, map){
        locations.forEach(location => {
            let position = [location.geocodes.main.latitude, location.geocode.main.longitude]
            let marker = L.marker(position)
            marker.addTo(map).bindPopup(`${location.name} ${location.location.address}`).openPopup();
        });
    }
 

/********** Function for getting users selection from dropdown **********/
async () => {
    const coords = await getCoords()
    const dataCoords = `${coords[0]}, ${coords[1]}`

const userChoice = document.querySelector('#dropdown')
    userChoice.addEventListener('select', async (event) =>{ 
        const userSelection = event.target.value;
        console.log(userSelection, dataCoords);
        let result = await placeSearch(userSelection, dataCoords);
        let locations = result.results
        console.log(locations)
        locationMarkers(locations.map)      
    });
}

console.log(getCoords())
