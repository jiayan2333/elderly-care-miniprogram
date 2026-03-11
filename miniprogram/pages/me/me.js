Page({
  data: {
    userInfo: null, 
    age: '', 
    birthday: '1960-01-01',
    medicalHistory: '',
    hobbies: '',
    childContact: '',
    address: '',
    isVIP: false,
    userInfo_tank: false, 
    tempAvatar: '',
    tempNickName: ''
  },

  /*生命周期与本地数据加载*/
  onLoad() {
    this.loadLocalData();
  },

  loadLocalData() {
    const userInfo = wx.getStorageSync('userInfo') || null;
    const profile = wx.getStorageSync('userProfile') || {};

    this.setData({
      userInfo: userInfo,
      age: profile.age || '',
      birthday: profile.birthday || '1960-01-01',
      medicalHistory: profile.medicalHistory || '',
      hobbies: profile.hobbies || '',
      childContact: profile.childContact || '',
      address: profile.address || '',
      isVIP: wx.getStorageSync('isVIP') || false
    });
  },

  /*用户登录及弹窗逻辑*/
  openLoginTank() { this.setData({ userInfo_tank: true }); },
  
  closeTank() { this.setData({ userInfo_tank: false }); },
  
  onChooseAvatar(e) { this.setData({ tempAvatar: e.detail.avatarUrl }); },
  
  getNickName(e) { this.setData({ tempNickName: e.detail.value }); },

  submitLogin() {
    if (!this.data.tempAvatar || !this.data.tempNickName) {
      wx.showToast({ title: '请完善信息', icon: 'none' });
      return;
    }
    const user = { avatarUrl: this.data.tempAvatar, nickName: this.data.tempNickName };
    this.setData({ userInfo: user, userInfo_tank: false });
    wx.setStorageSync('userInfo', user);
    wx.showToast({ title: '登录成功' });
  },

  tuichu() {
    wx.showModal({
      title: '提示',
      content: '确定退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ userInfo: null });
          wx.removeStorageSync('userInfo');
          wx.showToast({ title: '已退出登录', icon: 'none' });
        }
      }
    });
  },

  /*页面表单输入绑定*/
  onInputChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [field]: e.detail.value });
  },

  /*SOS、工具箱、保存资料*/
  triggerSOS() {
    const phone = this.data.childContact;
    wx.showModal({
      title: '确认求助',
      content: phone ? `立即拨打紧急联系人：${phone}？` : '未设置子女电话，将为您拨打110？',
      confirmColor: '#ff4d4f',
      confirmText: '立即拨打',
      success: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: phone || '110'
          });
        }
      }
    });
  },

  openToolbox() {
    const itemList = ['🔍 放大镜', '🔦 开启手电筒', '🔆 屏幕调至最亮', '🔢 大字计算器', '📅 老黄历'];
    wx.showActionSheet({
      itemList: itemList,
      success: (res) => {
        switch (res.tapIndex) {
          case 0: // 放大镜
            wx.showToast({ title: '正在打开放大镜', icon: 'none' });
            wx.navigateTo({ url: '/pages/tools/magnifier/magnifier' }); 
            break;
          case 1: // 手电筒
            wx.showModal({
              title: '手电筒提示',
              content: '为了方便您看清，请在“放大镜”页面点击手电筒按钮。',
              confirmText: '去开启',
              success: (sm) => { 
                if (sm.confirm) wx.navigateTo({ url: '/pages/tools/magnifier/magnifier' }); 
              }
            });
            break;
          case 2: // 调亮屏幕
            wx.setScreenBrightness({ 
              value: 1.0,
              success: () => {
                wx.showToast({ title: '屏幕已调至最亮', icon: 'success' });
              }
            });
            break;
          case 3: // 计算器
            wx.showToast({ title: '正在打开计算器', icon: 'none' });
            wx.navigateTo({ url: '/pages/tools/calculator/calculator' });
            break;
          case 4: // 老黄历
            wx.showToast({ title: '正在查看老黄历', icon: 'none' });
            wx.navigateTo({ url: '/pages/tools/calendar/calendar' });
            break;
        }
      }
    });
  },

  saveProfile() {
    const profileData = {
      age: this.data.age,
      birthday: this.data.birthday,
      medicalHistory: this.data.medicalHistory,
      hobbies: this.data.hobbies,
      childContact: this.data.childContact,
      address: this.data.address
    };
    wx.setStorageSync('userProfile', profileData);
    wx.showToast({ title: '资料已保存', icon: 'success' });
  },

  /* 页面跳转*/
  handleVip() {
    wx.navigateTo({
      url: '/pages/vip/vip'
    });
  },

  goToAI() {
    wx.navigateTo({
      url: '/pages/ai/ai',
      fail: () => {
        wx.switchTab({
          url: '/pages/ai/ai',
        })
      }
    });
  },

  goToHealthRecord() {
    wx.navigateTo({ url: '/pages/firstTxtpro/firstTxtpro' });
  }
});