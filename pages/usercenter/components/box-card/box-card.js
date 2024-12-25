import { BoxAPI } from '../../../../utils/api'

Component({
  multipleSlots: true,

  /**
   * 组件的属性列表
   */
  properties: {
    boxInfo: {
      type: Object,
      value: {},
      observer(newVal, oldVal) {
        if (newVal) {
          this.setData({
            updateAddress: newVal.address,
            updateProfitShare: newVal.profitShare,
          });
        }
      }
    },
    userList: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showUnbindConfirm: false,
    bindVisible: false,
    boxInfoVisible: false,
    userId: null,
    keys: {
      value: 'id',
      label: 'phone'
    },
    updateAddress: '',
    updateProfitShare: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showUnbindConfirmDialog() {
      this.setData({
        showUnbindConfirm: true
      })
    },
    closeUnbindConfirmDialog() {
      this.setData({
        showUnbindConfirm: false
      })
    },
    unbindBox() {
      BoxAPI.unbindUser(this.data.boxInfo.id).then(() => {
        this.triggerEvent('unbindBox', this.data.boxInfo)
        wx.showToast({
          title: '解绑成功',
          icon: 'success'
        });
        this.setData({
          boxInfo: {
            ...this.data.boxInfo,
            user: null
          },
          showUnbindConfirm: false
        })
      })
    },
    handleBindUserVisible() {
      this.setData({
        bindVisible: true
      })
    },
    handleBindUser() {
      console.log('bind user:', this.data.userId);
      
      if (!this.data.userId) {
        wx.showToast({
          title: '请选择用户',
          icon: 'none'
        })
        return
      }
      BoxAPI.bindUser({
        boxId: this.data.boxInfo.id,
        userId: this.data.userId
      }).then((res) => {
        wx.showToast({
          title: '绑定成功',
          icon: 'success'
        });
        this.setData({
          boxInfo: res,
          bindVisible: false
        });
      })
      
    },
    closeBindDialog() {
      this.setData({
        bindVisible: false
      })
    },
    handleCancel() {
      this.setData({
        bindVisible: false,
        boxInfoVisible: false
      })
    },
    onPickerChange(e) {
      this.setData({
        userId: e.detail.value[0]||null
      });
    },
    handleUpdateInfoVisible() {
      this.setData({
        boxInfoVisible: true
      })
    },
    handleUpdateInfo() {
      BoxAPI.updateBox({
        boxId: this.data.boxInfo.id,
        address: this.data.updateAddress,
        profitShare: this.data.updateProfitShare
      }).then((res) => {
        wx.showToast({
          title: '更新成功',
          icon: 'success'
        });
        this.setData({
          boxInfo: res,
          boxInfoVisible: false
        });
      })
    },
    onInput(e) {
      const field = e.currentTarget.dataset.field;
      this.setData({
        [field]: e.detail,
      });
    }
  }
})