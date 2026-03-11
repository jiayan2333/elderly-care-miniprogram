Page({
  data: {
    year: '',
    month: '',
    day: '',
    week: '',
    yiContent: '', 
    biContent: '', 
    fortune: '', 
    luckyZodiac: '', 
    luckyDirection: '', 
    luckyHour: '',
    zenQuote: '' // 新增：生活禅语
  },

  onLoad() {
    this.updateDate();
    this.initShake();
  },

  updateDate() {
    const now = new Date();
    const weeks = ['日', '一', '二', '三', '四', '五', '六'];
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();

    this.setData({
      year: y,
      month: m,
      day: d,
      week: weeks[now.getDay()]
    });

    this.generateDailyLuck(y, m, d);
  },

  generateDailyLuck(y, m, d) {
    const yiList = ['散步抽青', '听旧广播', '阳台晒背', '修剪花草', '联络老友', '品饮淡茶', '静心阅读', '整理家常', '午间小憩', '热水泡脚', '多吃蔬果', '临摹书法', '公园赏花'];
    const biList = ['久坐不动', '思虑过多', '剧烈运动', '夜晚熬夜', '暴饮暴食', '攀爬高处', '贪凉受风', '看手机过久', '生闷气'];
    const zodiacs = ['属鼠的', '属牛的', '属虎的', '属兔的', '属龙的', '属蛇的', '属马的', '属羊的', '属猴的', '属鸡的', '属狗的', '属猪的'];
    const directions = ['正东', '正南', '正西', '正北', '东南', '西南', '西北', '东北'];
    const hours = ['辰时(7-9点)', '巳时(9-11点)', '午时(11-13点)', '未时(13-15点)', '申时(15-17点)'];
    const fortunes = ['大吉大利', '福星高照', '喜气盈门', '岁岁平安', '和气生财', '身康体健'];
    const quotes = [
      '不忧虑过去，不期待未来，抓紧当下。',
      '心中有阳光，处处是美景。',
      '平安即是大福，健康便是黄金。',
      '笑一笑，十年少；愁一愁，白了头。',
      '顺其自然，随遇而安，福气自来。',
      '淡泊名利，知足常乐。'
    ];

    const seed = y * 10000 + m * 100 + d;
    const getLuck = (list, count, salt) => {
      let result = [], tempSeed = seed + salt;
      while (result.length < count) {
        tempSeed = (tempSeed * 9301 + 49297) % 233280;
        const item = list[Math.floor((tempSeed / 233280) * list.length)];
        if (!result.includes(item)) result.push(item);
      }
      return result.join('、');
    };

    this.setData({
      yiContent: getLuck(yiList, 3, 100),
      biContent: getLuck(biList, 2, 500),
      fortune: fortunes[seed % fortunes.length],
      luckyZodiac: zodiacs[(seed + 8) % 12],
      luckyDirection: directions[(seed * 3) % 8],
      luckyHour: hours[(seed * 7) % 5],
      zenQuote: quotes[seed % quotes.length]
    });
  },

  initShake() {
    let lastTime = 0, lastX = 0, lastY = 0, lastZ = 0;
    wx.onAccelerometerChange((res) => {
      const now = Date.now();
      if (now - lastTime > 100) {
        const speed = Math.abs(res.x + res.y + res.z - lastX - lastY - lastZ) / (now - lastTime) * 10000;
        if (speed > 80) {
          wx.vibrateLong();
          wx.showModal({ title: '接福喽', content: `今日摇得“${this.data.fortune}”，福气满满！`, showCancel: false });
        }
        lastTime = now; lastX = res.x; lastY = res.y; lastZ = res.z;
      }
    });
  },

  onUnload() {
    wx.stopAccelerometer();
  }
});