<template>
  <!--<div>-->
    <!--<model-box :windowLsm="window_lsm" :showModel="showModel.modelClose" @modelClose="getChild"></model-box>-->
    <!--<div class="top">-->
      <!--<div style="float:right; padding-right:5px;">-->
        <!--<input type="button" :value="'刷新 '+time" class="button_sx" id="sx_f5" @click="clickRef('999')">-->
        <!--<input type="hidden" name="top_f5" id="top_f5" value="0">-->
        <!--<input type="hidden" name="league" id="league" v-model="eventName">-->
        <!--<input type="button" id="xzls" value="选择联赛" class="button_ls" @click="comShowModel('op')">-->
        <!--<div style="display:none" id="aaaaa">0</div>-->
      <!--</div>-->
      <!--<div class="page" id="page">-->
        <!--<span>足球（{{showType}}）&gt;&gt;</span>-->
        <!--<ul id="top">-->
          <!--<li :class="{ 'i': spage === selected }" @click="choose(spage)" v-for="(spage,key) in soPage">-->
            <!--<a :class="{ 'fff': spage === selected }" href="javascript:;" @click="getData('',key)">{{spage + 1}}</a>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div id="datashow">-->
      <!--<table border="0" cellspacing="1" cellpadding="0" bgcolor="#ACACAC" class="box">-->
        <!--<tbody>-->
        <!--<tr>-->
          <!--<td height="100" align="center" bgcolor="#FFFFFF">暂无任何赛事</td>-->
        <!--</tr>-->
        <!--</tbody>-->
      <!--</table>-->
    <!--</div>-->
  <!--</div>-->
  <iframe width="100%" height="5187" src="https://98208.com/app/member/show/champion_BS.html" frameborder="0"></iframe>
</template>
<script type="text/ecmascript-6">
//  import Mixin from '@/Mixin'
//  import modelBox from '../common/model'
  export default {
    name:'tennisWinner',
//    mixins:[Mixin],
//    components: {
//      modelBox
//    },
    data () {
      return {
//        action:'../api/app/member/show/json/champion_VB.php',
//        time: 999,
//        showModel: {
//          modelClose: false,
//          selectData: ''
//        },
//        eventName: '',
//        selected:''
      }
    },
    created: function () {
//      let _self = this;
//      if (_self.time > 1) {
//        clearInterval(_self.timer());
//        _self.time = '';
//        _self.timer('999')
//      } else {
//        _self.timer('999')
//      }
    },
    mounted: function () {
//      this.getData()
    },
    methods: {
//      getChild: function (data) {
//        let _self = this;
//        _self.showModel = data;
//        _self.eventName = _self.showModel.selectData;
//        _self.getData(_self.showModel.selectData, '0');
//      },
//      choose:function (index) {
//        this.selected = index
//      }
    }
  }
</script>
