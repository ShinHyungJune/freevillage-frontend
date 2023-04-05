import axios from 'axios'
const instance = axios.create({
  baseURL: process.env.baseURL,
})
const kakaoInstance = axios.create({
  baseURL: process.env.KAKAO_REST_API_KEY,
})

function fetchStores({ query, x, y, radius, categoryGroupCode }) {
  return kakaoInstance.get('/v2/local/search/keyword', {
    params: {
      query, x, y, radius,
      categoryGroupCode
    },
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`
    }
  })
}

function fetchNearCoords(mapInfo) {
  return instance.get('/api/geo', {
    params: {
      nex: mapInfo.ne[0].toString(),
      ney: mapInfo.ne[1].toString(),
      swx: mapInfo.sw[0].toString(),
      swy: mapInfo.sw[1].toString()
    }
  })
}

export {
  fetchStores,
  fetchNearCoords
}