<template>
    <div>
      <model-box :windowLsm="window_lsm" :showModel="showModel.modelClose" @modelClose="getChild"></model-box>
      <div class="top">
        <div style="float:right; padding-right:5px;">
          <input type="button" :value="'刷新 '+time" class="button_sx" id="sx_f5" @click="clickRef('20')">
          <input type="hidden" name="top_f5" id="top_f5" value="0">
          <input type="hidden" name="league" id="league" v-model="eventName">
          <input type="button" id="xzls" value="选择联赛" class="button_ls" @click="comShowModel('op')">
          <div style="display:none" id="aaaaa">0</div>
        </div>
        <div class="page" id="page">
          <span>足球（滚球）&gt;&gt;</span>
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
          <tr><th rowspan="2" class="gq_shijian">时间</th><th rowspan="2" class="gq_bifen">比分</th><th rowspan="2" class="duiwu">主队 / 客队</th><th colspan="3" class="quanchang">全场</th><th colspan="3" class="shangbanchang">上半场</th></tr>
          <tr>
            <th class="duying">1X2</th>
            <th class="rangqiu">让球</th>
            <th class="daxiao">大小</th>
            <th class="duying2">1X2</th>
            <th class="rangqiu2">让球</th>
            <th class="daxiao2">大小</th>
          </tr>
          <tr>
            <td v-if="animation==true&&source.length==0" height="100" colspan="18" align="center" bgcolor="#FFFFFF" style="line-height:25px;"><img
              src="../../assets/images/bg/loading.gif" border="0"><br>
              赛事数据正在加载中......
            </td>
            <td v-if="source.length==0&&animation==false" height="100" colspan="18" align="center" bgcolor="#FFFFFF">暂无任何赛事</td>
          </tr>
          <tr v-for="(item,key) in race">
            <td colspan="9" class="liansai"><a :title="'选择>>'+key" style="color:#000 ;padding-left: 10px" >{{key}}</a>
              <div>
                <table border="0" cellspacing="1" cellpadding="0" bgcolor="#ACACAC" class="box">
                  <tr v-for="items in item">
                    <td class="zhong" style="width: 82px" >
                      {{items.Match_Time}}
                    </td>
                    <td class="zhong">{{items.Match_NowScore}}</td>
                    <td class="line" width="183px">
                      <span class="zhu">{{items.Match_Master}}</span>
                      <br>
                      <span class="ke">{{items.Match_Guest}}</span>
                      <br>
                      <span class="he">和局</span>
                    </td>
                    <td class="zhong line" width="40px">
                      <a @click="ClickBet('足球滚球',key,items.Match_ID,items.Match_Time,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master,items.Match_BzM,'2','Match_BzM')" v-if="items.Match_BzM!=null&&items.Match_BzM!='0'"  href="javascript:;" >{{items.Match_BzM}}</a>
                      <br>
                      <a @click="ClickBet('足球滚球',key,items.Match_ID,items.Match_Time,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest,items.Match_BzG,'2','Match_BzG')" v-if="items.Match_BzG!=null&&items.Match_BzG!='0'" href="javascript:;">{{items.Match_BzG}}</a>
                      <br>
                      <a @click="ClickBet('足球滚球',key,items.Match_ID,items.Match_Time,{zhu:items.Match_Master,ke:items.Match_Guest},'和局',items.Match_BzH,'2','Match_BzH')" v-if="items.Match_BzH!=null&&items.Match_BzH!='0'" href="javascript:;" >{{items.Match_BzH}}</a>
                      <br>
                    </td>
                    <td width="95px">
                      <div class="rangqiu_odds">
                           <span class="odds">
                                <a @click="ClickBet('足球滚球',key,items.Match_ID,items.Match_Time,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master,items.Match_Ho,'2','Match_Ho','盘口: '+(items.Match_ShowType=='H' ? '主让' :'客让')+'('+items.Match_RGG+')')" v-if="items.Match_Ho!=null&&items.Match_Ho!='0'" href="javascript:;">{{items.Match_Ho}}</a>
                           </span>
                           <span v-if="items.Match_Ho!=null&&items.Match_Ho!='0'" class="pankou">{{items.Match_ShowType=="H" && items.Match_Ho!="0"?items.Match_RGG:''}}</span>
                            <br>
                           <span class="odds">
                                 <a @click="ClickBet('足球滚球',key,items.Match_ID,items.Match_Time,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest,items.Match_Ao,'2','Match_Ao','盘口: '+(items.Match_ShowType=='H' ? '主让' :'客让')+'('+items.Match_RGG+')')" v-if="items.Match_Ao!=null&&items.Match_Ao!='0'" href="javascript:;">{{items.Match_Ao}}</a>
                           </span>
                        <span v-if="items.Match_Ao!=null&&items.Match_Ao!='0'" class="pankou">{{items.Match_ShowType=="C" && items.Match_Ho!="0"?items.Match_RGG:''}}</span>
                      </div>
                    </td>
                    <td width="95px">
                      <div class="rangqiu_odds">
                         <span class="odds">
                           <a @click="ClickBet('足球滚球',key,items.Match_ID,items.Match_Time,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_DxGG,items.Match_DxDpl,'2','Match_DxDpl')" v-if="items.Match_DxDpl!=null&&items.Match_DxDpl!='0'" href="javascript:;" title="大">
                               {{items.Match_DxDpl}}
                           </a>
                          </span>
                          <span v-if="items.Match_DxDpl!=null&&items.Match_DxDpl!='0'" class="pankou">
                             {{items.Match_DxGG}}
                          </span>
                           <br>
                        <span class="odds">
                          <a @click="ClickBet('足球滚球',key,items.Match_ID,items.Match_Time,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_DxGG1,items.Match_DxXpl,'2','Match_DxXpl')" v-if="items.Match_DxXpl!=null&&items.Match_DxXpl!='0'" href="javascript:;" title="小" >
                            {{items.Match_DxXpl}}
                         </a>
                         </span>
                        <span v-if="items.Match_DxXpl!=null&&items.Match_DxXpl!='0'" class="pankou">
                            {{items.Match_DxGG1}}
                         </span>
                        <br>
                      </div>
                    </td>
                    <td class="zhong line2" width="40px">
                      <a @click="ClickBet('足球滚球',key,items.Match_ID,items.Match_Time,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master+'-[上半]',items.Match_Bmdy,'2','Match_Bmdy')" v-if="items.Match_Bmdy!=null&&items.Match_Bmdy!='0'" href="javascript:;">{{items.Match_Bmdy}}</a><br>
                      <a @click="ClickBet('足球滚球',key,items.Match_ID,items.Match_Time,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest+'-[上半]',items.Match_Bgdy,'2','Match_Bgdy')" v-if="items.Match_Bgdy!=null&&items.Match_Bgdy!='0'" href="javascript:;">{{items.Match_Bgdy}}</a><br>
                      <a @click="ClickBet('足球滚球',key,items.Match_ID,items.Match_Time,{zhu:items.Match_Master,ke:items.Match_Guest},'和局',items.Match_Bhdy,'2','Match_Bhdy')" v-if="items.Match_Bhdy!=null&&items.Match_Bhdy!='0'" href="javascript:;">{{items.Match_Bhdy}}</a>
                    </td>
                    <td class="zhong line3" width="95px">
                      <div class="rangqiu_odds">
                       <span class="odds">
                          <a @click="ClickBet('足球滚球',key,items.Match_ID,items.Match_Time,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master,items.Match_BHo,'2','Match_BHo','盘口: '+(items.Match_Hr_ShowType=='H'?'主让':'客让')+'('+items.Match_RGG+')')" v-if="items.Match_BHo!=null&&items.Match_BHo!='0'" href="javascript:;">{{items.Match_BHo}}</a>
                       </span>
                        <span v-if="items.Match_BHo!=null&&items.Match_BHo!='0'" class="pankou">{{items.Match_Hr_ShowType=="H" && items.Match_BAo!="0"?items.Match_BRpk:""}}</span>
                        <br>
                        <span class="odds">
                          <a @click="ClickBet('足球滚球',key,items.Match_ID,items.Match_Time,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest,items.Match_BAo,'2','Match_BAo','盘口: '+(items.Match_Hr_ShowType=='H'?'主让':'客让')+'('+items.Match_RGG+')')" v-if="items.Match_BAo!=null&&items.Match_BAo!='0'" href="javascript:;">{{items.Match_BAo}}</a>
                       </span>
                        <span v-if="items.Match_BAo!=null&&items.Match_BAo!='0'" class="pankou">{{items.Match_Hr_ShowType=="C" && items.Match_BAo!="0"?items.Match_BRpk:""}}</span>
                      </div>
                    </td>
                    <td class="zhong line3" width="95px">
                      <div class="rangqiu_odds">
                        <span class="odds">
                           <a @click="ClickBet('足球滚球',key,items.Match_ID,items.Match_Time,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_BDxpk.replace('@',''),items.Match_Bdpl,'2','Match_Bdpl')" v-if="items.Match_Bdpl!=null&&items.Match_Bdpl!='0'" href="javascript:;" title="大">
                               {{items.Match_Bdpl }}
                           </a>
                        </span>
                        <span v-if="items.Match_Bdpl!=null&&items.Match_Bdpl!='0'" class="pankou">
                               {{items.Match_BDxpk}}
                        </span>
                        <br>
                        <span class="odds">
                           <a @click="ClickBet('足球滚球',key,items.Match_ID,items.Match_Time,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Bdxpk2.replace('@',''),items.Match_Bxpl,'2','Match_Bxpl')" v-if="items.Match_Bxpl!=null&&items.Match_Bxpl!='0'" href="javascript:;" title="小" >
                               {{items.Match_Bxpl}}
                        </a>
                        </span>
                        <span v-if="items.Match_Bxpl!=null&&items.Match_Bxpl!='0'" class="pankou">
                               {{items.Match_Bdxpk2}}
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
<script>
  import Mixin from '@/Mixin'
  import modelBox from '../common/model'
  export default {
    name: 'grounder',
    mixins:[Mixin],
    components: {
      modelBox
    },
    data: function () {
      return {
        action:'../api/app/member/show/json/ft_1_0.php',
        time: 20,
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
        _self.timer('20')
      } else {
        _self.timer('20')
      }
      _self.$store.state.betData.tzType=1;
      _self.$store.state.betInfo=true
    },
    mounted: function () {

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

