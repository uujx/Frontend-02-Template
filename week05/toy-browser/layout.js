function layout(element) {
  if (!element.computedStyle) {
    return
  }

  const style = getStyle(element)

  // 暂时只处理flex
  if (style.display !== 'flex') {
    return
  }

  // 过滤掉文本节点
  const items = element.children.filter((e) => e.type === 'element')

  items.sort((a, b) => (a.order || 0) - (b.order || 0))

  //
  ;['width', 'height'].forEach((size) => {
    if (style[size] === 'auto' || style[size] === '') {
      style[size] = null
    }
  })

  if (!style.flexDirection || style.flexDirection === 'auto') {
    style.flexDirection = 'row'
  }
  if (!style.alignItems || style.alignItems === 'auto') {
    style.alignItems = 'stretch'
  }
  if (!style.justifyContent || style.justifyContent === 'auto') {
    style.justifyContent = 'flex-start'
  }
  if (!style.flexWrap || style.flexWrap === 'auto') {
    style.flexWrap = 'nowrap'
  }
  if (!style.alignContent || style.alignContent === 'auto') {
    style.alignContent = 'stretch'
  }

  let mainSize,
    mainStart,
    mainEnd,
    mainSign,
    mainBase,
    crossSize,
    crossStart,
    crossEnd,
    crossSign,
    crossBase

  if (style.flexDirection === 'row') {
    mainSize = 'width'
    mainStart = 'left'
    mainEnd = 'right'
    mainSign = +1
    mainBase = 0

    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }

  if (style.flexDirection === 'row-reverse') {
    mainSize = 'width'
    mainStart = 'right'
    mainEnd = 'left'
    mainSign = -1
    mainBase = style.width

    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }

  if (style.flexDirection === 'column') {
    mainSize = 'height'
    mainStart = 'top'
    mainEnd = 'bottom'
    mainSign = +1
    mainBase = style.height

    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }

  if (style.flexDirection === 'wrap-reverse') {
    const tmp = crossStart
    crossStart = crossEnd
    crossEnd = tmp
    crossSign = -1
  } else {
    crossBase = 0
    crossSign = 1
  }

  // auto sizing：width/height没设置，把所有items的mainSize加起来
  let isAutoMainSize = false
  if (!style[mainSize]) {
    style[mainSize] = 0
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const itemStyle = getStyle(item)
      // "!= null" <==> 同时判断null和undefined
      if (itemStyle[mainSize] != null) {
        style[mainSize] += item[mainSize]
      }
    }
    isAutoMainSize = true
  }

  // 收集进行
  let flexLine = []
  const flexLines = [flexLine]

  let mainSpace = style[mainSize]
  let crossSpace = 0

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const itemStyle = getStyle(item)

    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0
    }

    // flex属性，不是display: flex
    // 认为只要带有flex属性，那么可伸缩，就一定可以放进这一行
    if (itemStyle.flex) {
      flexLine.push(item)

      // 不换行 + autoMainSize
    } else if (style.flexWarp === 'nowrap' && isAutoMainSize) {
      mainSpace -= itemStyle[mainSize]

      if (itemStyle[crossSize] != null) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      }

      flexLine.push(item)

      // 换行逻辑
    } else {
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize]
      }

      // 剩余空间不够 - 换行
      if (mainSpace < itemStyle[mainSize]) {
        flexLine.mainSpace = mainSpace
        flexLine.crossSpace = crossSpace

        // 创建新行
        flexLine = [item]
        flexLines.push(flexLine)

        mainSapce = style[mainSize]
        crossSpace = 0
      } else {
        flexLine.push(item)
      }

      if (itemStyle[crossSize] != null) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      }
      mainSpace -= itemStyle[mainSize]
    }
  }

  // 计算主轴 - 如何分配剩余空间
  flexLine.mainSpace = mainSpace

  if (style.flexWrap === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace =
      style[crossSize] !== undefined ? style[crossSize] : crossSpace
  } else {
    flexLine.crossSpace = crossSpace
  }

  // 剩余空间 < 0，对所有元素等比压缩
  // overflow, scale every item - happens only if container is single line
  if (mainSpace < 0) {
    // scale = 实际mainSize / 期望mainSize
    const scale = style[mainSize] / (style[mainSize] - mainSpace)
    let currentMain = mainBase

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const itemStyle = getStyle(item)

      // flex item不参加等比压缩
      if (itemStyle.flex) {
        itemStyle[mainSize] = 0
      }

      itemStyle[mainSize] *= scale

      itemStyle[mainStart] = currentMain
      itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]

      currentMain = itemStyle[mainEnd]
    }
  } else {
    // process each flex line
    flexLines.forEach((items) => {
      let mainSpace = items.mainSpace
      let flexTotal = 0

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const itemStyle = getStyle(item)

        if (itemStyle.flex != null) {
          flexTotal += itemStyle.flex
        }
      }

      // 存在flex item - 剩余元素会被完全分配，则不需要使用justifyContent
      if (flexTotal > 0) {
        let currentMain = mainBase

        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          const itemStyle = getStyle(item)

          if (itemStyle.flex) {
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex
          }

          itemStyle[mainStart] = currentMain
          itemStyle[mainEnd] =
            itemStyle[mainStart] + mainSign * itemStyle[mainSize]

          currentMain = itemStyle[mainEnd]
        }

        // 不存在flex item，即存在剩余空间，则使用justifyContent
      } else {
        let currentMain
        let step // 元素之间的间隔

        if (style.justifyContent === 'felx-start') {
          currentMain = mainBase
          step = 0
        } else if (style.justifyContent === 'flex-end') {
          currentMain = mainSpace * mainSign + mainBase
          step = 0
        } else if (style.justifyContent === 'center') {
          currentMain = (mainSpace / 2) * mainSign + mainBase
          step = 0
        } else if (style.justifyContent === 'space-between') {
          currentMain = mainBase
          step = (mainSpace / (items.length - 1)) * mainSign
        } else if (style.justifyContent === 'space-around') {
          step = (mainSpace / items.length) * mainSign
          currentMain = step / 2 + mainBase
        }

        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          const itemStyle = getStyle(item)

          itemStyle[mainStart] = currentMain
          itemStyle[mainEnd] =
            itemStyle[mainStart] + mainSign * itemStyle[mainSize]

          currentMain = itemStyle[mainEnd] + step
        }
      }
    })
  }

  // 计算交叉轴
  // align-items, align-self
  if (!style[crossSize]) {
    crossSpace = 0
    style[crossSize] = 0

    flexLines.forEach((flexLine) => {
      style[crossSize] += flexLine.crossSpace
    })
  } else {
    crossSpace = style[crossSize]
    flexLines.forEach((flexLine) => {
      crossSpace -= flexLine.crossSpace
    })
  }

  if (style.flexWarp === 'wrap-reverse') {
    crossBase = style[crossSize]
  } else {
    crossBase = 0
  }

  let lineSize = style[crossSize] / flexLines.length
  let step

  if (style.alignContent === 'felx-start') {
    crossBase += 0
    step = 0
  } else if (style.alignContent === 'flex-end') {
    crossBase += crossSign * crossSpace
    step = 0
  } else if (style.alignContent === 'center') {
    crossBase += (crossSign * crossSpace) / 2
    step = 0
  } else if (style.alignContent === 'space-between') {
    crossBase += 0
    step = crossSpace / (flexLines.length - 1)
  } else if (style.alignContent === 'space-around') {
    step = crossSpace / flexLines.length
    crossBase += (crossSign * step) / 2
  } else if (style.alignContent === 'stretch') {
    crossBase += 0
    step = 0
  }

  flexLines.forEach((items) => {
    let lineCrossSize =
      style.alignContent === 'stretch'
        ? items.crossSpace + crossSpace / flexLines.length
        : items.crossSpace

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const itemStyle = getStyle(item)

      // item align - 受子元素 alignSelf 和父元素 alignItems 影响
      // alignSelf 优先
      const align = itemStyle.alignSelf || style.alignItems

      if (!itemStyle[crossSize]) {
        itemStyle[crossSize] = align === 'stretch' ? lineCrossSize : 0
      }

      if (align === 'flex-start') {
        itemStyle[crossStart] = crossBase
        itemStyle[crossEnd] =
          itemStyle[crossStart] + crossSign * itemStyle[crossSize]
      } else if (align === 'flex-end') {
        itemStyle[crossStart] = crossBase + crossSign * lineCrossSize
        itemStyle[crossEnd] =
          itemStyle[crossEnd] - crossSign * itemStyle[crossSize]
      } else if (align === 'center') {
        itemStyle[crossStart] =
          crossBase + (crossSign * (lineCrossSize - itemStyle[crossSize])) / 2
        itemStyle[crossEnd] =
          itemStyle[crossStart] + crossSign * itemStyle[crossSize]
      } else if (align === 'stretch') {
        itemStyle[crossStart] = crossBase
        // TODO:
        itemStyle[crossEnd] =
          crossBase + crossSign * ((itemStyle[crossSize] != null) ? itemStyle[crossSize] : 0)
        itemStyle[crossSize] =
          crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
      }
    }

    crossBase += crossSign * (lineCrossSize + step)
  })
}

function getStyle(element) {
  if (!element.style) {
    element.style = {}
  }

  for (let prop in element.computedStyle) {
    const p = element.computedStyle.value
    element.style[prop] = element.computedStyle[prop].value

    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop])
    }
    if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop])
    }
  }

  return element.style
}

module.exports = layout
