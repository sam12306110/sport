<template>
  <div>
    <!--<div class="top" style="background-color: #838383;">-->
      <!--<div style="float:right; padding-right:5px;">-->
        <!--<input type="button" value="刷新" class="button_sx" id="sx_f5" onclick="javascript:shuaxin(document.getElementById('league').value);">-->
        <!--<input type="hidden" name="top_f5" id="top_f5" value="0">-->
        <!--<input type="hidden" name="league" id="league" value="">-->
        <!--<input type="button" id="xzls" value="选择联赛" class="button_ls" @click="showModel()">-->
        <!--<div style="display:none" id="aaaaa">0</div>-->
      <!--</div>-->
      <!--<div class="page result_title" id="page">-->
        <!--<span>足球结果&gt;&gt;</span>-->
        <!--<ul id="top">-->
          <!--<li v-for="(spage,key) in soPage">-->
            <!--<a href="javascript:;"@click="getData('',key)">{{spage+1}}</a>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div id="datashow">-->
      <!--<table border="0" cellspacing="1" cellpadding="0" class="box" bgcolor="#ACACAC">-->
        <!--<tbody><tr>-->
          <!--<th width="100">开赛时间</th>-->
          <!--<th>主场/客场</th>-->
          <!--<th width="80">上半比分</th>-->
          <!--<th width="80">全场比分</th>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td height="100" colspan="4" align="center" bgcolor="#FFFFFF">暂无任何赛果</td>-->
        <!--</tr>-->
        <!--</tbody>-->
      <!--</table>-->
    <!--</div>-->
    <iframe width="100%" height="5187" src="https://98208.com/app/member/show/result/football.php" frameborder="0"></iframe>
  </div>
</template>
<script type="text/ecmascript-6">
//  import Mixin from '@/Mixin'
  export default {
    name: 'results',
//    mixins:[Mixin],
    components: {

    },
    data () {
      return {

      }
    },
    created: function () {
    },
    mounted: function () {
//      this.getData()
    },
    methods: {
//      getHtml:function () {
//         $.ajax({
//             type:'GET',
//             url:'../api/app/member/show/result/football.php',
//             success:function (res) {
//               console.log(res)
//             }
//         })
//      }
    }

  }
</script>
