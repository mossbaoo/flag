
const app = getApp();
const util = require('../../utils/util.js')

Page({
  data: {
    flagArr: [
      {id: 1, name: '变瘦变美', checked: false},
      {id: 2, name: '赚个一百万', checked: false},
      {id: 3, name: '绝对不熬夜了', checked: false},
      {id: 4, name: '去一次国外旅行', checked: false},
      {id: 5, name: '世界和平', checked: false},
      {id: 6, name: '暴富，享受有钱人的生活', checked: false},
      {id: 7, name: '每天看书半小时', checked: false},
      {id: 8, name: '和家人一起去旅行', checked: false},
      {id: 9, name: '练个马甲线', checked: false},
      {id: 10, name: '练出八块腹肌', checked: false},
      {id: 11, name: '早睡早起', checked: false},
      {id: 12, name: '告别单身，必须脱单', checked: false},
      {id: 13, name: '高考顺利', checked: false},
      {id: 14, name: '一定不挂科', checked: false},
      {id: 15, name: '学会做饭', checked: false},
      {id: 16, name: '一定会瘦的', checked: false},
      {id: 17, name: '一定好好学习', checked: false},
      {id: 18, name: '周末绝不宅在床上', checked: false},
      {id: 19, name: '一定要多多运动', checked: false},
      {id: 20, name: '戒掉手游，再玩剁手', checked: false},
      {id: 21, name: '去看一场爱豆的现场演出', checked: false},
    ],
    showFlagArr: [],
    myFlagArr: [],
    flagInputValue: '',
    isMyFlag: false,
    offsetTop: 0, // 外边框距离顶部
    touchItemInfo: {}
  },

  onLoad() {
    let that = this;
    this.showFlag();

    let query = wx.createSelectorQuery();
    query.select('.myFlagList').boundingClientRect(rect=>{
      that.setData({
        offsetTop: rect.top
      })
    }).exec();

  },

  // 展示随机flag
  showFlag() {
    let showFlagArr = [];
    let showFlagIdArr = [];
    for(var i=0; i<6; i++) {
      let randomNum = parseInt(Math.random()*this.data.flagArr.length);
      if(showFlagIdArr.indexOf(this.data.flagArr[randomNum].id) == -1) {
        showFlagArr.push(this.data.flagArr[randomNum])
        showFlagIdArr.push(this.data.flagArr[randomNum].id)
      }else {
        i--;
      }
    }
    this.setData({
      showFlagArr: showFlagArr
    })
  },

  // 选择flag
  selectFlag(e) {
    if(this.data.myFlagArr.length < 9) {
      if(!e.currentTarget.dataset.checked) {
        let flagIndex = '';
        let myFlagArr = this.data.myFlagArr;
        this.data.flagArr.forEach((item, index) => {
          if(item.id == e.currentTarget.dataset.id) {
            flagIndex = index
          }
        });
        myFlagArr.push(this.data.flagArr[flagIndex].name);
        this.setData({
          myFlagArr: myFlagArr,
          ['flagArr['+flagIndex+'].checked']: true,
          ['showFlagArr['+e.currentTarget.dataset.index+'].checked']: true,
        })
      }else {
        wx.showToast({
          title: '不能重复',
          icon: 'none'
        })
      }
    }else {
      wx.showToast({
        title: '最多9个flag',
        icon: 'none'
      })
    }
  },

  // 输入flag
  flagInput(e) {
    this.setData({
      flagInputValue: e.detail.value
    })
  },

  // 添加flag
  addFlag() {
    if(this.data.myFlagArr.length < 9) {
      let myFlagArr = this.data.myFlagArr;
      myFlagArr.push(this.data.flagInputValue)
      this.setData({
        myFlagArr: myFlagArr,
        flagInputValue: ''
      })
    }else {
      wx.showToast({
        title: '最多9个flag',
        icon: 'none'
      })
    }
  },

  // 下一步
  nextStep() {
    if(this.data.myFlagArr.length > 0) {
      app.globalData.myFlagArr = this.data.myFlagArr;
      console.log(this.data.myFlagArr)
      wx.navigateTo({
        url: '/pages/canvas/canvas'
      })
    }else {
      wx.showToast({
        title: '至少1个flag',
        icon: 'none'
      })
    }
  },

  // 打开/关闭 我的flag
  switchMyFlag() {
    this.setData({
      isMyFlag: !this.data.isMyFlag
    })
  },

  draggleTouch(e) {
    var touchType = e.type;
    switch(touchType){
      case "touchstart":
        this.touchStart(e);
        break;
      case "touchmove":
        this.touchMove(e);
        break;
      case "touchend":
        this.touchEnd(e);
        break;
    }
  },

  touchStart(e) {
    console.log(e)
    let touchItemInfo = {
      index: e.currentTarget.dataset.index,
      y: e.changedTouches[0].pageY,
    }
    this.setData({
      touchItemInfo: touchItemInfo
    })
  },

  touchMove(e) {
    let myFlagArr = this.data.myFlagArr;
    if(e.changedTouches[0].pageY>200) {
      console.log(this.data.touchItemInfo.index)
      console.log(this.data.myFlagArr[this.data.touchItemInfo.index])
      myFlagArr.splice(this.data.touchItemInfo.index, 1)
      myFlagArr.splice(this.data.myFlagArr.length-1, 0, this.data.myFlagArr[this.data.touchItemInfo.index])
      this.setData({
        myFlagArr: myFlagArr
      })
    }
    
  },

  touchEnd(e) {
    
  },

  // 分享
	onShareAppMessage(res) {
    return {
      title: '我在这里立了个flag，你也快来吧',
			path: '/pages/index/index',
			imageUrl: '/images/img1.jpg',
			success: res=> {
        wx.showToast({
					title: '转发成功'
				})
      },
      fail: res=> {
        wx.showToast({
					title: '转发失败',
					icon: 'none'
				})
      }
    }
	}

})
