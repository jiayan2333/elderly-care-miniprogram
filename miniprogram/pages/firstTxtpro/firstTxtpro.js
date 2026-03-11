Page({
  data: {
    recordContent: '',
    records: [],
    currentDate: ''
  },

  onLoad() {
    this.initDate();
    this.loadRecords();
  },

  initDate() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    this.setData({
      currentDate: dateStr
    });
  },

  loadRecords() {
    try {
      const records = wx.getStorageSync('firstTxtproRecords') || [];
      this.setData({ records });
    } catch (err) {
      console.error('加载健康记录失败', err);
    }
  },

  onInputChange(e) {
    this.setData({
      recordContent: e.detail.value
    });
  },

  saveRecord() {
    const content = this.data.recordContent.trim();
    if (!content) {
      wx.showToast({
        title: '请输入健康记录',
        icon: 'none'
      });
      return;
    }

    const now = new Date();
    const timestamp = now.getTime();

    const newRecord = {
      id: timestamp,
      content,
      timestamp,
      timeText: this.formatTime(timestamp), 
      expanded: false 
    };

    const records = [newRecord, ...this.data.records];

    wx.showLoading({
      title: '保存中...',
      mask: true
    });

    try {
      wx.setStorageSync('firstTxtproRecords', records);

      this.setData({
        records,
        recordContent: '' 
      });

      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
    } catch (err) {
      console.error('保存失败', err);
      wx.showToast({
        title: '保存失败',
        icon: 'none'
      });
    }

    setTimeout(() => {
      wx.hideLoading();
    }, 300);
  },

  toggleRecord(e) {
    const index = e.currentTarget.dataset.index;
    const records = this.data.records;

    records[index].expanded = !records[index].expanded;

    this.setData({ records });
  },

  clearAllRecords() {
    const that = this;

    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有健康记录吗？',
      confirmColor: '#f44336',
      success(res) {
        if (res.confirm) {
          try {
            wx.removeStorageSync('firstTxtproRecords');
            that.setData({ records: [] });

            wx.showToast({
              title: '已清空',
              icon: 'success'
            });
          } catch (err) {
            console.error('清空失败', err);
            wx.showToast({
              title: '清空失败',
              icon: 'none'
            });
          }
        }
      }
    });
  },

  formatTime(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}`;
  }
});