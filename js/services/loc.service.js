export const locService = {
    getLocs,
    createNewLoc,
};


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
];

function createNewLoc(id, name, lat, lng, weather, createdAt, updatedAt) {
    return {
        id,
        name,
        lat,
        lng,
        weather,
        createdAt,
        updatedAt,
    };
}


function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000);
    });
}

