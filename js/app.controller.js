import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSaveLoc = onSaveLoc;
window.gCurrPos;

function onInit() {
    mapService
        .initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
    //   locService.getLocs().then((locs) => renderLocs(locs))
    onGetLocs();
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs().then((locs) => {
        console.log('Locations:', locs);
        renderLocs(locs);
        // document.querySelector('.locs-table').innerText = JSON.stringify(locs)

    });
}

function onGetUserPos() {
    getPosition()
        .then((pos) => {
            console.log('User position is:', pos.coords);
            document.querySelector(
                '.user-pos'
            ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
        })
        .catch((err) => {
            console.log('err!!!', err);
        });
}
function onPanTo(lat, lng) {
    console.log('Panning the Map');
    mapService.panTo(lat, lng);
}

function renderLocs(locs) {
    const strHTMLs = locs.map((loc) => {
        return `
        <tr>
            <td>
                ${loc.name}
            </td>
            <td>
                <button onclick="onPanTo(${loc.lat}, ${loc.lng})">Go</button>
            </td>
            <td>
                <button onclick="onDelete(${loc.id})">Delete</button>
            </td>
        </tr>    
        `;
    });
    let elLocTable = document.querySelector('.locs-table');
    elLocTable.innerHTML = strHTMLs.join('');
}

function onSaveLoc() {
    const placeName = document.querySelector('input[name="locName"]').value;
    locService.setNameToLoc(placeName);
    onGetLocs();
    //   locService.crateNewPos()
}
