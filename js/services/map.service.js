import { locService } from './loc.service.js'

export const mapService = {
  initMap,
  addMarker,
  panTo,
  getNewCoor,
}

var gMap
const API_KEY = 'AIzaSyBkDh_I0warBaT4HBvXXa8jJo-EybvDI1Y'

function initMap(lat = 32.074984, lng = 34.9120554) {
  console.log('InitMap')
  return _connectGoogleApi().then(() => {
    console.log('google available')
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    })
    let infoWindow = createInfoWindow(gMap.center)
    addMapListener(infoWindow)

    console.log('Map!', gMap)
  })
}

function addMapListener(infoWindow) {
  gMap.addListener('click', (mapsMouseEvent) => {
    infoWindow.close()
    let lat = mapsMouseEvent.latLng.lat()
    let lng = mapsMouseEvent.latLng.lng()
    let pos = { lat, lng }

    const contentString = `
    <div  class="infoWindow">
    <button onclick="onSaveLoc()">save</button>
    <input type="text" name="locName"  placeHolder="name this"/>
       </div>
    `

    infoWindow = new google.maps.InfoWindow({
      content: contentString,
      position: mapsMouseEvent.latLng,
      maxWidth: 250,
    })

    locService.setCurrPos(pos)
    infoWindow.open(gMap)
  })

  //   const marker = new google.maps.Marker({
  //     position: uluru,
  //     gMap,
  //     title: 'new location',
  //   })
}

// pass

function createInfoWindow(myLatlng) {
  console.log('info')

  let infoWindow = new google.maps.InfoWindow({
    content: 'Click the map to get Lat/Lng!',
    position: myLatlng,
  })
  infoWindow.open(gMap)

  return infoWindow
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  })
  return marker
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}

function getNewCoor(loc) {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${API_KEY}`
  return axios.get(URL)
      .then(res => res.data)
}
