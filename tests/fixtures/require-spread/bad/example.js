const wrap = (f, g) => {
  return (...args) => g.apply(null, [f].concat(args));
};

wrap(1, (a) => a + 2);
