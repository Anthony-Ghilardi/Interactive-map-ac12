/********** API key for foursquare fsq3fxuow2pv/x9i9sOHpmFU+wMflDDDJE5RI/kZdVBivGc=**********/
let map;
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
        map = L.map('map').setView(coords, 15);

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
async function placeSearch(userSelection) { // adding coords like this (userSelection, coords) breaks this line
    try {
        const searchParams = new URLSearchParams({
          query: userSelection,
          ll: '36.3003904,-115.2483328', // adding coords like ll: coords, here breaks this line
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

    // async function placeSearch(userSelection, coords) {
    //     try {
    //         const searchParams = new URLSearchParams({
    //           query: userSelection,
    //           ll: coords,
    //           open_now: 'true',
    //           sort: 'DISTANCE'
    //         });
    //         const results = await fetch(
    //           `https://api.foursquare.com/v3/places/search?${searchParams}`,
    //           {
    //             method: 'GET',
    //             headers: {
    //               Accept: 'application/json',
    //               Authorization: 'fsq3fxuow2pv/x9i9sOHpmFU+wMflDDDJE5RI/kZdVBivGc=',
    //             }
    //           }
    //         );
    //         const data = await results.json();
    //         return data;
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    async function locationMarkers(locations, map){
        locations.forEach(location => {
            let position = [location.geocodes.main.latitude, location.geocodes.main.longitude]
            let marker = L.marker(position)
            marker.addTo(map).bindPopup(`${location.name} ${location.location.address}`).openPopup();
        });
    }
 

/********** Function for getting users selection from dropdown **********/
document.querySelector('#dropdown').addEventListener('change', async (event) => { 
    const userSelection = event.target.value;
    if(userSelection !== "null") { 
        const coords = await getCoords();
        const dataCoords = `${coords[0]}, ${coords[1]}`;
        const result = await placeSearch(userSelection, dataCoords);
        if(result && result.results) {
            locationMarkers(result.results, map);
        }
    }
});


getCoords().then(coords => console.log(coords));

