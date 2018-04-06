<template>
  <div id="left" class="bet_div" v-if="$store.state.betShow ">
    <div class="match_bet">体育快速交易</div>
    <div id="left_ids"></div>
    <div class="touzhu_2" id="usersid">
      <div class="touzhu_3">
        会员帐号：{{userName}}
      </div>
      <div class="touzhu_3">
        可用额度：
        <span class="red" id="user_money">
            {{userMoney}}
          </span>
      </div>
    </div>
    <input type="hidden" name="touzhutype" id="touzhutype" value="0">
    <div class="touzhu_4" id="cg_msg" v-if="!$store.state.betInfo">
      已选择
      <span id="cg_num">{{$store.state.sportArr.length}}</span>
      场赛事
    </div>
    <div id="touzhudiv" v-if="$store.state.BetSwitch">
      <div v-if="$store.state.betInfo" class="match_msg">
        <div class="match_sort">
          {{$store.state.betData.typeName}}
        </div>
        <div class="match_name">
          {{$store.state.betData.event}}-{{dataType == 1 ? $store.state.betData.baskTime : $store.state.betData.todayTime}}
        </div>
        <div class="match_master">
          {{$store.state.betData.zhuKe.zhu}}
          <span class="match_vs"> VS. </span>
          <span class="match_guest">{{$store.state.betData.zhuKe.ke}}</span>
        </div>
        <div class="match_info" v-if="$store.state.betData.pk">
          {{$store.state.betData.pk}}
        </div>
        <div class="match_info">
          <span class="match_master1">{{$store.state.betData.eventMing}}</span>@
          <span style="color:#D90000;">{{$store.state.betData.peiLv}}</span>
          <img src="../../assets/images/bg/x.gif" alt="取消赛事" width="8" height="8" border="0"
               @click="$store.commit('closeBet')"
               style="cursor:pointer;">
        </div>
      </div>
      <div v-if="!$store.state.betInfo" class="match_msg" v-for="(items,index) in $store.state.sportArr">
        <div class="match_sort">
          {{items[1]}}
        </div>
        <div class="match_info">
          {{items[3].zhu}}
          <span class="match_vs"> VS. </span>
          <span class="match_guest">{{items[3].ke}}</span><br>
          <span class="match_master1">{{items[5]}}</span> @
          <span style="color:#D90000;">{{items[4]}}</span>
          <img src="../../assets/images/bg/x.gif" alt="取消赛事" width="8" height="8" border="0"
               style="cursor:pointer;margin-left: 5px"
               @click="removeArr(index)">

        </div>
      </div>
    </div>
    <div id="post_s" v-if="false" style="color:#FF0000; text-align:center;">正在提交数据...</div>
    <div id="okclose" v-if="$store.state.BetSwitch">
      <div class="touzhu_3">交易金额：
        <input type="text" class="tou_input edit" v-model="amount">
      </div>
      <div class="touzhu_3">
        可赢金额：
        <span id="win_span" class="tou_red2">{{amount ? winAmount : '0.00'}}</span>
        <input type="hidden" value="0.00" name="bet_win" id="bet_win">
      </div>
      <div class="touzhu_3">
        最低限额：
        <span id="min_point_span">{{limit}}</span>
      </div>
      <div id="istz" style="color: rgb(255, 0, 0); text-align: center; " v-if="amount">
        可赢金额：<span id="win_span1">{{winAmount}}</span><br>是否确定交易？
      </div>
    </div>
    <div id="okbtn" v-if="$store.state.BetSwitch">
      <input class="submit_from1" type="button" value="取消" @click="$store.commit('closeBet')">　　
      <input class="submit_from2" type="button" value="确认交易" @click="submitBet('0')" v-if="$store.state.betInformation">
      <input class="submit_from2" type="button" value="确认交易" @click="submitBet('1')"
             v-if="!$store.state.betInformation">
    </div>
    <div id="orderok" v-if="!$store.state.BetSwitch">
      <div class="match_ok">{{suInfo}}</div>
    </div>
    <div v-if="!$store.state.BetSwitch" style="text-align:center;" id="closebtn">
      <input class="toua_3" name="" type="button" @click="$store.commit('closeBet')">　　
    </div>
  </div>
