<template>
  <div id="app">
    <div class="new_center">
      <div id="jd_shadow" v-if="showModel.modelClose"></div>
      <div :class="$store.state.betData.tzType==2?'new_leftP':'new_left'">
        <Bet></Bet>
        <div class="item" id="subnav_head" style="">
          <ul style="width: 100%;list-style: none;line-height: 26px">
            <li :class="menuList=='zc'?'itemrdon':'itemrd'" @click="openMenu('zc')">
              <a id="market_E_text" href="javascript:;">
                早餐
              </a>
            </li>
            <li :class="menuList=='jr'?'itemrdon':'itemrd'" @click="openMenu('jr')">
              <a id="market_T_text" href="javascript:;">
                今日
              </a>
            </li>
            <li :class="menuList=='gq'?'itemrdon':'itemrd'" @click="openMenu('gq')">
              <a id="market_L_text" href="javascript:;">
                滚球
                <span id="market_L_head_Cnt">{{footballSt.L + basketSt.L ? footballSt.L + basketSt.L : ''}}</span>
              </a>
            </li>
          </ul>
        </div>
        <!--Today and Early-->
        <div id="subnav">
          <div id="market_body" v-if="menuList=='jr'|| menuList=='zc'" width="100%" style="">
            <!-- BEGIN MenuDetail -->
            <!--Soccer-->
            <div id="1_head" @click="SwitchSport('ZQ')">
               <span class="nav">
                          <a href="JavaScript:;">足球
                            <span id="1_Cnt" class="tabcontor">{{statisticsSwitch == 2 ? footballSt.T : footballSt.E}}</span>
                            <!--<img id="img_1_LV" src="/cl/template/bbin/public/images/layout/icon_live.gif" width="30" height="12" border="0" style="position: absolute; left: 140px; margin-top: 6px; display: none;">-->
                         </a>
                        </span>
            </div>
            <div id="1_body" :class="listShow&&listNum==1?'active'+' nmb':'nmb'">

                <div class="subnav-link" style="display: block;">
                  <a href="javascript:;" @click="footballSwitch()">
                    <span class="submenu" style="cursor:pointer;">独赢&amp;让球&amp;大小</span>
                    <span id="1_A_Cnt" class="contor">{{statisticsSwitch == 2 ? footballSt.T_A : footballSt.E_A}}</span>
                  </a>
                </div>

                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/correct'">
                    <span class="submenu" style="cursor:pointer;">波胆</span>
                    <span id="1_B_Cnt" class="contor">{{statisticsSwitch == 2 ? footballSt.T_B : footballSt.E_B}}</span>
                  </router-link>
                </div>

                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/firstCorrect'">
                    <span class="submenu" style="cursor:pointer;">上半场波胆</span>
                    <span id="1_G_Cnt" class="contor">{{statisticsSwitch == 2 ? footballSt.T_G : footballSt.E_G}}</span>
                  </router-link>
                </div>

                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/totalScore'"><span class="submenu" style="cursor:pointer;">总入球</span>
                    <span id="1_C_Cnt" class="contor">{{statisticsSwitch == 2 ? footballSt.T_C : footballSt.E_C}}</span></router-link>
                </div>


                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/audience'"><span class="submenu" style="cursor:pointer;">半场 / 全场</span>
                    <span id="1_D_Cnt" class="contor">{{statisticsSwitch == 2 ? footballSt.T_D : footballSt.E_D}}</span></router-link>
                </div>


                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/mixedClearance'">
                    <span class="submenu" style="cursor:pointer;">混合过关</span>
                    <span id="1_E_Cnt" class="contor">{{statisticsSwitch == 2 ? footballSt.T_E : footballSt.E_E}}</span>
                  </router-link>
                </div>

                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/winChampion'">
                    <span class="submenu" style="cursor:pointer;">优胜冠军</span>
                    <span id="1_F_Cnt" class="contor">{{statisticsSwitch == 2 ? footballSt.T_F : footballSt.E_F}}</span>
                  </router-link>
                </div>


                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/results'"><span class="submenu" style="cursor:pointer;">赛果</span>
                    <span id="1_R_Cnt" class="contor">{{footballSt.R}}</span></router-link>
                </div>


              <div class="subnav-link" style="display: block; height: 20px">
                <a target="_blank" href="https://98208.com/member/lottery/rule/Rule_Zq.html">
                  <span class="submenu" style="cursor:pointer;">赛事规则</span>
                </a>
              </div>
            </div>
            <!--Basketball-->
            <div id="2_head" @click="SwitchSport('LQ')">
                        <span class="nav"><a href="javascript:;">篮球
                          <span id="2_Cnt" class="tabcontor">{{statisticsSwitch == 2 ? basketSt.T : basketSt.E}}</span>
                          <!--<img id="img_2_LV" src="/cl/template/bbin/public/images/layout/icon_live.gif" width="30" height="12" border="0" style="position: absolute; left: 140px; margin-top: 6px; display: none;">-->
                        </a>
                        </span>
            </div>
            <div id="2_body" :class="listShow&&listNum==2?'active'+' nmb':'nmb'">

                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/basketballSize'">
                    <span class="submenu" style="cursor:pointer;">让球&amp;大小&amp;单/双</span>
                    <span id="2_A_Cnt" class="contor">{{statisticsSwitch == 2 ? basketSt.T_A : basketSt.E_A}}</span></router-link>
                </div>
                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/basketballSingleSection'">
                    <span class="submenu" style="cursor:pointer;">单节</span>
                    <span id="2_D_Cnt" class="contor">{{statisticsSwitch == 2 ? basketSt.T_D : basketSt.E_D}}</span>
                  </router-link>
                </div>

              <div id="2_B">
                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/basketballMixedClearance'">
                    <span class="submenu" style="cursor:pointer;">混合过关</span>
                    <span id="2_B_Cnt" class="contor">{{statisticsSwitch == 2 ? basketSt.T_B : basketSt.E_B}}</span>
                  </router-link>
                </div>
              </div>
              <div id="2_C">
                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/basketballWinChampion'">
                    <span class="submenu" style="cursor:pointer;">优胜冠军</span>
                    <span id="2_C_Cnt" class="contor">{{statisticsSwitch == 2 ? basketSt.T_C : basketSt.E_C}}</span>
                  </router-link>
                </div>
              </div>
              <div id="2_R">
                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/basketballResult'">
                    <span class="submenu" style="cursor:pointer;">赛果</span>
                    <span id="2_R_Cnt" class="contor">{{ basketSt.R}}</span>
                  </router-link>
                </div>
              </div>
              <div class="subnav-link" style="display: block;height: 20px">
                <a target="_blank" href="https://98208.com/member/lottery/rule/Rule_Lq.html">
                  <span class="submenu" style="cursor:pointer;">赛事规则</span></a>
              </div>

            </div>
            <!--Tennis-->
            <div id="3_head" @click="SwitchSport('WQ')">
                        <span class="nav">
                          <a href="javascript:;">网球
                            <span id="3_Cnt" class="tabcontor">{{statisticsSwitch == 2 ? tennisSt.T : tennisSt.E}}</span>
                         </a>
                        </span>
            </div>
            <div id="3_body" :class="listShow&&listNum==3?'active'+' nmb':'nmb'">

                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/tennisSize'">
                    <span class="submenu" style="cursor:pointer;">独赢&amp;让盘&amp;大小&amp;单/双</span>
                    <span id="3_A_Cnt" class="contor">{{statisticsSwitch == 2 ? tennisSt.T_A : tennisSt.E_A}}</span>
                  </router-link>
                </div>


                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/tennisWinner'">
                    <span class="submenu" style="cursor:pointer;">优胜冠军</span>
                    <span id="3_D_Cnt" class="contor">{{statisticsSwitch == 2 ? tennisSt.T_D : tennisSt.E_D}}</span>
                  </router-link>
                </div>


                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/tennisResult'">
                    <span class="submenu" style="cursor:pointer;">赛果</span>
                    <span id="3_R_Cnt" class="contor">{{ tennisSt.R}}</span>
                  </router-link>
                </div>


                <div class="subnav-link" style="display: block;height: 20px">
                  <a target="_blank" href="https://98208.com/member/lottery/rule/Rule_Wq.html">
                    <span class="submenu" style="cursor:pointer;">赛事规则</span></a>
                </div>

            </div>
            <!--Volleyball-->
            <div id="4_head" @click="SwitchSport('PQ')">
                        <span class="nav">
                          <a href="javascript:;">排球 <span id="4_Cnt" class="tabcontor">{{statisticsSwitch == 2 ? volleySt.T : volleySt.E}}</span>
                        </a>
                        </span>
            </div>
            <div id="4_body" :class="listShow&&listNum==4?'active'+' nmb':'nmb'">

                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/volleyballSize'">
                    <span class="submenu" style="cursor:pointer;">独赢&amp;让分&amp;大小&amp;单/双</span>
                    <span id="4_A_Cnt" class="contor">{{statisticsSwitch == 2 ? volleySt.T_A : volleySt.E_A}}</span>
                  </router-link>
                </div>


                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/volleyballWinner'">
                    <span class="submenu" style="cursor:pointer;">优胜冠军</span>
                    <span id="4_D_Cnt" class="contor">{{statisticsSwitch == 2 ? volleySt.T_D : volleySt.E_D}}</span>
                  </router-link>
                </div>


                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/volleyballResult'">
                    <span class="submenu" style="cursor:pointer;">赛果</span>
                    <span id="4_R_Cnt" class="contor">{{volleySt.R}}</span>
                  </router-link>
                </div>


                <div class="subnav-link" style="display: block;height: 20px">
                  <a target="_blank" href="https://98208.com/member/lottery/rule/Rule_Pq.html">
                    <span class="submenu" style="cursor:pointer;">赛事规则</span></a>
                </div>

            </div>
            <!--Baseball-->
            <div id="5_head" @click="SwitchSport('BQ')">
                        <span class="nav"><a href="javascript:;">棒球
                          <span id="5_Cnt" class="tabcontor">{{statisticsSwitch == 2 ? baseSt.T: baseSt.E}}</span>
                        </a>
                        </span>
            </div>
            <div id="5_body" :class="listShow&&listNum==5?'active'+' nmb':'nmb'">

                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/baseballSize'">
                    <span class="submenu" style="cursor:pointer;">独赢&amp;让分&amp;大小&amp;单/双</span>
                    <span id="5_A_Cnt" class="contor">{{statisticsSwitch == 2 ? baseSt.T_A : baseSt.E_A}}</span>
                  </router-link>
                </div>


                <div class="subnav-link" style="display: block;">
                  <router-link :to="'baseballWinner'"><span class="submenu" style="cursor:pointer;">优胜冠军</span>
                    <span id="5_C_Cnt" class="contor">{{statisticsSwitch == 2 ? baseSt.T_C : baseSt.E_C}}</span>
                  </router-link>
                </div>


                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/baseballResult'"><span class="submenu" style="cursor:pointer;">赛果</span>
                    <span id="5_R_Cnt" class="contor">{{ baseSt.R}}</span></router-link>
                </div>


                <div class="subnav-link" style="display: block;height: 20px">
                  <a target="_blank" href="https://98208.com/member/lottery/rule/Rule_Bq.html">
                    <span class="submenu" style="cursor:pointer;">赛事规则</span>
                  </a>
                </div>

            </div>
            <!--Other-->
            <div id="7_head" @click="SwitchSport('QT')">
                        <span class="nav">
                          <a href="javascript:;">其他
                          <span id="7_Cnt" class="tabcontor">{{statisticsSwitch == 2 ? otherSt.T : otherSt.E}}</span>
                        </a>
                        </span>
            </div>
            <div id="7_body" :class="listShow&&listNum==6?'active'+' nmb':'nmb'">

                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/otherSize'">
                    <span class="submenu" style="cursor:pointer;">独赢&amp;让盘&amp;大小&amp;单/双</span>
                    <span id="7_A_Cnt" class="contor">{{statisticsSwitch == 2 ? otherSt.T_C : otherSt.E_C}}</span>
                  </router-link>
                </div>


                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/otherWinner'">
                    <span class="submenu" style="cursor:pointer;">优胜冠军</span>
                    <span id="7_D_Cnt" class="contor">{{statisticsSwitch == 2 ? otherSt.T_D : otherSt.E_D}}</span>
                  </router-link>
                </div>


                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/otherResult'">
                    <span class="submenu" style="cursor:pointer;">赛果</span>
                    <span id="7_R_Cnt" class="contor">{{otherSt.R}}</span>
                  </router-link>
                </div>

            </div>
            <!--gj-->
            <div id="6_head" @click="SwitchSport('GJ')">
                        <span class="nav">
                          <a href="javascript:;">冠军
                            <span id="6_Cnt" class="tabcontor">{{statisticsSwitch == 2 ? championSt.T_A : championSt.E_A}}</span>
                        </a></span>
            </div>
            <div id="6_body" :class="listShow&&listNum==7?'active'+' nmb':'nmb'"
                 style="border-bottom: 1px solid #e2e2e2">

                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/generalChampion'"><span class="submenu" style="cursor:pointer;">综合冠军</span>
                    <span id="6_A_Cnt" class="contor">{{statisticsSwitch == 2 ? championSt.T_A : championSt.E_A}}</span></router-link>
                </div>


                <div class="subnav-link" style="display: block;">
                  <router-link :to="'/championshipResult'"><span class="submenu" style="cursor:pointer;">冠军赛果</span>
                    <span id="6_R_Cnt" class="contor">{{ championSt.R}}</span></router-link>
                </div>

            </div>
          </div>
        </div>
        <!--Live滾球-->
        <div id="gq" v-if="menuList=='gq'">
          <ul style="list-style: none">
            <li>
              <router-link :to="'/grounder'" class="nav" style="padding-left: 15px">
                足球
                <span id="L_1_Cnt" class="tabcontor">{{footballSt.L}}</span>
                <img id="img_1_LV" src="../static/images/bg/icon_live.gif" width="30" height="12" border="0"
                     style="position: absolute; left: 140px; margin-top: 6px;">
              </router-link>
            </li>
            <li>
              <router-link :to="'/basketGrounder'" class="nav" style="padding-left: 15px">
                篮球
                <span id="L_2_Cnt" class="tabcontor">{{basketSt.L}}</span>
                <img id="img_2_LV" src="../static/images/bg/icon_live.gif" width="30" height="12" border="0"
                     style="position: absolute; left: 140px; margin-top: 6px;">
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="new_right" style="width: 820px">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Mixin from '@/Mixin'
  import Bet from '@/components/common/bet'
  import $store from '@/_vuex/store'

  export default {
    name: 'App',
    mixins: [Mixin],
    components: {
      Bet
    },
    data: function () {
      return {
        scroll: '',
        listShow: true,
        menuShow: true,
        menuList: 'jr',
        listNum: 1,
        // T 今日
        // E 早盤  T 今日 L 滾球
        // A:独赢&让球&大小,B:波胆,C:单 / 双 & 总入球,D:半场 / 全场,E:混合过关,F:冠軍,G:上半场波胆,R:赛果
        footballSt: {},
        // 籃球
        // E 早盤  T 今日 L 滾球
        // A:让球&大小&单/双,B:混合过关,C:冠軍,R:赛果
        basketSt: {},
        tennisSt: {},
        // 排球
        // E 早盤  T 今日 L 滾球
        // A:独赢&让分&大小&单/双,B:赛盘投注,C:混合过关,D:冠軍,R:赛果
        volleySt: {},
        // 棒球
        // E 早盤  T 今日 L 滾球
        // A:独赢&让分&大小&单/双,B:混合过关,C:冠軍,R:赛果
        baseSt: {},
        // 冠军
        // E 早盤  T 今日 L 滾球
        // A:独赢&让球&大小&单/双,B:混合过关,C:冠軍,R:赛果
        championSt: {},
        // 其他
        // E 早盤  T 今日 L 滾球
        // A:独赢&让盘&大小&单/双,B:赛盘投注,C:混合过关,D:冠軍,R:赛果
        otherSt: {},
        statisticsSwitch: 2
      }
    },
    created: function () {

    },
    mounted: function () {
      let _self = this;
      window.sessionStorage.setItem('dataType', '2');
      _self.$router.push('/toDayBall');
      _self.$store.state.betShow = false;
      _self.eventStatistics()
    },
    methods: {
      SwitchSport: function (e) {
        let _self = this;
//        if (_self.listShow) {
//          _self.listShow = false
//        } else {
//          _self.listShow = true
//        }
        switch (e) {
          case 'ZQ' :
            _self.listNum = 1;
            break;
          case 'LQ' :
            _self.listNum = 2;
            break;
          case 'WQ' :
            _self.listNum = 3;
            break;
          case 'PQ' :
            _self.listNum = 4;
            break;
          case 'BQ' :
            _self.listNum = 5;
            break;
          case 'QT' :
            _self.listNum = 6;
            break;
          case 'GJ' :
            _self.listNum = 7;
            break;
          default :
            _self.listNum = 1
        }
      },
      openMenu: function (lang) {
        let _self = this;
        switch (lang) {
          case 'zc' :
            _self.menuList = 'zc';
            window.sessionStorage.setItem('dataType', 1);
            _self.statisticsSwitch = 1;
            _self.$router.push('/');
            break;
          case 'jr':
            _self.menuList = 'jr';
            window.sessionStorage.setItem('dataType', 2);
            _self.statisticsSwitch = 2;
            _self.$router.push('/toDayBall');
            break;
          case 'gq' :
            _self.menuList = 'gq';
            this.$router.push('/grounder');
            break;
          default :
            _self.menuList = 'jr';
            break;
        }
      },
      footballSwitch: function () {
        let dataType = window.sessionStorage.getItem('dataType')
        if (dataType === '1') {
          this.$router.push('/')
        } else {
          this.$router.push('/toDayBall')
        }
      },
      eventStatistics: function () {
        let _self = this;
        axios.get('../api/app/member/sport_sum.php'
        ).then(res => {
          if (res.status === 200) {
            _self.footballSt = res.data.ZQ;
            _self.basketSt = res.data.LQ;
            _self.tennisSt = res.data.WQ;
            _self.volleySt = res.data.PQ;
            _self.baseSt = res.data.BQ;
            _self.championSt = res.data.GJ;
            _self.otherSt = res.data.QT;
          }
        }).catch(err => {
           throw err
        })
      }
    }
  }
</script>
<style>
  .new_center {
    width: 1030px;
    clear: both;
    background-color: #FFF;
    position: relative;
    margin: 10px auto;
    min-height: 800px;
  }

  .new_left {
    width: 180px;
    min-height: 800px;
    padding: 0;
    margin: 0;
    position: fixed;
    overflow: hidden;
  }

  .new_leftP {
    width: 180px;
    min-height: 800px;
    padding: 0;
    margin: 0;
    position: absolute;
    overflow: hidden;
  }

  .new_right {
    width: 820px;
    min-height: 510px;
    padding: 0;
    margin: 0;
    left: 180px;
    position: absolute;
  }

</style>

