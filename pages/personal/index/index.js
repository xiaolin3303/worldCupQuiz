//index.js
//获取应用实例

const app = getApp();
const getData = require("../../../model/dataModel");
const testData = require("../../../test/testData");
const championList  = require("../../../test/championList");
const sepcTime = require("../../../config/specTimeConfig");

Page({
  data: {
    navigateList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    currentTab: 1,
    subCurrentTab : 'A',
    quizRes : {},
    forecastScore : 0,
    groupListData : [],
    selectData: {},
    championData : [],
    selectChampion: null,
    isChampionResTime : false,
    totalScore: 0
  },
  onLoad:function(e) {

    //  this.setData({
    //   groupListData : testData.data,
    //   championData : championList.data
    // })

    wx.request({

      url: 'https://yybopworldcup2018147.sparta.html5.qq.com/ajax/GetBetList?username=lynasliu',
      method : 'get',
      success: (res)=> {
        if(res.data.ret == -102){
            wx.showToast({  
              title: '您没有权限，请联系管理员开通',  //标题  
              width : 200,
              icon: 'success',  //图标，支持"success"、"loading"  
              mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false  
            })  
        }
        // res.data.data[0].player_answer_id = 1;
        // res.data.data[1].player_answer_id = null;
          this.setData({
            groupListData : res.data.data.map(group => Object.assign({}, group, {
              isLock: typeof group.player_answer_id === 'number'
            })),
            championData : championList.data
          })
      }
    })

  },

  onShareAppMessage: function () {
    return {
      title: '微信小程序联盟',
      desc: '最具人气的小程序开发联盟!',
      path: '/pages/personal/index/index'
    }
  },

  championSelect: function (e) {
    const { championid } = e.currentTarget.dataset;
    this.setData({
      selectChampion: championid
    })

  },
  //切换tab,个人赛分类
  clickTab:function(e) {

      const {current} = e.currentTarget.dataset;
      const {currentTab} = this.data;

      if (currentTab === current) {
        return false;
      } else {
        let isTime  = sepcTime.CHAMPION_RES_TIME - new Date().getTime() 
        isTime = isTime <= 0 ? true : false 

        this.setData({
          currentTab: current,
          isChampionResTime : isTime
        })
      }
  },
  //切换subtab
  clickSubTab:function(e) {
      const { subtab } = e.currentTarget.dataset;
      this.setData({
        subCurrentTab: subtab
      })
  },

  handleQuizResult:function(e) {
      const { odds, itemid, answerid, lockanswer } = e.currentTarget.dataset;
      if (lockanswer === true) {
        return
      }

      // const selectItem = {
      //     itemid,
      //     answerid 
      // }
      //todo  只记录itemid相同的最后一项

      // this.data.selectData.push(selectItem);
      let quizres = Object.assign({}, this.data.quizRes, {
        
        [itemid]: {
          answerid,
          forecastScore: 10 * odds
        }
      })

      const totalScore = Object.keys(quizres).reduce((acc, groupId) => {
        return acc + (quizres[groupId].forecastScore || 0)
      }, 0)

      this.setData({
        quizRes : quizres,
        totalScore
        // forecastScore : 10 * odds,
        // selectData : this.data.selectData
      })
      
  },
  clearSelect:function(e){

      console.log(this.data.quizRes);

      this.setData({
          selectData : [],
          quizRes : -1,
          totalScore: 0
      })
  },
  submitGroupRes:function(e){

      let selectData = [];
      const {quizRes} = this.data;

      selectData = Object.keys(quizRes).map(key=>{
          let item ={
              itemid : key ,
              answerid : quizRes[key].answerid
          }
          return item 
      });


  },
  voteChampion:function(e){

    const {teamid} = e.currentTarget.dataset;
    const data = {
        team_id : teamid,
        user_id : 'lynasliu'
    }

    wx.request({

      url: 'https://yybopworldcup2018147.sparta.html5.qq.com/ajax/InsertChampion',
      method : 'post',
      data,
      success: (res)=> {

        if(res.ret != -1){
            this.setData({
              selectChampion: teamid
            })
            wx.showToast({  
              title: '成功',  //标题  
              icon: 'success',  //图标，支持"success"、"loading"  
              mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false  
            }) 
        }else{
            wx.showToast({  
              title: '投票失败',  //标题  
              icon: 'success',  //图标，支持"success"、"loading"  
              mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false  
            }) 
        }


      }
    })
 
  }

})
