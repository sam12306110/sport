import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions'

const state = {
  betData: {
      typeName: '足球单式',
      event: '',
      match_id_in: '',
      baskTime: '',
      todayTime: '',
      zhuKe: '',
      eventMing: '',
      peiLv: '',
      point_column:'',
      tzType:'',
      pk:'',
  },
  betData1:{
    event:[],
    match_id_in:[],
    typename:[],
    zhuKe:[],
    peiLv:[],
    eventMing:[],
    point_column:[]
  },
  betShow:false,
  BetSwitch:true,
  betInfo:true,
  sportArr:[],
};


const mutations = {
      closeBet:function () {
             state.betShow=false;
      }
};


const store = new Vuex.Store({
    state,
    mutations,
    actions
});

export default store
