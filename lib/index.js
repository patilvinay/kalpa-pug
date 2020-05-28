/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
const pug = require('pug');
const fs = require("fs");
const path = require("path");
// *
//
resolvePath = (file, pwd) => {
  let fullFileName = file;
  // eslint-disable-next-line prefer-const
  let _var = {};
  let _file = path.basename(fullFileName);
  let directory = path.dirname(fullFileName);
  // eslint-disable-next-line prettier/prettier
  fullFileName = path.isAbsolute(fullFileName) ?
    // eslint-disable-next-line prettier/prettier
    fullFileName :
    path.join(pwd, directory, _file);
  return fullFileName;
}
// *
//
const process = (obj) => {
  const _obj = obj.node["kalpa-pug"];
  const compiledFunction = pug.compileFile('template.pug');
  _str = compiledFunction({
    imported: obj.import,
    vars: obj.vars,
    env: obj.env
  })
  let fullFileName = _obj.vars.dest;
  let fullFileName = resolvePath(_obj.vars.dest, obj.__data.bwd)
  fs.writeFileSync(fullFileName, _str);
};
// ****
//
exports.process = process;
