/**
 * This function takes in a string and try to find character 'a' in it.
 * @param {String} string The string to be evaluated
 * @return {Boolean} True if there is 'a' in this string
 */
function findA(string) {
  for (let ch of string) {
    if (ch === 'a') return true
  }
  return false
}

/**************************************************/

/**
 * This function takes in a string and try to find 'ab' in it.
 * @param {String} string The string to be evaluated
 * @return {Boolean} True if there is 'ab' in this string
 */
function findAB(string) {
  for (let i = 0; i < string.length - 1; i++) {
    if (string[i] === 'a' && string[i + 1] === 'b') {
      return true
    }
  }
  return false
}

function findAB1(string) {
  let foundA = false
  for (let ch of string) {
    if (ch === 'a') {
      foundA = true
    } else if (foundA && ch === 'b') {
      return true
    } else {
      foundA = false
    }
  }
  return false
}

/**************************************************/

/**
 * This function takes in a string and try to find 'abcdef' in it.
 * @param {String} string The string to be evaluated
 * @return {Boolean} True if there is 'abcdef' in this string
 */
function findABCDEF(string) {
  let foundA = false,
    foundB = false,
    foundC = false,
    foundD = false,
    foundE = false

  for (let ch of string) {
    if (ch === 'a') {
      foundA = true
      foundB = false
      foundC = false
      foundD = false
      foundE = false
    } else if (foundA && !foundB && ch === 'b') {
      foundB = true
      foundC = false
      foundD = false
      foundE = false
    } else if (foundB && !foundC && ch === 'c') {
      foundC = true
      foundD = false
      foundE = false
    } else if (foundC && !foundD && ch === 'd') {
      foundD = true
      foundE = false
    } else if (foundD && !foundE && ch === 'e') {
      foundE = true
    } else if (foundE && ch === 'f') {
      return true
    } else {
      foundA = false
      foundB = false
      foundC = false
      foundD = false
      foundE = false
    }
  }

  return false
}

// console.log(findABCDEF('abacdef'))

/**************************************************/

// /**
//  * A finite state machine method of checking whether 'abcdef' is in a given string.
//  * @param {String} string A String to be evaluated
//  * @return {Boolean} true if 'abcdef' is found
//  */
// function stateMachineFindABCDEF(string) {
//   let state = start
//   for (let ch of string) {
//     state = state(ch)
//   }

//   return state === end
// }

// function start(c) {
//   if (c === 'a') {
//     return foundA
//   } else {
//     return start
//   }
// }

// // If found 'abcdef', it would reach this end function and stuck in here, meaning the state would not change ever since
// function end(c) {
//   return end
// }

// // For each foundX function, if the given char is not the one expected, don't skip it and try to check from start
// function foundA(c) {
//   if (c === 'b') {
//     return foundB
//   } else {
//     return start(c)
//   }
// }

// function foundB(c) {
//   if (c === 'c') {
//     return foundC
//   } else {
//     return start(c)
//   }
// }

// function foundC(c) {
//   if (c === 'd') {
//     return foundD
//   } else {
//     return start(c)
//   }
// }

// function foundD(c) {
//   if (c === 'e') {
//     return foundE
//   } else {
//     return start(c)
//   }
// }

// function foundE(c) {
//   if (c === 'f') {
//     return end
//   } else {
//     return start(c)
//   }
// }

// console.log(stateMachineFindABCDEF('ababcdef'))

/**************************************************/

// function stateMachineFindABCABX(string) {
//   let state = start
//   for (let ch of string) {
//     state = state(ch)
//   }
//   return state === end
// }

// function start(c) {
//   if (c === 'a') {
//     return foundA
//   } else {
//     return start
//   }
// }

// function end(c) {
//   return end
// }

// function foundA(c) {
//   if (c === 'b') {
//     return foundB
//   } else {
//     return start(c)
//   }
// }

// function foundB(c) {
//   if (c === 'c') {
//     return foundC
//   } else {
//     return start(c)
//   }
// }

// function foundC(c) {
//   if (c === 'a') {
//     return foundA2
//   } else {
//     return start(c)
//   }
// }

// function foundA2(c) {
//   if (c === 'b') {
//     return foundB2
//   } else {
//     return start(c)
//   }
// }

// // If the last one is c, then we found the match; if it is not, we need to consider the cases when it is 'c' or 'a', so we change the state to foundB and let foundB to handle the case of 'c'; if it is still not c, foundB will handle it to start to check if it is 'a'.
// function foundB2(c) {
//   if (c === 'x') {
//     return end
//   } else {
//     return foundB(c)
//   }
// }

// console.log(stateMachineFindABCABX('abcabax'))

/**************************************************/

function stateMachineFindABABABX(string) {
  let state = start
  for (let ch of string) {
    state = state(ch)
  }
  return state === end
}

function start(c) {
  if (c === 'a') {
    return foundA
  } else {
    return start
  }
}

function end(c) {
  return end
}

function foundA(c) {
  if (c === 'b') {
    return foundB
  } else {
    return start(a)
  }
}

function foundB(c) {
  if (c === 'a') {
    return foundA1
  } else {
    return start
  }
}

function foundA1(c) {
  if (c === 'b') {
    return foundB1
  } else {
    return start(c)
  }
}

function foundB1(c) {
  if (c === 'a') {
    return foundA2
  } else {
    return start
  }
}

function foundA2(c) {
  if (c === 'b') {
    return foundB2
  } else {
    return start(a)
  }
}

// If it is not 'x', consider it is 'a' or 'b'
// If it is 'a', we should return to state foundB1
// If it is 'b' or anything else, foundB1 will change the state to start
function foundB2(c) {
  if (c === 'x') {
    return end
  } else {
    return foundB1(c)
  }
}

console.log(stateMachineFindABABABX('abaabababx'))
console.log(stateMachineFindABABABX('ababababx'))
console.log(stateMachineFindABABABX('abcabababx'))
console.log(stateMachineFindABABABX('abababa'))
