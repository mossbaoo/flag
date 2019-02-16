
const app = getApp();
const util = require('../../utils/util.js')

Page({
  data: {
    barTitle: '许愿中',
    myWishArr: [
      {focus: false, value: ''},
      {focus: false, value: ''},
      {focus: false, value: ''},
    ],
  },

  onLoad() {
    let that = this;
    
  },

  bindfocus(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      ['myWishArr['+index+'].focus']: true
    })
  },

  bindblur(e) {
    let index = e.currentTarget.dataset.index;
    if(this.data.myWishArr[index].value == ''){
      this.setData({
        ['myWishArr['+index+'].focus']: false
      })
    }
  },

  bindinput(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      ['myWishArr['+index+'].value']: e.detail.value
    })
  },

  nextStep() {
    let myWishArr = [];
    if(!this.data.myWishArr[0].value || !this.data.myWishArr[1].value || !this.data.myWishArr[2].value) {
      wx.showToast({
        title: '请填写三个愿望',
        icon: 'none',
      })
    }else {
      this.data.myWishArr.forEach((item, index) => {
        myWishArr.push(item.value);
      });
      app.globalData.myWishArr = myWishArr;
      wx.navigateTo({
        url: '/pages/wish/canvas'
      })
    }
  },


  // 分享
	onShareAppMessage(res) {
    return {
      title: '我在这里许了新年愿望，你也快来吧',
			path: '/pages/index/index',
			imageUrl: '/images/share_img3.png',
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
