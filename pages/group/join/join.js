//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
      title: '微信小程序联盟',
      desc: '最具人气的小程序开发联盟!',
      path: '/pages/personal/index/index'
    }
  },
  
  onLoad: function () {

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
  },

  getUserInfo: function(e) {

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  gotoArena: function(e){
    // wx.navigateTo({
    //   url: '../arenalist/arenalist'
    // })
    const data = {
      groupId : '9104',
      userId : 'yeehoneliu'
    }

    wx.request({
        url: 'https://yybopworldcup2018147.sparta.html5.qq.com/ajax/joinGroup?username=lynasliu',
        method : 'post',
        header: { 
          'content-type': 'application/x-www-form-urlencoded'
        }, 
        data,
        success: function(res) {
          console.log('res',res)
        }
      })
  },
  confirmJoin:function(e){
      wx.request({
        url: 'https://yybopworldcup2018147.sparta.html5.qq.com/joinGroup?username=lynasliu',
        method : 'post',
        data: {
          groupId: '9104',
          userid : 'lissun'

        },
        success: function(res) {
          console.log('res',res)
        }
      })
  }
})
