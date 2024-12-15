export const setStorage = (k,v) => {
  try {
    wx.setStorageSync(k,v);
  } catch (error) {
    console.log(`存储${k}发生异常:`, error);
  }
}

export const getStorage = k => {
  try {
    const v = wx.getStorageSync(k);
    if(v){
      return v;
    }
  } catch (error) {
    console.log(`读取${k}发生异常:`, error);
  }
}

export const removeStorage = k => {
  try {
    const v = wx.removeStorageSync(k);
    if(v){
      return v;
    }
  } catch (error) {
    console.log(`移除${k}发生异常:`, error);
  }
}

export const clearStorage = () => {
  try {
    wx.clearStorageSync();
  } catch (error) {
    console.log(`清空本地数据发生异常`);
  }
}