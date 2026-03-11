// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [
      'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/商城/商城-1.jpg',
      'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/商城/商城-2.jpg',
      'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/商城/商城-3.jpg'
    ],
  hotProducts: [
      {
        id: 1,
        name: '5道田五常大米',
        price: '42',
        sales: '热卖中',
        tag: '品质',
        image: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/商城/商品1.png',
        url: '/pages/goods/goods?id=2408991'
      },
      {
        id: 2,
        name: '鸡胸肉冷冻批发新鲜去皮鸡肉',
        price: '11.49',
        sales: '热卖中',
        tag: '新品',
        image: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/商城/商品2.png',
        url: '/pages/goods/goods?id=2408219'
      },
      {
        id: 3,
        name: '四川春见耙耙柑丑橘',
        price: '31.9',
        sales: '热卖中',
        tag: '爆款',
        image: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/商城/商品3.png',
        url: '/pages/goods/goods?id=2408992'
      },
      {
        id: 4,
        name: '黑龙江五常大米稻花香2号',
        price: '65.8',
        sales: '热卖中',
        tag: '推荐',
        image: 'cloud://cloud-littlename-5f59ieubb03a1e3.636c-cloud-littlename-5f59ieubb03a1e3-1404543063/userimg/商城/商品4.png',
        url: '/pages/goods/goods?id=2408990'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /**
   * 跳转到商城页面
   */
  navigateToMiniProgram() {
    wx.navigateToMiniProgram({
      appId: 'wxc4fc148a8d5c4c4b',
      success(res) {
        console.log('跳转成功', res);
      },
      fail(err) {
        console.error('跳转失败', err);
        wx.showToast({
          title: '跳转失败',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 点击商品卡片跳转到具体购买页
   */
  navigateToProductPage(e) {
    const productId = e.currentTarget.dataset.id;
    const product = this.data.hotProducts.find(item => item.id === productId);

    if (!product || !product.url) {
      wx.showToast({
        title: '商品链接未配置',
        icon: 'none'
      });
      return;
    }

    wx.navigateToMiniProgram({
      appId: 'wxc4fc148a8d5c4c4b',
      path: product.url,
      success(res) {
        console.log('跳转到商品页面成功', res);
      },
      fail(err) {
        console.error('跳转失败', err);
        wx.showToast({
          title: '跳转失败',
          icon: 'none'
        });
      }
    });
  }
})