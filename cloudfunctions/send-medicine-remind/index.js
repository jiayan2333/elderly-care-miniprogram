// 云函数 /index.js
const cloud = require('wx-server-sdk')

// 初始化云环境
cloud.init({
  env: cloud.DYNAMIC_TYPE_CHECK
})

const db = cloud.database()
const _ = db.command

/**
 * 逻辑说明：
 * 1. 获取当前北京时间 (HH:mm)
 * 2. 在数据库查找 times 数组中包含该时间的记录
 * 3. 提取对应药名并调用 openapi 发送订阅消息
 */
exports.main = async (event, context) => {
  // 1. 修正时区，获取当前北京时间 HH:mm
  // 云端服务器是 UTC 时间，比北京时间晚 8 小时，必须手动加回
  const now = new Date();
  const beijingTime = new Date(now.getTime() + 8 * 3600000); 
  const curTime = `${String(beijingTime.getHours()).padStart(2, '0')}:${String(beijingTime.getMinutes()).padStart(2, '0')}`;
  
  console.log("当前检查任务时间点：", curTime);

  try {
    // 2. 查询数据库
    // 查找 medicine_reminders 集合中，times 数组里有 time 等于 curTime 的用户
    const result = await db.collection('medicine_reminders').where({
      times: _.elemMatch({
        time: _.eq(curTime)
      })
    }).get();

    if (result.data.length === 0) {
      console.log(curTime + " 本分钟无提醒任务");
      return "No tasks for " + curTime;
    }

    // 3. 构造推送任务队列
    const sendTasks = result.data.map(user => {
      // 从该用户的提醒列表中，精准找到匹配当前时间的那组数据（获取药名）
      const currentMedicine = user.times.find(t => t.time === curTime);
      
      if (!currentMedicine) return Promise.resolve(); // 安全过滤

      // 发送订阅消息
      return cloud.openapi.subscribeMessage.send({
        touser: user._openid, // 接收者的 openid（由云开发自动获取）
        templateId: 'xMMWFu8bsl5G9U8Y-_Apy_tuVWWi8TitLNC-V8ih3kk', // 您的模板ID
        page: 'pages/firstClock/firstClock', // 【关键修改】指向您真实的文件夹路径
        data: {
          thing1: {
            value: currentMedicine.name // 药名（对应模板中的“服务名”）
          },
          time2: {
            value: curTime // 时间（对应模板中的“服务时间”）
          },
          thing4: {
            value: '请您记得按时服药，多喝温水。' // 温馨提示
          }
        }
      })
    });

    // 4. 执行所有推送任务并返回结果
    const sendRes = await Promise.all(sendTasks);
    console.log("本轮推送完成：", sendRes);
    return sendRes;

  } catch (err) {
    console.error("云函数执行异常：", err);
    return err;
  }
}