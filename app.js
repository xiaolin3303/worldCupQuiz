//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    let me = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求

          wx.request({
            url: 'https://unionguard.3g.qq.com/LoginJsCodeSession',
            method : 'post',
            data: {
              code: res.code
            },
            success: function(res) {
              console.log('login', res);
              me.globalData.rtxUserInfo = res.data;
              if (me.userInfoReadyCallback) {
                me.userInfoReadyCallback(res.data)
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log('userInfo', res.userInfo)
              me.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              // if (this.userInfoReadyCallback) {
              //   this.userInfoReadyCallback(res)
              // }
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  console.log('userInfo', res.userInfo)
                  me.globalData.userInfo = res.userInfo
                }
              })
              wx.login({
                success: function(res) {
                  if (res.code) {
                    //发起网络请求

                    wx.request({
                      url: 'https://unionguard.3g.qq.com/LoginJsCodeSession',
                      method : 'post',
                      data: {
                        code: res.code
                      },
                      success: function(res) {
                        console.log('login', res);
                        me.globalData.rtxUserInfo = res.data;
                      }
                    })
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                }
              });
              
            },
            fail: function () {
              console.log('authorize failed')
            }
          })
        }
      }
    })
  },
  
  globalData: {
    userInfo: null,
    rtxUserInfo: null
  }
})