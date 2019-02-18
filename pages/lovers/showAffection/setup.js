/**
 * Page: 秀恩爱
 * Author: Moss
 */

const app = getApp()

Page({
  data: {
    barData: {
      title: '秀恩爱',
      isShowBack: true,
      isHome: false,
    },
    image_a: '',
    image_b: '',
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

  chooseImage(e) {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        if(e.currentTarget.dataset.type == 0) {
          that.setData({
            image_a: res.tempFilePaths[0]
          })
        }else {
          that.setData({
            image_b: res.tempFilePaths[0]
          })
        }
      }
    })
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
