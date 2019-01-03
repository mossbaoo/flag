//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    flagArr: ['变瘦变美', '赚个一百万', '绝对不熬夜了', '去一次国外旅行', '世界和平', '暴富！', '每天看书半小时', '和家人一起去旅行', '练个马甲线', '练出八块腹肌', '早睡早起', '脱单！', '高考顺利', '不挂科', '瘦10斤', '学会做饭'],
    showFlagArr: [],
  },

  onLoad() {
    this.showFlag()
  },

  // 展示随机flag
  showFlag() {
    let showFlagArr = [];
    for(var i=0; i<6; i++) {
      let index = parseInt(Math.random()*this.data.flagArr.length);
      showFlagArr.push(this.data.flagArr[index])
    }
    this.setData({
      showFlagArr: showFlagArr
    })
  },

})
