<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import {mapGetters} from 'vuex'
import {audioSong} from 'api/song'

export default {
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item,index) => {
        let retMid = []
        let retType = []
        let retMedia = []
        let {musicData} = item
        if (musicData.songid && musicData.albummid) {
          retMid.push(musicData.songmid)
          retType.push(musicData.songtype)
          retMedia.push("C400"+musicData.strMediaMid+".m4a")
          audioSong(retMid,retType,retMedia).then((res) => {
            if (res.code === ERR_OK) {
              this.songPurl = res.req_0.data.midurlinfo[0].purl
              ret.push(createSong(musicData,this.songPurl))
            }
          })
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
