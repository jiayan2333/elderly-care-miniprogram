
const { activities } = require('../firstactivity/activities.js')

Page({
  data: {
    // 顶部基础数据 
    topBanner: "cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/养老.png",
    userName: '早安，您好',

    //  健康管理 (吃药提醒相关) 
    nextReminderTime: '',
    nextTimestamp: 0,
    remainingCount: 0,
    needRemind: false,
    remindedOnce: false,
    checkTimer: null,

    //  志愿者数据 
    volunteers: [
      { name: '张志愿', desc: '陪伴聊天 · 日常照料' },
      { name: '李志愿', desc: '代办事务 · 上门协助' }
    ],

    //  心理关怀与健康饮食 
    psychologyBanner: "cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/1.jpg",
    dietRecommend: {
      title: '健康饮食推荐-每日养生',
      videoUrl: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/video/first/2.mp4',
      videoConfig: {
        autoplay: false,
        controls: true,
        loop: false,
        muted: false,
        showCenterPlayBtn: true,
        objectFit: 'cover'
      }
    },

    //  每日推荐 (视频) 
    recommend: {
      title: '今日养生-苦瓜能不能降血糖',
      videoUrl: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/video/first/1.mp4',
      poster: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/养生小妙招.jpg', 
      videoConfig: {
        autoplay: false,
        controls: true,
        loop: false,
        muted: false,
        showCenterPlayBtn: true,
        objectFit: 'cover'
      }
    },

    //  生活与学习
    entertainmentImg: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/休闲娱乐.jpg',
    foodImg: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/健康饮食.jpg',
    studyImg: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/每日学习.jpg',
    vipImg: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/会员专享.jpg',

    //  社区活动数据 
    activities: [],
    activityLoading: true
  },

  /* 生命周期与初始化 */
  onLoad() {
    this.loadActivities()
  },

  onShow() {
    this.loadMedicineStatus()
    this.startMedicineTimer()
  },

  onHide() {
    this.stopMedicineTimer()
  },

  onUnload() {
    this.stopMedicineTimer()
  },

  /* 吃药提醒逻辑 */
  loadMedicineStatus() {
    const status = wx.getStorageSync('medicineStatus')
    if (!status || !status.nextTimestamp) {
      this.setData({ needRemind: false })
      return
    }

    this.setData({
      nextReminderTime: status.nextReminderTime,
      nextTimestamp: status.nextTimestamp,
      remainingCount: status.remainingCount
    })

    this.checkMedicineTime()
  },

  checkMedicineTime() {
    const { nextTimestamp, remainingCount, remindedOnce } = this.data
    if (!nextTimestamp || remainingCount <= 0) return

    const now = Date.now()

    if (now >= nextTimestamp) {
      this.setData({ needRemind: true })

      if (!remindedOnce) {
        this.setData({ remindedOnce: true })
        wx.vibrateShort()
      }
    } else {
      this.setData({
        needRemind: false,
        remindedOnce: false
      })
    }
  },

  startMedicineTimer() {
    if (this.data.checkTimer) return

    const timer = setInterval(() => {
      this.checkMedicineTime()
    }, 30 * 1000)

    this.setData({ checkTimer: timer })
  },

  stopMedicineTimer() {
    if (this.data.checkTimer) {
      clearInterval(this.data.checkTimer)
      this.setData({ checkTimer: null })
    }
  },

  takeMedicine() {
    this.setData({ needRemind: false })
    wx.navigateTo({ url: '/pages/firstClock/firstClock' })
  },

  closeMedicineCard() {
    this.setData({ needRemind: false })
  },

  /* 社区活动逻辑 */
  loadActivities() {
    const displayList = activities.slice(0, 5).map(item => ({
      _id: item._id,
      title: item.title,
      isOfficial: item.isOfficial,
      joinCount: item.joinCount,
      maxPeople: item.maxPeople,
      cover: item.cover
    }))

    this.setData({
      activities: displayList,
      activityLoading: false
    })
  },

  /* 页面跳转 */

  goHealth() {
    wx.navigateTo({ url: '/pages/health/health' })
  },

  goFirstClock() {
    wx.navigateTo({ url: '/pages/firstTxtpro/firstTxtpro' })
  },

  goFirstTxtpro() {
    wx.navigateTo({ url: '/pages/firstClock/firstClock' })
  },


  goVolunteer() {
    wx.navigateTo({ url: '/pages/volunteer/volunteer' })
  },

  goPsychology() {
    wx.navigateTo({ url: '/pages/psychology/psychology' })
  },


  goHomeService() {
    wx.navigateToMiniProgram({
      appId: 'wxc4fc148a8d5c4c4b',
      path: '/pages/index/index?page_id=125687',
      success(res) {
        console.log('跳转成功', res);
      },
      fail(err) {
        console.error('跳转失败', err);
        wx.showToast({
          title: '跳转失败',
          icon: 'none'
        });
      }
    });
  },

  goEntertainment() {
    wx.navigateTo({ url: '/pages/entertainment/entertainment' })
  },

  goFood()  {
    wx.navigateTo({ url: '/pages/firstfood/firstfood' })
  },

  goStudy() {
    wx.navigateTo({ url: '/pages/daily/daily' })
  },

  goVip() {
    wx.navigateToMiniProgram({
      appId: 'wxc4fc148a8d5c4c4b',
      path: '/pages/goods/list?cat_id=431133'
    })
  },

  goActivityList() {
    wx.navigateTo({
      url: '/pages/firstactivity/firstactivity'
    })
  },

  goActivityDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/firstactivity/firstactivity?id=${id}`
    })
  }
})