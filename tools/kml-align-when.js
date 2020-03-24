const [, , START_DATE] = process.argv;
const startDate = Date.parse(START_DATE);
if(!START_DATE || isNaN(startDate)){
	console.error("Invalid START_DATE parameter");
	process.exit(1);
}
const { EOL } = require("os");
var rl = require("readline");

rl.createInterface({ input: process.stdin, /* output: process.stdout */ })
  .on("line", processLine);

let delta;

function processLine(line) {

  const [match, when] = line.match(/<when>(.*)<\/when>/)||[];
  if (match) {
    const whenDate = Date.parse(when);
    if (!delta) {
      delta = whenDate - startDate;
    }
    const whenAligned = new Date(whenDate - delta).toISOString().replace(/[.]000Z$/, "Z");
    process.stdout.write(`<when>${whenAligned}</when>${EOL}`);
  } else {
    process.stdout.write(`${line}${EOL}`);
  }
}