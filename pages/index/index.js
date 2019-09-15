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

  onLoad() {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
  },

  onShow() {

    // 发送请求获取轮播图数据
    this.getSwiperList();

    // 发送请求获取分类数据
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
      wx.hideLoading();
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
      wx.hideLoading();
    }
  },

  // 跳转到列表页，将分类id传过去
  jumpToList(e) {
    let cid = e.currentTarget.dataset.cid;
    let cname = e.currentTarget.dataset.cname;
    wx.navigateTo({
      url: `/pages/list/list?cid=${cid}&cname=${cname}`
    });
  }
})