const lists = [
  'Array',
  'ArrayBuffer',
  'Atomics',
  'BigInt',
  'BigInt64Array',
  'BigUint64Array',
  'Boolean',
  'DataView',
  'Date',
  'Error',
  'EvalError',
  'Float32Array',
  'Float64Array',
  'Function',
  'GeneratorFunction',
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Map',
  'Number',
  'Object',
  'Promise',
  'Proxy',
  'RangeError',
  'ReferenceError',
  'RegExp',
  'Set',
  'SharedArrayBuffer',
  'String',
  'Symbol',
  'SyntaxError',
  'TypedArray',
  'TypeError',
  'Uint8Array',
  'Uint8ClampedArray',
  'Uint16Array',
  'Uint32Array',
  'URIError',
  'WeakSet',
  'WeakMap'
]

const data = {
  edges: [
    {
      source: 'Object',
      target: 'Array'
    },
    {
      source: 'Object',
      target: 'ArrayBuffer'
    },
    {
      source: 'Object',
      target: 'Atomics'
    },
    {
      source: 'Object',
      target: 'BigInt'
    },
    {
      source: 'Object',
      target: 'Boolean'
    },
    {
      source: 'Object',
      target: 'DataView'
    },
    {
      source: 'Object',
      target: 'Date'
    },
    {
      source: 'Object',
      target: 'Error'
    },
    {
      source: 'Object',
      target: 'Function'
    },
    {
      source: 'Object',
      target: 'GeneratorFunction'
    },
    {
      source: 'Object',
      target: 'Map'
    },
    {
      source: 'Object',
      target: 'Number'
    },
    {
      source: 'Object',
      target: 'Promise'
    },
    {
      source: 'Object',
      target: 'Proxy'
    },
    {
      source: 'Object',
      target: 'RegExp'
    },
    {
      source: 'Object',
      target: 'Set'
    },
    {
      source: 'Object',
      target: 'SharedArrayBuffer'
    },
    {
      source: 'Object',
      target: 'String'
    },
    {
      source: 'Object',
      target: 'Symbol'
    },
    {
      source: 'Object',
      target: 'TypedArray'
    },
    {
      source: 'Object',
      target: 'WeakMap'
    },
    {
      source: 'Object',
      target: 'WeakSet'
    },
    {
      source: 'Error',
      target: 'EvalError'
    },
    {
      source: 'Error',
      target: 'RangeError'
    },
    {
      source: 'Error',
      target: 'ReferenceError'
    },
    {
      source: 'Error',
      target: 'SyntaxError'
    },
    {
      source: 'Error',
      target: 'TypeError'
    },
    {
      source: 'Error',
      target: 'URIError'
    },
    {
      source: 'TypedArray',
      target: 'BigInt64Array'
    },
    {
      source: 'TypedArray',
      target: 'BigUint64Array'
    },
    {
      source: 'TypedArray',
      target: 'Float32Array'
    },
    {
      source: 'TypedArray',
      target: 'Float64Array'
    },
    {
      source: 'TypedArray',
      target: 'Int8Array'
    },
    {
      source: 'TypedArray',
      target: 'Int16Array'
    },
    {
      source: 'TypedArray',
      target: 'Int32Array'
    },
    {
      source: 'TypedArray',
      target: 'Uint8Array'
    },
    {
      source: 'TypedArray',
      target: 'Uint8ClampedArray'
    },
    {
      source: 'TypedArray',
      target: 'Uint16Array'
    },
    {
      source: 'TypedArray',
      target: 'Uint32Array'
    }
  ]
}

data.nodes = lists.map((node) => {
  return {
    id: node,
    label: node
  }
})

const graph = new G6.Graph({
  container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
  width: 1000, // Number，必须，图的宽度
  height: 1000, // Number，必须，图的高度
  layout: {
    type: 'radial',
    center: [ 500, 500 ],     // 可选，默认为图的中心
    linkDistance: 300,         // 可选，边长
    maxIteration: 1000,       // 可选
    focusNode: 'Object',      // 可选
    unitRadius: 200,          // 可选
    nodeSpacing: 100,
    preventOverlap: true,     // 可选，必须配合 nodeSize
    nodeSize: 50,             // 可选
    strictRadial: true,       // 可选
    workerEnabled: true       // 可选，开启 web-worker
  },
  defaultNode: {
    shape: 'circle',
    size: [50],
    color: '#05386b',
    style: {
      fill: '#05386b',
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: '#EDF5E1',
        fontSize: 10
      }
    }
  },
  defaultEdge: {
    style: {
      stroke: '#FFF'
    }
  }
})

graph.data(data) // 读取 Step 2 中的数据源到图上
graph.render() // 渲染图
