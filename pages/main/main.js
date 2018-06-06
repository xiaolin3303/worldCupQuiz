//logs.js
const util = require('../../utils/util.js')
const app = getApp();

Page({

  data: {
    logs: []
  },
  bindViewRank: function() {

    wx.navigateTo({
      url: '../rank/rank'
    })
  },
  bindViewPersonal:function(){

    wx.navigateTo({
      url: '../personal/groupMatches/groupMatches'
    })
  },
  bindViewGroup:function(){

    wx.navigateTo({
      url: '../group/index/index'
    })
  },
  onLoad: function () {

    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })


    if (app.globalData.userInfo) {

      wx.setStorageSync('userInfo' , app.globalData.userInfo);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){

      app.userInfoReadyCallback = res => {
        wx.setStorageSync('userInfo' , res.userInfo);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          wx.setStorageSync('userInfo' , res.userInfo);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {

    wx.setStorageSync('userInfo' , e.detail.userInfo);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
