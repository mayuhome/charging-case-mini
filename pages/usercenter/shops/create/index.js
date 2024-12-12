Page({
  data: {
    phone: '',
    username: '',
    address: '',
    profitShare: '',
    isEnabled: true,
    deviceIds: [''], // 初始一个空设备编号输入框
  },

  // 输入字段更新
  onInput(e) {
    console.log('e:',e);
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail,
    });
  },

  // 更新设备编号
  onDeviceInput(e) {
    const { index } = e.currentTarget.dataset;
    const { deviceIds } = this.data;
    deviceIds[index] = e.detail.value;
    this.setData({ deviceIds });
  },

  // 添加一个新的设备编号输入框
  addDeviceId() {
    this.setData({
      deviceIds: [...this.data.deviceIds, ''],
    });
  },

  // 是否可用开关
  onSwitchChange(e) {
    this.setData({
      isEnabled: e.detail.value,
    });
  },

  // 提交表单
  onSubmit() {
    const { phone, deviceIds, username, address, profitShare, isEnabled } = this.data;
    console.log('data:', this.data);

    // 验证必填项
    if (!phone) {
      wx.showToast({ title: '手机号不能为空', icon: 'none' });
      return;
    }
    if (deviceIds.some((id) => !id.trim())) {
      wx.showToast({ title: '设备编号不能为空', icon: 'none' });
      return;
    }

    // 表单数据
    const formData = {
      phone,
      deviceIds,
      username,
      address,
      profitShare: profitShare ? parseFloat(profitShare) : null,
      isEnabled,
    };

    console.log('提交表单数据：', formData);

    // 模拟提交
    wx.showToast({ title: '提交成功', icon: 'success' });
  },
});
