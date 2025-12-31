let LARGE_ARRAY_SIZE = 200;
let HASH_UNDEFINED = '__lodash_hash_undefined__';
let MAX_SAFE_INTEGER = 9007199254740991;

let argsTag = '[object Arguments]',
  arrayTag = '[object Array]',
  boolTag = '[object Boolean]',
  dateTag = '[object Date]',
  errorTag = '[object Error]',
  funcTag = '[object Function]',
  genTag = '[object GeneratorFunction]',
  mapTag = '[object Map]',
  numberTag = '[object Number]',
  objectTag = '[object Object]',
  promiseTag = '[object Promise]',
  regexpTag = '[object RegExp]',
  setTag = '[object Set]',
  stringTag = '[object String]',
  symbolTag = '[object Symbol]',
  weakMapTag = '[object WeakMap]';

let arrayBufferTag = '[object ArrayBuffer]',
  dataViewTag = '[object DataView]',
  float32Tag = '[object Float32Array]',
  float64Tag = '[object Float64Array]',
  int8Tag = '[object Int8Array]',
  int16Tag = '[object Int16Array]',
  int32Tag = '[object Int32Array]',
  uint8Tag = '[object Uint8Array]',
  uint8ClampedTag = '[object Uint8ClampedArray]',
  uint16Tag = '[object Uint16Array]',
  uint32Tag = '[object Uint32Array]';

let reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
let reFlags = /\w*$/;
let reIsHostCtor = /^\[object .+?Constructor\]$/;
let reIsUint = /^(?:0|[1-9]\d*)$/;

let cloneableTags = {};
cloneableTags[argsTag] =
  cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] =
  cloneableTags[dataViewTag] =
  cloneableTags[boolTag] =
  cloneableTags[dateTag] =
  cloneableTags[float32Tag] =
  cloneableTags[float64Tag] =
  cloneableTags[int8Tag] =
  cloneableTags[int16Tag] =
  cloneableTags[int32Tag] =
  cloneableTags[mapTag] =
  cloneableTags[numberTag] =
  cloneableTags[objectTag] =
  cloneableTags[regexpTag] =
  cloneableTags[setTag] =
  cloneableTags[stringTag] =
  cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] =
  cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] =
  cloneableTags[uint32Tag] =
    true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

let freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
let freeSelf = typeof self == 'object' && self && self.Object === Object && self;
let root = freeGlobal || freeSelf || Function('return this')();
let freeExports = typeof exports == 'object' && exports && !nodeType && exports;
let freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
let moduleExports = freeModule && freeModule.exports === freeExports;

function addMapEntry(map, pair) {
  map.set(pair[0], pair[1]);
  return map;
}

function addSetEntry(set, value) {
  set.add(value);
  return set;
}

