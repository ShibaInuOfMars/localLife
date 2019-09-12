import wxAjax from './../../utils/ajax.js';
import regeneratorRuntime from "./../../utils/runtime.js";

Page({

  data: {
    sid: '', // 店铺的id
    info: {}, // 店铺的信息
  },

  onLoad (query) {
    console.log(query);
  },

  onShow() {
    // 请求店铺信息
    this.getInfo();
  },

  // 请求店铺信息
  async getInfo() {
    let res = await wxAjax('/shops/1');

    console.log(res);
  }
})