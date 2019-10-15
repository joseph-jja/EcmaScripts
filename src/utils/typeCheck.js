// module for checking data types
function typeCheck(o, s, input) {
    return (input instanceof o || (typeof input).toLowerCase() === s) ? true : false;
};

// only exists if it is not undefined
function exists(x) {
    return (typeof x !== 'undefined' && x !== null);
};

function isString(input) {
    return typeCheck(String, "string", input);
};

function isNumber(input) {
    return typeCheck(Number, "number", input);
};

function isArray(input) {
    return Array.isArray(input);
};

function isFunction(input) {
    return typeCheck(Function, "function", input);
};

function isObject(input) {
    return typeCheck(Object, "object", input);
};

function isRegExp(input) {
    return typeCheck(RegExp, "regexp", input);
};

function isTextarea(input) {
    let name = input.nodeName;
    name = (name ? name : "");
    return (name.toLowerCase() === "textarea");
};

function isInput(input) {
    let inp = typeof input,
        name = input.nodeName;
    name = (name ? name : "");
    return (name.toLowerCase() === "input" || (inp.toLowerCase() === "input" && typeof inp['type'] !== 'undefined'));
};

export {
    typeCheck,
    exists,
    isString,
    isNumber,
    isArray,
    isFunction,
    isObject,
    isRegExp,
    isTextarea,
    isInput
};