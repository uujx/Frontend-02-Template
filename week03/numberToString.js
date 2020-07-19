/**
 * This function converts a number to a string in target radix
 * @param {Number} num
 * @param {Number} targetRadix Target radix, has to be one of [2, 8, 10 ,16]
 */
function numberToString(num, targetRadix) {
  if (!Number.isInteger(num)) {
    throw new Error('Input has to be a number!')
  }

  if ([2, 8, 10, 16].indexOf(targetRadix) < 0) {
    throw new Error('Target radix has to be one of [2, 8, 10, 16]!')
  }

  const radix = {
    2: '0b',
    8: '0o',
    10: '0d',
    16: '0x'
  }

  return radix[targetRadix] + num.toString(targetRadix)
}

console.log(numberToString(11, 2))
console.log(numberToString(11, 8))
console.log(numberToString(11, 10))
console.log(numberToString(11, 16))

console.log(numberToString(11, 100))
console.log(numberToString('abc', 16))
