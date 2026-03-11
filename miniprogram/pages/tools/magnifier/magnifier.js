Page({
  data: {
    flashStatus: 'off',
    zoomValue: 1.0 
  },

  onLoad() {
    this.checkCameraPermission();
  },

  // 手电筒逻辑：保持 torch 模式，确保常亮
  toggleFlash() {
    const nextStatus = this.data.flashStatus === 'torch' ? 'off' : 'torch';
    this.setData({
      flashStatus: nextStatus
    }, () => {
      wx.vibrateShort(); // 点击反馈
      wx.showToast({
        title: nextStatus === 'torch' ? '手电筒已开启' : '手电筒已关闭',
        icon: 'none'
      });
    });
  },

  checkCameraPermission() {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.camera']) {
          wx.authorize({
            scope: 'scope.camera',
            fail: () => {
              wx.showModal({
                title: '需要权限',
                content: '请允许使用摄像头以开启放大镜',
                confirmText: '去开启',
                showCancel: false,
                success: () => wx.openSetting()
              });
            }
          });
        }
      }
    });
  }
});