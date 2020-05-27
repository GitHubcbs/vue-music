import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getSingerList (sign, changeIndex) {
  const url = '/api/getSingerList'
  const data = Object.assign({}, commonParams, {
    sign: sign,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {'comm':{'ct':24,'cv':0},'singerList':{'module':'Music.SingerListServer','method':'get_singer_list','param':{'area':-100,'sex':-100,'genre':-100,'index':changeIndex,'sin':0,'cur_page':1}}}
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSingerDetail (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  //https://u.y.qq.com/cgi-bin/musicu.fcg

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: singerId,
    g_tk:5381
  })
  return jsonp (url, data, options)
}
