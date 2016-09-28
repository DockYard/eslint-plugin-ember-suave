module.exports = {
  codeBlock: function codeBlock(array) {
    var firstLine = array[0] + '\n';
    array.shift();

    return firstLine + array
      .map(function(line) {
        return '        ' + line + '\n';
      })
      .reduce(function(prev, next) {
        return prev + next;
      })
      .slice(0, -1);
  }
};
