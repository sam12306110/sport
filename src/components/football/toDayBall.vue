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
          <th rowspan="2" class="shijian">时间</th>
          <th rowspan="2" class="duiwu">主队 / 客队</th>
          <th colspan="4" class="quanchang">全场</th>
          <th colspan="3" class="shangbanchang">上半场</th>
        </tr>
        <tr>
          <th class="duying">独赢</th>
          <th class="rangqiu">让球</th>
          <th class="daxiao">大小</th>
          <th class="danshuang">单双</th>
          <th class="duying2">独赢</th>
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
          <td colspan="9" class="liansai"><a :title="'选择>>'+key" style="color:#000 ;padding-left: 10px">{{key}}</a>
            <div>
              <table border="0" cellspacing="1" cellpadding="0" bgcolor="#ACACAC" class="box">
                <tr v-for="items in item">
                  <td class="zhong" style="width: 50px" v-html="items.Match_Date">
                  </td>
                  <td class="line" width="183px">
                    <span class="zhu">{{items.Match_Master}}</span>
                    <br>
                    <span class="ke">{{items.Match_Guest}}</span>
                    <br>
                    <span class="he">和局</span>
                  </td>
                  <td class="zhong line" width="40px">
                    <a href="javascript:;"
                       @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master,items.Match_BzM,'0','Match_BzM')"
                       v-if="items.Match_BzM!=null&&items.Match_BzM!='0'">{{items.Match_BzM}}</a>
                    <br>
                    <a href="javascript:;"
                       @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest,items.Match_BzG,'0','Match_BzG')"
                       v-if="items.Match_BzG!=null&&items.Match_BzG!='0'">{{items.Match_BzG}}</a>
                    <br>
                    <a href="javascript:;" @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'和局',items.Match_BzH,'0','Match_BzH')"
                       v-if="items.Match_BzH!=null&&items.Match_BzH!='0'">{{items.Match_BzH}}</a>
                    <br>
                  </td>
                  <td width="95px">
                    <div class="rangqiu_odds">
                    <span class="odds" v-if="items.Match_Ho!=null&&items.Match_Ho!='0'">
                          <a href="javascript:;"
                             @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master,items.Match_Ho,'0','Match_Ho','盘口: '+(items.Match_ShowType=='H' ? '主让' :'客让')+'('+items.Match_RGG+')')">{{items.Match_Ho}}</a>
                       </span>
                      <span class="pankou"
                            v-if="items.Match_Ho!=null&&items.Match_Ho!='0'">{{items.Match_ShowType == 'H' && items.Match_Ho != '0' ? items.Match_RGG : ''}}</span>
                      <br>
                      <span class="odds" v-if="items.Match_Ao!=null&&items.Match_Ao!='0'">
                          <a href="javascript:;"
                             @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest,items.Match_Ao,'0','Match_Ao','盘口: '+(items.Match_ShowType=='H' ? '主让' :'客让')+'('+items.Match_RGG+')')">{{items.Match_Ao}}</a>
                       </span>
                      <span class="pankou"
                            v-if="items.Match_Ao!=null&&items.Match_Ao!='0'">{{items.Match_ShowType == 'C' && items.Match_Ao != '0' ? items.Match_RGG : ''}}</span>
                    </div>
                  </td>
                  <td width="95px">
                    <div class="rangqiu_odds">
                         <span class="odds" v-if="items.Match_DxDpl!=null&&items.Match_DxDpl!='0'">
                             <a href="javascript:;"
                                @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_DxGG1,items.Match_DxDpl,'0','Match_DxDpl')">{{items.Match_DxDpl}}</a>
                         </span>
                      <span class="pankou"
                            v-if="items.Match_DxDpl!=null&&items.Match_DxDpl!='0'">{{items.Match_DxGG1}}</span>
                      <br>
                      <span class="odds">
                         <a href="javascript:;"
                            @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_DxGG2,items.Match_DxXpl,'0','Match_DxXpl')"
                            v-if="items.Match_DxXpl!=null&&items.Match_DxXpl!='0'">{{items.Match_DxXpl}}</a>
                       </span>
                      <span class="pankou"
                            v-if="items.Match_DxXpl!=null&&items.Match_DxXpl!='0'">{{items.Match_DxGG2}}</span>
                      <br>
                    </div>
                  </td>
                  <td class="zhong" width="95px">
                    <a href="javascript:;" @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'单',items.Match_DsDpl,'0','Match_DsDpl')"
                       v-if="items.Match_DsDpl!=null&&items.Match_DsDpl!='0'"><span
                      style="color: black">单：</span>{{items.Match_DsDpl}}</a><br>
                    <a href="javascript:;" @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'双',items.Match_DsDpl,'0','Match_DsDpl')"
                       v-if="items.Match_DsSpl!=null&&items.Match_DsSpl!='0'"><span
                      style="color: black">双：</span>{{items.Match_DsSpl}}</a><br>
                  </td>
                  <td class="zhong line" width="40px">
                    <a href="javascript:;"
                       @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master+'-[上半]',items.Match_Bmdy,'0','Match_Bmdy')"
                       v-if="items.Match_Bmdy!=null&&items.Match_Bmdy!='0'">{{items.Match_Bmdy}}</a><br>
                    <a href="javascript:;"
                       @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest+'-[上半]',items.Match_Bgdy1,'0','Match_Bgdy1')"
                       v-if="items.Match_Bgdy1!=null&&items.Match_Bgdy1!='0'">{{items.Match_Bgdy1}}</a><br>
                    <a href="javascript:;"
                       @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'和局',items.Match_Bhdy1,'0','Match_Bhdy1')"
                       v-if="items.Match_Bhdy1!=null&&items.Match_Bhdy1!='0'">{{items.Match_Bhdy1}}</a>
                  </td>
                  <td width="95px">
                    <div class="rangqiu_odds">
                      <span class="odds">
                          <a href="javascript:;"
                             @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Master,items.Match_BHo,'0','Match_BHo','盘口: '+(items.Match_Hr_ShowType=='H'?'主让':'客让')+'('+items.Match_RGG+')')"
                             v-if="items.Match_BHo!=null&&items.Match_BHo!='0'">{{items.Match_BHo}}</a>
                       </span>
                      <span class="pankou"
                            v-if="items.Match_BHo!=null&&items.Match_BHo!='0'">{{items.Match_ShowType == 'H' && items.Match_Ho != '0' ? items.Match_RGG : ''}}</span>
                      <br>
                      <span class="odds" v-if="items.Match_BAo!=null&&items.Match_BAo!='0'">
                          <a href="javascript:;"
                             @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Guest,items.Match_BAo,'0','Match_BAo','盘口: '+(items.Match_Hr_ShowType=='H'?'主让':'客让')+'('+items.Match_RGG+')')">{{items.Match_BAo}}</a>
                       </span>
                      <span class="pankou"
                            v-if="items.Match_BAo!=null&&items.Match_BAo!='0'">{{items.Match_ShowType == 'C' && items.Match_Ao != '0' ? items.Match_RGG : ''}}</span>
                    </div>
                  </td>
                  <td width="95px">
                    <div class="rangqiu_odds">
                       <span class="odds" v-if="items.Match_Bdpl!=null&&items.Match_Bdpl!='0'">
                           <a href="javascript:;"
                              @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Bdxpk1.replace('@',''),items.Match_Bdpl,'0','Match_Bdpl')"
                              title="大">
                               {{items.Match_Bdpl}}
                           </a>
                       </span>
                      <span class="pankou" v-if="items.Match_Bdpl!=null&&items.Match_Bdpl!='0'">
                           {{items.Match_Bdxpk1}}
                      </span>
                      <br>
                      <span class="odds" v-if="items.Match_Bdpl!=null&&items.Match_Bdpl!='0'">
                        <a href="javascript:;"
                           @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},items.Match_Bdxpk2.replace('@',''),items.Match_Bxpl,'0','Match_Bxpl')"
                           title="小">
                            {{items.Match_Bxpl}}
                        </a>
                      </span>
                      <span class="pankou" v-if="items.Match_Bdpl!=null&&items.Match_Bdpl!='0'">
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
    name: 'toDayBall',
    mixins:[Mixin],
    components: {
      modelBox
    },
    data: function () {
      return {
        action:'../api/app/member/show/json/ft_1_1.php',
        showType:'今日',
        time:121,
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
        _self.timer('120')
      } else {
        _self.timer('120')
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

