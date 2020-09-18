export default {
  pages: [
    'page/CheckLogin/index'
  ],
  subpackages: [
    {
      root: 'page/User',
      pages: [
        'Sign',
        'UpdatePassword'
      ]
    },
    {
      root: 'page/Home',
      pages: [
        'index'
      ]
    },
    {
      root: 'page/Review',
      pages: [
        'index',
        'Detail',
        'Todo'
      ]
    },
    {
      root: 'page/History',
      pages: [
        'index'
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    backgroundColor: '#f5f5f5',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white'
  }
}
