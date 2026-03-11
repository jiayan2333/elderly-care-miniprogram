Page({
  data: {
    userInfo: null,
    isVIP: false,
    selectedIndex: 1,
    showPaymentModal: false,
    selectedMethod: '',
    showBankModal: false,
    selectedBank: '',
    selectedBankName: '',
    packages: [
      {
        name: '连续包月',
        desc: '自动续费',
        price: 25,
        unit: '月',
        period: '30天',
        tag: '最划算',
        detail: '每月仅需¥25，比单月购买省¥5/月'
      },
      {
        name: '月卡',
        desc: '单次购买',
        price: 30,
        unit: '月',
        period: '30天',
        tag: '灵活',
        detail: '单次购买灵活自由，随时可停'
      },
      {
        name: '季卡',
        desc: '三个月',
        price: 80,
        period: '90天',
        tag: '省¥10',
        detail: '90天仅需¥80，平均每月¥27'
      },
      {
        name: '年卡',
        desc: '超长有效期',
        price: 298,
        period: '365天',
        tag: '省¥62',
        detail: '365天仅需¥298，比月卡省¥62'
      },
      {
        name: '永久卡',
        desc: '终身会员',
        price: 698,
        period: '永久',
        tag: '超值',
        detail: '一次购买终身使用，无需续费'
      },
      {
        name: '体验卡',
        desc: '尝鲜体验',
        price: 5,
        period: '7天',
        tag: '限时',
        detail: '仅需¥5即可体验7天会员特权'
      }
    ],
    selectedPrice: 30,
    selectedPackageDetail: ''
  },

  onLoad() {
    this.loadUserInfo();
    this.checkVIPStatus();
    // 默认显示第一个套餐的优惠详情
    this.setData({
      selectedPackageDetail: this.data.packages[this.data.selectedIndex].detail
    });
  },

  onShow() {
    this.checkVIPStatus();
  },

  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || null;
    this.setData({ userInfo });
  },

  checkVIPStatus() {
    const isVIP = wx.getStorageSync('isVIP') || false;
    this.setData({ isVIP });
  },

  selectPackage(e) {
    const index = e.currentTarget.dataset.index;
    const selectedPrice = this.data.packages[index].price;
    const selectedPackageDetail = this.data.packages[index].detail;
    this.setData({
      selectedIndex: index,
      selectedPrice,
      selectedPackageDetail
    });
  },

  handlePay() {
    if (this.data.isVIP) {
      wx.showToast({
        title: '您已是会员',
        icon: 'none'
      });
      return;
    }
    // 显示支付方式选择弹窗
    this.setData({
      showPaymentModal: true,
      selectedMethod: ''
    });
  },

  closePaymentModal() {
    this.setData({
      showPaymentModal: false,
      selectedMethod: ''
    });
  },

  selectPaymentMethod(e) {
    const method = e.currentTarget.dataset.method;
    if (method === 'bankcard') {
      // 如果选择银行卡，弹出银行选择弹窗
      this.setData({
        showBankModal: true,
        selectedBank: ''
      });
    } else {
      this.setData({ selectedMethod: method });
    }
  },

  closeBankModal() {
    this.setData({
      showBankModal: false,
      selectedBank: ''
    });
  },

  selectBank(e) {
    const bank = e.currentTarget.dataset.bank;
    this.setData({ selectedBank: bank });
  },

  confirmBank() {
    if (!this.data.selectedBank) {
      wx.showToast({
        title: '请选择银行',
        icon: 'none'
      });
      return;
    }
    const bankNames = {
      icbc: '中国工商银行',
      abc: '中国农业银行',
      boc: '中国银行',
      ccb: '中国建设银行',
      comm: '交通银行',
      cmb: '招商银行',
      spdb: '浦发银行'
    };
    this.setData({
      selectedMethod: 'bankcard',
      selectedBankName: bankNames[this.data.selectedBank],
      showBankModal: false
    });
  },

  confirmPayment() {
    if (!this.data.selectedMethod) {
      wx.showToast({
        title: '请选择支付方式',
        icon: 'none'
      });
      return;
    }

    const selectedPackage = this.data.packages[this.data.selectedIndex];
    let paymentMethodName = '';
    switch(this.data.selectedMethod) {
      case 'wechat':
        paymentMethodName = '微信支付';
        break;
      case 'alipay':
        paymentMethodName = '支付宝';
        break;
      case 'cloudpay':
        paymentMethodName = '云闪付';
        break;
      case 'bankcard':
        paymentMethodName = this.data.selectedBankName || '银行卡';
        break;
      default:
        paymentMethodName = '银行卡';
    }

    this.closePaymentModal();

    wx.showLoading({
      title: '正在支付...',
      mask: true
    });

    setTimeout(() => {
      wx.hideLoading();
      wx.showModal({
        title: '支付成功',
        content: `已通过${paymentMethodName}支付¥${selectedPackage.price}，开通${selectedPackage.name}会员！有效期${selectedPackage.period}`,
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#4FACFE',
        success: () => {
          this.setData({ isVIP: true });
          wx.setStorageSync('isVIP', true);
          wx.setStorageSync('vipExpireTime', Date.now() + selectedPackage.period * 24 * 60 * 60 * 1000);

          wx.showToast({
            title: '开通成功',
            icon: 'success'
          });

          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
    }, 1500);
  },

  handleDebugReset() {
    wx.showModal({
      title: '调试重置',
      content: '确定要恢复为普通用户吗？',
      confirmColor: '#FF6B6B',
      success: (res) => {
        if (res.confirm) {
          this.setData({ isVIP: false });
          wx.removeStorageSync('isVIP');
          wx.removeStorageSync('vipExpireTime');
          wx.showToast({
            title: '已恢复为普通用户',
            icon: 'success'
          });
        }
      }
    });
  }
});
