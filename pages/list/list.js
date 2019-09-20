import wxAjax from './../../utils/ajax.js';
import regeneratorRuntime from "./../../utils/runtime.js";

Page({
  data: {
    cid: '', // 要显示的对应分类店铺的id
    cname: '', // 分类名称（用于导航提示文字）
    shopList: [], // 店铺数据
    currentPage: 1, // 当前的页数
    pageSize: 10, // 每次需要请求的条数
    hasMore: true, // 控制上拉是否还有数据
    showTips: false // 显示提示信息
  },

  // 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数
  onLoad(query) {
    if (query.cid) {
      this.data.cid = query.cid;
      this.data.cname = query.cname;
      this.setData(this.data);
    } else {
      wx.navigateTo({
        url: '/pages/index/index'
      });
    }
  },

  // 页面初次渲染完成时触发
  onReady() {
    // 发送ajax请求获取店铺列表
    this.getShopList();
    
    // 修改导航提示文字
    wx.setNavigationBarTitle({
      title: this.data.cname,
    });
  },

  onShow() {
    
  },

  // 获取店铺数据
  async getShopList() {
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    let {cid, shopList, currentPage, pageSize} = this.data;
    let res = await wxAjax(`/categories/${cid}/shops?_page=${currentPage}&_limit=${pageSize}`);
    if (res.statusCode === 200) {
      // console.log(res);

      // 获取总页数
      let totalCount = res.header['X-Total-Count'] / pageSize;
      // 如果当前页数大于总页数，则停止发送请求
      if (currentPage > totalCount) {
        this.data.hasMore = false;
        this.setData(this.data);
        return;
      }

      // this.data.shopList = res.data;
      // 保留原先的数据，并追加新的数据
      // this.data.shopList = shopList.concat(res.data); // ES5
      this.data.shopList = [...shopList, ...res.data]; // ES6

      this.setData(this.data);
      wx.hideLoading({
        complete: () => {
          this.data.showTips = true;
          this.setData(this.data);
        }
      });
    } else {
      wx.hideLoading();
      wx.showToast({
        title: '出了点问题哟~',
      })
    }
  },

  // 页面上拉触底事件的处理函数
  /*
    上拉加载：
    1. 还是要发送ajax请求
    2. page每次都要比上一次多1
    3. shopList中原先的数据必须保留，新的数据要追加到后面
    4. 假如没有数据的时候，上拉还是会发送ajax请求，所以要处理这个问题（判断当前页数是否大于总页数，是则不用再发送请求）
  */
  onReachBottom() {
    if (this.data.hasMore) {
      this.data.currentPage++;
      this.setData(this.data);
      this.getShopList();
    }
  },

  // 监听用户下拉动作
  /*
    下拉刷新：
    1. 只需重新加载数据即可，但是只能加载第一页的数据
    2. 需要清空shopList，否则数据不会变化
  */
  onPullDownRefresh() {
    this.data.currentPage = 1;
    this.data.shopList = [];
    this.getShopList();
  },

  // 点击店铺跳转到详情页
  jumpToDetail(e) {
    let sid = e.currentTarget.dataset.sid;
    let sname = e.currentTarget.dataset.sname;

    wx.navigateTo({
      url: `/pages/detail/detail?sid=${sid}&sname=${sname}`,
    });
  }
})