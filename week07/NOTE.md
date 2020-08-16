# Week7 学习笔记

- [Week7 学习笔记](#week7-%e5%ad%a6%e4%b9%a0%e7%ac%94%e8%ae%b0)
  - [CSS 排版 | 盒](#css-%e6%8e%92%e7%89%88--%e7%9b%92)
  - [CSS 排版 | 正常流](#css-%e6%8e%92%e7%89%88--%e6%ad%a3%e5%b8%b8%e6%b5%81)
  - [CSS 排版 | 正常流的行级排布](#css-%e6%8e%92%e7%89%88--%e6%ad%a3%e5%b8%b8%e6%b5%81%e7%9a%84%e8%a1%8c%e7%ba%a7%e6%8e%92%e5%b8%83)
  - [CSS 排版 | 正常流的块级排布](#css-%e6%8e%92%e7%89%88--%e6%ad%a3%e5%b8%b8%e6%b5%81%e7%9a%84%e5%9d%97%e7%ba%a7%e6%8e%92%e5%b8%83)
    - [float 与 clear](#float-%e4%b8%8e-clear)
    - [float 导致的重排](#float-%e5%af%bc%e8%87%b4%e7%9a%84%e9%87%8d%e6%8e%92)
    - [margin collapse](#margin-collapse)
  - [CSS 排版 | BFC 合并](#css-%e6%8e%92%e7%89%88--bfc-%e5%90%88%e5%b9%b6)
  - [CSS 排版 | Flex 排版](#css-%e6%8e%92%e7%89%88--flex-%e6%8e%92%e7%89%88)
  - [CSS 动画与绘制 | 动画](#css-%e5%8a%a8%e7%94%bb%e4%b8%8e%e7%bb%98%e5%88%b6--%e5%8a%a8%e7%94%bb)
    - [Animation：](#animation)
    - [Transition](#transition)
  - [CSS 动画与绘制 | 颜色](#css-%e5%8a%a8%e7%94%bb%e4%b8%8e%e7%bb%98%e5%88%b6--%e9%a2%9c%e8%89%b2)
    - [CMYK - RGB](#cmyk---rgb)
    - [HSL - HSV](#hsl---hsv)
  - [CSS 动画与绘制 | 绘制](#css-%e5%8a%a8%e7%94%bb%e4%b8%8e%e7%bb%98%e5%88%b6--%e7%bb%98%e5%88%b6)
    - [应用技巧](#%e5%ba%94%e7%94%a8%e6%8a%80%e5%b7%a7)

## CSS 排版 | 盒

Tag - Element - Box

Box Modal:

- content
- padding
- border
- margin

box-sizing:

- content-box
- border-box

---

## CSS 排版 | 正常流

三代排版技术：

1. 正常流
2. flex - 主流
3. grid

排版：把盒和文字放到正确的位置

正常流排版：

1. 收集盒和文字进行
2. 计算盒在行中的排布
3. 计算行的排布

规则：

1. 一行从左向右排：inline-level-box
2. block-level-box
3. line-box

IFC：Inline Level Formatting Context
BFC：Block Level Formatting Context

---

## CSS 排版 | 正常流的行级排布

baseline 基线对齐

行模型：

- line-top
- text-top
- baseline
- text-bottom
- line-bottom

盒的混排： 盒足够大，会把 line-top 撑开 - 盒的顺序和尺寸都会影响 line-top 和 line-bottom 的位置, 只有 line-top 和 line-bottom 会被撑开，text-top/bottom 不会

行内对齐：

```css
vertical-align: top/middle/bottom/text-top/text-bottom;
```

---

## CSS 排版 | 正常流的块级排布

### float 与 clear

float：

- 已经脱离正常流
- 不止影响自己这一行，只要是高度范围内的行盒，都会调整大小
- float 元素能 float 的范围，受上一个 float 元素影响， 产生堆叠

clear：

- clear：right/left

Ex - float 布局

所有元素都加上 float 来替代 inline-block，造成的效果类似正常流
换行：+ clear: left, \<br />不好用

### float 导致的重排

float 元素影响其他元素的排版

> 不建议频繁使用 float，有 flex 和 grid 也基本不需要使用 float

### margin collapse

BFC 中，几个 Block-Box 上下的 margin 会 collapse

只会发生在 正常流 BFC 中，不会在 flex 和 grid

---

## CSS 排版 | BFC 合并

Block：

- Block Container：里面有 BFC 的
- Block-level Box: 外面有 BFC 的
- **Block Box** = Block Container + Block-level Box: 里外都有 BFC 的

Block Container：

- block
- inline-block
- table-cell
- flex item
- grid cell
- table-caption

Block-level Box:

- display: block; / inline-block
- display: flex; / inline-flex
- display: table; / inline-table
- display: grid / inline-grid
- display: run-in 跟着上面的元素

创建 BFC：

- floats float 元素里面
- absolutely positioned elements 绝对定位元素里面
- block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes,
  - flex items
  - grid cell
  - ...
- and block boxes with 'overflow' other than 'visible'

BFC 合并：

默认能容纳正常流的盒，都认为会创建 BFC，除了一个例外：

- block box (里外都是 BFC) && overflow:visible
  - BFC 合并与 float:
    - 如果 block box 的 overflow 不是 visible，会创建 BFC，整个 block box 放入 BFC 中，整个 block box 受 BFC 影响
    - 如果 block box 的 overflow 是 visible，不创建 BFC，BFC 里的行盒和 float 影响
  - BFC 合并与边距折叠：
    - 边距折叠只会发生在同一个 BFC 里
    - 如果创建了新的 BFC，不会发生折叠
    - 如果没有创建新的 BFC，存在同向边距折叠

---

## CSS 排版 | Flex 排版

Flex 排版：

1. 收集盒进行
2. 计算盒在主轴方向的排布
3. 计算盒在交叉轴方向的排布

分行：

- 根据主轴尺寸，把元素进行
- 如果设置了 no-wrap，强行放入一行

计算主轴方向：

- 找出所有 flex 元素
- 把主轴方向剩余尺寸按比例分配给 flex 元素
- 若剩余空间为负，所有 flex 元素为 0，等比例压缩剩余元素

计算交叉轴方向：

- 根据每一行中最大元素尺寸计算行高
- 根据行高 flex-align 和 item-align，确定元素具体位置

---

## CSS 动画与绘制 | 动画

CSS 控制表现：

1. 控制元素位置，尺寸信息
2. 控制绘制和渲染信息
3. 控制交互和动画信息

### Animation：

1. @keyframes 定义
2. animation：使用

- animation-name：动画名
- animation-duration：动画时长
- animation-timing-function：动画的时间曲线
- animation-delay：动画开始前的延迟
- animation-iteration-count：动画播放次数
- animation-direction：动画的方向

> 小技巧：在 animation 中使用 transition，可以分段指定 timing function

### Transition

- transition-property：要变换的属性
- transition-duration：变换的时长
- transition-timing-function：时间曲线
- transition-delay：延迟

Timing Function - _三次贝塞尔曲线_：

横轴时间，纵轴进展，两个控制点

**ease：缓冲曲线，推荐使用**
linear：直线
ease-in：缓动启动，用于结束移除屏幕
ease-out：缓动结束，用于元素出现在屏幕

---

## CSS 动画与绘制 | 颜色

### CMYK - RGB

CMY 是 RGB 的补色，K 为了经济考虑

### HSL - HSV

---

## CSS 动画与绘制 | 绘制

1. 几何图形
   - border
   - box-shadow
   - border-radius
2. 文字
   - font
   - text-decoration
3. 位图
   - background-image

### 应用技巧

data uri + svg

---
