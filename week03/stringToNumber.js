/**
 * This function takes as input a number string in differnt radix
 * and convert it to Number
 * If the input is not a string, it will return 0
 * @param {String} str String to be converted to Number
 * @return {Number}
 */
function stringToNumber(str) {
  if (str.length < 2) {
    let parsed = parseInt(str)
    return isNaN(parsed) ? 0 : parsed
  }

  const radix = str[1]
  const numberPart = str.slice(2)
  let parsed

  if (radix === 'b') parsed = parseInt(numberPart, 2)
  else if (radix === 'o') parsed = parseInt(numberPart, 8)
  else if (radix === 'd') parsed = parseInt(numberPart, 10)
  else if (radix === 'x') parsed = parseInt(numberPart, 16)
  else parsed = parseInt(str)

  if (isNaN(parsed)) return 0

  return parsed
}

console.log(stringToNumber('0b11'))
console.log(stringToNumber('0o11'))
console.log(stringToNumber('0d11'))
console.log(stringToNumber('0x11'))
console.log(stringToNumber('11'))
console.log(stringToNumber('1'))
console.log(stringToNumber('a'))
console.log(stringToNumber('abcdefg'))
