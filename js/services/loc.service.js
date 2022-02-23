import { storageService } from './storage.service.js'

export const locService = {
  getLocs,
  newLoc,
  setCurrPos,
  setNameToLoc,
  crateNewPos,
}

var gCurrLoc = {}
console.log('gCurrLoc:', gCurrLoc)
const CACHE_KEY = 'locations'
var gCache = storageService.load(CACHE_KEY) || {}

const locs = [
  { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
  { name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
]

function newLoc(id, name, lat, lng, weather, createdAt, updatedAt) {
  console.log('working')
  const loc = {
    id,
    name,
    lat,
    lng,
    weather,
    createdAt,
    updatedAt,
  }
  gCache.push(loc)
  storageService.save(CACHE_KEY, gCache)
}

function setCurrPos(pos) {
  gCurrLoc.pos = pos
}

function setNameToLoc(placeName) {
  gCurrLoc.name = placeName

  console.log(gCurrLoc)
}

function crateNewPos() {
  if (gCurrLoc.name && gCurrLoc.pos) {
    console.log('new ')
  }
}
function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(gCache)
    }, 2000)
  })
}
