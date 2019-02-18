/**
 * Page: 情侣专区
 * Author: Moss
 */

const app = getApp()

Page({
  data: {
    barData: {
      title: '情侣专区',
      isShowBack: true,
      isHome: false,
    },
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

  // 分享
	onShareAppMessage(res) {
    return {
      title: '晒对象，晒爱豆',
			path: '/pages/index/index',
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
