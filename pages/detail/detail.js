import wxAjax from './../../utils/ajax.js';
import regeneratorRuntime from "./../../utils/runtime.js";

Page({

  data: {
    sid: '', // 店铺的id
    sname: '', // 店铺的名字
    info: {}, // 店铺的信息
  },

  onLoad (query) {
    // wx.showLoading({
    //   title: '加载中'
    // });

    // console.log(query);
    if(query.sid) {
      this.data.sid = query.sid;
      this.data.sname = query.sname;

      this.setData(this.data);
    } else {
      wx.navigateTo({
        url: '/pages/index/index'
      });
    }
  },

  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.sname
    });
  },

  onShow() {
    // 请求店铺信息
    this.getInfo();
  },

  // 请求店铺信息
  async getInfo() {
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    let res = await wxAjax(`/shops/${this.data.sid}`);
    if (res.statusCode === 200) {
      this.data.info = res.data;
      this.setData(this.data);

      wx.hideLoading();
    } else {
      wx.hideLoading();

      wx.showToast({
        title: '出了点问题哟~'
      });
    }
  },

  // 点击小图显示大图，只需调用小程序提供的方法即可
  preview(e) {
    let {urls, current}  = e.currentTarget.dataset;

    // console.log(urls, current);

    // 将url中的w.h替换
    urls = urls.map(item => item.replace('w.h', '1000.1000'));
    current = current.replace('w.h', '1000.1000');

    wx.previewImage({
      urls: urls,
      current: current
    });
  }
})