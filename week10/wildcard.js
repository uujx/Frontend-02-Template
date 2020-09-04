function find(source, pattern) {
  // 1. count the number of *
  let starCount = 0
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '*') {
      starCount++
    }
  }
  // special case: star count = 0
  if (starCount === 0) {
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] !== source[i] && pattern[i] !== '?') {
        return false
      }
    }
    return true
  }

  // 2. deal with the part before the first *
  let i = 0,
    lastIndex = 0
  for (i = 0; pattern[i] !== '*'; i++) {
    if (pattern[i] !== source[i] && pattern[i] !== '?') {
      return false
    }
  }
  lastIndex = i

  // 3. center parts before the last *
  //    each part is in format of (*abc)
  for (let p = 0; p < starCount - 1; p++) {
    i++
    let subPattern = ''
    while (pattern[i] !== '*') {
      subPattern += pattern[i]
      i++
    }

    // use RegExp
    let reg = new RegExp(subPattern.replace(/\?/g, '[\\s\\S]'), 'g')
    reg.lastIndex = lastIndex

    if (!reg.exec(source)) return false

    lastIndex = reg.lastIndex
  }

  // 4. deal with the last part after the last *
  for (
    let j = 0;
    j <= source.length - lastIndex && pattern[pattern.length - 1] !== '*';
    j++
  ) {
    if (
      pattern[pattern.length - j] !== source[source.length - j] &&
      pattern[pattern.length - j] !== '?'
    ) {
      return false
    }
  }

  return true
}
