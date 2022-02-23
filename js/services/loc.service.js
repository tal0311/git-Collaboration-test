import { storageService } from './storage.service';


export const locService = {
    getLocs,
    createNewLoc,
};

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
];

function createNewLoc(id, name, lat, lng, weather, createdAt, updatedAt) {
    const loc =  {
        id,
        name,
        lat,
        lng,
        weather,
        createdAt,
        updatedAt,
    };
    console.log(loc);

}


function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000);
    });
}

createNewLoc(5, 'Greatplace', 32.047104, 34.832384) 