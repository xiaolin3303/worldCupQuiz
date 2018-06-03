//index.js
//获取应用实例

const app = getApp();
const getData = require("../../../model/dataModel");
const testData = require("../../../test/testData");
const championList  = require("../../../test/championList");
const sepcTime = require("../../../config/specTimeConfig");

Page({
  data: {
    selectData: {},
    currentTab: 1,
    championData : [],
    selectChampion: null,
    isChampionResTime : +new Date() > sepcTime.CHAMPION_RES_TIME,
    // isChampionResTime: true,
    championResData :{}
  },
  onLoad:function(e) {

    //  this.setData({
    //   groupListData : testData.data,
    //   championData : championList.data
    // })

    wx.request({

      url: 'https://yybopworldcup2018147.sparta.html5.qq.com/ajax/GetChampionList?username=lynasliu',
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
            championData : res.data.data
          })
      }
    })

    wx.request({

      url: 'https://yybopworldcup2018147.sparta.html5.qq.com/ajax/GetChampionRes?user_id=wesperhuang',
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
            championResData : res.data.data
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
      const url = current == 0 ? '../groupMatches/groupMatches' : (current == 1 ? '../champion/champion' : '../eliminate/eliminate') 
      wx.navigateTo({
        url
      })
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
        user_id : 'yeehoneliu'
    }

    wx.request({

      url: 'https://yybopworldcup2018147.sparta.html5.qq.com/ajax/InsertChampion',
      method : 'post',
      header: { 
        'content-type': 'application/x-www-form-urlencoded'
      }, 
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
