
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    matchInfo: {"answerlist":[{"answe_describe":"胜利","answer_id":1,"is_correct":0,"odd":"1"},{"answe_describe":"平局","answer_id":99,"is_correct":0,"odd":"1"},{"answe_describe":"胜利","answer_id":2,"is_correct":0,"odd":"1"}],"ban_time":"2018-06-14 23:00:00","game_num":"1","group_id":"A组","item_describe":"","item_id":101,"player_answer_id":0,"team_id1":1,"team_id2":2,"team_name1":"俄罗斯","team_name2":"沙特阿拉伯","team_url1":"http://yyb.gtimg.com/fibadcms_img/adcms/faa31612dfaec9232b57ecbb1119fdd91527735180011601.png","team_url2":"http://yyb.gtimg.com/fibadcms_img/adcms/06d4c9a5463ddbf11008ed5ab8882d501527735217763204.png"}
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
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  createGroup: function(e){
    wx.navigateTo({
      url: '../join/join'
    })
  }
})
