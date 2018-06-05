//logs.js
const util = require('../../utils/util.js')

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
  }
})
