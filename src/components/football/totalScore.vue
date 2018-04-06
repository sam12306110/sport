<template>
  <div>
    <model-box :windowLsm="window_lsm" :showModel="showModel.modelClose" @modelClose="getChild"></model-box>
    <div class="top">
      <div style="float:right; padding-right:5px;">
        <input type="button" :value="'刷新 '+time" class="button_sx" id="sx_f5" @click="clickRef('180')">
        <input type="hidden" name="top_f5" id="top_f5" value="0">
        <input type="hidden" name="league" id="league" v-model="eventName">
        <input type="button" id="xzls" value="选择联赛" class="button_ls" @click="comShowModel('op')">
        <div style="display:none" id="aaaaa">0</div>
      </div>
      <div class="page" id="page">
        <span>足球（{{showType}}）&gt;&gt;</span>
        <ul id="top">
          <li :class="{ 'i': spage === selected }" @click="choose(spage)" v-for="(spage,key) in soPage">
            <a :class="{ 'fff': spage === selected }" href="javascript:;" @click="getData('',key)">{{spage + 1}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div id="datashow">
      <table border="0" cellspacing="1" cellpadding="0" bgcolor="#ACACAC" class="box">
        <tbody>
        <tr>
          <th class="shijiant">时间</th>
          <th class="duiwus">主队 / 客队</th>
          <th class="ruqiushu">0 - 1</th>
          <th class="ruqiushu">2 - 3</th>
          <th class="ruqiushu">4 - 6</th>
          <th class="ruqiushu">7或以上</th>
        </tr>
        <!--<tr>-->
          <!--<td height="100" colspan="6" align="center" bgcolor="#FFFFFF" style="line-height:25px;">-->
            <!--暂无任何赛事</td>-->
        <!--</tr>-->
        <tr>
          <td v-if="animation==true&&source.length==0" height="100" colspan="18" align="center" bgcolor="#FFFFFF" style="line-height:25px;"><img
            src="../../assets/images/bg/loading.gif" border="0"><br>
            赛事数据正在加载中......
          </td>
          <td v-if="source.length==0&&animation==false" height="100" colspan="18" align="center" bgcolor="#FFFFFF">暂无任何赛事</td>
        </tr>
        <tr v-for="(item,key) in race">
          <td colspan="18" class="liansai"><a :title="'选择>>'+key" style="color:#000 ;padding-left: 10px" >{{key}}</a>
            <div>
              <table border="0" cellspacing="1" cellpadding="0" bgcolor="#ACACAC" class="box">
                <tr v-for="items in item">
                  <td class="zhong" v-html="items.Match_Date" width="10px"></td>
                  <td width="183px" class="line">
                      <span class="zhu">
                        {{items.Match_Master}}
                      </span>
                    <br>
                    <span class="ke">
                        {{items.Match_Guest}}
                      </span>
                  </td>
                  <td width="38px" class="zhong">
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'0~1',items.Match_Total01Pl,'0','Match_Total01Pl')" v-if="items.Match_Total01Pl!=null&&items.Match_Total01Pl!='0'" href="javascript:;">
                      {{items.Match_Total01Pl}}
                    </a>
                  </td>
                  <td width="38px" class="zhong">
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'2~3',items.Match_Total23Pl,'0','Match_Total23Pl')" v-if="items.Match_Total23Pl!=null&&items.Match_Total23Pl!='0'" href="javascript:;">
                      {{items.Match_Total23Pl}}
                    </a>
                  </td>
                  <td width="38px" class="zhong">
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'4~6',items.Match_Total46Pl,'0','Match_Total46Pl')" v-if="items.Match_Total46Pl!=null&&items.Match_Total46Pl!='0'" href="javascript:;">
                      {{items.Match_Total46Pl}}
                    </a>
                  </td>
                  <td width="38px" class="zhong">
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'7UP',items.Match_Total7upPl,'0','Match_Total7upPl')" v-if="items.Match_Total7upPl!=null&&items.Match_Total7upPl!='0'" href="javascript:;">
                      {{items.Match_Total7upPl}}
                    </a>
                  </td>
                </tr>
              </table>
            </div>
          </td>

        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
  import Mixin from '@/Mixin'
  import modelBox from '../common/model'
  export default {
    mixins:[Mixin],
    name: 'totalScore',
    components: {
      modelBox
    },
    data () {
      return {
        action:'../api/app/member/show/json/ft_2_2.php',
        showType:'早餐-总入球',
        time:180,
        showModel: {
          modelClose: false,
          selectData:''
        },
        eventName:'',
        selected:''
      }
    },
    created: function () {
      let _self = this;
      if (_self.time > 1) {
        clearInterval(_self.timer());
        _self.time = '';
        _self.timer('180')
      } else {
        _self.timer('180')
      }
    },
    mounted: function () {
      let _self=this;
      _self.dataType=window.sessionStorage.getItem('dataType');
      if(_self.dataType==1){
        _self.action= '../api/app/member/show/json/ft_2_2.php'
        this.showType='早餐-总入球'
      }
      if(_self.dataType==2){
        _self.action= '../api/app/member/show/json/ft_1_2.php'
        this.showType='总入球'
      }
      _self.$store.state.betData.tzType=1;
      _self.$store.state.betInfo=true
    },
    methods: {
      getChild: function (data) {
        let _self = this;
        _self.showModel = data;
        _self.eventName=_self.showModel.selectData;
        _self.getData(_self.showModel.selectData, '0');
      },
      choose:function (index) {
        this.selected = index
      }
    }
  }
</script>
