/**
 * Page: canvas
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
			level2: ['#111', '#333', '#666', '#999']
		},{
			level1: '#000066',
			level2: ['#000099', '#0000CC', '#0000FF', '#0066FF', '#0099FF', '#00CCFF', '#00FFFF']
		},{
			level1: '#006600',
			level2: ['#006633', '#009900', '#009933', '#00CC00', '#00CC33', '#00FF33', '#00FF66']
		},{
			level1: '#990000',
			level2: ['#990033', '#990066', '#990099', '#9900CC', '#9900FF', '#9933FF']
		},{
			level1: '#CC0000',
			level2: ['#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC33FF']
		},{
			level1: '#FF0000',
			level2: ['#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF33FF']
		},{
			level1: '#FF6600',
			level2: ['#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33', '#FFCC33']
		}],
		colorLevel1Index: 0,
		colorValue: '#000',
		setType: 0,
		decorate: 1,
	},

	onLoad() {
		let that = this;
		this.setData({
			myFlagArr: app.globalData.myFlagArr,
			canvasHeight: app.globalData.myFlagArr.length*40+230+130
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
	},

	// 描绘画布
	drawCanvas(color=this.data.colorArr[0].level1, decorate=this.data.decorate) {
		var ctx = wx.createCanvasContext('canvas')
		// 设置背景
		ctx.setFillStyle(color)
		ctx.fillRect(0, 0, this.data.canvasWidth, this.data.canvasHeight)
		ctx.setFillStyle('#fff')
		ctx.fillRect(5, 5, this.data.canvasWidth-10, this.data.canvasHeight-10)
		// 年份
		ctx.setFontSize(30)
		ctx.setFillStyle("#333")
		ctx.fillText('· 2 0 1 9 ·', (this.data.canvasWidth - ctx.measureText('· 2 0 1 9 ·').width)/2, 55)
		// 头部标题
		ctx.setFontSize(20)
		ctx.setFillStyle("#333")
		ctx.fillText('我的FLAG清单', (this.data.canvasWidth - ctx.measureText('我的FLAG清单').width)/2, 85)
		// 装饰图
		ctx.drawImage('/images/decorate_img'+decorate+'.png', (this.data.canvasWidth-150)/2, 95, 150, 96)
		
		// 头部线条
		// ctx.setStrokeStyle("#000")
		// ctx.setLineWidth(0.3)
		// ctx.moveTo(20, 200)
		// ctx.lineTo(this.data.canvasWidth-20, 200)
		// ctx.stroke()
		ctx.drawImage('/images/line_top.png', 30, 200, this.data.canvasWidth-60, (this.data.canvasWidth-60)/500*10)

		// 底部线条
		// ctx.setStrokeStyle("#000")
		// ctx.setLineWidth(0.3)
		// ctx.moveTo(20, this.data.canvasHeight-120)
		// ctx.lineTo(this.data.canvasWidth-20, this.data.canvasHeight-120)
		// ctx.stroke()
		ctx.drawImage('/images/line_bottom.png', 30, this.data.canvasHeight-130, this.data.canvasWidth-60, (this.data.canvasWidth-60)/500*10)

		// 用户信息
		ctx.setFontSize(14)
		ctx.setFillStyle("#333")
		ctx.fillText('我是 '+app.globalData.userInfo.nickName, 35, this.data.canvasHeight-80);
		ctx.fillText('于 '+util.formatTime(new Date()), 35, this.data.canvasHeight-55);
		ctx.fillText('在此立了个flag', 35, this.data.canvasHeight-30);

		// 小程序码
		ctx.drawImage(this.data.code, this.data.canvasWidth-105, this.data.canvasHeight-112, 70, 70)

		// 小程序码文字
		ctx.setFontSize(12)
		ctx.setFillStyle("#333")
		ctx.fillText('扫码立个flag', this.data.canvasWidth-103, this.data.canvasHeight-25);

		// 列表
		ctx.setFontSize(16)
		ctx.setFillStyle("#333")
		for(var i=0; i<this.data.myFlagArr.length; i++) {
			ctx.fillText(i+1+'” '+this.data.myFlagArr[i], 35, 245+i*40);
		}

		// 完成
    ctx.draw()
	},

	// 切换设置类型
	switchSetType(e) {
		if(e.currentTarget.dataset.id != this.data.setType) {
			this.setData({
				setType: e.currentTarget.dataset.id
			})
		}
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

	// 选择装饰图
	decoratePicker(e) {
		if(e.currentTarget.dataset.id != this.data.decorate) {
			this.setData({
				decorate: e.currentTarget.dataset.id
			})
			this.drawCanvas(this.data.colorValue, e.currentTarget.dataset.id);
		}
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