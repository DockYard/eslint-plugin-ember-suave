async function badLooping(promises) {
  let newArray = [];

  for (let i = 0; i < promises.length; i++) {
    newArray.push(await promises[i]);
  }

  return newArray;
}

badLooping([]);
