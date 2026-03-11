
Page({
  data: {

    myAppointment: null,

    // 志愿者列表数据
    volunteerList: [
      {
        id: 1,
        name: '王露',
        avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.a.png',
        introduction: '吉林大学本科生。具备红十字会救护员证书，性格温柔细致，善于倾听与共情，对待长辈真诚有礼。'
      },
      {
        id: 2,
        name: '王悦',
        avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.c.jpg',
        introduction: '吉林大学学生。性格文静内敛，擅长主持与羽毛球，具备优秀的表达能力，愿用温柔陪伴长辈。'
      },
      {
        id: 3,
        name: '王畅',
        avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.d.jpg',
        introduction: '长春理工大学学生。开朗热情，热爱体育锻炼，拥有健康的体魄，致力于为养老陪伴贡献青春力量。'
      },
      {
        id: 4,
        name: '伯广睿',
        avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.b.jpg',
        introduction: '吉林大学本科生。幽默风趣，擅长乐器演奏与球类运动，喜欢与长辈交流，让陪伴更有温度。'
      },
      {
        id: 5,
        name: '方雪',
        avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.e.jpg',
        introduction: '长春理工大学学生。温和友善，具备极强的服务意识，愿意耐心倾听长辈心声，提供贴心关怀。'
      },
      {
        id: 6,
        name: '董明宇',
        avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.f.jpg',
        introduction: '长春理工大学学生。阳光正直，擅长唱歌，希望用热情的歌声和真诚的服务为长辈带去快乐。'
      },
      {
        id: 7,
        name: '刘忠良',
        avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.g.jpg',
        introduction: '长春理工大学学生。活泼开朗，熟悉电子产品与竞技游戏，反应敏捷，能陪长辈聊天解闷。'
      },
      {
        id: 8,
        name: '季诗洋',
        avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.h.jpg',
        introduction: '公司员工志愿者。细致严谨，踏实肯干，拥有丰富的志愿经验，用真心守护每一位长辈。'
      },
      {
        id: 9,
        name: '钟欣阳',
        avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.i.jpg',
        introduction: '公司员工志愿者。风趣幽默，文史功底深厚，擅长文化交流，用真心传递温暖与力量。'
      }
    ]
  },

  // 每次回到页面时检查全局变量是否有新预约
  onShow() {
    const app = getApp();
    if (app.globalData && app.globalData.appointment) {
      this.setData({
        myAppointment: app.globalData.appointment
      });
    }
  },

  // 取消预约逻辑
  cancelOrder() {
    wx.showModal({
      title: '取消预约',
      content: '确定要取消本次陪伴预约吗？',
      confirmColor: '#D97706',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          app.globalData.appointment = null; // 清空全局变量
          this.setData({ myAppointment: null }); // 隐藏主页贴纸
          wx.showToast({ title: '已取消', icon: 'none' });
        }
      }
    });
  },

  // 核心跳转逻辑
  onVolunteerTap(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/volunteer_detail/volunteer_detail?id=${id}`,
      fail: function() {
        console.log("跳转失败，请确认是否创建了 volunteer_detail 页面");
      }
    });
  }
})