if (typeof module==="undefined" || !module.exports) var module={exports:{}};

function makeReactiveArray (arr) {
arr.pop[0]=arr._pop;
arr.push[0]=arr._push;
arr.concat[0]=arr._concat;
arr.splice[0]=arr._splice;
arr.shift[0]=arr._shift;
arr.sort[0]=arr._sort;
              ////
                ////
                //
delete arr._sort;
delete arr._shift;
delete arr._splice;
delete arr._concat;
delete arr._push;
delete arr._pop;
////
  ////
  //
}}



//
// inArr class ["in array"]

// … for finding matching array rows,
//   incrementing and decrementing counters,
//   and scooping object values which are
//   passed to the first declared function
//
////////////////////////////////////////////////

class inArr {
constructor (
  config = {
  __opCode_isQueryTermValidated: -0b0,
    inArrFunction: true,
    returnOnMatch: false,
    appendDeferCallback: false,
    appendReactiveArrFns: false,
    appendQueryFn: false,
    appendOpCodes: true,
    arrMod: null,
   //
    arr: null,
    keymap: null,
  },
             ...arrTypePredicate
){
  var {
    inArrFunction,
    returnOnMatch,
    appendDeferCallback: deferCallback,
    appendReactiveArrFns: reactive,
    appendQueryFn,
    appendOpCodes,
    arrMod,
   //
    arr, keymap,
   //
    __opCode_isQueryTermValidated: isOpQt,
  } = config, cfg={};

  cfg.arrMod = (typeof arrMod === "object")
                     ? arrMod : ['push','shift','pop','concat','splice','sort'];

  cfg.reactive = (typeof reactive === "object"
                      && reactive) ? reactive
                                   : false;

  cfg.returnEnum = (returnOnMatch) ? 2 : 3;

  cfg.appendOpCodes = (isBool(appendOpCodes))
                    ?  appendOpCodes : true;

  cfg.appendQueryFn = (appendQueryFn
                    && typeof appendQueryFn
                              === "function")
                    ?  appendQueryFn : false;

  cfg.deferCallback = (isBool(deferCallback))
                    ?  deferCallback : true;

  cfg.inArrFunction = (isBool(inArrFunction))
                    ?  inArrFunction : true;

  if (!(cfg.keymap=inArr.parseKeymap(keymap)))
  delete cfg.keymap;

  if (typeof cfg.reactive === "object") {
    var fnKeys = Object.keys(cfg.reactive);
    for (let fnKey of arrMod) {
      if (!fnKeys.indexOf(fnKey))
      delete cfg.reactive[fnKey];
    }
  }

  if (typeof appendOpCodes === "object"
   && appendOpCodes.constructor.name==="Array")
  cfg.appendOpCodes = appendOpCodes;

  this.cfg = {};
  this.setConfig(cfg);

 //

  this.operatorStack = { __scope: [ -16, 17 ],
    isQueryTerm: (typeof isOpQt === "number")
                       ? isOpQt : -0b0,
    isMultiType: -0b111,
    isInvertOps: 0b0,
    ruleCosequence: -0b10000,
  };

 ////////////////// .* / .+ ////////////////////
//

let eg, predicate, ofType, registeredPredicate;
this.QueryTerms = {
  [ofType]: [null, predicate/* ... */],
};

this.ReactiveRegister = {
  updateQueue: [],
  reactiveCallbacks: [],
  promiseTimespan: [],
  promiseTokens: {},
  idle: 0,
};

this.SortedIndex = {};

if (arrTypePredicate.length)
    this.flyTypes(arrTypePredicate);

   ////////////////////

if (cfg.inArrFunction) {
  var inArrFunction = function (...args) {
    this.Query(...args);
  }

  if (cfg.appendQueryFn)
  inArrFunction.query = () => {
    // ...
  }
  else
  inArrFunction.Query = inArr
               .Query;

  inArrFunction.registerType = this
               .registerType;

  inArrFunction.updateType = this
               .updateType;

  inArrFunction.listTypes = this
               .listTypes;

  inArrFunction.listOperatorStack = this
               .listOperatorStack;

  inArrFunction.listAvailableOperators = inArr
               .listAvailableOperators;

  if (cfg.reactive)
  for (let fnKey of cfg.arrMod)
  if (reactiveArray.indexOf(key) === -1) {
    inArrFunction[key] = reactive[key];
  }
  
  if (cfg.appendOpCodes === true)
  inArrFunction.op
 = inArr.appendOpCodes(this.operatorStack);
  else
  if (cfg.appendOpCodes)
  inArrFunction.op
 = inArr.appendOpCodes(this.operatorStack,
                        cfg.appendOpCodes);

  return inArrFunction;
}}

//
//
//

setConfig(cfgObject) {
  if (!this.cfg)
       this.cfg={};

  if (cfgObject && typeof cfgObject === "object"
   && cfgObject.constructor.name === "Object") {
    this.cfg={...this.cfg, ...cfgObject};
    return true;
  }
}

//
//
//

flyTypes (...arrTypePredicate) {
  var i=0, arr, type, predicate;
  for (let typedObj of arrTypePredicate) {
  if (i == 0)
    arr = typedObj;
  else
  if (typeof typedObj === "string") {
    // ...
  }}
}

registerType (type, predicate, keymap=[]) {
  if (!type
   || !type.length
   ||  typeof type !== "string"
  ) return false;

  return this.updateType(type, predicate, keymap);
}

updateType (type, predicate) {
  if (!type
   || !type.length
   ||  typeof type !== "string"
  ) return false;

 //
  
if (typeof this.operatorStack.isQueryTerm
                             !== "undefined")
  validatedOp = this.operatorStack.isQueryTerm
else validatedOp = -0b0;

var _keymap;
if (this.cfg.keymap && this.cfg.keymap.length)
   _keymap = this.cfg.keymap;
    keymap = inArr.parseKeymap(keymap,_keymap)

 //

var parsed = parseQueryTerm([type, predicate],
                         keymap, validatedOp);
if (parsed && parsed[0] === validatedOp) {
    parsed.splice(0,2);

  if (!this.QueryTerms[type])
       this.QueryTerms[type] = [null,parsed[0]];
  else
  if (this.QueryTerms[type][0])
      this.QueryTerms[type][0] = parsed[0];
  else
      this.QueryTerms[type].push(parsed[0]);

  return true;
} else
  return false;
}

listTypes() {
  return [
    Object.keys(this.QueryTerms),
    this.QueryTerms,
  ];
}

//
//
//

subscribe(){}
unsubscribe(){}
deferCallback(){}

updateReactiveQueue(){}
dequeueCallBack(){}
refresh(){}
refreshReactive(){}
refreshIndex(){}
refreshRels(){}

makeReactiveArray (arr) {
  if (this.cfg.reactive)
  for (let fnKey of this.arrMod)
  if (reactiveArray.indexOf(key) !== -1) {
    inArrFunction[key] = reactive[key];
  }

  if (this.cfg.reactive)
  for (let methodKey of appendReactiveArrFns)
  {
    if (arrMod.indexOf(methodKey) === -1
     && typeof this[methodKey] === "undefined")
    this[methodKey] = reactive[methodKey];
  }

  if (cfg.appendOpCodes === true)
  this.op=appendOpCodes(this.op);
  else
  if (cfg.appendOpCodes)
  this.op=appendOpCodes(this.op,
                         cfg.appendOpCodes);
}

//
//
//

listOperatorStack() {
  return this.operatorStack;
}

static listAvailableOperators () {
  var returnOb = new Object();
  return inArr.appendOpCodes(returnOb);
}

static appendOpCodes (Obj,
       appendSynonyms=true,
       filterKeys=[], filterValues=[],
){
const ops={                                   /*
  ``````````````````````````````````````````````
  literal type match condition
  … predicate defines => query match type */
  num:                         [[0b10]], //
  str:                      [[0b11]],   //
  fn:                    [[0b101]],   ///
  cls:                 [[0b110]],    ///
  arr:              [[0b1000]],    ////
  obj:           [[0b1001]],/*   /////

  ``````````````````````````````````````````````
  query function slot: match / modify
  … predicate expects => function in query */
  slotFn:                       [[-0b101]],   /*

  ``````````````````````````````````````````````
  query slot: match value
  … predicate expects => match str/num value */
  slotAny:               /^\.\*$/,          //
  slotAny:             [[0b1010]],        ///
  slotNonEmpty:       /^\.\+$/,         ////
  slotNonEmpty:     [[0b1011]], /*    /////

  ``````````````````````````````````````````````
  query slot: match value(s) in array
  ( cross-matching value(s) and items in array )
  … predicate expects => value match in query */
  slotEnum:           [[0b1100]],            //
  slotArray:       [[0b1111]],/*           ///

  ``````````````````````````````````````````````
  query modifier slot (on regex match)
  … predicate expects => set str/num conforms */
  setNum:      /[0-9]*[\.]*[0-9]+/,          //
  setRx:          /[\w\[\)\\]/,             //
  setNum:         [[-0b1100]],            ///
  setRx:          [[-0b1101]],   /*     ////

  ``````````````````````````````````````````````
  special operators for numeric values
  … defined in: predicate | modifier | coseq */

//  autoIncrement, increaseOnWrite, gt
    '++': [[-0b1]],

//  decreaseOnWrite, autoDecrement, lt
    '--': [[-0b11]],

//  setIncremental, [/], isEqual
   '===': [[0b1]],

//  [/], [/], isPositive
   '+++': [[0b100]],

//  deleteRowOnZero, [/], isNegative
   '---': [[-0b100]],
                                         /*
  ``````````````````````````````````````````````
  processing sequences
  … in array row, among multiple rows */
//  extract typed sequence from row
    typedSequence:(expectsType = null) =>
    (1<expectsType && expectsType<10)
     ? [[0b10000, expectsType]]
     : [[0b10000]],

//  ruleset object key index 0
    ruleCosequence: [[-0b10000]],
};

const synonyms = (!appendSynonyms) ? false : {
  num:'number', str:'string',
  fn:['fnc','function'], cls:'class', arr:'array', obj:'object',
 //
  slotFn:['slotFnc','slotFunction'/* setFn */],
  slotEnum:['__enum','__oneOf','__any'],
  slotArray:['matchArray','__all'],
  setNum:'setNumber', setRx:'setString',
 //
  typedSequence:['typedSeq','extract','seq','sequence'],
  ruleCosequence:['coseq','cosequence'],
 //
  '++':[  'autoIncrement',
         'increment','oneUp','countUp',
  'GT', 'isLarger','isGreater','isGreaterThan'],

  '--':['autoDecrement',
        'decrement','oneDown','countDown',
  'LT', 'isSmaller','isLess','isLessThan'],

 '===':['incremental','oneOff',
                               'EQ','isEqual'],
 '+++':['isPositive'],
 '---':['isNegative',
                     'deleteOnZero','delZero'],
};

 if (typeof Obj === "object"
 || typeof Obj === "function")
   return objectAppend(Obj, ops, synonyms,
  filterKeys, filterValues,
)}

//
//
//

static Query ({
  arr=[],
  keymap=[],
  onReturnFn=null,
 //
  returnEnum=3 || 2 || 1,
  cloneArray=false,
  reverse=false,
 //
 __opCodeQueryTermValidated=-0b0,
}) {
  if (!arr
   || !arr.constructor
   || !arr.constructor.name === "Array")
  return false;

  let arrRef = arr;
  var typeIndex;
  var condition = {};

 ///

  if (typeof onReturnFn !== "function")
  onReturnFn = false;

  if (typeof returnEnum !== "number"
   || returnEnum <= 1 || returnEnum > 3)
  returnEnum = 3 || 2;

   // let arrIterator, isIndex;
  if (typeof reverse !== "boolean")
  reverse = false;
  if (typeof cloneArray !== "boolean")
  cloneArray = false;

 //

const __opOk = params.__opCodeQueryTermValidated
////////////////////////////////////////////////
var queryTerms=[],isMultiType=true,isCoseq=true,
                                            i=0;
  do {
  let term = arguments[i];
  if (term !== null
   && typeof term !== "undefined") { i++;
    queryTerms.push(term);

    if ("Array" !== term.constructor.name)
    isMultiType=false;

    if ("Object" !== term.constructor.name
     || typeof term[0] !== "object"
     ||  term[0][0] !== -0b10000
     || !term[0].every(qt => "Array" ==
                       qt.constructor.name)
    ) isCoseq=false;
  } else
    break;
  } while (i);

 ///

  if (isCoseq)
  queryTerms = [
    inArr.parseCoseq(queryTerms,keymap,
                                  __opOk),
  ]
  else
  if (isMultiType && i > 1)
  queryTerms = [
    inArr.parseQueryTerms(queryTerms,keymap,
                                       __opOk)
  ]
  else
  if (i === 1) {
    queryTerms = [
      inArr.parseQueryTerm(queryTerms,keymap,
                                        __opOk)
    ];

    isCoseq = false;
    isMultiType = false;
  }

 //

if (!queryTerms.every(T=> { typeIndex.push(T[1])
                      return __opOk===T.shift();
                                             }))
                       throw "Misconfiguration";
////////////////////////////////////////////////
//delete params;delete isMultiType;delete keymap

   var condition = 0;
  var MainThread = (!onReturnFn)
? [] || {}
: function (){
 // ...
};

var numOfTypes = typeIndex.length -1;
var i=0;

////////////       `${type}`       /////////////
//            predicate: (fn) obj             //
//              modifier:fn||obj              //
//////////////////////////////// onAlterRowFn //

var predicate=[], modifier=[], onAlterRowFn;
for (let row of arrRef) { i=0;
  do {
     /*
      
      ...

    */
    if (i==numOfTypes) break; i++;
  } while (i) }

  /*
  
  ...

*/
}

//
//
//

parseQueryTerms (terms, keymap=[],
__op=-0b0
){
  if (!isArray(terms)) return false;

  var result = [], buffer;
  for (let termObj of terms) {
    if (buffer = parseQueryTerm(termObj,keymap,
                                          __op))
      result.push(buffer);
  }

  if (typeof buffer==="undefined") return false;
  return result;
}

parseQueryTerm (queryTermObj, keymap=[],
__op=-0b0
){
  if (Object.prototype.toString.call(termsObj)
    !== "[object Array]") return false;

  var buffer = [];

  if (!keymap || keymap.length) keymap=null;
  else keymap=inArr.parseKeymap(keymap);

  const literal = inArr.isOperatorType;
  const opCodeB = inArr.opFactory;
  const opScope = [-16, 17];

  const isNumOp = (op) => {
    if (typeof op === "string"
      && ["==","++","--","+++","---"]
                        .indexOf(op) !== -1)
    return true;
    if (typeof op[0] === "number"
      && [1,-1,-4, 4,-2].indexOf(op[0]) !== -1)
    return true;
    if (typeof op === "number"
      && [1,-1,-4, 4,-2].indexOf(op) !== -1)
    return true;
  };

////////////////////////////////////////////////
//     predicate: fn||obj (extFn||extObj)     //
/////////          `${type}`           /////////
// slots:match||update, ops, modifier:fn||obj //
////////////////////////////// [onAlterRowFn] //

var predicate, typeStr, modifier, onAlterRowFn;
  //
var predicateFn, predicateObj,
    predicateExtFn, predicateExtObj,
   //
    slotLogic, operatorStack,
   //
    modifierFn, modifierObj;

const __opCodeQueryTermValidated = __op;
for (let term of queryTermObj) {
  if (!typeStr) {
    if (typeof term === "number") {
      // ...
    }
    else
    if (typeof term === "object") {
      if (term.constructor.name === "Array") {
        // ...
      }
      else
      if (term.constructor.name === "Object") {
        // ...
      }
    }
    else
    if (typeof term === "function") {
      // ...
    }
    else
    if (typeof term === "string") {
      // ...
  }}
  else
  if (typeStr) {
    // ...
  }
}

////////////       `${type}`       /////////////
//            predicate: (fn) obj             //
//              modifier:fn||obj              //
//////////////////////////////// onAlterRowFn //

  return [
  __opCodeQueryTermValidated,
    typeStr,
    predicate,
    modifier,
    onAlterRowFn,
  ];
}

//
//
//

parseCoseq(){}

//
//
//

static isOperatorType (op="", which="") {
   if (typeof op === "object" && op[0]) {
     if (1 === op[0].length && op[0][0]
      && 1 > op[0][0].length
      && 4 < op[0][0].length
    ) op = op[0][0];
   else
   if (1 > op[0].length
    && 4 < op[0].length
   ) op = op[0];
}

   var enums = inArr.opFactory;
let enumObj = {  // n=36
// literal match type
num:     (op) =>  op ===  2 ||  2 == enums(op),
str:     (op) =>  op ===  3 ||  3 == enums(op),
fn:      (op) =>  op ===  5 ||  5 == enums(op),
arr:     (op) =>  op ===  8 ||  8 == enums(op),
obj:     (op) =>  op ===  9 ||  9 == enums(op),
cls:     (op) =>  op ===  6 ||  6 == enums(op),
null:        (op) => op === null,
bool:        (op) => typeof op === "boolean",
undefined:   (op) => typeof op === "undefined",

// slot match
slotAny:   (op) => op === 10 || 10 == enums(op),
slot:      (op) => op === 11 || 11 == enums(op),

// slot match array
slotEnum:  (op) => op === 12 || 12 == enums(op),
slotMatch: (op) => op === 15 || 15 == enums(op),
slotFn:    (op) => op === -5 ||  5 ==
                            Math.abs(enums(op)),
// slot set value
setNum:    (op) => op == -12 ||-12 == enums(op),
setRx:     (op) => op == -13 ||-13 == enums(op),
setFn:     (op) => op ==  -5 ||  5 ==
                            Math.abs(enums(op)),
// extract typed sequence
seq:       (op) => op === 16 || 16 == enums(op),

// incrementing and decrementing counters
oneUp:     (op) => op === -1 || -1 == enums(op),
oneDown:   (op) => op === -4 || -4 == enums(op),
delZero:   (op) => op === -2 || -2 == enums(op),
setIncremental:   (op) => op === 1
                 || enums(op) == 1,

// comparing numbers
gt:        (op) => op === -1 || -1 == enums(op),
lt:        (op) => op === -4 || -4 == enums(op),
eq:        (op) => op ===  1 ||  1 == enums(op),
positive:  (op) => op ===  4 ||  4 == enums(op),
negative:  (op) => op === -2 || -2 == enums(op),

// query system
isQueryTerm: (op) => op === -0b0,
isMultiType: (op) => op === -0b111,
isCosequent: (op) => op === -0b10000,
isInvertOps: (op) => op === 0b0,

// categories
literal:     (op) => [...[7], 2, 3, 5, 8, 9, 6]
                                   .indexOf(op)
 ||  op === null  ||  typeof op === "boolean"
                  ||  typeof op === "undefined",
querySlot:   (op) => [ 13,   10,11,12,15, 5,-5]
                                   .indexOf(op),
setSlot:     (op) => [-13,      -12,-13, -5, 5]
                                   .indexOf(op),
incremental: (op) => [-14,        -1,-4, -2, 1]
                                   .indexOf(op),
compareNums: (op) => [ 14,      -1,-4, 1, 4,-2]
                                   .indexOf(op),
};

if (op
    && which
    && typeof enumObj[which] !== "undefined")
       return enumObj[which](op);
  else return enumObj;
}

//
//
//

static parseKeymap (keymap) {
  if (typeof keymap === "function")
  keymap=inArr.getFnKeyNames(keymap);

  if (!keymap || typeof keymap !== "object")
  return false;

  var result = [];

 //

var length, keys, findGTE;

keys = Object.keys(keymap);
length = keys[keys.length-1];

var mergeKeymap, mergeKeysObj;
if (arguments[1]
&& typeof arguments[1] === "object") {
  if (arguments[1].constructor.name=="Object") {
    mergeKeymap = arguments[1];
    mergeKeysObj=Object.keys(arguments[1]);

    findGTE=mergeKeysObj.sort((a,b)=>a<b)[0];
    if (typeof findGTE === "string")
      findGTE=eval(findGTE.valueOf());
  }
  else
  if (arguments[1].constructor.name==="Array") {
    mergeKeymap = arguments[1];
    findGTE = mergeKeymap.length;
  }
}
else
if (typeof arguments[1] === "object") {
  mergeKeymap=inArr.getFnKeyNames(keymap);
  findGTE = mergeKeymap.length;
}

if (typeof findGTE === "number"
 && findGTE > length)
    length = findGTE;

if (typeof length !== "number")
    return false;
//
 ///////////////////////////////////////////////

  for (let i=0; i<length+1; i++) {
    result.push(mergePredicate(keymap[i],
                          mergeKeymap[i]));
  }

  return result;

 //

  function mergePredicate(val, mergeVal) {
    if ((typeof mergeVal !== "string" &&
         typeof mergeVal !== "object")
       &&
        (typeof val === "string" ||
         typeof val === "object"))
     return val;
    else
    if ((typeof val !== "string" &&
         typeof val !== "object")
       &&
        (typeof mergeVal === "string" ||
         typeof mergeVal === "object"))
      return mergeVal;
    else
      return mergeVal;
  }
}

static getFnKeyNames(fnObj) {
if (typeof fnObj === "function") {
  var argKeys=[], cur_l=-1, cur_r=-1, indent=0;

  fnObj=`${fnObj}`;
  fnObj=fnObj
    .substring((cur_l=fnObj.indexOf("("))+1,
                  fnObj.indexOf(")")-cur_l)
    .split(/\,\s*/);

  var i=-1;
  for (let arg of fnObj) { i++;
    if (arg.indexOf("{") === 0) {
      indent++;
      cur_l=1;
    }
    else
      cur_l=0;
   //
    if ((cur_r = arg.indexOf("=")) !== -1) {
      if (!indent)
      argKeys.push(arg.substring(0,cur_r));
      else
      if (cur_l===0) {
      arg=arg.substring(cur_l,cur_r);
      argKeys[argKeys.length-1].push(arg);
      }
      else
      if (cur_l===1) {
      arg=arg.substring(cur_l,cur_r);
      argKeys.push([arg]);
    }}
    else
    if ((cur_l=arg.indexOf("...")) !== -1) {
      arg = arg
        .substring(cur_l,arg.length-1);
      argKeys.push(arg);
    }
    else
      argKeys.push(arg);
   //
    if (indent && arg.indexOf("}") !== -1)
        indent--;
  }

  return argKeys;
}}
///
  //
}  //
  //
