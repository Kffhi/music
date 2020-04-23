import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 10

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