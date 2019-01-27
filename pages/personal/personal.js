/**
 * Page: 首页
 * Author: Moss
 */

const app = getApp()

Page({
  data: {
    userInfo: {},
    winHeight: 0,
    scrollTop: 0,
  },

  onLoad() {
    let that = this;
    this.setData({
      userInfo: app.globalData.userInfo
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        })
      }
    })
  },

  onPageScroll(e){
    this.setData({
      scrollTop: e.scrollTop
    })
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
