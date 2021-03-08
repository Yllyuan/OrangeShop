// pages/panic/panic.js
var app = getApp();

Page({
  data:{
    vou:[],
  },
   like:function(e){
    console.log(e.currentTarget.dataset.title)
    wx.navigateTo({
      url: '../index/detail?title='+e.currentTarget.dataset.title,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;

    var userInfo = app.get_user_info();

    wx.request({
      url: app.globalData.http_server + '?g=Yanyubao&m=ShopAppWxa&a=get_user_youhui_info', 
      method:'post',
      data: {
        sellerid: app.get_sellerid(),
        checkstr: userInfo.checkstr,
        userid: userInfo.userid
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {  
        var vou = res.data.nouses;
        var status = res.data.status;
        if(status==1){
          that.setData({
            vou:vou,
          });
        }else{
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
        //endInitData
      },
      error:function(e){
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})