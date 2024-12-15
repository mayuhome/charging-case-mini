import { GET } from '../../../utils/request';

Page({
  data: {
    userList: [
      { id: 1, phone: '13800138000', username: '张三', deviceId: 'A123456' },
      { id: 2, phone: '13900139000', username: '李四', deviceId: 'B654321' },
      // 其他用户数据...
    ]
  },

  onShow(){
    this.getUsers();
  },

  // 查询框输入事件
  onSearch(e) {
    const query = e.detail.value;
    console.log('查询内容:', query);
    // 在这里进行过滤或请求数据
  },

  // 新建用户按钮点击事件
  onCreateUser() {
    wx.navigateTo({
      url: '/pages/usercenter/shops/create/index', // 假设有一个新建用户页面
    });
  },

  // 编辑用户按钮点击事件
  onEditUser(e) {
    const userId = e.currentTarget.dataset.id;
    console.log('编辑用户:', userId);
    wx.navigateTo({
      url: `/pages/edit-user/edit-user?id=${userId}`, // 假设有一个编辑用户页面
    });
  },
  getUsers(){
    GET('/user').then(res => {
      console.log('user:',res);
      this.setData({
        userList: [...res]
      })
    })
  },
});
