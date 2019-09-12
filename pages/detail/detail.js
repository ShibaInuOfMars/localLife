import wxAjax from './../../utils/ajax.js';
import regeneratorRuntime from "./../../utils/runtime.js";

Page({

  data: {
    sid: '', // 店铺的id
    sname: '', // 店铺的名字
    info: {}, // 店铺的信息
  },

  onLoad (query) {
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
    let res = await wxAjax(`/shops/${this.data.sid}`);
    if (res.statusCode === 200) {
      this.data.info = res.data;
      this.setData(this.data);
    }
  }
})