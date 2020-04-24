import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 10

const LOVE_SONG_KEY = '__song__'
const LOVE_SONG_LEN = 200

const Love_SONG_LIST_KEY = '__songlist__'
const Love_SONG_LIST_LEN = 20


function mapArr(arr) {
  let newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      let dealArr = mapArr(arr[i]);
      newArr = [...newArr, ...dealArr];
    } else {
      newArr.push(arr[i]);
    }
  }
  let shoArr = [...new Set(newArr)];
  let arrs = shoArr.sort((a, b) => a - b); //a-b<0 升序
  return arrs;
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  searches.unshift(query)
  if (searches.length > SEARCH_MAX_LEN) {
    searches.splice(-1, 1)
  }
  storage.set(SEARCH_KEY, mapArr(searches))
}

export const getSearch = () => {
  return storage.get(SEARCH_KEY, [])
}

export function saveLoveSong(song) {
  let songList = storage.get(LOVE_SONG_KEY, [])
  songList.unshift(song)
  if (songList.length > LOVE_SONG_LEN) {
    songList.splice(-1, 1)
  }
  storage.set(LOVE_SONG_KEY, mapArr(songList))
}

export function deleteLoveSong(song) {
  let songList = storage.get(LOVE_SONG_KEY, [])
  const newSongList = songList.filter(item => item.id !== song.id)
  storage.set(LOVE_SONG_KEY, mapArr(newSongList))
}

export const getLoveSong = () => {
  return storage.get(LOVE_SONG_KEY, [])
}