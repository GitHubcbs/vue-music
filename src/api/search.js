import {commonParams, options} from './config'
import axios from 'axios'

export function getHotKey() {
  const url = '/api/getHotKey'
  const data = Object.assign({}, commonParams, {
    data: {
      "comm": {
        "g_tk": 408585953,
        "format": "json",
        "inCharset": "utf-8",
        "outCharset": "utf-8",
        "notice": 0,
        "platform": "h5",
        "needNewCode": 1
      },
      "MusicHallHomePage": {
        "module": "music.musicHall.MusicHallPlatform",
        "method": "MobileWebHome",
        "param": {"ShelfId": [101, 102, 161]}
      },
      "hotkey": {
        "module": "tencent_musicsoso_hotkey.HotkeyService",
        "method": "GetHotkeyForQQMusicMobile",
        "param": {"remoteplace": "txt.miniapp.wxada7aab80ba27074", "searchid": "1559616839293"}
      }
    }
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSearch (query, page, zhida, perpage) {
  const url = '/api/getSearch'
  const data = Object.assign({}, commonParams, {
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    g_tk_new_20200303: 408585953,
    w: query,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all',
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
