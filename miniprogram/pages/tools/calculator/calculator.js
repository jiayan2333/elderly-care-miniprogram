Page({
  data: {
    displayValue: '',
    isFinished: false,
    keyRows: [
      ['7', '8', '9', '÷'],
      ['4', '5', '6', '×'],
      ['1', '2', '3', '-'],
      ['清空', '0', '=', '+']
    ]
  },

  onTap(e) {
    const val = e.currentTarget.dataset.val;
    let { displayValue, isFinished } = this.data;
    const operators = ['+', '-', '×', '÷'];

    wx.vibrateShort({ type: 'light' });

    if (val === '清空') {
      this.setData({ displayValue: '', isFinished: false });
      return;
    }

    if (val === '=') {
      this.calculate();
      return;
    }

    // 处理计算完成后的新输入
    if (isFinished && !operators.includes(val)) {
      displayValue = val;
      isFinished = false;
    } else {
      isFinished = false;
      // 防止重复输入运算符
      if (operators.includes(val) && operators.includes(displayValue.slice(-1))) {
        displayValue = displayValue.slice(0, -1) + val;
      } else {
        if (displayValue.length < 12) displayValue += val;
      }
    }

    this.setData({ displayValue, isFinished });
  },

  calculate() {
    let expr = this.data.displayValue;
    if (!expr || expr === '错误') return;

    // 1. 去掉末尾无效运算符
    while (['+', '-', '×', '÷'].includes(expr.slice(-1))) {
      expr = expr.slice(0, -1);
    }

    try {
      // 2. 采用稳健的正则拆分逻辑（绕过 Function/eval 限制）
      // 这个正则可以识别数字（包括小数）和运算符
      const parts = expr.match(/(\d+\.?\d*)|([+\-×÷])/g);
      if (!parts) return;

      // 第一步：处理乘除 (× 和 ÷)
      for (let i = 0; i < parts.length; i++) {
        if (parts[i] === '×' || parts[i] === '÷') {
          const left = parseFloat(parts[i - 1]);
          const right = parseFloat(parts[i + 1]);
          let res = 0;
          if (parts[i] === '×') res = left * right;
          if (parts[i] === '÷') res = left / right;
          
          parts.splice(i - 1, 3, res.toString());
          i--; 
        }
      }

      // 第二步：处理加减 (+ 和 -)
      let result = parseFloat(parts[0]);
      for (let i = 1; i < parts.length; i += 2) {
        const op = parts[i];
        const nextVal = parseFloat(parts[i + 1]);
        if (op === '+') result += nextVal;
        if (op === '-') result -= nextVal;
      }

      // 3. 结果美化
      if (isNaN(result) || !isFinite(result)) throw new Error();
      
      const finalRes = Number.isInteger(result) ? 
                       result : 
                       parseFloat(result.toFixed(8));

      this.setData({
        displayValue: String(finalRes),
        isFinished: true
      });

    } catch (e) {
      this.setData({ displayValue: '错误' });
      setTimeout(() => {
        if (this.data.displayValue === '错误') this.setData({ displayValue: '' });
      }, 1000);
    }
  }
});