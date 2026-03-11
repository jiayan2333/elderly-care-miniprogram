
const TEMPLATE_ID = 'xMMWFu8bsl5G9U8Y-_Apy_tuVWWi8TitLNC-V8ih3kk';

Page({
  data: {
    tempTimes: [{ name: '', time: '09:00' }], 
    savedTimes: [],         
    nextReminderTime: '',   
    remainingCount: 0,      
    totalCount: 0,          
    templateId: TEMPLATE_ID
  },

  onLoad() {
    this.loadSavedTimes();
  },

  onShow() {
    if (this.data.savedTimes.length) {
      this.calculateReminders();
    }
  },

  loadSavedTimes() {
    try {
      const savedTimes = wx.getStorageSync('reminderTimes');
      if (savedTimes && savedTimes.length) {
        const sorted = savedTimes.sort((a, b) => a.time.localeCompare(b.time));
        this.setData({
          savedTimes: sorted,
          tempTimes: JSON.parse(JSON.stringify(sorted)) 
        }, () => {
          this.calculateReminders();
        });
      }
    } catch (e) {
      console.error('加载本地设置失败', e);
    }
  },

  bindNameInput(e) {
    const { index } = e.currentTarget.dataset;
    let tempTimes = this.data.tempTimes;
    tempTimes[index].name = e.detail.value;
    this.setData({ tempTimes });
  },

  bindTimeChange(e) {
    const { index } = e.currentTarget.dataset;
    let tempTimes = this.data.tempTimes;
    tempTimes[index].time = e.detail.value;
    this.setData({ tempTimes });
  },

  addTime() {
    let tempTimes = this.data.tempTimes;
    if (tempTimes.length >= 8) {
      wx.showToast({ title: '最多设置8组提醒', icon: 'none' });
      return;
    }
    tempTimes.push({ name: '', time: '09:00' });
    this.setData({ tempTimes });
  },

  removeTime(e) {
    const { index } = e.currentTarget.dataset;
    let tempTimes = this.data.tempTimes;
    if (tempTimes.length <= 1) return;
    tempTimes.splice(index, 1);
    this.setData({ tempTimes });
  },

  // 保存逻辑
  saveTimes() {
    const { tempTimes } = this.data;
    if (tempTimes.some(t => !t.name || !t.time)) {
      wx.showToast({ title: '药名和时间不能为空', icon: 'none' });
      return;
    }

    const sorted = tempTimes.sort((a, b) => a.time.localeCompare(b.time));
    wx.setStorageSync('reminderTimes', sorted);

    this.setData({ savedTimes: sorted }, () => {
      this.calculateReminders();
      this.saveToCloud(); 
      
      // 增加一个弹窗,用户点击后触发微信授权
      wx.showModal({
        title: '保存成功',
        content: '为了能准时通知您吃药，请在随后的微信弹窗中允许通知。',
        confirmText: '去开启',
        success: (res) => {
          if (res.confirm) {
            this.requestSubscribe();
          }
        }
      });
    });
  },


  saveToCloud() {
    const db = wx.cloud.database();
    const times = this.data.savedTimes;


    db.collection('medicine_reminders').get().then(res => {
      if (res.data.length > 0) {
        db.collection('medicine_reminders').doc(res.data[0]._id).update({
          data: {
            times: times,
            updatedAt: db.serverDate()
          }
        }).catch(err => console.error('更新失败', err));
      } else {
        db.collection('medicine_reminders').add({
          data: {
            times: times,
            createTime: db.serverDate(),
            updatedAt: db.serverDate()
          }
        }).catch(err => console.error('新增失败', err));
      }
    });
  },

  // 错误诊断的订阅请求
  requestSubscribe() {
    wx.requestSubscribeMessage({
      tmplIds: [this.data.templateId],
      success: (res) => {
        if (res[this.data.templateId] === 'accept') {
          wx.showToast({ title: '消息通知已开启', icon: 'success' });
        } else {
          wx.showToast({ title: '已拒绝通知', icon: 'none' });
        }
      },
      fail: (err) => {
        console.error('授权失败详情：', err);
        wx.showModal({
          title: '微信权限开启失败',
          content: `错误码：${err.errCode}\n${err.errMsg}`,
          showCancel: false
        });
      }
    });
  },

  deleteTime(e) {
    const { index } = e.currentTarget.dataset;
    let savedTimes = this.data.savedTimes;
    wx.showModal({
      title: '确认删除',
      content: `不再提醒“${savedTimes[index].name}”了吗？`,
      success: res => {
        if (res.confirm) {
          savedTimes.splice(index, 1);
          wx.setStorageSync('reminderTimes', savedTimes);
          this.setData({ savedTimes }, () => {
            this.calculateReminders();
            this.saveToCloud();
          });
        }
      }
    });
  },

  calculateReminders() {
    const { savedTimes } = this.data;
    if (!savedTimes.length) {
      this.setData({ nextReminderTime: '', remainingCount: 0, totalCount: 0 });
      return;
    }
    const now = new Date();
    const curMin = now.getHours() * 60 + now.getMinutes();
    const futureReminders = savedTimes.filter(item => {
      const [h, m] = item.time.split(':').map(Number);
      return (h * 60 + m) > curMin;
    });
    let nextT = '';
    if (futureReminders.length > 0) {
      nextT = `${futureReminders[0].name} (${futureReminders[0].time})`;
    } else {
      nextT = `明天 ${savedTimes[0].name} (${savedTimes[0].time})`;
    }
    this.setData({
      nextReminderTime: nextT,
      remainingCount: futureReminders.length,
      totalCount: savedTimes.length
    });
  }
});