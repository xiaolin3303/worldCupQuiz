//index.js
//获取应用实例
const app = getApp();
const getData = require("../../../model/dataModel");
const Host = require("../../../config/host.config"); 
const username = wx.getStorageSync('username');
const sepcTime = require("../../../config/specTimeConfig");

Page({
  data: {
    inputValue : '',
    hasCover : false,
    teamList: [],
    teamBase: {},
    userInfo: null,
    groupName : '',
    groupId : null,
    buttonCnt :"invite",
    isStartTime : +new Date() > sepcTime.GOURP_START_TIME,
  },
  //事件处理函数
  bindVote: function() {

    wx.showToast({
        title: '成功',
        icon: 'succes',
        duration: 1000,
        mask:true
    })
  },
  onShareAppMessage: function () {
    return {
      title: '世界杯竞猜',
      desc: '最具人气的小程序开发联盟!',
      path: `/pages/group/index/index?groupId=${this.data.groupId}`
    }
  },

  onLoad: function (opt) {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    if(opt.groupId){



      const url = `${Host.service}/GetGroupInfo`;
      wx.request({
        url,
        method: 'get',
        data: {
          userId: username,
          battleId: 0
        },
        success: (res) => {

          if (res.data.ret == -102) {
            wx.showToast({
              title: '您没有权限，请联系管理员开通',  //标题  
              width: 200,
              icon: 'success', 
              mask: false,  
            })
          }

          let teamList  = res.data.data[1];

          //保持数组必须长度为4

          if(teamList.length < 4){

            teamList.push({
               userId :  this.data.userInfo.nickName,
               userAvatar: this.data.userInfo.avatarUrl
            })
            teamList.length = 4 ;

            this.setData({
                buttonCnt : 'join',
                groupId : opt.groupId
             })
          }else if(teamList.length == 4){
              if(isStartTime){
                this.setData({
                  buttonCnt : 'goanena',
                  groupId : opt.groupId
               }) 
              }else{
              this.setData({
                  buttonCnt : '',
                  groupId : opt.groupId
               }) 
              }
          }

          let teamBase = res.data.data[0];

          //后端数据格式给的有问题，但是后端没有时间改了，前端只能先将就下
          this.setData({
            groupName : teamBase.groupName,
            teamList,
            teamBase 
          })

        }
      })
    }

  },

  createGroup: function(e){

      wx.showToast({  
        title: '您没有权限，请联系管理员开通',  //标题  
        width : 200,
        icon: 'success',  //图标，支持"success"、"loading"  
        mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false  
      }) 
  },

  inviteFriends: function(e){

     if(!this.data.groupId){
          wx.showModal({  
            title: '提示',  //标题  
            content:'请先输入队名，创建队伍',
            showCancel: false,    
          }) 
     }else{ 
        this.setData({
          hasCover : true
        })
     }
    
  },

  createGroupName: function(e){
      this.setData({
          inputValue : e.detail.value
      })
  },

  confirmGroupName: function(e){

      //TODO 
      const data  = {
         groupName : this.data.inputValue,
         groupLeader : 'viinyxu'
      }
      wx.request({
        url: 'https://yybopworldcup2018147.sparta.html5.qq.com/ajax/makeGroup?debug=1',
        method : 'post',
        header: { 
          'content-type': 'application/x-www-form-urlencoded'
        }, 
        data,
        success: (res) => {
          res = res.data;
          if(res.ret == 0){

             wx.showToast({  
              title: '队伍创建成功',  //标题  
              icon: 'success',  //图标，支持"success"、"loading"  
              mask: false,   
            }) 
            const {groupName,groupId} = res.data

            this.setData({
              groupName,
              groupId
            })
          }
        }
      })
  },

  confirmJoinGroup: function(e){

    const data = {
      groupId : this.data.groupId,
      userId : username
    }

    wx.request({
        url: 'https://yybopworldcup2018147.sparta.html5.qq.com/ajax/joinGroup',
        method : 'post',
        header: { 
          'content-type': 'application/x-www-form-urlencoded'
        }, 
        data,
        success: function(res) {

          if(res.data.ret == 0){

            wx.showToast({  
              title: '加入成功', //标题  
              icon: 'success',  //图标，支持"success"、"loading"  
              mask: false,   
            }) 
          }
        }
      })
  },
  gotoAnera:function(e){
    wx.navigateTo({
      url: '../arenalist/arenalist'
    })
  }
})
