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
          <th class="shijian">时间</th>
          <th class="duiwu">主队 /客队</th>
          <th class="banquanchang">主/主</th>
          <th class="banquanchang">主/和</th>
          <th class="banquanchang">主/客</th>
          <th class="banquanchang">和/主</th>
          <th class="banquanchang">和/和</th>
          <th class="banquanchang">和/客</th>
          <th class="banquanchang">客/主</th>
          <th class="banquanchang">客/和</th>
          <th class="banquanchang">客/客</th>
        </tr>
        <!--<tr>-->
          <!--<td height="100" colspan="11" align="center" bgcolor="#FFFFFF" style="line-height:25px;">-->
            <!--暂无任何赛事</td>-->
        <!--</tr>-->
        <tr >
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
                   <td class="zhong" v-html="items.Match_Date" width="2px"></td>
                   <td width="140px" class="line">
                      <span class="zhu">
                        {{items.Match_Master}}
                      </span>
                    <br>
                    <span class="ke">
                        {{items.Match_Guest}}
                      </span>
                  </td>
                   <td width="38px" class="zhong">
                     <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'主/主',items.Match_BqMM,'0','Match_BqMM')" v-if="items.Match_BqMM!=null&&items.Match_BqMM!='0'" href="javascript:;">
                      {{items.Match_BqMM}}
                     </a>
                  </td>
                   <td width="38px" class="zhong">
                      <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'主/和',items.Match_BqMH,'0','Match_BqMH')" v-if="items.Match_BqMH!=null&&items.Match_BqMH!='0'" href="javascript:;">
                        {{items.Match_BqMH}}
                      </a>
                    </td>
                   <td width="38px" class="zhong">
                      <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'主/客',items.Match_BqMG,'0','Match_BqMG')" v-if="items.Match_BqMG!=null&&items.Match_BqMG!='0'" href="javascript:;">
                        {{items.Match_BqMG}}
                      </a>
                    </td>
                   <td width="38px" class="zhong">
                      <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'和/主',items.Match_BqHM,'0','Match_BqHM')" v-if="items.Match_BqHM!=null&&items.Match_BqHM!='0'" href="javascript:;">
                        {{items.Match_BqHM}}
                      </a>
                    </td>
                   <td width="38px" class="zhong">
                      <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'和/和',items.Match_BqHH,'0','Match_BqHH')" v-if="items.Match_BqHH!=null&&items.Match_BqHH!='0'" href="javascript:;">
                        {{items.Match_BqHH}}
                      </a>
                    </td>
                   <td width="38px" class="zhong">
                      <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'和/客',items.Match_BqHG,'0','Match_BqHG')" v-if="items.Match_BqHG!=null&&items.Match_BqHG!='0'" href="javascript:;">
                        {{items.Match_BqHG}}
                      </a>
                    </td>
                   <td width="38px" class="zhong">
                      <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'客/主',items.Match_BqGM,'0','Match_BqGM')" v-if="items.Match_BqGM!=null&&items.Match_BqGM!='0'" href="javascript:;">
                        {{items.Match_BqGM}}
                      </a>
                    </td>
                   <td width="38px" class="zhong">
                      <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'客/和',items.Match_BqGH,'0','Match_BqGH')" v-if="items.Match_BqGH!=null&&items.Match_BqGH!='0'" href="javascript:;">
                        {{items.Match_BqGH}}
                      </a>
                    </td>
                   <td width="38px" class="zhong">
                      <a @click="ClickBet('足球单式',key,items.Match_ID,items.Match_Date,{zhu:items.Match_Master,ke:items.Match_Guest},'客/客',items.Match_BqGG,'0','Match_BqGG')" v-if="items.Match_BqGG!=null&&items.Match_BqGG!='0'" href="javascript:;">
                        {{items.Match_BqGG}}
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
    name: 'audience',
    mixins:[Mixin],
    components: {
      modelBox
    },
    data () {
      return {
        action:'../api/app/member/show/json/ft_2_3.php',
        showType:'早餐-半场/全场',
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
        _self.action= '../api/app/member/show/json/ft_2_3.php'
        this.showType='早餐-半场/全场'
      }
      if(_self.dataType==2){
        _self.action= '../api/app/member/show/json/ft_1_3.php'
        this.showType='半场/全场'
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
