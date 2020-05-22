import Cookie from 'js-cookie'
export default ({app }) => {
  // 挂载路由导航守卫
  app.router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    //     next()  放行    next('/login')  强制跳转

    if (to.path === '/login') return next();
    // 获取token
    console.log(app.$cookies.get('sid'))
    const tokenStr = app.$cookies.get('sid')
    if (!tokenStr) return next("/login");
    next();
  });
};
