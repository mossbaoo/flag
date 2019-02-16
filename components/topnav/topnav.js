/**
 * Component: 顶部菜单栏
 * Author: Moss
 */

const app = getApp()

Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerTitle: {
      type: String,
      value: '头部标题'
    },
    isShowBack: {
      type: String,
      value: true
    }
  },
  data: {
    // 这里是一些组件内部数据
    statusBarHeight: app.globalData.statusBarHeight,
    titleBarHeight: app.globalData.titleBarHeight
  },
  methods: {
    goback() {
      wx.navigateBack({
        delta: 1,
      })
    },
    gohome() {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  }
})