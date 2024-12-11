Component({
  externalClasses: ['title-class', 'icon-class', 'number-class'],
  options: {
    multipleSlots: true,
  },
  properties: {
    orderTagInfos: {
      type: Array,
      value: [],
    },
    title: {
      type: String,
      value: '我的钱包',
    },
    isTop: {
      type: Boolean,
      value: true,
    },
    classPrefix: {
      type: String,
      value: 'wr',
    },
  },
});
