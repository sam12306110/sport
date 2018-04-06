import store from './_vuex/store'

let MyMixin = {
  data: function () {
    return {
      source: [],
      race: {},
      soPage: [],
      dataType: 1,
      betMoney: '',
      window_lsm: '',
      showModel: {
        modelClose: false,
        selectData: ''
      },
      sportArr1: [],
      animation: true
    }
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    comShowModel: function (type) {
      if (type === 'op') {
        this.showModel.modelClose = true;
      }
      if (type === 'cl') {
        this.showModel.modelClose = false;
      }
    },
    getData: function (data, page) {
      let _self = this;
      let cPage = 0;
      let sData = '';
      if (page) {
        cPage = page
      }
      if (data) {
        sData = data
      }
      _self.animation = true;
      axios.get(_self.action, {
        params: {
          leaguename: sData,
          CurrPage: cPage,
        }
      }).then(function (res) {
        let resData = res;
        if (resData.status===200) {
          _self.animation = false;
          if (resData.data.db) {
            _self.source = resData.data.db;
            let name = _self.source[0].Match_Name;
            let arr = [];
            let obj = {};
            for (let i = 0, source = _self.source.length; i < source; i++) {
              if (name === _self.source[i].Match_Name) {
                arr.push(_self.source[i]);
              }
              else {
                arr = [];
                arr.push(_self.source[i]);
                name = _self.source[i].Match_Name;
              }
              obj[name] = arr;
            }
            _self.race = obj;
            _self.window_lsm = resData.data.lsm.split('|');
            let pages = resData.data.fy.p_page;
            if (_self.soPage.length === 0) {
              for (let l = 0; l < pages; l++) {
                _self.soPage.push(l)
              }
            } else {
              _self.soPage = [];
              for (let ls = 0; ls < pages; ls++) {
                _self.soPage.push(ls)
              }
            }
          }
        }
      }).catch(function (err) {
        throw err
      })
    },
    clickRef: function (date) {
      let _self = this;
      document.getElementById("top_f5").value = document.documentElement.scrollTop;
      _self.getData(_self.eventName, '0');
      switch (date) {
        case '120':
          _self.time = 120;
          break;
        case '180':
          _self.time = 180;
          break;
        case '999':
          _self.time = 999;
          break;
        case '20':
          _self.time = 20;
          break
      }
    },
    timer: function (date) {
      return setInterval(() => {
        let _self = this;
        _self.time = _self.time - 1;
        if (_self.time < 1) {
          switch (date) {
            case '120':
              _self.time = 120;
              break;
            case '180':
              _self.time = 180;
              break;
            case '999':
              _self.time = 999;
              break;
            case '20':
              _self.time = 20;
              break
          }

          this.getData(_self.eventName, '')
        }
      }, 1000)
    },
    ClickBet: function (typename, event, match_id_in, time, zhuKe, eventMing, peiLv, tzType, point_column, pk, cG,) {
      let _self = this;
      axios.get('../api/json/center/?r=Money').then(res => {
        if (res.status === 200 && res.data.code === 2) {
          alert('您还未登录，请先登录');
          _self.$store.state.betShow=false;
        }
        if (res.status === 200 && res.data.code === 0) {
          _self.$store.state.betShow = true;
          _self.$store.state.BetSwitch = true;
          if (tzType === '1') {
            _self.$store.state.betInfo = false;
            _self.sportArr1.push([event, typename, match_id_in, zhuKe, peiLv, eventMing, point_column, cG]);
            if (_self.sportArr1.length > 8) {
              alert('串关最多允许8场赛事');
              _self.sportArr1.splice(_self.sportArr1.length - 1, 1);
              return
            }
            for (let i = 0; i < _self.sportArr1.length; i++) {
              if (_self.sportArr1[i][5].indexOf('角球') !== -1) {
                alert('角球赛事不能参与串关');
                _self.sportArr1.splice(_self.sportArr1.length - 1, 1);
              }
              if (_self.sportArr1[i][0].indexOf('冠军') !== -1) {
                alert('冠军未开发串关功能');
                _self.sportArr1.splice(_self.sportArr1.length - 1, 1);
              }
              if (_self.sportArr1.length > 1 && _self.sportArr1[i + 1]) {
                if (_self.sportArr1[i][0] === _self.sportArr1[i + 1][0]) {
                  alert('同场赛事不能重复参与串关');
                  _self.sportArr1.splice(_self.sportArr1.length - 1, 1);
                }
              }
            }
            _self.$store.state.sportArr = _self.sportArr1;
          }
          if (tzType === '2') {
            _self.$store.state.betInformation = true;
            _self.$store.state.betData.typeName = typename;
            _self.$store.state.betData.event = event;
            _self.$store.state.betData.match_id_in = match_id_in;
            _self.$store.state.betData.baskTime = time;
            _self.$store.state.betData.zhuKe = zhuKe;
            _self.$store.state.betData.eventMing = eventMing;
            _self.$store.state.betData.peiLv = peiLv;
            _self.$store.state.betData.point_column = point_column;
            _self.$store.state.betData.pk = pk;
          }
          else {
            let times = time.split(/<br\s{0,1}\/?>/);
            _self.$store.state.betInformation = true;
            _self.$store.state.betData.typeName = typename;
            _self.$store.state.betData.event = event;
            _self.$store.state.betData.match_id_in = match_id_in;
            _self.$store.state.betData.baskTime = times[0];
            _self.$store.state.betData.todayTime = times[1];
            _self.$store.state.betData.zhuKe = zhuKe;
            _self.$store.state.betData.eventMing = eventMing;
            _self.$store.state.betData.peiLv = peiLv;
            _self.$store.state.betData.point_column = point_column;
            _self.$store.state.betData.pk = pk;

          }
        }
      }).catch(err => {
        throw err
      });

    },
  }
};
export default MyMixin;
