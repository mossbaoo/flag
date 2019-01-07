/**
 * Page: 分享
 * Author: Moss
 */

const app = getApp();
const wxRequest = require("../../../utils/request.js");

Page({
	data: {
		host: app.globalData.host,
		id: null,
		detailData: {},
		shareType: 0,
		logo: '/images/logo.jpg',
		goodsImage: null,
		title: '',
		text: '',
		price: '',
		code: '/images/code.jpg'
	},

	onLoad(options) {
		this.setData({
			id: options.id
		})
		this.getData(options.id);
	},

	// 获取商品信息
	getData(id) {
		let that = this;
		wxRequest.post('/api/goods/goods/show', {
			id: id,
      access_token: app.globalData.access_token
		}, '加载中').then(res=>{
			if(res.code == 0){
				this.setData({
					detailData: res.data
				})
				wx.showLoading({
					title: '加载中',
				})
				wx.getImageInfo({
          src: this.data.host+res.data.image,
          success (res) {
            that.setData({
              goodsImage: res.path
            })
						that.getCanvas();
						wx.hideLoading()
          }
        })
			}
		})
	},

	// 切换类型
	switchType(e) {
		let type = e.currentTarget.dataset.type;
		if(type == this.data.shareType){
			return false;
		}else {
			this.setData({
				shareType: type
			})
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

	getCanvas() {
		var ctx = wx.createCanvasContext('canvas')
		// 设置背景
		ctx.setFillStyle('#ffffff')
		ctx.fillRect(0, 0, 300, 470)
		// logo
		ctx.drawImage(this.data.logo, 100, 9, 100, 33)
		// logo下线条
		ctx.setStrokeStyle("rgba(0,0,0,.1)")
		ctx.setLineWidth(0.3)
		ctx.moveTo(0, 49)
		ctx.lineTo(300, 49)
		ctx.stroke()
		// 商品图片
		// ctx.drawImage(this.data.goodsImage, 0, 180, 750, 500, 10, 58, 280, 165)
		ctx.drawImage(this.data.goodsImage, 10, 58, 280, 280)
		// 商品名称
		ctx.setFontSize(15)
		ctx.setFillStyle("#333333")
		textHandle(this.data.detailData.title, 10, 363, 170, 18);
		// 商品介绍
		ctx.setFontSize(12)
		ctx.setFillStyle("#666666")
		textHandle(this.data.detailData.introduction, 10, 405, 170, 15);
		// 商品价格
		ctx.setFontSize(18)
		ctx.setFillStyle("#F62B19")
		ctx.fillText('¥'+this.data.detailData.price, 12, 450);
		// 二维码文字
		ctx.setFontSize(10)
		ctx.setFillStyle("#666666")
		ctx.fillText('扫描或长按二维码', 210, 361);
		// 二维码图片
		ctx.drawImage(this.data.code, 210, 373, 80, 80);

		/**
		 * @function textHandle 绘制文本的换行处理
		 * @param {String} text 在画布上输出的文本
		 * @param {Number} numX 绘制文本的左上角x坐标位置
		 * @param {Number} numY 绘制文本的左上角y坐标位置
		 * @param {Number} textWidth 文本宽度
		 * @param {Number} lineHeight 文本的行高
		 * @author Moss(827291427@qq.com)
		 */
		function textHandle(text, numX, numY, textWidth, lineHeight) {
			var chr = text.split(""); // 将一个字符串分割成字符串数组
			var temp = "";
			var row = [];
			for (var a = 0; a < chr.length; a++) {
				if (ctx.measureText(temp).width < textWidth) {
					temp += chr[a];
				}else {
					a--; // 添加a--，防止字符丢失
					row.push(temp);
					temp = "";
				}
			}
			row.push(temp);

			// 如果数组长度大于2 则截取前两个
			if (row.length > 2) {
				var rowCut = row.slice(0, 2);
				var rowPart = rowCut[1];
				var test = "";
				var empty = [];
				for (var a = 0; a < rowPart.length; a++) {
					if (ctx.measureText(test).width < textWidth-10) {
						test += rowPart[a];
					}else {
						break;
					}
				}
				empty.push(test);
				var group = empty[0] + "..."; // 这里只显示两行，超出的用...展示
				rowCut.splice(1, 1, group);
				row = rowCut;
			}
			for (var b = 0; b < row.length; b++) {
				ctx.fillText(row[b], numX, numY + b * lineHeight);
			}
		}

		// 完成
    ctx.draw()
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