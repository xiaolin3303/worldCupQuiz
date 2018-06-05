//index.js
//获取应用实例

const app = getApp();
const getData = require("../../../model/dataModel");
const testData = require("../../../test/testData");
const championList  = require("../../../test/championList");
const sepcTime = require("../../../config/specTimeConfig");
const Host = require("../../../config/host.config"); 

Page({

  data: {
    currentTab: 0,
    quizRes : {},
    forecastScore : 0,
    groupListData : [],
    selectData: {},
    totalScore: 0,
    myAnwser : '',
    isCorrect : ''
  },

  globalData: {
    groupListData: []
  },

  onLoad:function(e) {

    if(this.globalData.groupListData.length === 0 ){

      const url = `${Host.service}/GetBetList?`  ; 
      wx.request({

        url,
        method : 'get',
        data : {
            username : 'lynasliu'
        },
        success: (res)=> {
          
            if(res.data.ret == -102){
                wx.showToast({  
                  title: '您没有权限，请联系管理员开通',  //标题  
                  width : 200,
                  icon: 'success',  //图标，支持"success"、"loading"  
                  mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false  
                })  
            }
            const groupRes = res.data.data.map(group => Object.assign({}, group, {
                isLock:  group.player_answer_id == '-1'
            }))

            this.setData({
              groupListData : groupRes
            })

            this.globalData.groupListData = groupRes;
        }
      })
    }else{

        const {groupListData} = this.globalData;

        this.setData({
            groupListData
        })
    }

  },

  //切换tab,个人赛分类
  switchTab:function(e) {

      const { currenttab: current } = e.detail;
      const url = current == 0 ? '../groupMatches/groupMatches' : (current == 1 ? '../champion/champion' : '../eliminate/eliminate') 
      wx.redirectTo({
        url
      })
  },

  handleQuizResult:function(e) {

      const { odds, itemid, answerid, lockanswer } = e.currentTarget.dataset;

      if (lockanswer) {
        return
      }

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

      })
      
  },
  clearSelect:function(e){

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
  intelligentSelect:function(e){

      const url = `${Host.service}/GetIntellRst?`; 
      wx.request({
        url,
        method : 'get',
        data : {
            username : 'lynasliu'
        },
        success: (res)=> {

            if(res.data.ret == -102){

                wx.showToast({  
                  title: '您没有权限，请联系管理员开通',  //标题  
                  width : 200,
                  icon: 'success',  //图标，支持"success"、"loading"  
                  mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false  
                })  
            }

            const intellRst = res.data.data;
            
            const groupRes = this.globalData.groupListData.map(group => {
                    
                intellRst.map((intellItem) => {

                  const {item_id,answer_id} = intellItem;
                  if(group.item_id == item_id){
                      group.player_answer_id = answer_id
                  }

                }) 
                return group

            })


            this.setData({
              groupListData:groupRes
            });
        }
      })
  }

})
