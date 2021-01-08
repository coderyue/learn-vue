import {request} from "@/network/request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

export function getData(key) {
  return request({
    url: 'http://www.qcc.com/web/search',
    referer: 'https://www.qcc.com/web/search?key=%E5%8C%97%E4%BA%AC%E4%B8%9C%E6%96%B9%E5%9B%BD%E4%BF%A1%E7%A7%91%E6%8A%80%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8',

    params: {
      key
    }
  })
}
