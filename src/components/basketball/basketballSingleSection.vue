<template>
  <div>
    <model-box :windowLsm="window_lsm" :showModel="showModel.modelClose" @modelClose="getChild"></model-box>
    <div class="top">
      <div style="float:right; padding-right:5px;">
        <input type="button" :value="'刷新 '+time" class="button_sx" id="sx_f5" @click="clickRef('120')">
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
          <th class="shijian">时间</th><th class="duiwu">主队 / 客队</th><th class="duying">独赢</th>
          <th class="rangqiu">让分</th><th class="daxiao">大小</th><th class="rangqiu">单双</th>
        </tr>
        <!--<tr>-->
        <!--<td height="100" colspan="6" align="center" bgcolor="#FFFFFF">暂无任何赛事</td>-->
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
                  <td class="zhong" v-html="items.Match_Date" width="71px"></td>
                  <td width="267px" class="line">
                      <span class="zhu">
                        {{items.Match_Master}}
                      </span>
                    <br>
                    <span class="ke">
                        {{items.Match_Guest}}
                      </span>
                  </td>
                  <td class="zhong line">
                    <a  @click="ClickBet('篮球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master,items.Match_BzM,'0','Match_BzM')" v-if="items.Match_BzM!=null&&items.Match_BzM!='0'" href="javascript:;">{{items.Match_BzM}}</a>
                    <br>
                    <a @click="ClickBet('篮球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest,items.Match_BzG,'0','Match_BzG')" v-if="items.Match_BzG!=null&&items.Match_BzG!='0'" href="javascript:;">{{items.Match_BzG}}</a>
                    <br>
                    <a @click="ClickBet('篮球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'和局',items.Match_BzH,'0','Match_BzH')" v-if="items.Match_BzH!=null&&items.Match_BzH!='0'" href="javascript:;">{{items.Match_BzH}}</a>
                    <br>
                  </td>
                  <td width="140px">
                    <div class="rangqiu_odds">
                           <span class="odds">
                          <a @click="ClickBet('篮球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master,items.Match_Ho,'0','Match_Ho','盘口: '+(items.Match_ShowType=='H' ? '主让' :'客让')+'('+items.Match_RGG+')')" v-if="items.Match_Ho!=null&&items.Match_Ho!='0'" href="javascript:;">{{items.Match_Ho}}</a>
                           </span>
                      <span v-if="items.Match_Ho!=null&&items.Match_Ho!='0'" class="pankou">{{items.Match_ShowType=="H" && items.Match_Ho!="0"?items.Match_RGG:""}}</span>
                      <br>
                      <span class="odds">
                          <a @click="ClickBet('篮球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest,items.Match_Ao,'0','Match_Ao','盘口: '+(items.Match_ShowType=='H' ? '主让' :'客让')+'('+items.Match_RGG+')')"v-if="items.Match_Ao!=null&&items.Match_Ao!='0'" href="javascript:;">{{items.Match_Ao}}</a>
                          </span>
                      <span v-if="items.Match_Ao!=null&&items.Match_Ao!='0'" class="pankou">{{items.Match_ShowType=="C" && items.Match_Ho!="0"? items.Match_RGG:""}}</span>
                    </div>
                  </td>
                  <td width="138px">
                    <div class="rangqiu_odds">
                         <span class="odds">
                           <a @click="ClickBet('篮球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_DxGG1,items.Match_DxDpl,'0','Match_DxDpl')" v-if="items.Match_DxDpl!=null&&items.Match_DxDpl!='0'" href="javascript:;" title="大">
                               {{items.Match_DxDpl}}
                           </a>
                          </span>
                      <span v-if="items.Match_DxDpl!=null&&items.Match_DxDpl!='0'" class="pankou">
                            {{items.Match_DxGG1}}
                          </span>
                      <br>
                      <span class="odds">
                          <a @click="ClickBet('篮球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_DxGG2,items.Match_DxXpl,'0','Match_DxXpl')" v-if="items.Match_DxXpl!=null&&items.Match_DxXpl!='0'" href="javascript:;" title="小" >
                            {{items.Match_DxXpl}}
                         </a>
                         </span>
                      <span v-if="items.Match_DxXpl!=null&&items.Match_DxXpl!='0'" class="pankou">
                            {{items.Match_DxGG2}}
                         </span>
                      <br>
                    </div>
                  </td>
                  <td width="138px">
                    <div class="rangqiu_odds">
                         <span class="odds">
                           <a @click="ClickBet('篮球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'单',items.Match_DsDpl,'0','Match_DsDpl')" v-if="items.Match_DsDpl!=null&&items.Match_DsDpl!='0'" href="javascript:;" title="大">
                               {{items.Match_DsDpl}}
                           </a>
                         </span>
                      <span v-if="items.Match_DsDpl!=null&&items.Match_DsDpl!='0'" class="pankou">
                            单
                          </span>
                      <br>
                      <span class="odds">
                          <a @click="ClickBet('篮球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'双',items.Match_DsDpl,'0','Match_DsDpl')" v-if="items.Match_DsSpl!=null&&items.Match_DsSpl!='0'" href="javascript:;" title="小" >
                            {{items.Match_DsSpl}}
                          </a>
                         </span>
                      <span v-if="items.Match_DsSpl!=null&&items.Match_DsSpl!='0'" class="pankou">
                          双
                         </span>
                      <br>
                    </div>
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
    name:'basketballSingleSection',
    mixins:[Mixin],
    components: {
      modelBox
    },
    data () {
      return {
        action:'../api/app/member/show/json/bk_1_2.php',
        showType:'早餐-单节',
        time: 120,
        showModel: {
          modelClose: false,
          selectData:''
        },
        eventName:'',
        selected:''
      }
    },
    created: function () {
    },
    mounted: function () {
      var _self=this;
      _self.dataType=window.sessionStorage.getItem('dataType');
      if(_self.dataType==1){
        _self.action= '../api/app/member/show/json/bk_2_2.php'
        this.showType='早餐-单节'
      }
      if(_self.dataType==2){
        _self.action= '../api/app/member/show/json/bk_1_2.php'
        this.showType='今日-单节'
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
