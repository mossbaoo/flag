/**
 * Page: canvas
 * Author: Moss
 */

const app = getApp();
const util = require('../../../utils/util.js');

Page({
	data: {
		logo: '/images/logo2.png',
		code: '/images/code.jpg',
		myWishArr: [],
		setType: 0,
		decorate: 0,
	},

	onLoad() {
		let that = this;
		this.setData({
			myWishArr: app.globalData.myWishArr
		})

		this.drawCanvas();
		this.drawShareCanvas();
	},

	// 描绘画布
	drawCanvas() {
		console.log(111)
		var ctx = wx.createCanvasContext('canvas')
		// 背景图
		ctx.drawImage('/images/wish_bg.jpg', 0, 0, 300, 533)
		// 设置背景
		ctx.setFillStyle('rgba(255, 255, 255, .9)')
		ctx.fillRect(35, 108, 230, 273)
		// 年份
		ctx.setFontSize(30)
		ctx.setFillStyle("#333")
		ctx.fillText('· 2 0 1 9 ·', (300 - ctx.measureText('· 2 0 1 9 ·').width)/2, 160)
		// 头部标题
		ctx.setFontSize(20)
		ctx.setFillStyle("#333")
		ctx.fillText('我的新年愿望', (300 - ctx.measureText('我的新年愿望').width)/2, 190)
		// 列表
		ctx.setFontSize(15)
		ctx.setFillStyle("#333")
		for(var i=0; i<this.data.myWishArr.length; i++) {
			ctx.fillText(i+1+'” '+this.data.myWishArr[i], 50, 240+i*45);
		}
		
		// 小程序码位置的图片
		ctx.drawImage('/images/share_img3.png', 25, 418, 80, 63)

		// 祝福文字
		ctx.setFontSize(10)
		ctx.setFillStyle("#333")
		ctx.fillText('新年要来到，祝福声声来报道：', 110, 440)
		ctx.fillText('愿快乐常伴你左右，好运平安', 110, 455)
		ctx.fillText('在前后，幸福甜蜜绕心头。', 110, 470)
		
		// 底部文字
		ctx.setFontSize(12)
		ctx.setFillStyle("#fff")
		ctx.fillText('小程序：码了个宝', (300 - ctx.measureText('小程序：码了个宝').width)/2, 515)
		
		// 完成
    ctx.draw()
	},

	drawShareCanvas() {
		console.log(222)
		var ctx = wx.createCanvasContext('shareCanvas')
		// 背景图
		ctx.drawImage('/images/wish_bg.jpg', 0, 0, 300, 533)
		// 设置背景
		ctx.setFillStyle('rgba(255, 255, 255, .9)')
		ctx.fillRect(35, 108, 230, 273)
		// 年份
		ctx.setFontSize(30)
		ctx.setFillStyle("#333")
		ctx.fillText('· 2 0 1 9 ·', (300 - ctx.measureText('· 2 0 1 9 ·').width)/2, 160)
		// 头部标题
		ctx.setFontSize(20)
		ctx.setFillStyle("#333")
		ctx.fillText('我的新年愿望', (300 - ctx.measureText('我的新年愿望').width)/2, 190)
		// 列表
		ctx.setFontSize(15)
		ctx.setFillStyle("#333")
		for(var i=0; i<this.data.myWishArr.length; i++) {
			ctx.fillText(i+1+'” '+this.data.myWishArr[i], 50, 240+i*45);
		}

		// 小程序码
		ctx.drawImage(this.data.code, 40, 423, 53, 53)

		// 祝福文字
		ctx.setFontSize(10)
		ctx.setFillStyle("#333")
		ctx.fillText('新年要来到，祝福声声来报道：', 110, 440)
		ctx.fillText('愿快乐常伴你左右，好运平安', 110, 455)
		ctx.fillText('在前后，幸福甜蜜绕心头。', 110, 470)

		// 底部文字
		ctx.setFontSize(12)
		ctx.setFillStyle("#fff")
		ctx.fillText('小程序：码了个宝', (300 - ctx.measureText('小程序：码了个宝').width)/2, 515)
		
		// 完成
    ctx.draw()
	},

	// 生成图片并保存到本地
	saveImage() {
		wx.canvasToTempFilePath({
			canvasId: 'shareCanvas',
			success(res) {
				console.log(res)
				wx.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success(res) {
						wx.showToast({
							title: '保存成功',
							icon: 'success'
						})
					}
				})
			}
		})
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