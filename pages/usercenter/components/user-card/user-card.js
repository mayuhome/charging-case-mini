import { UserAPI } from '../../../../utils/api'

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // passwordVisible: {
    //   type: Boolean,
    //   value: false
    // },
    userInfoVisible: {
      type: Boolean,
      value: false
    },
    userInfo: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    passwordVisible: false,
    password: '',
    confirmPassword: '',
    updateName: '',
    updateIsActive: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePasswordModal() {
      this.setData({
        passwordVisible: !this.data.passwordVisible
      })
    },
    handleCancel(){
      this.setData({
        passwordVisible: false,
        userInfoVisible: false
      })
    },
    handleUpdateInfo() {
      if (!this.data.userInfo) {
        wx.showToast({
          title: '未发现用户信息',
          icon: 'none'
        })
        return
      }
      this.setData({
        updateIsActive: this.data.userInfo?.isActive || false,
        updateName: this.data.userInfo.name,
        userInfoVisible: true
      });

    },
    onPasswordVisibleChange(e) {
      this.setData({
        passwordVisible: e.detail
      })
    },
    onUserInfoVisibleChange(e) {
      this.setData({
        userInfoVisible: e.detail
      })
    },
    onInput(e) {
      const field = e.currentTarget.dataset.field;
      this.setData({
        [field]: e.detail,
      });
    },
    handlePasswordConfirm() {
      const { password, confirmPassword } = this.data;
      const msg = confirmPassword !== password ? '两次输入的密码不一致' : '';
      if (msg) {
        wx.showToast({ title: msg, icon: 'none' });
        return;
      }
      // 发起请求
      this.updateUserInfo({ password }).then(() => {
        wx.showToast({ title: '修改成功', icon: 'success' });
        this.setData({
          passwordVisible: false
        })
      } )

    },
    handleUpdateUserInfoConfirm() {
      const { updateName, updateIsActive } = this.data;
      // 发起请求
      this.updateUserInfo({ name: updateName, isActive: updateIsActive }).then(() => {
        wx.showToast({ title: '修改成功', icon: 'success' });
        this.setData({
          userInfoVisible: false,
          userInfo: { ...this.data.userInfo, name: updateName, isActive: updateIsActive }
        })
      } )
    },

    updateUserInfo(updates) {
      const userInfo = { ...this.data.userInfo, ...updates };
      return UserAPI.updateUser(userInfo);
  },
}
});
