//index.js
//获取应用实例

const app = getApp();

Page({
  data: {
    currentTab: 0,
    playerList : []
  },
  onLoad:function(e) {
    wx.request({

      url: 'https://yybopworldcup2018147.sparta.html5.qq.com/ajax/GetPlayerList?username=lynasliu',
      method : 'get',
      success: (res)=> {
        if(res.data.ret == -102){
            wx.showToast({  
              title: '您没有权限，请联系管理员开通',  //标题  
              width : 200,
              icon: 'success',  //图标，支持"success"、"loading"  
              mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false  
            })  
            return;
        }
          this.setData({
            playerList : res.data.data
          })
      }
    })
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
