const { spawn } = require("child_process");
const split = require("split2");
const { EOL } = require("os");

module.exports = { spawnP, spawnP2 }

function spawnP(cmd, args, opts, split1 = split(), split2 = split()) {
  // could be exec but I like the idea of streaming
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, opts);
    const stdout = [];
    const stderr = [];
    p.stdout.setEncoding("utf8");
    p.stderr.setEncoding("utf8");
    p.stdout.pipe(split1).on("data", (data) => stdout.push(data));
    p.stderr.pipe(split2).on("data", (data) => stderr.push(data));

    p.on("close", (code) => { //FIXME: why not exit ? something does not work with exit 
      //console.error("exit", code, cmd, args, opts)
      code === 0 ?
        resolve(stdout) :
        reject(stderr)
    })

  })
}

function spawnP2(cmd, args, opts, data) {
  // could be exec but I like the idea of streaming
  const strData = Array.isArray(data) ? data.join(EOL) : data;
  //console.error("spawnP:\n", [cmd, ...args].join(" "));

  return new Promise((resolve, reject) => {
    debugger;
    const p = spawn(cmd, args, opts);
    const stdout = [];
    const stderr = [];
    p.stdout.setEncoding("utf8");
    p.stderr.setEncoding("utf8");
    p.stdout.pipe(split()).on("data", (data) => stdout.push(data));
    p.stderr.pipe(split()).on("data", (data) => stderr.push(data));
    if (strData) {
      p.stdin.write(strData);
      p.stdin.end();
    }
    p.on("close", (code) => { //FIXME: why not exit ? something does not work with exit 
      //console.error("exit", code, cmd, args, opts)
      //if (code) console.error(stderr + "");
      code === 0 ?
        resolve(stdout) : //
        reject("cmd failed with error:" + stderr.join(EOL));
    })
  })
}