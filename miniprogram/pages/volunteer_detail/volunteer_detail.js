
Page({
  data: {
    volunteer: null,
    loading: true,
    isBooked: false,
    showPicker: false, 
    dateList: [],      
    selectedDateIdx: -1, 
    selectedTimeIdx: -1, 
    timeSlots: [
      { range: '09:00-11:00' },
      { range: '13:00-15:00' },
      { range: '15:00-17:00' }
    ],
    // --- 新增表单数据 ---
    userName: '',
    userPhone: '',
    address: '',
    remark: ''
  },

  onLoad(options) {
    const { id } = options;
    this.loadVolunteerDetail(id);
  },

  loadVolunteerDetail(id) {
    const volunteerData = {
      "1": { id: 1, name: '王露', school: '吉林大学 / 数量经济专业', avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.a.png', availableDays: ['周二', '周四'], serviceTime: '120小时', education: '吉林大学本科在读', tags: ['温柔细致', '应急救护', '善于共情'], introduction: '大家好，我叫王露，是吉林大学商学与管理学院2024级数量经济专业的本科生。我性格温柔细致、沉稳耐心，善于倾听与共情，对待长辈真诚有礼，愿意用耐心陪伴、贴心服务为老年人带去温暖。', specialties: ['应急救护', '耐心陪伴', '用心倾听'] },
      "2": { id: 2, name: '王悦', school: '吉林大学', avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.c.jpg', availableDays: ['周六', '周日'], serviceTime: '85小时', education: '吉林大学本科在读', tags: ['温柔亲切', '文静内敛', '擅长主持'], introduction: '大家好，我叫王悦，是吉林大学的一名学生。我性格温柔亲切、待人真诚有礼，做事细心踏实。我热爱羽毛球运动，同时擅长主持，具备较好的语言表达能力和亲和力，希望用我的温柔与细心，为长辈们带来温暖与安心。', specialties: ['散步陪伴', '语言交流', '活动互动'] },
      "3": { id: 3, name: '王畅', school: '长春理工大学', avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.d.jpg', availableDays: ['周三', '周五'], serviceTime: '150小时', education: '长春理工大学本科', tags: ['开朗热情', '精力充沛', '爱心陪伴'], introduction: '大家好，我叫王畅，是长春理工大学的一名学生。我性格开朗热情、待人真诚友善，平时做事认真负责。我热爱羽毛球运动，拥有健康的体魄和积极向上的精神面貌，希望用我的真诚与热情，为长辈们带来轻松与快乐。', specialties: ['健康管理', '运动陪同', '热情陪聊'] },
      "4": { id: 4, name: '伯广睿', school: '吉林大学 / 商管学院', avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.b.jpg', availableDays: ['周一', '周三'], serviceTime: '92小时', education: '吉林大学本科', tags: ['幽默风趣', '乐器演奏', '阳光开朗'], introduction: '我是伯广睿。我性格温和耐心、幽默风趣，喜欢和长辈交流。平时热爱乐器演奏与各类球类运动，能以积极乐观的状态陪伴老人。希望用真诚和细心让陪伴更有温度、让关爱更有力量。', specialties: ['乐器表演', '趣味谈心', '上门协助'] },
      "5": { id: 5, name: '方雪', school: '长春理工大学', avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.e.jpg', availableDays: ['周二', '周五'], serviceTime: '115小时', education: '长春理工大学本科', tags: ['温和友善', '耐心细致', '善于沟通'], introduction: '大家好，我叫方雪。我性格温和友善，待人耐心细致，具备较强的服务意识。我热爱羽毛球，拥有积极向上的精神面貌，能够以饱满的热情投入到服务中。', specialties: ['细心倾听', '日常代办', '散心解闷'] },
      "6": { id: 6, name: '董明宇', school: '长春理工大学', avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.f.jpg', availableDays: ['周二', '周三'], serviceTime: '132小时', education: '长春理工大学本科', tags: ['阳光正直', '擅长唱歌', '乐于奉献'], introduction: '大家好，我叫董明宇。我性格阳光正直，待人真诚。我特别喜欢唱歌，能用歌声为长辈们带来欢乐。', specialties: ['文艺表演', '棋牌娱乐', '活力互动'] },
      "7": { id: 7, name: '刘忠良', school: '长春理工大学', avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.g.jpg', availableDays: ['周一', '周四'], serviceTime: '108小时', education: '长春理工大学本科', tags: ['活泼开朗', '电子竞技', '思维敏捷'], introduction: '大家好，我叫刘忠良。我性格活泼开朗，对待长辈耐心有礼。思维灵活，愿意用积极温暖的态度陪伴长辈。', specialties: ['电子产品教学', '趣味陪聊', '日常照料'] },
      "8": { id: 8, name: '季诗洋', school: '长春荧欢科技有限公司', avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.h.jpg', availableDays: ['周六', '周日'], serviceTime: '210小时', education: '企业员工志愿者', tags: ['认真负责', '温柔善良', '细致严谨'], introduction: '大家好，我是季诗洋。在工作中我严谨负责，在生活中我温柔耐心。我非常喜欢和长辈相处，懂得倾听。', specialties: ['就医陪同', '生活协助', '细心陪护'] },
      "9": { id: 9, name: '钟欣阳', school: '长春荧欢科技有限公司', avatar: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/志愿者/志愿者.i.jpg', availableDays: ['周六', '周日'], serviceTime: '195小时', education: '企业员工志愿者', tags: ['博通文史', '热情风趣', '知识广博'], introduction: '大家好，我是钟欣阳。我性格开朗活泼，热情风趣。我文史功底深厚，擅长交流互动，能很好地陪伴长辈分享故事。', specialties: ['故事分享', '文化交流', '保健养生'] }
    };
    const volunteer = volunteerData[String(id)];
    if (volunteer) {
      this.setData({ volunteer, loading: false });
      this.initDatePicker(); 
    } else {
      wx.showToast({ title: '资料不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
    }
  },

  initDatePicker() {
    const weekMap = { '周日': 0, '周一': 1, '周二': 2, '周三': 3, '周四': 4, '周五': 5, '周六': 6 };
    const availableWeeks = this.data.volunteer.availableDays.map(d => weekMap[d]);
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    let list = [];
    for (let i = 1; i <= 15; i++) {
      let d = new Date();
      d.setDate(d.getDate() + i);
      const weekNum = d.getDay();
      list.push({
        day: days[weekNum],
        dateText: `${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`,
        fullDate: `${d.getMonth() + 1}月${d.getDate()}日`,
        weekdayStr: `周${days[weekNum]}`,
        isAvailable: availableWeeks.includes(weekNum)
      });
    }
    this.setData({ dateList: list });
  },

  // --- 地图定位功能 ---
  chooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({ address: res.name || res.address });
      },
      fail: (err) => {
        if (err.errMsg.indexOf('auth deny') !== -1) {
          wx.showModal({
            title: '授权提示',
            content: '需要地址权限才能自动填写服务地点',
            success: (res) => { if (res.confirm) wx.openSetting(); }
          });
        }
      }
    });
  },

  // --- 输入监听 ---
  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [field]: e.detail.value });
  },

  onBookBtn() {
    if (this.data.isBooked) return;
    this.setData({ showPicker: true });
  },

  closePicker() {
    this.setData({ showPicker: false });
  },

  onSelectDate(e) {
    const { idx, available } = e.currentTarget.dataset;
    if (!available) return; 
    this.setData({ selectedDateIdx: idx, selectedTimeIdx: -1 });
  },

  onSelectTime(e) {
    const { idx } = e.currentTarget.dataset;
    this.setData({ selectedTimeIdx: idx });
  },

  finalConfirm() {
    const { 
      selectedDateIdx, selectedTimeIdx, dateList, timeSlots, volunteer,
      userName, userPhone, address, remark 
    } = this.data;

    // 表单校验
    if (!userName.trim()) return wx.showToast({ title: '请输入姓名', icon: 'none' });
    if (!userPhone.trim() || userPhone.length < 11) return wx.showToast({ title: '请输入正确手机号', icon: 'none' });
    if (!address.trim()) return wx.showToast({ title: '请填写服务地点', icon: 'none' });
    if (selectedDateIdx === -1) return wx.showToast({ title: '请选择日期', icon: 'none' });
    if (selectedTimeIdx === -1) return wx.showToast({ title: '请选择时间段', icon: 'none' });

    const resDate = dateList[selectedDateIdx];
    const resTime = timeSlots[selectedTimeIdx];

    wx.showModal({
      title: '确认提交预约',
      content: `志愿者：${volunteer.name}\n时间：${resDate.fullDate} ${resTime.range}\n地点：${address}`,
      confirmColor: '#B45309',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          app.globalData.appointment = {
            name: volunteer.name,
            avatar: volunteer.avatar,
            time: `${resDate.fullDate} ${resTime.range.split('-')[0]}`,
            address: address
          };
          wx.showToast({ title: '提交成功', icon: 'success' });
          this.setData({ isBooked: true, showPicker: false });
          setTimeout(() => wx.navigateBack(), 1000);
        }
      }
    });
  }
})