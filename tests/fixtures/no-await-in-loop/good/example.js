async function goodLooping(promises) {
  let results = await Promise.all(promises);

  return results;
}

goodLooping([]);