//

//
//
//

function isArray (obj) {
  if (typeof obj === "object"
   && obj.constructor.name === "Array")
    return true;
}

function isArrowFn (fn) {
  if (typeof fn === "function"
   && typeof fn.prototype === "undefined")
    return true;
}

function isBool (value) {
  if (typeof value === "boolean")
    return true;
}

function isClass (obj) {
  if (typeof obj === "object"
   && obj.constructor.name !== "Object")
    return true;
  else
  if (typeof obj === "function"
   && Function.prototype.toString
     .call(obj).substring(0,5) == "class")
    return true;
}

function isObject (obj) {
  if (typeof obj === "object"
   && obj.constructor.name === "Object")
    return true;
}

function isFunction (fn) {
  if (typeof fn === "function"
   && fn.constructor.name === "function")
    return true;
}

//
//
//

function objectAppend (obj, appendObj,
  synoynmObj=null, keys=[], values=[],
  cfg={ clone:false, overwrite:true },
){
  if (typeof obj !== "object"
   || typeof appendObj !== "object")
  return false;

  if (typeof synonymObj !== "object"
   || Object.keys(synonymObj).length)
  synonymObj=null;

 //

  var filterKeys = keys;
  if (filterKeys === null ||
     !(typeof filterVals === "object"
    && filterVals.constructor.name === "Array"))
  filterKeys=[filterKeys];
  else
  if (!filterKeys.length)
  filterKeys=false;

  var filterVals = values;
  if (filterVals === null ||
     !(typeof filterVals === "object"
    && filterVals.constructor.name === "Array"))
  filterVals=[filterVals];
  else
  if (!filterVals.length)
  filterVals=false;

 //

  if (typeof cfg.clone==="boolean" && cfg.clone)
  obj={...obj};

  if (typeof cfg.overwrite !== "boolean")
  cfg.overwrite = false;

 //

for (let key of Object.keys(appendObj)) {
if (appendObj[key] !== null
 && appendObj[key].constructor.name==="Array") {
  if (appendObj[key].length===1
   && appendObj[key][0] !== null
  && appendObj[key][0].constructor.name=="Array"
 && appendObj[key][0].length > 0
&& appendObj[key][0].length < 4)
  var val = appendObj[key][0][0];
} else
  var val=appendObj[key];

  if (filterVals
  && !filterVals.indexOf(val) !== -1)
      continue;

  if ((cfg.overwrite ||
       typeof obj[key] === "undefined")
    && (!filterKeys ||
        (filterKeys &&
        filterKeys.indexOf(key) !== -1))
  ) obj[key] = val;

  if (typeof synonymObj[key] !== "undefined") {
    let newKey = synonymObj[key];
    if (newKey.constructor.name === "Array") {
    for (let newKey of newKey) {

      if ((cfg.overwrite ||
           typeof obj[newKey] === "undefined")
        && (!filterKeys ||
            (filterKeys &&
            filterKeys.indexOf(newKey) !== -1))
      ) obj[newKey] = val;

    }}
    else
    if (typeof newKey === "string"
     && (cfg.overwrite ||
         typeof obj[newKey] === "undefined")
     && (!filterKeys ||
         (filterKeys &&
          filterKeys.indexOf(newKey) !== -1))
    ) obj[newKey] = val;
  }}

  return obj;
}

