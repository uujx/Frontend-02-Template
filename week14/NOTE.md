# Week14 学习笔记

- [Week14 学习笔记](#week14-%e5%ad%a6%e4%b9%a0%e7%ac%94%e8%ae%b0)
  - [手势与动画 | 手势的基本知识](#%e6%89%8b%e5%8a%bf%e4%b8%8e%e5%8a%a8%e7%94%bb--%e6%89%8b%e5%8a%bf%e7%9a%84%e5%9f%ba%e6%9c%ac%e7%9f%a5%e8%af%86)
    - [问题：](#%e9%97%ae%e9%a2%98)
    - [手势](#%e6%89%8b%e5%8a%bf)
  - [手势与动画 | 实现鼠标操作](#%e6%89%8b%e5%8a%bf%e4%b8%8e%e5%8a%a8%e7%94%bb--%e5%ae%9e%e7%8e%b0%e9%bc%a0%e6%a0%87%e6%93%8d%e4%bd%9c)
  - [手势与动画 | 实现手势的逻辑](#%e6%89%8b%e5%8a%bf%e4%b8%8e%e5%8a%a8%e7%94%bb--%e5%ae%9e%e7%8e%b0%e6%89%8b%e5%8a%bf%e7%9a%84%e9%80%bb%e8%be%91)
  - [手势与动画 | 处理鼠标事件](#%e6%89%8b%e5%8a%bf%e4%b8%8e%e5%8a%a8%e7%94%bb--%e5%a4%84%e7%90%86%e9%bc%a0%e6%a0%87%e4%ba%8b%e4%bb%b6)
  - [手势与动画 | 派发事件](#%e6%89%8b%e5%8a%bf%e4%b8%8e%e5%8a%a8%e7%94%bb--%e6%b4%be%e5%8f%91%e4%ba%8b%e4%bb%b6)
  - [手势与动画 | 实现一个 flick 事件](#%e6%89%8b%e5%8a%bf%e4%b8%8e%e5%8a%a8%e7%94%bb--%e5%ae%9e%e7%8e%b0%e4%b8%80%e4%b8%aa-flick-%e4%ba%8b%e4%bb%b6)
  - [手势与动画 | 封装](#%e6%89%8b%e5%8a%bf%e4%b8%8e%e5%8a%a8%e7%94%bb--%e5%b0%81%e8%a3%85)

===

## 手势与动画 | 手势的基本知识

### 问题：

1. 微小操作也会造成位移
2. 触屏，微小位移；之前没支持触屏；手势区分：点击和拖拽

### 手势

1. start - tap - end
2. start - 移动 10px(容错：Retina 屏，10 是经验值) - pan start - move - pan (move) - end - pan end
3. start - 移动 10px（容错：Retina 屏，10 是经验值） - pan start - move - pan (move) - end 且速度快 - flick (类似 swipe)
4. start - 0.5s 按压 - press start - 移动 10px - 进入 pan start (容易遗漏)
5. start - 0.5s 按压 - press start - end - press end

===

## 手势与动画 | 实现鼠标操作

1. touch 事件一旦触发就会触发 move，move 和 touch 一定会触发在同一个元素上，不管手移动到哪里

   - 因为鼠标不点击也可以 move，要监听 down 之后的 move，所以需要把 move 写在 down 里面
   - 但是 touch 事件不存在这个因素，所以写在同级就好

2. 由于支持多点触摸，touch 的 event 里面包括多个触点坐标; 但是浏览器里没办法模拟多点触摸

   - identifier: start, end, move 都有一个唯一的标识符，去 identify 在移动的触点

3. touchcancel 事件：触屏事件被打断时触发，不会触发 end 事件：比如 3s 后 alert

> 抽象一组 start，move，end，cancel 函数出来去处理一个点，编码过程中就不用考虑是 mouse 事件还是 touch 事件了

===

## 手势与动画 | 实现手势的逻辑

===

## 手势与动画 | 处理鼠标事件

使用全局变量来管理状态是错误的，因为有左右键区分

如果不适用全局，那就只能在函数调用时候传入 context

在 touchstart 里创建 context，在 end 和 cancel 里删除 context，context 用一个全局 map 来保存，使用 event.identifier 作为 key

在 mouse 事件里，有一个 event.button = 0,1,2,3,4 代表鼠标左中右键

mousemove 事件的 event.buttons 是掩码，0b00001 表示左键；这个 event.buttons 和 mousedown 里的 event.button 顺序不一样，中键和右键的顺序相反，需要额外逻辑

===

## 手势与动画 | 派发事件

new Event() / new CustomEvent()

element.dispatchEvent(event)

===

## 手势与动画 | 实现一个 flick 事件

flick 事件需要判断速度

对速度的判断不能使用两点之间，因为根据浏览器实现的不同，会有较大误差

所以应该根据数个点，取平均

速度 v 的单位: px/ms，像素每毫秒

如果速度 > 1.5, 就认为算比较快的

===

## 手势与动画 | 封装

信息流向：

1. listen
2. recognize
3. dispatch
