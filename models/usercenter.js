const userInfo = {
  avatarUrl: '',
    // 'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-ui/components-exp/avatar/avatar-1.jpg',
  nickName: '',
  phoneNumber: '',
  gender: 1,
};
const countsData = [];


const customerServiceInfo = {
  servicePhone: '13012345678',
  serviceTimeDuration: '每周三至周五 9:00-11:00  13:00-15:00',
};

export const genSimpleUserInfo = () => ({ ...userInfo });

export const genUsercenter = () => ({
  userInfo,
  countsData,
  customerServiceInfo,
});