</template>
<script>
  import Mixin from '@/Mixin'
  import $store from '../../_vuex/store'

  export default {
    name: 'Bet',
    mixins: [Mixin],
    components: {},
    data: function () {
      return {
        amount: '',
        winAmount: '',
        limit: 50,
        userMoney: '',
        userName: '',
        suInfo:''
      }
    },

    watch: {
      amount(nev) {
        if (Number(nev) > Number(this.userMoney)) {
          alert('您的账户余额不足');
          this.amount = '';
          return
        }
        if (this.$store.state.sportArr.length !== 0) {
          let sum = 1;
          this.$store.state.sportArr.forEach((v, i) => {
            if (v[7].indexOf('独赢') !== -1 || v[7].indexOf('和局') !== -1 || v[7].indexOf('单双') !== -1) {

              sum *= (v[4] - 0)
            } else {
              sum *= (v[4] - 0 + 1);
            }
          });
          this.winAmount = (sum * nev).toFixed(2);
        } else {
          this.winAmount = (nev * $store.state.betData.peiLv).toFixed(2)
        }

      }
    },
    created: function () {
      this.getUserInfo();
    },
    methods: {
      submitBet: function (type) {
        let _self = this;
        let reg=/^[1-9]+[0-9]*]*$/;
        if(!reg.test(_self.amount)){
          alert('请输入纯数字');
          return
        }
        if (_self.limit > _self.amount) {
          alert('交易金额最少为 ' + _self.limit);
          return
        }
        let data = {};
        let event = [],
          typename = [],
          match_id_in = [],
          peiLv = [],
          point_column = [];
        if (type === '0') {
          typename.push($store.state.betData.typeName);
          match_id_in.push($store.state.betData.match_id_in);
          peiLv.push($store.state.betData.peiLv);
          event.push($store.state.betData.event);
          point_column.push($store.state.betData.point_column);
          data.touzhutype = '0';
          data.bet_money = _self.amount;
          data.ball_sort = typename;
          data.match_id = match_id_in;
          data.bet_point = peiLv;
          data.match_name =event ;
          data.point_column =point_column ;
        }
        else {
          data.touzhutype = '1';

          for (let i = 0; i < _self.$store.state.sportArr.length; i++) {
            event.push(_self.$store.state.sportArr[i][0]);
            typename.push(_self.$store.state.sportArr[i][1]);
            match_id_in.push(_self.$store.state.sportArr[i][2]);
            peiLv.push(_self.$store.state.sportArr[i][4]);
            point_column.push(_self.$store.state.sportArr[i][6])
          }
          data.bet_money = this.amount;
          data.ball_sort = typename;
          data.match_id = match_id_in;
          data.bet_point = peiLv;
          data.match_name = event;
          data.point_column = point_column;
        }
        axios.post('../api/app/member/bet.php', data
        ).then(function (res) {
          _self.amount = '';
          _self.$store.state.BetSwitch = false;
          _self.$store.state.sportArr = [];
          _self.sportArr1 = [];
          if (res.status === 200 && res.data.code === 0) {
            _self.userMoney=res.data.data.money;
            _self.suInfo=res.data.msg;
          }

        }).catch(function (err) {
          throw err
        })
      },
      removeArr: function (index) {
        this.$store.state.sportArr.splice(index, 1);
        if (this.$store.state.sportArr.length === 0) {
          this.$store.state.betShow = false
        }
      },
      getUserInfo: function () {
        axios.get('/api/json/center/?r=Money').then(res => {
          this.userMoney = res.data.data.user_money;
          this.userName = res.data.data.user_name
        }).catch(err => {
          throw err
        })
      }
    }
  }

</script>
