// unfinished, shell be reimplementation of gxpFile.js 
class Gpx {
  constructor(dom) {
    Object.defineProperty(this, "dom", { value: dom });
  }
  valueOf() {
    return this.dom.toString();
  }
}
export { gpx };