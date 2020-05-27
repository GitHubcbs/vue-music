<template>
    <div class="singer" ref="singer">
      <list-view :data="singers" @select="selectSinger" ref="singerList"></list-view>
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
import ListView from 'base/listview/listview'
import {getSingerList} from 'api/singer'
import {ERR_OK} from "api/config";
import Singer from 'common/js/singer'
import {mapMutations} from 'vuex'
import {playlistMixin} from 'common/js/mixin'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  mixins:[playlistMixin],
  name: "singer",
  data(){
    return {
      sign:'zzapmag1j0mo4wha0un2f3fef04bda3a286eeb40136f6b80f4a',
      changeIndex:-100,
      singers:[],
      azkey:''
    }
  },
  created:function () {
    this._getSingerList()
  },
  methods:{
    selectSinger(singer){
      this.$router.push({
        path:`/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList(){
      getSingerList(this.sign,this.changeIndex).then((res)=>{
        if(res.code === ERR_OK){
          this.singers = this._normalizeSinger(res.singerList.data.singerlist,res.singerList.data.index,res.singerList.data.tags.index)
        }
      })
    },
    _normalizeSinger(list,azIndex,tagIndex){
      let map = {
        hot:{
          title:HOT_NAME,
          items:[]
        }
      }
      //let key = []
      //遍历数组内容，判断index值，赋予字母值
      tagIndex.forEach((item,index)=>{
        if(tagIndex[index].id == azIndex){
          azIndex = tagIndex[index].name
        }
        this.azkey = tagIndex[index].id
        //key.push(this.azkey)
      })
      list.forEach((item,index)=>{
        if(index < HOT_SINGER_LEN){
          map.hot.items.push(new Singer({
            name:item.singer_name,
            id:item.singer_mid,
          }))
        }
        const key = '热门'
        console.log(key)
        if(!map[key]){
          map[key]={
            title:key,
            items:[]
          }
        }
        map[key].items.push(new Singer({
          id:item.singer_mid,
          name:item.singer_name,
        }))
      })
      let hot = []
      let ret = []
      for(let key in map){
        let val = map[key]
        if(val.title.match(/[a-zA-Z]/)){
          ret.push(val)
        }else if(val.title===HOT_NAME){
          hot.push(val)
        }
      }
      ret.sort((a,b)=>{
        return a.title.charCodeAt(0)-b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    handlePlaylist(playlist){
      const bottom = playlist.length > 0 ? '60px' : 0
      this.$refs.singer.style.bottom = bottom
      this.$refs.singerList.refresh()
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components:{
    ListView
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
