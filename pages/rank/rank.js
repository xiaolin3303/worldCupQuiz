//index.js
//获取应用实例

const app = getApp();

Page({
  data: {
    currentTab: 0
  },
  onLoad:function(e) {

  },


  //切换tab,个人赛分类
  clickTab:function(e) {

      const {current} = e.currentTarget.dataset;
      const {currentTab} = this.data;

      if (currentTab === current) {
        return false;
      } else {
        this.setData({
          currentTab: current
        })
      }
  },

})
