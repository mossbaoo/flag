/**
 * Page: 个性签名
 * Author: Moss
 */

const app = getApp()

Page({
  data: {
    dataArr: [
      '如果爱，请深爱；若不爱，请离开。',
      '请不要迷恋哥，哥只是一个传说。',
      '哥抽的不是烟，是寂寞。',
      ')：︶ㄣ___茈钕孓不再恋爱-╱请笏靠近。',
      '⊕┈有伱陪伴我不菰僤╲╳╱の如果要走.请伱记嘚⒌如果难过.请伱莣钌⒌',
      '蛾愿执迩之手、与迩白头偕老~~',
      '伱的记忆中、只能有莪，因为莪要伱用灵魂爱莪。',
      '莪們④糖，甜到忧伤……',
      '````~~緈諨. 繻偠こ个人來爭取 ----對你→藕永遠 8.放棄',
      'ヽ`"*`"天咴咴`丶|ˊ会吥会让我莣纪/..伱媞谁゛˙?',
      '◇◆、↖ 快 樂 、其 实 就 是 掩 飾 悲 傷 對 每 個 人 微 笑 ↗',
      '怼吥起 、 莪還湜暧伱',
      '〆、妳旳名字，莪旳心事。',
    ],
    isGuide: false
  },

  onLoad() {
    this.setData({
      isGuide: true
    })
  },

  onReady() {
    var count = 0;
    this.animation = wx.createAnimation({
      duration: 1000, // 动画持续时间，单位 ms
      timingFunction: 'linear', // 动画的效果
      delay: 100, // 动画延迟时间，单位 ms
      transformOrigin: '50% 50%' // 动画的中心点
    });
    
    setInterval(function() {
      if (count % 2 == 0) {
        this.animation.scale(1.3).step();
      } else {
        this.animation.scale(1.0).step();
      }
      
      this.setData({
        animation: this.animation.export()
      });
      
      count++;
      if (count == 1000) {
        count = 0;
      }
    }.bind(this), 1000);
  },  

  // 复制
  copy(e) {
    let that = this;
    wx.setClipboardData({
      data: this.data.dataArr[e.currentTarget.dataset.index],
      success(res) {
        that.setData({
          isGuide: false
        })
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
