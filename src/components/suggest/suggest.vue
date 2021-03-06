<template>
  <scroll ref="suggest"
          class="suggest"
          :data="result"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @scrollToEnd="searchMore"
          @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {getSearch} from 'api/search'
import {createSong} from 'common/js/song'
import {mapMutations, mapActions} from 'vuex'
import Singer from 'common/js/singer'
import NoResult from 'base/no-result/no-result'

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
  components: {Scroll},
  props:{
      query:{
        type:String,
        default:''
      },
      showSinger:{
        type:Boolean,
        default:true
      }
    },
  data(){
      return{
        page:1,
        result:[],
        pullup:true,
        beforeScroll: true,
        hasMore:true,
        changValue:null
      }
  },
  created(){
    setTimeout(()=>{
      this._getSearch()
    },10)
  },
  methods:{
    refresh() {
      this.$refs.suggest.refresh()
    },
    _getSearch(){
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0,0)
      //this.$refs获取为空
      // 1、必须要等页面中的ref子组件加载完毕，才可以获取到
      ///2、在mounted之前的钩子函数中获取不到
      //3、组件在v-if为false的父节点下，导致这个子组件未渲染，也是导致获取不到的因素，不要忽视哦
    getSearch(this.query,this.page,this.showSinger,perpage).then((res)=>{
        if(res.code === ERR_OK){
          this.result = this._genResult(res.data)
          this._checkMore(res.data)
        }
      })
    },
    _genResult(data){
      let ret = []
      if(data.zhida && data.zhida.singerid){
        ret.push({...data.zhida,...{type:TYPE_SINGER}})
      }
      if(data.song){
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    searchMore(){
      if(!this.hasMore){
        return
      }
      this.page++
      getSearch(this.query,this.page,this.showSinger,perpage).then((res)=>{
          if(res.code === ERR_OK){
            this.result = this.result.concat(this._genResult(res.data))
            this._checkMore(res.data)
          }
    })
  },
    listScroll() {
    this.$emit('listScroll')
  },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select', item)
    },
    getDisplayName(item){
      if(item.type === TYPE_SINGER){
        return item.singername
      }else{
        return `${item.name}-${item.singer}`
      }
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    _normalizeSongs(list){
      let ret = []
      list.forEach((musicData)=>{
        if(musicData.songid && musicData.albumid){
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    _checkMore(data){
      const song = data.song
      if(!song.list.length||(song.curnum+song.curpage*perpage)>song.totalnum){
        this.hasMore = false
      }
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch:{
    query(newQuery) {
      this._getSearch(newQuery)
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
