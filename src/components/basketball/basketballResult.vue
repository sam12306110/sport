<template>
  <div>
    <!--<model-box :windowLsm="window_lsm" :showModel="showModel.modelClose" @modelClose="getChild"></model-box>-->
    <!--<div class="top"  style="background-color: #838383;">-->
      <!--<div style="float:right; padding-right:5px;">-->
        <!--<input type="button" :value="'刷新 '+time" class="button_sx" id="sx_f5" @click="clickRef('999')">-->
        <!--<input type="hidden" name="top_f5" id="top_f5" value="0">-->
        <!--<input type="hidden" name="league" id="league" v-model="eventName">-->
        <!--<input type="button" id="xzls" value="选择联赛" class="button_ls" @click="comShowModel('op')">-->
        <!--<div style="display:none" id="aaaaa">0</div>-->
      <!--</div>-->
      <!--<div class="page" id="page">-->
        <!--<span>篮球结果&gt;&gt;</span>-->
        <!--<ul id="top">-->
          <!--<li :class="{ 'i': spage === selected }" @click="choose(spage)" v-for="(spage,key) in soPage">-->
            <!--<a :class="{ 'fff': spage === selected }" href="javascript:;" @click="getData('',key)">{{spage + 1}}</a>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div id="datashow">-->
      <!--<table border="0" cellspacing="1" cellpadding="0" class="box" bgcolor="#ACACAC">-->
        <!--<tbody><tr>-->
          <!--<th width="100">开赛时间</th>-->
          <!--<th>主场/客场</th>-->
          <!--<th width="40">1</th>-->
          <!--<th width="40">2</th>-->
          <!--<th width="40">3</th>-->
          <!--<th width="40">4</th>-->
          <!--<th width="40">上半</th>-->
          <!--<th width="40">下半</th>-->
          <!--<th width="40">加时</th>-->
          <!--<th width="40">全场</th>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td height="100" colspan="10" align="center" bgcolor="#FFFFFF">暂无任何赛果</td>-->
        <!--</tr>-->
        <!--</tbody>-->
      <!--</table>-->
    <!--</div>-->
    <iframe width="100%" height="5187" src="https://98208.com/app/member/show/result/basketball.php" frameborder="0"></iframe>
  </div>
</template>
<script type="text/ecmascript-6">
//  import Mixin from '@/Mixin'
//  import modelBox from '../common/model'
  export default {
    name:'basketballResult',
//    mixins:[Mixin],

    data () {
      return {
//
      }
    },
//    created: function () {
//      let _self = this;
//      if (_self.time > 1) {
//        clearInterval(_self.timer());
//        _self.time = '';
//        _self.timer('999')
//      } else {
//        _self.timer('999')
//      }
//    },
//    mounted: function () {
////      this.getData()
//    },
//    methods: {
//      getChild: function (data) {
//        let _self = this;
//        _self.showModel = data;
//        _self.eventName=_self.showModel.selectData;
//        _self.getData(_self.showModel.selectData, '0');
//      },
//      choose:function (index) {
//        this.selected = index
//      }
//    }
  }
</script>
