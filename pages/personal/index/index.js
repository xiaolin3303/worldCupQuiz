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
    currentTab: 0,
    subCurrentTab : 'A',
    quizRes : {},
    forecastScore : 0,
    groupListData : [],
    selectData: {},
    championData : [],
    selectChampion: null,
    isChampionResTime : false
  },
  onLoad:function(e) {

    // getData('https://dycrad.sparta.html5.qq.com/node/getFileNew','','正在加载',
    //   (data) => {
    //       console.log(datasetata);
    //   })
    // let quizRes = {}
    // testData.data.forEach(group => {
    //   quizres[group.item_id] = 
    // })
    this.setData({
      groupListData : testData.data,
      championData : championList.data
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
      const { odds, itemid, answerid } = e.currentTarget.dataset;

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
      this.setData({
        quizRes : quizres,
        // forecastScore : 10 * odds,
        // selectData : this.data.selectData
      })
      
  },
  clearSelect:function(e){

      this.setData({
          selectData : [],
          quizRes : -1 
      })
  },
  submitGroupRes:function(e){

  },
  voteChampion:function(e){
    wx.showToast({  
      title: '成功',  //标题  
      icon: 'success',  //图标，支持"success"、"loading"  
      mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false  
    })  
  }

})