//
//
//

function keyAtPath (objRef/* setValue?,
  level1, level2, ... levelN,                 */
){
  if (typeof objRef !== "object")
    return false;

  var obj = objRef,
      isSetValue=false, setValue;
  var path, pathLength;
      path = Array.prototype.slice
                            .call(arguments, 1);
      pathLength = path.length -1;

  for (var i=0; i < path.length; i++) {
    var key = path.shift();
    if (i===0
    && !objRef[key] && objRef[path[0]]) {
      setValue = key;
      continue;
    }

    if (setValue
     && typeof obj["_inArrRef"] !== "undefined"
     && typeof obj["set"] === "function")
    return obj.set(setValue, ...path);

    // handle negative index
    if (typeof key === "number" && key < 0)
    key = Object.keys(obj).length + key;

    if (typeof obj[key] !== "undefined") {
      if (i === pathLength) {
        if (typeof setValue !== "undefined") {
          obj[key] = setValue;
          return true;
        }
        else
          return obj[key];
      }
    }
    else {
      if (i === pathLength
       && typeof setValue !== "undefined") {
        obj[key] = setValue;
        return true;
      }
      else
      if (i !== pathLength
       && typeof setValue !== "undefined")
        obj[key] = {};
    }

  obj = obj[key] }
  return false;
}


