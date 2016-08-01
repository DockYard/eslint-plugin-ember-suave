const wrap = (f, g) => {
  return (...args) => g.apply(g, [f].concat(args));
}
