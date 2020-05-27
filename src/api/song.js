import {commonParams} from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    pcachetime: +new Date(),
    songmid: mid,
    g_tk_new_20200303: 354277360,
    g_tk: 354277360,
    loginUin: 2218212869,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function audioSong(mid,type,media) {
  const url = '/api/audioSong'
  const data = Object.assign({}, {
    format:'json',
    data: {
      'req_0': {
        'module': 'vkey.GetVkeyServer',
        'method': 'CgiGetVkey',
        'param': {
          'guid': '6092122746',
          'songmid': mid,
          'songtype': type,
          'uin': '2218212869',
          'loginflag': 0,
          'platform': '23',
          'h5to': 'speed'
        }
      },
      'req_1': {
        'module': 'vkey.GetVkeyServer',
        'method': 'CgiGetVkey',
        'param': {
          'guid': '6092122746',
          'songmid': mid,
          'filename': media,
          'uin': '2218212869',
          'loginflag': 0,
          'platform': '23',
          'h5to': 'speed'
        }
      },
      'comm': {'g_tk': 5381, 'uin': 2218212869, 'format': 'json', 'platform': 'h5'}
    }
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
