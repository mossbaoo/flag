/**
 * Page: 首页
 * Author: Moss
 */

const app = getApp()

Page({
  data: {
    barData: {
      title: '码了个宝',
      isShowBack: true,
      isHome: true,
    },
    menuArr: [
      // {name: '新年愿望', path: '/pages/wish/setup', image: '/images/item_3.png'},
      {name: '立个flag', path: '/pages/flag/setup', image: '/images/item_1.png'},
      // {name: '情侣专区', path: '/pages/lovers/lovers', image: '/images/item_2.png'},
      {name: '个性签名', path: '/pages/signature/signature', image: '/images/item_5.png'},
      {name: '快戳我', path: '/pages/button/button', image: '/images/item_6.png'},
    ],
    userInfo: {},
    hasUserInfo: true,
    isCollect: false,
    timeName: '',
  },

  onShow() {
    this.getTimeName();
  },

  onLoad() {
    wx.showLoading({
      title: '加载中',
    })
    app.wxLogin().then(res=>{
      if(res == '未授权') {
        this.setData({
          hasUserInfo: false
        })
        wx.hideLoading()
      }else {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
        wx.hideLoading()
      }
    })

  },

  // 获取用户信息
  getUserInfo(e) {
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      console.log('拒绝')
    }
  },

  /**
   * 时间名称
   * @function getTimeName
   * @param {*} e 
   * 凌晨：00：00-04：59
   * 清晨：05：00-06：59
   * 早上：07：00-08：59
   * 上午：09：00-11：59
   * 中午：12：00-13：59
   * 下午：14：00-17：59
   * 傍晚：18：00-18：59
   * 晚上：19：00-23：59
   */
  getTimeName(e) {
    let time = new Date();
    let hour = time.getHours();
    let timeName = '';
    if(hour>=0 && hour<=4) {
      timeName = '凌晨';
    }else if(hour>=5 && hour<=6) {
      timeName = '清晨';
    }else if(hour>=7 && hour<=8) {
      timeName = '早上';
    }else if(hour>=9 && hour<=11) {
      timeName = '上午';
    }else if(hour>=12 && hour<=13) {
      timeName = '中午';
    }else if(hour>=14 && hour<=17) {
      timeName = '下午';
    }else if(hour==18) {
      timeName = '傍晚';
    }else if(hour>=19 && hour<=23) {
      timeName = '晚上';
    }
    this.setData({
      timeName: timeName
    })
  },

  // 去个人中心
  toPersonal() {
    wx.navigateTo({
      url: '/pages/personal/personal'
    })
  },

  collect() {
    this.setData({
      isCollect: !this.data.isCollect
    })
  },

  // 分享
	onShareAppMessage(res) {
    return {
      title: '这里有很多好玩的等着你',
			path: '/pages/index/index',
			imageUrl: '/images/share_img2.png',
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
