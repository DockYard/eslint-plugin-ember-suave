let a = 'foo';

if (typeof a == 'string') {
  console.log('a is a string');
}

/* eslint-disable-next-line no-constant-condition */
if (1 == 0) {
  console.log('this is never true');
}

if (a == null) {
  console.log('a is null');
}

if (typeof a != 'number') {
  console.log('a is not a number');
}

/* eslint-disable-next-line no-constant-condition */
if (1 != 0) {
  console.log('this is always true');
}

if (a != null) {
  console.log('a is not null');
}
