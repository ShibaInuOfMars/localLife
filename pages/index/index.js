// 引入ajax
import wxAjax from './../../utils/ajax.js';

// 微信小程序中虽然支持Promise，但是并不支持async和await
// 可以引入下面的包解决这个问题
import regeneratorRuntime from "./../../utils/runtime.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [], // 轮播图数据
    categoryList: [] // 分类数据
  },

  onShow() {
    // console.log(wxAjax);
    this.getSwiperList();

    this.getCategoryList();
  },

  // 发送请求获取轮播图数据
  async getSwiperList() {
    // wx.request({
    //   url: 'https://locally.uieee.com/slides',
    //   success: (res) => {
    //     // console.log(res);
    //     if (res.statusCode === 200) {
    //       this.data.swiperList = res.data;

    //       this.setData(this.data);
    //     }
    //   }
    // });

    // wxAjax('/slides').then((res) => {
    //   if (res.statusCode === 200) {
    //     this.data.swiperList = res.data;

    //     this.setData(this.data);
    //   }
    // });

    let res = await wxAjax('/slides');
    if (res.statusCode === 200) {
      this.data.swiperList = res.data;
      this.setData(this.data);
    }
  },

  // 发送请求获取分类数据
  async getCategoryList() {
    // wx.request({
    //   url: 'https://locally.uieee.com/categories',
    //   success: (res) => {
    //     // console.log(res);
    //     if (res.statusCode === 200) {
    //       this.data.categoryList = res.data;

    //       this.setData(this.data);
    //     }
    //   }
    // });

    // wxAjax('/categories').then((res) => {
    //   if (res.statusCode === 200) {
    //     this.data.categoryList = res.data;

    //     this.setData(this.data);
    //   }
    // });

    let res = await wxAjax('/categories');
    if (res.statusCode === 200) {
      this.data.categoryList = res.data;
      this.setData(this.data);
    }
  }
})