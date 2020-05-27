/*状态管理*/
import {playMode} from "common/js/config";
import {loadSearch,loadPlay,loadFavorite} from "common/js/cache";

const state = {
  singer: {},
  playing:false,
  fullScreen:false,
  playlist:[],
  sequenceList:[],
  mode:playMode.sequence,
  topList:{},
  currentIndex:-1,
  disc:{},
  searchHistory:loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
