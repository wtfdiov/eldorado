export default (a) => {
    if (!isFinite(a)) return 0
    let e = 1
    let p = 0
    while (Math.round(a * e) / e !== a) { e *= 10; p++ }
    return p
  }