function arrayEach(array, iteratee) {
  let index = -1,
    length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

function arrayPush(array, values) {
  let index = -1,
    length = values.length,
    offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

function arrayReduce(array, iteratee, accumulator, initAccum) {
  let index = -1,
    length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

function baseTimes(n, iteratee) {
  let index = -1,
    result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

function getValue(object, key) {
  return object == null ? undefined : object[key];
}

function isHostObject(value) {
  let result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

function mapToArray(map) {
  let index = -1,
    result = Array(map.size);

  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

function setToArray(set) {
  let index = -1,
    result = Array(set.size);

  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

let arrayProto = Array.prototype,
  funcProto = Function.prototype,
  objectProto = Object.prototype;

let coreJsData = root['__core-js_shared__'];

let maskSrcKey = (function () {
  let uid = /[^.]+$/.exec((coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
})();

let funcToString = funcProto.toString;
let hasOwnProperty = objectProto.hasOwnProperty;
let objectToString = objectProto.toString;

let reIsNative = RegExp(
  '^' +
    funcToString
      .call(hasOwnProperty)
      .replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
    '$'
);

let Buffer = moduleExports ? root.Buffer : undefined,
  Symbol = root.Symbol,
  Uint8Array = root.Uint8Array,
  getPrototype = overArg(Object.getPrototypeOf, Object),
  objectCreate = Object.create,
  propertyIsEnumerable = objectProto.propertyIsEnumerable,
  splice = arrayProto.splice;

let nativeGetSymbols = Object.getOwnPropertySymbols,
  nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
  nativeKeys = overArg(Object.keys, Object);

let DataView = getNative(root, 'DataView'),
  Map = getNative(root, 'Map'),
  Promise = getNative(root, 'Promise'),
  Set = getNative(root, 'Set'),
  WeakMap = getNative(root, 'WeakMap'),
  nativeCreate = getNative(Object, 'create');

let dataViewCtorString = toSource(DataView),
  mapCtorString = toSource(Map),
  promiseCtorString = toSource(Promise),
  setCtorString = toSource(Set),
  weakMapCtorString = toSource(WeakMap);

let symbolProto = Symbol ? Symbol.prototype : undefined,
  symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

function Hash(entries) {
  let index = -1,
    length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    let entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

function hashGet(key) {
  let data = this.__data__;
  if (nativeCreate) {
    let result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

function hashHas(key) {
  let data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

function hashSet(key, value) {
  let data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

function ListCache(entries) {
  let index = -1,
    length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    let entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

function listCacheClear() {
  this.__data__ = [];
}

function listCacheDelete(key) {
  let data = this.__data__,
    index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  let lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

function listCacheGet(key) {
  let data = this.__data__,
    index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

function listCacheSet(key, value) {
  let data = this.__data__,
    index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

function MapCache(entries) {
  let index = -1,
    length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    let entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

function mapCacheClear() {
  this.__data__ = {
    hash: new Hash(),
    map: new (Map || ListCache)(),
    string: new Hash(),
  };
}

function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

function stackClear() {
  this.__data__ = new ListCache();
}

function stackDelete(key) {
  return this.__data__['delete'](key);
}

function stackGet(key) {
  return this.__data__.get(key);
}

function stackHas(key) {
  return this.__data__.has(key);
}

function stackSet(key, value) {
  let cache = this.__data__;
  if (cache instanceof ListCache) {
    let pairs = cache.__data__;
    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

function arrayLikeKeys(value, inherited) {
  let result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];

  let length = result.length,
    skipIndexes = !!length;

  for (let key in value) {
    if (
      (inherited || hasOwnProperty.call(value, key)) &&
      !(skipIndexes && (key == 'length' || isIndex(key, length)))
    ) {
      result.push(key);
    }
  }
  return result;
}

function assignValue(object, key, value) {
  let objValue = object[key];
  if (
    !(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
    (value === undefined && !(key in object))
  ) {
    object[key] = value;
  }
}

function assocIndexOf(array, key) {
  let length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  let result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  let isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    let tag = getTag(value),
      isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }

  stack || (stack = new Stack());
  let stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var cloneDeepProps = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(cloneDeepProps || value, function (subValue, key) {
    if (cloneDeepProps) {
      key = subValue;
      subValue = value[key];
    }

    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  let result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

function baseGetTag(value) {
  return objectToString.call(value);
}

function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  let pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  let result = [];
  for (let key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  let result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

function cloneArrayBuffer(arrayBuffer) {
  let result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

function cloneDataView(dataView, isDeep) {
  let buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

function cloneMap(map, isDeep, cloneFunc) {
  let array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor());
}

function cloneRegExp(regexp) {
  let result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

function cloneSet(set, isDeep, cloneFunc) {
  let array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor());
}

function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

function cloneTypedArray(typedArray, isDeep) {
  let buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

function copyArray(source, array) {
  let index = -1,
    length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

function copyObject(source, cloneDeepProps, object, customizer) {
  object || (object = {});

  let index = -1,
    length = cloneDeepProps.length;

  while (++index < length) {
    let key = cloneDeepProps[index];

    let newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

function getMapData(map, key) {
  let data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

function getNative(object, key) {
  let value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

let getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
let getTag = baseGetTag;

if (
  (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
  (Map && getTag(new Map()) != mapTag) ||
  (Promise && getTag(Promise.resolve()) != promiseTag) ||
  (Set && getTag(new Set()) != setTag) ||
  (WeakMap && getTag(new WeakMap()) != weakMapTag)
) {
  getTag = function (value) {
    let result = objectToString.call(value),
      Ctor = result == objectTag ? value.constructor : undefined,
      ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;
        case mapCtorString:
          return mapTag;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag;
        case weakMapCtorString:
          return weakMapTag;
      }
    }
    return result;
  };
}

function initCloneArray(array) {
  let length = array.length,
    result = array.constructor(length);

  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

function initCloneObject(object) {
  return typeof object.constructor == 'function' && !isPrototype(object)
    ? baseCreate(getPrototype(object))
    : {};
}

function initCloneByTag(object, tag, cloneFunc, isDeep) {
  let Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag:
    case float64Tag:
    case int8Tag:
    case int16Tag:
    case int32Tag:
    case uint8Tag:
    case uint8ClampedTag:
    case uint16Tag:
    case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return (
    !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    value > -1 &&
    value % 1 == 0 &&
    value < length
  );
}

function isKeyable(value) {
  let type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean'
    ? value !== '__proto__'
    : value === null;
}

function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

function isPrototype(value) {
  let Ctor = value && value.constructor,
    proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

function zxhiddenCustomCloneDeepByJeremyAshkenas(value) {
  return baseClone(value, true, true);
}

function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

function isArguments(value) {
  return (
    isArrayLikeObject(value) &&
    hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag)
  );
}

let isArray = Array.isArray;

function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

let isBuffer = nativeIsBuffer || stubFalse;

function isFunction(value) {
  let tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

function isObject(value) {
  let type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

function stubArray() {
  return [];
}

function stubFalse() {
  return false;
}

export default zxhiddenCustomCloneDeepByJeremyAshkenas;
