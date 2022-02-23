import { storageService } from './storage.service.js';

export const locService = {
    getLocs,
    newLoc,
};

const CACHE_KEY = 'locations'
var gCache = storageService.load(CACHE_KEY) || {};


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
];


function newLoc(id, name, lat, lng, weather, createdAt, updatedAt) {
    console.log('working');
    const loc =  {
        id,
        name,
        lat,
        lng,
        weather,
        createdAt,
        updatedAt,
    };
    gCache.push(loc)
    storageService.save(CACHE_KEY, gCache)
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gCache);
        }, 2000);
    });
}


