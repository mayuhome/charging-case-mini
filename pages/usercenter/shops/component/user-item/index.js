Component({
  properties: {
    phone: {
      type: String,
      value: ''
    },
    userInfo: {
      type: Object,
      value: {
        phone: '',
        name: '',
        password: '',
        code: ''
      }
      
    }
    
  },
  data: {
    isEditing: false
  },
  methods: {
    onEdit() {
      this.setData({
        isEditing: !this.data.isEditing
      });
      this.triggerEvent('edit', { editing: this.data.isEditing });
    }
  }
});