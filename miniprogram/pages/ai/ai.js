Page({
  data: {
    chatMode: "bot",
    showBotAvatar: true,
    agentConfig: {
      botId: "agent-littlename2-9ewr87901c13a6",
      allowWebSearch: true,
      allowUploadFile: true,
      allowPullRefresh: true,
      allowUploadImage: true,
      showToolCallDetail: true,
      allowMultiConversation: true,
      allowVoice: true,
      showBotName: true,
      tools: [
        {
          name: "get_weather",
          description: "获取指定城市的天气",
          parameters: { type: "object", properties: { city: { type: "string" } }, required: ["city"] },
          handler: (params) => `城市${params.city}的天气是晴朗的，适合老人家出去散散步哦。`
        }
      ],
    },
    modelConfig: {
      modelProvider: "deepseek",
      quickResponseModel: "deepseek-v3.2",
      welcomeMsg: "您好，老人家！我是您的数字小助手小安。有什么我可以帮您的？您点一下左上角的“猜你喜欢”可以快速问我问题。",
    },
    videoUrl: "", 
    menuExpanded: false,
    isInitialState: true,
    windowWidth: 375,
    windowHeight: 667
  },
  onLoad() {
    try {
      const windowInfo = wx.getWindowInfo();
      this.setData({
        windowWidth: windowInfo.windowWidth,
        windowHeight: windowInfo.windowHeight
      });
    } catch (e) {}
    const cloudPath = 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/video/ai/logo.mp4';
    wx.cloud.getTempFileURL({
      fileList: [cloudPath],
      success: res => {
        this.setData({ videoUrl: res.fileList[0].tempFileURL });
      },
      fail: () => {
        this.setData({ videoUrl: cloudPath });
      }
    });
  },
  onBallTap() {
    if (this.data.isInitialState) {
      this.setData({ isInitialState: false });
      wx.vibrateShort({ type: 'medium' });
    } else {
      this.toggleMenu();
    }
  },
  toggleMenu() {
    this.setData({ menuExpanded: !this.data.menuExpanded });
  },
  sendSuggest(e) {
    const query = e.currentTarget.dataset.q;
    this.setData({ menuExpanded: false });
    const agentComponent = this.selectComponent('#myAgent');
    if (agentComponent && typeof agentComponent.onInputConfirm === 'function') {
      agentComponent.onInputConfirm({ detail: { value: query } });
    } else {
      wx.setClipboardData({
        data: query,
        success: () => {
          wx.showModal({
            title: '复制好啦',
            content: '问题已经帮您准备好了。请您点击屏幕最下面的输入框，长按一下选择“粘贴”，再点发送就行。',
            showCancel: false,
            confirmText: '我知道了'
          });
        }
      });
    }
  }
});