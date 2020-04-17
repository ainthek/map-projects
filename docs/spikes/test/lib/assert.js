
export {
    assertContains
};

import assert from "assert";
import traverse from "traverse";
import deepmerge from "deepmerge";

// helper
function assertContains(real, expected) {
    assert.deepStrictEqual(real, merge(clone(real), expected));
}
function clone(obj) {
    if (typeof obj === "function") { //see test for reasoning, we need to clone defs
        obj = Object.assign({}, obj);
    }
    return traverse(obj).clone();
}
// deep clone of object
function merge(target, source, options) {
    options || (options = { mutate: true /* , clone:false */ });
    options.clone && (source = clone(source));
    options.clone && !options.mutate && (target = clone(target));
    var r = deepmerge(target, source);
    return options.mutate ? Object.assign(target, r) : r;
}
