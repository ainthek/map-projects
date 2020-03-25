const [, , TAG_NAME, START_DATE] = process.argv;
const startDate = Date.parse(START_DATE);

if (!START_DATE || isNaN(startDate)) {
  console.error("Invalid START_DATE parameter");
  process.exit(1);
}
if (!TAG_NAME) {
  console.error("Invalid TAG_NAME parameter");
  process.exit(1);
}
const { EOL } = require("os");
var rl = require("readline");

rl.createInterface({ input: process.stdin, /* output: process.stdout */ })
  .on("line", processLine);

let delta;

const TAG_RE = new RegExp(`<${TAG_NAME}>(.*)<\/${TAG_NAME}>`)

function processLine(line) {

  const [match, when] = line.match(TAG_RE) || [];
  if (match) {
    const whenDate = Date.parse(when);
    if (!delta) {
      delta = whenDate - startDate;
    }
    const whenAligned = new Date(whenDate - delta).toISOString().replace(/[.]000Z$/, "Z");
    process.stdout.write(`<${TAG_NAME}>${whenAligned}</${TAG_NAME}>${EOL}`);
    console.error("Aligned:", when, "->", whenAligned);
  } else {
    process.stdout.write(`${line}${EOL}`);
  }
}