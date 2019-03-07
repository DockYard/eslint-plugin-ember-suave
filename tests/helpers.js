const indentLine = (line) => `        ${line}`;
module.exports = {
  codeBlock([firstLine, ...rest]) {
    return `${firstLine}\n${rest.map(indentLine).join('\n')}`;
  }
};
