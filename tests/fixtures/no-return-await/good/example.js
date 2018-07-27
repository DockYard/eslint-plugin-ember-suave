async function returnAfterAssigningAwait() {
  let x = await fetch('https://example.com');
  return x;
}

async function returnWithoutAwait() {
  return fetch('https://example.com');
}

async function returnInsideTry() {
  try {
    return await fetch('https://example.com');
  } catch(e) {
    return 'hello from the other side';
  }
}
