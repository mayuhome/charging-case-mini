import updateManager from './common/updateManager';
import { userStore } from './stores/user-store';

App({
  globalData: {
    userStore
  },
  onLaunch: function () {},
  onShow: function () {
    updateManager();
  },
});