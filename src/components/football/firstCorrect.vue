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
          <th class="shijians">时间</th>
          <th class="duiwu">主队 / 客队</th>
          <th class="bodan">1:0</th>
          <th class="bodan">2:0</th>
          <th class="bodan">2:1</th>
          <th class="bodan">3:0</th>
          <th class="bodan">3:1</th>
          <th class="bodan">3:2</th>
          <th class="bodan">0:0</th>
          <th class="bodan">1:1</th>
          <th class="bodan">2:2</th>
          <th class="bodan">3:3</th>
          <th class="bodan">其他</th>
        </tr>
        <tr>
          <td v-if="animation==true&&source.length==0" height="100" colspan="18" align="center" bgcolor="#FFFFFF" style="line-height:25px;"><img
            src="../../assets/images/bg/loading.gif" border="0"><br>
            赛事数据正在加载中......
          </td>
          <td v-if="source.length==0&&animation==false" height="100" colspan="18" align="center" bgcolor="#FFFFFF">暂无任何赛事</td>
        </tr>
        <tr v-for="(item,key) in race">
          <td colspan="13" class="liansai"><a :title="'选择>>'+key" style="color:#000 ;padding-left: 10px" >{{key}}</a>
            <div>
              <table border="0" cellspacing="1" cellpadding="0" bgcolor="#ACACAC" class="box">
                <tr v-for="items in item">
                    <td width="20px" class="zhong" v-html="items.Match_Date"></td>
                    <td width="121px" class="line">
                      <span class="zhu">
                        {{items.Match_Master}}
                      </span>
                    <br>
                    <span class="ke">
                        {{items.Match_Guest}}
                      </span>
                  </td>
                    <td width="32px" class="zhong line">
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master,items.Match_Hr_Bd10,'0','Match_Hr_Bd10','盘口：1:0')" v-if="items.Match_Hr_Bd10!=null&&items.Match_Hr_Bd10!='0'" href="javascript:;" >
                      {{items.Match_Hr_Bd10}}
                    </a>
                    <br>
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest,items.Match_Hr_Bdg10,'0','Match_Hr_Bdg10','盘口：0:1')" v-if="items.Match_Hr_Bdg10!=null&&items.Match_Hr_Bdg10!='0'" href="javascript:;" >
                      {{items.Match_Hr_Bdg10}}
                    </a>
                    <br>
                  </td>
                    <td width="32px" class="zhong line">
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master,items.Match_Hr_Bd20,'0','Match_Hr_Bd20','盘口：2:0')" v-if="items.Match_Hr_Bd20!=null&&items.Match_Hr_Bd20!='0'" href="javascript:;" >
                      {{items.Match_Hr_Bd20}}
                    </a>
                    <br>
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest,items.Match_Hr_Bdg20,'0','Match_Hr_Bdg20','盘口：0:2')" v-if="items.Match_Hr_Bdg20!=null&&items.Match_Hr_Bdg20!='0'" href="javascript:;" >
                      {{items.Match_Hr_Bdg20}}
                    </a>
                    <br>
                  </td>
                    <td width="32px" class="zhong line">
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master,items.Match_Hr_Bd21,'0','Match_Hr_Bd21','盘口：2:1')" v-if="items.Match_Hr_Bd21!=null&&items.Match_Hr_Bd21!='0'" href="javascript:;" >
                      {{items.Match_Hr_Bd21}}
                    </a>
                    <br>
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest,items.Match_Hr_Bdg21,'0','Match_Hr_Bdg21','盘口：1:2')" v-if="items.Match_Hr_Bdg21!=null&&items.Match_Hr_Bdg21!='0'" href="javascript:;" >
                      {{items.Match_Hr_Bdg21}}
                    </a>
                    <br>
                  </td>
                    <td width="32px" class="zhong line">
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master,items.Match_Hr_Bd30,'0','Match_Hr_Bd30','盘口：3:0')" v-if="items.Match_Hr_Bd30!=null&&items.Match_Hr_Bd30!='0'" href="javascript:;" >
                      {{items.Match_Hr_Bd30}}
                    </a>
                    <br>
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest,items.Match_Hr_Bdg30,'0','Match_Hr_Bdg30','盘口：0:3')" v-if="items.Match_Hr_Bdg30!=null&&items.Match_Hr_Bdg30!='0'" href="javascript:;" >
                      {{items.Match_Hr_Bdg30}}
                    </a>
                    <br>
                  </td>
                    <td width="32px" class="zhong line">
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master,items.Match_Hr_Bd31,'0','Match_Hr_Bd31','盘口：3:1')" v-if="items.Match_Hr_Bd31!=null&&items.Match_Hr_Bd31!='0'" href="javascript:;" >
                      {{items.Match_Hr_Bd31}}
                    </a>
                    <br>
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest,items.Match_Hr_Bdg31,'0','Match_Hr_Bdg31','盘口：1:3')" v-if="items.Match_Hr_Bdg31!=null&&items.Match_Hr_Bdg31!='0'" href="javascript:;" >
                      {{items.Match_Hr_Bdg31}}
                    </a>
                    <br>
                  </td>
                    <td width="32px" class="zhong line">
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master,items.Match_Hr_Bd32,'0','Match_Hr_Bd32','盘口：3:2')" v-if="items.Match_Hr_Bd32!=null&&items.Match_Hr_Bd32!='0'" href="javascript:;" >
                      {{items.Match_Hr_Bd32}}
                    </a>
                    <br>
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest,items.Match_Hr_Bdg32,'0','Match_Hr_Bdg32','盘口：2:3')" v-if="items.Match_Hr_Bdg32!=null&&items.Match_Hr_Bdg32!='0'" href="javascript:;" >
                      {{items.Match_Hr_Bdg32}}
                    </a>
                    <br>
                  </td>
                    <td width="33px" class="zhong">
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'0:0',items.Match_Hr_Bd00,'0','Match_Hr_Bd00')" v-if="items.Match_Hr_Bd00!=null&&items.Match_Hr_Bd00!='0'" href="javascript:;">
                      {{items.Match_Hr_Bd00}}
                    </a>
                  </td>
                    <td width="34px" class="zhong">
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'1:1',items.Match_Hr_Bd11,'0','Match_Hr_Bd11')" v-if="items.Match_Hr_Bd11!=null&&items.Match_Hr_Bd11!='0'" href="javascript:;">
                      {{items.Match_Hr_Bd11}}
                    </a>
                  </td>
                    <td width="34px" class="zhong">
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'2:2',items.Match_Hr_Bd22,'0','Match_Hr_Bd22')" v-if="items.Match_Hr_Bd22!=null&&items.Match_Hr_Bd22!='0'" href="javascript:;">
                      {{items.Match_Hr_Bd22}}
                    </a>
                  </td>
                    <td width="36px" class="zhong">
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'3:3',items.Match_Hr_Bd33,'0','Match_Hr_Bd33')" v-if="items.Match_Hr_Bd33!=null&&items.Match_Hr_Bd33!='0'" href="javascript:;">
                      {{items.Match_Hr_Bd33}}
                    </a>
                  </td>
                    <td width="48px" class="zhong">
                    <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'UP5',items.Match_Hr_Bdup5,'0','Match_Hr_Bdup5')" v-if="items.Match_Hr_Bdup5!=null&&items.Match_Hr_Bdup5!='0'" href="javascript:;">
                      {{items.Match_Hr_Bdup5}}
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
    name: 'firstCorrect',
    mixins:[Mixin],
    components: {
      modelBox
    },
    data () {
      return {
        action:'../api/app/member/show/json/ft_2_5.php',
        showType:'早餐-上半场波胆',
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
        _self.action= '../api/app/member/show/json/ft_2_5.php'
        this.showType='早餐-上半场波胆'
      }
      if(_self.dataType==2){
        _self.action= '../api/app/member/show/json/ft_1_5.php'
        this.showType='上半场波胆'
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
