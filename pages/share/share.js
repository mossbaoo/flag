/**
 * Page: 分享
 * Author: Moss
 */

const app = getApp();
const util = require('../../utils/util.js');

Page({
	data: {
		logo: '/images/logo2.png',
		goodsImage: null,
		code: '/images/code.jpg',
		myFlagArr: [],
		canvasWidth: 0,
		canvasHeight: 500,
		colorArr: [{
			level1: '#000',
			level2: ['#000', '#333', '#666', '#999']
		},{
			level1: '#ff0000',
			level2: ['#ff1100', '#ff2200', '#ff3300', '#ff4400']
		},{
			level1: '#ee0000',
			level2: ['#ee1100', '#ee2200', '#ee3300', '#ee4400']
		},{
			level1: '#dd0000',
			level2: ['#dd1100', '#dd2200', '#dd3300', '#dd4400']
		},{
			level1: '#cc0000',
			level2: ['#cc1100', '#cc2200', '#cc3300', '#cc4400']
		},{
			level1: '#bb0000',
			level2: ['#bb1100', '#bb2200', '#bb3300', '#bb4400']
		},{
			level1: '#aa0000',
			level2: ['#aa1100', '#aa2200', '#aa3300', '#aa4400']
		}],
		colorLevel1Index: 0,
		colorValue: '#000',
	},

	onLoad() {
		let that = this;
		this.setData({
			myFlagArr: app.globalData.myFlagArr,
			canvasHeight: app.globalData.myFlagArr.length*40+110+120
		})

		// 获取系统信息
		wx.getSystemInfo({
			success(res) {
				that.setData({
					canvasWidth: res.windowWidth-50
				})
			}
		})

		this.drawCanvas();

		console.log(app.globalData.userInfo)
	},

	// 描绘画布
	drawCanvas(color = this.data.colorArr[0].level1) {
		var ctx = wx.createCanvasContext('canvas')
		// 设置背景
		ctx.setFillStyle(color)
		ctx.fillRect(0, 0, this.data.canvasWidth, this.data.canvasHeight)
		ctx.setFillStyle('#fff')
		ctx.fillRect(5, 5, this.data.canvasWidth-10, this.data.canvasHeight-10)
		// logo
		// ctx.drawImage(this.data.logo, (this.data.canvasWidth-100)/2, 20, 100, 37)
		// 年份
		ctx.setFontSize(20)
		ctx.setFillStyle("#333")
		ctx.fillText('- 2 0 1 9 -', (this.data.canvasWidth - ctx.measureText('- 2 0 1 9 -').width)/2, 55)
		// 头部标题
		ctx.setFontSize(14)
		ctx.setFillStyle("#333")
		ctx.fillText('我的FLAG清单', (this.data.canvasWidth - ctx.measureText('我的FLAG清单').width)/2, 75)
		
		// 头部线条
		ctx.setStrokeStyle("#000")
		ctx.setLineWidth(0.3)
		ctx.moveTo(20, 100)
		ctx.lineTo(this.data.canvasWidth-20, 100)
		ctx.stroke()

		// 底部线条
		ctx.setStrokeStyle("#000")
		ctx.setLineWidth(0.3)
		ctx.moveTo(20, this.data.canvasHeight-120)
		ctx.lineTo(this.data.canvasWidth-20, this.data.canvasHeight-120)
		ctx.stroke()

		// 用户信息
		ctx.setFontSize(12)
		ctx.setFillStyle("#333")
		ctx.fillText('立FLAG人：'+app.globalData.userInfo.nickName, 20, this.data.canvasHeight-80);

		// 时间
		let date = util.formatTime(new Date());
		console.log(date)
		ctx.setFontSize(12)
		ctx.setFillStyle("#333")
		ctx.fillText('立于 '+date, 20, this.data.canvasHeight-60);

		// 小程序码
		ctx.drawImage(this.data.code, this.data.canvasWidth-95, this.data.canvasHeight-112, 70, 70)

		// 小程序码文字
		ctx.setFontSize(10)
		ctx.setFillStyle("#333")
		ctx.fillText('扫描或长按二维码', this.data.canvasWidth-100, this.data.canvasHeight-28);
		ctx.fillText('来一起立个flag吧', this.data.canvasWidth-98, this.data.canvasHeight-15);

		// 列表
		ctx.setFontSize(16)
		ctx.setFillStyle("#333")
		for(var i=0; i<this.data.myFlagArr.length; i++) {
			ctx.fillText(i+1+'” '+this.data.myFlagArr[i], 20, 132+i*40);
		}

		// 完成
    ctx.draw()
	},

	// 选择颜色
	colorPicker(e) {
		if(e.currentTarget.dataset.level == 1) {
			this.setData({
				colorLevel1Index: e.currentTarget.dataset.index
			})
		}
		this.setData({
			colorValue: e.currentTarget.dataset.color
		})
		this.drawCanvas(e.currentTarget.dataset.color);
	},

	// 生成图片并保存到本地
	saveImage() {
		wx.canvasToTempFilePath({
			canvasId: 'canvas',
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
      title: this.data.detailData.title,
			path: '/pages/store/store?goodsid='+this.data.id+'&uid='+app.globalData.userId,
			imageUrl: this.data.host+this.data.detailData.image,
			success: (res) => {
        wx.showToast({
					title: '转发成功'
				})
      },
      fail: (res) => {
        wx.showToast({
					title: '转发失败',
					icon: 'none'
				})
      }
    }
	}
})