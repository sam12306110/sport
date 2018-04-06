<template>
    <div id="jd_dialog_m" v-if="showModel">
      <div id="jd_dialog_m_h" style="background: rgb(18, 91, 164);">
        <span id="jd_dialog_m_h_l">足球单式</span>
        <span id="jd_dialog_m_h_r" title="关闭" @click="choseData('gb')">
                <img src="../../assets/images/bg/tb1.gif">
        </span>
      </div>
      <div v-if="windowLsm" id="jd_dialog_m_b" >
        <div class="cb_div" v-for="checkList in windowLsm">
          <input type="checkbox" :checked="checked" v-model="selectList" :value="checkList">{{checkList}}
        </div>
      </div>
      <div id="jd_dialog_m_t" style="background-color:#FFFFFF;">
        <input id="jd_submit" style="background-color: blue;" value="提交" type="button" class="button1"
               @click="choseData('tj')">
        <input id="jd_fx" style="background-color: blue;" value="反选" type="button" class="button1"
               @click="choseData('fx')">
        <input id="jd_cancel" style="background-color: blue;" value="取消" type="button" class="button1" @click="choseData('gb')">
      </div>
    </div>
</template>
<script>
  //  import Mixin from '@/Mixin'
  export default {
    name: 'modalBox',
    props: ['windowLsm', 'showModel'],
//    mixins: [Mixin],
    components: {},
    data: function () {
      return {
        checked: false,
        selectList:[],
        sendMessage:{
                    modelClose: false,
                    selectData:'',
                    }
      }
    },
    computed: {},
    created: function () {

    },
    mounted: function () {

    },
    methods: {
      choseData: function (type) {
        let _self = this;
        switch (type) {
          case 'fx' :
               if(_self.selectList.length!==0){
                  _self.selectList=[];
               }else {
                  _self.selectList=_self.windowLsm;
               }
            break;
          case 'gb':
            if(_self.showModel===true){
              _self.sendMessage.modelClose=false
            }
            this.$emit('modelClose', _self.sendMessage);
            break;
          case 'tj' :
            if(_self.showModel===true){
              _self.sendMessage.modelClose=false
            }
            for (let i = 0; i < _self.selectList.length; i++) {
                       _self.sendMessage.selectData += _self.selectList[i]+ "$";
                   }
            this.$emit('modelClose',_self.sendMessage);
            _self.selectList=[];
            _self.sendMessage.selectData='';
            break;

        }


      },
    }
  }

</script>
