
const { activities } = require('./activities.js')

Page({
  data: {
    activities: [],
    loading: true
  },

  /*  生命周期函数 */

  onLoad() {
    this.loadActivities()
  },



  loadActivities() {
    // 模拟接口加载体验
    this.setData({ loading: true })

// 读取本地“已报名活动”
const joinedMap = wx.getStorageSync('joinedActivities') || {}



setTimeout(() => {
  const activeActivities = activities
    .filter(item => item.status === 'active')
    .map(item => ({
      ...item,
      isJoined: !!joinedMap[item._id]
    }))


      this.setData({
        activities: activeActivities,
        loading: false
      })
    }, 300)
  },

  /* ================= 交互 ================= */

  // 点击“申请参加”
  onApply(e) {
    const id = e.currentTarget.dataset.id
    const list = this.data.activities
  
    const index = list.findIndex(item => item._id === id)
    if (index === -1) return
  
    const activity = list[index]
  
    // 已报名拦截
    if (activity.isJoined) {
      wx.showToast({
        title: '您已报名该活动',
        icon: 'none'
      })
      return
    }
  
    // 名额已满
    if (activity.joinCount >= activity.maxPeople) {
      wx.showToast({
        title: '名额已满',
        icon: 'none'
      })
      return
    }
  
    //更新页面状态
    list[index].isJoined = true
    list[index].joinCount += 1
  
    //记录我报过这个活动
    const joinedMap = wx.getStorageSync('joinedActivities') || {}
    joinedMap[id] = true
    wx.setStorageSync('joinedActivities', joinedMap)
  
    this.setData({
      activities: list
    })
  
    wx.showToast({
      title: '报名成功',
      icon: 'success'
    })
  },
  

  // 返回上一页
  goBack() {
    wx.navigateBack()
  }
})
