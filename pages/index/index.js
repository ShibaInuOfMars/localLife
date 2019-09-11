// 引入ajax
import wxAjax from './../../utils/ajax.js';


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
  getSwiperList() {
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

    wxAjax({
      url: '/slides'
    }).then((res) => {
      if (res.statusCode === 200) {
        this.data.swiperList = res.data;

        this.setData(this.data);
      }
    });
  },

  // 发送请求获取分类数据
  getCategoryList() {
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

    wxAjax({
      url: '/categories'
    }).then((res) => {
      if (res.statusCode === 200) {
        this.data.categoryList = res.data;

        this.setData(this.data);
      }
    });
  }
})