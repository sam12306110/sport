<template>
  <!--<div>-->
    <!--<div class="top">-->
      <!--<div style="float:right; padding-right:5px;">-->
        <!--<input type="button" value="刷新" class="button_sx" id="sx_f5" onclick="javascript:shuaxin(document.getElementById('league').value);">-->
        <!--<input type="hidden" name="top_f5" id="top_f5" value="0">-->
        <!--<input type="hidden" name="league" id="league" value="">-->
        <!--<input type="button" id="xzls" value="选择联赛" class="button_ls" @click="showModel()">-->
        <!--<div style="display:none" id="aaaaa">0</div>-->
      <!--</div>-->
      <!--<div class="page" id="page">-->
        <!--<span>足球（早餐）&gt;&gt;</span>-->
        <!--<ul id="top">-->
          <!--<li v-for="(spage,key) in soPage">-->
            <!--<a href="javascript:;"@click="getData('',key)">{{spage+1}}</a>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div id="datashow">-->
      <!--<table border="0" cellspacing="1" cellpadding="0" bgcolor="#ACACAC" class="box">-->
        <!--<tbody>-->
        <!--<tr>-->
          <!--<th width="100">比赛时间</th>-->
          <!--<th>项目</th>-->
          <!--<th>队伍</th>-->
          <!--<th>结果</th>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td height="100" align="center" bgcolor="#FFFFFF" colspan="4">-->
            <!--暂无任何赛果</td>-->
        <!--</tr>-->
        <!--</tbody>-->
      <!--</table>-->
    <!--</div>-->
  <!--</div>-->
  <iframe width="100%" height="5187" src="https://98208.com/app/member/show/result/Champion.php" frameborder="0"></iframe>
</template>
<script type="text/ecmascript-6">
//  import Mixin from '@/Mixin'
  export default {
    name:'tennisWinner',
//    mixins:[Mixin],
    data () {
      return {
//        action:'../api/app/member/show/json/champion_data.php',
      }
    },
    created: function () {
    },
    mounted: function () {
//      this.getData()
    },
    methods: {

    }
  }
</script>
