# Week15 学习笔记

- [Week15 学习笔记](#week15-%e5%ad%a6%e4%b9%a0%e7%ac%94%e8%ae%b0)
  - [轮播组件 | 手势动画应用](#%e8%bd%ae%e6%92%ad%e7%bb%84%e4%bb%b6--%e6%89%8b%e5%8a%bf%e5%8a%a8%e7%94%bb%e5%ba%94%e7%94%a8)
    - [轮播组件 | 为组件添加更多属性](#%e8%bd%ae%e6%92%ad%e7%bb%84%e4%bb%b6--%e4%b8%ba%e7%bb%84%e4%bb%b6%e6%b7%bb%e5%8a%a0%e6%9b%b4%e5%a4%9a%e5%b1%9e%e6%80%a7)

===

## 轮播组件 | 手势动画应用

1. gesture 作为一个库引入 carousel，实际可能需要经过测试
2. 拖拽改成 px 实现精准控制
3. 拖拽：
   1. 暂停 timeline，暂停 setInterval
   2. 需要考虑 动画产生的距离
   3. 拖拽结束，reset timeline，重新开始 timeline 和自动播放

===

### 轮播组件 | 为组件添加更多属性

有些变量是不应该暴露出去的, 应该添加状态机制：

- 用户可能通过代码修改 position
- children, timeline, handler, t, ax

在 Component 里添加 state：因为不想暴露，所以使用 symbol，但是 Carousel 也需要使用，所以 export 出去，类似 protected

添加事件机制:

- 把 type 首字母改大写：type.replace(/^[\s\S]/, (s) => s.toUpperCase())

Children 机制：

1. 内容 Children： 放几个 children，实际 dom 就出现几个
2. 模板 Children：放在 children 里的是一个模板
