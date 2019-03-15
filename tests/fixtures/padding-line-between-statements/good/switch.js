let a = { kind: 'button' };

switch (a.kind) {
  case 'button':
    a = 'button';
    break;
  default:
    a = 'not a button';
    break;
}

console.log(a);
