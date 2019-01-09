/**
 * Page: 分享
 * Author: Moss
 */

const app = getApp();

Page({
	data: {
		logo: '/images/logo2.png',
		goodsImage: null,
		code: '/images/code.jpg',
		myFlagArr: [],
		canvasWidth: 0,
		canvasHeight: 500
	},

	onLoad() {
		let that = this;
		this.setData({
			myFlagArr: app.globalData.myFlagArr
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
	drawCanvas() {
		var ctx = wx.createCanvasContext('canvas')
		// 设置背景
		ctx.setFillStyle('#333')
		ctx.fillRect(0, 0, this.data.canvasWidth, 500)
		ctx.setFillStyle('#fff')
		ctx.fillRect(5, 5, this.data.canvasWidth-10, 500-10)
		// logo
		ctx.drawImage(this.data.logo, (this.data.canvasWidth-100)/2, 20, 100, 37)
		// logo下线条
		ctx.setStrokeStyle("#000")
		ctx.setLineWidth(0.3)
		ctx.moveTo(20, 77)
		ctx.lineTo(this.data.canvasWidth-20, 77)
		ctx.stroke()
		// // 二维码文字
		// ctx.setFontSize(10)
		// ctx.setFillStyle("#666666")
		// ctx.fillText('扫描或长按二维码', 210, 361);

		ctx.setFontSize(16)
		ctx.setFillStyle("#333")
		for(var i=0; i<this.data.myFlagArr.length; i++) {
			ctx.fillText(i+1+'” '+this.data.myFlagArr[i], 20, 110+i*40);
		}

		// 完成
    ctx.draw()
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