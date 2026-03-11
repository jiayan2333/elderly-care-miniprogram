
Page({
  data: {
    bannerList: [
      'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/每日学习/每日学习1.jpg',
      'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/每日学习/每日学习2.jpg',
      'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/每日学习/每日学习3.jpg',
      'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/每日学习/每日学习4.jpg',
      'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/每日学习/每日学习5.jpg',
      'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/每日学习/每日学习6.jpg'
    ],
    videoList: [
      {
        title: '如何织出彩色竖条纹花样',
        url: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/video/daily/如何织出彩色竖条纹花样.mp4',
        poster: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/每日学习/针织小课堂.jpg'
      },
      {
        title: '如何能够织正针时，片织不翻面',
        url: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/video/daily/如何能够织正针时，片织不翻面！.mp4',
        poster: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/每日学习/针织小课堂.jpg'
      },
      {
        title: '横开纽洞教程',
        url: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/video/daily/横开纽洞教程.mp4',
        poster: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/每日学习/针织小课堂.jpg'
      },
      {
        title: '短针无痕减针的方法',
        url: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/video/daily/短针无痕减针的方法.mp4',
        poster: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/每日学习/针织小课堂.jpg'
      },
      {
        title: '防卷边辫子边教程',
        url: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/video/daily/防卷边辫子边教程.mp4',
        poster: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/每日学习/针织小课堂.jpg'
      },
      {
        title: '钩针织片无痕拼接',
        url: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/video/daily/钩针织片无痕拼接.mp4',
        poster: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/每日学习/针织小课堂.jpg'
      }
    ]
  },

  onLoad() {
  },

  // 预览图片
  previewImage(e) {
    const { url, urls } = e.currentTarget.dataset;
    wx.previewImage({
      current: url,
      urls: urls
    });
  }
})
