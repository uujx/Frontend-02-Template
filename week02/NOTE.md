# 学习笔记

## 产生式（BNF）

> 语法定义 - 语法产生式

- 尖括号括起来的名称表示语法结构
- 语法结构分为**基础结构**和需要用其他语法结构定义的**复合结构**
  - 基础结构称为终结符
  - 复合结构称为非终结符
- 引号和中间的字符表示终结符
- 可以有括号
- \* 表示 重复多次
- | 表示 或
- \+ 表示 至少一次

```
  // 四则运算BNF
  <MultiplicativeExpression>::=<Number>|
      <MultiplicativeExpression>"*"<Number>|
      <MultiplicativeExpression>"/"<Number>
  <AdditiveExpression>::=<MultiplicativeExpression>|
      <AdditiveExpression>"+"<MultiplicativeExpression>|
      <AdditiveExpression>"-"<MultiplicativeExpression>
```

### 1. 什么是 BNF 范式

> BNF(Backus-Naur Form)范式，中文名巴科斯范式，缩写为 BNF。由约翰·巴科斯（John Backus）和彼得·诺尔（Peter Naur）在 1960 年提出，用来描述 ALGOL60 语言的语法。

### 2. BNF 范式的符号

BNF 仅包含三个符号：

1. ::=，表示定义为
2. |，表示或
3. <>，用来区分非终结符（表示非终结符）

> 栗子：\<A> ::= a | bc | c\<B>

> 意思：  
> \<A>被定义为 a 或 bc 或 c\<B>，即我们可以用右边的来替换或者说表示\<A>的内容。需要注意的是\<B>是一个非终结符，我们可以像定义\<A>那样继续继续对\<B>进行定义，如：
>
> > \<A> ::= a | bc | c\<B>  
> > \<B> ::= f

### 3. BNF 的一些规则（2，3 型语法。即上下文无关语法、正则语法）

1. BNF 产生式的左部仅有一个非终结符
2. 相同左部的产生式合并用“|”隔开
   - \<A> ::= a | bc | c
   - \<C> ::=a | bc | c
   - \<A> | \<C> ::=a | bc | c
3. 非终结符用"<>"标记

### 4. BNF 的一些例子

1. 使用 BNF 定义: 张三（或李四）深情地（或狂野地）歌唱（或奔跑）  
   <句子>::=<主语><谓语>  
   <主语>::=张三 | 李四  
   <谓语>::=<副词><动词>  
   <副词>::=深情地 | 狂野地  
   <动词>::=唱歌 | 奔跑

2. 使用 BNF 定义正则表达式：a(bb)\_c
   \<v0>::=a\<w>
   \<w>::=bb\<w> | c
   其中”bb\<w>“中的\<w>与左部的\<w>表示的内容相同，即”bb\<w>“中的\<w>是一次递归。

起初个人认为的写法：  
\<v0>::=a\<w>  
\<w>::="("bb")"\<w> | "\_"c  
后来发现这样的写法是不正确的。在正则表达式中"*"表示出现任意次数，（）表示分组。
a(bb)*c 中(bb)\*表示 bb 可以被匹配多次，也可以不被匹配到。这样\<w>::=bb\<w> | c 正好满足了这
个要求，\<w>的递归可以多次匹配 bb，而"|"的使用，又可以让 bb 不被匹配到。

3、使用 BNF 定义：无符号十进制数  
<十进制数>::=<无符号整数> | <小数> | <无符号整数><小数>  
<无符号整数>::=<数字> | <数字><无符号整数>  
<小数>::= . <无符号整数>  
<数字>::=0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

### 5. 扩展 BNF（ABNF）

个人理解：ABNF 是在 BNF 的基础上进行扩展的。在 BNF 三个符号的基础上引入了一些新的符号，使得 BNF 产生式的书写更加简介。

扩展的符号：

1. [] ，表示可选项
2. {}，表示重复 0 次或者多次，可以替代 BNF 中的递归  
   使用 ABNF 定义正则表达式：a(bb)\*c  
   \<v0>::= a {bb} c
3. “”，表示终结符，可以看成是<>的缩写形式，<;>使用“;”的表式会更加简便和明了。也可以用粗体字表示终结符，非终结符不加尖括号。

---

## 乔姆斯基谱系（形式语言）

1. 0 型 无限制文法
   - ?::=?
2. 1 型 上下文相关文法
   - ?\<A>?::=?\<B>?
3. 2 型 上下文无关文法
   - \<A>::=?
4. 3 型 正则文法
   - \<A>::=\<A>?
   - \<A>::=?\<A> 错

- 3 型 属于 2 型 属于 1 型 属于 0 型

> EBNF, ABNF

---

## String

### Encoding

- ASCII
- Unicode
- UCS
- GB(国标)
  - GB2312
  - GBK(GB13000)
  - GB18030
- ISO-8859(东欧)
- BIG5(台湾)

#### UTF

- UTF8：默认用一个字节

### String Template

`ab${x}abc${y}abc`

==>

- `ab\${
- }abc\${
- }abc

---

```javascript
// Encode string to UTF-8
function toUTF8(str) {
  var utf8 = []

  for (var i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i)

    if (charcode < 0x80) utf8.push(charcode)
    else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f))
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(
        0xe0 | (charcode >> 12),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      )
    }
    // surrogate pair
    else {
      i++
      charcode = ((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff)
      utf8.push(
        0xf0 | (charcode >> 18),
        0x80 | ((charcode >> 12) & 0x3f),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      )
    }
  }

  // convert dec to hex
  const hexStr = utf8
    .map((cur) => {
      return '\\x' + cur.toString(16).toUpperCase()
    })
    .join('')

  return hexStr
}
```

## Object Basics

### 两个流派

1. 归类：多继承，如 C++
2. 分类：单继承，存在一个基类 Object，如 Java、C#

> **对象设计原则**：行为改变状态 => 维持对象的内聚性

---

## Object in JS

JS 面向对象：原型 -> **原型链**

### Object 属性

1. String
2. Symbol

### Object 值

1. Data Property - 描述状态

   - [[value]]
   - writable
   - enumerable
   - configurable

2. Accessor Property - 描述行为
   - get
   - set
   - enumerable
   - configurable

### Object API

1. 基本对象机制

   - {}
   - .
   - []
   - Object.defineProperty

2. 基于原型的描述对象方法

   - Object.create
   - Object.setPrototypeOf
   - Object.getPrototypeOf

3. 基于分类的方式描述对象

   - new
   - class
   - extends

4. 其他（不建议）
   - new
   - function
   - prototype

### JS 特殊对象

#### Function

> 除了一般对象的属性和原型，函数对象还有一个行为[[call]]，通过 f()来调用 call

```javascript
typeof (() => {}) // 'function'
```

#### Array

> [[length]]

#### Host Objet

> window, setTimeout
