# 仿简书 (pc端)

### 项目运行

```
    # 克隆到本地
    git clone https://github.com/MrZhengXiaoHui/jianshu.git

    # 进入文件夹
    cd jianshu

    # 安装依赖
    npm install

    # 开启本地服务器localhost:3000
    npm start

    # 发布环境
    npm run build
```

### 技术栈

- react 16+
- redux
    - react-redux: react官方用来绑定redux的
    - redux-thunk: 用于处理异步请求
    - immutable: 在react中，immutable主要是防止state对象被错误赋值
    - redux-immutable: 使用redux-immutable统一数据格式
- react-router
    - react-reouter-dom: 用于 DOM 绑定的 React Router
- styled-components: 一个常用的 css in js 类库
- react-transition-group: 一个官网提供的动画过度库
- axios

### 项目实现

- [x] 首页
- [x] 详情页
- [x] 登陆页
