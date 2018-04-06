import Vue from 'vue'
import Router from 'vue-router'
//足球
import letBall from '@/components/football/letball'
import correct from '@/components/football/correct'
import firstCorrect from '@/components/football/firstCorrect'
import totalScore from '@/components/football/totalScore'
import audience from '@/components/football/audience'
import mixedClearance from '@/components/football/mixedClearance'
import winChampion from '@/components/football/winChampion'
import results from  '@/components/football/results'
import grounder from  '@/components/football/grounder'
import toDayBall from  '@/components/football/toDayBall'
//篮球
import basketballSize from  '@/components/basketball/basketballSize'
import basketballSingleSection from  '@/components/basketball/basketballSingleSection'
import basketballMixedClearance from  '@/components/basketball/basketballMixedClearance'
import basketballWinChampion from  '@/components/basketball/basketballWinChampion'
import basketballResult from  '@/components/basketball/basketballResult'
import basketGrounder from  '@/components/basketball/basketGrounder'
//网球
import tennisSize from  '@/components/tennis/tennisSize'
import tennisWinner from  '@/components/tennis/tennisWinner'
import tennisResult from  '@/components/tennis/tennisResult'
//排球
import volleyballSize from  '@/components/volleyball/volleyballSize'
import volleyballWinner from  '@/components/volleyball/volleyballWinner'
import volleyballResult from  '@/components/volleyball/volleyballResult'
//棒球
import baseballSize from  '@/components/baseball/baseballSize'
import baseballWinner from  '@/components/baseball/baseballWinner'
import baseballResult from  '@/components/baseball/baseballResult'
//其他
import otherSize from  '@/components/other/otherSize'
import otherWinner from  '@/components/other/otherWinner'
import otherResult from  '@/components/other/otherResult'
//其他
import generalChampion from  '@/components/champion/generalChampion'
import championshipResult from  '@/components/champion/championshipResult'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    //足球
    {
      path: '/',
      name : 'letBall',
      component:letBall
    },
    {
      path: '/correct',
      name : 'correct',
      component:correct
    },
    {
      path: '/firstCorrect',
      name : 'firstCorrect',
      component:firstCorrect
    },
    {
      path: '/totalScore',
      name : 'totalScore',
      component:totalScore
    },
    {
      path: '/audience',
      name : 'audience',
      component:audience
    },
    {
      path: '/mixedClearance',
      name : 'mixedClearance',
      component:mixedClearance
    },
    {
      path: '/winChampion',
      name : 'winChampion',
      component:winChampion
    },
    {
      path: '/results',
      name : 'results',
      component:results
    },
    {
      path: '/grounder',
      name : 'grounder',
      component:grounder
    },
    {
      path: '/toDayBall',
      name : 'toDayBall',
      component:toDayBall
    },
    //篮球
    {
      path: '/basketballSize',
      name :'basketballSize',
      component:basketballSize
    },
    {
      path: '/basketballSingleSection',
      name :'basketballSingleSection',
      component:basketballSingleSection
    },
    {
      path: '/basketballMixedClearance',
      name :'basketballMixedClearance',
      component:basketballMixedClearance
    },
    {
      path: '/basketballWinChampion',
      name :' basketballWinChampion',
      component:basketballWinChampion
    },
    {
      path: '/basketballResult',
      name :' basketballResult',
      component:basketballResult
    },
    {
      path: '/basketGrounder',
      name :'basketGrounder',
      component:basketGrounder
    },

    //网球
    {
      path: '/tennisSize',
      name :'tennisSize',
      component:tennisSize
    },
    {
      path: '/tennisWinner',
      name :'tennisWinner',
      component:tennisWinner
    },
    {
      path: '/tennisResult',
      name :'tennisResult',
      component:tennisResult
    },
    //排球
    {
      path: '/volleyballSize',
      name :'volleyballSize',
      component:volleyballSize
    },
    {
      path: '/volleyballWinner',
      name :'volleyballWinner',
      component:volleyballWinner
    },
    {
      path: '/volleyballResult',
      name :'volleyballResult',
      component:volleyballResult
    },
    //棒球
    {
      path: '/baseballSize',
      name :'baseballSize',
      component:baseballSize
    },
    {
      path: '/baseballWinner',
      name :'baseballWinner',
      component:baseballWinner
    },
    {
      path: '/baseballResult',
      name :'baseballResult',
      component:baseballResult
    },
    //其他
    {
      path: '/otherSize',
      name :'otherSize',
      component:otherSize
    },
    {
      path: '/otherWinner',
      name :'otherWinner',
      component:otherWinner
    },
    {
      path: '/otherResult',
      name :'otherResult',
      component:otherResult
    },
    //冠军
    {
      path: '/generalChampion',
      name :'generalChampion',
      component:generalChampion
    },
    {
      path: '/championshipResult',
      name :'championshipResult',
      component:championshipResult
    },
  ]
})
