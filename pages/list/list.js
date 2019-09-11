import wxAjax from './../../utils/ajax.js';
import regeneratorRuntime from "./../../utils/runtime.js";

Page({
  data: {
    cid: '', // 要显示的对应分类店铺的id
    cname: '', // 分类名称（用于导航提示文字）
    shopList: [], // 店铺数据
  },

  // 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数
  onLoad(query) {
    if (query.cid) {
      this.data.cid = query.cid;
      this.data.cname = query.cname;
      this.setData(this.data);

      // 修改导航提示文字
      wx.setNavigationBarTitle({
        title: this.data.cname,
      });
    } else {
      wx.navigateTo({
        url: '/pages/index/index'
      });
    }
  },

  onShow() {
    // 发送ajax请求获取店铺列表
    this.getShopList();
  },

  async getShopList() {
    let {cid} = this.data;
    let res = await wxAjax(`/categories/${cid}/shops?_page=1&_limit=10`);
    if (res.statusCode === 200) {
      this.data.shopList = res.data;
      this.setData(this.data);
    }
  }
})