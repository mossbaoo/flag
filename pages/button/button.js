/**
 * Page: 快戳我
 * Author: Moss
 */

const app = getApp()

Page({
  data: {
    barData: {
      title: '戳一戳',
      isShowBack: true,
      isHome: false,
    },
    statusBarHeight: app.globalData.statusBarHeight,
    titleBarHeight: app.globalData.titleBarHeight,
    time_s: '10',
    time_ms: '00',
    count: 0,
    isCome: true,
    isEnd: false,
  },

  onLoad() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    if(!prevPage) {
      this.setData({
        ['barData.isShowBack']: false
      })
    }
  },

  // 点击
  click() {
    this.setData({
      count: this.data.count+1
    })
  },

  // 退出
  exit() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if(prevPage) {
      wx.navigateBack({
        delta: 1
      })
    }else {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  },

  // 开始
  start() {
    this.setData({
      isCome: false,
      isEnd: false,
      time_s: '09',
      time_ms: '99',
      count: 0,
    })
    this.timeout();
  },

  // 倒计时
  timeout() {
    var time = setInterval(()=>{
      if(this.data.time_s > 0 || this.data.time_ms > 0) {
        if(this.data.time_ms > 0) {
          this.setData({
            time_ms: this.data.time_ms-1>10? this.data.time_ms-1:'0'+String(this.data.time_ms-1)
          })
        }else {
          this.setData({
            time_ms: '99',
            time_s: this.data.time_s-1>10? this.data.time_s-1:'0'+String(this.data.time_s-1)
          })
        }
      }else {
        this.setData({
          isEnd: true
        })
        clearInterval(time);
        return false;
      }
    }, 10)
  },


















  // 分享
	onShareAppMessage(res) {
    return {
      title: '我10秒钟能戳'+this.data.count+'次，快来挑战吧',
			path: '/pages/button/button',
			imageUrl: '/images/share_img1.jpg',
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
