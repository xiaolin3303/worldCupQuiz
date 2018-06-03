//index.js
//获取应用实例

const app = getApp();
const getData = require("../../../model/dataModel");

Page({
  data: {
    navigateList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    currentTab: 0,
    subCurrentTab : 'A',
    quizRes : '',
    forecastScore : 0,
    
  },
  onLoad:() => {

    // getData('https://dycrad.sparta.html5.qq.com/node/getFileNew','','正在加载',
    //   (data) => {
    //       console.log(datasetata);
    //   })
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
  //切换subtab
  clickSubTab:function(e) {
      const { subtab } = e.currentTarget.dataset;
      this.setData({
        subCurrentTab: subtab
      })
  },

  handleQuizResult:function(e) {
      const { quizres ,odds } = e.currentTarget.dataset;
      this.setData({
        quizRes : quizres,
        forecastScore : 10 * odds
      })

     // /ajax/InsertChampion



  }

})
