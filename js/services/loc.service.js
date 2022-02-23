import { storageService } from './storage.service.js'

export const locService = {
  getLocs,
  newLoc,
  setCurrPos,
  setNameToLoc,
  crateNewPos,
  deleteLoc,
}

var gNextId = 101
var gCurrLoc = {}

console.log('gCurrLoc:', gCurrLoc)
const CACHE_KEY = 'locations'
var gCache = storageService.load(CACHE_KEY) || []

// const locs = [
//   { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
//   { name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
// ]

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

  setId()
  getDate()
  crateNewPos()
}

function crateNewPos() {
  if (gCurrLoc.name && gCurrLoc.pos) {
    let { name, pos, createdAt, id } = gCurrLoc
    console.log('new ')
    newLoc(id, name, pos.lat, pos.lng, null, createdAt)
    gCurrLoc = {}
  }
}

function getDate() {
  let date = Date.now()
  gCurrLoc.createdAt = date
}

function setId() {
  gCurrLoc.id = gNextId++
}

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(gCache)
    }, 2000)
  })
}

function deleteLoc(locId) {
    // let loc = getLocById(locId) 
    const idx = gCache.findIndex(loc => loc.id === locId)
    gCache.splice(idx, 1);
    storageService.save(CACHE_KEY, gCache)
}

