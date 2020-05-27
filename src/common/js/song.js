import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, type, mid, singer, name, album, duration, media, image, url, songPurl}) {
    this.id = id
    this.type = type
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.media = media
    this.image = image
    this.url = url
    this.songPurl = songPurl
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

export function createSong(Data,songPurl) {
  if(Data.action && Data.album && Data.file){
    return new Song({
      id: Data.id,
      mid: Data.mid,
      type: Data.type,
      singer: Data.singer[0].name,
      name: Data.name,
      album: Data.album.name,
      duration: Data.interval,
      media: Data.file.media_mid,
      image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${Data.album.mid}.jpg?max_age=2592000`,
      url: `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/${songPurl}`,
      songPurl:songPurl
    })
  }else{
    return new Song({
      id: Data.songid,
      mid: Data.songmid,
      type: Data.songtype,
      singer: filterSinger(Data.singer),
      name: Data.songname,
      album: Data.albumname,
      duration: Data.interval,
      media: Data.strMediaMid,
      image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${Data.albummid}.jpg?max_age=2592000`,
      url: `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/${songPurl}`,
      songPurl:songPurl
    })
  }

}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

