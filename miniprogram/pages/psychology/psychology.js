
Page({
  data: {
    bannerList: [
      'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理关怀1.jpg',
      'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理关怀2.jpg',
      'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理关怀3.jpg',
      'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理关怀4.jpg',
      'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/心理关怀/心理关怀5.jpg'
    ],

    // 视频列表
    videoList: [
      {
        title: '老年心理健康',
        url: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/video/psychology/1老年心理健康.mp4'
      },
      {
        title: '情绪对身心的影响',
        url: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/video/psychology/2情绪对身心的影响.mp4'
      },
      {
        title: '心理调节',
        url: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/video/psychology/4心理模型.mp4'
      },
      {
        title: '老年人如何获得快乐',
        url: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/video/psychology/9老年人如何获得快乐.mp4'
      },
      {
        title: '长寿有道',
        url: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/video/psychology/10长寿有道.mp4'
      },
      {
        title: '长寿有道（二）',
        url: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/video/psychology/11长寿的客观条件.mp4'
      }
    ]
  },

  // 跳转心理咨询师页面
  navigateToMiniProgram() {
    wx.navigateTo({
      url: '/pages/psychology_counseling/psychology_counseling'
    })
  },

  onLoad() {
    // 页面加载
  }
})
