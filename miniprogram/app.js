// app.js
App({
  // 全局数据存储
  globalData: {
      appointment: null // 初始为空，存储格式：{name, avatar, time}
  },

  onLaunch() {
      // 云开发初始化
      wx.cloud.init({
          env: 'cloud-littlename-5f59ieubb03a1e3',
      })
  }
})