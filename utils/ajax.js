// 将微信小程序的wx.request封装成一个通用的ajax函数
// 要求：支持Promise

// 定义基础路径
const BASE_URL = 'https://locally.uieee.com';

export default function wxAjax(options) {
  // 判断参数的类型
  if (typeof options === 'string') {
    let url = options;
    options = {
      url
    };
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${options.url}`,
      data: options.data,
      method: options.method,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(ree);
      }
    });
  });
}