//
//
//

function trie245(objRef, key, val=undefined,
nestedLogic=undefined
){
  if (key === null)
  return false;

  if (typeof nestedLogic !== "function")
  nestedLogic=undefined;

 //

  var tkn, isNumber, isObject;
  if (typeof key === "string"
   && typeof eval(key.toValue())==="number")
      isNumber = true;
  else
  if (typeof key === "number") {
      key=`${key}`;
      isNumber=true;
  }

  if (isNumber
   && key.length =< 11 && key.length >= 7)
  tkn = {
    [tkn.substring(0,1)]: {
      [tkn.substring(1,2)]: {
        [tkn.substring(2,6)]: {
          [tkn.substring(6)]: val
  }}}}
  else
  if (typeof key === "string") {
    var tkn=val, buffer=[], i=0, step=0;
    do {
      if (step===0)
        step=1;
      buffer.push(key.substring(i,i+step));

      if (step!==1)
        step++;
      i=i+step;
    } while (i < key.length)

   //

    for (let key of buffer.reverse()) {
      tkn = { key: tkn };
    }
  }
  else
  if (typeof key === "object") {
    if (key.constructor.name==="Object") {
      tkn = key;
      isObject = true;
    }
    else
    if (key.constructor.name==="Array") {
      tkn=val;
      for (let key of key.reverse()) {
        tkn = {key: tkn};
      }
  }}
  else return false;

 //

  var obj=objRef, subkey, i=0;
  ////////////////////////////// onAlterRowFn //
  var rewrite=false,rewriteRef,__rewrite, popOp;
      rewriteRef=__rewrite={}; popOp=[0,0];
 //

  subkey=Object.keys(tkn)[0];
  do { tkn=tkn[subkey];
    if (typeof obj[subkey] === "undefined") {
      if (isObject ||
          typeof val !== "undefined") {
       //
        obj[subkey] = tkn;
        return true;
     //
      }
      else
        return false;
    }
    else
    if (typeof obj[subkey] !== "undefined") {
      if (obj[subkey].length > 1)
        popOp[1]=popOp[0];
      __rewrite[subkey] = obj[subkey];
      __rewrite = __rewrite[subkey];

      if (isObject && typeof tkn !== "object")
      val = tkn;

      if (val === tkn)  // ... at token leaf
      {
        if (!nestLogic) {
          if (typeof val === "undefined") {
           //
           return obj[subkey];
         //
          }
          else
          if (val === obj[subkey]) {
            // goto "rewrite"
            break;
          }
          else
          if (val !== obj[subkey]
          && typeof val===typeof obj[subkey]) {
            //
            obj[subkey] = val;
           return true;
         //
          }
          else
            return false;
        }
        else
        if (typeof nestLogic === "function") {
        try {
           //
          let res = nestLogic(obj, subkey, val);
         //
          if (!res)
            break; // goto "rewrite"
          else return true;
        } catch (e) { throw "Misconfigured" }
    }} i++; popOp[0]=i }

    obj=obj[subkey];
    subkey=Object.keys(tkn)[0];
  } while (true)

 //

  var i=0; popOp=popOp[1], obj=objRef;
  if (rewrite && popOp) {
  do {i++;
    subkey=Object.keys(__rewrite)[0];
  __rewrite = __rewrite[subkey];

    if (popOp === i) {
        //
      obj=__rewrite;
     break;
     //
    }

    obj=obj[subkey];
  } while (true) }

  return false;
}

module.exports = {
  inArr,
  isBool,
  isArray, isObject, isClass,
  isFunction, isArrowFn,
  objectAppend,
  keyAtPath,
  trie245,
};
