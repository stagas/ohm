!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ohm=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var ohm = _dereq_('..');
module.exports = ohm.makeRecipe(function() {
  return new this.newGrammar('Ohm')
    .define('Grammars', this.many(this.app('Grammar'), 0))
    .define('Grammar', this.seq(this.app('ident'), this.opt(this.app('SuperGrammar')), this.prim('{'), this.many(this.app('Rule'), 0), this.prim('}')))
    .define('SuperGrammar', this.seq(this.prim('<:'), this.app('ident')))
    .define('Rule_define', this.seq(this.app('ident'), this.app('Formals'), this.opt(this.app('ruleDescr')), this.prim('='), this.app('Alt')))
    .define('Rule_override', this.seq(this.app('ident'), this.app('Formals'), this.prim(':='), this.app('Alt')))
    .define('Rule_extend', this.seq(this.app('ident'), this.app('Formals'), this.prim('+='), this.app('Alt')))
    .define('Rule', this.alt(this.app('Rule_define'), this.app('Rule_override'), this.app('Rule_extend')))
    .define('Formals_some', this.seq(this.prim('<'), this.app('ident'), this.many(this.seq(this.prim(','), this.app('ident')), 0), this.prim('>')))
    .define('Formals_none', this.seq())
    .define('Formals', this.alt(this.app('Formals_some'), this.app('Formals_none')))
    .define('Params_some', this.seq(this.prim('<'), this.app('Seq'), this.many(this.seq(this.prim(','), this.app('Seq')), 0), this.prim('>')))
    .define('Params_none', this.seq())
    .define('Params', this.alt(this.app('Params_some'), this.app('Params_none')))
    .define('Alt', this.seq(this.app('Term'), this.many(this.seq(this.prim('|'), this.app('Term')), 0)))
    .define('Term_inline', this.seq(this.app('Seq'), this.app('caseName')))
    .define('Term', this.alt(this.app('Term_inline'), this.app('Seq')))
    .define('Seq', this.many(this.app('Iter'), 0))
    .define('Iter_star', this.seq(this.app('Pred'), this.prim('*')))
    .define('Iter_plus', this.seq(this.app('Pred'), this.prim('+')))
    .define('Iter_opt', this.seq(this.app('Pred'), this.prim('?')))
    .define('Iter', this.alt(this.app('Iter_star'), this.app('Iter_plus'), this.app('Iter_opt'), this.app('Pred')))
    .define('Pred_not', this.seq(this.prim('~'), this.app('Base')))
    .define('Pred_lookahead', this.seq(this.prim('&'), this.app('Base')))
    .define('Pred', this.alt(this.app('Pred_not'), this.app('Pred_lookahead'), this.app('Base')))
    .define('Base_application', this.seq(this.app('ident'), this.app('Params'), this.not(this.alt(this.seq(this.opt(this.app('ruleDescr')), this.prim('=')), this.prim(':='), this.prim('+=')))))
    .define('Base_prim', this.alt(this.app('keyword'), this.app('string'), this.app('regExp'), this.app('number')))
    .define('Base_paren', this.seq(this.prim('('), this.app('Alt'), this.prim(')')))
    .define('Base_arr', this.seq(this.prim('['), this.app('Alt'), this.prim(']')))
    .define('Base_str', this.seq(this.prim('``'), this.app('Alt'), this.prim("''")))
    .define('Base_obj', this.seq(this.prim('{'), this.opt(this.prim('...')), this.prim('}')))
    .define('Base_objWithProps', this.seq(this.prim('{'), this.app('Props'), this.opt(this.seq(this.prim(','), this.prim('...'))), this.prim('}')))
    .define('Base', this.alt(this.app('Base_application'), this.app('Base_prim'), this.app('Base_paren'), this.app('Base_arr'), this.app('Base_str'), this.app('Base_obj'), this.app('Base_objWithProps')))
    .define('Props', this.seq(this.app('Prop'), this.many(this.seq(this.prim(','), this.app('Prop')), 0)))
    .define('Prop', this.seq(this.alt(this.app('name'), this.app('string')), this.prim(':'), this.app('Alt')))
    .define('ruleDescr', this.seq(this.prim('('), this.app('ruleDescrText'), this.prim(')')))
    .define('ruleDescrText', this.many(this.seq(this.not(this.prim(')')), this.app('_')), 0))
    .define('caseName', this.seq(this.prim('--'), this.many(this.seq(this.not(this.prim('\n')), this.app('space')), 0), this.app('name'), this.many(this.seq(this.not(this.prim('\n')), this.app('space')), 0), this.alt(this.prim('\n'), this.la(this.prim('}')))))
    .define('name', this.seq(this.app('nameFirst'), this.many(this.app('nameRest'), 0)))
    .define('nameFirst', this.alt(this.prim('_'), this.app('letter')))
    .define('nameRest', this.alt(this.prim('_'), this.app('alnum')))
    .define('ident', this.seq(this.not(this.app('keyword')), this.app('name')))
    .define('keyword_undefined', this.seq(this.prim('undefined'), this.not(this.app('nameRest'))))
    .define('keyword_null', this.seq(this.prim('null'), this.not(this.app('nameRest'))))
    .define('keyword_true', this.seq(this.prim('true'), this.not(this.app('nameRest'))))
    .define('keyword_false', this.seq(this.prim('false'), this.not(this.app('nameRest'))))
    .define('keyword', this.alt(this.app('keyword_undefined'), this.app('keyword_null'), this.app('keyword_true'), this.app('keyword_false')))
    .define('string', this.seq(this.prim('"'), this.many(this.app('strChar'), 0), this.prim('"')))
    .define('strChar', this.alt(this.app('escapeChar'), this.seq(this.not(this.prim('"')), this.not(this.prim('\n')), this.app('_'))))
    .define('escapeChar_hexEscape', this.seq(this.prim('\\x'), this.app('hexDigit'), this.app('hexDigit')))
    .define('escapeChar_unicodeEscape', this.seq(this.prim('\\u'), this.app('hexDigit'), this.app('hexDigit'), this.app('hexDigit'), this.app('hexDigit')))
    .define('escapeChar_escape', this.seq(this.prim('\\'), this.app('_')))
    .define('escapeChar', this.alt(this.app('escapeChar_hexEscape'), this.app('escapeChar_unicodeEscape'), this.app('escapeChar_escape')))
    .define('regExp', this.seq(this.prim('/'), this.app('reCharClass'), this.prim('/')))
    .define('reCharClass_unicode', this.seq(this.prim('\\p{'), this.many(this.prim(/[A-Za-z]/), 1), this.prim('}')))
    .define('reCharClass_ordinary', this.seq(this.prim('['), this.many(this.alt(this.prim('\\]'), this.seq(this.not(this.prim(']')), this.app('_'))), 0), this.prim(']')))
    .define('reCharClass', this.alt(this.app('reCharClass_unicode'), this.app('reCharClass_ordinary')))
    .define('number', this.seq(this.opt(this.prim('-')), this.many(this.app('digit'), 1)))
    .define('space_singleLine', this.seq(this.prim('//'), this.many(this.seq(this.not(this.prim('\n')), this.app('_')), 0), this.prim('\n')))
    .define('space_multiLine', this.seq(this.prim('/*'), this.many(this.seq(this.not(this.prim('*/')), this.app('_')), 0), this.prim('*/')))
    .extend('space', this.alt(this.alt(this.app('space_singleLine'), this.app('space_multiLine')), this.prim(/[\s]/)))
    .build();
});


},{"..":27}],2:[function(_dereq_,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = _dereq_('base64-js')
var ieee754 = _dereq_('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

},{"base64-js":3,"ieee754":4}],3:[function(_dereq_,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],4:[function(_dereq_,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],5:[function(_dereq_,module,exports){
var Buffer = _dereq_('buffer').Buffer;
var intSize = 4;
var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
var chrsz = 8;

function toArray(buf, bigEndian) {
  if ((buf.length % intSize) !== 0) {
    var len = buf.length + (intSize - (buf.length % intSize));
    buf = Buffer.concat([buf, zeroBuffer], len);
  }

  var arr = [];
  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
  for (var i = 0; i < buf.length; i += intSize) {
    arr.push(fn.call(buf, i));
  }
  return arr;
}

function toBuffer(arr, size, bigEndian) {
  var buf = new Buffer(size);
  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
  for (var i = 0; i < arr.length; i++) {
    fn.call(buf, arr[i], i * 4, true);
  }
  return buf;
}

function hash(buf, fn, hashSize, bigEndian) {
  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
  return toBuffer(arr, hashSize, bigEndian);
}

module.exports = { hash: hash };

},{"buffer":2}],6:[function(_dereq_,module,exports){
var Buffer = _dereq_('buffer').Buffer
var sha = _dereq_('./sha')
var sha256 = _dereq_('./sha256')
var rng = _dereq_('./rng')
var md5 = _dereq_('./md5')

var algorithms = {
  sha1: sha,
  sha256: sha256,
  md5: md5
}

var blocksize = 64
var zeroBuffer = new Buffer(blocksize); zeroBuffer.fill(0)
function hmac(fn, key, data) {
  if(!Buffer.isBuffer(key)) key = new Buffer(key)
  if(!Buffer.isBuffer(data)) data = new Buffer(data)

  if(key.length > blocksize) {
    key = fn(key)
  } else if(key.length < blocksize) {
    key = Buffer.concat([key, zeroBuffer], blocksize)
  }

  var ipad = new Buffer(blocksize), opad = new Buffer(blocksize)
  for(var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  var hash = fn(Buffer.concat([ipad, data]))
  return fn(Buffer.concat([opad, hash]))
}

function hash(alg, key) {
  alg = alg || 'sha1'
  var fn = algorithms[alg]
  var bufs = []
  var length = 0
  if(!fn) error('algorithm:', alg, 'is not yet supported')
  return {
    update: function (data) {
      if(!Buffer.isBuffer(data)) data = new Buffer(data)
        
      bufs.push(data)
      length += data.length
      return this
    },
    digest: function (enc) {
      var buf = Buffer.concat(bufs)
      var r = key ? hmac(fn, key, buf) : fn(buf)
      bufs = null
      return enc ? r.toString(enc) : r
    }
  }
}

function error () {
  var m = [].slice.call(arguments).join(' ')
  throw new Error([
    m,
    'we accept pull requests',
    'http://github.com/dominictarr/crypto-browserify'
    ].join('\n'))
}

exports.createHash = function (alg) { return hash(alg) }
exports.createHmac = function (alg, key) { return hash(alg, key) }
exports.randomBytes = function(size, callback) {
  if (callback && callback.call) {
    try {
      callback.call(this, undefined, new Buffer(rng(size)))
    } catch (err) { callback(err) }
  } else {
    return new Buffer(rng(size))
  }
}

function each(a, f) {
  for(var i in a)
    f(a[i], i)
}

// the least I can do is make error messages for the rest of the node.js/crypto api.
each(['createCredentials'
, 'createCipher'
, 'createCipheriv'
, 'createDecipher'
, 'createDecipheriv'
, 'createSign'
, 'createVerify'
, 'createDiffieHellman'
, 'pbkdf2'], function (name) {
  exports[name] = function () {
    error('sorry,', name, 'is not implemented yet')
  }
})

},{"./md5":7,"./rng":8,"./sha":9,"./sha256":10,"buffer":2}],7:[function(_dereq_,module,exports){
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

var helpers = _dereq_('./helpers');

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function md5(buf) {
  return helpers.hash(buf, core_md5, 16);
};

},{"./helpers":5}],8:[function(_dereq_,module,exports){
// Original code adapted from Robert Kieffer.
// details at https://github.com/broofa/node-uuid
(function() {
  var _global = this;

  var mathRNG, whatwgRNG;

  // NOTE: Math.random() does not guarantee "cryptographic quality"
  mathRNG = function(size) {
    var bytes = new Array(size);
    var r;

    for (var i = 0, r; i < size; i++) {
      if ((i & 0x03) == 0) r = Math.random() * 0x100000000;
      bytes[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return bytes;
  }

  if (_global.crypto && crypto.getRandomValues) {
    whatwgRNG = function(size) {
      var bytes = new Uint8Array(size);
      crypto.getRandomValues(bytes);
      return bytes;
    }
  }

  module.exports = whatwgRNG || mathRNG;

}())

},{}],9:[function(_dereq_,module,exports){
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

var helpers = _dereq_('./helpers');

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function sha1(buf) {
  return helpers.hash(buf, core_sha1, 20, true);
};

},{"./helpers":5}],10:[function(_dereq_,module,exports){

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var helpers = _dereq_('./helpers');

var safe_add = function(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
};

var S = function(X, n) {
  return (X >>> n) | (X << (32 - n));
};

var R = function(X, n) {
  return (X >>> n);
};

var Ch = function(x, y, z) {
  return ((x & y) ^ ((~x) & z));
};

var Maj = function(x, y, z) {
  return ((x & y) ^ (x & z) ^ (y & z));
};

var Sigma0256 = function(x) {
  return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
};

var Sigma1256 = function(x) {
  return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
};

var Gamma0256 = function(x) {
  return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
};

var Gamma1256 = function(x) {
  return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
};

var core_sha256 = function(m, l) {
  var K = new Array(0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0xFC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x6CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2);
  var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
  /* append padding */
  m[l >> 5] |= 0x80 << (24 - l % 32);
  m[((l + 64 >> 9) << 4) + 15] = l;
  for (var i = 0; i < m.length; i += 16) {
    a = HASH[0]; b = HASH[1]; c = HASH[2]; d = HASH[3]; e = HASH[4]; f = HASH[5]; g = HASH[6]; h = HASH[7];
    for (var j = 0; j < 64; j++) {
      if (j < 16) {
        W[j] = m[j + i];
      } else {
        W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
      }
      T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
      T2 = safe_add(Sigma0256(a), Maj(a, b, c));
      h = g; g = f; f = e; e = safe_add(d, T1); d = c; c = b; b = a; a = safe_add(T1, T2);
    }
    HASH[0] = safe_add(a, HASH[0]); HASH[1] = safe_add(b, HASH[1]); HASH[2] = safe_add(c, HASH[2]); HASH[3] = safe_add(d, HASH[3]);
    HASH[4] = safe_add(e, HASH[4]); HASH[5] = safe_add(f, HASH[5]); HASH[6] = safe_add(g, HASH[6]); HASH[7] = safe_add(h, HASH[7]);
  }
  return HASH;
};

module.exports = function sha256(buf) {
  return helpers.hash(buf, core_sha256, 32, true);
};

},{"./helpers":5}],11:[function(_dereq_,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],12:[function(_dereq_,module,exports){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var crypto = _dereq_('crypto');

var defineProperty = Object.defineProperty;
function next() {
  return "@@symbol:" + crypto.randomBytes(8).toString('hex');
}


function Symbol(desc) {
  if (!(this instanceof Symbol)) {
    return new Symbol(desc);
  }
  var _symbol = this._symbol = next();
  defineProperty(this, '_desc', {
    value: desc,
    enumerable: false,
    writable: false,
    configurable: false
  });
  defineProperty(Object.prototype, _symbol, {
    set: function(value) {
      defineProperty(this, _symbol, {
        value: value,
        enumerable: false,
        writable: true
      });
    }
  });
}

Symbol.prototype.toString = function toString() {
  return this._symbol;
};

var globalSymbolRegistry = {};
Symbol.for = function symbolFor(key) {
  key = String(key);
  return globalSymbolRegistry[key] || (globalSymbolRegistry[key] = Symbol(key));
};

Symbol.keyFor = function keyFor(sym) {
  if (!(sym instanceof Symbol)) {
    throw new TypeError("Symbol.keyFor requires a Symbol argument");
  }
  for (var key in globalSymbolRegistry) {
    if (globalSymbolRegistry[key] === sym) {
      return key;
    }
  }
  return undefined;
};

module.exports = this.Symbol || Symbol;

},{"crypto":6}],13:[function(_dereq_,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = extend;
function extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || typeof add !== 'object') return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}

},{}],14:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var GrammarDecl = _dereq_('./GrammarDecl.js');
var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Builder() {}

Builder.prototype = {
  newGrammar: function(name) {
    return new GrammarDecl(name);
  },

  anything: function() {
    return pexprs.anything;
  },

  end: function() {
    return pexprs.end;
  },

  prim: function(x) {
    return pexprs.makePrim(x);
  },

  alt: function(/* term1, term1, ... */) {
    var terms = [];
    for (var idx = 0; idx < arguments.length; idx++) {
      var arg = arguments[idx];
      if (arg instanceof pexprs.Alt) {
        terms = terms.concat(arg.terms);
      } else {
        terms.push(arg);
      }
    }
    return terms.length === 1 ? terms[0] : new pexprs.Alt(terms);
  },

  seq: function(/* factor1, factor2, ... */) {
    var factors = [];
    for (var idx = 0; idx < arguments.length; idx++) {
      var arg = arguments[idx];
      if (arg instanceof pexprs.Seq) {
        factors = factors.concat(arg.factors);
      } else {
        factors.push(arg);
      }
    }
    return factors.length === 1 ? factors[0] : new pexprs.Seq(factors);
  },

  many: function(expr, minNumMatches) {
    return new pexprs.Many(expr, minNumMatches);
  },

  opt: function(expr) {
    return new pexprs.Opt(expr);
  },

  not: function(expr) {
    return new pexprs.Not(expr);
  },

  la: function(expr) {
    return new pexprs.Lookahead(expr);
  },

  arr: function(expr) {
    return new pexprs.Arr(expr);
  },

  str: function(expr) {
    return new pexprs.Str(expr);
  },

  obj: function(properties, isLenient) {
    return new pexprs.Obj(properties, !!isLenient);
  },

  app: function(ruleName) {
    return new pexprs.Apply(ruleName);
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Builder;


},{"./GrammarDecl.js":16,"./pexprs.js":39}],15:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var InputStream = _dereq_('./InputStream.js');
var Interval = _dereq_('./Interval.js');
var Node = _dereq_('./Node.js');
var State = _dereq_('./State.js');
var attributes = _dereq_('./attributes.js');
var common = _dereq_('./common.js');
var errors = _dereq_('./errors.js');
var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Grammar(name, superGrammar, ruleDict) {
  this.name = name;
  this.superGrammar = superGrammar;
  this.ruleDict = ruleDict;
  this.constructors = this.ctors = this.createConstructors();
}

Grammar.prototype = {
  construct: function(ruleName, children) {
    var body = this.ruleDict[ruleName];
    if (!body || !body.check(this, children) || children.length !== body.getArity()) {
      throw new errors.InvalidConstructorCall(this, ruleName, children);
    }
    var interval = new Interval(InputStream.newFor(children), 0, children.length);
    return new Node(this, ruleName, children, interval);
  },

  createConstructors: function() {
    var self = this;
    var constructors = {};

    function makeConstructor(ruleName) {
      return function(/* val1, val2, ... */) {
        return self.construct(ruleName, Array.prototype.slice.call(arguments));
      };
    }

    for (var ruleName in this.ruleDict) {
      // We want *all* properties, not just own properties, because of
      // supergrammars.
      constructors[ruleName] = makeConstructor(ruleName);
    }
    return constructors;
  },

  match: function(obj, startRule, optThrowOnFail) {
    var throwOnFail = !!optThrowOnFail;
    if (!startRule) {
      throw new TypeError("'startRule' argument cannot be null or undefined");
    }
    var state = this._match(obj, startRule, false);
    var succeeded = state.bindings.length === 1;
    if (succeeded) {
      return state.bindings[0];  // Return the root CSTNode.
    } else if (throwOnFail) {
      throw new errors.MatchFailure(state);
    } else {
      return false;
    }
  },

  _match: function(obj, startRule, tracingEnabled) {
    var inputStream = InputStream.newFor(typeof obj === 'string' ? obj : [obj]);
    var state = new State(this, inputStream, startRule, tracingEnabled);
    var succeeded = new pexprs.Apply(startRule).eval(state);
    if (succeeded) {
      // Link every CSTNode to its parent.
      var node = state.bindings[0];
      var stack = [undefined];
      var setParents = this.semanticAction({
        _terminal: function() {
          this.parent = stack[stack.length - 1];
        },
        _default: function() {
          stack.push(this);
          this.children.forEach(function(child) { setParents(child); });
          stack.pop();
          this.parent = stack[stack.length - 1];
        }
      });
      setParents(node);
    }
    return state;
  },

  trace: function(obj, startRule) {
    return this._match(obj, startRule, true);
  },

  semanticAction: function(actionDict) {
    this.assertTopDownActionNamesAndAritiesMatch(actionDict, 'semantic action');
    return attributes.makeSemanticAction(this, actionDict);
  },

  synthesizedAttribute: function(actionDict) {
    this.assertTopDownActionNamesAndAritiesMatch(actionDict, 'synthesized attribute');
    return attributes.makeSynthesizedAttribute(this, actionDict);
  },

  inheritedAttribute: function(actionDict) {
    // TODO: write an arity-checker for inherited attributes.
    // All of the methods should have arity 1, except for _default, which has
    // arity 2 b/c it also takes an index.
    if (!actionDict._base) {
      throw new Error('inherited attribute missing base case');
    } else if (actionDict._base.length !== 1) {
      throw new Error("inherited attribute's base case must take exactly one argument");
    }
    return attributes.makeInheritedAttribute(this, actionDict);
  },

  assertTopDownActionNamesAndAritiesMatch: function(actionDict, what) {
    var self = this;
    var ruleDict = this.ruleDict;
    var ok = true;
    Object.keys(ruleDict).forEach(function(ruleName) {
      if (actionDict[ruleName] === undefined) {
        return;
      }
      var actual = actionDict[ruleName].length;
      var expected = self.topDownActionArity(ruleName);
      if (actual !== expected) {
        ok = false;
        /* eslint-disable no-console */
        console.log(what + ' for rule', ruleName, 'has the wrong arity');
        console.log('  expected', expected);
        console.log('    actual', actual);
        /* eslint-enable no-console */
      }
    });
    if (!ok) {
      throw new Error(
        'one or more semantic actions have the wrong arity -- see console for details'
      );
    }
  },

  topDownActionArity: function(ruleName) {
    if (this.superGrammar && this.superGrammar.ruleDict[ruleName]) {
      return this.superGrammar.topDownActionArity(ruleName);
    } else {
      var body = this.ruleDict[ruleName];
      return body.getArity();
    }
  },

  toRecipe: function(optVarName) {
    var sb = new common.StringBuffer();
    if (optVarName) {
      sb.append('var ' + optVarName + ' = ');
    }
    sb.append('(function() {\n');

    var superGrammarDecl = '';
    if (this.superGrammar && this.superGrammar !== Grammar.base) {
      sb.append(this.superGrammar.toRecipe('buildSuperGrammar'));
      superGrammarDecl = '    .withSuperGrammar(buildSuperGrammar.call(this))\n';
    }
    sb.append('  return new this.newGrammar(' + common.toStringLiteral(this.name) + ')\n');
    sb.append(superGrammarDecl);

    var self = this;
    Object.keys(this.ruleDict).forEach(function(ruleName) {
      var body = self.ruleDict[ruleName];
      sb.append('    .');
      if (self.superGrammar && self.superGrammar.ruleDict[ruleName]) {
        sb.append(body instanceof pexprs.Extend ? 'extend' : 'override');
      } else {
        sb.append('define');
      }
      sb.append('(' + common.toStringLiteral(ruleName) + ', ');
      body.outputRecipe(sb);
      sb.append(')\n');
    });
    sb.append('    .build();\n});\n');
    return sb.contents();
  },

  // TODO: make sure this is still correct.
  // TODO: the analog of this method for inherited attributes.
  toSemanticActionTemplate: function(/* entryPoint1, entryPoint2, ... */) {
    var entryPoints = arguments.length > 0 ? arguments : Object.keys(this.ruleDict);
    var rulesToBeIncluded = this.rulesThatNeedSemanticAction(entryPoints);

    // TODO: add the super-grammar's templates at the right place, e.g., a case for AddExpr_plus
    // should appear next to other cases of AddExpr.

    var self = this;
    var sb = new common.StringBuffer();
    sb.append('{');

    var first = true;
    for (var ruleName in rulesToBeIncluded) {
      var body = this.ruleDict[ruleName];
      if (first) {
        first = false;
      } else {
        sb.append(',');
      }
      sb.append('\n');
      sb.append('  ');
      self.addSemanticActionTemplate(ruleName, body, sb);
    }

    sb.append('\n}');
    return sb.contents();
  },

  addSemanticActionTemplate: function(ruleName, body, sb) {
    sb.append(ruleName);
    sb.append(': function(');
    var arity = this.topDownActionArity(ruleName);
    sb.append(common.repeat('_', arity).join(', '));
    sb.append(') {\n');
    sb.append('  }');
  },

  rulesThatNeedSemanticAction: function(entryPoints) {
    var self = this;
    function getBody(ruleName) {
      if (self.ruleDict[ruleName] === undefined) {
        throw new errors.UndeclaredRule(ruleName, self.name);
      } else {
        return self.ruleDict[ruleName];
      }
    }

    var rules = {};
    var ruleName;
    for (var idx = 0; idx < entryPoints.length; idx++) {
      ruleName = entryPoints[idx];
      getBody(ruleName);  // to make sure the rule exists
      rules[ruleName] = true;
    }

    var done = false;
    while (!done) {
      done = true;
      for (ruleName in rules) {
        var addedNewRule = getBody(ruleName).addRulesThatNeedSemanticAction(rules, true);
        done &= !addedNewRule;
      }
    }

    return rules;
  }
};

// This object contains Ohm's built-in rules.
Grammar.base = new Grammar('Grammar', null, {
  _: pexprs.anything,
  end: pexprs.end,
  space: pexprs.makePrim(/[\s]/).withDescription('space'),
  alnum: pexprs.makePrim(/[0-9a-zA-Z]/).withDescription('alpha-numeric character'),
  letter: pexprs.makePrim(/[a-zA-Z]/).withDescription('letter'),
  lower: pexprs.makePrim(/[a-z]/).withDescription('lower-case letter'),
  upper: pexprs.makePrim(/[A-Z]/).withDescription('upper-case letter'),
  digit: pexprs.makePrim(/[0-9]/).withDescription('digit'),
  hexDigit: pexprs.makePrim(/[0-9a-fA-F]/).withDescription('hexadecimal digit'),

  // The following rule is part of the implementation.
  // Its name ends with '_' so that it can't be overridden or invoked by programmers.
  spaces_: new pexprs.Many(new pexprs.Apply('space'), 0)
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Grammar;

},{"./InputStream.js":17,"./Interval.js":18,"./Node.js":20,"./State.js":22,"./attributes.js":24,"./common.js":25,"./errors.js":26,"./pexprs.js":39}],16:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Grammar = _dereq_('./Grammar.js');
var errors = _dereq_('./errors.js');
var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Private Stuff
// --------------------------------------------------------------------

// Constructors

function GrammarDecl(name) {
  this.name = name;
}

// Helpers

function onOhmError(doFn, onErrorFn) {
  try {
    doFn();
  } catch (e) {
    if (e instanceof errors.Error) {
      onErrorFn(e);
    } else {
      throw e;
    }
  }
}

GrammarDecl.prototype.ensureSuperGrammar = function() {
  if (!this.superGrammar) {
    this.withSuperGrammar(Grammar.base);
  }
  return this.superGrammar;
};

// Stuff that you should only do once

GrammarDecl.prototype.withSuperGrammar = function(superGrammar) {
  if (this.superGrammar) {
    throw new Error('the super grammar of a GrammarDecl cannot be set more than once');
  }
  this.superGrammar = superGrammar;
  this.ruleDict = Object.create(superGrammar.ruleDict);
  return this;
};

// Creates a Grammar instance, and if it passes the sanity checks, returns it.
GrammarDecl.prototype.build = function() {
  var grammar = new Grammar(this.name, this.ensureSuperGrammar(), this.ruleDict);
  var error;
  Object.keys(grammar.ruleDict).forEach(function(ruleName) {
    var body = grammar.ruleDict[ruleName];
    function handleError(e) {
      error = e;
      console.error(e.toString());  // eslint-disable-line no-console
    }
    // TODO: change the pexpr.prototype.assert... methods to make them add
    // exceptions to an array that's provided as an arg. Then we'll be able to
    // show more than one error of the same type at a time.
    // TODO: include the offending pexpr in the errors, that way we can show
    // the part of the source that caused it.
    onOhmError(function() { body.assertChoicesHaveUniformArity(ruleName); }, handleError);
    onOhmError(function() { body.assertAllApplicationsAreValid(grammar); },  handleError);
  });
  if (error) {
    throw error;
  }
  return grammar;
};

// Rule declarations

GrammarDecl.prototype.define = function(name, body, optDescr) {
  this.ensureSuperGrammar();
  if (optDescr) {
    body.description = optDescr;
  }
  if (this.superGrammar.ruleDict[name]) {
    throw new errors.DuplicateRuleDeclaration(name, this.name, this.superGrammar.name);
  } else if (this.ruleDict[name]) {
    throw new errors.DuplicateRuleDeclaration(name, this.name, this.name);
  }
  this.ruleDict[name] = body;
  return this;
};

GrammarDecl.prototype.override = function(name, body) {
  this.ensureSuperGrammar();
  if (!this.superGrammar.ruleDict[name]) {
    throw new errors.UndeclaredRule(name, this.superGrammar.name);
  }
  this.ruleDict[name] = body;
  return this;
};

GrammarDecl.prototype.extend = function(name, body) {
  this.ensureSuperGrammar();
  if (!this.superGrammar.ruleDict[name]) {
    throw new errors.UndeclaredRule(name, this.superGrammar.name);
  }
  this.ruleDict[name] = new pexprs.Extend(this.superGrammar, name, body);
  return this;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = GrammarDecl;


},{"./Grammar.js":15,"./errors.js":26,"./pexprs.js":39}],17:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var Interval = _dereq_('./Interval.js');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function InputStream() {
  throw new Error('InputStream cannot be instantiated -- it\'s abstract');
}

InputStream.newFor = function(obj) {
  if (typeof obj === 'string') {
    return new StringInputStream(obj);
  } else if (Array.isArray(obj)) {
    return new ListInputStream(obj);
  } else if (obj instanceof InputStream) {
    return obj;
  } else {
    throw new Error('cannot make input stream for ' + obj);
  }
};

InputStream.prototype = {
  init: function(source) {
    this.source = source;
    this.pos = 0;
    this.posInfos = [];
  },

  atEnd: function() {
    return this.pos === this.source.length;
  },

  next: function() {
    if (this.atEnd()) {
      return common.fail;
    } else {
      return this.source[this.pos++];
    }
  },

  matchExactly: function(x) {
    return this.next() === x ? true : common.fail;
  },

  sourceSlice: function(startIdx, endIdx) {
    return this.source.slice(startIdx, endIdx);
  },

  intervalFrom: function(startIdx) {
    return new Interval(this, startIdx, this.pos);
  }
};

function StringInputStream(source) {
  this.init(source);
}

StringInputStream.prototype = Object.create(InputStream.prototype, {
  matchString: {
    value: function(s) {
      for (var idx = 0; idx < s.length; idx++) {
        if (this.matchExactly(s[idx]) === common.fail) {
          return common.fail;
        }
      }
      return true;
    }
  },

  matchRegExp: {
    value: function(e) {
      // IMPORTANT: e must be a non-global, one-character expression, e.g., /./ and /[0-9]/
      var c = this.next();
      return c !== common.fail && e.test(c) ? true : common.fail;
    }
  }
});

function ListInputStream(source) {
  this.init(source);
}

ListInputStream.prototype = Object.create(InputStream.prototype, {
  matchString: {
    value: function(s) {
      return this.matchExactly(s);
    }
  },

  matchRegExp: {
    value: function(e) {
      return this.matchExactly(e);
    }
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = InputStream;


},{"./Interval.js":18,"./common.js":25}],18:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var errors = _dereq_('./errors.js');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Interval(inputStream, startIdx, endIdx) {
  this.inputStream = inputStream;
  this.startIdx = startIdx;
  this.endIdx = endIdx;
}

Interval.coverage = function(/* interval1, interval2, ... */) {
  var inputStream = arguments[0].inputStream;
  var startIdx = arguments[0].startIdx;
  var endIdx = arguments[0].endIdx;
  for (var idx = 1; idx < arguments.length; idx++) {
    var interval = arguments[idx];
    if (interval.inputStream !== inputStream) {
      throw new errors.IntervalSourcesDontMatch();
    } else {
      startIdx = Math.min(startIdx, arguments[idx].startIdx);
      endIdx = Math.max(endIdx, arguments[idx].endIdx);
    }
  }
  return new Interval(inputStream, startIdx, endIdx);
};

Interval.prototype = {
  coverageWith: function(/* interval1, interval2, ... */) {
    var intervals = Array.prototype.slice.call(arguments);
    intervals.push(this);
    return Interval.coverage.apply(undefined, intervals);
  },

  collapsedLeft: function() {
    return new Interval(this.inputStream, this.startIdx, this.startIdx);
  },

  collapsedRight: function() {
    return new Interval(this.inputStream, this.endIdx, this.endIdx);
  },
  // Returns a new Interval which contains the same contents as this one,
  // but with whitespace trimmed from both ends. (This only makes sense when
  // the input stream is a string.)
  trimmed: function() {
    var contents = this.contents;
    var startIdx = this.startIdx + contents.match(/^\s*/)[0].length;
    var endIdx = this.endIdx - contents.match(/\s*$/)[0].length;
    return new Interval(this.inputStream, startIdx, endIdx);
  }
};

Object.defineProperties(Interval.prototype, {
  contents: {
    get: function() {
      if (this._contents === undefined) {
        this._contents = this.inputStream.sourceSlice(this.startIdx, this.endIdx);
      }
      return this._contents;
    },
    enumerable: true
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Interval;


},{"./errors.js":26}],19:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var extend = _dereq_('util-extend');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Namespace() {
}
Namespace.prototype = Object.create(null);

Namespace.asNamespace = function(objOrNamespace) {
  if (objOrNamespace instanceof Namespace) {
    return objOrNamespace;
  }
  return Namespace.createNamespace(objOrNamespace);
};

// Create a new namespace. If `optProps` is specified, all of its properties
// will be copied to the new namespace.
Namespace.createNamespace = function(optProps) {
  return Namespace.extend(Namespace.prototype, optProps);
};

// Create a new namespace which extends another namespace. If `optProps` is
// specified, all of its properties will be copied to the new namespace.
Namespace.extend = function(namespace, optProps) {
  if (namespace !== Namespace.prototype && !(namespace instanceof Namespace)) {
    throw new TypeError('not a Namespace object: ' + namespace);
  }
  var ns = Object.create(namespace, {
    constructor: {
      value: Namespace,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  return extend(ns, optProps);
};

// TODO: Should this be a regular method?
Namespace.toString = function(ns) {
  return Object.prototype.toString.call(ns);
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Namespace;

},{"util-extend":13}],20:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Node(grammar, ctorName, children, interval) {
  this.grammar = grammar;
  this.ctorName = ctorName;
  this.children = children;
  this.interval = interval;
}

Node.prototype.numChildren = function() {
  return this.children.length;
};

Node.prototype.childAt = function(idx) {
  return this.children[idx];
};

Node.prototype.indexOfChild = function(arg) {
  return this.children.indexOf(arg);
};

Node.prototype.hasChildren = function() {
  return this.children.length > 0;
};

Node.prototype.hasNoChildren = function() {
  return !this.hasChildren();
};

Node.prototype.onlyChild = function() {
  if (this.children.length !== 1) {
    throw new Error(
        'cannot get only child of a node of type ' + this.ctorName +
        ' (it has ' + this.numChildren() + ' children)');
  } else {
    return this.firstChild();
  }
};

Node.prototype.firstChild = function() {
  if (this.hasNoChildren()) {
    throw new Error(
        'cannot get first child of a ' + this.ctorName + ' node, which has no children');
  } else {
    return this.childAt(0);
  }
};

Node.prototype.lastChild = function() {
  if (this.hasNoChildren()) {
    throw new Error(
        'cannot get last child of a ' + this.ctorName + ' node, which has no children');
  } else {
    return this.childAt(this.numChildren() - 1);
  }
};

Node.prototype.childBefore = function(child) {
  var childIdx = this.indexOfChild(child);
  if (childIdx < 0) {
    throw new Error('Node.childBefore() called w/ an argument that is not a child');
  } else if (childIdx === 0) {
    throw new Error('cannot get child before first child');
  } else {
    return this.childAt(childIdx - 1);
  }
};

Node.prototype.childAfter = function(child) {
  var childIdx = this.indexOfChild(child);
  if (childIdx < 0) {
    throw new Error('Node.childAfter() called w/ an argument that is not a child');
  } else if (childIdx === this.numChildren() - 1) {
    throw new Error('cannot get child after last child');
  } else {
    return this.childAt(childIdx + 1);
  }
};

Node.prototype.isValue = function() {
  return this.ctorName === '_terminal';
};

Node.prototype.value = function() {
  if (this.isValue()) {
    return this.firstChild();
  } else {
    throw new Error('cannot get value of a non-terminal node (type ' + this.ctorName + ')');
  }
};

Node.prototype.toJSON = function() {
  var r = {};
  r[this.ctorName] = this.children;
  return r;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Node;


},{}],21:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function PosInfo(globalRuleStack) {
  this.globalRuleStack = globalRuleStack;
  this.ruleStack = [];
  // Redundant (could be generated from ruleStack) but useful for performance reasons.
  this.activeRules = {};
  this.memo = {};
}

PosInfo.prototype = {
  isActive: function(ruleName) {
    return this.activeRules[ruleName];
  },

  enter: function(pexpr) {
    this.globalRuleStack.push(pexpr);
    this.ruleStack.push(pexpr);
    this.activeRules[pexpr.ruleName] = true;
  },

  exit: function() {
    var pexpr = this.globalRuleStack.pop();
    this.ruleStack.pop();
    this.activeRules[pexpr.ruleName] = false;
  },

  shouldUseMemoizedResult: function(memoRec) {
    var involvedRules = memoRec.involvedRules;
    for (var ruleName in involvedRules) {
      if (involvedRules[ruleName] && this.activeRules[ruleName]) {
        return false;
      }
    }
    return true;
  },

  getCurrentLeftRecursion: function() {
    if (this.leftRecursionStack) {
      return this.leftRecursionStack[this.leftRecursionStack.length - 1];
    }
  },

  startLeftRecursion: function(ruleName) {
    if (!this.leftRecursionStack) {
      this.leftRecursionStack = [];
    }
    this.leftRecursionStack.push({name: ruleName, value: false, pos: -1, involvedRules: {}});
    this.updateInvolvedRules();
  },

  endLeftRecursion: function(ruleName) {
    this.leftRecursionStack.pop();
  },

  updateInvolvedRules: function() {
    var currentLeftRecursion = this.getCurrentLeftRecursion();
    var involvedRules = currentLeftRecursion.involvedRules;
    var lrRuleName = currentLeftRecursion.name;
    var idx = this.ruleStack.length - 1;
    while (true) {
      var ruleName = this.ruleStack[idx--].ruleName;
      if (ruleName === lrRuleName) {
        break;
      }
      involvedRules[ruleName] = true;
    }
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = PosInfo;

},{}],22:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var PosInfo = _dereq_('./PosInfo.js');
var Trace = _dereq_('./Trace.js');
var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function State(grammar, inputStream, startRule, tracingEnabled) {
  this.grammar = grammar;
  this.origInputStream = inputStream;
  this.startRule = startRule;
  this.tracingEnabled = tracingEnabled;
  this.rightmostFailPos = -1;
  this.init();
}

State.prototype = {
  init: function(optFailuresArray) {
    this.inputStreamStack = [];
    this.posInfosStack = [];
    this.pushInputStream(this.origInputStream);
    this.ruleStack = [];
    this.bindings = [];
    this.failures = optFailuresArray;
    this.ignoreFailuresCount = 0;
    if (this.isTracing()) {
      this.trace = [];
    }
  },

  pushInputStream: function(inputStream) {
    this.inputStreamStack.push(this.inputStream);
    this.posInfosStack.push(this.posInfos);
    this.inputStream = inputStream;
    this.posInfos = [];
  },

  popInputStream: function() {
    this.inputStream = this.inputStreamStack.pop();
    this.posInfos = this.posInfosStack.pop();
  },

  getCurrentPosInfo: function() {
    return this.getPosInfo(this.inputStream.pos);
  },

  getPosInfo: function(pos) {
    var posInfo = this.posInfos[pos];
    return posInfo || (this.posInfos[pos] = new PosInfo(this.ruleStack));
  },

  recordFailure: function(pos, expr) {
    if (this.ignoreFailuresCount > 0) {
      return;
    }
    if (pos < this.rightmostFailPos) {
      // it would be useless to record this failure, so don't do it
      return;
    } else if (pos > this.rightmostFailPos) {
      // new rightmost failure!
      this.rightmostFailPos = pos;
    }
    if (!this.failures) {
      // we're not really recording failures, so we're done
      return;
    }

    // TODO: consider making this code more OO, e.g., add an ExprAndStacks class
    // that supports an addStack(stack) method.
    function addStack(stack, stacks) {
      for (var idx = 0; idx < stacks.length; idx++) {
        var otherStack = stacks[idx];
        if (stack.length !== otherStack.length) {
          continue;
        }
        for (var idx2 = 0; idx2 < stack.length; idx2++) {
          if (stack[idx2] !== otherStack[idx2]) {
            break;
          }
        }
        if (idx2 === stack.length) {
          // found it, no need to add
          return;
        }
      }
      stacks.push(stack);
    }

    // Another failure at right-most position -- record it if it wasn't already.
    var stack = this.ruleStack.slice();
    var exprsAndStacks = this.failures;
    for (var idx = 0; idx < exprsAndStacks.length; idx++) {
      var exprAndStacks = exprsAndStacks[idx];
      if (exprAndStacks.expr === expr) {
        addStack(stack, exprAndStacks.stacks);
        return;
      }
    }
    exprsAndStacks.push({expr: expr, stacks: [stack]});
  },

  ignoreFailures: function() {
    this.ignoreFailuresCount++;
  },

  recordFailures: function() {
    this.ignoreFailuresCount--;
  },

  getFailuresPos: function() {
    return this.rightmostFailPos;
  },

  getFailures: function() {
    if (!this.failures) {
      // Rewind, then try to match the input again, recording failures.
      this.init([]);
      this.tracingEnabled = false;
      var succeeded = new pexprs.Apply(this.startRule).eval(this);
      if (succeeded) {
        this.failures = [];
      }
    }
    return this.failures;
  },

  // Returns the memoized trace entry for `pos` and `expr`, if one exists.
  getMemoizedTraceEntry: function(pos, expr) {
    var posInfo = this.posInfos[pos];
    if (posInfo && expr.ruleName) {
      var memoRec = posInfo.memo[expr.ruleName];
      if (memoRec) {
        return memoRec.traceEntry;
      }
    }
    return null;
  },

  // Make a new trace entry, using the currently active trace array as the
  // new entry's children.
  getTraceEntry: function(pos, expr, result) {
    var entry = this.getMemoizedTraceEntry(pos, expr);
    if (!entry) {
      entry = new Trace(this.inputStream, pos, expr, result, this.trace);
    }
    return entry;
  },

  isTracing: function() {
    return this.tracingEnabled;
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = State;


},{"./PosInfo.js":21,"./Trace.js":23,"./pexprs.js":39}],23:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Interval = _dereq_('./Interval.js');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function linkLeftRecursiveChildren(children) {
  for (var i = 0; i < children.length; ++i) {
    var child = children[i];
    var nextChild = children[i + 1];

    if (nextChild && child.expr === nextChild.expr) {
      child.replacedBy = nextChild;
    }
  }
}

function Trace(inputStream, pos, expr, ans, optChildren) {
  this.children = optChildren || [];
  Object.defineProperty(this, 'displayString', {
    get: function() { return expr.toDisplayString(); }
  });
  this.expr = expr;
  if (ans) {
    this.interval = new Interval(inputStream, pos, inputStream.pos);
  }
  this.isLeftRecursive = false;
  this.pos = pos;
  this.succeeded = !!ans;
}

Trace.prototype.setLeftRecursive = function(leftRecursive) {
  this.isLeftRecursive = leftRecursive;
  if (leftRecursive) {
    linkLeftRecursiveChildren(this.children);
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Trace;

},{"./Interval.js":18}],24:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Symbol = _dereq_('symbol');  // eslint-disable-line no-undef
var Node = _dereq_('./Node');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

var actions = {
  getValue: function() { return this.value(); },
  makeArray: function() {
    throw new Error('BUG: ohm.actions.makeArray should never be called');
  },
  passThrough: function(childNode) {
    throw new Error('BUG: ohm.actions.passThrough should never be called');
  }
};

function makeTopDownThing(grammar, actionDict, memoize) {
  var thing;

  function get(node) {
    function doAction(actionFn, optDontPassChildrenAsAnArgument) {
      if (actionFn === actions.makeArray) {
        if (node.ctorName === '_many') {
          return node.children.map(thing);
        } else {
          throw new Error(
              'the makeArray default action cannot be used with a ' + node.ctorName + ' node');
        }
      } else if (actionFn === actions.passThrough) {
        if (node.ctorName === '_many') {
          throw new Error('the passThrough default action cannot be used with a _many node');
        } else {
          return thing(node.onlyChild());
        }
      } else {
        return optDontPassChildrenAsAnArgument ?
            actionFn.apply(node) :
            actionFn.apply(node, node.children);
      }
    }

    var actionFn;
    if (node.ctorName === '_many' && node.parent) {
      // If an action's name is ctorName$idx, where idx is the 1-based index of a child node that
      // happens to be a list, it should override the _many action for that particular list node.
      var actionName = node.parent.ctorName + '$' + node.parent.indexOfChild(node);
      actionFn = actionDict[actionName];
      if (actionFn) {
        return doAction(actionFn, true);
      }
    }

    actionFn = actionDict[node.ctorName];
    if (actionFn) {
      return doAction(actionFn);
    } else if (actionDict._default && node.ctorName !== '_terminal') {
      return doAction(actionDict._default, true);
    } else {
      throw new Error('missing method for ' + node.ctorName);
    }
  }

  function synthesizedAttribute() {
    var key = Symbol();
    var attribute = function(node) {
      checkNodeAndGrammar(node, grammar, 'synthesized attribute');
      if (!node.hasOwnProperty(key)) {
        node[key] = get(node);
      }
      return node[key];
    };
    attribute.toString = function() { return '[synthesized attribute]'; };
    return attribute;
  }

  function semanticAction() {
    var action = function(node) {
      checkNodeAndGrammar(node, grammar, 'semantic action');
      return get(node);
    };
    action.toString = function() { return '[semantic action]'; };
    return action;
  }

  // `thing` has to be a local variable b/c it's called from `get()`,
  // that's why we don't just return `memoize ? ... : ...`
  thing = memoize ?
    synthesizedAttribute() :
    semanticAction();

  return thing;
}

function checkNodeAndGrammar(node, grammar, what) {
  if (!(node instanceof Node)) {
    throw new Error('not an Ohm CST node: ' + JSON.stringify(node));
  }
  if (node.grammar !== grammar) {
    throw new Error('a node from grammar ' + node.grammar.name +
                    ' cannot be used with a ' + what +
                    ' from grammar ' + grammar.name);
  }
}

function makeSemanticAction(grammar, actionDict) {
  return makeTopDownThing(grammar, actionDict, false);
}

function makeSynthesizedAttribute(grammar, actionDict) {
  return makeTopDownThing(grammar, actionDict, true);
}

function makeInheritedAttribute(grammar, actionDict) {
  var attribute;

  function compute(node) {
    function doAction(actionName, optIncludeChildIndex) {
      var actionFn = actionDict[actionName];
      if (actionFn === actions.makeArray) {
        throw new Error('the makeArray default action cannot be used in an inherited attribute');
      } else if (actionFn === actions.passThrough) {
        attribute.set(attribute(node.parent));
        return actionName;
      } else {
        if (optIncludeChildIndex) {
          actionFn.call(node.parent, node, node.parent.indexOfChild(node));
        } else {
          actionFn.call(node.parent, node);
        }
        return actionName;
      }
    }

    if (!node.parent) {
      if (actionDict._base) {
        return doAction('_base');
      } else {
        throw new Error('missing _base action');
      }
    } else {
      var actionName;
      if (node.parent.ctorName === '_many') {
        // If there is an action called <ctorName>$<idx>$each, where <idx> is the 1-based index
        // of a child node that happens to be a list, it should override the _many method for
        // that particular list node.
        var grandparent = node.parent.parent;
        actionName = grandparent.ctorName + '$' + grandparent.indexOfChild(node.parent) + '$each';
        if (actionDict[actionName]) {
          return doAction(actionName);
        } else if (actionDict._many) {
          actionDict._many.call(node.parent, node, node.parent.indexOfChild(node));
          return '_many';
        } else if (actionDict._default) {
          return doAction('_default', true);
        } else {
          throw new Error('missing ' + actionName + ', _many, or _default method');
        }
      } else {
        actionName = node.parent.ctorName + '$' + node.parent.indexOfChild(node);
        if (actionDict[actionName]) {
          return doAction(actionName);
        } else if (actionDict._default) {
          return doAction('_default', true);
        } else {
          throw new Error('missing ' + actionName + ' or _default method');
        }
      }
    }
  }
  var key = Symbol();
  var currentChildStack = [];
  attribute = function(node) {
    checkNodeAndGrammar(node, grammar, 'inherited attribute');
    if (!node.hasOwnProperty(key)) {
      currentChildStack.push(node);
      try {
        var methodName = compute(node);
        if (!node.hasOwnProperty(key)) {
          throw new Error('method ' + methodName +
                          ' did not set a value for a child node of type ' + node.ctorName);
        }
      } finally {
        currentChildStack.pop();
      }
    }
    return node[key];
  };
  attribute.set = function(value) {
    var node = currentChildStack[currentChildStack.length - 1];
    if (node.hasOwnProperty(key)) {
      throw new Error('the value of an inherited attribute cannot be set more than once');
    } else {
      node[key] = value;
    }
  };
  attribute.toString = function() { return '[inherited attribute]'; };
  return attribute;
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.makeSemanticAction = makeSemanticAction;
exports.makeSynthesizedAttribute = makeSynthesizedAttribute;
exports.makeInheritedAttribute = makeInheritedAttribute;
exports.actions = actions;


},{"./Node":20,"symbol":12}],25:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var extend = _dereq_('util-extend');

// --------------------------------------------------------------------
// Private Stuff
// --------------------------------------------------------------------

var thisModule = exports;

// Helpers

function pad(numberAsString, len) {
  var zeros = [];
  for (var idx = 0; idx < numberAsString.length - len; idx++) {
    zeros.push('0');
  }
  return zeros.join('') + numberAsString;
}

var escapeStringFor = {};
for (var c = 0; c < 128; c++) {
  escapeStringFor[c] = String.fromCharCode(c);
}
escapeStringFor["'".charCodeAt(0)]  = "\\'";
escapeStringFor['"'.charCodeAt(0)]  = '\\"';
escapeStringFor['\\'.charCodeAt(0)] = '\\\\';
escapeStringFor['\b'.charCodeAt(0)] = '\\b';
escapeStringFor['\f'.charCodeAt(0)] = '\\f';
escapeStringFor['\n'.charCodeAt(0)] = '\\n';
escapeStringFor['\r'.charCodeAt(0)] = '\\r';
escapeStringFor['\t'.charCodeAt(0)] = '\\t';
escapeStringFor['\u000b'.charCodeAt(0)] = '\\v';

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.abstract = function() {
  throw new Error('this method is abstract!');
};

// Define a lazily-computed, non-enumerable property named `propName`
// on the object `obj`. `getterFn` will be called to compute the value the
// first time the property is accessed.
exports.defineLazyProperty = function(obj, propName, getterFn) {
  var memo;
  Object.defineProperty(obj, propName, {
    get: function() {
      if (!memo) {
        memo = getterFn.call(this);
      }
      return memo;
    }
  });
};

exports.clone = function(obj) {
  if (obj) {
    return extend({}, obj);
  }
  return obj;
};

exports.extend = extend;

exports.repeatFn = function(fn, n) {
  var arr = [];
  while (n-- > 0) {
    arr.push(fn());
  }
  return arr;
};

exports.repeat = function(x, n) {
  return exports.repeatFn(function() { return x; }, n);
};

exports.getDuplicates = function(array) {
  var duplicates = [];
  for (var idx = 0; idx < array.length; idx++) {
    var x = array[idx];
    if (array.lastIndexOf(x) !== idx && duplicates.indexOf(x) < 0) {
      duplicates.push(x);
    }
  }
  return duplicates;
};

exports.fail = {};

exports.isSyntactic = function(ruleName) {
  var firstChar = ruleName[0];
  return ('A' <= firstChar && firstChar <= 'Z');
};

// StringBuffer

exports.StringBuffer = function() {
  this.strings = [];
};

exports.StringBuffer.prototype.append = function(str) {
  this.strings.push(str);
};

exports.StringBuffer.prototype.contents = function() {
  return this.strings.join('');
};

// Character escaping and unescaping

exports.escapeChar = function(c, optDelim) {
  var charCode = c.charCodeAt(0);
  if ((c === '"' || c === "'") && optDelim && c !== optDelim) {
    return c;
  } else if (charCode < 128) {
    return escapeStringFor[charCode];
  } else if (128 <= charCode && charCode < 256) {
    return '\\x' + pad(charCode.toString(16), 2);
  } else {
    return '\\u' + pad(charCode.toString(16), 4);
  }
};

exports.unescapeChar = function(s) {
  if (s.charAt(0) === '\\') {
    switch (s.charAt(1)) {
      case 'b': return '\b';
      case 'f': return '\f';
      case 'n': return '\n';
      case 'r': return '\r';
      case 't': return '\t';
      case 'v': return '\v';
      case 'x': return String.fromCharCode(parseInt(s.substring(2, 4), 16));
      case 'u': return String.fromCharCode(parseInt(s.substring(2, 6), 16));
      default:   return s.charAt(1);
    }
  } else {
    return s;
  }
};

// Pretty-printing of strings

exports.toStringLiteral = function(str) {
  if (typeof str !== 'string') {
    throw new Error('toStringLiteral only works on strings');
  }
  var hasSingleQuotes = str.indexOf("'") >= 0;
  var hasDoubleQuotes = str.indexOf('"') >= 0;
  var delim = hasSingleQuotes && !hasDoubleQuotes ? '"' : "'";
  var sb = new thisModule.StringBuffer();
  sb.append(delim);
  for (var idx = 0; idx < str.length; idx++) {
    sb.append(thisModule.escapeChar(str[idx], delim));
  }
  sb.append(delim);
  return sb.contents();
};


},{"util-extend":13}],26:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var Namespace = _dereq_('./Namespace.js');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function OhmError() {}
OhmError.prototype = Object.create(Error.prototype);

function makeCustomError(name, initFn) {
  // Make E think it's really called OhmError, so that errors look nicer when they're
  // console.log'ed in Chrome.
  var E = function OhmError() {
    initFn.apply(this, arguments);
    var e = new Error();
    Object.defineProperty(this, 'stack', {get: function() { return e.stack; }});
  };
  E.prototype = Object.create(OhmError.prototype);
  E.prototype.constructor = E;
  E.prototype.name = name;
  return E;
}

function toErrorInfo(pos, str) {
  var lineNum = 1;
  var colNum = 1;

  var currPos = 0;
  var lineStartPos = 0;

  while (currPos < pos) {
    var c = str.charAt(currPos++);
    if (c === '\n') {
      lineNum++;
      colNum = 1;
      lineStartPos = currPos;
    } else if (c !== '\r') {
      colNum++;
    }
  }

  var lineEndPos = str.indexOf('\n', lineStartPos);
  if (lineEndPos < 0) {
    lineEndPos = str.length;
  }

  return {
    lineNum: lineNum,
    colNum: colNum,
    line: str.substr(lineStartPos, lineEndPos - lineStartPos)
  };
}

// Create a verbose error message for an error that occurred during matching.
function getMatchErrorMessage(pos, source, detail) {
  var errorInfo = toErrorInfo(pos, source);
  var sb = new common.StringBuffer();
  sb.append('Line ' + errorInfo.lineNum + ', col ' + errorInfo.colNum + ':\n');
  sb.append('> | ' + errorInfo.line + '\n    ');
  for (var idx = 1; idx < errorInfo.colNum; idx++) {
    sb.append(' ');
  }
  sb.append('^\n');
  sb.append(detail);
  return sb.contents();
}

// Create a short error message for an error that occurred during matching.
function getShortMatchErrorMessage(pos, source, detail) {
  var errorInfo = toErrorInfo(pos, source);
  return 'Line ' + errorInfo.lineNum + ', col ' + errorInfo.colNum + ': ' + detail;
}

function describeRuleStacks(stacks) {
  return stacks.map(function(s) {
    return s.map(function(app) { return app.ruleName; }).join(' > ');
  }).join('; ');
}

// ----------------- runtime errors -----------------

var InfiniteLoop = makeCustomError(
  'ohm.error.InfiniteLoop',
  function(state, expr) {
    var inputStream = state.inputStream;
    var detail = "Infinite loop detected when matching '" + expr.toDisplayString() + "'";
    this.message = getMatchErrorMessage(inputStream.pos, inputStream.source, detail);
  }
);

// ----------------- errors about intervals -----------------

var IntervalSourcesDontMatch = makeCustomError(
    'ohm.error.IntervalSourcesDontMatch',
    function() {
      this.message = "interval sources don't match";
    }
);

// ----------------- errors about grammars -----------------

// Undeclared grammar

var UndeclaredGrammar = makeCustomError(
    'ohm.error.UndeclaredGrammar',
    function(grammarName, namespace) {
      this.grammarName = grammarName;
      this.namespace = namespace;
      if (this.namespace) {
        this.message = 'grammar ' + this.grammarName +
            ' is not declared in namespace ' + Namespace.toString(this.namespace);
      } else {
        this.message = 'undeclared grammar ' + this.grammarName;
      }
    }
);

// Duplicate grammar declaration

var DuplicateGrammarDeclaration = makeCustomError(
    'ohm.error.DuplicateGrammarDeclaration',
    function(grammarName, namespace) {
      this.grammarName = grammarName;
      this.namespace = namespace;
      this.message = 'grammar ' + this.grammarName +
          ' is already declared in namespace ' + Namespace.toString(this.namespace);
    }
);

// ----------------- rules -----------------

// Undeclared rule

var UndeclaredRule = makeCustomError(
    'ohm.error.UndeclaredRule',
    function(ruleName, optGrammarName) {
      this.ruleName = ruleName;
      this.grammarName = optGrammarName;
      this.message = this.grammarName ?
          'rule ' + this.ruleName + ' is not declared in grammar ' + this.grammarName :
          'undeclared rule ' + this.ruleName;
    }
);

// Duplicate rule declaration

var DuplicateRuleDeclaration = makeCustomError(
    'ohm.error.DuplicateRuleDeclaration',
    function(ruleName, offendingGrammarName, declGrammarName) {
      this.ruleName = ruleName;
      this.offendingGrammarName = offendingGrammarName;
      this.declGrammarName = declGrammarName;
      this.message = 'duplicate declaration for rule ' + this.ruleName +
                     ' in grammar ' + this.offendingGrammarName;
      if (this.offendingGrammarName !== declGrammarName) {
        this.message += ' (it was originally declared in grammar ' + this.declGrammarName + ')';
      }
    }
);

// ----------------- arity -----------------

// Inconsistent arity

var InconsistentArity = makeCustomError(
    'ohm.error.InconsistentArity',
    function(ruleName, expected, actual) {
      this.ruleName = ruleName;
      this.expected = expected;
      this.actual = actual;
      this.message =
          'rule ' + this.ruleName + ' involves an alternation which has inconsistent arity ' +
          '(expected ' + this.expected + ', got ' + this.actual + ')';
    }
);

// ----------------- properties -----------------

// Duplicate property names

var DuplicatePropertyNames = makeCustomError(
    'ohm.error.DuplicatePropertyNames',
    function(duplicates) {
      this.duplicates = duplicates;
      this.message = 'object pattern has duplicate property names: ' + this.duplicates.join(', ');
    }
);

// ----------------- syntax -----------------

var MatchFailure = makeCustomError(
    'ohm.error.MatchFailure',
    function(state) {
      this.state = state;
      common.defineLazyProperty(this, 'exprsAndStacks', function() {
        return this.state.getFailures();
      });
      // `displayString` is intended to be shown to users of a grammar.
      common.defineLazyProperty(this, 'displayString', function() {
        return this.getMessage();
      });
      // `message` is intended to be shown to developers of a grammar.
      common.defineLazyProperty(this, 'message', function() {
        return this.getMessage(true);
      });
    }
);

MatchFailure.prototype.getShortMessage = function() {
  if (typeof this.state.inputStream.source !== 'string') {
    return 'match failed at position ' + this.getPos();
  }
  var detail = 'expected' + this.getExpectedText();
  return getShortMatchErrorMessage(this.getPos(), this.state.inputStream.source, detail);
};

MatchFailure.prototype.getMessage = function(optIncludeRules) {
  var source = this.state.inputStream.source;
  if (typeof source !== 'string') {
    return 'match failed at position ' + this.getPos();
  }

  var detail = 'Expected ' + this.getExpectedText(!!optIncludeRules);
  return getMatchErrorMessage(this.getPos(), source, detail);
};

MatchFailure.prototype.getPos = function() {
  return this.state.getFailuresPos();
};

// Return a string summarizing the expected contents of the input stream when
// the match failure occurred. If `includeRules` is true, the string will
// include information about the rule stacks for each terminal or rule.
MatchFailure.prototype.getExpectedText = function(includeRules) {
  var sb = new common.StringBuffer();
  var expected = includeRules ? this.getExpectedWithRules() : this.getExpected();
  for (var idx = 0; idx < expected.length; idx++) {
    if (idx > 0) {
      if (idx === expected.length - 1) {
        sb.append((expected.length > 2 ? ', or ' : ' or '));
      } else {
        sb.append(', ');
      }
    }
    sb.append(expected[idx]);
  }
  return sb.contents();
};

// Return an Array of unique strings representing the terminals or rules that
// were expected to be matched.
MatchFailure.prototype.getExpected = function() {
  var expected = {};
  var ruleDict = this.state.grammar.ruleDict;
  this.exprsAndStacks.forEach(function(obj) {
    expected[obj.expr.toExpected(ruleDict)] = true;
  });
  return Object.keys(expected);
};

// Return an Array of strings representing the terminals or rules that were
// expected to be matched, as well as information about each rule stack.
MatchFailure.prototype.getExpectedWithRules = function() {
  var ans = [];
  var ruleDict = this.state.grammar.ruleDict;
  this.exprsAndStacks.forEach(function(obj) {
    ans.push(obj.expr.toExpected(ruleDict) + ' (' + describeRuleStacks(obj.stacks) + ')');
  }, this);
  return ans;
};

// ----------------- constructors -----------------

// Type error

var InvalidConstructorCall = makeCustomError(
    'ohm.error.InvalidConstructorCall',
    function(grammar, ctorName, children) {
      this.grammar = grammar;
      this.ctorName = ctorName;
      this.children = children;
      this.message = 'Attempt to invoke constructor ' + this.ctorName +
                     ' with invalid or unexpected arguments';
    }
);

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = {
  Error: OhmError,
  InfiniteLoop: InfiniteLoop,
  IntervalSourcesDontMatch: IntervalSourcesDontMatch,
  UndeclaredGrammar: UndeclaredGrammar,
  DuplicateGrammarDeclaration: DuplicateGrammarDeclaration,
  UndeclaredRule: UndeclaredRule,
  DuplicateRuleDeclaration: DuplicateRuleDeclaration,
  InconsistentArity: InconsistentArity,
  DuplicatePropertyNames: DuplicatePropertyNames,
  MatchFailure: MatchFailure,
  InvalidConstructorCall: InvalidConstructorCall
};

},{"./Namespace.js":19,"./common.js":25}],27:[function(_dereq_,module,exports){
/* global XMLHttpRequest */

'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Builder = _dereq_('./Builder.js');
var attributes = _dereq_('./attributes.js');
var common = _dereq_('./common.js');
var errors = _dereq_('./errors.js');

var Namespace = _dereq_('./Namespace.js');
var UnicodeCategories = _dereq_('../third_party/unicode.js').UnicodeCategories;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// The metagrammar, i.e. the grammar for Ohm grammars. Initialized at the
// bottom of this file because loading the grammar requires Ohm itself.
var ohmGrammar;

// Check if `obj` is a DOM element.
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}

function isUndefined(obj) {
  return obj === void 0;
}

// TODO: just use the jQuery thing
function load(url) {
  var req = new XMLHttpRequest();
  req.open('GET', url, false);
  try {
    req.send();
    if (req.status === 0 || req.status === 200) {
      return req.responseText;
    }
  } catch (e) {}
  throw new Error('unable to load url ' + url);
}

// Returns a Grammar instance (i.e., an object with a `match` method) for
// `tree`, which is the concrete syntax tree of a user-written grammar.
// The grammar will be assigned into `namespace` under the name of the grammar
// as specified in the source.
function buildGrammar(tree, namespace, optOhmGrammarForTesting) {
  var builder;
  var decl;
  var currentRuleName;
  var overriding = false;
  var metaGrammar = optOhmGrammarForTesting || ohmGrammar;

  // A set of semantic actions that produces a Grammar instance from the CST.
  var value = metaGrammar.semanticAction({
    Grammar: function(n, s, open, rs, close) {
      builder = new Builder();
      var grammarName = value(n);
      decl = builder.newGrammar(grammarName, namespace);
      value(s);  // force evaluation
      value(rs);  // force evaluation
      var g = decl.build();
      // FIXME: Maybe push this check to GrammarDecl or Grammar.
      if (grammarName in namespace) {
        throw new errors.DuplicateGrammarDeclaration(grammarName, namespace);
      }
      namespace[grammarName] = g;
      return g;
    },

    SuperGrammar: function(_, n) {
      var superGrammarName = value(n);
      // FIXME: Maybe push this check to GrammarDecl.
      if (!namespace || !(superGrammarName in namespace)) {
        throw new errors.UndeclaredGrammar(superGrammarName, namespace);
      }
      decl.withSuperGrammar(namespace[superGrammarName]);
    },

    Rule_define: function(n, fs, d, _, b) {
      currentRuleName = value(n);
      var body = value(b);
      body.definitionInterval = this.interval.trimmed();
      return decl.define(currentRuleName, body, value(d));
    },
    Rule_override: function(n, fs, _, b) {
      currentRuleName = value(n);
      overriding = true;
      var body = value(b);
      body.definitionInterval = this.interval.trimmed();
      var ans = decl.override(currentRuleName, body);
      overriding = false;
      return ans;
    },
    Rule_extend: function(n, fs, _, b) {
      currentRuleName = value(n);
      var ans = decl.extend(currentRuleName, value(b));
      decl.ruleDict[currentRuleName].definitionInterval = this.interval.trimmed();
      return ans;
    },

    Alt: function(term, _, terms) {
      return builder.alt.apply(
          builder, [value(term)].concat(value(terms))).withInterval(this.interval);
    },

    Term_inline: function(b, n) {
      var inlineRuleName = currentRuleName + '_' + value(n);
      var body = value(b);
      body.definitionInterval = this.interval.trimmed();
      if (overriding) {
        decl.override(inlineRuleName, body);
      } else {
        decl.define(inlineRuleName, body);
      }
      return builder.app(inlineRuleName).withInterval(body.interval);
    },

    Seq: function(expr) {
      return builder.seq.apply(builder, value(expr)).withInterval(this.interval);
    },

    Iter_star: function(x, _) {
      return builder.many(value(x), 0).withInterval(this.interval);
    },
    Iter_plus: function(x, _) {
      return builder.many(value(x), 1).withInterval(this.interval);
    },
    Iter_opt: function(x, _) {
      return builder.opt(value(x)).withInterval(this.interval);
    },

    Pred_not: function(_, x) {
      return builder.not(value(x)).withInterval(this.interval);
    },
    Pred_lookahead: function(_, x) {
      return builder.la(value(x)).withInterval(this.interval);
    },

    Base_application: function(rule, ps) {
      return builder.app(value(rule)).withInterval(this.interval);
    },
    Base_prim: function(expr) {
      return builder.prim(value(expr)).withInterval(this.interval);
    },
    Base_paren: function(open, x, close) {
      return value(x);
    },
    Base_arr: function(open, x, close) {
      return builder.arr(value(x)).withInterval(this.interval);
    },
    Base_str: function(open, x, close) {
      return builder.str(value(x));
    },
    Base_obj: function(open, lenient, close) {
      return builder.obj([], value(lenient));
    },
    Base_objWithProps: function(open, ps, _, lenient, close) {
      return builder.obj(value(ps), value(lenient)).withInterval(this.interval);
    },

    Props: function(p, _, ps) {
      return [value(p)].concat(value(ps));
    },
    Prop: function(n, _, p) {
      return {name: value(n), pattern: value(p)};
    },

    ruleDescr: function(open, t, close) {
      return value(t);
    },
    ruleDescrText: function(_) {
      return this.interval.contents.trim();
    },

    caseName: function(_, space1, n, space2, end) {
      return value(n);
    },

    name: function(first, rest) {
      return this.interval.contents;
    },
    nameFirst: function(expr) {},
    nameRest: function(expr) {},

    keyword_undefined: function(_) {
      return undefined;
    },
    keyword_null: function(_) {
      return null;
    },
    keyword_true: function(_) {
      return true;
    },
    keyword_false: function(_) {
      return false;
    },

    string: function(open, cs, close) {
      return value(cs).map(function(c) { return common.unescapeChar(c); }).join('');
    },

    strChar: function(_) {
      return this.interval.contents;
    },

    escapeChar: function(_) {
      return this.interval.contents;
    },

    regExp: function(open, e, close) {
      return value(e);
    },

    reCharClass_unicode: function(open, unicodeClass, close) {
      return UnicodeCategories[value(unicodeClass).join('')];
    },
    reCharClass_ordinary: function(open, _, close) {
      return new RegExp(this.interval.contents);
    },

    number: function(_, digits) {
      return parseInt(this.interval.contents);
    },

    space: function(expr) {},
    space_multiLine: function(start, _, end) {},
    space_singleLine: function(start, _, end) {},

    _many: attributes.actions.makeArray,
    _terminal: attributes.actions.getValue,
    _default: attributes.actions.passThrough
  });
  return value(tree);
}

function compileAndLoad(source, whatItIs, namespace) {
  try {
    var node = ohmGrammar.match(source, whatItIs, true);
    return buildGrammar(node, namespace);
  } catch (e) {
    if (e instanceof errors.MatchFailure) {
      console.log('\n' + e.getMessage());  // eslint-disable-line no-console
    }
    throw e;
  }
}

// Return the contents of a script element, fetching it via XHR if necessary.
function getScriptElementContents(el) {
  if (!isElement(el)) {
    throw new TypeError('Expected a DOM Node');
  }
  if (el.type !== 'text/ohm-js') {
    throw new Error("script tag's type attribute must be text/ohm-js");
  }
  return el.getAttribute('src') ? load(el.getAttribute('src')) : el.innerHTML;
}

function makeGrammar(stringOrNode, optNamespace) {
  var ns = Namespace.extend(Namespace.asNamespace(optNamespace));
  var source = typeof stringOrNode === 'string' ? stringOrNode : [stringOrNode];
  make(source, 'Grammar', ns);
  return ns[Object.keys(ns)[0]];  // Return the one and only property.
}

function makeGrammars(stringOrNodeList, optNamespace) {
  var ns = Namespace.extend(Namespace.asNamespace(optNamespace));
  make(stringOrNodeList, 'Grammars', ns);
  return ns;
}

// Makes a grammar or grammars from `source`, which may be a string, NodeList, or Array.
function make(source, whatItIs, namespace) {
  if (!source || isUndefined(source.length)) {
    throw new TypeError('Expected string or NodeList as first argument');
  }
  if (typeof source === 'string') {
    compileAndLoad(source, whatItIs, namespace);
  } else {
    for (var i = 0; i < source.length; ++i) {
      compileAndLoad(getScriptElementContents(source[i]), whatItIs, namespace);
    }
  }
}

function makeRecipe(recipeFn) {
  return recipeFn.call(new Builder());
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

// Stuff that users should know about

module.exports = {
  actions: attributes.actions,
  createNamespace: Namespace.createNamespace,
  error: errors,
  makeGrammar: makeGrammar,
  makeGrammars: makeGrammars,
  makeRecipe: makeRecipe
};

// Stuff that's only here for bootstrapping, testing, etc.
ohmGrammar = _dereq_('../dist/ohm-grammar.js');
module.exports._buildGrammar = buildGrammar;
module.exports.ohmGrammar = ohmGrammar;

},{"../dist/ohm-grammar.js":1,"../third_party/unicode.js":40,"./Builder.js":14,"./Namespace.js":19,"./attributes.js":24,"./common.js":25,"./errors.js":26}],28:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.addRulesThatNeedSemanticAction = common.abstract;

pexprs.anything.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  // no-op
};

pexprs.end.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  // no-op
};

pexprs.Prim.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  // no-op
};

pexprs.Alt.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  var ans = false;
  for (var idx = 0; idx < this.terms.length; idx++) {
    var term = this.terms[idx];
    ans |= term.addRulesThatNeedSemanticAction(dict, valueRequired);
  }
  return ans;
};

pexprs.Seq.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  var ans = false;
  for (var idx = 0; idx < this.factors.length; idx++) {
    var factor = this.factors[idx];
    ans |= factor.addRulesThatNeedSemanticAction(dict, valueRequired);
  }
  return ans;
};

pexprs.Many.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, valueRequired);
};

pexprs.Opt.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, valueRequired);
};

pexprs.Not.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, false);
};

pexprs.Lookahead.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, valueRequired);
};

pexprs.Arr.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, valueRequired);
};

pexprs.Str.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, valueRequired);
};

pexprs.Obj.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, valueRequired);
};

pexprs.Apply.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  if (!valueRequired || dict[this.ruleName]) {
    return false;
  } else {
    dict[this.ruleName] = true;
    return true;
  }
};


},{"./common.js":25,"./pexprs.js":39}],29:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');
var errors = _dereq_('./errors.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertAllApplicationsAreValid = common.abstract;

pexprs.anything.assertAllApplicationsAreValid = function(grammar) {
  // no-op
};

pexprs.end.assertAllApplicationsAreValid = function(grammar) {
  // no-op
};

pexprs.Prim.prototype.assertAllApplicationsAreValid = function(grammar) {
  // no-op
};

pexprs.Alt.prototype.assertAllApplicationsAreValid = function(grammar) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    this.terms[idx].assertAllApplicationsAreValid(grammar);
  }
};

pexprs.Seq.prototype.assertAllApplicationsAreValid = function(grammar) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertAllApplicationsAreValid(grammar);
  }
};

pexprs.Many.prototype.assertAllApplicationsAreValid = function(grammar) {
  this.expr.assertAllApplicationsAreValid(grammar);
};

pexprs.Opt.prototype.assertAllApplicationsAreValid = function(grammar) {
  this.expr.assertAllApplicationsAreValid(grammar);
};

pexprs.Not.prototype.assertAllApplicationsAreValid = function(grammar) {
  this.expr.assertAllApplicationsAreValid(grammar);
};

pexprs.Lookahead.prototype.assertAllApplicationsAreValid = function(grammar) {
  this.expr.assertAllApplicationsAreValid(grammar);
};

pexprs.Arr.prototype.assertAllApplicationsAreValid = function(grammar) {
  this.expr.assertAllApplicationsAreValid(grammar);
};

pexprs.Str.prototype.assertAllApplicationsAreValid = function(grammar) {
  this.expr.assertAllApplicationsAreValid(grammar);
};

pexprs.Obj.prototype.assertAllApplicationsAreValid = function(grammar) {
  for (var idx = 0; idx < this.properties.length; idx++) {
    this.properties[idx].pattern.assertAllApplicationsAreValid(grammar);
  }
};

pexprs.Apply.prototype.assertAllApplicationsAreValid = function(grammar) {
  if (!grammar.ruleDict[this.ruleName]) {
    throw new errors.UndeclaredRule(this.ruleName, grammar.name);
  }
};


},{"./common.js":25,"./errors.js":26,"./pexprs.js":39}],30:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');
var errors = _dereq_('./errors.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertChoicesHaveUniformArity = common.abstract;

pexprs.anything.assertChoicesHaveUniformArity = function(ruleName) {
  // no-op
};

pexprs.end.assertChoicesHaveUniformArity = function(ruleName) {
  // no-op
};

pexprs.Prim.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // no-op
};

pexprs.Alt.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  if (this.terms.length === 0) {
    return;
  }
  var arity = this.terms[0].getArity();
  for (var idx = 0; idx < this.terms.length; idx++) {
    var term = this.terms[idx];
    term.assertChoicesHaveUniformArity();
    var otherArity = term.getArity();
    if (arity !== otherArity) {
      throw new errors.InconsistentArity(ruleName, arity, otherArity);
    }
  }
};

pexprs.Extend.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // Extend is a special case of Alt that's guaranteed to have exactly two
  // cases: [extensions, origBody].
  var actualArity = this.terms[0].getArity();
  var expectedArity = this.terms[1].getArity();
  if (actualArity !== expectedArity) {
    throw new errors.InconsistentArity(ruleName, expectedArity, actualArity);
  }
};

pexprs.Seq.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertChoicesHaveUniformArity(ruleName);
  }
};

pexprs.Many.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};

pexprs.Opt.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};

pexprs.Not.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // no-op (not required b/c the nested expr doesn't show up in the CST)
};

pexprs.Lookahead.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};

pexprs.Arr.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};

pexprs.Str.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};

pexprs.Obj.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  for (var idx = 0; idx < this.properties.length; idx++) {
    this.properties[idx].pattern.assertChoicesHaveUniformArity(ruleName);
  }
};

pexprs.Apply.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // no-op
};


},{"./common.js":25,"./errors.js":26,"./pexprs.js":39}],31:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var Node = _dereq_('./Node.js');
var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.check = common.abstract;

pexprs.anything.check = function(grammar, vals) {
  return vals.length >= 1;
};

pexprs.end.check = function(grammar, vals) {
  return vals[0] instanceof Node && vals[0].isValue() && vals[0].value() === undefined;
};

pexprs.Prim.prototype.check = function(grammar, vals) {
  return vals[0] instanceof Node && vals[0].isValue() && vals[0].value() === this.obj;
};

pexprs.RegExpPrim.prototype.check = function(grammar, vals) {
  // TODO: more efficient "total match checker" than the use of .replace here
  return vals[0] instanceof Node &&
         vals[0].isValue() &&
         typeof vals[0].value() === 'string' &&
         vals[0].value().replace(this.obj, '') === '';
};

pexprs.Alt.prototype.check = function(grammar, vals) {
  for (var i = 0; i < this.terms.length; i++) {
    var term = this.terms[i];
    if (term.check(grammar, vals)) {
      return true;
    }
  }
  return false;
};

pexprs.Seq.prototype.check = function(grammar, vals) {
  var pos = 0;
  for (var i = 0; i < this.factors.length; i++) {
    var factor = this.factors[i];
    if (factor.check(grammar, vals.slice(pos))) {
      pos += factor.getArity();
    } else {
      return false;
    }
  }
  return true;
};

pexprs.Many.prototype.check = function(grammar, vals) {
  var arity = this.getArity();
  if (arity === 0) {
    // TODO: make this a static check w/ a nice error message, then remove the dynamic check.
    // cf. pexprs-eval.js for Many
    throw new Error('fix me!');
  }

  var columns = vals.slice(0, arity);
  if (columns.length !== arity) {
    return false;
  }
  var rowcount = columns[0].length;
  var i;
  for (i = 1; i < arity; i++) {
    if (columns[i].length !== rowcount) {
      return false;
    }
  }

  for (i = 0; i < rowcount; i++) {
    var row = [];
    for (var j = 0; j < arity; j++) {
      row.push(columns[j][i]);
    }
    if (!this.expr.check(grammar, row)) {
      return false;
    }
  }

  return true;
};

pexprs.Opt.prototype.check = function(grammar, vals) {
  var arity = this.getArity();
  var allUndefined = true;
  for (var i = 0; i < arity; i++) {
    if (vals[i] !== undefined) {
      allUndefined = false;
      break;
    }
  }

  if (allUndefined) {
    return true;
  } else {
    return this.expr.check(grammar, vals);
  }
};

pexprs.Not.prototype.check = function(grammar, vals) {
  return true;
};

pexprs.Lookahead.prototype.check = function(grammar, vals) {
  return this.expr.check(grammar, vals);
};

pexprs.Arr.prototype.check = function(grammar, vals) {
  return this.expr.check(grammar, vals);
};

pexprs.Str.prototype.check = function(grammar, vals) {
  return this.expr.check(grammar, vals);
};

pexprs.Obj.prototype.check = function(grammar, vals) {
  var fixedArity = this.getArity();
  if (this.isLenient) {
    fixedArity--;
  }

  var pos = 0;
  for (var i = 0; i < fixedArity; i++) {
    var pattern = this.properties[i].pattern;
    if (pattern.check(grammar, vals.slice(pos))) {
      pos += pattern.getArity();
    } else {
      return false;
    }
  }

  return this.isLenient ? typeof vals[pos] === 'object' && vals[pos] : true;
};

pexprs.Apply.prototype.check = function(grammar, vals) {
  if (!(vals[0] instanceof Node &&
        vals[0].grammar === grammar &&
        vals[0].ctorName === this.ruleName)) {
    return false;
  }

  // TODO: think about *not* doing the following checks, i.e., trusting that the rule
  // was correctly constructed.
  var ruleNode = vals[0];
  var body = grammar.ruleDict[this.ruleName];
  return body.check(grammar, ruleNode.children) && ruleNode.numChildren() === body.getArity();
};


},{"./Node.js":20,"./common.js":25,"./pexprs.js":39}],32:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var errors = _dereq_('./errors.js');
var Node = _dereq_('./Node.js');
var pexprs = _dereq_('./pexprs.js');
var InputStream = _dereq_('./InputStream.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

var applySpaces_ = new pexprs.Apply('spaces_');

function skipSpacesIfAppropriate(state) {
  var currentRule = state.ruleStack[state.ruleStack.length - 1];
  var ruleName = currentRule.ruleName || '';
  if (typeof state.inputStream.source === 'string' && common.isSyntactic(ruleName)) {
    skipSpaces(state);
  }
}

function skipSpaces(state) {
  state.ignoreFailures();
  applySpaces_.eval(state);
  state.bindings.pop();
  state.recordFailures();
}

// Evaluate the expression and return true if it succeeded, otherwise false.
// On success, the bindings will have `this.arity` more elements than before,
// and the position could be anywhere. On failure, the bindings and position
// will be unchanged.
pexprs.PExpr.prototype.eval = function(state) {
  var origPos = state.inputStream.pos;
  var origNumBindings = state.bindings.length;
  var origTrace = state.trace;
  if (state.isTracing()) {
    state.trace = [];
  }

  // Do the actual evaluation.
  var ans = this._eval(state);

  if (state.isTracing()) {
    var traceEntry = state.getTraceEntry(origPos, this, ans);
    origTrace.push(traceEntry);
    state.trace = origTrace;
  }

  if (!ans) {
    this.maybeRecordFailure(state, origPos);

    // Reset the position and the bindings.
    state.inputStream.pos = origPos;
    state.bindings.length = origNumBindings;
  }
  return ans;
};

// Evaluate the expression and return true if it succeeded, otherwise false.
// This should not be called directly except by `eval`.
//
// The contract of this method is as follows:
// * When the return value is true:
//   -- bindings will have expr.arity more elements than before
// * When the return value is false:
//   -- bindings will have exactly the same number of elements as before
//   -- position could be anywhere

pexprs.PExpr.prototype._eval = common.abstract;

pexprs.anything._eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var value = inputStream.next();
  if (value === common.fail) {
    return false;
  } else {
    var interval = inputStream.intervalFrom(origPos);
    state.bindings.push(new Node(state.grammar, '_terminal', [value], interval));
    return true;
  }
};

pexprs.end._eval = function(state) {
  var inputStream = state.inputStream;
  if (state.inputStream.atEnd()) {
    var interval = inputStream.intervalFrom(inputStream.pos);
    state.bindings.push(new Node(state.grammar, '_terminal', [undefined], interval));
    return true;
  } else {
    return false;
  }
};

pexprs.Prim.prototype._eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (this.match(inputStream) === common.fail) {
    return false;
  } else {
    var interval = inputStream.intervalFrom(origPos);
    state.bindings.push(new Node(state.grammar, '_terminal', [this.obj], interval));
    return true;
  }
};

pexprs.Prim.prototype.match = function(inputStream) {
  return inputStream.matchExactly(this.obj);
};

pexprs.StringPrim.prototype.match = function(inputStream) {
  return inputStream.matchString(this.obj);
};

pexprs.RegExpPrim.prototype._eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (inputStream.matchRegExp(this.obj) === common.fail) {
    return false;
  } else {
    var interval = inputStream.intervalFrom(origPos);
    state.bindings.push(
        new Node(state.grammar, '_terminal', [inputStream.source[origPos]], interval));
    return true;
  }
};

pexprs.Alt.prototype._eval = function(state) {
  var bindings = state.bindings;
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var origNumBindings = bindings.length;
  for (var idx = 0; idx < this.terms.length; idx++) {
    if (this.terms[idx].eval(state)) {
      return true;
    } else {
      inputStream.pos = origPos;
      bindings.length = origNumBindings;
    }
  }
  return false;
};

pexprs.Seq.prototype._eval = function(state) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    skipSpacesIfAppropriate(state);
    var factor = this.factors[idx];
    if (!factor.eval(state)) {
      return false;
    }
  }
  return true;
};

pexprs.Many.prototype._eval = function(state) {
  var arity = this.getArity();
  if (arity === 0) {
    // TODO: make this a static check w/ a nice error message, then remove the dynamic check.
    // cf. pexprs-check.js for Many
    throw new Error('fix me!');
  }

  var columns = common.repeatFn(function() { return []; }, arity);
  var numMatches = 0;
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var idx;
  while (true) {
    var backtrackPos = inputStream.pos;
    skipSpacesIfAppropriate(state);
    if (this.expr.eval(state)) {
      numMatches++;
      var row = state.bindings.splice(state.bindings.length - arity, arity);
      for (idx = 0; idx < row.length; idx++) {
        columns[idx].push(row[idx]);
      }
      if (inputStream.pos === backtrackPos) {
        // TODO: Consider making it a static error for a nullable expression to
        // be inside `Many`.
        throw new errors.InfiniteLoop(state, this);
      }
    } else {
      inputStream.pos = backtrackPos;
      break;
    }
  }
  if (numMatches < this.minNumMatches) {
    return false;
  } else {
    for (idx = 0; idx < columns.length; idx++) {
      var interval = inputStream.intervalFrom(origPos);
      state.bindings.push(new Node(state.grammar, '_many', columns[idx], interval));
    }
    return true;
  }
};

pexprs.Opt.prototype._eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var arity = this.getArity();
  var row;
  if (this.expr.eval(state)) {
    row = state.bindings.splice(state.bindings.length - arity, arity);
  } else {
    inputStream.pos = origPos;
    var interval = inputStream.intervalFrom(origPos);
    row = common.repeat(new Node(state.grammar, '_terminal', [undefined], interval), arity);
  }
  for (var idx = 0; idx < arity; idx++) {
    state.bindings.push(row[idx]);
  }
  return true;
};

pexprs.Not.prototype._eval = function(state) {
  // TODO:
  // * Right now we're just throwing away all of the failures that happen inside a `not`,
  //   and recording `this` as a failed expression.
  // * Double negation should be equivalent to lookahead, but that's not the case right now wrt
  //   failures. E.g., ~~'foo' produces a failure for ~~'foo', but maybe it should produce
  //   a failure for 'foo' instead.

  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  state.ignoreFailures();
  var ans = this.expr.eval(state);
  state.recordFailures();
  if (ans) {
    state.bindings.length -= this.getArity();
    return false;
  } else {
    inputStream.pos = origPos;
    return true;
  }
};

pexprs.Lookahead.prototype._eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (this.expr.eval(state)) {
    inputStream.pos = origPos;
    return true;
  } else {
    return false;
  }
};

pexprs.Arr.prototype._eval = function(state) {
  var inputStream = state.inputStream;
  var obj = inputStream.next();
  if (obj instanceof Array) {
    var objInputStream = InputStream.newFor(obj);
    state.pushInputStream(objInputStream);
    var ans = this.expr.eval(state) && state.inputStream.atEnd();
    state.popInputStream();
    return ans;
  } else {
    return false;
  }
};

pexprs.Str.prototype._eval = function(state) {
  var inputStream = state.inputStream;
  var obj = inputStream.next();
  if (typeof obj === 'string') {
    var strInputStream = InputStream.newFor(obj);
    state.pushInputStream(strInputStream);
    var ans = this.expr.eval(state) && (skipSpacesIfAppropriate(state), state.inputStream.atEnd());
    state.popInputStream();
    return ans;
  } else {
    return false;
  }
};

pexprs.Obj.prototype._eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var obj = inputStream.next();
  if (obj !== common.fail && obj && (typeof obj === 'object' || typeof obj === 'function')) {
    var numOwnPropertiesMatched = 0;
    for (var idx = 0; idx < this.properties.length; idx++) {
      var property = this.properties[idx];
      if (!obj.hasOwnProperty(property.name)) {
        return false;
      }
      var value = obj[property.name];
      var valueInputStream = InputStream.newFor([value]);
      state.pushInputStream(valueInputStream);
      var matched = property.pattern.eval(state) && state.inputStream.atEnd();
      state.popInputStream();
      if (!matched) {
        return false;
      }
      numOwnPropertiesMatched++;
    }
    if (this.isLenient) {
      var remainder = {};
      for (var p in obj) {
        if (obj.hasOwnProperty(p) && this.properties.indexOf(p) < 0) {
          remainder[p] = obj[p];
        }
      }
      var interval = inputStream.intervalFrom(origPos);
      state.bindings.push(new Node(state.grammar, '_terminal', [remainder], interval));
      return true;
    } else {
      return numOwnPropertiesMatched === Object.keys(obj).length;
    }
  } else {
    return false;
  }
};

pexprs.Apply.prototype._eval = function(state) {
  var self = this;
  var inputStream = state.inputStream;
  var grammar = state.grammar;
  var bindings = state.bindings;

  function useMemoizedResult(memoRecOrLR) {
    inputStream.pos = memoRecOrLR.pos;
    if (memoRecOrLR.failureDescriptor) {
      state.recordFailures(memoRecOrLR.failureDescriptor, self);
    }
    if (state.isTracing()) {
      state.trace.push(memoRecOrLR.traceEntry);
    }
    if (memoRecOrLR.value) {
      bindings.push(memoRecOrLR.value);
      return true;
    } else {
      return false;
    }
  }

  var ruleName = this.ruleName;
  var memoKey = this.toMemoKey();

  if (common.isSyntactic(ruleName)) {
    skipSpaces(state);
  }

  var origPosInfo = state.getCurrentPosInfo();

  var memoRec = origPosInfo.memo[memoKey];
  var currentLR;
  if (memoRec && origPosInfo.shouldUseMemoizedResult(memoRec)) {
    return useMemoizedResult(memoRec);
  } else if (origPosInfo.isActive(ruleName)) {
    currentLR = origPosInfo.getCurrentLeftRecursion();
    if (currentLR && currentLR.name === ruleName) {
      origPosInfo.updateInvolvedRules();
      return useMemoizedResult(currentLR);
    } else {
      origPosInfo.startLeftRecursion(ruleName);
      return false;
    }
  } else {
    var body = grammar.ruleDict[ruleName];
    var origPos = inputStream.pos;
    origPosInfo.enter(this);
    if (body.description) {
      state.ignoreFailures();
    }
    var value = this.evalOnce(body, state);
    currentLR = origPosInfo.getCurrentLeftRecursion();
    if (currentLR) {
      if (currentLR.name === ruleName) {
        value = this.handleLeftRecursion(body, state, origPos, currentLR, value);
        origPosInfo.memo[memoKey] = {
          pos: inputStream.pos,
          value: value,
          involvedRules: currentLR.involvedRules
        };
        origPosInfo.endLeftRecursion(ruleName);
      } else if (!currentLR.involvedRules[ruleName]) {
        // Only memoize if this rule is not involved in the current left recursion
        origPosInfo.memo[memoKey] = {pos: inputStream.pos, value: value};
      }
    } else {
      origPosInfo.memo[memoKey] = {pos: inputStream.pos, value: value};
    }
    if (body.description) {
      state.recordFailures();
      if (!value) {
        state.recordFailure(origPos, this);
      }
    }
    // Record trace information in the memo table, so that it is
    // available if the memoized result is used later.
    if (state.isTracing() && origPosInfo.memo[memoKey]) {
      var entry = state.getTraceEntry(origPos, this, value);
      entry.setLeftRecursive(currentLR && (currentLR.name === ruleName));
      origPosInfo.memo[memoKey].traceEntry = entry;
    }
    var ans;
    if (value) {
      bindings.push(value);
      if (state.ruleStack.length === 1) {
        if (common.isSyntactic(ruleName)) {
          skipSpaces(state);
        }
        ans = pexprs.end.eval(state);
        bindings.pop();
      } else {
        ans = true;
      }
    } else {
      ans = false;
    }

    origPosInfo.exit();
    return ans;
  }
};

pexprs.Apply.prototype.evalOnce = function(expr, state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (expr.eval(state)) {
    var arity = expr.getArity();
    var bindings = state.bindings.splice(state.bindings.length - arity, arity);
    var ans = new Node(state.grammar, this.ruleName, bindings, inputStream.intervalFrom(origPos));
    return ans;
  } else {
    return false;
  }
};

pexprs.Apply.prototype.handleLeftRecursion = function(body, state, origPos, currentLR, seedValue) {
  if (!seedValue) {
    return seedValue;
  }

  var value = seedValue;
  currentLR.value = seedValue;
  currentLR.pos = state.inputStream.pos;

  var inputStream = state.inputStream;

  while (true) {
    if (state.isTracing()) {
      currentLR.traceEntry = common.clone(state.trace[state.trace.length - 1]);
    }

    inputStream.pos = origPos;
    value = this.evalOnce(body, state);
    if (value && inputStream.pos > currentLR.pos) {
      // The left-recursive result was expanded -- keep looping.
      currentLR.value = value;
      currentLR.pos = inputStream.pos;
    } else {
      // Failed to expand the result.
      inputStream.pos = currentLR.pos;
      if (state.isTracing()) {
        state.trace.pop();  // Drop last trace entry since `value` was unused.
      }
      break;
    }
  }
  return currentLR.value;
};

},{"./InputStream.js":17,"./Node.js":20,"./common.js":25,"./errors.js":26,"./pexprs.js":39}],33:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.getArity = function() {
  return 1;
};

pexprs.Alt.prototype.getArity = function() {
  // This is ok b/c all terms must have the same arity -- this property is
  // checked by the Grammar constructor.
  return this.terms.length === 0 ? 0 : this.terms[0].getArity();
};

pexprs.Seq.prototype.getArity = function() {
  var arity = 0;
  for (var idx = 0; idx < this.factors.length; idx++) {
    arity += this.factors[idx].getArity();
  }
  return arity;
};

pexprs.Many.prototype.getArity = function() {
  return this.expr.getArity();
};

pexprs.Opt.prototype.getArity = function() {
  return this.expr.getArity();
};

pexprs.Not.prototype.getArity = function() {
  return 0;
};

pexprs.Lookahead.prototype.getArity = function() {
  return this.expr.getArity();
};

pexprs.Arr.prototype.getArity = function() {
  return this.expr.getArity();
};

pexprs.Str.prototype.getArity = function() {
  return this.expr.getArity();
};

pexprs.Obj.prototype.getArity = function() {
  var arity = this.isLenient ? 1 : 0;
  for (var idx = 0; idx < this.properties.length; idx++) {
    arity += this.properties[idx].pattern.getArity();
  }
  return arity;
};


},{"./pexprs.js":39}],34:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

// Do nothing by default.
pexprs.PExpr.prototype.maybeRecordFailure = function(state, startPos) {
};

// For PExprs that directly consume input, record the failure in the state object.
pexprs.anything.maybeRecordFailure =
pexprs.end.maybeRecordFailure =
pexprs.Prim.prototype.maybeRecordFailure =
pexprs.Not.prototype.maybeRecordFailure = function(state, startPos) {
  state.recordFailure(startPos, this);
};

},{"./pexprs.js":39}],35:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.outputRecipe = common.abstract;

pexprs.anything.outputRecipe = function(sb) {
  sb.append('this.anything()');
};

pexprs.end.outputRecipe = function(sb) {
  sb.append('this.end()');
};

pexprs.Prim.prototype.outputRecipe = function(sb) {
  sb.append('this.prim(');
  sb.append(typeof this.obj === 'string' ? common.toStringLiteral(this.obj) : '' + this.obj);
  sb.append(')');
};

pexprs.Alt.prototype.outputRecipe = function(sb) {
  sb.append('this.alt(');
  for (var idx = 0; idx < this.terms.length; idx++) {
    if (idx > 0) {
      sb.append(', ');
    }
    this.terms[idx].outputRecipe(sb);
  }
  sb.append(')');
};

pexprs.Seq.prototype.outputRecipe = function(sb) {
  sb.append('this.seq(');
  for (var idx = 0; idx < this.factors.length; idx++) {
    if (idx > 0) {
      sb.append(', ');
    }
    this.factors[idx].outputRecipe(sb);
  }
  sb.append(')');
};

pexprs.Many.prototype.outputRecipe = function(sb) {
  sb.append('this.many(');
  this.expr.outputRecipe(sb);
  sb.append(', ');
  sb.append(this.minNumMatches);
  sb.append(')');
};

pexprs.Opt.prototype.outputRecipe = function(sb) {
  sb.append('this.opt(');
  this.expr.outputRecipe(sb);
  sb.append(')');
};

pexprs.Not.prototype.outputRecipe = function(sb) {
  sb.append('this.not(');
  this.expr.outputRecipe(sb);
  sb.append(')');
};

pexprs.Lookahead.prototype.outputRecipe = function(sb) {
  sb.append('this.la(');
  this.expr.outputRecipe(sb);
  sb.append(')');
};

pexprs.Arr.prototype.outputRecipe = function(sb) {
  sb.append('this.arr(');
  this.expr.outputRecipe(sb);
  sb.append(')');
};

pexprs.Str.prototype.outputRecipe = function(sb) {
  sb.append('this.str(');
  this.expr.outputRecipe(sb);
  sb.append(')');
};

pexprs.Obj.prototype.outputRecipe = function(sb) {
  function outputPropertyRecipe(prop) {
    sb.append('{name: ');
    sb.append(common.toStringLiteral(prop.name));
    sb.append(', pattern: ');
    prop.pattern.outputRecipe(sb);
    sb.append('}');
  }

  sb.append('this.obj([');
  for (var idx = 0; idx < this.properties.length; idx++) {
    if (idx > 0) {
      sb.append(', ');
    }
    outputPropertyRecipe(this.properties[idx]);
  }
  sb.append('], ');
  sb.append(!!this.isLenient);
  sb.append(')');
};

pexprs.Apply.prototype.outputRecipe = function(sb) {
  sb.append('this.app(');
  sb.append(common.toStringLiteral(this.ruleName));
  sb.append(')');
};


},{"./common.js":25,"./pexprs.js":39}],36:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

// Returns a string representing the PExpr, for use as a UI label, etc.
pexprs.PExpr.prototype.toDisplayString = function() {
  if (this.interval) {
    return this.interval.trimmed().contents;
  }
  return '[' + this.constructor.name + ']';
};

pexprs.Prim.prototype.toDisplayString = function() {
  return String(this.obj);
};

pexprs.StringPrim.prototype.toDisplayString = function() {
  return '"' + this.obj + '"';
};

pexprs.Apply.prototype.toDisplayString = function() {
  return this.ruleName;
};

},{"./pexprs.js":39}],37:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.toExpected = function(ruleDict) {
  return undefined;
};

pexprs.anything.toExpected = function(ruleDict) {
  return 'any object';
};

pexprs.end.toExpected = function(ruleDict) {
  return 'end of input';
};

pexprs.Prim.prototype.toExpected = function(ruleDict) {
  return common.toStringLiteral(this.obj);
};

pexprs.Not.prototype.toExpected = function(ruleDict) {
  if (this.expr === pexprs.anything) {
    return 'nothing';
  } else {
    return 'not ' + this.expr.toExpected(ruleDict);
  }
};

// TODO: think about Arr, Str, and Obj

pexprs.Apply.prototype.toExpected = function(ruleDict) {
  var description = ruleDict[this.ruleName].description;
  if (description) {
    return description;
  } else {
    var article = (/^[aeiouAEIOU]/.test(this.ruleName) ? 'an' : 'a');
    return article + ' ' + this.ruleName;
  }
};


},{"./common.js":25,"./pexprs.js":39}],38:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  e1.toString() === e2.toString() ==> e1 and e2 are semantically equivalent.
  Note that this is not an iff (<==>): e.g.,
  (~"b" "a").toString() !== ("a").toString(), even though
  ~"b" "a" and "a" are interchangeable in any grammar,
  both in terms of the languages they accept and their arities.
*/
pexprs.PExpr.prototype.toString = common.abstract;

pexprs.anything.toString = function() {
  return '_';
};

pexprs.end.toString = function() {
  return 'end';
};

pexprs.Prim.prototype.toString = function() {
  return JSON.stringify(this.obj);
};

pexprs.RegExpPrim.prototype.toString = function() {
  return this.obj.toString();
};

pexprs.Alt.prototype.toString = function() {
  return this.terms.length === 1 ?
    this.terms[0].toString() :
    '(' + this.terms.map(function(term) { return term.toString(); }).join(' | ') + ')';
};

pexprs.Seq.prototype.toString = function() {
  return this.factors.length === 1 ?
    this.factors[0].toString() :
    '(' + this.factors.map(function(factor) { return factor.toString(); }).join(' ') + ')';
};

pexprs.Many.prototype.toString = function() {
  return this.expr + (this.minNumMatches === 0 ? '*' : '+');
};

pexprs.Opt.prototype.toString = function() {
  return this.expr + '?';
};

pexprs.Not.prototype.toString = function() {
  return '~' + this.expr;
};

pexprs.Lookahead.prototype.toString = function() {
  return '&' + this.expr;
};

pexprs.Arr.prototype.toString = function() {
  return '[' + this.expr.toString() + ']';
};

pexprs.Str.prototype.toString = function() {
  return '``' + this.expr.toString() + "''";
};

pexprs.Obj.prototype.toString = function() {
  var parts = ['{'];

  var first = true;
  function emit(part) {
    if (first) {
      first = false;
    } else {
      parts.push(', ');
    }
    parts.push(part);
  }

  this.properties.forEach(function(property) {
    emit(JSON.stringify(property.name) + ': ' + property.pattern.toString());
  });
  if (this.isLenient) {
    emit('...');
  }

  parts.push('}');
  return parts.join('');
};

pexprs.Apply.prototype.toString = function() {
  return this.ruleName;
};

},{"./common.js":25,"./pexprs.js":39}],39:[function(_dereq_,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var errors = _dereq_('./errors.js');
var inherits = _dereq_('inherits');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// General stuff

function PExpr() {
  throw new Error("PExpr cannot be instantiated -- it's abstract");
}

PExpr.prototype.withDescription = function(description) {
  this.description = description;
  return this;
};

PExpr.prototype.withInterval = function(interval) {
  this.interval = interval.trimmed();
  return this;
};

// Anything

var anything = Object.create(PExpr.prototype);

// End

var end = Object.create(PExpr.prototype);

// Primitives

function Prim(obj, optFromInterval) {
  this.obj = obj;
  if (optFromInterval) {
    this.fromInterval = optFromInterval;
  }
}
inherits(Prim, PExpr);

function StringPrim(obj, optFromInterval) {
  this.obj = obj;
  if (optFromInterval) {
    this.fromInterval = optFromInterval;
  }
}
inherits(StringPrim, Prim);

function RegExpPrim(obj, optFromInterval) {
  this.obj = obj;
  if (optFromInterval) {
    this.fromInterval = optFromInterval;
  }
}
inherits(RegExpPrim, Prim);

// Alternation

function Alt(terms) {
  this.terms = terms;
}
inherits(Alt, PExpr);

// Extend is an implementation detail of rule extension

function Extend(superGrammar, name, body) {
  var origBody = superGrammar.ruleDict[name];
  this.terms = [body, origBody];
}
inherits(Extend, Alt);

// Sequences

function Seq(factors) {
  this.factors = factors;
}
inherits(Seq, PExpr);

// Iterators and optionals

function Many(expr, minNumMatches) {
  this.expr = expr;
  this.minNumMatches = minNumMatches;
}
inherits(Many, PExpr);

function Opt(expr) {
  this.expr = expr;
}
inherits(Opt, PExpr);

// Predicates

function Not(expr) {
  this.expr = expr;
}
inherits(Not, PExpr);

function Lookahead(expr) {
  this.expr = expr;
}
inherits(Lookahead, PExpr);

// Array decomposition

function Arr(expr) {
  this.expr = expr;
}
inherits(Arr, PExpr);

// String decomposition

function Str(expr) {
  this.expr = expr;
}
inherits(Str, PExpr);

// Object decomposition

function Obj(properties, isLenient) {
  var names = properties.map(function(property) { return property.name; });
  var duplicates = common.getDuplicates(names);
  if (duplicates.length > 0) {
    throw new errors.DuplicatePropertyNames(duplicates);
  } else {
    this.properties = properties;
    this.isLenient = isLenient;
  }
}
inherits(Obj, PExpr);

// Rule application

function Apply(ruleName, optFromInterval) {
  this.ruleName = ruleName;
  if (optFromInterval) {
    this.fromInterval = optFromInterval;
  }
}
inherits(Apply, PExpr);

// This method just caches the result of `this.toString()` in a non-enumerable property.
Apply.prototype.toMemoKey = function() {
  if (!this._memoKey) {
    Object.defineProperty(this, '_memoKey', {value: this.toString()});
  }
  return this._memoKey;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.makePrim = function(obj, optFromInterval) {
  if (typeof obj === 'string' && obj.length !== 1) {
    return new StringPrim(obj, optFromInterval);
  } else if (obj instanceof RegExp) {
    return new RegExpPrim(obj, optFromInterval);
  } else {
    return new Prim(obj, optFromInterval);
  }
};

exports.PExpr = PExpr;
exports.anything = anything;
exports.end = end;
exports.Prim = Prim;
exports.StringPrim = StringPrim;
exports.RegExpPrim = RegExpPrim;
exports.Alt = Alt;
exports.Extend = Extend;
exports.Seq = Seq;
exports.Many = Many;
exports.Opt = Opt;
exports.Not = Not;
exports.Lookahead = Lookahead;
exports.Arr = Arr;
exports.Str = Str;
exports.Obj = Obj;
exports.Apply = Apply;

// --------------------------------------------------------------------
// Extensions
// --------------------------------------------------------------------

_dereq_('./pexprs-addRulesThatNeedSemanticAction.js');
_dereq_('./pexprs-assertAllApplicationsAreValid.js');
_dereq_('./pexprs-assertChoicesHaveUniformArity.js');
_dereq_('./pexprs-check.js');
_dereq_('./pexprs-eval.js');
_dereq_('./pexprs-maybeRecordFailure.js');
_dereq_('./pexprs-getArity.js');
_dereq_('./pexprs-outputRecipe.js');
_dereq_('./pexprs-toDisplayString.js');
_dereq_('./pexprs-toExpected.js');
_dereq_('./pexprs-toString.js');

},{"./common.js":25,"./errors.js":26,"./pexprs-addRulesThatNeedSemanticAction.js":28,"./pexprs-assertAllApplicationsAreValid.js":29,"./pexprs-assertChoicesHaveUniformArity.js":30,"./pexprs-check.js":31,"./pexprs-eval.js":32,"./pexprs-getArity.js":33,"./pexprs-maybeRecordFailure.js":34,"./pexprs-outputRecipe.js":35,"./pexprs-toDisplayString.js":36,"./pexprs-toExpected.js":37,"./pexprs-toString.js":38,"inherits":11}],40:[function(_dereq_,module,exports){
// From https://code.google.com/p/es-lab/source/browse/trunk/src/parser/unicode.js
exports.UnicodeCategories = {
  ZWNJ : /\u200C/,
  ZWJ  : /\u200D/,
  TAB  : /\u0009/,
  VT   : /\u000B/,
  FF   : /\u000C/,
  SP   : /\u0020/,
  NBSP : /\u00A0/,
  BOM  : /\uFEFF/,
  LF   : /\u000A/,
  CR   : /\u000D/,
  LS   : /\u2028/,
  PS   : /\u2029/,
  L    : /[\u0041-\u005A]|[\u00C0-\u00D6]|[\u00D8-\u00DE]|[\u0100-\u0100]|[\u0102-\u0102]|[\u0104-\u0104]|[\u0106-\u0106]|[\u0108-\u0108]|[\u010A-\u010A]|[\u010C-\u010C]|[\u010E-\u010E]|[\u0110-\u0110]|[\u0112-\u0112]|[\u0114-\u0114]|[\u0116-\u0116]|[\u0118-\u0118]|[\u011A-\u011A]|[\u011C-\u011C]|[\u011E-\u011E]|[\u0120-\u0120]|[\u0122-\u0122]|[\u0124-\u0124]|[\u0126-\u0126]|[\u0128-\u0128]|[\u012A-\u012A]|[\u012C-\u012C]|[\u012E-\u012E]|[\u0130-\u0130]|[\u0132-\u0132]|[\u0134-\u0134]|[\u0136-\u0136]|[\u0139-\u0139]|[\u013B-\u013B]|[\u013D-\u013D]|[\u013F-\u013F]|[\u0141-\u0141]|[\u0143-\u0143]|[\u0145-\u0145]|[\u0147-\u0147]|[\u014A-\u014A]|[\u014C-\u014C]|[\u014E-\u014E]|[\u0150-\u0150]|[\u0152-\u0152]|[\u0154-\u0154]|[\u0156-\u0156]|[\u0158-\u0158]|[\u015A-\u015A]|[\u015C-\u015C]|[\u015E-\u015E]|[\u0160-\u0160]|[\u0162-\u0162]|[\u0164-\u0164]|[\u0166-\u0166]|[\u0168-\u0168]|[\u016A-\u016A]|[\u016C-\u016C]|[\u016E-\u016E]|[\u0170-\u0170]|[\u0172-\u0172]|[\u0174-\u0174]|[\u0176-\u0176]|[\u0178-\u0179]|[\u017B-\u017B]|[\u017D-\u017D]|[\u0181-\u0182]|[\u0184-\u0184]|[\u0186-\u0187]|[\u0189-\u018B]|[\u018E-\u0191]|[\u0193-\u0194]|[\u0196-\u0198]|[\u019C-\u019D]|[\u019F-\u01A0]|[\u01A2-\u01A2]|[\u01A4-\u01A4]|[\u01A6-\u01A7]|[\u01A9-\u01A9]|[\u01AC-\u01AC]|[\u01AE-\u01AF]|[\u01B1-\u01B3]|[\u01B5-\u01B5]|[\u01B7-\u01B8]|[\u01BC-\u01BC]|[\u01C4-\u01C4]|[\u01C7-\u01C7]|[\u01CA-\u01CA]|[\u01CD-\u01CD]|[\u01CF-\u01CF]|[\u01D1-\u01D1]|[\u01D3-\u01D3]|[\u01D5-\u01D5]|[\u01D7-\u01D7]|[\u01D9-\u01D9]|[\u01DB-\u01DB]|[\u01DE-\u01DE]|[\u01E0-\u01E0]|[\u01E2-\u01E2]|[\u01E4-\u01E4]|[\u01E6-\u01E6]|[\u01E8-\u01E8]|[\u01EA-\u01EA]|[\u01EC-\u01EC]|[\u01EE-\u01EE]|[\u01F1-\u01F1]|[\u01F4-\u01F4]|[\u01FA-\u01FA]|[\u01FC-\u01FC]|[\u01FE-\u01FE]|[\u0200-\u0200]|[\u0202-\u0202]|[\u0204-\u0204]|[\u0206-\u0206]|[\u0208-\u0208]|[\u020A-\u020A]|[\u020C-\u020C]|[\u020E-\u020E]|[\u0210-\u0210]|[\u0212-\u0212]|[\u0214-\u0214]|[\u0216-\u0216]|[\u0386-\u0386]|[\u0388-\u038A]|[\u038C-\u038C]|[\u038E-\u038F]|[\u0391-\u03A1]|[\u03A3-\u03AB]|[\u03D2-\u03D4]|[\u03DA-\u03DA]|[\u03DC-\u03DC]|[\u03DE-\u03DE]|[\u03E0-\u03E0]|[\u03E2-\u03E2]|[\u03E4-\u03E4]|[\u03E6-\u03E6]|[\u03E8-\u03E8]|[\u03EA-\u03EA]|[\u03EC-\u03EC]|[\u03EE-\u03EE]|[\u0401-\u040C]|[\u040E-\u042F]|[\u0460-\u0460]|[\u0462-\u0462]|[\u0464-\u0464]|[\u0466-\u0466]|[\u0468-\u0468]|[\u046A-\u046A]|[\u046C-\u046C]|[\u046E-\u046E]|[\u0470-\u0470]|[\u0472-\u0472]|[\u0474-\u0474]|[\u0476-\u0476]|[\u0478-\u0478]|[\u047A-\u047A]|[\u047C-\u047C]|[\u047E-\u047E]|[\u0480-\u0480]|[\u0490-\u0490]|[\u0492-\u0492]|[\u0494-\u0494]|[\u0496-\u0496]|[\u0498-\u0498]|[\u049A-\u049A]|[\u049C-\u049C]|[\u049E-\u049E]|[\u04A0-\u04A0]|[\u04A2-\u04A2]|[\u04A4-\u04A4]|[\u04A6-\u04A6]|[\u04A8-\u04A8]|[\u04AA-\u04AA]|[\u04AC-\u04AC]|[\u04AE-\u04AE]|[\u04B0-\u04B0]|[\u04B2-\u04B2]|[\u04B4-\u04B4]|[\u04B6-\u04B6]|[\u04B8-\u04B8]|[\u04BA-\u04BA]|[\u04BC-\u04BC]|[\u04BE-\u04BE]|[\u04C1-\u04C1]|[\u04C3-\u04C3]|[\u04C7-\u04C7]|[\u04CB-\u04CB]|[\u04D0-\u04D0]|[\u04D2-\u04D2]|[\u04D4-\u04D4]|[\u04D6-\u04D6]|[\u04D8-\u04D8]|[\u04DA-\u04DA]|[\u04DC-\u04DC]|[\u04DE-\u04DE]|[\u04E0-\u04E0]|[\u04E2-\u04E2]|[\u04E4-\u04E4]|[\u04E6-\u04E6]|[\u04E8-\u04E8]|[\u04EA-\u04EA]|[\u04EE-\u04EE]|[\u04F0-\u04F0]|[\u04F2-\u04F2]|[\u04F4-\u04F4]|[\u04F8-\u04F8]|[\u0531-\u0556]|[\u10A0-\u10C5]|[\u1E00-\u1E00]|[\u1E02-\u1E02]|[\u1E04-\u1E04]|[\u1E06-\u1E06]|[\u1E08-\u1E08]|[\u1E0A-\u1E0A]|[\u1E0C-\u1E0C]|[\u1E0E-\u1E0E]|[\u1E10-\u1E10]|[\u1E12-\u1E12]|[\u1E14-\u1E14]|[\u1E16-\u1E16]|[\u1E18-\u1E18]|[\u1E1A-\u1E1A]|[\u1E1C-\u1E1C]|[\u1E1E-\u1E1E]|[\u1E20-\u1E20]|[\u1E22-\u1E22]|[\u1E24-\u1E24]|[\u1E26-\u1E26]|[\u1E28-\u1E28]|[\u1E2A-\u1E2A]|[\u1E2C-\u1E2C]|[\u1E2E-\u1E2E]|[\u1E30-\u1E30]|[\u1E32-\u1E32]|[\u1E34-\u1E34]|[\u1E36-\u1E36]|[\u1E38-\u1E38]|[\u1E3A-\u1E3A]|[\u1E3C-\u1E3C]|[\u1E3E-\u1E3E]|[\u1E40-\u1E40]|[\u1E42-\u1E42]|[\u1E44-\u1E44]|[\u1E46-\u1E46]|[\u1E48-\u1E48]|[\u1E4A-\u1E4A]|[\u1E4C-\u1E4C]|[\u1E4E-\u1E4E]|[\u1E50-\u1E50]|[\u1E52-\u1E52]|[\u1E54-\u1E54]|[\u1E56-\u1E56]|[\u1E58-\u1E58]|[\u1E5A-\u1E5A]|[\u1E5C-\u1E5C]|[\u1E5E-\u1E5E]|[\u1E60-\u1E60]|[\u1E62-\u1E62]|[\u1E64-\u1E64]|[\u1E66-\u1E66]|[\u1E68-\u1E68]|[\u1E6A-\u1E6A]|[\u1E6C-\u1E6C]|[\u1E6E-\u1E6E]|[\u1E70-\u1E70]|[\u1E72-\u1E72]|[\u1E74-\u1E74]|[\u1E76-\u1E76]|[\u1E78-\u1E78]|[\u1E7A-\u1E7A]|[\u1E7C-\u1E7C]|[\u1E7E-\u1E7E]|[\u1E80-\u1E80]|[\u1E82-\u1E82]|[\u1E84-\u1E84]|[\u1E86-\u1E86]|[\u1E88-\u1E88]|[\u1E8A-\u1E8A]|[\u1E8C-\u1E8C]|[\u1E8E-\u1E8E]|[\u1E90-\u1E90]|[\u1E92-\u1E92]|[\u1E94-\u1E94]|[\u1EA0-\u1EA0]|[\u1EA2-\u1EA2]|[\u1EA4-\u1EA4]|[\u1EA6-\u1EA6]|[\u1EA8-\u1EA8]|[\u1EAA-\u1EAA]|[\u1EAC-\u1EAC]|[\u1EAE-\u1EAE]|[\u1EB0-\u1EB0]|[\u1EB2-\u1EB2]|[\u1EB4-\u1EB4]|[\u1EB6-\u1EB6]|[\u1EB8-\u1EB8]|[\u1EBA-\u1EBA]|[\u1EBC-\u1EBC]|[\u1EBE-\u1EBE]|[\u1EC0-\u1EC0]|[\u1EC2-\u1EC2]|[\u1EC4-\u1EC4]|[\u1EC6-\u1EC6]|[\u1EC8-\u1EC8]|[\u1ECA-\u1ECA]|[\u1ECC-\u1ECC]|[\u1ECE-\u1ECE]|[\u1ED0-\u1ED0]|[\u1ED2-\u1ED2]|[\u1ED4-\u1ED4]|[\u1ED6-\u1ED6]|[\u1ED8-\u1ED8]|[\u1EDA-\u1EDA]|[\u1EDC-\u1EDC]|[\u1EDE-\u1EDE]|[\u1EE0-\u1EE0]|[\u1EE2-\u1EE2]|[\u1EE4-\u1EE4]|[\u1EE6-\u1EE6]|[\u1EE8-\u1EE8]|[\u1EEA-\u1EEA]|[\u1EEC-\u1EEC]|[\u1EEE-\u1EEE]|[\u1EF0-\u1EF0]|[\u1EF2-\u1EF2]|[\u1EF4-\u1EF4]|[\u1EF6-\u1EF6]|[\u1EF8-\u1EF8]|[\u1F08-\u1F0F]|[\u1F18-\u1F1D]|[\u1F28-\u1F2F]|[\u1F38-\u1F3F]|[\u1F48-\u1F4D]|[\u1F59-\u1F59]|[\u1F5B-\u1F5B]|[\u1F5D-\u1F5D]|[\u1F5F-\u1F5F]|[\u1F68-\u1F6F]|[\u1F88-\u1F8F]|[\u1F98-\u1F9F]|[\u1FA8-\u1FAF]|[\u1FB8-\u1FBC]|[\u1FC8-\u1FCC]|[\u1FD8-\u1FDB]|[\u1FE8-\u1FEC]|[\u1FF8-\u1FFC]|[\u2102-\u2102]|[\u2107-\u2107]|[\u210B-\u210D]|[\u2110-\u2112]|[\u2115-\u2115]|[\u2119-\u211D]|[\u2124-\u2124]|[\u2126-\u2126]|[\u2128-\u2128]|[\u212A-\u212D]|[\u2130-\u2131]|[\u2133-\u2133]|[\uFF21-\uFF3A]|[\u0061-\u007A]|[\u00AA-\u00AA]|[\u00B5-\u00B5]|[\u00BA-\u00BA]|[\u00DF-\u00F6]|[\u00F8-\u00FF]|[\u0101-\u0101]|[\u0103-\u0103]|[\u0105-\u0105]|[\u0107-\u0107]|[\u0109-\u0109]|[\u010B-\u010B]|[\u010D-\u010D]|[\u010F-\u010F]|[\u0111-\u0111]|[\u0113-\u0113]|[\u0115-\u0115]|[\u0117-\u0117]|[\u0119-\u0119]|[\u011B-\u011B]|[\u011D-\u011D]|[\u011F-\u011F]|[\u0121-\u0121]|[\u0123-\u0123]|[\u0125-\u0125]|[\u0127-\u0127]|[\u0129-\u0129]|[\u012B-\u012B]|[\u012D-\u012D]|[\u012F-\u012F]|[\u0131-\u0131]|[\u0133-\u0133]|[\u0135-\u0135]|[\u0137-\u0138]|[\u013A-\u013A]|[\u013C-\u013C]|[\u013E-\u013E]|[\u0140-\u0140]|[\u0142-\u0142]|[\u0144-\u0144]|[\u0146-\u0146]|[\u0148-\u0149]|[\u014B-\u014B]|[\u014D-\u014D]|[\u014F-\u014F]|[\u0151-\u0151]|[\u0153-\u0153]|[\u0155-\u0155]|[\u0157-\u0157]|[\u0159-\u0159]|[\u015B-\u015B]|[\u015D-\u015D]|[\u015F-\u015F]|[\u0161-\u0161]|[\u0163-\u0163]|[\u0165-\u0165]|[\u0167-\u0167]|[\u0169-\u0169]|[\u016B-\u016B]|[\u016D-\u016D]|[\u016F-\u016F]|[\u0171-\u0171]|[\u0173-\u0173]|[\u0175-\u0175]|[\u0177-\u0177]|[\u017A-\u017A]|[\u017C-\u017C]|[\u017E-\u0180]|[\u0183-\u0183]|[\u0185-\u0185]|[\u0188-\u0188]|[\u018C-\u018D]|[\u0192-\u0192]|[\u0195-\u0195]|[\u0199-\u019B]|[\u019E-\u019E]|[\u01A1-\u01A1]|[\u01A3-\u01A3]|[\u01A5-\u01A5]|[\u01A8-\u01A8]|[\u01AB-\u01AB]|[\u01AD-\u01AD]|[\u01B0-\u01B0]|[\u01B4-\u01B4]|[\u01B6-\u01B6]|[\u01B9-\u01BA]|[\u01BD-\u01BD]|[\u01C6-\u01C6]|[\u01C9-\u01C9]|[\u01CC-\u01CC]|[\u01CE-\u01CE]|[\u01D0-\u01D0]|[\u01D2-\u01D2]|[\u01D4-\u01D4]|[\u01D6-\u01D6]|[\u01D8-\u01D8]|[\u01DA-\u01DA]|[\u01DC-\u01DD]|[\u01DF-\u01DF]|[\u01E1-\u01E1]|[\u01E3-\u01E3]|[\u01E5-\u01E5]|[\u01E7-\u01E7]|[\u01E9-\u01E9]|[\u01EB-\u01EB]|[\u01ED-\u01ED]|[\u01EF-\u01F0]|[\u01F3-\u01F3]|[\u01F5-\u01F5]|[\u01FB-\u01FB]|[\u01FD-\u01FD]|[\u01FF-\u01FF]|[\u0201-\u0201]|[\u0203-\u0203]|[\u0205-\u0205]|[\u0207-\u0207]|[\u0209-\u0209]|[\u020B-\u020B]|[\u020D-\u020D]|[\u020F-\u020F]|[\u0211-\u0211]|[\u0213-\u0213]|[\u0215-\u0215]|[\u0217-\u0217]|[\u0250-\u02A8]|[\u0390-\u0390]|[\u03AC-\u03CE]|[\u03D0-\u03D1]|[\u03D5-\u03D6]|[\u03E3-\u03E3]|[\u03E5-\u03E5]|[\u03E7-\u03E7]|[\u03E9-\u03E9]|[\u03EB-\u03EB]|[\u03ED-\u03ED]|[\u03EF-\u03F2]|[\u0430-\u044F]|[\u0451-\u045C]|[\u045E-\u045F]|[\u0461-\u0461]|[\u0463-\u0463]|[\u0465-\u0465]|[\u0467-\u0467]|[\u0469-\u0469]|[\u046B-\u046B]|[\u046D-\u046D]|[\u046F-\u046F]|[\u0471-\u0471]|[\u0473-\u0473]|[\u0475-\u0475]|[\u0477-\u0477]|[\u0479-\u0479]|[\u047B-\u047B]|[\u047D-\u047D]|[\u047F-\u047F]|[\u0481-\u0481]|[\u0491-\u0491]|[\u0493-\u0493]|[\u0495-\u0495]|[\u0497-\u0497]|[\u0499-\u0499]|[\u049B-\u049B]|[\u049D-\u049D]|[\u049F-\u049F]|[\u04A1-\u04A1]|[\u04A3-\u04A3]|[\u04A5-\u04A5]|[\u04A7-\u04A7]|[\u04A9-\u04A9]|[\u04AB-\u04AB]|[\u04AD-\u04AD]|[\u04AF-\u04AF]|[\u04B1-\u04B1]|[\u04B3-\u04B3]|[\u04B5-\u04B5]|[\u04B7-\u04B7]|[\u04B9-\u04B9]|[\u04BB-\u04BB]|[\u04BD-\u04BD]|[\u04BF-\u04BF]|[\u04C2-\u04C2]|[\u04C4-\u04C4]|[\u04C8-\u04C8]|[\u04CC-\u04CC]|[\u04D1-\u04D1]|[\u04D3-\u04D3]|[\u04D5-\u04D5]|[\u04D7-\u04D7]|[\u04D9-\u04D9]|[\u04DB-\u04DB]|[\u04DD-\u04DD]|[\u04DF-\u04DF]|[\u04E1-\u04E1]|[\u04E3-\u04E3]|[\u04E5-\u04E5]|[\u04E7-\u04E7]|[\u04E9-\u04E9]|[\u04EB-\u04EB]|[\u04EF-\u04EF]|[\u04F1-\u04F1]|[\u04F3-\u04F3]|[\u04F5-\u04F5]|[\u04F9-\u04F9]|[\u0561-\u0587]|[\u10D0-\u10F6]|[\u1E01-\u1E01]|[\u1E03-\u1E03]|[\u1E05-\u1E05]|[\u1E07-\u1E07]|[\u1E09-\u1E09]|[\u1E0B-\u1E0B]|[\u1E0D-\u1E0D]|[\u1E0F-\u1E0F]|[\u1E11-\u1E11]|[\u1E13-\u1E13]|[\u1E15-\u1E15]|[\u1E17-\u1E17]|[\u1E19-\u1E19]|[\u1E1B-\u1E1B]|[\u1E1D-\u1E1D]|[\u1E1F-\u1E1F]|[\u1E21-\u1E21]|[\u1E23-\u1E23]|[\u1E25-\u1E25]|[\u1E27-\u1E27]|[\u1E29-\u1E29]|[\u1E2B-\u1E2B]|[\u1E2D-\u1E2D]|[\u1E2F-\u1E2F]|[\u1E31-\u1E31]|[\u1E33-\u1E33]|[\u1E35-\u1E35]|[\u1E37-\u1E37]|[\u1E39-\u1E39]|[\u1E3B-\u1E3B]|[\u1E3D-\u1E3D]|[\u1E3F-\u1E3F]|[\u1E41-\u1E41]|[\u1E43-\u1E43]|[\u1E45-\u1E45]|[\u1E47-\u1E47]|[\u1E49-\u1E49]|[\u1E4B-\u1E4B]|[\u1E4D-\u1E4D]|[\u1E4F-\u1E4F]|[\u1E51-\u1E51]|[\u1E53-\u1E53]|[\u1E55-\u1E55]|[\u1E57-\u1E57]|[\u1E59-\u1E59]|[\u1E5B-\u1E5B]|[\u1E5D-\u1E5D]|[\u1E5F-\u1E5F]|[\u1E61-\u1E61]|[\u1E63-\u1E63]|[\u1E65-\u1E65]|[\u1E67-\u1E67]|[\u1E69-\u1E69]|[\u1E6B-\u1E6B]|[\u1E6D-\u1E6D]|[\u1E6F-\u1E6F]|[\u1E71-\u1E71]|[\u1E73-\u1E73]|[\u1E75-\u1E75]|[\u1E77-\u1E77]|[\u1E79-\u1E79]|[\u1E7B-\u1E7B]|[\u1E7D-\u1E7D]|[\u1E7F-\u1E7F]|[\u1E81-\u1E81]|[\u1E83-\u1E83]|[\u1E85-\u1E85]|[\u1E87-\u1E87]|[\u1E89-\u1E89]|[\u1E8B-\u1E8B]|[\u1E8D-\u1E8D]|[\u1E8F-\u1E8F]|[\u1E91-\u1E91]|[\u1E93-\u1E93]|[\u1E95-\u1E9B]|[\u1EA1-\u1EA1]|[\u1EA3-\u1EA3]|[\u1EA5-\u1EA5]|[\u1EA7-\u1EA7]|[\u1EA9-\u1EA9]|[\u1EAB-\u1EAB]|[\u1EAD-\u1EAD]|[\u1EAF-\u1EAF]|[\u1EB1-\u1EB1]|[\u1EB3-\u1EB3]|[\u1EB5-\u1EB5]|[\u1EB7-\u1EB7]|[\u1EB9-\u1EB9]|[\u1EBB-\u1EBB]|[\u1EBD-\u1EBD]|[\u1EBF-\u1EBF]|[\u1EC1-\u1EC1]|[\u1EC3-\u1EC3]|[\u1EC5-\u1EC5]|[\u1EC7-\u1EC7]|[\u1EC9-\u1EC9]|[\u1ECB-\u1ECB]|[\u1ECD-\u1ECD]|[\u1ECF-\u1ECF]|[\u1ED1-\u1ED1]|[\u1ED3-\u1ED3]|[\u1ED5-\u1ED5]|[\u1ED7-\u1ED7]|[\u1ED9-\u1ED9]|[\u1EDB-\u1EDB]|[\u1EDD-\u1EDD]|[\u1EDF-\u1EDF]|[\u1EE1-\u1EE1]|[\u1EE3-\u1EE3]|[\u1EE5-\u1EE5]|[\u1EE7-\u1EE7]|[\u1EE9-\u1EE9]|[\u1EEB-\u1EEB]|[\u1EED-\u1EED]|[\u1EEF-\u1EEF]|[\u1EF1-\u1EF1]|[\u1EF3-\u1EF3]|[\u1EF5-\u1EF5]|[\u1EF7-\u1EF7]|[\u1EF9-\u1EF9]|[\u1F00-\u1F07]|[\u1F10-\u1F15]|[\u1F20-\u1F27]|[\u1F30-\u1F37]|[\u1F40-\u1F45]|[\u1F50-\u1F57]|[\u1F60-\u1F67]|[\u1F70-\u1F7D]|[\u1F80-\u1F87]|[\u1F90-\u1F97]|[\u1FA0-\u1FA7]|[\u1FB0-\u1FB4]|[\u1FB6-\u1FB7]|[\u1FBE-\u1FBE]|[\u1FC2-\u1FC4]|[\u1FC6-\u1FC7]|[\u1FD0-\u1FD3]|[\u1FD6-\u1FD7]|[\u1FE0-\u1FE7]|[\u1FF2-\u1FF4]|[\u1FF6-\u1FF7]|[\u207F-\u207F]|[\u210A-\u210A]|[\u210E-\u210F]|[\u2113-\u2113]|[\u2118-\u2118]|[\u212E-\u212F]|[\u2134-\u2134]|[\uFB00-\uFB06]|[\uFB13-\uFB17]|[\uFF41-\uFF5A]|[\u01C5-\u01C5]|[\u01C8-\u01C8]|[\u01CB-\u01CB]|[\u01F2-\u01F2]|[\u02B0-\u02B8]|[\u02BB-\u02C1]|[\u02D0-\u02D1]|[\u02E0-\u02E4]|[\u037A-\u037A]|[\u0559-\u0559]|[\u0640-\u0640]|[\u06E5-\u06E6]|[\u0E46-\u0E46]|[\u0EC6-\u0EC6]|[\u3005-\u3005]|[\u3031-\u3035]|[\u309D-\u309E]|[\u30FC-\u30FE]|[\uFF70-\uFF70]|[\uFF9E-\uFF9F]|[\u01AA-\u01AA]|[\u01BB-\u01BB]|[\u01BE-\u01C3]|[\u03F3-\u03F3]|[\u04C0-\u04C0]|[\u05D0-\u05EA]|[\u05F0-\u05F2]|[\u0621-\u063A]|[\u0641-\u064A]|[\u0671-\u06B7]|[\u06BA-\u06BE]|[\u06C0-\u06CE]|[\u06D0-\u06D3]|[\u06D5-\u06D5]|[\u0905-\u0939]|[\u093D-\u093D]|[\u0950-\u0950]|[\u0958-\u0961]|[\u0985-\u098C]|[\u098F-\u0990]|[\u0993-\u09A8]|[\u09AA-\u09B0]|[\u09B2-\u09B2]|[\u09B6-\u09B9]|[\u09DC-\u09DD]|[\u09DF-\u09E1]|[\u09F0-\u09F1]|[\u0A05-\u0A0A]|[\u0A0F-\u0A10]|[\u0A13-\u0A28]|[\u0A2A-\u0A30]|[\u0A32-\u0A33]|[\u0A35-\u0A36]|[\u0A38-\u0A39]|[\u0A59-\u0A5C]|[\u0A5E-\u0A5E]|[\u0A72-\u0A74]|[\u0A85-\u0A8B]|[\u0A8D-\u0A8D]|[\u0A8F-\u0A91]|[\u0A93-\u0AA8]|[\u0AAA-\u0AB0]|[\u0AB2-\u0AB3]|[\u0AB5-\u0AB9]|[\u0ABD-\u0ABD]|[\u0AD0-\u0AD0]|[\u0AE0-\u0AE0]|[\u0B05-\u0B0C]|[\u0B0F-\u0B10]|[\u0B13-\u0B28]|[\u0B2A-\u0B30]|[\u0B32-\u0B33]|[\u0B36-\u0B39]|[\u0B3D-\u0B3D]|[\u0B5C-\u0B5D]|[\u0B5F-\u0B61]|[\u0B85-\u0B8A]|[\u0B8E-\u0B90]|[\u0B92-\u0B95]|[\u0B99-\u0B9A]|[\u0B9C-\u0B9C]|[\u0B9E-\u0B9F]|[\u0BA3-\u0BA4]|[\u0BA8-\u0BAA]|[\u0BAE-\u0BB5]|[\u0BB7-\u0BB9]|[\u0C05-\u0C0C]|[\u0C0E-\u0C10]|[\u0C12-\u0C28]|[\u0C2A-\u0C33]|[\u0C35-\u0C39]|[\u0C60-\u0C61]|[\u0C85-\u0C8C]|[\u0C8E-\u0C90]|[\u0C92-\u0CA8]|[\u0CAA-\u0CB3]|[\u0CB5-\u0CB9]|[\u0CDE-\u0CDE]|[\u0CE0-\u0CE1]|[\u0D05-\u0D0C]|[\u0D0E-\u0D10]|[\u0D12-\u0D28]|[\u0D2A-\u0D39]|[\u0D60-\u0D61]|[\u0E01-\u0E30]|[\u0E32-\u0E33]|[\u0E40-\u0E45]|[\u0E81-\u0E82]|[\u0E84-\u0E84]|[\u0E87-\u0E88]|[\u0E8A-\u0E8A]|[\u0E8D-\u0E8D]|[\u0E94-\u0E97]|[\u0E99-\u0E9F]|[\u0EA1-\u0EA3]|[\u0EA5-\u0EA5]|[\u0EA7-\u0EA7]|[\u0EAA-\u0EAB]|[\u0EAD-\u0EB0]|[\u0EB2-\u0EB3]|[\u0EBD-\u0EBD]|[\u0EC0-\u0EC4]|[\u0EDC-\u0EDD]|[\u0F00-\u0F00]|[\u0F40-\u0F47]|[\u0F49-\u0F69]|[\u0F88-\u0F8B]|[\u1100-\u1159]|[\u115F-\u11A2]|[\u11A8-\u11F9]|[\u2135-\u2138]|[\u3006-\u3006]|[\u3041-\u3094]|[\u30A1-\u30FA]|[\u3105-\u312C]|[\u3131-\u318E]|[\u4E00-\u9FA5]|[\uAC00-\uD7A3]|[\uF900-\uFA2D]|[\uFB1F-\uFB28]|[\uFB2A-\uFB36]|[\uFB38-\uFB3C]|[\uFB3E-\uFB3E]|[\uFB40-\uFB41]|[\uFB43-\uFB44]|[\uFB46-\uFBB1]|[\uFBD3-\uFD3D]|[\uFD50-\uFD8F]|[\uFD92-\uFDC7]|[\uFDF0-\uFDFB]|[\uFE70-\uFE72]|[\uFE74-\uFE74]|[\uFE76-\uFEFC]|[\uFF66-\uFF6F]|[\uFF71-\uFF9D]|[\uFFA0-\uFFBE]|[\uFFC2-\uFFC7]|[\uFFCA-\uFFCF]|[\uFFD2-\uFFD7]|[\uFFDA-\uFFDC]/,

/* L = union of the below Unicode categories */
  Lu   : /[\u0041-\u005A]|[\u00C0-\u00D6]|[\u00D8-\u00DE]|[\u0100-\u0100]|[\u0102-\u0102]|[\u0104-\u0104]|[\u0106-\u0106]|[\u0108-\u0108]|[\u010A-\u010A]|[\u010C-\u010C]|[\u010E-\u010E]|[\u0110-\u0110]|[\u0112-\u0112]|[\u0114-\u0114]|[\u0116-\u0116]|[\u0118-\u0118]|[\u011A-\u011A]|[\u011C-\u011C]|[\u011E-\u011E]|[\u0120-\u0120]|[\u0122-\u0122]|[\u0124-\u0124]|[\u0126-\u0126]|[\u0128-\u0128]|[\u012A-\u012A]|[\u012C-\u012C]|[\u012E-\u012E]|[\u0130-\u0130]|[\u0132-\u0132]|[\u0134-\u0134]|[\u0136-\u0136]|[\u0139-\u0139]|[\u013B-\u013B]|[\u013D-\u013D]|[\u013F-\u013F]|[\u0141-\u0141]|[\u0143-\u0143]|[\u0145-\u0145]|[\u0147-\u0147]|[\u014A-\u014A]|[\u014C-\u014C]|[\u014E-\u014E]|[\u0150-\u0150]|[\u0152-\u0152]|[\u0154-\u0154]|[\u0156-\u0156]|[\u0158-\u0158]|[\u015A-\u015A]|[\u015C-\u015C]|[\u015E-\u015E]|[\u0160-\u0160]|[\u0162-\u0162]|[\u0164-\u0164]|[\u0166-\u0166]|[\u0168-\u0168]|[\u016A-\u016A]|[\u016C-\u016C]|[\u016E-\u016E]|[\u0170-\u0170]|[\u0172-\u0172]|[\u0174-\u0174]|[\u0176-\u0176]|[\u0178-\u0179]|[\u017B-\u017B]|[\u017D-\u017D]|[\u0181-\u0182]|[\u0184-\u0184]|[\u0186-\u0187]|[\u0189-\u018B]|[\u018E-\u0191]|[\u0193-\u0194]|[\u0196-\u0198]|[\u019C-\u019D]|[\u019F-\u01A0]|[\u01A2-\u01A2]|[\u01A4-\u01A4]|[\u01A6-\u01A7]|[\u01A9-\u01A9]|[\u01AC-\u01AC]|[\u01AE-\u01AF]|[\u01B1-\u01B3]|[\u01B5-\u01B5]|[\u01B7-\u01B8]|[\u01BC-\u01BC]|[\u01C4-\u01C4]|[\u01C7-\u01C7]|[\u01CA-\u01CA]|[\u01CD-\u01CD]|[\u01CF-\u01CF]|[\u01D1-\u01D1]|[\u01D3-\u01D3]|[\u01D5-\u01D5]|[\u01D7-\u01D7]|[\u01D9-\u01D9]|[\u01DB-\u01DB]|[\u01DE-\u01DE]|[\u01E0-\u01E0]|[\u01E2-\u01E2]|[\u01E4-\u01E4]|[\u01E6-\u01E6]|[\u01E8-\u01E8]|[\u01EA-\u01EA]|[\u01EC-\u01EC]|[\u01EE-\u01EE]|[\u01F1-\u01F1]|[\u01F4-\u01F4]|[\u01FA-\u01FA]|[\u01FC-\u01FC]|[\u01FE-\u01FE]|[\u0200-\u0200]|[\u0202-\u0202]|[\u0204-\u0204]|[\u0206-\u0206]|[\u0208-\u0208]|[\u020A-\u020A]|[\u020C-\u020C]|[\u020E-\u020E]|[\u0210-\u0210]|[\u0212-\u0212]|[\u0214-\u0214]|[\u0216-\u0216]|[\u0386-\u0386]|[\u0388-\u038A]|[\u038C-\u038C]|[\u038E-\u038F]|[\u0391-\u03A1]|[\u03A3-\u03AB]|[\u03D2-\u03D4]|[\u03DA-\u03DA]|[\u03DC-\u03DC]|[\u03DE-\u03DE]|[\u03E0-\u03E0]|[\u03E2-\u03E2]|[\u03E4-\u03E4]|[\u03E6-\u03E6]|[\u03E8-\u03E8]|[\u03EA-\u03EA]|[\u03EC-\u03EC]|[\u03EE-\u03EE]|[\u0401-\u040C]|[\u040E-\u042F]|[\u0460-\u0460]|[\u0462-\u0462]|[\u0464-\u0464]|[\u0466-\u0466]|[\u0468-\u0468]|[\u046A-\u046A]|[\u046C-\u046C]|[\u046E-\u046E]|[\u0470-\u0470]|[\u0472-\u0472]|[\u0474-\u0474]|[\u0476-\u0476]|[\u0478-\u0478]|[\u047A-\u047A]|[\u047C-\u047C]|[\u047E-\u047E]|[\u0480-\u0480]|[\u0490-\u0490]|[\u0492-\u0492]|[\u0494-\u0494]|[\u0496-\u0496]|[\u0498-\u0498]|[\u049A-\u049A]|[\u049C-\u049C]|[\u049E-\u049E]|[\u04A0-\u04A0]|[\u04A2-\u04A2]|[\u04A4-\u04A4]|[\u04A6-\u04A6]|[\u04A8-\u04A8]|[\u04AA-\u04AA]|[\u04AC-\u04AC]|[\u04AE-\u04AE]|[\u04B0-\u04B0]|[\u04B2-\u04B2]|[\u04B4-\u04B4]|[\u04B6-\u04B6]|[\u04B8-\u04B8]|[\u04BA-\u04BA]|[\u04BC-\u04BC]|[\u04BE-\u04BE]|[\u04C1-\u04C1]|[\u04C3-\u04C3]|[\u04C7-\u04C7]|[\u04CB-\u04CB]|[\u04D0-\u04D0]|[\u04D2-\u04D2]|[\u04D4-\u04D4]|[\u04D6-\u04D6]|[\u04D8-\u04D8]|[\u04DA-\u04DA]|[\u04DC-\u04DC]|[\u04DE-\u04DE]|[\u04E0-\u04E0]|[\u04E2-\u04E2]|[\u04E4-\u04E4]|[\u04E6-\u04E6]|[\u04E8-\u04E8]|[\u04EA-\u04EA]|[\u04EE-\u04EE]|[\u04F0-\u04F0]|[\u04F2-\u04F2]|[\u04F4-\u04F4]|[\u04F8-\u04F8]|[\u0531-\u0556]|[\u10A0-\u10C5]|[\u1E00-\u1E00]|[\u1E02-\u1E02]|[\u1E04-\u1E04]|[\u1E06-\u1E06]|[\u1E08-\u1E08]|[\u1E0A-\u1E0A]|[\u1E0C-\u1E0C]|[\u1E0E-\u1E0E]|[\u1E10-\u1E10]|[\u1E12-\u1E12]|[\u1E14-\u1E14]|[\u1E16-\u1E16]|[\u1E18-\u1E18]|[\u1E1A-\u1E1A]|[\u1E1C-\u1E1C]|[\u1E1E-\u1E1E]|[\u1E20-\u1E20]|[\u1E22-\u1E22]|[\u1E24-\u1E24]|[\u1E26-\u1E26]|[\u1E28-\u1E28]|[\u1E2A-\u1E2A]|[\u1E2C-\u1E2C]|[\u1E2E-\u1E2E]|[\u1E30-\u1E30]|[\u1E32-\u1E32]|[\u1E34-\u1E34]|[\u1E36-\u1E36]|[\u1E38-\u1E38]|[\u1E3A-\u1E3A]|[\u1E3C-\u1E3C]|[\u1E3E-\u1E3E]|[\u1E40-\u1E40]|[\u1E42-\u1E42]|[\u1E44-\u1E44]|[\u1E46-\u1E46]|[\u1E48-\u1E48]|[\u1E4A-\u1E4A]|[\u1E4C-\u1E4C]|[\u1E4E-\u1E4E]|[\u1E50-\u1E50]|[\u1E52-\u1E52]|[\u1E54-\u1E54]|[\u1E56-\u1E56]|[\u1E58-\u1E58]|[\u1E5A-\u1E5A]|[\u1E5C-\u1E5C]|[\u1E5E-\u1E5E]|[\u1E60-\u1E60]|[\u1E62-\u1E62]|[\u1E64-\u1E64]|[\u1E66-\u1E66]|[\u1E68-\u1E68]|[\u1E6A-\u1E6A]|[\u1E6C-\u1E6C]|[\u1E6E-\u1E6E]|[\u1E70-\u1E70]|[\u1E72-\u1E72]|[\u1E74-\u1E74]|[\u1E76-\u1E76]|[\u1E78-\u1E78]|[\u1E7A-\u1E7A]|[\u1E7C-\u1E7C]|[\u1E7E-\u1E7E]|[\u1E80-\u1E80]|[\u1E82-\u1E82]|[\u1E84-\u1E84]|[\u1E86-\u1E86]|[\u1E88-\u1E88]|[\u1E8A-\u1E8A]|[\u1E8C-\u1E8C]|[\u1E8E-\u1E8E]|[\u1E90-\u1E90]|[\u1E92-\u1E92]|[\u1E94-\u1E94]|[\u1EA0-\u1EA0]|[\u1EA2-\u1EA2]|[\u1EA4-\u1EA4]|[\u1EA6-\u1EA6]|[\u1EA8-\u1EA8]|[\u1EAA-\u1EAA]|[\u1EAC-\u1EAC]|[\u1EAE-\u1EAE]|[\u1EB0-\u1EB0]|[\u1EB2-\u1EB2]|[\u1EB4-\u1EB4]|[\u1EB6-\u1EB6]|[\u1EB8-\u1EB8]|[\u1EBA-\u1EBA]|[\u1EBC-\u1EBC]|[\u1EBE-\u1EBE]|[\u1EC0-\u1EC0]|[\u1EC2-\u1EC2]|[\u1EC4-\u1EC4]|[\u1EC6-\u1EC6]|[\u1EC8-\u1EC8]|[\u1ECA-\u1ECA]|[\u1ECC-\u1ECC]|[\u1ECE-\u1ECE]|[\u1ED0-\u1ED0]|[\u1ED2-\u1ED2]|[\u1ED4-\u1ED4]|[\u1ED6-\u1ED6]|[\u1ED8-\u1ED8]|[\u1EDA-\u1EDA]|[\u1EDC-\u1EDC]|[\u1EDE-\u1EDE]|[\u1EE0-\u1EE0]|[\u1EE2-\u1EE2]|[\u1EE4-\u1EE4]|[\u1EE6-\u1EE6]|[\u1EE8-\u1EE8]|[\u1EEA-\u1EEA]|[\u1EEC-\u1EEC]|[\u1EEE-\u1EEE]|[\u1EF0-\u1EF0]|[\u1EF2-\u1EF2]|[\u1EF4-\u1EF4]|[\u1EF6-\u1EF6]|[\u1EF8-\u1EF8]|[\u1F08-\u1F0F]|[\u1F18-\u1F1D]|[\u1F28-\u1F2F]|[\u1F38-\u1F3F]|[\u1F48-\u1F4D]|[\u1F59-\u1F59]|[\u1F5B-\u1F5B]|[\u1F5D-\u1F5D]|[\u1F5F-\u1F5F]|[\u1F68-\u1F6F]|[\u1F88-\u1F8F]|[\u1F98-\u1F9F]|[\u1FA8-\u1FAF]|[\u1FB8-\u1FBC]|[\u1FC8-\u1FCC]|[\u1FD8-\u1FDB]|[\u1FE8-\u1FEC]|[\u1FF8-\u1FFC]|[\u2102-\u2102]|[\u2107-\u2107]|[\u210B-\u210D]|[\u2110-\u2112]|[\u2115-\u2115]|[\u2119-\u211D]|[\u2124-\u2124]|[\u2126-\u2126]|[\u2128-\u2128]|[\u212A-\u212D]|[\u2130-\u2131]|[\u2133-\u2133]|[\uFF21-\uFF3A]/,
  Ll   : /[\u0061-\u007A]|[\u00AA-\u00AA]|[\u00B5-\u00B5]|[\u00BA-\u00BA]|[\u00DF-\u00F6]|[\u00F8-\u00FF]|[\u0101-\u0101]|[\u0103-\u0103]|[\u0105-\u0105]|[\u0107-\u0107]|[\u0109-\u0109]|[\u010B-\u010B]|[\u010D-\u010D]|[\u010F-\u010F]|[\u0111-\u0111]|[\u0113-\u0113]|[\u0115-\u0115]|[\u0117-\u0117]|[\u0119-\u0119]|[\u011B-\u011B]|[\u011D-\u011D]|[\u011F-\u011F]|[\u0121-\u0121]|[\u0123-\u0123]|[\u0125-\u0125]|[\u0127-\u0127]|[\u0129-\u0129]|[\u012B-\u012B]|[\u012D-\u012D]|[\u012F-\u012F]|[\u0131-\u0131]|[\u0133-\u0133]|[\u0135-\u0135]|[\u0137-\u0138]|[\u013A-\u013A]|[\u013C-\u013C]|[\u013E-\u013E]|[\u0140-\u0140]|[\u0142-\u0142]|[\u0144-\u0144]|[\u0146-\u0146]|[\u0148-\u0149]|[\u014B-\u014B]|[\u014D-\u014D]|[\u014F-\u014F]|[\u0151-\u0151]|[\u0153-\u0153]|[\u0155-\u0155]|[\u0157-\u0157]|[\u0159-\u0159]|[\u015B-\u015B]|[\u015D-\u015D]|[\u015F-\u015F]|[\u0161-\u0161]|[\u0163-\u0163]|[\u0165-\u0165]|[\u0167-\u0167]|[\u0169-\u0169]|[\u016B-\u016B]|[\u016D-\u016D]|[\u016F-\u016F]|[\u0171-\u0171]|[\u0173-\u0173]|[\u0175-\u0175]|[\u0177-\u0177]|[\u017A-\u017A]|[\u017C-\u017C]|[\u017E-\u0180]|[\u0183-\u0183]|[\u0185-\u0185]|[\u0188-\u0188]|[\u018C-\u018D]|[\u0192-\u0192]|[\u0195-\u0195]|[\u0199-\u019B]|[\u019E-\u019E]|[\u01A1-\u01A1]|[\u01A3-\u01A3]|[\u01A5-\u01A5]|[\u01A8-\u01A8]|[\u01AB-\u01AB]|[\u01AD-\u01AD]|[\u01B0-\u01B0]|[\u01B4-\u01B4]|[\u01B6-\u01B6]|[\u01B9-\u01BA]|[\u01BD-\u01BD]|[\u01C6-\u01C6]|[\u01C9-\u01C9]|[\u01CC-\u01CC]|[\u01CE-\u01CE]|[\u01D0-\u01D0]|[\u01D2-\u01D2]|[\u01D4-\u01D4]|[\u01D6-\u01D6]|[\u01D8-\u01D8]|[\u01DA-\u01DA]|[\u01DC-\u01DD]|[\u01DF-\u01DF]|[\u01E1-\u01E1]|[\u01E3-\u01E3]|[\u01E5-\u01E5]|[\u01E7-\u01E7]|[\u01E9-\u01E9]|[\u01EB-\u01EB]|[\u01ED-\u01ED]|[\u01EF-\u01F0]|[\u01F3-\u01F3]|[\u01F5-\u01F5]|[\u01FB-\u01FB]|[\u01FD-\u01FD]|[\u01FF-\u01FF]|[\u0201-\u0201]|[\u0203-\u0203]|[\u0205-\u0205]|[\u0207-\u0207]|[\u0209-\u0209]|[\u020B-\u020B]|[\u020D-\u020D]|[\u020F-\u020F]|[\u0211-\u0211]|[\u0213-\u0213]|[\u0215-\u0215]|[\u0217-\u0217]|[\u0250-\u02A8]|[\u0390-\u0390]|[\u03AC-\u03CE]|[\u03D0-\u03D1]|[\u03D5-\u03D6]|[\u03E3-\u03E3]|[\u03E5-\u03E5]|[\u03E7-\u03E7]|[\u03E9-\u03E9]|[\u03EB-\u03EB]|[\u03ED-\u03ED]|[\u03EF-\u03F2]|[\u0430-\u044F]|[\u0451-\u045C]|[\u045E-\u045F]|[\u0461-\u0461]|[\u0463-\u0463]|[\u0465-\u0465]|[\u0467-\u0467]|[\u0469-\u0469]|[\u046B-\u046B]|[\u046D-\u046D]|[\u046F-\u046F]|[\u0471-\u0471]|[\u0473-\u0473]|[\u0475-\u0475]|[\u0477-\u0477]|[\u0479-\u0479]|[\u047B-\u047B]|[\u047D-\u047D]|[\u047F-\u047F]|[\u0481-\u0481]|[\u0491-\u0491]|[\u0493-\u0493]|[\u0495-\u0495]|[\u0497-\u0497]|[\u0499-\u0499]|[\u049B-\u049B]|[\u049D-\u049D]|[\u049F-\u049F]|[\u04A1-\u04A1]|[\u04A3-\u04A3]|[\u04A5-\u04A5]|[\u04A7-\u04A7]|[\u04A9-\u04A9]|[\u04AB-\u04AB]|[\u04AD-\u04AD]|[\u04AF-\u04AF]|[\u04B1-\u04B1]|[\u04B3-\u04B3]|[\u04B5-\u04B5]|[\u04B7-\u04B7]|[\u04B9-\u04B9]|[\u04BB-\u04BB]|[\u04BD-\u04BD]|[\u04BF-\u04BF]|[\u04C2-\u04C2]|[\u04C4-\u04C4]|[\u04C8-\u04C8]|[\u04CC-\u04CC]|[\u04D1-\u04D1]|[\u04D3-\u04D3]|[\u04D5-\u04D5]|[\u04D7-\u04D7]|[\u04D9-\u04D9]|[\u04DB-\u04DB]|[\u04DD-\u04DD]|[\u04DF-\u04DF]|[\u04E1-\u04E1]|[\u04E3-\u04E3]|[\u04E5-\u04E5]|[\u04E7-\u04E7]|[\u04E9-\u04E9]|[\u04EB-\u04EB]|[\u04EF-\u04EF]|[\u04F1-\u04F1]|[\u04F3-\u04F3]|[\u04F5-\u04F5]|[\u04F9-\u04F9]|[\u0561-\u0587]|[\u10D0-\u10F6]|[\u1E01-\u1E01]|[\u1E03-\u1E03]|[\u1E05-\u1E05]|[\u1E07-\u1E07]|[\u1E09-\u1E09]|[\u1E0B-\u1E0B]|[\u1E0D-\u1E0D]|[\u1E0F-\u1E0F]|[\u1E11-\u1E11]|[\u1E13-\u1E13]|[\u1E15-\u1E15]|[\u1E17-\u1E17]|[\u1E19-\u1E19]|[\u1E1B-\u1E1B]|[\u1E1D-\u1E1D]|[\u1E1F-\u1E1F]|[\u1E21-\u1E21]|[\u1E23-\u1E23]|[\u1E25-\u1E25]|[\u1E27-\u1E27]|[\u1E29-\u1E29]|[\u1E2B-\u1E2B]|[\u1E2D-\u1E2D]|[\u1E2F-\u1E2F]|[\u1E31-\u1E31]|[\u1E33-\u1E33]|[\u1E35-\u1E35]|[\u1E37-\u1E37]|[\u1E39-\u1E39]|[\u1E3B-\u1E3B]|[\u1E3D-\u1E3D]|[\u1E3F-\u1E3F]|[\u1E41-\u1E41]|[\u1E43-\u1E43]|[\u1E45-\u1E45]|[\u1E47-\u1E47]|[\u1E49-\u1E49]|[\u1E4B-\u1E4B]|[\u1E4D-\u1E4D]|[\u1E4F-\u1E4F]|[\u1E51-\u1E51]|[\u1E53-\u1E53]|[\u1E55-\u1E55]|[\u1E57-\u1E57]|[\u1E59-\u1E59]|[\u1E5B-\u1E5B]|[\u1E5D-\u1E5D]|[\u1E5F-\u1E5F]|[\u1E61-\u1E61]|[\u1E63-\u1E63]|[\u1E65-\u1E65]|[\u1E67-\u1E67]|[\u1E69-\u1E69]|[\u1E6B-\u1E6B]|[\u1E6D-\u1E6D]|[\u1E6F-\u1E6F]|[\u1E71-\u1E71]|[\u1E73-\u1E73]|[\u1E75-\u1E75]|[\u1E77-\u1E77]|[\u1E79-\u1E79]|[\u1E7B-\u1E7B]|[\u1E7D-\u1E7D]|[\u1E7F-\u1E7F]|[\u1E81-\u1E81]|[\u1E83-\u1E83]|[\u1E85-\u1E85]|[\u1E87-\u1E87]|[\u1E89-\u1E89]|[\u1E8B-\u1E8B]|[\u1E8D-\u1E8D]|[\u1E8F-\u1E8F]|[\u1E91-\u1E91]|[\u1E93-\u1E93]|[\u1E95-\u1E9B]|[\u1EA1-\u1EA1]|[\u1EA3-\u1EA3]|[\u1EA5-\u1EA5]|[\u1EA7-\u1EA7]|[\u1EA9-\u1EA9]|[\u1EAB-\u1EAB]|[\u1EAD-\u1EAD]|[\u1EAF-\u1EAF]|[\u1EB1-\u1EB1]|[\u1EB3-\u1EB3]|[\u1EB5-\u1EB5]|[\u1EB7-\u1EB7]|[\u1EB9-\u1EB9]|[\u1EBB-\u1EBB]|[\u1EBD-\u1EBD]|[\u1EBF-\u1EBF]|[\u1EC1-\u1EC1]|[\u1EC3-\u1EC3]|[\u1EC5-\u1EC5]|[\u1EC7-\u1EC7]|[\u1EC9-\u1EC9]|[\u1ECB-\u1ECB]|[\u1ECD-\u1ECD]|[\u1ECF-\u1ECF]|[\u1ED1-\u1ED1]|[\u1ED3-\u1ED3]|[\u1ED5-\u1ED5]|[\u1ED7-\u1ED7]|[\u1ED9-\u1ED9]|[\u1EDB-\u1EDB]|[\u1EDD-\u1EDD]|[\u1EDF-\u1EDF]|[\u1EE1-\u1EE1]|[\u1EE3-\u1EE3]|[\u1EE5-\u1EE5]|[\u1EE7-\u1EE7]|[\u1EE9-\u1EE9]|[\u1EEB-\u1EEB]|[\u1EED-\u1EED]|[\u1EEF-\u1EEF]|[\u1EF1-\u1EF1]|[\u1EF3-\u1EF3]|[\u1EF5-\u1EF5]|[\u1EF7-\u1EF7]|[\u1EF9-\u1EF9]|[\u1F00-\u1F07]|[\u1F10-\u1F15]|[\u1F20-\u1F27]|[\u1F30-\u1F37]|[\u1F40-\u1F45]|[\u1F50-\u1F57]|[\u1F60-\u1F67]|[\u1F70-\u1F7D]|[\u1F80-\u1F87]|[\u1F90-\u1F97]|[\u1FA0-\u1FA7]|[\u1FB0-\u1FB4]|[\u1FB6-\u1FB7]|[\u1FBE-\u1FBE]|[\u1FC2-\u1FC4]|[\u1FC6-\u1FC7]|[\u1FD0-\u1FD3]|[\u1FD6-\u1FD7]|[\u1FE0-\u1FE7]|[\u1FF2-\u1FF4]|[\u1FF6-\u1FF7]|[\u207F-\u207F]|[\u210A-\u210A]|[\u210E-\u210F]|[\u2113-\u2113]|[\u2118-\u2118]|[\u212E-\u212F]|[\u2134-\u2134]|[\uFB00-\uFB06]|[\uFB13-\uFB17]|[\uFF41-\uFF5A]/,
  Lt   : /[\u01C5-\u01C5]|[\u01C8-\u01C8]|[\u01CB-\u01CB]|[\u01F2-\u01F2]/,
  Lm   : /[\u02B0-\u02B8]|[\u02BB-\u02C1]|[\u02D0-\u02D1]|[\u02E0-\u02E4]|[\u037A-\u037A]|[\u0559-\u0559]|[\u0640-\u0640]|[\u06E5-\u06E6]|[\u0E46-\u0E46]|[\u0EC6-\u0EC6]|[\u3005-\u3005]|[\u3031-\u3035]|[\u309D-\u309E]|[\u30FC-\u30FE]|[\uFF70-\uFF70]|[\uFF9E-\uFF9F]/,
  Lo   : /[\u01AA-\u01AA]|[\u01BB-\u01BB]|[\u01BE-\u01C3]|[\u03F3-\u03F3]|[\u04C0-\u04C0]|[\u05D0-\u05EA]|[\u05F0-\u05F2]|[\u0621-\u063A]|[\u0641-\u064A]|[\u0671-\u06B7]|[\u06BA-\u06BE]|[\u06C0-\u06CE]|[\u06D0-\u06D3]|[\u06D5-\u06D5]|[\u0905-\u0939]|[\u093D-\u093D]|[\u0950-\u0950]|[\u0958-\u0961]|[\u0985-\u098C]|[\u098F-\u0990]|[\u0993-\u09A8]|[\u09AA-\u09B0]|[\u09B2-\u09B2]|[\u09B6-\u09B9]|[\u09DC-\u09DD]|[\u09DF-\u09E1]|[\u09F0-\u09F1]|[\u0A05-\u0A0A]|[\u0A0F-\u0A10]|[\u0A13-\u0A28]|[\u0A2A-\u0A30]|[\u0A32-\u0A33]|[\u0A35-\u0A36]|[\u0A38-\u0A39]|[\u0A59-\u0A5C]|[\u0A5E-\u0A5E]|[\u0A72-\u0A74]|[\u0A85-\u0A8B]|[\u0A8D-\u0A8D]|[\u0A8F-\u0A91]|[\u0A93-\u0AA8]|[\u0AAA-\u0AB0]|[\u0AB2-\u0AB3]|[\u0AB5-\u0AB9]|[\u0ABD-\u0ABD]|[\u0AD0-\u0AD0]|[\u0AE0-\u0AE0]|[\u0B05-\u0B0C]|[\u0B0F-\u0B10]|[\u0B13-\u0B28]|[\u0B2A-\u0B30]|[\u0B32-\u0B33]|[\u0B36-\u0B39]|[\u0B3D-\u0B3D]|[\u0B5C-\u0B5D]|[\u0B5F-\u0B61]|[\u0B85-\u0B8A]|[\u0B8E-\u0B90]|[\u0B92-\u0B95]|[\u0B99-\u0B9A]|[\u0B9C-\u0B9C]|[\u0B9E-\u0B9F]|[\u0BA3-\u0BA4]|[\u0BA8-\u0BAA]|[\u0BAE-\u0BB5]|[\u0BB7-\u0BB9]|[\u0C05-\u0C0C]|[\u0C0E-\u0C10]|[\u0C12-\u0C28]|[\u0C2A-\u0C33]|[\u0C35-\u0C39]|[\u0C60-\u0C61]|[\u0C85-\u0C8C]|[\u0C8E-\u0C90]|[\u0C92-\u0CA8]|[\u0CAA-\u0CB3]|[\u0CB5-\u0CB9]|[\u0CDE-\u0CDE]|[\u0CE0-\u0CE1]|[\u0D05-\u0D0C]|[\u0D0E-\u0D10]|[\u0D12-\u0D28]|[\u0D2A-\u0D39]|[\u0D60-\u0D61]|[\u0E01-\u0E30]|[\u0E32-\u0E33]|[\u0E40-\u0E45]|[\u0E81-\u0E82]|[\u0E84-\u0E84]|[\u0E87-\u0E88]|[\u0E8A-\u0E8A]|[\u0E8D-\u0E8D]|[\u0E94-\u0E97]|[\u0E99-\u0E9F]|[\u0EA1-\u0EA3]|[\u0EA5-\u0EA5]|[\u0EA7-\u0EA7]|[\u0EAA-\u0EAB]|[\u0EAD-\u0EB0]|[\u0EB2-\u0EB3]|[\u0EBD-\u0EBD]|[\u0EC0-\u0EC4]|[\u0EDC-\u0EDD]|[\u0F00-\u0F00]|[\u0F40-\u0F47]|[\u0F49-\u0F69]|[\u0F88-\u0F8B]|[\u1100-\u1159]|[\u115F-\u11A2]|[\u11A8-\u11F9]|[\u2135-\u2138]|[\u3006-\u3006]|[\u3041-\u3094]|[\u30A1-\u30FA]|[\u3105-\u312C]|[\u3131-\u318E]|[\u4E00-\u9FA5]|[\uAC00-\uD7A3]|[\uF900-\uFA2D]|[\uFB1F-\uFB28]|[\uFB2A-\uFB36]|[\uFB38-\uFB3C]|[\uFB3E-\uFB3E]|[\uFB40-\uFB41]|[\uFB43-\uFB44]|[\uFB46-\uFBB1]|[\uFBD3-\uFD3D]|[\uFD50-\uFD8F]|[\uFD92-\uFDC7]|[\uFDF0-\uFDFB]|[\uFE70-\uFE72]|[\uFE74-\uFE74]|[\uFE76-\uFEFC]|[\uFF66-\uFF6F]|[\uFF71-\uFF9D]|[\uFFA0-\uFFBE]|[\uFFC2-\uFFC7]|[\uFFCA-\uFFCF]|[\uFFD2-\uFFD7]|[\uFFDA-\uFFDC]/,
/* --- */

  Nl   : /[\u2160-\u2182]|[\u3007-\u3007]|[\u3021-\u3029]/,
  Mn   : /[\u0300-\u0345]|[\u0360-\u0361]|[\u0483-\u0486]|[\u0591-\u05A1]|[\u05A3-\u05B9]|[\u05BB-\u05BD]|[\u05BF-\u05BF]|[\u05C1-\u05C2]|[\u05C4-\u05C4]|[\u064B-\u0652]|[\u0670-\u0670]|[\u06D6-\u06DC]|[\u06DF-\u06E4]|[\u06E7-\u06E8]|[\u06EA-\u06ED]|[\u0901-\u0902]|[\u093C-\u093C]|[\u0941-\u0948]|[\u094D-\u094D]|[\u0951-\u0954]|[\u0962-\u0963]|[\u0981-\u0981]|[\u09BC-\u09BC]|[\u09C1-\u09C4]|[\u09CD-\u09CD]|[\u09E2-\u09E3]|[\u0A02-\u0A02]|[\u0A3C-\u0A3C]|[\u0A41-\u0A42]|[\u0A47-\u0A48]|[\u0A4B-\u0A4D]|[\u0A70-\u0A71]|[\u0A81-\u0A82]|[\u0ABC-\u0ABC]|[\u0AC1-\u0AC5]|[\u0AC7-\u0AC8]|[\u0ACD-\u0ACD]|[\u0B01-\u0B01]|[\u0B3C-\u0B3C]|[\u0B3F-\u0B3F]|[\u0B41-\u0B43]|[\u0B4D-\u0B4D]|[\u0B56-\u0B56]|[\u0B82-\u0B82]|[\u0BC0-\u0BC0]|[\u0BCD-\u0BCD]|[\u0C3E-\u0C40]|[\u0C46-\u0C48]|[\u0C4A-\u0C4D]|[\u0C55-\u0C56]|[\u0CBF-\u0CBF]|[\u0CC6-\u0CC6]|[\u0CCC-\u0CCD]|[\u0D41-\u0D43]|[\u0D4D-\u0D4D]|[\u0E31-\u0E31]|[\u0E34-\u0E3A]|[\u0E47-\u0E4E]|[\u0EB1-\u0EB1]|[\u0EB4-\u0EB9]|[\u0EBB-\u0EBC]|[\u0EC8-\u0ECD]|[\u0F18-\u0F19]|[\u0F35-\u0F35]|[\u0F37-\u0F37]|[\u0F39-\u0F39]|[\u0F71-\u0F7E]|[\u0F80-\u0F84]|[\u0F86-\u0F87]|[\u0F90-\u0F95]|[\u0F97-\u0F97]|[\u0F99-\u0FAD]|[\u0FB1-\u0FB7]|[\u0FB9-\u0FB9]|[\u20D0-\u20DC]|[\u20E1-\u20E1]|[\u302A-\u302F]|[\u3099-\u309A]|[\uFB1E-\uFB1E]|[\uFE20-\uFE23]/,
  Mc   : /[\u0903-\u0903]|[\u093E-\u0940]|[\u0949-\u094C]|[\u0982-\u0983]|[\u09BE-\u09C0]|[\u09C7-\u09C8]|[\u09CB-\u09CC]|[\u09D7-\u09D7]|[\u0A3E-\u0A40]|[\u0A83-\u0A83]|[\u0ABE-\u0AC0]|[\u0AC9-\u0AC9]|[\u0ACB-\u0ACC]|[\u0B02-\u0B03]|[\u0B3E-\u0B3E]|[\u0B40-\u0B40]|[\u0B47-\u0B48]|[\u0B4B-\u0B4C]|[\u0B57-\u0B57]|[\u0B83-\u0B83]|[\u0BBE-\u0BBF]|[\u0BC1-\u0BC2]|[\u0BC6-\u0BC8]|[\u0BCA-\u0BCC]|[\u0BD7-\u0BD7]|[\u0C01-\u0C03]|[\u0C41-\u0C44]|[\u0C82-\u0C83]|[\u0CBE-\u0CBE]|[\u0CC0-\u0CC4]|[\u0CC7-\u0CC8]|[\u0CCA-\u0CCB]|[\u0CD5-\u0CD6]|[\u0D02-\u0D03]|[\u0D3E-\u0D40]|[\u0D46-\u0D48]|[\u0D4A-\u0D4C]|[\u0D57-\u0D57]|[\u0F3E-\u0F3F]|[\u0F7F-\u0F7F]/,
  Nd   : /[\u0030-\u0039]|[\u0660-\u0669]|[\u06F0-\u06F9]|[\u0966-\u096F]|[\u09E6-\u09EF]|[\u0A66-\u0A6F]|[\u0AE6-\u0AEF]|[\u0B66-\u0B6F]|[\u0BE7-\u0BEF]|[\u0C66-\u0C6F]|[\u0CE6-\u0CEF]|[\u0D66-\u0D6F]|[\u0E50-\u0E59]|[\u0ED0-\u0ED9]|[\u0F20-\u0F29]|[\uFF10-\uFF19]/,
  Pc   : /[\u005F-\u005F]|[\u203F-\u2040]|[\u30FB-\u30FB]|[\uFE33-\uFE34]|[\uFE4D-\uFE4F]|[\uFF3F-\uFF3F]|[\uFF65-\uFF65]/,
  Zs   : /[\u2000-\u200B]|[\u3000-\u3000]/,
};

},{}]},{},[27])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kdWJyb3kvZGV2L2NkZy9vaG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9kdWJyb3kvZGV2L2NkZy9vaG0vZGlzdC9vaG0tZ3JhbW1hci5qcyIsIi9Vc2Vycy9kdWJyb3kvZGV2L2NkZy9vaG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIi9Vc2Vycy9kdWJyb3kvZGV2L2NkZy9vaG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYi9iNjQuanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9oZWxwZXJzLmpzIiwiL1VzZXJzL2R1YnJveS9kZXYvY2RnL29obS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvaW5kZXguanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9tZDUuanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9ybmcuanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEuanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEyNTYuanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwiL1VzZXJzL2R1YnJveS9kZXYvY2RnL29obS9ub2RlX21vZHVsZXMvc3ltYm9sL2luZGV4LmpzIiwiL1VzZXJzL2R1YnJveS9kZXYvY2RnL29obS9ub2RlX21vZHVsZXMvdXRpbC1leHRlbmQvZXh0ZW5kLmpzIiwiL1VzZXJzL2R1YnJveS9kZXYvY2RnL29obS9zcmMvQnVpbGRlci5qcyIsIi9Vc2Vycy9kdWJyb3kvZGV2L2NkZy9vaG0vc3JjL0dyYW1tYXIuanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL3NyYy9HcmFtbWFyRGVjbC5qcyIsIi9Vc2Vycy9kdWJyb3kvZGV2L2NkZy9vaG0vc3JjL0lucHV0U3RyZWFtLmpzIiwiL1VzZXJzL2R1YnJveS9kZXYvY2RnL29obS9zcmMvSW50ZXJ2YWwuanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL3NyYy9OYW1lc3BhY2UuanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL3NyYy9Ob2RlLmpzIiwiL1VzZXJzL2R1YnJveS9kZXYvY2RnL29obS9zcmMvUG9zSW5mby5qcyIsIi9Vc2Vycy9kdWJyb3kvZGV2L2NkZy9vaG0vc3JjL1N0YXRlLmpzIiwiL1VzZXJzL2R1YnJveS9kZXYvY2RnL29obS9zcmMvVHJhY2UuanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL3NyYy9hdHRyaWJ1dGVzLmpzIiwiL1VzZXJzL2R1YnJveS9kZXYvY2RnL29obS9zcmMvY29tbW9uLmpzIiwiL1VzZXJzL2R1YnJveS9kZXYvY2RnL29obS9zcmMvZXJyb3JzLmpzIiwiL1VzZXJzL2R1YnJveS9kZXYvY2RnL29obS9zcmMvbWFpbi5qcyIsIi9Vc2Vycy9kdWJyb3kvZGV2L2NkZy9vaG0vc3JjL3BleHBycy1hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24uanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL3NyYy9wZXhwcnMtYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQuanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL3NyYy9wZXhwcnMtYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkuanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL3NyYy9wZXhwcnMtY2hlY2suanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL3NyYy9wZXhwcnMtZXZhbC5qcyIsIi9Vc2Vycy9kdWJyb3kvZGV2L2NkZy9vaG0vc3JjL3BleHBycy1nZXRBcml0eS5qcyIsIi9Vc2Vycy9kdWJyb3kvZGV2L2NkZy9vaG0vc3JjL3BleHBycy1tYXliZVJlY29yZEZhaWx1cmUuanMiLCIvVXNlcnMvZHVicm95L2Rldi9jZGcvb2htL3NyYy9wZXhwcnMtb3V0cHV0UmVjaXBlLmpzIiwiL1VzZXJzL2R1YnJveS9kZXYvY2RnL29obS9zcmMvcGV4cHJzLXRvRGlzcGxheVN0cmluZy5qcyIsIi9Vc2Vycy9kdWJyb3kvZGV2L2NkZy9vaG0vc3JjL3BleHBycy10b0V4cGVjdGVkLmpzIiwiL1VzZXJzL2R1YnJveS9kZXYvY2RnL29obS9zcmMvcGV4cHJzLXRvU3RyaW5nLmpzIiwiL1VzZXJzL2R1YnJveS9kZXYvY2RnL29obS9zcmMvcGV4cHJzLmpzIiwiL1VzZXJzL2R1YnJveS9kZXYvY2RnL29obS90aGlyZF9wYXJ0eS91bmljb2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNybENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBvaG0gPSByZXF1aXJlKCcuLicpO1xubW9kdWxlLmV4cG9ydHMgPSBvaG0ubWFrZVJlY2lwZShmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyB0aGlzLm5ld0dyYW1tYXIoJ09obScpXG4gICAgLmRlZmluZSgnR3JhbW1hcnMnLCB0aGlzLm1hbnkodGhpcy5hcHAoJ0dyYW1tYXInKSwgMCkpXG4gICAgLmRlZmluZSgnR3JhbW1hcicsIHRoaXMuc2VxKHRoaXMuYXBwKCdpZGVudCcpLCB0aGlzLm9wdCh0aGlzLmFwcCgnU3VwZXJHcmFtbWFyJykpLCB0aGlzLnByaW0oJ3snKSwgdGhpcy5tYW55KHRoaXMuYXBwKCdSdWxlJyksIDApLCB0aGlzLnByaW0oJ30nKSkpXG4gICAgLmRlZmluZSgnU3VwZXJHcmFtbWFyJywgdGhpcy5zZXEodGhpcy5wcmltKCc8OicpLCB0aGlzLmFwcCgnaWRlbnQnKSkpXG4gICAgLmRlZmluZSgnUnVsZV9kZWZpbmUnLCB0aGlzLnNlcSh0aGlzLmFwcCgnaWRlbnQnKSwgdGhpcy5hcHAoJ0Zvcm1hbHMnKSwgdGhpcy5vcHQodGhpcy5hcHAoJ3J1bGVEZXNjcicpKSwgdGhpcy5wcmltKCc9JyksIHRoaXMuYXBwKCdBbHQnKSkpXG4gICAgLmRlZmluZSgnUnVsZV9vdmVycmlkZScsIHRoaXMuc2VxKHRoaXMuYXBwKCdpZGVudCcpLCB0aGlzLmFwcCgnRm9ybWFscycpLCB0aGlzLnByaW0oJzo9JyksIHRoaXMuYXBwKCdBbHQnKSkpXG4gICAgLmRlZmluZSgnUnVsZV9leHRlbmQnLCB0aGlzLnNlcSh0aGlzLmFwcCgnaWRlbnQnKSwgdGhpcy5hcHAoJ0Zvcm1hbHMnKSwgdGhpcy5wcmltKCcrPScpLCB0aGlzLmFwcCgnQWx0JykpKVxuICAgIC5kZWZpbmUoJ1J1bGUnLCB0aGlzLmFsdCh0aGlzLmFwcCgnUnVsZV9kZWZpbmUnKSwgdGhpcy5hcHAoJ1J1bGVfb3ZlcnJpZGUnKSwgdGhpcy5hcHAoJ1J1bGVfZXh0ZW5kJykpKVxuICAgIC5kZWZpbmUoJ0Zvcm1hbHNfc29tZScsIHRoaXMuc2VxKHRoaXMucHJpbSgnPCcpLCB0aGlzLmFwcCgnaWRlbnQnKSwgdGhpcy5tYW55KHRoaXMuc2VxKHRoaXMucHJpbSgnLCcpLCB0aGlzLmFwcCgnaWRlbnQnKSksIDApLCB0aGlzLnByaW0oJz4nKSkpXG4gICAgLmRlZmluZSgnRm9ybWFsc19ub25lJywgdGhpcy5zZXEoKSlcbiAgICAuZGVmaW5lKCdGb3JtYWxzJywgdGhpcy5hbHQodGhpcy5hcHAoJ0Zvcm1hbHNfc29tZScpLCB0aGlzLmFwcCgnRm9ybWFsc19ub25lJykpKVxuICAgIC5kZWZpbmUoJ1BhcmFtc19zb21lJywgdGhpcy5zZXEodGhpcy5wcmltKCc8JyksIHRoaXMuYXBwKCdTZXEnKSwgdGhpcy5tYW55KHRoaXMuc2VxKHRoaXMucHJpbSgnLCcpLCB0aGlzLmFwcCgnU2VxJykpLCAwKSwgdGhpcy5wcmltKCc+JykpKVxuICAgIC5kZWZpbmUoJ1BhcmFtc19ub25lJywgdGhpcy5zZXEoKSlcbiAgICAuZGVmaW5lKCdQYXJhbXMnLCB0aGlzLmFsdCh0aGlzLmFwcCgnUGFyYW1zX3NvbWUnKSwgdGhpcy5hcHAoJ1BhcmFtc19ub25lJykpKVxuICAgIC5kZWZpbmUoJ0FsdCcsIHRoaXMuc2VxKHRoaXMuYXBwKCdUZXJtJyksIHRoaXMubWFueSh0aGlzLnNlcSh0aGlzLnByaW0oJ3wnKSwgdGhpcy5hcHAoJ1Rlcm0nKSksIDApKSlcbiAgICAuZGVmaW5lKCdUZXJtX2lubGluZScsIHRoaXMuc2VxKHRoaXMuYXBwKCdTZXEnKSwgdGhpcy5hcHAoJ2Nhc2VOYW1lJykpKVxuICAgIC5kZWZpbmUoJ1Rlcm0nLCB0aGlzLmFsdCh0aGlzLmFwcCgnVGVybV9pbmxpbmUnKSwgdGhpcy5hcHAoJ1NlcScpKSlcbiAgICAuZGVmaW5lKCdTZXEnLCB0aGlzLm1hbnkodGhpcy5hcHAoJ0l0ZXInKSwgMCkpXG4gICAgLmRlZmluZSgnSXRlcl9zdGFyJywgdGhpcy5zZXEodGhpcy5hcHAoJ1ByZWQnKSwgdGhpcy5wcmltKCcqJykpKVxuICAgIC5kZWZpbmUoJ0l0ZXJfcGx1cycsIHRoaXMuc2VxKHRoaXMuYXBwKCdQcmVkJyksIHRoaXMucHJpbSgnKycpKSlcbiAgICAuZGVmaW5lKCdJdGVyX29wdCcsIHRoaXMuc2VxKHRoaXMuYXBwKCdQcmVkJyksIHRoaXMucHJpbSgnPycpKSlcbiAgICAuZGVmaW5lKCdJdGVyJywgdGhpcy5hbHQodGhpcy5hcHAoJ0l0ZXJfc3RhcicpLCB0aGlzLmFwcCgnSXRlcl9wbHVzJyksIHRoaXMuYXBwKCdJdGVyX29wdCcpLCB0aGlzLmFwcCgnUHJlZCcpKSlcbiAgICAuZGVmaW5lKCdQcmVkX25vdCcsIHRoaXMuc2VxKHRoaXMucHJpbSgnficpLCB0aGlzLmFwcCgnQmFzZScpKSlcbiAgICAuZGVmaW5lKCdQcmVkX2xvb2thaGVhZCcsIHRoaXMuc2VxKHRoaXMucHJpbSgnJicpLCB0aGlzLmFwcCgnQmFzZScpKSlcbiAgICAuZGVmaW5lKCdQcmVkJywgdGhpcy5hbHQodGhpcy5hcHAoJ1ByZWRfbm90JyksIHRoaXMuYXBwKCdQcmVkX2xvb2thaGVhZCcpLCB0aGlzLmFwcCgnQmFzZScpKSlcbiAgICAuZGVmaW5lKCdCYXNlX2FwcGxpY2F0aW9uJywgdGhpcy5zZXEodGhpcy5hcHAoJ2lkZW50JyksIHRoaXMuYXBwKCdQYXJhbXMnKSwgdGhpcy5ub3QodGhpcy5hbHQodGhpcy5zZXEodGhpcy5vcHQodGhpcy5hcHAoJ3J1bGVEZXNjcicpKSwgdGhpcy5wcmltKCc9JykpLCB0aGlzLnByaW0oJzo9JyksIHRoaXMucHJpbSgnKz0nKSkpKSlcbiAgICAuZGVmaW5lKCdCYXNlX3ByaW0nLCB0aGlzLmFsdCh0aGlzLmFwcCgna2V5d29yZCcpLCB0aGlzLmFwcCgnc3RyaW5nJyksIHRoaXMuYXBwKCdyZWdFeHAnKSwgdGhpcy5hcHAoJ251bWJlcicpKSlcbiAgICAuZGVmaW5lKCdCYXNlX3BhcmVuJywgdGhpcy5zZXEodGhpcy5wcmltKCcoJyksIHRoaXMuYXBwKCdBbHQnKSwgdGhpcy5wcmltKCcpJykpKVxuICAgIC5kZWZpbmUoJ0Jhc2VfYXJyJywgdGhpcy5zZXEodGhpcy5wcmltKCdbJyksIHRoaXMuYXBwKCdBbHQnKSwgdGhpcy5wcmltKCddJykpKVxuICAgIC5kZWZpbmUoJ0Jhc2Vfc3RyJywgdGhpcy5zZXEodGhpcy5wcmltKCdgYCcpLCB0aGlzLmFwcCgnQWx0JyksIHRoaXMucHJpbShcIicnXCIpKSlcbiAgICAuZGVmaW5lKCdCYXNlX29iaicsIHRoaXMuc2VxKHRoaXMucHJpbSgneycpLCB0aGlzLm9wdCh0aGlzLnByaW0oJy4uLicpKSwgdGhpcy5wcmltKCd9JykpKVxuICAgIC5kZWZpbmUoJ0Jhc2Vfb2JqV2l0aFByb3BzJywgdGhpcy5zZXEodGhpcy5wcmltKCd7JyksIHRoaXMuYXBwKCdQcm9wcycpLCB0aGlzLm9wdCh0aGlzLnNlcSh0aGlzLnByaW0oJywnKSwgdGhpcy5wcmltKCcuLi4nKSkpLCB0aGlzLnByaW0oJ30nKSkpXG4gICAgLmRlZmluZSgnQmFzZScsIHRoaXMuYWx0KHRoaXMuYXBwKCdCYXNlX2FwcGxpY2F0aW9uJyksIHRoaXMuYXBwKCdCYXNlX3ByaW0nKSwgdGhpcy5hcHAoJ0Jhc2VfcGFyZW4nKSwgdGhpcy5hcHAoJ0Jhc2VfYXJyJyksIHRoaXMuYXBwKCdCYXNlX3N0cicpLCB0aGlzLmFwcCgnQmFzZV9vYmonKSwgdGhpcy5hcHAoJ0Jhc2Vfb2JqV2l0aFByb3BzJykpKVxuICAgIC5kZWZpbmUoJ1Byb3BzJywgdGhpcy5zZXEodGhpcy5hcHAoJ1Byb3AnKSwgdGhpcy5tYW55KHRoaXMuc2VxKHRoaXMucHJpbSgnLCcpLCB0aGlzLmFwcCgnUHJvcCcpKSwgMCkpKVxuICAgIC5kZWZpbmUoJ1Byb3AnLCB0aGlzLnNlcSh0aGlzLmFsdCh0aGlzLmFwcCgnbmFtZScpLCB0aGlzLmFwcCgnc3RyaW5nJykpLCB0aGlzLnByaW0oJzonKSwgdGhpcy5hcHAoJ0FsdCcpKSlcbiAgICAuZGVmaW5lKCdydWxlRGVzY3InLCB0aGlzLnNlcSh0aGlzLnByaW0oJygnKSwgdGhpcy5hcHAoJ3J1bGVEZXNjclRleHQnKSwgdGhpcy5wcmltKCcpJykpKVxuICAgIC5kZWZpbmUoJ3J1bGVEZXNjclRleHQnLCB0aGlzLm1hbnkodGhpcy5zZXEodGhpcy5ub3QodGhpcy5wcmltKCcpJykpLCB0aGlzLmFwcCgnXycpKSwgMCkpXG4gICAgLmRlZmluZSgnY2FzZU5hbWUnLCB0aGlzLnNlcSh0aGlzLnByaW0oJy0tJyksIHRoaXMubWFueSh0aGlzLnNlcSh0aGlzLm5vdCh0aGlzLnByaW0oJ1xcbicpKSwgdGhpcy5hcHAoJ3NwYWNlJykpLCAwKSwgdGhpcy5hcHAoJ25hbWUnKSwgdGhpcy5tYW55KHRoaXMuc2VxKHRoaXMubm90KHRoaXMucHJpbSgnXFxuJykpLCB0aGlzLmFwcCgnc3BhY2UnKSksIDApLCB0aGlzLmFsdCh0aGlzLnByaW0oJ1xcbicpLCB0aGlzLmxhKHRoaXMucHJpbSgnfScpKSkpKVxuICAgIC5kZWZpbmUoJ25hbWUnLCB0aGlzLnNlcSh0aGlzLmFwcCgnbmFtZUZpcnN0JyksIHRoaXMubWFueSh0aGlzLmFwcCgnbmFtZVJlc3QnKSwgMCkpKVxuICAgIC5kZWZpbmUoJ25hbWVGaXJzdCcsIHRoaXMuYWx0KHRoaXMucHJpbSgnXycpLCB0aGlzLmFwcCgnbGV0dGVyJykpKVxuICAgIC5kZWZpbmUoJ25hbWVSZXN0JywgdGhpcy5hbHQodGhpcy5wcmltKCdfJyksIHRoaXMuYXBwKCdhbG51bScpKSlcbiAgICAuZGVmaW5lKCdpZGVudCcsIHRoaXMuc2VxKHRoaXMubm90KHRoaXMuYXBwKCdrZXl3b3JkJykpLCB0aGlzLmFwcCgnbmFtZScpKSlcbiAgICAuZGVmaW5lKCdrZXl3b3JkX3VuZGVmaW5lZCcsIHRoaXMuc2VxKHRoaXMucHJpbSgndW5kZWZpbmVkJyksIHRoaXMubm90KHRoaXMuYXBwKCduYW1lUmVzdCcpKSkpXG4gICAgLmRlZmluZSgna2V5d29yZF9udWxsJywgdGhpcy5zZXEodGhpcy5wcmltKCdudWxsJyksIHRoaXMubm90KHRoaXMuYXBwKCduYW1lUmVzdCcpKSkpXG4gICAgLmRlZmluZSgna2V5d29yZF90cnVlJywgdGhpcy5zZXEodGhpcy5wcmltKCd0cnVlJyksIHRoaXMubm90KHRoaXMuYXBwKCduYW1lUmVzdCcpKSkpXG4gICAgLmRlZmluZSgna2V5d29yZF9mYWxzZScsIHRoaXMuc2VxKHRoaXMucHJpbSgnZmFsc2UnKSwgdGhpcy5ub3QodGhpcy5hcHAoJ25hbWVSZXN0JykpKSlcbiAgICAuZGVmaW5lKCdrZXl3b3JkJywgdGhpcy5hbHQodGhpcy5hcHAoJ2tleXdvcmRfdW5kZWZpbmVkJyksIHRoaXMuYXBwKCdrZXl3b3JkX251bGwnKSwgdGhpcy5hcHAoJ2tleXdvcmRfdHJ1ZScpLCB0aGlzLmFwcCgna2V5d29yZF9mYWxzZScpKSlcbiAgICAuZGVmaW5lKCdzdHJpbmcnLCB0aGlzLnNlcSh0aGlzLnByaW0oJ1wiJyksIHRoaXMubWFueSh0aGlzLmFwcCgnc3RyQ2hhcicpLCAwKSwgdGhpcy5wcmltKCdcIicpKSlcbiAgICAuZGVmaW5lKCdzdHJDaGFyJywgdGhpcy5hbHQodGhpcy5hcHAoJ2VzY2FwZUNoYXInKSwgdGhpcy5zZXEodGhpcy5ub3QodGhpcy5wcmltKCdcIicpKSwgdGhpcy5ub3QodGhpcy5wcmltKCdcXG4nKSksIHRoaXMuYXBwKCdfJykpKSlcbiAgICAuZGVmaW5lKCdlc2NhcGVDaGFyX2hleEVzY2FwZScsIHRoaXMuc2VxKHRoaXMucHJpbSgnXFxcXHgnKSwgdGhpcy5hcHAoJ2hleERpZ2l0JyksIHRoaXMuYXBwKCdoZXhEaWdpdCcpKSlcbiAgICAuZGVmaW5lKCdlc2NhcGVDaGFyX3VuaWNvZGVFc2NhcGUnLCB0aGlzLnNlcSh0aGlzLnByaW0oJ1xcXFx1JyksIHRoaXMuYXBwKCdoZXhEaWdpdCcpLCB0aGlzLmFwcCgnaGV4RGlnaXQnKSwgdGhpcy5hcHAoJ2hleERpZ2l0JyksIHRoaXMuYXBwKCdoZXhEaWdpdCcpKSlcbiAgICAuZGVmaW5lKCdlc2NhcGVDaGFyX2VzY2FwZScsIHRoaXMuc2VxKHRoaXMucHJpbSgnXFxcXCcpLCB0aGlzLmFwcCgnXycpKSlcbiAgICAuZGVmaW5lKCdlc2NhcGVDaGFyJywgdGhpcy5hbHQodGhpcy5hcHAoJ2VzY2FwZUNoYXJfaGV4RXNjYXBlJyksIHRoaXMuYXBwKCdlc2NhcGVDaGFyX3VuaWNvZGVFc2NhcGUnKSwgdGhpcy5hcHAoJ2VzY2FwZUNoYXJfZXNjYXBlJykpKVxuICAgIC5kZWZpbmUoJ3JlZ0V4cCcsIHRoaXMuc2VxKHRoaXMucHJpbSgnLycpLCB0aGlzLmFwcCgncmVDaGFyQ2xhc3MnKSwgdGhpcy5wcmltKCcvJykpKVxuICAgIC5kZWZpbmUoJ3JlQ2hhckNsYXNzX3VuaWNvZGUnLCB0aGlzLnNlcSh0aGlzLnByaW0oJ1xcXFxweycpLCB0aGlzLm1hbnkodGhpcy5wcmltKC9bQS1aYS16XS8pLCAxKSwgdGhpcy5wcmltKCd9JykpKVxuICAgIC5kZWZpbmUoJ3JlQ2hhckNsYXNzX29yZGluYXJ5JywgdGhpcy5zZXEodGhpcy5wcmltKCdbJyksIHRoaXMubWFueSh0aGlzLmFsdCh0aGlzLnByaW0oJ1xcXFxdJyksIHRoaXMuc2VxKHRoaXMubm90KHRoaXMucHJpbSgnXScpKSwgdGhpcy5hcHAoJ18nKSkpLCAwKSwgdGhpcy5wcmltKCddJykpKVxuICAgIC5kZWZpbmUoJ3JlQ2hhckNsYXNzJywgdGhpcy5hbHQodGhpcy5hcHAoJ3JlQ2hhckNsYXNzX3VuaWNvZGUnKSwgdGhpcy5hcHAoJ3JlQ2hhckNsYXNzX29yZGluYXJ5JykpKVxuICAgIC5kZWZpbmUoJ251bWJlcicsIHRoaXMuc2VxKHRoaXMub3B0KHRoaXMucHJpbSgnLScpKSwgdGhpcy5tYW55KHRoaXMuYXBwKCdkaWdpdCcpLCAxKSkpXG4gICAgLmRlZmluZSgnc3BhY2Vfc2luZ2xlTGluZScsIHRoaXMuc2VxKHRoaXMucHJpbSgnLy8nKSwgdGhpcy5tYW55KHRoaXMuc2VxKHRoaXMubm90KHRoaXMucHJpbSgnXFxuJykpLCB0aGlzLmFwcCgnXycpKSwgMCksIHRoaXMucHJpbSgnXFxuJykpKVxuICAgIC5kZWZpbmUoJ3NwYWNlX211bHRpTGluZScsIHRoaXMuc2VxKHRoaXMucHJpbSgnLyonKSwgdGhpcy5tYW55KHRoaXMuc2VxKHRoaXMubm90KHRoaXMucHJpbSgnKi8nKSksIHRoaXMuYXBwKCdfJykpLCAwKSwgdGhpcy5wcmltKCcqLycpKSlcbiAgICAuZXh0ZW5kKCdzcGFjZScsIHRoaXMuYWx0KHRoaXMuYWx0KHRoaXMuYXBwKCdzcGFjZV9zaW5nbGVMaW5lJyksIHRoaXMuYXBwKCdzcGFjZV9tdWx0aUxpbmUnKSksIHRoaXMucHJpbSgvW1xcc10vKSkpXG4gICAgLmJ1aWxkKCk7XG59KTtcblxuIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuQnVmZmVyLnBvb2xTaXplID0gODE5MlxuXG4vKipcbiAqIElmIGBCdWZmZXIuX3VzZVR5cGVkQXJyYXlzYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKGNvbXBhdGlibGUgZG93biB0byBJRTYpXG4gKi9cbkJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgPSAoZnVuY3Rpb24gKCkge1xuICAvLyBEZXRlY3QgaWYgYnJvd3NlciBzdXBwb3J0cyBUeXBlZCBBcnJheXMuIFN1cHBvcnRlZCBicm93c2VycyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLFxuICAvLyBDaHJvbWUgNyssIFNhZmFyaSA1LjErLCBPcGVyYSAxMS42KywgaU9TIDQuMisuIElmIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nXG4gIC8vIHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcywgdGhlbiB0aGF0J3MgdGhlIHNhbWUgYXMgbm8gYFVpbnQ4QXJyYXlgIHN1cHBvcnRcbiAgLy8gYmVjYXVzZSB3ZSBuZWVkIHRvIGJlIGFibGUgdG8gYWRkIGFsbCB0aGUgbm9kZSBCdWZmZXIgQVBJIG1ldGhvZHMuIFRoaXMgaXMgYW4gaXNzdWVcbiAgLy8gaW4gRmlyZWZveCA0LTI5LiBOb3cgZml4ZWQ6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOFxuICB0cnkge1xuICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMClcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoYnVmKVxuICAgIGFyci5mb28gPSBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9XG4gICAgcmV0dXJuIDQyID09PSBhcnIuZm9vKCkgJiZcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAvLyBDaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59KSgpXG5cbi8qKlxuICogQ2xhc3M6IEJ1ZmZlclxuICogPT09PT09PT09PT09PVxuICpcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgYXJlIGF1Z21lbnRlZFxuICogd2l0aCBmdW5jdGlvbiBwcm9wZXJ0aWVzIGZvciBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgQVBJIGZ1bmN0aW9ucy4gV2UgdXNlXG4gKiBgVWludDhBcnJheWAgc28gdGhhdCBzcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdCByZXR1cm5zXG4gKiBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBCeSBhdWdtZW50aW5nIHRoZSBpbnN0YW5jZXMsIHdlIGNhbiBhdm9pZCBtb2RpZnlpbmcgdGhlIGBVaW50OEFycmF5YFxuICogcHJvdG90eXBlLlxuICovXG5mdW5jdGlvbiBCdWZmZXIgKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpXG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybylcblxuICB2YXIgdHlwZSA9IHR5cGVvZiBzdWJqZWN0XG5cbiAgLy8gV29ya2Fyb3VuZDogbm9kZSdzIGJhc2U2NCBpbXBsZW1lbnRhdGlvbiBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgc3RyaW5nc1xuICAvLyB3aGlsZSBiYXNlNjQtanMgZG9lcyBub3QuXG4gIGlmIChlbmNvZGluZyA9PT0gJ2Jhc2U2NCcgJiYgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBzdWJqZWN0ID0gc3RyaW5ndHJpbShzdWJqZWN0KVxuICAgIHdoaWxlIChzdWJqZWN0Lmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICAgIHN1YmplY3QgPSBzdWJqZWN0ICsgJz0nXG4gICAgfVxuICB9XG5cbiAgLy8gRmluZCB0aGUgbGVuZ3RoXG4gIHZhciBsZW5ndGhcbiAgaWYgKHR5cGUgPT09ICdudW1iZXInKVxuICAgIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0KVxuICBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJylcbiAgICBsZW5ndGggPSBCdWZmZXIuYnl0ZUxlbmd0aChzdWJqZWN0LCBlbmNvZGluZylcbiAgZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpXG4gICAgbGVuZ3RoID0gY29lcmNlKHN1YmplY3QubGVuZ3RoKSAvLyBhc3N1bWUgdGhhdCBvYmplY3QgaXMgYXJyYXktbGlrZVxuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCBuZWVkcyB0byBiZSBhIG51bWJlciwgYXJyYXkgb3Igc3RyaW5nLicpXG5cbiAgdmFyIGJ1ZlxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIC8vIFByZWZlcnJlZDogUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICBidWYgPSBCdWZmZXIuX2F1Z21lbnQobmV3IFVpbnQ4QXJyYXkobGVuZ3RoKSlcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIFRISVMgaW5zdGFuY2Ugb2YgQnVmZmVyIChjcmVhdGVkIGJ5IGBuZXdgKVxuICAgIGJ1ZiA9IHRoaXNcbiAgICBidWYubGVuZ3RoID0gbGVuZ3RoXG4gICAgYnVmLl9pc0J1ZmZlciA9IHRydWVcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmIHR5cGVvZiBzdWJqZWN0LmJ5dGVMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgLy8gU3BlZWQgb3B0aW1pemF0aW9uIC0tIHVzZSBzZXQgaWYgd2UncmUgY29weWluZyBmcm9tIGEgdHlwZWQgYXJyYXlcbiAgICBidWYuX3NldChzdWJqZWN0KVxuICB9IGVsc2UgaWYgKGlzQXJyYXlpc2goc3ViamVjdCkpIHtcbiAgICAvLyBUcmVhdCBhcnJheS1pc2ggb2JqZWN0cyBhcyBhIGJ5dGUgYXJyYXlcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkpXG4gICAgICAgIGJ1ZltpXSA9IHN1YmplY3QucmVhZFVJbnQ4KGkpXG4gICAgICBlbHNlXG4gICAgICAgIGJ1ZltpXSA9IHN1YmplY3RbaV1cbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBidWYud3JpdGUoc3ViamVjdCwgMCwgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgIUJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgIW5vWmVybykge1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYnVmW2ldID0gMFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWZcbn1cblxuLy8gU1RBVElDIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICdyYXcnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiAoYikge1xuICByZXR1cm4gISEoYiAhPT0gbnVsbCAmJiBiICE9PSB1bmRlZmluZWQgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gZnVuY3Rpb24gKHN0ciwgZW5jb2RpbmcpIHtcbiAgdmFyIHJldFxuICBzdHIgPSBzdHIgKyAnJ1xuICBzd2l0Y2ggKGVuY29kaW5nIHx8ICd1dGY4Jykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoIC8gMlxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSB1dGY4VG9CeXRlcyhzdHIpLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdyYXcnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gYmFzZTY0VG9CeXRlcyhzdHIpLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAqIDJcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gKGxpc3QsIHRvdGFsTGVuZ3RoKSB7XG4gIGFzc2VydChpc0FycmF5KGxpc3QpLCAnVXNhZ2U6IEJ1ZmZlci5jb25jYXQobGlzdCwgW3RvdGFsTGVuZ3RoXSlcXG4nICtcbiAgICAgICdsaXN0IHNob3VsZCBiZSBhbiBBcnJheS4nKVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKDApXG4gIH0gZWxzZSBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gbGlzdFswXVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB0b3RhbExlbmd0aCAhPT0gJ251bWJlcicpIHtcbiAgICB0b3RhbExlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgdG90YWxMZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmID0gbmV3IEJ1ZmZlcih0b3RhbExlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICBpdGVtLmNvcHkoYnVmLCBwb3MpXG4gICAgcG9zICs9IGl0ZW0ubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG4vLyBCVUZGRVIgSU5TVEFOQ0UgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gX2hleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgYXNzZXJ0KHN0ckxlbiAlIDIgPT09IDAsICdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYnl0ZSA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBhc3NlcnQoIWlzTmFOKGJ5dGUpLCAnSW52YWxpZCBoZXggc3RyaW5nJylcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBieXRlXG4gIH1cbiAgQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBpICogMlxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBfdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX2FzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX2JpbmFyeVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIF9hc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gX2Jhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBfdXRmMTZsZVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBTdXBwb3J0IGJvdGggKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKVxuICAvLyBhbmQgdGhlIGxlZ2FjeSAoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpXG4gIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgaWYgKCFpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICB9IGVsc2UgeyAgLy8gbGVnYWN5XG4gICAgdmFyIHN3YXAgPSBlbmNvZGluZ1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgb2Zmc2V0ID0gbGVuZ3RoXG4gICAgbGVuZ3RoID0gc3dhcFxuICB9XG5cbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKClcblxuICB2YXIgcmV0XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IF91dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gX2FzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gX2Jhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBfdXRmMTZsZVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgc2VsZiA9IHRoaXNcblxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKClcbiAgc3RhcnQgPSBOdW1iZXIoc3RhcnQpIHx8IDBcbiAgZW5kID0gKGVuZCAhPT0gdW5kZWZpbmVkKVxuICAgID8gTnVtYmVyKGVuZClcbiAgICA6IGVuZCA9IHNlbGYubGVuZ3RoXG5cbiAgLy8gRmFzdHBhdGggZW1wdHkgc3RyaW5nc1xuICBpZiAoZW5kID09PSBzdGFydClcbiAgICByZXR1cm4gJydcblxuICB2YXIgcmV0XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IF91dGY4U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gX2FzY2lpU2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gX2Jhc2U2NFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBfdXRmMTZsZVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0X3N0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzXG5cbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKCF0YXJnZXRfc3RhcnQpIHRhcmdldF9zdGFydCA9IDBcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVyblxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCBzb3VyY2UubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdzb3VyY2VFbmQgPCBzb3VyY2VTdGFydCcpXG4gIGFzc2VydCh0YXJnZXRfc3RhcnQgPj0gMCAmJiB0YXJnZXRfc3RhcnQgPCB0YXJnZXQubGVuZ3RoLFxuICAgICAgJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KGVuZCA+PSAwICYmIGVuZCA8PSBzb3VyY2UubGVuZ3RoLCAnc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aClcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCA8IGVuZCAtIHN0YXJ0KVxuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgKyBzdGFydFxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuXG4gIGlmIChsZW4gPCAxMDAgfHwgIUJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRfc3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0Ll9zZXQodGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLCB0YXJnZXRfc3RhcnQpXG4gIH1cbn1cblxuZnVuY3Rpb24gX2Jhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiBfdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJlcyA9ICcnXG4gIHZhciB0bXAgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBpZiAoYnVmW2ldIDw9IDB4N0YpIHtcbiAgICAgIHJlcyArPSBkZWNvZGVVdGY4Q2hhcih0bXApICsgU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gICAgICB0bXAgPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICB0bXAgKz0gJyUnICsgYnVmW2ldLnRvU3RyaW5nKDE2KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXMgKyBkZWNvZGVVdGY4Q2hhcih0bXApXG59XG5cbmZ1bmN0aW9uIF9hc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKylcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gX2JpbmFyeVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIF9hc2NpaVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZClcbn1cblxuZnVuY3Rpb24gX2hleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSsxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSBjbGFtcChzdGFydCwgbGVuLCAwKVxuICBlbmQgPSBjbGFtcChlbmQsIGxlbiwgbGVuKVxuXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5fYXVnbWVudCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpKVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgdmFyIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZCwgdHJ1ZSlcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyBpKyspIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgICByZXR1cm4gbmV3QnVmXG4gIH1cbn1cblxuLy8gYGdldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLmdldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJylcbiAgcmV0dXJuIHRoaXMucmVhZFVJbnQ4KG9mZnNldClcbn1cblxuLy8gYHNldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHYsIG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLnNldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJylcbiAgcmV0dXJuIHRoaXMud3JpdGVVSW50OCh2LCBvZmZzZXQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbmZ1bmN0aW9uIF9yZWFkVUludDE2IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbFxuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgdmFsID0gYnVmW29mZnNldF1cbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV0gPDwgOFxuICB9IGVsc2Uge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdIDw8IDhcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV1cbiAgfVxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZFVJbnQzMiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWxcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIGlmIChvZmZzZXQgKyAyIDwgbGVuKVxuICAgICAgdmFsID0gYnVmW29mZnNldCArIDJdIDw8IDE2XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDhcbiAgICB2YWwgfD0gYnVmW29mZnNldF1cbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbilcbiAgICAgIHZhbCA9IHZhbCArIChidWZbb2Zmc2V0ICsgM10gPDwgMjQgPj4+IDApXG4gIH0gZWxzZSB7XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgPSBidWZbb2Zmc2V0ICsgMV0gPDwgMTZcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMl0gPDwgOFxuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAzXVxuICAgIHZhbCA9IHZhbCArIChidWZbb2Zmc2V0XSA8PCAyNCA+Pj4gMClcbiAgfVxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDMyKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsXG4gICAgICAgICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICB2YXIgbmVnID0gdGhpc1tvZmZzZXRdICYgMHg4MFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTFcbiAgZWxzZVxuICAgIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuZnVuY3Rpb24gX3JlYWRJbnQxNiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWwgPSBfcmVhZFVJbnQxNihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCB0cnVlKVxuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmZmYgLSB2YWwgKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkSW50MzIgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsID0gX3JlYWRVSW50MzIoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSlcbiAgdmFyIG5lZyA9IHZhbCAmIDB4ODAwMDAwMDBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmZmZmZmZmYgLSB2YWwgKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MzIodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkRmxvYXQgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgcmV0dXJuIGllZWU3NTQucmVhZChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRGbG9hdCh0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWREb3VibGUgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgcmV0dXJuIGllZWU3NTQucmVhZChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWREb3VibGUodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWREb3VibGUodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuXG5cbiAgdGhpc1tvZmZzZXRdID0gdmFsdWVcbn1cblxuZnVuY3Rpb24gX3dyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmZmZilcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4obGVuIC0gb2Zmc2V0LCAyKTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9XG4gICAgICAgICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAgICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmZmZmZmZmYpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgNCk7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPVxuICAgICAgICAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2YsIC0weDgwKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICB0aGlzLndyaXRlVUludDgodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICB0aGlzLndyaXRlVUludDgoMHhmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmLCAtMHg4MDAwKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgX3dyaXRlVUludDE2KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbiAgZWxzZVxuICAgIF93cml0ZVVJbnQxNihidWYsIDB4ZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIF93cml0ZVVJbnQzMihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICBfd3JpdGVVSW50MzIoYnVmLCAweGZmZmZmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCxcbiAgICAgICAgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBmaWxsKHZhbHVlLCBzdGFydD0wLCBlbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uICh2YWx1ZSwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXZhbHVlKSB2YWx1ZSA9IDBcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kKSBlbmQgPSB0aGlzLmxlbmd0aFxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5jaGFyQ29kZUF0KDApXG4gIH1cblxuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsdWUpLCAndmFsdWUgaXMgbm90IGEgbnVtYmVyJylcbiAgYXNzZXJ0KGVuZCA+PSBzdGFydCwgJ2VuZCA8IHN0YXJ0JylcblxuICAvLyBGaWxsIDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVyblxuICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVyblxuXG4gIGFzc2VydChzdGFydCA+PSAwICYmIHN0YXJ0IDwgdGhpcy5sZW5ndGgsICdzdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KGVuZCA+PSAwICYmIGVuZCA8PSB0aGlzLmxlbmd0aCwgJ2VuZCBvdXQgb2YgYm91bmRzJylcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIHRoaXNbaV0gPSB2YWx1ZVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG91dCA9IFtdXG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgb3V0W2ldID0gdG9IZXgodGhpc1tpXSlcbiAgICBpZiAoaSA9PT0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUykge1xuICAgICAgb3V0W2kgKyAxXSA9ICcuLi4nXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIG91dC5qb2luKCcgJykgKyAnPidcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGBBcnJheUJ1ZmZlcmAgd2l0aCB0aGUgKmNvcGllZCogbWVtb3J5IG9mIHRoZSBidWZmZXIgaW5zdGFuY2UuXG4gKiBBZGRlZCBpbiBOb2RlIDAuMTIuIE9ubHkgYXZhaWxhYmxlIGluIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBBcnJheUJ1ZmZlci5cbiAqL1xuQnVmZmVyLnByb3RvdHlwZS50b0FycmF5QnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAgIHJldHVybiAobmV3IEJ1ZmZlcih0aGlzKSkuYnVmZmVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBidWYgPSBuZXcgVWludDhBcnJheSh0aGlzLmxlbmd0aClcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBidWYubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpXG4gICAgICAgIGJ1ZltpXSA9IHRoaXNbaV1cbiAgICAgIHJldHVybiBidWYuYnVmZmVyXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQnVmZmVyLnRvQXJyYXlCdWZmZXIgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXInKVxuICB9XG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxudmFyIEJQID0gQnVmZmVyLnByb3RvdHlwZVxuXG4vKipcbiAqIEF1Z21lbnQgYSBVaW50OEFycmF5ICppbnN0YW5jZSogKG5vdCB0aGUgVWludDhBcnJheSBjbGFzcyEpIHdpdGggQnVmZmVyIG1ldGhvZHNcbiAqL1xuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX2lzQnVmZmVyID0gdHJ1ZVxuXG4gIC8vIHNhdmUgcmVmZXJlbmNlIHRvIG9yaWdpbmFsIFVpbnQ4QXJyYXkgZ2V0L3NldCBtZXRob2RzIGJlZm9yZSBvdmVyd3JpdGluZ1xuICBhcnIuX2dldCA9IGFyci5nZXRcbiAgYXJyLl9zZXQgPSBhcnIuc2V0XG5cbiAgLy8gZGVwcmVjYXRlZCwgd2lsbCBiZSByZW1vdmVkIGluIG5vZGUgMC4xMytcbiAgYXJyLmdldCA9IEJQLmdldFxuICBhcnIuc2V0ID0gQlAuc2V0XG5cbiAgYXJyLndyaXRlID0gQlAud3JpdGVcbiAgYXJyLnRvU3RyaW5nID0gQlAudG9TdHJpbmdcbiAgYXJyLnRvTG9jYWxlU3RyaW5nID0gQlAudG9TdHJpbmdcbiAgYXJyLnRvSlNPTiA9IEJQLnRvSlNPTlxuICBhcnIuY29weSA9IEJQLmNvcHlcbiAgYXJyLnNsaWNlID0gQlAuc2xpY2VcbiAgYXJyLnJlYWRVSW50OCA9IEJQLnJlYWRVSW50OFxuICBhcnIucmVhZFVJbnQxNkxFID0gQlAucmVhZFVJbnQxNkxFXG4gIGFyci5yZWFkVUludDE2QkUgPSBCUC5yZWFkVUludDE2QkVcbiAgYXJyLnJlYWRVSW50MzJMRSA9IEJQLnJlYWRVSW50MzJMRVxuICBhcnIucmVhZFVJbnQzMkJFID0gQlAucmVhZFVJbnQzMkJFXG4gIGFyci5yZWFkSW50OCA9IEJQLnJlYWRJbnQ4XG4gIGFyci5yZWFkSW50MTZMRSA9IEJQLnJlYWRJbnQxNkxFXG4gIGFyci5yZWFkSW50MTZCRSA9IEJQLnJlYWRJbnQxNkJFXG4gIGFyci5yZWFkSW50MzJMRSA9IEJQLnJlYWRJbnQzMkxFXG4gIGFyci5yZWFkSW50MzJCRSA9IEJQLnJlYWRJbnQzMkJFXG4gIGFyci5yZWFkRmxvYXRMRSA9IEJQLnJlYWRGbG9hdExFXG4gIGFyci5yZWFkRmxvYXRCRSA9IEJQLnJlYWRGbG9hdEJFXG4gIGFyci5yZWFkRG91YmxlTEUgPSBCUC5yZWFkRG91YmxlTEVcbiAgYXJyLnJlYWREb3VibGVCRSA9IEJQLnJlYWREb3VibGVCRVxuICBhcnIud3JpdGVVSW50OCA9IEJQLndyaXRlVUludDhcbiAgYXJyLndyaXRlVUludDE2TEUgPSBCUC53cml0ZVVJbnQxNkxFXG4gIGFyci53cml0ZVVJbnQxNkJFID0gQlAud3JpdGVVSW50MTZCRVxuICBhcnIud3JpdGVVSW50MzJMRSA9IEJQLndyaXRlVUludDMyTEVcbiAgYXJyLndyaXRlVUludDMyQkUgPSBCUC53cml0ZVVJbnQzMkJFXG4gIGFyci53cml0ZUludDggPSBCUC53cml0ZUludDhcbiAgYXJyLndyaXRlSW50MTZMRSA9IEJQLndyaXRlSW50MTZMRVxuICBhcnIud3JpdGVJbnQxNkJFID0gQlAud3JpdGVJbnQxNkJFXG4gIGFyci53cml0ZUludDMyTEUgPSBCUC53cml0ZUludDMyTEVcbiAgYXJyLndyaXRlSW50MzJCRSA9IEJQLndyaXRlSW50MzJCRVxuICBhcnIud3JpdGVGbG9hdExFID0gQlAud3JpdGVGbG9hdExFXG4gIGFyci53cml0ZUZsb2F0QkUgPSBCUC53cml0ZUZsb2F0QkVcbiAgYXJyLndyaXRlRG91YmxlTEUgPSBCUC53cml0ZURvdWJsZUxFXG4gIGFyci53cml0ZURvdWJsZUJFID0gQlAud3JpdGVEb3VibGVCRVxuICBhcnIuZmlsbCA9IEJQLmZpbGxcbiAgYXJyLmluc3BlY3QgPSBCUC5pbnNwZWN0XG4gIGFyci50b0FycmF5QnVmZmVyID0gQlAudG9BcnJheUJ1ZmZlclxuXG4gIHJldHVybiBhcnJcbn1cblxuLy8gc2xpY2Uoc3RhcnQsIGVuZClcbmZ1bmN0aW9uIGNsYW1wIChpbmRleCwgbGVuLCBkZWZhdWx0VmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHJldHVybiBkZWZhdWx0VmFsdWVcbiAgaW5kZXggPSB+fmluZGV4OyAgLy8gQ29lcmNlIHRvIGludGVnZXIuXG4gIGlmIChpbmRleCA+PSBsZW4pIHJldHVybiBsZW5cbiAgaWYgKGluZGV4ID49IDApIHJldHVybiBpbmRleFxuICBpbmRleCArPSBsZW5cbiAgaWYgKGluZGV4ID49IDApIHJldHVybiBpbmRleFxuICByZXR1cm4gMFxufVxuXG5mdW5jdGlvbiBjb2VyY2UgKGxlbmd0aCkge1xuICAvLyBDb2VyY2UgbGVuZ3RoIHRvIGEgbnVtYmVyIChwb3NzaWJseSBOYU4pLCByb3VuZCB1cFxuICAvLyBpbiBjYXNlIGl0J3MgZnJhY3Rpb25hbCAoZS5nLiAxMjMuNDU2KSB0aGVuIGRvIGFcbiAgLy8gZG91YmxlIG5lZ2F0ZSB0byBjb2VyY2UgYSBOYU4gdG8gMC4gRWFzeSwgcmlnaHQ/XG4gIGxlbmd0aCA9IH5+TWF0aC5jZWlsKCtsZW5ndGgpXG4gIHJldHVybiBsZW5ndGggPCAwID8gMCA6IGxlbmd0aFxufVxuXG5mdW5jdGlvbiBpc0FycmF5IChzdWJqZWN0KSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoc3ViamVjdCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ViamVjdCkgPT09ICdbb2JqZWN0IEFycmF5XSdcbiAgfSkoc3ViamVjdClcbn1cblxuZnVuY3Rpb24gaXNBcnJheWlzaCAoc3ViamVjdCkge1xuICByZXR1cm4gaXNBcnJheShzdWJqZWN0KSB8fCBCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkgfHxcbiAgICAgIHN1YmplY3QgJiYgdHlwZW9mIHN1YmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICB0eXBlb2Ygc3ViamVjdC5sZW5ndGggPT09ICdudW1iZXInXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYiA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaWYgKGIgPD0gMHg3RilcbiAgICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpKVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHN0YXJ0ID0gaVxuICAgICAgaWYgKGIgPj0gMHhEODAwICYmIGIgPD0gMHhERkZGKSBpKytcbiAgICAgIHZhciBoID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0ci5zbGljZShzdGFydCwgaSsxKSkuc3Vic3RyKDEpLnNwbGl0KCclJylcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaC5sZW5ndGg7IGorKylcbiAgICAgICAgYnl0ZUFycmF5LnB1c2gocGFyc2VJbnQoaFtqXSwgMTYpKVxuICAgIH1cbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShzdHIpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgcG9zXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpXG4gICAgICBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGRlY29kZVV0ZjhDaGFyIChzdHIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKSAvLyBVVEYgOCBpbnZhbGlkIGNoYXJcbiAgfVxufVxuXG4vKlxuICogV2UgaGF2ZSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgdmFsdWUgaXMgYSB2YWxpZCBpbnRlZ2VyLiBUaGlzIG1lYW5zIHRoYXQgaXRcbiAqIGlzIG5vbi1uZWdhdGl2ZS4gSXQgaGFzIG5vIGZyYWN0aW9uYWwgY29tcG9uZW50IGFuZCB0aGF0IGl0IGRvZXMgbm90XG4gKiBleGNlZWQgdGhlIG1heGltdW0gYWxsb3dlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gdmVyaWZ1aW50ICh2YWx1ZSwgbWF4KSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpXG4gIGFzc2VydCh2YWx1ZSA+PSAwLCAnc3BlY2lmaWVkIGEgbmVnYXRpdmUgdmFsdWUgZm9yIHdyaXRpbmcgYW4gdW5zaWduZWQgdmFsdWUnKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgaXMgbGFyZ2VyIHRoYW4gbWF4aW11bSB2YWx1ZSBmb3IgdHlwZScpXG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpXG59XG5cbmZ1bmN0aW9uIHZlcmlmc2ludCAodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpXG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpXG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpXG59XG5cbmZ1bmN0aW9uIHZlcmlmSUVFRTc1NCAodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpXG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpXG59XG5cbmZ1bmN0aW9uIGFzc2VydCAodGVzdCwgbWVzc2FnZSkge1xuICBpZiAoIXRlc3QpIHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8ICdGYWlsZWQgYXNzZXJ0aW9uJylcbn1cbiIsInZhciBsb29rdXAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cbjsoZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG4gIHZhciBBcnIgPSAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKVxuICAgID8gVWludDhBcnJheVxuICAgIDogQXJyYXlcblxuXHR2YXIgUExVUyAgID0gJysnLmNoYXJDb2RlQXQoMClcblx0dmFyIFNMQVNIICA9ICcvJy5jaGFyQ29kZUF0KDApXG5cdHZhciBOVU1CRVIgPSAnMCcuY2hhckNvZGVBdCgwKVxuXHR2YXIgTE9XRVIgID0gJ2EnLmNoYXJDb2RlQXQoMClcblx0dmFyIFVQUEVSICA9ICdBJy5jaGFyQ29kZUF0KDApXG5cdHZhciBQTFVTX1VSTF9TQUZFID0gJy0nLmNoYXJDb2RlQXQoMClcblx0dmFyIFNMQVNIX1VSTF9TQUZFID0gJ18nLmNoYXJDb2RlQXQoMClcblxuXHRmdW5jdGlvbiBkZWNvZGUgKGVsdCkge1xuXHRcdHZhciBjb2RlID0gZWx0LmNoYXJDb2RlQXQoMClcblx0XHRpZiAoY29kZSA9PT0gUExVUyB8fFxuXHRcdCAgICBjb2RlID09PSBQTFVTX1VSTF9TQUZFKVxuXHRcdFx0cmV0dXJuIDYyIC8vICcrJ1xuXHRcdGlmIChjb2RlID09PSBTTEFTSCB8fFxuXHRcdCAgICBjb2RlID09PSBTTEFTSF9VUkxfU0FGRSlcblx0XHRcdHJldHVybiA2MyAvLyAnLydcblx0XHRpZiAoY29kZSA8IE5VTUJFUilcblx0XHRcdHJldHVybiAtMSAvL25vIG1hdGNoXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIgKyAxMClcblx0XHRcdHJldHVybiBjb2RlIC0gTlVNQkVSICsgMjYgKyAyNlxuXHRcdGlmIChjb2RlIDwgVVBQRVIgKyAyNilcblx0XHRcdHJldHVybiBjb2RlIC0gVVBQRVJcblx0XHRpZiAoY29kZSA8IExPV0VSICsgMjYpXG5cdFx0XHRyZXR1cm4gY29kZSAtIExPV0VSICsgMjZcblx0fVxuXG5cdGZ1bmN0aW9uIGI2NFRvQnl0ZUFycmF5IChiNjQpIHtcblx0XHR2YXIgaSwgaiwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuXG5cdFx0aWYgKGI2NC5sZW5ndGggJSA0ID4gMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0Jylcblx0XHR9XG5cblx0XHQvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuXHRcdC8vIGlmIHRoZXJlIGFyZSB0d28gcGxhY2Vob2xkZXJzLCB0aGFuIHRoZSB0d28gY2hhcmFjdGVycyBiZWZvcmUgaXRcblx0XHQvLyByZXByZXNlbnQgb25lIGJ5dGVcblx0XHQvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcblx0XHQvLyB0aGlzIGlzIGp1c3QgYSBjaGVhcCBoYWNrIHRvIG5vdCBkbyBpbmRleE9mIHR3aWNlXG5cdFx0dmFyIGxlbiA9IGI2NC5sZW5ndGhcblx0XHRwbGFjZUhvbGRlcnMgPSAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMikgPyAyIDogJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDEpID8gMSA6IDBcblxuXHRcdC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuXHRcdGFyciA9IG5ldyBBcnIoYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKVxuXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuXHRcdGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gYjY0Lmxlbmd0aCAtIDQgOiBiNjQubGVuZ3RoXG5cblx0XHR2YXIgTCA9IDBcblxuXHRcdGZ1bmN0aW9uIHB1c2ggKHYpIHtcblx0XHRcdGFycltMKytdID0gdlxuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGogPSAwOyBpIDwgbDsgaSArPSA0LCBqICs9IDMpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTgpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgMTIpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPDwgNikgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMykpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDAwMCkgPj4gMTYpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDApID4+IDgpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fVxuXG5cdFx0aWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAyKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpID4+IDQpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fSBlbHNlIGlmIChwbGFjZUhvbGRlcnMgPT09IDEpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTApIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgNCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA+PiAyKVxuXHRcdFx0cHVzaCgodG1wID4+IDgpICYgMHhGRilcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyXG5cdH1cblxuXHRmdW5jdGlvbiB1aW50OFRvQmFzZTY0ICh1aW50OCkge1xuXHRcdHZhciBpLFxuXHRcdFx0ZXh0cmFCeXRlcyA9IHVpbnQ4Lmxlbmd0aCAlIDMsIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG5cdFx0XHRvdXRwdXQgPSBcIlwiLFxuXHRcdFx0dGVtcCwgbGVuZ3RoXG5cblx0XHRmdW5jdGlvbiBlbmNvZGUgKG51bSkge1xuXHRcdFx0cmV0dXJuIGxvb2t1cC5jaGFyQXQobnVtKVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKG51bSA+PiAxOCAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiAxMiAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiA2ICYgMHgzRikgKyBlbmNvZGUobnVtICYgMHgzRilcblx0XHR9XG5cblx0XHQvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG5cdFx0Zm9yIChpID0gMCwgbGVuZ3RoID0gdWludDgubGVuZ3RoIC0gZXh0cmFCeXRlczsgaSA8IGxlbmd0aDsgaSArPSAzKSB7XG5cdFx0XHR0ZW1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuXHRcdFx0b3V0cHV0ICs9IHRyaXBsZXRUb0Jhc2U2NCh0ZW1wKVxuXHRcdH1cblxuXHRcdC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcblx0XHRzd2l0Y2ggKGV4dHJhQnl0ZXMpIHtcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0dGVtcCA9IHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAyKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wIDw8IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9ICc9PSdcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0dGVtcCA9ICh1aW50OFt1aW50OC5sZW5ndGggLSAyXSA8PCA4KSArICh1aW50OFt1aW50OC5sZW5ndGggLSAxXSlcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDEwKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wID4+IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA8PCAyKSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSAnPSdcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0XG5cdH1cblxuXHRleHBvcnRzLnRvQnl0ZUFycmF5ID0gYjY0VG9CeXRlQXJyYXlcblx0ZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gdWludDhUb0Jhc2U2NFxufSh0eXBlb2YgZXhwb3J0cyA9PT0gJ3VuZGVmaW5lZCcgPyAodGhpcy5iYXNlNjRqcyA9IHt9KSA6IGV4cG9ydHMpKVxuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24oYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSxcbiAgICAgIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDEsXG4gICAgICBlTWF4ID0gKDEgPDwgZUxlbikgLSAxLFxuICAgICAgZUJpYXMgPSBlTWF4ID4+IDEsXG4gICAgICBuQml0cyA9IC03LFxuICAgICAgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwLFxuICAgICAgZCA9IGlzTEUgPyAtMSA6IDEsXG4gICAgICBzID0gYnVmZmVyW29mZnNldCArIGldO1xuXG4gIGkgKz0gZDtcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKTtcbiAgcyA+Pj0gKC1uQml0cyk7XG4gIG5CaXRzICs9IGVMZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpO1xuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpO1xuICBlID4+PSAoLW5CaXRzKTtcbiAgbkJpdHMgKz0gbUxlbjtcbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCk7XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzO1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSk7XG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICBlID0gZSAtIGVCaWFzO1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pO1xufTtcblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjLFxuICAgICAgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMSxcbiAgICAgIGVNYXggPSAoMSA8PCBlTGVuKSAtIDEsXG4gICAgICBlQmlhcyA9IGVNYXggPj4gMSxcbiAgICAgIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKSxcbiAgICAgIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKSxcbiAgICAgIGQgPSBpc0xFID8gMSA6IC0xLFxuICAgICAgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMDtcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKTtcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMDtcbiAgICBlID0gZU1heDtcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMik7XG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tO1xuICAgICAgYyAqPSAyO1xuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gYztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrKztcbiAgICAgIGMgLz0gMjtcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwO1xuICAgICAgZSA9IGVNYXg7XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pO1xuICAgICAgZSA9IGUgKyBlQmlhcztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pO1xuICAgICAgZSA9IDA7XG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCk7XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbTtcbiAgZUxlbiArPSBtTGVuO1xuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpO1xuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyODtcbn07XG4iLCJ2YXIgQnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyO1xudmFyIGludFNpemUgPSA0O1xudmFyIHplcm9CdWZmZXIgPSBuZXcgQnVmZmVyKGludFNpemUpOyB6ZXJvQnVmZmVyLmZpbGwoMCk7XG52YXIgY2hyc3ogPSA4O1xuXG5mdW5jdGlvbiB0b0FycmF5KGJ1ZiwgYmlnRW5kaWFuKSB7XG4gIGlmICgoYnVmLmxlbmd0aCAlIGludFNpemUpICE9PSAwKSB7XG4gICAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGggKyAoaW50U2l6ZSAtIChidWYubGVuZ3RoICUgaW50U2l6ZSkpO1xuICAgIGJ1ZiA9IEJ1ZmZlci5jb25jYXQoW2J1ZiwgemVyb0J1ZmZlcl0sIGxlbik7XG4gIH1cblxuICB2YXIgYXJyID0gW107XG4gIHZhciBmbiA9IGJpZ0VuZGlhbiA/IGJ1Zi5yZWFkSW50MzJCRSA6IGJ1Zi5yZWFkSW50MzJMRTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWYubGVuZ3RoOyBpICs9IGludFNpemUpIHtcbiAgICBhcnIucHVzaChmbi5jYWxsKGJ1ZiwgaSkpO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIHRvQnVmZmVyKGFyciwgc2l6ZSwgYmlnRW5kaWFuKSB7XG4gIHZhciBidWYgPSBuZXcgQnVmZmVyKHNpemUpO1xuICB2YXIgZm4gPSBiaWdFbmRpYW4gPyBidWYud3JpdGVJbnQzMkJFIDogYnVmLndyaXRlSW50MzJMRTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBmbi5jYWxsKGJ1ZiwgYXJyW2ldLCBpICogNCwgdHJ1ZSk7XG4gIH1cbiAgcmV0dXJuIGJ1Zjtcbn1cblxuZnVuY3Rpb24gaGFzaChidWYsIGZuLCBoYXNoU2l6ZSwgYmlnRW5kaWFuKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIGJ1ZiA9IG5ldyBCdWZmZXIoYnVmKTtcbiAgdmFyIGFyciA9IGZuKHRvQXJyYXkoYnVmLCBiaWdFbmRpYW4pLCBidWYubGVuZ3RoICogY2hyc3opO1xuICByZXR1cm4gdG9CdWZmZXIoYXJyLCBoYXNoU2l6ZSwgYmlnRW5kaWFuKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGhhc2g6IGhhc2ggfTtcbiIsInZhciBCdWZmZXIgPSByZXF1aXJlKCdidWZmZXInKS5CdWZmZXJcbnZhciBzaGEgPSByZXF1aXJlKCcuL3NoYScpXG52YXIgc2hhMjU2ID0gcmVxdWlyZSgnLi9zaGEyNTYnKVxudmFyIHJuZyA9IHJlcXVpcmUoJy4vcm5nJylcbnZhciBtZDUgPSByZXF1aXJlKCcuL21kNScpXG5cbnZhciBhbGdvcml0aG1zID0ge1xuICBzaGExOiBzaGEsXG4gIHNoYTI1Njogc2hhMjU2LFxuICBtZDU6IG1kNVxufVxuXG52YXIgYmxvY2tzaXplID0gNjRcbnZhciB6ZXJvQnVmZmVyID0gbmV3IEJ1ZmZlcihibG9ja3NpemUpOyB6ZXJvQnVmZmVyLmZpbGwoMClcbmZ1bmN0aW9uIGhtYWMoZm4sIGtleSwgZGF0YSkge1xuICBpZighQnVmZmVyLmlzQnVmZmVyKGtleSkpIGtleSA9IG5ldyBCdWZmZXIoa2V5KVxuICBpZighQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSBkYXRhID0gbmV3IEJ1ZmZlcihkYXRhKVxuXG4gIGlmKGtleS5sZW5ndGggPiBibG9ja3NpemUpIHtcbiAgICBrZXkgPSBmbihrZXkpXG4gIH0gZWxzZSBpZihrZXkubGVuZ3RoIDwgYmxvY2tzaXplKSB7XG4gICAga2V5ID0gQnVmZmVyLmNvbmNhdChba2V5LCB6ZXJvQnVmZmVyXSwgYmxvY2tzaXplKVxuICB9XG5cbiAgdmFyIGlwYWQgPSBuZXcgQnVmZmVyKGJsb2Nrc2l6ZSksIG9wYWQgPSBuZXcgQnVmZmVyKGJsb2Nrc2l6ZSlcbiAgZm9yKHZhciBpID0gMDsgaSA8IGJsb2Nrc2l6ZTsgaSsrKSB7XG4gICAgaXBhZFtpXSA9IGtleVtpXSBeIDB4MzZcbiAgICBvcGFkW2ldID0ga2V5W2ldIF4gMHg1Q1xuICB9XG5cbiAgdmFyIGhhc2ggPSBmbihCdWZmZXIuY29uY2F0KFtpcGFkLCBkYXRhXSkpXG4gIHJldHVybiBmbihCdWZmZXIuY29uY2F0KFtvcGFkLCBoYXNoXSkpXG59XG5cbmZ1bmN0aW9uIGhhc2goYWxnLCBrZXkpIHtcbiAgYWxnID0gYWxnIHx8ICdzaGExJ1xuICB2YXIgZm4gPSBhbGdvcml0aG1zW2FsZ11cbiAgdmFyIGJ1ZnMgPSBbXVxuICB2YXIgbGVuZ3RoID0gMFxuICBpZighZm4pIGVycm9yKCdhbGdvcml0aG06JywgYWxnLCAnaXMgbm90IHlldCBzdXBwb3J0ZWQnKVxuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIGlmKCFCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIGRhdGEgPSBuZXcgQnVmZmVyKGRhdGEpXG4gICAgICAgIFxuICAgICAgYnVmcy5wdXNoKGRhdGEpXG4gICAgICBsZW5ndGggKz0gZGF0YS5sZW5ndGhcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICBkaWdlc3Q6IGZ1bmN0aW9uIChlbmMpIHtcbiAgICAgIHZhciBidWYgPSBCdWZmZXIuY29uY2F0KGJ1ZnMpXG4gICAgICB2YXIgciA9IGtleSA/IGhtYWMoZm4sIGtleSwgYnVmKSA6IGZuKGJ1ZilcbiAgICAgIGJ1ZnMgPSBudWxsXG4gICAgICByZXR1cm4gZW5jID8gci50b1N0cmluZyhlbmMpIDogclxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBlcnJvciAoKSB7XG4gIHZhciBtID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpLmpvaW4oJyAnKVxuICB0aHJvdyBuZXcgRXJyb3IoW1xuICAgIG0sXG4gICAgJ3dlIGFjY2VwdCBwdWxsIHJlcXVlc3RzJyxcbiAgICAnaHR0cDovL2dpdGh1Yi5jb20vZG9taW5pY3RhcnIvY3J5cHRvLWJyb3dzZXJpZnknXG4gICAgXS5qb2luKCdcXG4nKSlcbn1cblxuZXhwb3J0cy5jcmVhdGVIYXNoID0gZnVuY3Rpb24gKGFsZykgeyByZXR1cm4gaGFzaChhbGcpIH1cbmV4cG9ydHMuY3JlYXRlSG1hYyA9IGZ1bmN0aW9uIChhbGcsIGtleSkgeyByZXR1cm4gaGFzaChhbGcsIGtleSkgfVxuZXhwb3J0cy5yYW5kb21CeXRlcyA9IGZ1bmN0aW9uKHNpemUsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgdW5kZWZpbmVkLCBuZXcgQnVmZmVyKHJuZyhzaXplKSkpXG4gICAgfSBjYXRjaCAoZXJyKSB7IGNhbGxiYWNrKGVycikgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKHJuZyhzaXplKSlcbiAgfVxufVxuXG5mdW5jdGlvbiBlYWNoKGEsIGYpIHtcbiAgZm9yKHZhciBpIGluIGEpXG4gICAgZihhW2ldLCBpKVxufVxuXG4vLyB0aGUgbGVhc3QgSSBjYW4gZG8gaXMgbWFrZSBlcnJvciBtZXNzYWdlcyBmb3IgdGhlIHJlc3Qgb2YgdGhlIG5vZGUuanMvY3J5cHRvIGFwaS5cbmVhY2goWydjcmVhdGVDcmVkZW50aWFscydcbiwgJ2NyZWF0ZUNpcGhlcidcbiwgJ2NyZWF0ZUNpcGhlcml2J1xuLCAnY3JlYXRlRGVjaXBoZXInXG4sICdjcmVhdGVEZWNpcGhlcml2J1xuLCAnY3JlYXRlU2lnbidcbiwgJ2NyZWF0ZVZlcmlmeSdcbiwgJ2NyZWF0ZURpZmZpZUhlbGxtYW4nXG4sICdwYmtkZjInXSwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgZXhwb3J0c1tuYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICBlcnJvcignc29ycnksJywgbmFtZSwgJ2lzIG5vdCBpbXBsZW1lbnRlZCB5ZXQnKVxuICB9XG59KVxuIiwiLypcclxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxyXG4gKiBEaWdlc3QgQWxnb3JpdGhtLCBhcyBkZWZpbmVkIGluIFJGQyAxMzIxLlxyXG4gKiBWZXJzaW9uIDIuMSBDb3B5cmlnaHQgKEMpIFBhdWwgSm9obnN0b24gMTk5OSAtIDIwMDIuXHJcbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcclxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXHJcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBtb3JlIGluZm8uXHJcbiAqL1xyXG5cclxudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcclxuXHJcbi8qXHJcbiAqIFBlcmZvcm0gYSBzaW1wbGUgc2VsZi10ZXN0IHRvIHNlZSBpZiB0aGUgVk0gaXMgd29ya2luZ1xyXG4gKi9cclxuZnVuY3Rpb24gbWQ1X3ZtX3Rlc3QoKVxyXG57XHJcbiAgcmV0dXJuIGhleF9tZDUoXCJhYmNcIikgPT0gXCI5MDAxNTA5ODNjZDI0ZmIwZDY5NjNmN2QyOGUxN2Y3MlwiO1xyXG59XHJcblxyXG4vKlxyXG4gKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoXHJcbiAqL1xyXG5mdW5jdGlvbiBjb3JlX21kNSh4LCBsZW4pXHJcbntcclxuICAvKiBhcHBlbmQgcGFkZGluZyAqL1xyXG4gIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgKChsZW4pICUgMzIpO1xyXG4gIHhbKCgobGVuICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IGxlbjtcclxuXHJcbiAgdmFyIGEgPSAgMTczMjU4NDE5MztcclxuICB2YXIgYiA9IC0yNzE3MzM4Nzk7XHJcbiAgdmFyIGMgPSAtMTczMjU4NDE5NDtcclxuICB2YXIgZCA9ICAyNzE3MzM4Nzg7XHJcblxyXG4gIGZvcih2YXIgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNilcclxuICB7XHJcbiAgICB2YXIgb2xkYSA9IGE7XHJcbiAgICB2YXIgb2xkYiA9IGI7XHJcbiAgICB2YXIgb2xkYyA9IGM7XHJcbiAgICB2YXIgb2xkZCA9IGQ7XHJcblxyXG4gICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2krIDBdLCA3ICwgLTY4MDg3NjkzNik7XHJcbiAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSsgMV0sIDEyLCAtMzg5NTY0NTg2KTtcclxuICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpKyAyXSwgMTcsICA2MDYxMDU4MTkpO1xyXG4gICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2krIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xyXG4gICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2krIDRdLCA3ICwgLTE3NjQxODg5Nyk7XHJcbiAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSsgNV0sIDEyLCAgMTIwMDA4MDQyNik7XHJcbiAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XHJcbiAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSsgN10sIDIyLCAtNDU3MDU5ODMpO1xyXG4gICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2krIDhdLCA3ICwgIDE3NzAwMzU0MTYpO1xyXG4gICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2krIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xyXG4gICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2krMTBdLCAxNywgLTQyMDYzKTtcclxuICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpKzExXSwgMjIsIC0xOTkwNDA0MTYyKTtcclxuICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpKzEyXSwgNyAsICAxODA0NjAzNjgyKTtcclxuICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpKzEzXSwgMTIsIC00MDM0MTEwMSk7XHJcbiAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSsxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XHJcbiAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSsxNV0sIDIyLCAgMTIzNjUzNTMyOSk7XHJcblxyXG4gICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2krIDFdLCA1ICwgLTE2NTc5NjUxMCk7XHJcbiAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSsgNl0sIDkgLCAtMTA2OTUwMTYzMik7XHJcbiAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSsxMV0sIDE0LCAgNjQzNzE3NzEzKTtcclxuICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpKyAwXSwgMjAsIC0zNzM4OTczMDIpO1xyXG4gICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2krIDVdLCA1ICwgLTcwMTU1ODY5MSk7XHJcbiAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSsxMF0sIDkgLCAgMzgwMTYwODMpO1xyXG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XHJcbiAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcclxuICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpKyA5XSwgNSAsICA1Njg0NDY0MzgpO1xyXG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krMTRdLCA5ICwgLTEwMTk4MDM2OTApO1xyXG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XHJcbiAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSsgOF0sIDIwLCAgMTE2MzUzMTUwMSk7XHJcbiAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSsxM10sIDUgLCAtMTQ0NDY4MTQ2Nyk7XHJcbiAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSsgMl0sIDkgLCAtNTE0MDM3ODQpO1xyXG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krIDddLCAxNCwgIDE3MzUzMjg0NzMpO1xyXG4gICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2krMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xyXG5cclxuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKyA1XSwgNCAsIC0zNzg1NTgpO1xyXG4gICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2krIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xyXG4gICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2krMTFdLCAxNiwgIDE4MzkwMzA1NjIpO1xyXG4gICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2krMTRdLCAyMywgLTM1MzA5NTU2KTtcclxuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKyAxXSwgNCAsIC0xNTMwOTkyMDYwKTtcclxuICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpKyA0XSwgMTEsICAxMjcyODkzMzUzKTtcclxuICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpKyA3XSwgMTYsIC0xNTU0OTc2MzIpO1xyXG4gICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2krMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xyXG4gICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2krMTNdLCA0ICwgIDY4MTI3OTE3NCk7XHJcbiAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSsgMF0sIDExLCAtMzU4NTM3MjIyKTtcclxuICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xyXG4gICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2krIDZdLCAyMywgIDc2MDI5MTg5KTtcclxuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKyA5XSwgNCAsIC02NDAzNjQ0ODcpO1xyXG4gICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2krMTJdLCAxMSwgLTQyMTgxNTgzNSk7XHJcbiAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSsxNV0sIDE2LCAgNTMwNzQyNTIwKTtcclxuICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xyXG5cclxuICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpKyAwXSwgNiAsIC0xOTg2MzA4NDQpO1xyXG4gICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2krIDddLCAxMCwgIDExMjY4OTE0MTUpO1xyXG4gICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2krMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xyXG4gICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2krIDVdLCAyMSwgLTU3NDM0MDU1KTtcclxuICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpKzEyXSwgNiAsICAxNzAwNDg1NTcxKTtcclxuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcclxuICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpKzEwXSwgMTUsIC0xMDUxNTIzKTtcclxuICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpKyAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcclxuICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpKyA4XSwgNiAsICAxODczMzEzMzU5KTtcclxuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKzE1XSwgMTAsIC0zMDYxMTc0NCk7XHJcbiAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSsgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XHJcbiAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSsxM10sIDIxLCAgMTMwOTE1MTY0OSk7XHJcbiAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSsgNF0sIDYgLCAtMTQ1NTIzMDcwKTtcclxuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKzExXSwgMTAsIC0xMTIwMjEwMzc5KTtcclxuICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpKyAyXSwgMTUsICA3MTg3ODcyNTkpO1xyXG4gICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2krIDldLCAyMSwgLTM0MzQ4NTU1MSk7XHJcblxyXG4gICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xyXG4gICAgYiA9IHNhZmVfYWRkKGIsIG9sZGIpO1xyXG4gICAgYyA9IHNhZmVfYWRkKGMsIG9sZGMpO1xyXG4gICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xyXG4gIH1cclxuICByZXR1cm4gQXJyYXkoYSwgYiwgYywgZCk7XHJcblxyXG59XHJcblxyXG4vKlxyXG4gKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxyXG4gKi9cclxuZnVuY3Rpb24gbWQ1X2NtbihxLCBhLCBiLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIHNhZmVfYWRkKGJpdF9yb2woc2FmZV9hZGQoc2FmZV9hZGQoYSwgcSksIHNhZmVfYWRkKHgsIHQpKSwgcyksYik7XHJcbn1cclxuZnVuY3Rpb24gbWQ1X2ZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpXHJcbntcclxuICByZXR1cm4gbWQ1X2NtbigoYiAmIGMpIHwgKCh+YikgJiBkKSwgYSwgYiwgeCwgcywgdCk7XHJcbn1cclxuZnVuY3Rpb24gbWQ1X2dnKGEsIGIsIGMsIGQsIHgsIHMsIHQpXHJcbntcclxuICByZXR1cm4gbWQ1X2NtbigoYiAmIGQpIHwgKGMgJiAofmQpKSwgYSwgYiwgeCwgcywgdCk7XHJcbn1cclxuZnVuY3Rpb24gbWQ1X2hoKGEsIGIsIGMsIGQsIHgsIHMsIHQpXHJcbntcclxuICByZXR1cm4gbWQ1X2NtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xyXG59XHJcbmZ1bmN0aW9uIG1kNV9paShhLCBiLCBjLCBkLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIG1kNV9jbW4oYyBeIChiIHwgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xyXG59XHJcblxyXG4vKlxyXG4gKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XHJcbiAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXHJcbiAqL1xyXG5mdW5jdGlvbiBzYWZlX2FkZCh4LCB5KVxyXG57XHJcbiAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKTtcclxuICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XHJcbiAgcmV0dXJuIChtc3cgPDwgMTYpIHwgKGxzdyAmIDB4RkZGRik7XHJcbn1cclxuXHJcbi8qXHJcbiAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cclxuICovXHJcbmZ1bmN0aW9uIGJpdF9yb2wobnVtLCBjbnQpXHJcbntcclxuICByZXR1cm4gKG51bSA8PCBjbnQpIHwgKG51bSA+Pj4gKDMyIC0gY250KSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWQ1KGJ1Zikge1xyXG4gIHJldHVybiBoZWxwZXJzLmhhc2goYnVmLCBjb3JlX21kNSwgMTYpO1xyXG59O1xyXG4iLCIvLyBPcmlnaW5hbCBjb2RlIGFkYXB0ZWQgZnJvbSBSb2JlcnQgS2llZmZlci5cbi8vIGRldGFpbHMgYXQgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWRcbihmdW5jdGlvbigpIHtcbiAgdmFyIF9nbG9iYWwgPSB0aGlzO1xuXG4gIHZhciBtYXRoUk5HLCB3aGF0d2dSTkc7XG5cbiAgLy8gTk9URTogTWF0aC5yYW5kb20oKSBkb2VzIG5vdCBndWFyYW50ZWUgXCJjcnlwdG9ncmFwaGljIHF1YWxpdHlcIlxuICBtYXRoUk5HID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgIHZhciBieXRlcyA9IG5ldyBBcnJheShzaXplKTtcbiAgICB2YXIgcjtcblxuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgYnl0ZXNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ5dGVzO1xuICB9XG5cbiAgaWYgKF9nbG9iYWwuY3J5cHRvICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICB3aGF0d2dSTkcgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgICB2YXIgYnl0ZXMgPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYnl0ZXMpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH1cbiAgfVxuXG4gIG1vZHVsZS5leHBvcnRzID0gd2hhdHdnUk5HIHx8IG1hdGhSTkc7XG5cbn0oKSlcbiIsIi8qXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFNlY3VyZSBIYXNoIEFsZ29yaXRobSwgU0hBLTEsIGFzIGRlZmluZWRcbiAqIGluIEZJUFMgUFVCIDE4MC0xXG4gKiBWZXJzaW9uIDIuMWEgQ29weXJpZ2h0IFBhdWwgSm9obnN0b24gMjAwMCAtIDIwMDIuXG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBkZXRhaWxzLlxuICovXG5cbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbi8qXG4gKiBDYWxjdWxhdGUgdGhlIFNIQS0xIG9mIGFuIGFycmF5IG9mIGJpZy1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGhcbiAqL1xuZnVuY3Rpb24gY29yZV9zaGExKHgsIGxlbilcbntcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBsZW4gJSAzMik7XG4gIHhbKChsZW4gKyA2NCA+PiA5KSA8PCA0KSArIDE1XSA9IGxlbjtcblxuICB2YXIgdyA9IEFycmF5KDgwKTtcbiAgdmFyIGEgPSAgMTczMjU4NDE5MztcbiAgdmFyIGIgPSAtMjcxNzMzODc5O1xuICB2YXIgYyA9IC0xNzMyNTg0MTk0O1xuICB2YXIgZCA9ICAyNzE3MzM4Nzg7XG4gIHZhciBlID0gLTEwMDk1ODk3NzY7XG5cbiAgZm9yKHZhciBpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KVxuICB7XG4gICAgdmFyIG9sZGEgPSBhO1xuICAgIHZhciBvbGRiID0gYjtcbiAgICB2YXIgb2xkYyA9IGM7XG4gICAgdmFyIG9sZGQgPSBkO1xuICAgIHZhciBvbGRlID0gZTtcblxuICAgIGZvcih2YXIgaiA9IDA7IGogPCA4MDsgaisrKVxuICAgIHtcbiAgICAgIGlmKGogPCAxNikgd1tqXSA9IHhbaSArIGpdO1xuICAgICAgZWxzZSB3W2pdID0gcm9sKHdbai0zXSBeIHdbai04XSBeIHdbai0xNF0gXiB3W2otMTZdLCAxKTtcbiAgICAgIHZhciB0ID0gc2FmZV9hZGQoc2FmZV9hZGQocm9sKGEsIDUpLCBzaGExX2Z0KGosIGIsIGMsIGQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgc2FmZV9hZGQoc2FmZV9hZGQoZSwgd1tqXSksIHNoYTFfa3QoaikpKTtcbiAgICAgIGUgPSBkO1xuICAgICAgZCA9IGM7XG4gICAgICBjID0gcm9sKGIsIDMwKTtcbiAgICAgIGIgPSBhO1xuICAgICAgYSA9IHQ7XG4gICAgfVxuXG4gICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xuICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKTtcbiAgICBjID0gc2FmZV9hZGQoYywgb2xkYyk7XG4gICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xuICAgIGUgPSBzYWZlX2FkZChlLCBvbGRlKTtcbiAgfVxuICByZXR1cm4gQXJyYXkoYSwgYiwgYywgZCwgZSk7XG5cbn1cblxuLypcbiAqIFBlcmZvcm0gdGhlIGFwcHJvcHJpYXRlIHRyaXBsZXQgY29tYmluYXRpb24gZnVuY3Rpb24gZm9yIHRoZSBjdXJyZW50XG4gKiBpdGVyYXRpb25cbiAqL1xuZnVuY3Rpb24gc2hhMV9mdCh0LCBiLCBjLCBkKVxue1xuICBpZih0IDwgMjApIHJldHVybiAoYiAmIGMpIHwgKCh+YikgJiBkKTtcbiAgaWYodCA8IDQwKSByZXR1cm4gYiBeIGMgXiBkO1xuICBpZih0IDwgNjApIHJldHVybiAoYiAmIGMpIHwgKGIgJiBkKSB8IChjICYgZCk7XG4gIHJldHVybiBiIF4gYyBeIGQ7XG59XG5cbi8qXG4gKiBEZXRlcm1pbmUgdGhlIGFwcHJvcHJpYXRlIGFkZGl0aXZlIGNvbnN0YW50IGZvciB0aGUgY3VycmVudCBpdGVyYXRpb25cbiAqL1xuZnVuY3Rpb24gc2hhMV9rdCh0KVxue1xuICByZXR1cm4gKHQgPCAyMCkgPyAgMTUxODUwMDI0OSA6ICh0IDwgNDApID8gIDE4NTk3NzUzOTMgOlxuICAgICAgICAgKHQgPCA2MCkgPyAtMTg5NDAwNzU4OCA6IC04OTk0OTc1MTQ7XG59XG5cbi8qXG4gKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICovXG5mdW5jdGlvbiBzYWZlX2FkZCh4LCB5KVxue1xuICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpO1xuICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xufVxuXG4vKlxuICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICovXG5mdW5jdGlvbiByb2wobnVtLCBjbnQpXG57XG4gIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGExKGJ1Zikge1xuICByZXR1cm4gaGVscGVycy5oYXNoKGJ1ZiwgY29yZV9zaGExLCAyMCwgdHJ1ZSk7XG59O1xuIiwiXG4vKipcbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgU2VjdXJlIEhhc2ggQWxnb3JpdGhtLCBTSEEtMjU2LCBhcyBkZWZpbmVkXG4gKiBpbiBGSVBTIDE4MC0yXG4gKiBWZXJzaW9uIDIuMi1iZXRhIENvcHlyaWdodCBBbmdlbCBNYXJpbiwgUGF1bCBKb2huc3RvbiAyMDAwIC0gMjAwOS5cbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqXG4gKi9cblxudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcblxudmFyIHNhZmVfYWRkID0gZnVuY3Rpb24oeCwgeSkge1xuICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpO1xuICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xufTtcblxudmFyIFMgPSBmdW5jdGlvbihYLCBuKSB7XG4gIHJldHVybiAoWCA+Pj4gbikgfCAoWCA8PCAoMzIgLSBuKSk7XG59O1xuXG52YXIgUiA9IGZ1bmN0aW9uKFgsIG4pIHtcbiAgcmV0dXJuIChYID4+PiBuKTtcbn07XG5cbnZhciBDaCA9IGZ1bmN0aW9uKHgsIHksIHopIHtcbiAgcmV0dXJuICgoeCAmIHkpIF4gKCh+eCkgJiB6KSk7XG59O1xuXG52YXIgTWFqID0gZnVuY3Rpb24oeCwgeSwgeikge1xuICByZXR1cm4gKCh4ICYgeSkgXiAoeCAmIHopIF4gKHkgJiB6KSk7XG59O1xuXG52YXIgU2lnbWEwMjU2ID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4gKFMoeCwgMikgXiBTKHgsIDEzKSBeIFMoeCwgMjIpKTtcbn07XG5cbnZhciBTaWdtYTEyNTYgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiAoUyh4LCA2KSBeIFMoeCwgMTEpIF4gUyh4LCAyNSkpO1xufTtcblxudmFyIEdhbW1hMDI1NiA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIChTKHgsIDcpIF4gUyh4LCAxOCkgXiBSKHgsIDMpKTtcbn07XG5cbnZhciBHYW1tYTEyNTYgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiAoUyh4LCAxNykgXiBTKHgsIDE5KSBeIFIoeCwgMTApKTtcbn07XG5cbnZhciBjb3JlX3NoYTI1NiA9IGZ1bmN0aW9uKG0sIGwpIHtcbiAgdmFyIEsgPSBuZXcgQXJyYXkoMHg0MjhBMkY5OCwweDcxMzc0NDkxLDB4QjVDMEZCQ0YsMHhFOUI1REJBNSwweDM5NTZDMjVCLDB4NTlGMTExRjEsMHg5MjNGODJBNCwweEFCMUM1RUQ1LDB4RDgwN0FBOTgsMHgxMjgzNUIwMSwweDI0MzE4NUJFLDB4NTUwQzdEQzMsMHg3MkJFNUQ3NCwweDgwREVCMUZFLDB4OUJEQzA2QTcsMHhDMTlCRjE3NCwweEU0OUI2OUMxLDB4RUZCRTQ3ODYsMHhGQzE5REM2LDB4MjQwQ0ExQ0MsMHgyREU5MkM2RiwweDRBNzQ4NEFBLDB4NUNCMEE5REMsMHg3NkY5ODhEQSwweDk4M0U1MTUyLDB4QTgzMUM2NkQsMHhCMDAzMjdDOCwweEJGNTk3RkM3LDB4QzZFMDBCRjMsMHhENUE3OTE0NywweDZDQTYzNTEsMHgxNDI5Mjk2NywweDI3QjcwQTg1LDB4MkUxQjIxMzgsMHg0RDJDNkRGQywweDUzMzgwRDEzLDB4NjUwQTczNTQsMHg3NjZBMEFCQiwweDgxQzJDOTJFLDB4OTI3MjJDODUsMHhBMkJGRThBMSwweEE4MUE2NjRCLDB4QzI0QjhCNzAsMHhDNzZDNTFBMywweEQxOTJFODE5LDB4RDY5OTA2MjQsMHhGNDBFMzU4NSwweDEwNkFBMDcwLDB4MTlBNEMxMTYsMHgxRTM3NkMwOCwweDI3NDg3NzRDLDB4MzRCMEJDQjUsMHgzOTFDMENCMywweDRFRDhBQTRBLDB4NUI5Q0NBNEYsMHg2ODJFNkZGMywweDc0OEY4MkVFLDB4NzhBNTYzNkYsMHg4NEM4NzgxNCwweDhDQzcwMjA4LDB4OTBCRUZGRkEsMHhBNDUwNkNFQiwweEJFRjlBM0Y3LDB4QzY3MTc4RjIpO1xuICB2YXIgSEFTSCA9IG5ldyBBcnJheSgweDZBMDlFNjY3LCAweEJCNjdBRTg1LCAweDNDNkVGMzcyLCAweEE1NEZGNTNBLCAweDUxMEU1MjdGLCAweDlCMDU2ODhDLCAweDFGODNEOUFCLCAweDVCRTBDRDE5KTtcbiAgICB2YXIgVyA9IG5ldyBBcnJheSg2NCk7XG4gICAgdmFyIGEsIGIsIGMsIGQsIGUsIGYsIGcsIGgsIGksIGo7XG4gICAgdmFyIFQxLCBUMjtcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgbVtsID4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbCAlIDMyKTtcbiAgbVsoKGwgKyA2NCA+PiA5KSA8PCA0KSArIDE1XSA9IGw7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICBhID0gSEFTSFswXTsgYiA9IEhBU0hbMV07IGMgPSBIQVNIWzJdOyBkID0gSEFTSFszXTsgZSA9IEhBU0hbNF07IGYgPSBIQVNIWzVdOyBnID0gSEFTSFs2XTsgaCA9IEhBU0hbN107XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCA2NDsgaisrKSB7XG4gICAgICBpZiAoaiA8IDE2KSB7XG4gICAgICAgIFdbal0gPSBtW2ogKyBpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFdbal0gPSBzYWZlX2FkZChzYWZlX2FkZChzYWZlX2FkZChHYW1tYTEyNTYoV1tqIC0gMl0pLCBXW2ogLSA3XSksIEdhbW1hMDI1NihXW2ogLSAxNV0pKSwgV1tqIC0gMTZdKTtcbiAgICAgIH1cbiAgICAgIFQxID0gc2FmZV9hZGQoc2FmZV9hZGQoc2FmZV9hZGQoc2FmZV9hZGQoaCwgU2lnbWExMjU2KGUpKSwgQ2goZSwgZiwgZykpLCBLW2pdKSwgV1tqXSk7XG4gICAgICBUMiA9IHNhZmVfYWRkKFNpZ21hMDI1NihhKSwgTWFqKGEsIGIsIGMpKTtcbiAgICAgIGggPSBnOyBnID0gZjsgZiA9IGU7IGUgPSBzYWZlX2FkZChkLCBUMSk7IGQgPSBjOyBjID0gYjsgYiA9IGE7IGEgPSBzYWZlX2FkZChUMSwgVDIpO1xuICAgIH1cbiAgICBIQVNIWzBdID0gc2FmZV9hZGQoYSwgSEFTSFswXSk7IEhBU0hbMV0gPSBzYWZlX2FkZChiLCBIQVNIWzFdKTsgSEFTSFsyXSA9IHNhZmVfYWRkKGMsIEhBU0hbMl0pOyBIQVNIWzNdID0gc2FmZV9hZGQoZCwgSEFTSFszXSk7XG4gICAgSEFTSFs0XSA9IHNhZmVfYWRkKGUsIEhBU0hbNF0pOyBIQVNIWzVdID0gc2FmZV9hZGQoZiwgSEFTSFs1XSk7IEhBU0hbNl0gPSBzYWZlX2FkZChnLCBIQVNIWzZdKTsgSEFTSFs3XSA9IHNhZmVfYWRkKGgsIEhBU0hbN10pO1xuICB9XG4gIHJldHVybiBIQVNIO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGEyNTYoYnVmKSB7XG4gIHJldHVybiBoZWxwZXJzLmhhc2goYnVmLCBjb3JlX3NoYTI1NiwgMzIsIHRydWUpO1xufTtcbiIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgfVxufVxuIiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cblxudmFyIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5mdW5jdGlvbiBuZXh0KCkge1xuICByZXR1cm4gXCJAQHN5bWJvbDpcIiArIGNyeXB0by5yYW5kb21CeXRlcyg4KS50b1N0cmluZygnaGV4Jyk7XG59XG5cblxuZnVuY3Rpb24gU3ltYm9sKGRlc2MpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFN5bWJvbCkpIHtcbiAgICByZXR1cm4gbmV3IFN5bWJvbChkZXNjKTtcbiAgfVxuICB2YXIgX3N5bWJvbCA9IHRoaXMuX3N5bWJvbCA9IG5leHQoKTtcbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ19kZXNjJywge1xuICAgIHZhbHVlOiBkZXNjLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gIH0pO1xuICBkZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCBfc3ltYm9sLCB7XG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGhpcywgX3N5bWJvbCwge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gdGhpcy5fc3ltYm9sO1xufTtcblxudmFyIGdsb2JhbFN5bWJvbFJlZ2lzdHJ5ID0ge307XG5TeW1ib2wuZm9yID0gZnVuY3Rpb24gc3ltYm9sRm9yKGtleSkge1xuICBrZXkgPSBTdHJpbmcoa2V5KTtcbiAgcmV0dXJuIGdsb2JhbFN5bWJvbFJlZ2lzdHJ5W2tleV0gfHwgKGdsb2JhbFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSBTeW1ib2woa2V5KSk7XG59O1xuXG5TeW1ib2wua2V5Rm9yID0gZnVuY3Rpb24ga2V5Rm9yKHN5bSkge1xuICBpZiAoIShzeW0gaW5zdGFuY2VvZiBTeW1ib2wpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5rZXlGb3IgcmVxdWlyZXMgYSBTeW1ib2wgYXJndW1lbnRcIik7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIGdsb2JhbFN5bWJvbFJlZ2lzdHJ5KSB7XG4gICAgaWYgKGdsb2JhbFN5bWJvbFJlZ2lzdHJ5W2tleV0gPT09IHN5bSkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdGhpcy5TeW1ib2wgfHwgU3ltYm9sO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kO1xuZnVuY3Rpb24gZXh0ZW5kKG9yaWdpbiwgYWRkKSB7XG4gIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIGFkZCBpc24ndCBhbiBvYmplY3RcbiAgaWYgKCFhZGQgfHwgdHlwZW9mIGFkZCAhPT0gJ29iamVjdCcpIHJldHVybiBvcmlnaW47XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhZGQpO1xuICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgb3JpZ2luW2tleXNbaV1dID0gYWRkW2tleXNbaV1dO1xuICB9XG4gIHJldHVybiBvcmlnaW47XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgR3JhbW1hckRlY2wgPSByZXF1aXJlKCcuL0dyYW1tYXJEZWNsLmpzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMuanMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIEJ1aWxkZXIoKSB7fVxuXG5CdWlsZGVyLnByb3RvdHlwZSA9IHtcbiAgbmV3R3JhbW1hcjogZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBuZXcgR3JhbW1hckRlY2wobmFtZSk7XG4gIH0sXG5cbiAgYW55dGhpbmc6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBwZXhwcnMuYW55dGhpbmc7XG4gIH0sXG5cbiAgZW5kOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcGV4cHJzLmVuZDtcbiAgfSxcblxuICBwcmltOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHBleHBycy5tYWtlUHJpbSh4KTtcbiAgfSxcblxuICBhbHQ6IGZ1bmN0aW9uKC8qIHRlcm0xLCB0ZXJtMSwgLi4uICovKSB7XG4gICAgdmFyIHRlcm1zID0gW107XG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaWR4XTtcbiAgICAgIGlmIChhcmcgaW5zdGFuY2VvZiBwZXhwcnMuQWx0KSB7XG4gICAgICAgIHRlcm1zID0gdGVybXMuY29uY2F0KGFyZy50ZXJtcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXJtcy5wdXNoKGFyZyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0ZXJtcy5sZW5ndGggPT09IDEgPyB0ZXJtc1swXSA6IG5ldyBwZXhwcnMuQWx0KHRlcm1zKTtcbiAgfSxcblxuICBzZXE6IGZ1bmN0aW9uKC8qIGZhY3RvcjEsIGZhY3RvcjIsIC4uLiAqLykge1xuICAgIHZhciBmYWN0b3JzID0gW107XG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaWR4XTtcbiAgICAgIGlmIChhcmcgaW5zdGFuY2VvZiBwZXhwcnMuU2VxKSB7XG4gICAgICAgIGZhY3RvcnMgPSBmYWN0b3JzLmNvbmNhdChhcmcuZmFjdG9ycyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYWN0b3JzLnB1c2goYXJnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhY3RvcnMubGVuZ3RoID09PSAxID8gZmFjdG9yc1swXSA6IG5ldyBwZXhwcnMuU2VxKGZhY3RvcnMpO1xuICB9LFxuXG4gIG1hbnk6IGZ1bmN0aW9uKGV4cHIsIG1pbk51bU1hdGNoZXMpIHtcbiAgICByZXR1cm4gbmV3IHBleHBycy5NYW55KGV4cHIsIG1pbk51bU1hdGNoZXMpO1xuICB9LFxuXG4gIG9wdDogZnVuY3Rpb24oZXhwcikge1xuICAgIHJldHVybiBuZXcgcGV4cHJzLk9wdChleHByKTtcbiAgfSxcblxuICBub3Q6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICByZXR1cm4gbmV3IHBleHBycy5Ob3QoZXhwcik7XG4gIH0sXG5cbiAgbGE6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICByZXR1cm4gbmV3IHBleHBycy5Mb29rYWhlYWQoZXhwcik7XG4gIH0sXG5cbiAgYXJyOiBmdW5jdGlvbihleHByKSB7XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuQXJyKGV4cHIpO1xuICB9LFxuXG4gIHN0cjogZnVuY3Rpb24oZXhwcikge1xuICAgIHJldHVybiBuZXcgcGV4cHJzLlN0cihleHByKTtcbiAgfSxcblxuICBvYmo6IGZ1bmN0aW9uKHByb3BlcnRpZXMsIGlzTGVuaWVudCkge1xuICAgIHJldHVybiBuZXcgcGV4cHJzLk9iaihwcm9wZXJ0aWVzLCAhIWlzTGVuaWVudCk7XG4gIH0sXG5cbiAgYXBwOiBmdW5jdGlvbihydWxlTmFtZSkge1xuICAgIHJldHVybiBuZXcgcGV4cHJzLkFwcGx5KHJ1bGVOYW1lKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gQnVpbGRlcjtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIElucHV0U3RyZWFtID0gcmVxdWlyZSgnLi9JbnB1dFN0cmVhbS5qcycpO1xudmFyIEludGVydmFsID0gcmVxdWlyZSgnLi9JbnRlcnZhbC5qcycpO1xudmFyIE5vZGUgPSByZXF1aXJlKCcuL05vZGUuanMnKTtcbnZhciBTdGF0ZSA9IHJlcXVpcmUoJy4vU3RhdGUuanMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzLmpzJyk7XG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycy5qcycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzLmpzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBHcmFtbWFyKG5hbWUsIHN1cGVyR3JhbW1hciwgcnVsZURpY3QpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5zdXBlckdyYW1tYXIgPSBzdXBlckdyYW1tYXI7XG4gIHRoaXMucnVsZURpY3QgPSBydWxlRGljdDtcbiAgdGhpcy5jb25zdHJ1Y3RvcnMgPSB0aGlzLmN0b3JzID0gdGhpcy5jcmVhdGVDb25zdHJ1Y3RvcnMoKTtcbn1cblxuR3JhbW1hci5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdDogZnVuY3Rpb24ocnVsZU5hbWUsIGNoaWxkcmVuKSB7XG4gICAgdmFyIGJvZHkgPSB0aGlzLnJ1bGVEaWN0W3J1bGVOYW1lXTtcbiAgICBpZiAoIWJvZHkgfHwgIWJvZHkuY2hlY2sodGhpcywgY2hpbGRyZW4pIHx8IGNoaWxkcmVuLmxlbmd0aCAhPT0gYm9keS5nZXRBcml0eSgpKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLkludmFsaWRDb25zdHJ1Y3RvckNhbGwodGhpcywgcnVsZU5hbWUsIGNoaWxkcmVuKTtcbiAgICB9XG4gICAgdmFyIGludGVydmFsID0gbmV3IEludGVydmFsKElucHV0U3RyZWFtLm5ld0ZvcihjaGlsZHJlbiksIDAsIGNoaWxkcmVuLmxlbmd0aCk7XG4gICAgcmV0dXJuIG5ldyBOb2RlKHRoaXMsIHJ1bGVOYW1lLCBjaGlsZHJlbiwgaW50ZXJ2YWwpO1xuICB9LFxuXG4gIGNyZWF0ZUNvbnN0cnVjdG9yczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjb25zdHJ1Y3RvcnMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIG1ha2VDb25zdHJ1Y3RvcihydWxlTmFtZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKC8qIHZhbDEsIHZhbDIsIC4uLiAqLykge1xuICAgICAgICByZXR1cm4gc2VsZi5jb25zdHJ1Y3QocnVsZU5hbWUsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBydWxlTmFtZSBpbiB0aGlzLnJ1bGVEaWN0KSB7XG4gICAgICAvLyBXZSB3YW50ICphbGwqIHByb3BlcnRpZXMsIG5vdCBqdXN0IG93biBwcm9wZXJ0aWVzLCBiZWNhdXNlIG9mXG4gICAgICAvLyBzdXBlcmdyYW1tYXJzLlxuICAgICAgY29uc3RydWN0b3JzW3J1bGVOYW1lXSA9IG1ha2VDb25zdHJ1Y3RvcihydWxlTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBjb25zdHJ1Y3RvcnM7XG4gIH0sXG5cbiAgbWF0Y2g6IGZ1bmN0aW9uKG9iaiwgc3RhcnRSdWxlLCBvcHRUaHJvd09uRmFpbCkge1xuICAgIHZhciB0aHJvd09uRmFpbCA9ICEhb3B0VGhyb3dPbkZhaWw7XG4gICAgaWYgKCFzdGFydFJ1bGUpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInc3RhcnRSdWxlJyBhcmd1bWVudCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWRcIik7XG4gICAgfVxuICAgIHZhciBzdGF0ZSA9IHRoaXMuX21hdGNoKG9iaiwgc3RhcnRSdWxlLCBmYWxzZSk7XG4gICAgdmFyIHN1Y2NlZWRlZCA9IHN0YXRlLmJpbmRpbmdzLmxlbmd0aCA9PT0gMTtcbiAgICBpZiAoc3VjY2VlZGVkKSB7XG4gICAgICByZXR1cm4gc3RhdGUuYmluZGluZ3NbMF07ICAvLyBSZXR1cm4gdGhlIHJvb3QgQ1NUTm9kZS5cbiAgICB9IGVsc2UgaWYgKHRocm93T25GYWlsKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLk1hdGNoRmFpbHVyZShzdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sXG5cbiAgX21hdGNoOiBmdW5jdGlvbihvYmosIHN0YXJ0UnVsZSwgdHJhY2luZ0VuYWJsZWQpIHtcbiAgICB2YXIgaW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5uZXdGb3IodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgPyBvYmogOiBbb2JqXSk7XG4gICAgdmFyIHN0YXRlID0gbmV3IFN0YXRlKHRoaXMsIGlucHV0U3RyZWFtLCBzdGFydFJ1bGUsIHRyYWNpbmdFbmFibGVkKTtcbiAgICB2YXIgc3VjY2VlZGVkID0gbmV3IHBleHBycy5BcHBseShzdGFydFJ1bGUpLmV2YWwoc3RhdGUpO1xuICAgIGlmIChzdWNjZWVkZWQpIHtcbiAgICAgIC8vIExpbmsgZXZlcnkgQ1NUTm9kZSB0byBpdHMgcGFyZW50LlxuICAgICAgdmFyIG5vZGUgPSBzdGF0ZS5iaW5kaW5nc1swXTtcbiAgICAgIHZhciBzdGFjayA9IFt1bmRlZmluZWRdO1xuICAgICAgdmFyIHNldFBhcmVudHMgPSB0aGlzLnNlbWFudGljQWN0aW9uKHtcbiAgICAgICAgX3Rlcm1pbmFsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLnBhcmVudCA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICB9LFxuICAgICAgICBfZGVmYXVsdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3RhY2sucHVzaCh0aGlzKTtcbiAgICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHsgc2V0UGFyZW50cyhjaGlsZCk7IH0pO1xuICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgIHRoaXMucGFyZW50ID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc2V0UGFyZW50cyhub2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9LFxuXG4gIHRyYWNlOiBmdW5jdGlvbihvYmosIHN0YXJ0UnVsZSkge1xuICAgIHJldHVybiB0aGlzLl9tYXRjaChvYmosIHN0YXJ0UnVsZSwgdHJ1ZSk7XG4gIH0sXG5cbiAgc2VtYW50aWNBY3Rpb246IGZ1bmN0aW9uKGFjdGlvbkRpY3QpIHtcbiAgICB0aGlzLmFzc2VydFRvcERvd25BY3Rpb25OYW1lc0FuZEFyaXRpZXNNYXRjaChhY3Rpb25EaWN0LCAnc2VtYW50aWMgYWN0aW9uJyk7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZXMubWFrZVNlbWFudGljQWN0aW9uKHRoaXMsIGFjdGlvbkRpY3QpO1xuICB9LFxuXG4gIHN5bnRoZXNpemVkQXR0cmlidXRlOiBmdW5jdGlvbihhY3Rpb25EaWN0KSB7XG4gICAgdGhpcy5hc3NlcnRUb3BEb3duQWN0aW9uTmFtZXNBbmRBcml0aWVzTWF0Y2goYWN0aW9uRGljdCwgJ3N5bnRoZXNpemVkIGF0dHJpYnV0ZScpO1xuICAgIHJldHVybiBhdHRyaWJ1dGVzLm1ha2VTeW50aGVzaXplZEF0dHJpYnV0ZSh0aGlzLCBhY3Rpb25EaWN0KTtcbiAgfSxcblxuICBpbmhlcml0ZWRBdHRyaWJ1dGU6IGZ1bmN0aW9uKGFjdGlvbkRpY3QpIHtcbiAgICAvLyBUT0RPOiB3cml0ZSBhbiBhcml0eS1jaGVja2VyIGZvciBpbmhlcml0ZWQgYXR0cmlidXRlcy5cbiAgICAvLyBBbGwgb2YgdGhlIG1ldGhvZHMgc2hvdWxkIGhhdmUgYXJpdHkgMSwgZXhjZXB0IGZvciBfZGVmYXVsdCwgd2hpY2ggaGFzXG4gICAgLy8gYXJpdHkgMiBiL2MgaXQgYWxzbyB0YWtlcyBhbiBpbmRleC5cbiAgICBpZiAoIWFjdGlvbkRpY3QuX2Jhc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW5oZXJpdGVkIGF0dHJpYnV0ZSBtaXNzaW5nIGJhc2UgY2FzZScpO1xuICAgIH0gZWxzZSBpZiAoYWN0aW9uRGljdC5fYmFzZS5sZW5ndGggIT09IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImluaGVyaXRlZCBhdHRyaWJ1dGUncyBiYXNlIGNhc2UgbXVzdCB0YWtlIGV4YWN0bHkgb25lIGFyZ3VtZW50XCIpO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cmlidXRlcy5tYWtlSW5oZXJpdGVkQXR0cmlidXRlKHRoaXMsIGFjdGlvbkRpY3QpO1xuICB9LFxuXG4gIGFzc2VydFRvcERvd25BY3Rpb25OYW1lc0FuZEFyaXRpZXNNYXRjaDogZnVuY3Rpb24oYWN0aW9uRGljdCwgd2hhdCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcnVsZURpY3QgPSB0aGlzLnJ1bGVEaWN0O1xuICAgIHZhciBvayA9IHRydWU7XG4gICAgT2JqZWN0LmtleXMocnVsZURpY3QpLmZvckVhY2goZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgICAgIGlmIChhY3Rpb25EaWN0W3J1bGVOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBhY3R1YWwgPSBhY3Rpb25EaWN0W3J1bGVOYW1lXS5sZW5ndGg7XG4gICAgICB2YXIgZXhwZWN0ZWQgPSBzZWxmLnRvcERvd25BY3Rpb25Bcml0eShydWxlTmFtZSk7XG4gICAgICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZCkge1xuICAgICAgICBvayA9IGZhbHNlO1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gICAgICAgIGNvbnNvbGUubG9nKHdoYXQgKyAnIGZvciBydWxlJywgcnVsZU5hbWUsICdoYXMgdGhlIHdyb25nIGFyaXR5Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCcgIGV4cGVjdGVkJywgZXhwZWN0ZWQpO1xuICAgICAgICBjb25zb2xlLmxvZygnICAgIGFjdHVhbCcsIGFjdHVhbCk7XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghb2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ29uZSBvciBtb3JlIHNlbWFudGljIGFjdGlvbnMgaGF2ZSB0aGUgd3JvbmcgYXJpdHkgLS0gc2VlIGNvbnNvbGUgZm9yIGRldGFpbHMnXG4gICAgICApO1xuICAgIH1cbiAgfSxcblxuICB0b3BEb3duQWN0aW9uQXJpdHk6IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gICAgaWYgKHRoaXMuc3VwZXJHcmFtbWFyICYmIHRoaXMuc3VwZXJHcmFtbWFyLnJ1bGVEaWN0W3J1bGVOYW1lXSkge1xuICAgICAgcmV0dXJuIHRoaXMuc3VwZXJHcmFtbWFyLnRvcERvd25BY3Rpb25Bcml0eShydWxlTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBib2R5ID0gdGhpcy5ydWxlRGljdFtydWxlTmFtZV07XG4gICAgICByZXR1cm4gYm9keS5nZXRBcml0eSgpO1xuICAgIH1cbiAgfSxcblxuICB0b1JlY2lwZTogZnVuY3Rpb24ob3B0VmFyTmFtZSkge1xuICAgIHZhciBzYiA9IG5ldyBjb21tb24uU3RyaW5nQnVmZmVyKCk7XG4gICAgaWYgKG9wdFZhck5hbWUpIHtcbiAgICAgIHNiLmFwcGVuZCgndmFyICcgKyBvcHRWYXJOYW1lICsgJyA9ICcpO1xuICAgIH1cbiAgICBzYi5hcHBlbmQoJyhmdW5jdGlvbigpIHtcXG4nKTtcblxuICAgIHZhciBzdXBlckdyYW1tYXJEZWNsID0gJyc7XG4gICAgaWYgKHRoaXMuc3VwZXJHcmFtbWFyICYmIHRoaXMuc3VwZXJHcmFtbWFyICE9PSBHcmFtbWFyLmJhc2UpIHtcbiAgICAgIHNiLmFwcGVuZCh0aGlzLnN1cGVyR3JhbW1hci50b1JlY2lwZSgnYnVpbGRTdXBlckdyYW1tYXInKSk7XG4gICAgICBzdXBlckdyYW1tYXJEZWNsID0gJyAgICAud2l0aFN1cGVyR3JhbW1hcihidWlsZFN1cGVyR3JhbW1hci5jYWxsKHRoaXMpKVxcbic7XG4gICAgfVxuICAgIHNiLmFwcGVuZCgnICByZXR1cm4gbmV3IHRoaXMubmV3R3JhbW1hcignICsgY29tbW9uLnRvU3RyaW5nTGl0ZXJhbCh0aGlzLm5hbWUpICsgJylcXG4nKTtcbiAgICBzYi5hcHBlbmQoc3VwZXJHcmFtbWFyRGVjbCk7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgT2JqZWN0LmtleXModGhpcy5ydWxlRGljdCkuZm9yRWFjaChmdW5jdGlvbihydWxlTmFtZSkge1xuICAgICAgdmFyIGJvZHkgPSBzZWxmLnJ1bGVEaWN0W3J1bGVOYW1lXTtcbiAgICAgIHNiLmFwcGVuZCgnICAgIC4nKTtcbiAgICAgIGlmIChzZWxmLnN1cGVyR3JhbW1hciAmJiBzZWxmLnN1cGVyR3JhbW1hci5ydWxlRGljdFtydWxlTmFtZV0pIHtcbiAgICAgICAgc2IuYXBwZW5kKGJvZHkgaW5zdGFuY2VvZiBwZXhwcnMuRXh0ZW5kID8gJ2V4dGVuZCcgOiAnb3ZlcnJpZGUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNiLmFwcGVuZCgnZGVmaW5lJyk7XG4gICAgICB9XG4gICAgICBzYi5hcHBlbmQoJygnICsgY29tbW9uLnRvU3RyaW5nTGl0ZXJhbChydWxlTmFtZSkgKyAnLCAnKTtcbiAgICAgIGJvZHkub3V0cHV0UmVjaXBlKHNiKTtcbiAgICAgIHNiLmFwcGVuZCgnKVxcbicpO1xuICAgIH0pO1xuICAgIHNiLmFwcGVuZCgnICAgIC5idWlsZCgpO1xcbn0pO1xcbicpO1xuICAgIHJldHVybiBzYi5jb250ZW50cygpO1xuICB9LFxuXG4gIC8vIFRPRE86IG1ha2Ugc3VyZSB0aGlzIGlzIHN0aWxsIGNvcnJlY3QuXG4gIC8vIFRPRE86IHRoZSBhbmFsb2cgb2YgdGhpcyBtZXRob2QgZm9yIGluaGVyaXRlZCBhdHRyaWJ1dGVzLlxuICB0b1NlbWFudGljQWN0aW9uVGVtcGxhdGU6IGZ1bmN0aW9uKC8qIGVudHJ5UG9pbnQxLCBlbnRyeVBvaW50MiwgLi4uICovKSB7XG4gICAgdmFyIGVudHJ5UG9pbnRzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHMgOiBPYmplY3Qua2V5cyh0aGlzLnJ1bGVEaWN0KTtcbiAgICB2YXIgcnVsZXNUb0JlSW5jbHVkZWQgPSB0aGlzLnJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbihlbnRyeVBvaW50cyk7XG5cbiAgICAvLyBUT0RPOiBhZGQgdGhlIHN1cGVyLWdyYW1tYXIncyB0ZW1wbGF0ZXMgYXQgdGhlIHJpZ2h0IHBsYWNlLCBlLmcuLCBhIGNhc2UgZm9yIEFkZEV4cHJfcGx1c1xuICAgIC8vIHNob3VsZCBhcHBlYXIgbmV4dCB0byBvdGhlciBjYXNlcyBvZiBBZGRFeHByLlxuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBzYiA9IG5ldyBjb21tb24uU3RyaW5nQnVmZmVyKCk7XG4gICAgc2IuYXBwZW5kKCd7Jyk7XG5cbiAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgIGZvciAodmFyIHJ1bGVOYW1lIGluIHJ1bGVzVG9CZUluY2x1ZGVkKSB7XG4gICAgICB2YXIgYm9keSA9IHRoaXMucnVsZURpY3RbcnVsZU5hbWVdO1xuICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzYi5hcHBlbmQoJywnKTtcbiAgICAgIH1cbiAgICAgIHNiLmFwcGVuZCgnXFxuJyk7XG4gICAgICBzYi5hcHBlbmQoJyAgJyk7XG4gICAgICBzZWxmLmFkZFNlbWFudGljQWN0aW9uVGVtcGxhdGUocnVsZU5hbWUsIGJvZHksIHNiKTtcbiAgICB9XG5cbiAgICBzYi5hcHBlbmQoJ1xcbn0nKTtcbiAgICByZXR1cm4gc2IuY29udGVudHMoKTtcbiAgfSxcblxuICBhZGRTZW1hbnRpY0FjdGlvblRlbXBsYXRlOiBmdW5jdGlvbihydWxlTmFtZSwgYm9keSwgc2IpIHtcbiAgICBzYi5hcHBlbmQocnVsZU5hbWUpO1xuICAgIHNiLmFwcGVuZCgnOiBmdW5jdGlvbignKTtcbiAgICB2YXIgYXJpdHkgPSB0aGlzLnRvcERvd25BY3Rpb25Bcml0eShydWxlTmFtZSk7XG4gICAgc2IuYXBwZW5kKGNvbW1vbi5yZXBlYXQoJ18nLCBhcml0eSkuam9pbignLCAnKSk7XG4gICAgc2IuYXBwZW5kKCcpIHtcXG4nKTtcbiAgICBzYi5hcHBlbmQoJyAgfScpO1xuICB9LFxuXG4gIHJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbjogZnVuY3Rpb24oZW50cnlQb2ludHMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgZnVuY3Rpb24gZ2V0Qm9keShydWxlTmFtZSkge1xuICAgICAgaWYgKHNlbGYucnVsZURpY3RbcnVsZU5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5VbmRlY2xhcmVkUnVsZShydWxlTmFtZSwgc2VsZi5uYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxmLnJ1bGVEaWN0W3J1bGVOYW1lXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcnVsZXMgPSB7fTtcbiAgICB2YXIgcnVsZU5hbWU7XG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgZW50cnlQb2ludHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgcnVsZU5hbWUgPSBlbnRyeVBvaW50c1tpZHhdO1xuICAgICAgZ2V0Qm9keShydWxlTmFtZSk7ICAvLyB0byBtYWtlIHN1cmUgdGhlIHJ1bGUgZXhpc3RzXG4gICAgICBydWxlc1tydWxlTmFtZV0gPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICBkb25lID0gdHJ1ZTtcbiAgICAgIGZvciAocnVsZU5hbWUgaW4gcnVsZXMpIHtcbiAgICAgICAgdmFyIGFkZGVkTmV3UnVsZSA9IGdldEJvZHkocnVsZU5hbWUpLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbihydWxlcywgdHJ1ZSk7XG4gICAgICAgIGRvbmUgJj0gIWFkZGVkTmV3UnVsZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcnVsZXM7XG4gIH1cbn07XG5cbi8vIFRoaXMgb2JqZWN0IGNvbnRhaW5zIE9obSdzIGJ1aWx0LWluIHJ1bGVzLlxuR3JhbW1hci5iYXNlID0gbmV3IEdyYW1tYXIoJ0dyYW1tYXInLCBudWxsLCB7XG4gIF86IHBleHBycy5hbnl0aGluZyxcbiAgZW5kOiBwZXhwcnMuZW5kLFxuICBzcGFjZTogcGV4cHJzLm1ha2VQcmltKC9bXFxzXS8pLndpdGhEZXNjcmlwdGlvbignc3BhY2UnKSxcbiAgYWxudW06IHBleHBycy5tYWtlUHJpbSgvWzAtOWEtekEtWl0vKS53aXRoRGVzY3JpcHRpb24oJ2FscGhhLW51bWVyaWMgY2hhcmFjdGVyJyksXG4gIGxldHRlcjogcGV4cHJzLm1ha2VQcmltKC9bYS16QS1aXS8pLndpdGhEZXNjcmlwdGlvbignbGV0dGVyJyksXG4gIGxvd2VyOiBwZXhwcnMubWFrZVByaW0oL1thLXpdLykud2l0aERlc2NyaXB0aW9uKCdsb3dlci1jYXNlIGxldHRlcicpLFxuICB1cHBlcjogcGV4cHJzLm1ha2VQcmltKC9bQS1aXS8pLndpdGhEZXNjcmlwdGlvbigndXBwZXItY2FzZSBsZXR0ZXInKSxcbiAgZGlnaXQ6IHBleHBycy5tYWtlUHJpbSgvWzAtOV0vKS53aXRoRGVzY3JpcHRpb24oJ2RpZ2l0JyksXG4gIGhleERpZ2l0OiBwZXhwcnMubWFrZVByaW0oL1swLTlhLWZBLUZdLykud2l0aERlc2NyaXB0aW9uKCdoZXhhZGVjaW1hbCBkaWdpdCcpLFxuXG4gIC8vIFRoZSBmb2xsb3dpbmcgcnVsZSBpcyBwYXJ0IG9mIHRoZSBpbXBsZW1lbnRhdGlvbi5cbiAgLy8gSXRzIG5hbWUgZW5kcyB3aXRoICdfJyBzbyB0aGF0IGl0IGNhbid0IGJlIG92ZXJyaWRkZW4gb3IgaW52b2tlZCBieSBwcm9ncmFtbWVycy5cbiAgc3BhY2VzXzogbmV3IHBleHBycy5NYW55KG5ldyBwZXhwcnMuQXBwbHkoJ3NwYWNlJyksIDApXG59KTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gR3JhbW1hcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBHcmFtbWFyID0gcmVxdWlyZSgnLi9HcmFtbWFyLmpzJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMuanMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycy5qcycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBTdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gQ29uc3RydWN0b3JzXG5cbmZ1bmN0aW9uIEdyYW1tYXJEZWNsKG5hbWUpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbn1cblxuLy8gSGVscGVyc1xuXG5mdW5jdGlvbiBvbk9obUVycm9yKGRvRm4sIG9uRXJyb3JGbikge1xuICB0cnkge1xuICAgIGRvRm4oKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgZXJyb3JzLkVycm9yKSB7XG4gICAgICBvbkVycm9yRm4oZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG59XG5cbkdyYW1tYXJEZWNsLnByb3RvdHlwZS5lbnN1cmVTdXBlckdyYW1tYXIgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLnN1cGVyR3JhbW1hcikge1xuICAgIHRoaXMud2l0aFN1cGVyR3JhbW1hcihHcmFtbWFyLmJhc2UpO1xuICB9XG4gIHJldHVybiB0aGlzLnN1cGVyR3JhbW1hcjtcbn07XG5cbi8vIFN0dWZmIHRoYXQgeW91IHNob3VsZCBvbmx5IGRvIG9uY2VcblxuR3JhbW1hckRlY2wucHJvdG90eXBlLndpdGhTdXBlckdyYW1tYXIgPSBmdW5jdGlvbihzdXBlckdyYW1tYXIpIHtcbiAgaWYgKHRoaXMuc3VwZXJHcmFtbWFyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgc3VwZXIgZ3JhbW1hciBvZiBhIEdyYW1tYXJEZWNsIGNhbm5vdCBiZSBzZXQgbW9yZSB0aGFuIG9uY2UnKTtcbiAgfVxuICB0aGlzLnN1cGVyR3JhbW1hciA9IHN1cGVyR3JhbW1hcjtcbiAgdGhpcy5ydWxlRGljdCA9IE9iamVjdC5jcmVhdGUoc3VwZXJHcmFtbWFyLnJ1bGVEaWN0KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBDcmVhdGVzIGEgR3JhbW1hciBpbnN0YW5jZSwgYW5kIGlmIGl0IHBhc3NlcyB0aGUgc2FuaXR5IGNoZWNrcywgcmV0dXJucyBpdC5cbkdyYW1tYXJEZWNsLnByb3RvdHlwZS5idWlsZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZ3JhbW1hciA9IG5ldyBHcmFtbWFyKHRoaXMubmFtZSwgdGhpcy5lbnN1cmVTdXBlckdyYW1tYXIoKSwgdGhpcy5ydWxlRGljdCk7XG4gIHZhciBlcnJvcjtcbiAgT2JqZWN0LmtleXMoZ3JhbW1hci5ydWxlRGljdCkuZm9yRWFjaChmdW5jdGlvbihydWxlTmFtZSkge1xuICAgIHZhciBib2R5ID0gZ3JhbW1hci5ydWxlRGljdFtydWxlTmFtZV07XG4gICAgZnVuY3Rpb24gaGFuZGxlRXJyb3IoZSkge1xuICAgICAgZXJyb3IgPSBlO1xuICAgICAgY29uc29sZS5lcnJvcihlLnRvU3RyaW5nKCkpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxuICAgIC8vIFRPRE86IGNoYW5nZSB0aGUgcGV4cHIucHJvdG90eXBlLmFzc2VydC4uLiBtZXRob2RzIHRvIG1ha2UgdGhlbSBhZGRcbiAgICAvLyBleGNlcHRpb25zIHRvIGFuIGFycmF5IHRoYXQncyBwcm92aWRlZCBhcyBhbiBhcmcuIFRoZW4gd2UnbGwgYmUgYWJsZSB0b1xuICAgIC8vIHNob3cgbW9yZSB0aGFuIG9uZSBlcnJvciBvZiB0aGUgc2FtZSB0eXBlIGF0IGEgdGltZS5cbiAgICAvLyBUT0RPOiBpbmNsdWRlIHRoZSBvZmZlbmRpbmcgcGV4cHIgaW4gdGhlIGVycm9ycywgdGhhdCB3YXkgd2UgY2FuIHNob3dcbiAgICAvLyB0aGUgcGFydCBvZiB0aGUgc291cmNlIHRoYXQgY2F1c2VkIGl0LlxuICAgIG9uT2htRXJyb3IoZnVuY3Rpb24oKSB7IGJvZHkuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkocnVsZU5hbWUpOyB9LCBoYW5kbGVFcnJvcik7XG4gICAgb25PaG1FcnJvcihmdW5jdGlvbigpIHsgYm9keS5hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZChncmFtbWFyKTsgfSwgIGhhbmRsZUVycm9yKTtcbiAgfSk7XG4gIGlmIChlcnJvcikge1xuICAgIHRocm93IGVycm9yO1xuICB9XG4gIHJldHVybiBncmFtbWFyO1xufTtcblxuLy8gUnVsZSBkZWNsYXJhdGlvbnNcblxuR3JhbW1hckRlY2wucHJvdG90eXBlLmRlZmluZSA9IGZ1bmN0aW9uKG5hbWUsIGJvZHksIG9wdERlc2NyKSB7XG4gIHRoaXMuZW5zdXJlU3VwZXJHcmFtbWFyKCk7XG4gIGlmIChvcHREZXNjcikge1xuICAgIGJvZHkuZGVzY3JpcHRpb24gPSBvcHREZXNjcjtcbiAgfVxuICBpZiAodGhpcy5zdXBlckdyYW1tYXIucnVsZURpY3RbbmFtZV0pIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkR1cGxpY2F0ZVJ1bGVEZWNsYXJhdGlvbihuYW1lLCB0aGlzLm5hbWUsIHRoaXMuc3VwZXJHcmFtbWFyLm5hbWUpO1xuICB9IGVsc2UgaWYgKHRoaXMucnVsZURpY3RbbmFtZV0pIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkR1cGxpY2F0ZVJ1bGVEZWNsYXJhdGlvbihuYW1lLCB0aGlzLm5hbWUsIHRoaXMubmFtZSk7XG4gIH1cbiAgdGhpcy5ydWxlRGljdFtuYW1lXSA9IGJvZHk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuR3JhbW1hckRlY2wucHJvdG90eXBlLm92ZXJyaWRlID0gZnVuY3Rpb24obmFtZSwgYm9keSkge1xuICB0aGlzLmVuc3VyZVN1cGVyR3JhbW1hcigpO1xuICBpZiAoIXRoaXMuc3VwZXJHcmFtbWFyLnJ1bGVEaWN0W25hbWVdKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5VbmRlY2xhcmVkUnVsZShuYW1lLCB0aGlzLnN1cGVyR3JhbW1hci5uYW1lKTtcbiAgfVxuICB0aGlzLnJ1bGVEaWN0W25hbWVdID0gYm9keTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24obmFtZSwgYm9keSkge1xuICB0aGlzLmVuc3VyZVN1cGVyR3JhbW1hcigpO1xuICBpZiAoIXRoaXMuc3VwZXJHcmFtbWFyLnJ1bGVEaWN0W25hbWVdKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5VbmRlY2xhcmVkUnVsZShuYW1lLCB0aGlzLnN1cGVyR3JhbW1hci5uYW1lKTtcbiAgfVxuICB0aGlzLnJ1bGVEaWN0W25hbWVdID0gbmV3IHBleHBycy5FeHRlbmQodGhpcy5zdXBlckdyYW1tYXIsIG5hbWUsIGJvZHkpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyYW1tYXJEZWNsO1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKTtcbnZhciBJbnRlcnZhbCA9IHJlcXVpcmUoJy4vSW50ZXJ2YWwuanMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIElucHV0U3RyZWFtKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0U3RyZWFtIGNhbm5vdCBiZSBpbnN0YW50aWF0ZWQgLS0gaXRcXCdzIGFic3RyYWN0Jyk7XG59XG5cbklucHV0U3RyZWFtLm5ld0ZvciA9IGZ1bmN0aW9uKG9iaikge1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbmV3IFN0cmluZ0lucHV0U3RyZWFtKG9iaik7XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG5ldyBMaXN0SW5wdXRTdHJlYW0ob2JqKTtcbiAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBJbnB1dFN0cmVhbSkge1xuICAgIHJldHVybiBvYmo7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgbWFrZSBpbnB1dCBzdHJlYW0gZm9yICcgKyBvYmopO1xuICB9XG59O1xuXG5JbnB1dFN0cmVhbS5wcm90b3R5cGUgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgIHRoaXMucG9zID0gMDtcbiAgICB0aGlzLnBvc0luZm9zID0gW107XG4gIH0sXG5cbiAgYXRFbmQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvcyA9PT0gdGhpcy5zb3VyY2UubGVuZ3RoO1xuICB9LFxuXG4gIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmF0RW5kKCkpIHtcbiAgICAgIHJldHVybiBjb21tb24uZmFpbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc291cmNlW3RoaXMucG9zKytdO1xuICAgIH1cbiAgfSxcblxuICBtYXRjaEV4YWN0bHk6IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gdGhpcy5uZXh0KCkgPT09IHggPyB0cnVlIDogY29tbW9uLmZhaWw7XG4gIH0sXG5cbiAgc291cmNlU2xpY2U6IGZ1bmN0aW9uKHN0YXJ0SWR4LCBlbmRJZHgpIHtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnRJZHgsIGVuZElkeCk7XG4gIH0sXG5cbiAgaW50ZXJ2YWxGcm9tOiBmdW5jdGlvbihzdGFydElkeCkge1xuICAgIHJldHVybiBuZXcgSW50ZXJ2YWwodGhpcywgc3RhcnRJZHgsIHRoaXMucG9zKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gU3RyaW5nSW5wdXRTdHJlYW0oc291cmNlKSB7XG4gIHRoaXMuaW5pdChzb3VyY2UpO1xufVxuXG5TdHJpbmdJbnB1dFN0cmVhbS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKElucHV0U3RyZWFtLnByb3RvdHlwZSwge1xuICBtYXRjaFN0cmluZzoge1xuICAgIHZhbHVlOiBmdW5jdGlvbihzKSB7XG4gICAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgaWYgKHRoaXMubWF0Y2hFeGFjdGx5KHNbaWR4XSkgPT09IGNvbW1vbi5mYWlsKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbW1vbi5mYWlsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0sXG5cbiAgbWF0Y2hSZWdFeHA6IHtcbiAgICB2YWx1ZTogZnVuY3Rpb24oZSkge1xuICAgICAgLy8gSU1QT1JUQU5UOiBlIG11c3QgYmUgYSBub24tZ2xvYmFsLCBvbmUtY2hhcmFjdGVyIGV4cHJlc3Npb24sIGUuZy4sIC8uLyBhbmQgL1swLTldL1xuICAgICAgdmFyIGMgPSB0aGlzLm5leHQoKTtcbiAgICAgIHJldHVybiBjICE9PSBjb21tb24uZmFpbCAmJiBlLnRlc3QoYykgPyB0cnVlIDogY29tbW9uLmZhaWw7XG4gICAgfVxuICB9XG59KTtcblxuZnVuY3Rpb24gTGlzdElucHV0U3RyZWFtKHNvdXJjZSkge1xuICB0aGlzLmluaXQoc291cmNlKTtcbn1cblxuTGlzdElucHV0U3RyZWFtLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSW5wdXRTdHJlYW0ucHJvdG90eXBlLCB7XG4gIG1hdGNoU3RyaW5nOiB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uKHMpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hdGNoRXhhY3RseShzKTtcbiAgICB9XG4gIH0sXG5cbiAgbWF0Y2hSZWdFeHA6IHtcbiAgICB2YWx1ZTogZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIHRoaXMubWF0Y2hFeGFjdGx5KGUpO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0U3RyZWFtO1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMuanMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIEludGVydmFsKGlucHV0U3RyZWFtLCBzdGFydElkeCwgZW5kSWR4KSB7XG4gIHRoaXMuaW5wdXRTdHJlYW0gPSBpbnB1dFN0cmVhbTtcbiAgdGhpcy5zdGFydElkeCA9IHN0YXJ0SWR4O1xuICB0aGlzLmVuZElkeCA9IGVuZElkeDtcbn1cblxuSW50ZXJ2YWwuY292ZXJhZ2UgPSBmdW5jdGlvbigvKiBpbnRlcnZhbDEsIGludGVydmFsMiwgLi4uICovKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IGFyZ3VtZW50c1swXS5pbnB1dFN0cmVhbTtcbiAgdmFyIHN0YXJ0SWR4ID0gYXJndW1lbnRzWzBdLnN0YXJ0SWR4O1xuICB2YXIgZW5kSWR4ID0gYXJndW1lbnRzWzBdLmVuZElkeDtcbiAgZm9yICh2YXIgaWR4ID0gMTsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB2YXIgaW50ZXJ2YWwgPSBhcmd1bWVudHNbaWR4XTtcbiAgICBpZiAoaW50ZXJ2YWwuaW5wdXRTdHJlYW0gIT09IGlucHV0U3RyZWFtKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLkludGVydmFsU291cmNlc0RvbnRNYXRjaCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydElkeCA9IE1hdGgubWluKHN0YXJ0SWR4LCBhcmd1bWVudHNbaWR4XS5zdGFydElkeCk7XG4gICAgICBlbmRJZHggPSBNYXRoLm1heChlbmRJZHgsIGFyZ3VtZW50c1tpZHhdLmVuZElkeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgSW50ZXJ2YWwoaW5wdXRTdHJlYW0sIHN0YXJ0SWR4LCBlbmRJZHgpO1xufTtcblxuSW50ZXJ2YWwucHJvdG90eXBlID0ge1xuICBjb3ZlcmFnZVdpdGg6IGZ1bmN0aW9uKC8qIGludGVydmFsMSwgaW50ZXJ2YWwyLCAuLi4gKi8pIHtcbiAgICB2YXIgaW50ZXJ2YWxzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICBpbnRlcnZhbHMucHVzaCh0aGlzKTtcbiAgICByZXR1cm4gSW50ZXJ2YWwuY292ZXJhZ2UuYXBwbHkodW5kZWZpbmVkLCBpbnRlcnZhbHMpO1xuICB9LFxuXG4gIGNvbGxhcHNlZExlZnQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgSW50ZXJ2YWwodGhpcy5pbnB1dFN0cmVhbSwgdGhpcy5zdGFydElkeCwgdGhpcy5zdGFydElkeCk7XG4gIH0sXG5cbiAgY29sbGFwc2VkUmlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgSW50ZXJ2YWwodGhpcy5pbnB1dFN0cmVhbSwgdGhpcy5lbmRJZHgsIHRoaXMuZW5kSWR4KTtcbiAgfSxcbiAgLy8gUmV0dXJucyBhIG5ldyBJbnRlcnZhbCB3aGljaCBjb250YWlucyB0aGUgc2FtZSBjb250ZW50cyBhcyB0aGlzIG9uZSxcbiAgLy8gYnV0IHdpdGggd2hpdGVzcGFjZSB0cmltbWVkIGZyb20gYm90aCBlbmRzLiAoVGhpcyBvbmx5IG1ha2VzIHNlbnNlIHdoZW5cbiAgLy8gdGhlIGlucHV0IHN0cmVhbSBpcyBhIHN0cmluZy4pXG4gIHRyaW1tZWQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb250ZW50cyA9IHRoaXMuY29udGVudHM7XG4gICAgdmFyIHN0YXJ0SWR4ID0gdGhpcy5zdGFydElkeCArIGNvbnRlbnRzLm1hdGNoKC9eXFxzKi8pWzBdLmxlbmd0aDtcbiAgICB2YXIgZW5kSWR4ID0gdGhpcy5lbmRJZHggLSBjb250ZW50cy5tYXRjaCgvXFxzKiQvKVswXS5sZW5ndGg7XG4gICAgcmV0dXJuIG5ldyBJbnRlcnZhbCh0aGlzLmlucHV0U3RyZWFtLCBzdGFydElkeCwgZW5kSWR4KTtcbiAgfVxufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoSW50ZXJ2YWwucHJvdG90eXBlLCB7XG4gIGNvbnRlbnRzOiB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLl9jb250ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRzID0gdGhpcy5pbnB1dFN0cmVhbS5zb3VyY2VTbGljZSh0aGlzLnN0YXJ0SWR4LCB0aGlzLmVuZElkeCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fY29udGVudHM7XG4gICAgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG4gIH1cbn0pO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcnZhbDtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ3V0aWwtZXh0ZW5kJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBOYW1lc3BhY2UoKSB7XG59XG5OYW1lc3BhY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuTmFtZXNwYWNlLmFzTmFtZXNwYWNlID0gZnVuY3Rpb24ob2JqT3JOYW1lc3BhY2UpIHtcbiAgaWYgKG9iak9yTmFtZXNwYWNlIGluc3RhbmNlb2YgTmFtZXNwYWNlKSB7XG4gICAgcmV0dXJuIG9iak9yTmFtZXNwYWNlO1xuICB9XG4gIHJldHVybiBOYW1lc3BhY2UuY3JlYXRlTmFtZXNwYWNlKG9iak9yTmFtZXNwYWNlKTtcbn07XG5cbi8vIENyZWF0ZSBhIG5ldyBuYW1lc3BhY2UuIElmIGBvcHRQcm9wc2AgaXMgc3BlY2lmaWVkLCBhbGwgb2YgaXRzIHByb3BlcnRpZXNcbi8vIHdpbGwgYmUgY29waWVkIHRvIHRoZSBuZXcgbmFtZXNwYWNlLlxuTmFtZXNwYWNlLmNyZWF0ZU5hbWVzcGFjZSA9IGZ1bmN0aW9uKG9wdFByb3BzKSB7XG4gIHJldHVybiBOYW1lc3BhY2UuZXh0ZW5kKE5hbWVzcGFjZS5wcm90b3R5cGUsIG9wdFByb3BzKTtcbn07XG5cbi8vIENyZWF0ZSBhIG5ldyBuYW1lc3BhY2Ugd2hpY2ggZXh0ZW5kcyBhbm90aGVyIG5hbWVzcGFjZS4gSWYgYG9wdFByb3BzYCBpc1xuLy8gc3BlY2lmaWVkLCBhbGwgb2YgaXRzIHByb3BlcnRpZXMgd2lsbCBiZSBjb3BpZWQgdG8gdGhlIG5ldyBuYW1lc3BhY2UuXG5OYW1lc3BhY2UuZXh0ZW5kID0gZnVuY3Rpb24obmFtZXNwYWNlLCBvcHRQcm9wcykge1xuICBpZiAobmFtZXNwYWNlICE9PSBOYW1lc3BhY2UucHJvdG90eXBlICYmICEobmFtZXNwYWNlIGluc3RhbmNlb2YgTmFtZXNwYWNlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ25vdCBhIE5hbWVzcGFjZSBvYmplY3Q6ICcgKyBuYW1lc3BhY2UpO1xuICB9XG4gIHZhciBucyA9IE9iamVjdC5jcmVhdGUobmFtZXNwYWNlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBOYW1lc3BhY2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGV4dGVuZChucywgb3B0UHJvcHMpO1xufTtcblxuLy8gVE9ETzogU2hvdWxkIHRoaXMgYmUgYSByZWd1bGFyIG1ldGhvZD9cbk5hbWVzcGFjZS50b1N0cmluZyA9IGZ1bmN0aW9uKG5zKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobnMpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gTmFtZXNwYWNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gTm9kZShncmFtbWFyLCBjdG9yTmFtZSwgY2hpbGRyZW4sIGludGVydmFsKSB7XG4gIHRoaXMuZ3JhbW1hciA9IGdyYW1tYXI7XG4gIHRoaXMuY3Rvck5hbWUgPSBjdG9yTmFtZTtcbiAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB0aGlzLmludGVydmFsID0gaW50ZXJ2YWw7XG59XG5cbk5vZGUucHJvdG90eXBlLm51bUNoaWxkcmVuID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbn07XG5cbk5vZGUucHJvdG90eXBlLmNoaWxkQXQgPSBmdW5jdGlvbihpZHgpIHtcbiAgcmV0dXJuIHRoaXMuY2hpbGRyZW5baWR4XTtcbn07XG5cbk5vZGUucHJvdG90eXBlLmluZGV4T2ZDaGlsZCA9IGZ1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGFyZyk7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5oYXNDaGlsZHJlbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwO1xufTtcblxuTm9kZS5wcm90b3R5cGUuaGFzTm9DaGlsZHJlbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gIXRoaXMuaGFzQ2hpbGRyZW4oKTtcbn07XG5cbk5vZGUucHJvdG90eXBlLm9ubHlDaGlsZCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdjYW5ub3QgZ2V0IG9ubHkgY2hpbGQgb2YgYSBub2RlIG9mIHR5cGUgJyArIHRoaXMuY3Rvck5hbWUgK1xuICAgICAgICAnIChpdCBoYXMgJyArIHRoaXMubnVtQ2hpbGRyZW4oKSArICcgY2hpbGRyZW4pJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuZmlyc3RDaGlsZCgpO1xuICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5maXJzdENoaWxkID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmhhc05vQ2hpbGRyZW4oKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2Nhbm5vdCBnZXQgZmlyc3QgY2hpbGQgb2YgYSAnICsgdGhpcy5jdG9yTmFtZSArICcgbm9kZSwgd2hpY2ggaGFzIG5vIGNoaWxkcmVuJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRBdCgwKTtcbiAgfVxufTtcblxuTm9kZS5wcm90b3R5cGUubGFzdENoaWxkID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmhhc05vQ2hpbGRyZW4oKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2Nhbm5vdCBnZXQgbGFzdCBjaGlsZCBvZiBhICcgKyB0aGlzLmN0b3JOYW1lICsgJyBub2RlLCB3aGljaCBoYXMgbm8gY2hpbGRyZW4nKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZEF0KHRoaXMubnVtQ2hpbGRyZW4oKSAtIDEpO1xuICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5jaGlsZEJlZm9yZSA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gIHZhciBjaGlsZElkeCA9IHRoaXMuaW5kZXhPZkNoaWxkKGNoaWxkKTtcbiAgaWYgKGNoaWxkSWR4IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm9kZS5jaGlsZEJlZm9yZSgpIGNhbGxlZCB3LyBhbiBhcmd1bWVudCB0aGF0IGlzIG5vdCBhIGNoaWxkJyk7XG4gIH0gZWxzZSBpZiAoY2hpbGRJZHggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBnZXQgY2hpbGQgYmVmb3JlIGZpcnN0IGNoaWxkJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRBdChjaGlsZElkeCAtIDEpO1xuICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5jaGlsZEFmdGVyID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgdmFyIGNoaWxkSWR4ID0gdGhpcy5pbmRleE9mQ2hpbGQoY2hpbGQpO1xuICBpZiAoY2hpbGRJZHggPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlLmNoaWxkQWZ0ZXIoKSBjYWxsZWQgdy8gYW4gYXJndW1lbnQgdGhhdCBpcyBub3QgYSBjaGlsZCcpO1xuICB9IGVsc2UgaWYgKGNoaWxkSWR4ID09PSB0aGlzLm51bUNoaWxkcmVuKCkgLSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgZ2V0IGNoaWxkIGFmdGVyIGxhc3QgY2hpbGQnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZEF0KGNoaWxkSWR4ICsgMSk7XG4gIH1cbn07XG5cbk5vZGUucHJvdG90eXBlLmlzVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY3Rvck5hbWUgPT09ICdfdGVybWluYWwnO1xufTtcblxuTm9kZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuaXNWYWx1ZSgpKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlyc3RDaGlsZCgpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGdldCB2YWx1ZSBvZiBhIG5vbi10ZXJtaW5hbCBub2RlICh0eXBlICcgKyB0aGlzLmN0b3JOYW1lICsgJyknKTtcbiAgfVxufTtcblxuTm9kZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIHZhciByID0ge307XG4gIHJbdGhpcy5jdG9yTmFtZV0gPSB0aGlzLmNoaWxkcmVuO1xuICByZXR1cm4gcjtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGU7XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIFBvc0luZm8oZ2xvYmFsUnVsZVN0YWNrKSB7XG4gIHRoaXMuZ2xvYmFsUnVsZVN0YWNrID0gZ2xvYmFsUnVsZVN0YWNrO1xuICB0aGlzLnJ1bGVTdGFjayA9IFtdO1xuICAvLyBSZWR1bmRhbnQgKGNvdWxkIGJlIGdlbmVyYXRlZCBmcm9tIHJ1bGVTdGFjaykgYnV0IHVzZWZ1bCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucy5cbiAgdGhpcy5hY3RpdmVSdWxlcyA9IHt9O1xuICB0aGlzLm1lbW8gPSB7fTtcbn1cblxuUG9zSW5mby5wcm90b3R5cGUgPSB7XG4gIGlzQWN0aXZlOiBmdW5jdGlvbihydWxlTmFtZSkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVJ1bGVzW3J1bGVOYW1lXTtcbiAgfSxcblxuICBlbnRlcjogZnVuY3Rpb24ocGV4cHIpIHtcbiAgICB0aGlzLmdsb2JhbFJ1bGVTdGFjay5wdXNoKHBleHByKTtcbiAgICB0aGlzLnJ1bGVTdGFjay5wdXNoKHBleHByKTtcbiAgICB0aGlzLmFjdGl2ZVJ1bGVzW3BleHByLnJ1bGVOYW1lXSA9IHRydWU7XG4gIH0sXG5cbiAgZXhpdDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBleHByID0gdGhpcy5nbG9iYWxSdWxlU3RhY2sucG9wKCk7XG4gICAgdGhpcy5ydWxlU3RhY2sucG9wKCk7XG4gICAgdGhpcy5hY3RpdmVSdWxlc1twZXhwci5ydWxlTmFtZV0gPSBmYWxzZTtcbiAgfSxcblxuICBzaG91bGRVc2VNZW1vaXplZFJlc3VsdDogZnVuY3Rpb24obWVtb1JlYykge1xuICAgIHZhciBpbnZvbHZlZFJ1bGVzID0gbWVtb1JlYy5pbnZvbHZlZFJ1bGVzO1xuICAgIGZvciAodmFyIHJ1bGVOYW1lIGluIGludm9sdmVkUnVsZXMpIHtcbiAgICAgIGlmIChpbnZvbHZlZFJ1bGVzW3J1bGVOYW1lXSAmJiB0aGlzLmFjdGl2ZVJ1bGVzW3J1bGVOYW1lXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIGdldEN1cnJlbnRMZWZ0UmVjdXJzaW9uOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5sZWZ0UmVjdXJzaW9uU3RhY2spIHtcbiAgICAgIHJldHVybiB0aGlzLmxlZnRSZWN1cnNpb25TdGFja1t0aGlzLmxlZnRSZWN1cnNpb25TdGFjay5sZW5ndGggLSAxXTtcbiAgICB9XG4gIH0sXG5cbiAgc3RhcnRMZWZ0UmVjdXJzaW9uOiBmdW5jdGlvbihydWxlTmFtZSkge1xuICAgIGlmICghdGhpcy5sZWZ0UmVjdXJzaW9uU3RhY2spIHtcbiAgICAgIHRoaXMubGVmdFJlY3Vyc2lvblN0YWNrID0gW107XG4gICAgfVxuICAgIHRoaXMubGVmdFJlY3Vyc2lvblN0YWNrLnB1c2goe25hbWU6IHJ1bGVOYW1lLCB2YWx1ZTogZmFsc2UsIHBvczogLTEsIGludm9sdmVkUnVsZXM6IHt9fSk7XG4gICAgdGhpcy51cGRhdGVJbnZvbHZlZFJ1bGVzKCk7XG4gIH0sXG5cbiAgZW5kTGVmdFJlY3Vyc2lvbjogZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgICB0aGlzLmxlZnRSZWN1cnNpb25TdGFjay5wb3AoKTtcbiAgfSxcblxuICB1cGRhdGVJbnZvbHZlZFJ1bGVzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3VycmVudExlZnRSZWN1cnNpb24gPSB0aGlzLmdldEN1cnJlbnRMZWZ0UmVjdXJzaW9uKCk7XG4gICAgdmFyIGludm9sdmVkUnVsZXMgPSBjdXJyZW50TGVmdFJlY3Vyc2lvbi5pbnZvbHZlZFJ1bGVzO1xuICAgIHZhciBsclJ1bGVOYW1lID0gY3VycmVudExlZnRSZWN1cnNpb24ubmFtZTtcbiAgICB2YXIgaWR4ID0gdGhpcy5ydWxlU3RhY2subGVuZ3RoIC0gMTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgdmFyIHJ1bGVOYW1lID0gdGhpcy5ydWxlU3RhY2tbaWR4LS1dLnJ1bGVOYW1lO1xuICAgICAgaWYgKHJ1bGVOYW1lID09PSBsclJ1bGVOYW1lKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaW52b2x2ZWRSdWxlc1tydWxlTmFtZV0gPSB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gUG9zSW5mbztcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBQb3NJbmZvID0gcmVxdWlyZSgnLi9Qb3NJbmZvLmpzJyk7XG52YXIgVHJhY2UgPSByZXF1aXJlKCcuL1RyYWNlLmpzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMuanMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIFN0YXRlKGdyYW1tYXIsIGlucHV0U3RyZWFtLCBzdGFydFJ1bGUsIHRyYWNpbmdFbmFibGVkKSB7XG4gIHRoaXMuZ3JhbW1hciA9IGdyYW1tYXI7XG4gIHRoaXMub3JpZ0lucHV0U3RyZWFtID0gaW5wdXRTdHJlYW07XG4gIHRoaXMuc3RhcnRSdWxlID0gc3RhcnRSdWxlO1xuICB0aGlzLnRyYWNpbmdFbmFibGVkID0gdHJhY2luZ0VuYWJsZWQ7XG4gIHRoaXMucmlnaHRtb3N0RmFpbFBvcyA9IC0xO1xuICB0aGlzLmluaXQoKTtcbn1cblxuU3RhdGUucHJvdG90eXBlID0ge1xuICBpbml0OiBmdW5jdGlvbihvcHRGYWlsdXJlc0FycmF5KSB7XG4gICAgdGhpcy5pbnB1dFN0cmVhbVN0YWNrID0gW107XG4gICAgdGhpcy5wb3NJbmZvc1N0YWNrID0gW107XG4gICAgdGhpcy5wdXNoSW5wdXRTdHJlYW0odGhpcy5vcmlnSW5wdXRTdHJlYW0pO1xuICAgIHRoaXMucnVsZVN0YWNrID0gW107XG4gICAgdGhpcy5iaW5kaW5ncyA9IFtdO1xuICAgIHRoaXMuZmFpbHVyZXMgPSBvcHRGYWlsdXJlc0FycmF5O1xuICAgIHRoaXMuaWdub3JlRmFpbHVyZXNDb3VudCA9IDA7XG4gICAgaWYgKHRoaXMuaXNUcmFjaW5nKCkpIHtcbiAgICAgIHRoaXMudHJhY2UgPSBbXTtcbiAgICB9XG4gIH0sXG5cbiAgcHVzaElucHV0U3RyZWFtOiBmdW5jdGlvbihpbnB1dFN0cmVhbSkge1xuICAgIHRoaXMuaW5wdXRTdHJlYW1TdGFjay5wdXNoKHRoaXMuaW5wdXRTdHJlYW0pO1xuICAgIHRoaXMucG9zSW5mb3NTdGFjay5wdXNoKHRoaXMucG9zSW5mb3MpO1xuICAgIHRoaXMuaW5wdXRTdHJlYW0gPSBpbnB1dFN0cmVhbTtcbiAgICB0aGlzLnBvc0luZm9zID0gW107XG4gIH0sXG5cbiAgcG9wSW5wdXRTdHJlYW06IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5wdXRTdHJlYW0gPSB0aGlzLmlucHV0U3RyZWFtU3RhY2sucG9wKCk7XG4gICAgdGhpcy5wb3NJbmZvcyA9IHRoaXMucG9zSW5mb3NTdGFjay5wb3AoKTtcbiAgfSxcblxuICBnZXRDdXJyZW50UG9zSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UG9zSW5mbyh0aGlzLmlucHV0U3RyZWFtLnBvcyk7XG4gIH0sXG5cbiAgZ2V0UG9zSW5mbzogZnVuY3Rpb24ocG9zKSB7XG4gICAgdmFyIHBvc0luZm8gPSB0aGlzLnBvc0luZm9zW3Bvc107XG4gICAgcmV0dXJuIHBvc0luZm8gfHwgKHRoaXMucG9zSW5mb3NbcG9zXSA9IG5ldyBQb3NJbmZvKHRoaXMucnVsZVN0YWNrKSk7XG4gIH0sXG5cbiAgcmVjb3JkRmFpbHVyZTogZnVuY3Rpb24ocG9zLCBleHByKSB7XG4gICAgaWYgKHRoaXMuaWdub3JlRmFpbHVyZXNDb3VudCA+IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHBvcyA8IHRoaXMucmlnaHRtb3N0RmFpbFBvcykge1xuICAgICAgLy8gaXQgd291bGQgYmUgdXNlbGVzcyB0byByZWNvcmQgdGhpcyBmYWlsdXJlLCBzbyBkb24ndCBkbyBpdFxuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAocG9zID4gdGhpcy5yaWdodG1vc3RGYWlsUG9zKSB7XG4gICAgICAvLyBuZXcgcmlnaHRtb3N0IGZhaWx1cmUhXG4gICAgICB0aGlzLnJpZ2h0bW9zdEZhaWxQb3MgPSBwb3M7XG4gICAgfVxuICAgIGlmICghdGhpcy5mYWlsdXJlcykge1xuICAgICAgLy8gd2UncmUgbm90IHJlYWxseSByZWNvcmRpbmcgZmFpbHVyZXMsIHNvIHdlJ3JlIGRvbmVcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBjb25zaWRlciBtYWtpbmcgdGhpcyBjb2RlIG1vcmUgT08sIGUuZy4sIGFkZCBhbiBFeHByQW5kU3RhY2tzIGNsYXNzXG4gICAgLy8gdGhhdCBzdXBwb3J0cyBhbiBhZGRTdGFjayhzdGFjaykgbWV0aG9kLlxuICAgIGZ1bmN0aW9uIGFkZFN0YWNrKHN0YWNrLCBzdGFja3MpIHtcbiAgICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHN0YWNrcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgIHZhciBvdGhlclN0YWNrID0gc3RhY2tzW2lkeF07XG4gICAgICAgIGlmIChzdGFjay5sZW5ndGggIT09IG90aGVyU3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaWR4MiA9IDA7IGlkeDIgPCBzdGFjay5sZW5ndGg7IGlkeDIrKykge1xuICAgICAgICAgIGlmIChzdGFja1tpZHgyXSAhPT0gb3RoZXJTdGFja1tpZHgyXSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpZHgyID09PSBzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAvLyBmb3VuZCBpdCwgbm8gbmVlZCB0byBhZGRcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN0YWNrcy5wdXNoKHN0YWNrKTtcbiAgICB9XG5cbiAgICAvLyBBbm90aGVyIGZhaWx1cmUgYXQgcmlnaHQtbW9zdCBwb3NpdGlvbiAtLSByZWNvcmQgaXQgaWYgaXQgd2Fzbid0IGFscmVhZHkuXG4gICAgdmFyIHN0YWNrID0gdGhpcy5ydWxlU3RhY2suc2xpY2UoKTtcbiAgICB2YXIgZXhwcnNBbmRTdGFja3MgPSB0aGlzLmZhaWx1cmVzO1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGV4cHJzQW5kU3RhY2tzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIHZhciBleHByQW5kU3RhY2tzID0gZXhwcnNBbmRTdGFja3NbaWR4XTtcbiAgICAgIGlmIChleHByQW5kU3RhY2tzLmV4cHIgPT09IGV4cHIpIHtcbiAgICAgICAgYWRkU3RhY2soc3RhY2ssIGV4cHJBbmRTdGFja3Muc3RhY2tzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBleHByc0FuZFN0YWNrcy5wdXNoKHtleHByOiBleHByLCBzdGFja3M6IFtzdGFja119KTtcbiAgfSxcblxuICBpZ25vcmVGYWlsdXJlczogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pZ25vcmVGYWlsdXJlc0NvdW50Kys7XG4gIH0sXG5cbiAgcmVjb3JkRmFpbHVyZXM6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaWdub3JlRmFpbHVyZXNDb3VudC0tO1xuICB9LFxuXG4gIGdldEZhaWx1cmVzUG9zOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yaWdodG1vc3RGYWlsUG9zO1xuICB9LFxuXG4gIGdldEZhaWx1cmVzOiBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuZmFpbHVyZXMpIHtcbiAgICAgIC8vIFJld2luZCwgdGhlbiB0cnkgdG8gbWF0Y2ggdGhlIGlucHV0IGFnYWluLCByZWNvcmRpbmcgZmFpbHVyZXMuXG4gICAgICB0aGlzLmluaXQoW10pO1xuICAgICAgdGhpcy50cmFjaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgdmFyIHN1Y2NlZWRlZCA9IG5ldyBwZXhwcnMuQXBwbHkodGhpcy5zdGFydFJ1bGUpLmV2YWwodGhpcyk7XG4gICAgICBpZiAoc3VjY2VlZGVkKSB7XG4gICAgICAgIHRoaXMuZmFpbHVyZXMgPSBbXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZmFpbHVyZXM7XG4gIH0sXG5cbiAgLy8gUmV0dXJucyB0aGUgbWVtb2l6ZWQgdHJhY2UgZW50cnkgZm9yIGBwb3NgIGFuZCBgZXhwcmAsIGlmIG9uZSBleGlzdHMuXG4gIGdldE1lbW9pemVkVHJhY2VFbnRyeTogZnVuY3Rpb24ocG9zLCBleHByKSB7XG4gICAgdmFyIHBvc0luZm8gPSB0aGlzLnBvc0luZm9zW3Bvc107XG4gICAgaWYgKHBvc0luZm8gJiYgZXhwci5ydWxlTmFtZSkge1xuICAgICAgdmFyIG1lbW9SZWMgPSBwb3NJbmZvLm1lbW9bZXhwci5ydWxlTmFtZV07XG4gICAgICBpZiAobWVtb1JlYykge1xuICAgICAgICByZXR1cm4gbWVtb1JlYy50cmFjZUVudHJ5O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICAvLyBNYWtlIGEgbmV3IHRyYWNlIGVudHJ5LCB1c2luZyB0aGUgY3VycmVudGx5IGFjdGl2ZSB0cmFjZSBhcnJheSBhcyB0aGVcbiAgLy8gbmV3IGVudHJ5J3MgY2hpbGRyZW4uXG4gIGdldFRyYWNlRW50cnk6IGZ1bmN0aW9uKHBvcywgZXhwciwgcmVzdWx0KSB7XG4gICAgdmFyIGVudHJ5ID0gdGhpcy5nZXRNZW1vaXplZFRyYWNlRW50cnkocG9zLCBleHByKTtcbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICBlbnRyeSA9IG5ldyBUcmFjZSh0aGlzLmlucHV0U3RyZWFtLCBwb3MsIGV4cHIsIHJlc3VsdCwgdGhpcy50cmFjZSk7XG4gICAgfVxuICAgIHJldHVybiBlbnRyeTtcbiAgfSxcblxuICBpc1RyYWNpbmc6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRyYWNpbmdFbmFibGVkO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIEludGVydmFsID0gcmVxdWlyZSgnLi9JbnRlcnZhbC5qcycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gbGlua0xlZnRSZWN1cnNpdmVDaGlsZHJlbihjaGlsZHJlbikge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgdmFyIG5leHRDaGlsZCA9IGNoaWxkcmVuW2kgKyAxXTtcblxuICAgIGlmIChuZXh0Q2hpbGQgJiYgY2hpbGQuZXhwciA9PT0gbmV4dENoaWxkLmV4cHIpIHtcbiAgICAgIGNoaWxkLnJlcGxhY2VkQnkgPSBuZXh0Q2hpbGQ7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIFRyYWNlKGlucHV0U3RyZWFtLCBwb3MsIGV4cHIsIGFucywgb3B0Q2hpbGRyZW4pIHtcbiAgdGhpcy5jaGlsZHJlbiA9IG9wdENoaWxkcmVuIHx8IFtdO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2Rpc3BsYXlTdHJpbmcnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIGV4cHIudG9EaXNwbGF5U3RyaW5nKCk7IH1cbiAgfSk7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG4gIGlmIChhbnMpIHtcbiAgICB0aGlzLmludGVydmFsID0gbmV3IEludGVydmFsKGlucHV0U3RyZWFtLCBwb3MsIGlucHV0U3RyZWFtLnBvcyk7XG4gIH1cbiAgdGhpcy5pc0xlZnRSZWN1cnNpdmUgPSBmYWxzZTtcbiAgdGhpcy5wb3MgPSBwb3M7XG4gIHRoaXMuc3VjY2VlZGVkID0gISFhbnM7XG59XG5cblRyYWNlLnByb3RvdHlwZS5zZXRMZWZ0UmVjdXJzaXZlID0gZnVuY3Rpb24obGVmdFJlY3Vyc2l2ZSkge1xuICB0aGlzLmlzTGVmdFJlY3Vyc2l2ZSA9IGxlZnRSZWN1cnNpdmU7XG4gIGlmIChsZWZ0UmVjdXJzaXZlKSB7XG4gICAgbGlua0xlZnRSZWN1cnNpdmVDaGlsZHJlbih0aGlzLmNoaWxkcmVuKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gVHJhY2U7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgU3ltYm9sID0gcmVxdWlyZSgnc3ltYm9sJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG52YXIgTm9kZSA9IHJlcXVpcmUoJy4vTm9kZScpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGFjdGlvbnMgPSB7XG4gIGdldFZhbHVlOiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMudmFsdWUoKTsgfSxcbiAgbWFrZUFycmF5OiBmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0JVRzogb2htLmFjdGlvbnMubWFrZUFycmF5IHNob3VsZCBuZXZlciBiZSBjYWxsZWQnKTtcbiAgfSxcbiAgcGFzc1Rocm91Z2g6IGZ1bmN0aW9uKGNoaWxkTm9kZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQlVHOiBvaG0uYWN0aW9ucy5wYXNzVGhyb3VnaCBzaG91bGQgbmV2ZXIgYmUgY2FsbGVkJyk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIG1ha2VUb3BEb3duVGhpbmcoZ3JhbW1hciwgYWN0aW9uRGljdCwgbWVtb2l6ZSkge1xuICB2YXIgdGhpbmc7XG5cbiAgZnVuY3Rpb24gZ2V0KG5vZGUpIHtcbiAgICBmdW5jdGlvbiBkb0FjdGlvbihhY3Rpb25Gbiwgb3B0RG9udFBhc3NDaGlsZHJlbkFzQW5Bcmd1bWVudCkge1xuICAgICAgaWYgKGFjdGlvbkZuID09PSBhY3Rpb25zLm1ha2VBcnJheSkge1xuICAgICAgICBpZiAobm9kZS5jdG9yTmFtZSA9PT0gJ19tYW55Jykge1xuICAgICAgICAgIHJldHVybiBub2RlLmNoaWxkcmVuLm1hcCh0aGluZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAndGhlIG1ha2VBcnJheSBkZWZhdWx0IGFjdGlvbiBjYW5ub3QgYmUgdXNlZCB3aXRoIGEgJyArIG5vZGUuY3Rvck5hbWUgKyAnIG5vZGUnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhY3Rpb25GbiA9PT0gYWN0aW9ucy5wYXNzVGhyb3VnaCkge1xuICAgICAgICBpZiAobm9kZS5jdG9yTmFtZSA9PT0gJ19tYW55Jykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIHBhc3NUaHJvdWdoIGRlZmF1bHQgYWN0aW9uIGNhbm5vdCBiZSB1c2VkIHdpdGggYSBfbWFueSBub2RlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaW5nKG5vZGUub25seUNoaWxkKCkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb3B0RG9udFBhc3NDaGlsZHJlbkFzQW5Bcmd1bWVudCA/XG4gICAgICAgICAgICBhY3Rpb25Gbi5hcHBseShub2RlKSA6XG4gICAgICAgICAgICBhY3Rpb25Gbi5hcHBseShub2RlLCBub2RlLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgYWN0aW9uRm47XG4gICAgaWYgKG5vZGUuY3Rvck5hbWUgPT09ICdfbWFueScgJiYgbm9kZS5wYXJlbnQpIHtcbiAgICAgIC8vIElmIGFuIGFjdGlvbidzIG5hbWUgaXMgY3Rvck5hbWUkaWR4LCB3aGVyZSBpZHggaXMgdGhlIDEtYmFzZWQgaW5kZXggb2YgYSBjaGlsZCBub2RlIHRoYXRcbiAgICAgIC8vIGhhcHBlbnMgdG8gYmUgYSBsaXN0LCBpdCBzaG91bGQgb3ZlcnJpZGUgdGhlIF9tYW55IGFjdGlvbiBmb3IgdGhhdCBwYXJ0aWN1bGFyIGxpc3Qgbm9kZS5cbiAgICAgIHZhciBhY3Rpb25OYW1lID0gbm9kZS5wYXJlbnQuY3Rvck5hbWUgKyAnJCcgKyBub2RlLnBhcmVudC5pbmRleE9mQ2hpbGQobm9kZSk7XG4gICAgICBhY3Rpb25GbiA9IGFjdGlvbkRpY3RbYWN0aW9uTmFtZV07XG4gICAgICBpZiAoYWN0aW9uRm4pIHtcbiAgICAgICAgcmV0dXJuIGRvQWN0aW9uKGFjdGlvbkZuLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY3Rpb25GbiA9IGFjdGlvbkRpY3Rbbm9kZS5jdG9yTmFtZV07XG4gICAgaWYgKGFjdGlvbkZuKSB7XG4gICAgICByZXR1cm4gZG9BY3Rpb24oYWN0aW9uRm4pO1xuICAgIH0gZWxzZSBpZiAoYWN0aW9uRGljdC5fZGVmYXVsdCAmJiBub2RlLmN0b3JOYW1lICE9PSAnX3Rlcm1pbmFsJykge1xuICAgICAgcmV0dXJuIGRvQWN0aW9uKGFjdGlvbkRpY3QuX2RlZmF1bHQsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgbWV0aG9kIGZvciAnICsgbm9kZS5jdG9yTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3ludGhlc2l6ZWRBdHRyaWJ1dGUoKSB7XG4gICAgdmFyIGtleSA9IFN5bWJvbCgpO1xuICAgIHZhciBhdHRyaWJ1dGUgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICBjaGVja05vZGVBbmRHcmFtbWFyKG5vZGUsIGdyYW1tYXIsICdzeW50aGVzaXplZCBhdHRyaWJ1dGUnKTtcbiAgICAgIGlmICghbm9kZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIG5vZGVba2V5XSA9IGdldChub2RlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlW2tleV07XG4gICAgfTtcbiAgICBhdHRyaWJ1dGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuICdbc3ludGhlc2l6ZWQgYXR0cmlidXRlXSc7IH07XG4gICAgcmV0dXJuIGF0dHJpYnV0ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbWFudGljQWN0aW9uKCkge1xuICAgIHZhciBhY3Rpb24gPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICBjaGVja05vZGVBbmRHcmFtbWFyKG5vZGUsIGdyYW1tYXIsICdzZW1hbnRpYyBhY3Rpb24nKTtcbiAgICAgIHJldHVybiBnZXQobm9kZSk7XG4gICAgfTtcbiAgICBhY3Rpb24udG9TdHJpbmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuICdbc2VtYW50aWMgYWN0aW9uXSc7IH07XG4gICAgcmV0dXJuIGFjdGlvbjtcbiAgfVxuXG4gIC8vIGB0aGluZ2AgaGFzIHRvIGJlIGEgbG9jYWwgdmFyaWFibGUgYi9jIGl0J3MgY2FsbGVkIGZyb20gYGdldCgpYCxcbiAgLy8gdGhhdCdzIHdoeSB3ZSBkb24ndCBqdXN0IHJldHVybiBgbWVtb2l6ZSA/IC4uLiA6IC4uLmBcbiAgdGhpbmcgPSBtZW1vaXplID9cbiAgICBzeW50aGVzaXplZEF0dHJpYnV0ZSgpIDpcbiAgICBzZW1hbnRpY0FjdGlvbigpO1xuXG4gIHJldHVybiB0aGluZztcbn1cblxuZnVuY3Rpb24gY2hlY2tOb2RlQW5kR3JhbW1hcihub2RlLCBncmFtbWFyLCB3aGF0KSB7XG4gIGlmICghKG5vZGUgaW5zdGFuY2VvZiBOb2RlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignbm90IGFuIE9obSBDU1Qgbm9kZTogJyArIEpTT04uc3RyaW5naWZ5KG5vZGUpKTtcbiAgfVxuICBpZiAobm9kZS5ncmFtbWFyICE9PSBncmFtbWFyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhIG5vZGUgZnJvbSBncmFtbWFyICcgKyBub2RlLmdyYW1tYXIubmFtZSArXG4gICAgICAgICAgICAgICAgICAgICcgY2Fubm90IGJlIHVzZWQgd2l0aCBhICcgKyB3aGF0ICtcbiAgICAgICAgICAgICAgICAgICAgJyBmcm9tIGdyYW1tYXIgJyArIGdyYW1tYXIubmFtZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFrZVNlbWFudGljQWN0aW9uKGdyYW1tYXIsIGFjdGlvbkRpY3QpIHtcbiAgcmV0dXJuIG1ha2VUb3BEb3duVGhpbmcoZ3JhbW1hciwgYWN0aW9uRGljdCwgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiBtYWtlU3ludGhlc2l6ZWRBdHRyaWJ1dGUoZ3JhbW1hciwgYWN0aW9uRGljdCkge1xuICByZXR1cm4gbWFrZVRvcERvd25UaGluZyhncmFtbWFyLCBhY3Rpb25EaWN0LCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gbWFrZUluaGVyaXRlZEF0dHJpYnV0ZShncmFtbWFyLCBhY3Rpb25EaWN0KSB7XG4gIHZhciBhdHRyaWJ1dGU7XG5cbiAgZnVuY3Rpb24gY29tcHV0ZShub2RlKSB7XG4gICAgZnVuY3Rpb24gZG9BY3Rpb24oYWN0aW9uTmFtZSwgb3B0SW5jbHVkZUNoaWxkSW5kZXgpIHtcbiAgICAgIHZhciBhY3Rpb25GbiA9IGFjdGlvbkRpY3RbYWN0aW9uTmFtZV07XG4gICAgICBpZiAoYWN0aW9uRm4gPT09IGFjdGlvbnMubWFrZUFycmF5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIG1ha2VBcnJheSBkZWZhdWx0IGFjdGlvbiBjYW5ub3QgYmUgdXNlZCBpbiBhbiBpbmhlcml0ZWQgYXR0cmlidXRlJyk7XG4gICAgICB9IGVsc2UgaWYgKGFjdGlvbkZuID09PSBhY3Rpb25zLnBhc3NUaHJvdWdoKSB7XG4gICAgICAgIGF0dHJpYnV0ZS5zZXQoYXR0cmlidXRlKG5vZGUucGFyZW50KSk7XG4gICAgICAgIHJldHVybiBhY3Rpb25OYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG9wdEluY2x1ZGVDaGlsZEluZGV4KSB7XG4gICAgICAgICAgYWN0aW9uRm4uY2FsbChub2RlLnBhcmVudCwgbm9kZSwgbm9kZS5wYXJlbnQuaW5kZXhPZkNoaWxkKG5vZGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY3Rpb25Gbi5jYWxsKG5vZGUucGFyZW50LCBub2RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWN0aW9uTmFtZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIW5vZGUucGFyZW50KSB7XG4gICAgICBpZiAoYWN0aW9uRGljdC5fYmFzZSkge1xuICAgICAgICByZXR1cm4gZG9BY3Rpb24oJ19iYXNlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgX2Jhc2UgYWN0aW9uJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhY3Rpb25OYW1lO1xuICAgICAgaWYgKG5vZGUucGFyZW50LmN0b3JOYW1lID09PSAnX21hbnknKSB7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGFuIGFjdGlvbiBjYWxsZWQgPGN0b3JOYW1lPiQ8aWR4PiRlYWNoLCB3aGVyZSA8aWR4PiBpcyB0aGUgMS1iYXNlZCBpbmRleFxuICAgICAgICAvLyBvZiBhIGNoaWxkIG5vZGUgdGhhdCBoYXBwZW5zIHRvIGJlIGEgbGlzdCwgaXQgc2hvdWxkIG92ZXJyaWRlIHRoZSBfbWFueSBtZXRob2QgZm9yXG4gICAgICAgIC8vIHRoYXQgcGFydGljdWxhciBsaXN0IG5vZGUuXG4gICAgICAgIHZhciBncmFuZHBhcmVudCA9IG5vZGUucGFyZW50LnBhcmVudDtcbiAgICAgICAgYWN0aW9uTmFtZSA9IGdyYW5kcGFyZW50LmN0b3JOYW1lICsgJyQnICsgZ3JhbmRwYXJlbnQuaW5kZXhPZkNoaWxkKG5vZGUucGFyZW50KSArICckZWFjaCc7XG4gICAgICAgIGlmIChhY3Rpb25EaWN0W2FjdGlvbk5hbWVdKSB7XG4gICAgICAgICAgcmV0dXJuIGRvQWN0aW9uKGFjdGlvbk5hbWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbkRpY3QuX21hbnkpIHtcbiAgICAgICAgICBhY3Rpb25EaWN0Ll9tYW55LmNhbGwobm9kZS5wYXJlbnQsIG5vZGUsIG5vZGUucGFyZW50LmluZGV4T2ZDaGlsZChub2RlKSk7XG4gICAgICAgICAgcmV0dXJuICdfbWFueSc7XG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uRGljdC5fZGVmYXVsdCkge1xuICAgICAgICAgIHJldHVybiBkb0FjdGlvbignX2RlZmF1bHQnLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgJyArIGFjdGlvbk5hbWUgKyAnLCBfbWFueSwgb3IgX2RlZmF1bHQgbWV0aG9kJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGlvbk5hbWUgPSBub2RlLnBhcmVudC5jdG9yTmFtZSArICckJyArIG5vZGUucGFyZW50LmluZGV4T2ZDaGlsZChub2RlKTtcbiAgICAgICAgaWYgKGFjdGlvbkRpY3RbYWN0aW9uTmFtZV0pIHtcbiAgICAgICAgICByZXR1cm4gZG9BY3Rpb24oYWN0aW9uTmFtZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uRGljdC5fZGVmYXVsdCkge1xuICAgICAgICAgIHJldHVybiBkb0FjdGlvbignX2RlZmF1bHQnLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgJyArIGFjdGlvbk5hbWUgKyAnIG9yIF9kZWZhdWx0IG1ldGhvZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHZhciBrZXkgPSBTeW1ib2woKTtcbiAgdmFyIGN1cnJlbnRDaGlsZFN0YWNrID0gW107XG4gIGF0dHJpYnV0ZSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBjaGVja05vZGVBbmRHcmFtbWFyKG5vZGUsIGdyYW1tYXIsICdpbmhlcml0ZWQgYXR0cmlidXRlJyk7XG4gICAgaWYgKCFub2RlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGN1cnJlbnRDaGlsZFN0YWNrLnB1c2gobm9kZSk7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgbWV0aG9kTmFtZSA9IGNvbXB1dGUobm9kZSk7XG4gICAgICAgIGlmICghbm9kZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtZXRob2QgJyArIG1ldGhvZE5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnIGRpZCBub3Qgc2V0IGEgdmFsdWUgZm9yIGEgY2hpbGQgbm9kZSBvZiB0eXBlICcgKyBub2RlLmN0b3JOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgY3VycmVudENoaWxkU3RhY2sucG9wKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlW2tleV07XG4gIH07XG4gIGF0dHJpYnV0ZS5zZXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciBub2RlID0gY3VycmVudENoaWxkU3RhY2tbY3VycmVudENoaWxkU3RhY2subGVuZ3RoIC0gMV07XG4gICAgaWYgKG5vZGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgdmFsdWUgb2YgYW4gaW5oZXJpdGVkIGF0dHJpYnV0ZSBjYW5ub3QgYmUgc2V0IG1vcmUgdGhhbiBvbmNlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGVba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfTtcbiAgYXR0cmlidXRlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7IHJldHVybiAnW2luaGVyaXRlZCBhdHRyaWJ1dGVdJzsgfTtcbiAgcmV0dXJuIGF0dHJpYnV0ZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydHMubWFrZVNlbWFudGljQWN0aW9uID0gbWFrZVNlbWFudGljQWN0aW9uO1xuZXhwb3J0cy5tYWtlU3ludGhlc2l6ZWRBdHRyaWJ1dGUgPSBtYWtlU3ludGhlc2l6ZWRBdHRyaWJ1dGU7XG5leHBvcnRzLm1ha2VJbmhlcml0ZWRBdHRyaWJ1dGUgPSBtYWtlSW5oZXJpdGVkQXR0cmlidXRlO1xuZXhwb3J0cy5hY3Rpb25zID0gYWN0aW9ucztcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ3V0aWwtZXh0ZW5kJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIFN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgdGhpc01vZHVsZSA9IGV4cG9ydHM7XG5cbi8vIEhlbHBlcnNcblxuZnVuY3Rpb24gcGFkKG51bWJlckFzU3RyaW5nLCBsZW4pIHtcbiAgdmFyIHplcm9zID0gW107XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IG51bWJlckFzU3RyaW5nLmxlbmd0aCAtIGxlbjsgaWR4KyspIHtcbiAgICB6ZXJvcy5wdXNoKCcwJyk7XG4gIH1cbiAgcmV0dXJuIHplcm9zLmpvaW4oJycpICsgbnVtYmVyQXNTdHJpbmc7XG59XG5cbnZhciBlc2NhcGVTdHJpbmdGb3IgPSB7fTtcbmZvciAodmFyIGMgPSAwOyBjIDwgMTI4OyBjKyspIHtcbiAgZXNjYXBlU3RyaW5nRm9yW2NdID0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbn1cbmVzY2FwZVN0cmluZ0ZvcltcIidcIi5jaGFyQ29kZUF0KDApXSAgPSBcIlxcXFwnXCI7XG5lc2NhcGVTdHJpbmdGb3JbJ1wiJy5jaGFyQ29kZUF0KDApXSAgPSAnXFxcXFwiJztcbmVzY2FwZVN0cmluZ0ZvclsnXFxcXCcuY2hhckNvZGVBdCgwKV0gPSAnXFxcXFxcXFwnO1xuZXNjYXBlU3RyaW5nRm9yWydcXGInLmNoYXJDb2RlQXQoMCldID0gJ1xcXFxiJztcbmVzY2FwZVN0cmluZ0ZvclsnXFxmJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcZic7XG5lc2NhcGVTdHJpbmdGb3JbJ1xcbicuY2hhckNvZGVBdCgwKV0gPSAnXFxcXG4nO1xuZXNjYXBlU3RyaW5nRm9yWydcXHInLmNoYXJDb2RlQXQoMCldID0gJ1xcXFxyJztcbmVzY2FwZVN0cmluZ0ZvclsnXFx0Jy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcdCc7XG5lc2NhcGVTdHJpbmdGb3JbJ1xcdTAwMGInLmNoYXJDb2RlQXQoMCldID0gJ1xcXFx2JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydHMuYWJzdHJhY3QgPSBmdW5jdGlvbigpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCd0aGlzIG1ldGhvZCBpcyBhYnN0cmFjdCEnKTtcbn07XG5cbi8vIERlZmluZSBhIGxhemlseS1jb21wdXRlZCwgbm9uLWVudW1lcmFibGUgcHJvcGVydHkgbmFtZWQgYHByb3BOYW1lYFxuLy8gb24gdGhlIG9iamVjdCBgb2JqYC4gYGdldHRlckZuYCB3aWxsIGJlIGNhbGxlZCB0byBjb21wdXRlIHRoZSB2YWx1ZSB0aGVcbi8vIGZpcnN0IHRpbWUgdGhlIHByb3BlcnR5IGlzIGFjY2Vzc2VkLlxuZXhwb3J0cy5kZWZpbmVMYXp5UHJvcGVydHkgPSBmdW5jdGlvbihvYmosIHByb3BOYW1lLCBnZXR0ZXJGbikge1xuICB2YXIgbWVtbztcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcE5hbWUsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFtZW1vKSB7XG4gICAgICAgIG1lbW8gPSBnZXR0ZXJGbi5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydHMuY2xvbmUgPSBmdW5jdGlvbihvYmopIHtcbiAgaWYgKG9iaikge1xuICAgIHJldHVybiBleHRlbmQoe30sIG9iaik7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydHMuZXh0ZW5kID0gZXh0ZW5kO1xuXG5leHBvcnRzLnJlcGVhdEZuID0gZnVuY3Rpb24oZm4sIG4pIHtcbiAgdmFyIGFyciA9IFtdO1xuICB3aGlsZSAobi0tID4gMCkge1xuICAgIGFyci5wdXNoKGZuKCkpO1xuICB9XG4gIHJldHVybiBhcnI7XG59O1xuXG5leHBvcnRzLnJlcGVhdCA9IGZ1bmN0aW9uKHgsIG4pIHtcbiAgcmV0dXJuIGV4cG9ydHMucmVwZWF0Rm4oZnVuY3Rpb24oKSB7IHJldHVybiB4OyB9LCBuKTtcbn07XG5cbmV4cG9ydHMuZ2V0RHVwbGljYXRlcyA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gIHZhciBkdXBsaWNhdGVzID0gW107XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGFycmF5Lmxlbmd0aDsgaWR4KyspIHtcbiAgICB2YXIgeCA9IGFycmF5W2lkeF07XG4gICAgaWYgKGFycmF5Lmxhc3RJbmRleE9mKHgpICE9PSBpZHggJiYgZHVwbGljYXRlcy5pbmRleE9mKHgpIDwgMCkge1xuICAgICAgZHVwbGljYXRlcy5wdXNoKHgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZHVwbGljYXRlcztcbn07XG5cbmV4cG9ydHMuZmFpbCA9IHt9O1xuXG5leHBvcnRzLmlzU3ludGFjdGljID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdmFyIGZpcnN0Q2hhciA9IHJ1bGVOYW1lWzBdO1xuICByZXR1cm4gKCdBJyA8PSBmaXJzdENoYXIgJiYgZmlyc3RDaGFyIDw9ICdaJyk7XG59O1xuXG4vLyBTdHJpbmdCdWZmZXJcblxuZXhwb3J0cy5TdHJpbmdCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zdHJpbmdzID0gW107XG59O1xuXG5leHBvcnRzLlN0cmluZ0J1ZmZlci5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24oc3RyKSB7XG4gIHRoaXMuc3RyaW5ncy5wdXNoKHN0cik7XG59O1xuXG5leHBvcnRzLlN0cmluZ0J1ZmZlci5wcm90b3R5cGUuY29udGVudHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc3RyaW5ncy5qb2luKCcnKTtcbn07XG5cbi8vIENoYXJhY3RlciBlc2NhcGluZyBhbmQgdW5lc2NhcGluZ1xuXG5leHBvcnRzLmVzY2FwZUNoYXIgPSBmdW5jdGlvbihjLCBvcHREZWxpbSkge1xuICB2YXIgY2hhckNvZGUgPSBjLmNoYXJDb2RlQXQoMCk7XG4gIGlmICgoYyA9PT0gJ1wiJyB8fCBjID09PSBcIidcIikgJiYgb3B0RGVsaW0gJiYgYyAhPT0gb3B0RGVsaW0pIHtcbiAgICByZXR1cm4gYztcbiAgfSBlbHNlIGlmIChjaGFyQ29kZSA8IDEyOCkge1xuICAgIHJldHVybiBlc2NhcGVTdHJpbmdGb3JbY2hhckNvZGVdO1xuICB9IGVsc2UgaWYgKDEyOCA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8IDI1Nikge1xuICAgIHJldHVybiAnXFxcXHgnICsgcGFkKGNoYXJDb2RlLnRvU3RyaW5nKDE2KSwgMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICdcXFxcdScgKyBwYWQoY2hhckNvZGUudG9TdHJpbmcoMTYpLCA0KTtcbiAgfVxufTtcblxuZXhwb3J0cy51bmVzY2FwZUNoYXIgPSBmdW5jdGlvbihzKSB7XG4gIGlmIChzLmNoYXJBdCgwKSA9PT0gJ1xcXFwnKSB7XG4gICAgc3dpdGNoIChzLmNoYXJBdCgxKSkge1xuICAgICAgY2FzZSAnYic6IHJldHVybiAnXFxiJztcbiAgICAgIGNhc2UgJ2YnOiByZXR1cm4gJ1xcZic7XG4gICAgICBjYXNlICduJzogcmV0dXJuICdcXG4nO1xuICAgICAgY2FzZSAncic6IHJldHVybiAnXFxyJztcbiAgICAgIGNhc2UgJ3QnOiByZXR1cm4gJ1xcdCc7XG4gICAgICBjYXNlICd2JzogcmV0dXJuICdcXHYnO1xuICAgICAgY2FzZSAneCc6IHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KHMuc3Vic3RyaW5nKDIsIDQpLCAxNikpO1xuICAgICAgY2FzZSAndSc6IHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KHMuc3Vic3RyaW5nKDIsIDYpLCAxNikpO1xuICAgICAgZGVmYXVsdDogICByZXR1cm4gcy5jaGFyQXQoMSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBzO1xuICB9XG59O1xuXG4vLyBQcmV0dHktcHJpbnRpbmcgb2Ygc3RyaW5nc1xuXG5leHBvcnRzLnRvU3RyaW5nTGl0ZXJhbCA9IGZ1bmN0aW9uKHN0cikge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3RvU3RyaW5nTGl0ZXJhbCBvbmx5IHdvcmtzIG9uIHN0cmluZ3MnKTtcbiAgfVxuICB2YXIgaGFzU2luZ2xlUXVvdGVzID0gc3RyLmluZGV4T2YoXCInXCIpID49IDA7XG4gIHZhciBoYXNEb3VibGVRdW90ZXMgPSBzdHIuaW5kZXhPZignXCInKSA+PSAwO1xuICB2YXIgZGVsaW0gPSBoYXNTaW5nbGVRdW90ZXMgJiYgIWhhc0RvdWJsZVF1b3RlcyA/ICdcIicgOiBcIidcIjtcbiAgdmFyIHNiID0gbmV3IHRoaXNNb2R1bGUuU3RyaW5nQnVmZmVyKCk7XG4gIHNiLmFwcGVuZChkZWxpbSk7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHN0ci5sZW5ndGg7IGlkeCsrKSB7XG4gICAgc2IuYXBwZW5kKHRoaXNNb2R1bGUuZXNjYXBlQ2hhcihzdHJbaWR4XSwgZGVsaW0pKTtcbiAgfVxuICBzYi5hcHBlbmQoZGVsaW0pO1xuICByZXR1cm4gc2IuY29udGVudHMoKTtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbi5qcycpO1xudmFyIE5hbWVzcGFjZSA9IHJlcXVpcmUoJy4vTmFtZXNwYWNlLmpzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBPaG1FcnJvcigpIHt9XG5PaG1FcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5cbmZ1bmN0aW9uIG1ha2VDdXN0b21FcnJvcihuYW1lLCBpbml0Rm4pIHtcbiAgLy8gTWFrZSBFIHRoaW5rIGl0J3MgcmVhbGx5IGNhbGxlZCBPaG1FcnJvciwgc28gdGhhdCBlcnJvcnMgbG9vayBuaWNlciB3aGVuIHRoZXkncmVcbiAgLy8gY29uc29sZS5sb2cnZWQgaW4gQ2hyb21lLlxuICB2YXIgRSA9IGZ1bmN0aW9uIE9obUVycm9yKCkge1xuICAgIGluaXRGbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHZhciBlID0gbmV3IEVycm9yKCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzdGFjaycsIHtnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gZS5zdGFjazsgfX0pO1xuICB9O1xuICBFLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2htRXJyb3IucHJvdG90eXBlKTtcbiAgRS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFO1xuICBFLnByb3RvdHlwZS5uYW1lID0gbmFtZTtcbiAgcmV0dXJuIEU7XG59XG5cbmZ1bmN0aW9uIHRvRXJyb3JJbmZvKHBvcywgc3RyKSB7XG4gIHZhciBsaW5lTnVtID0gMTtcbiAgdmFyIGNvbE51bSA9IDE7XG5cbiAgdmFyIGN1cnJQb3MgPSAwO1xuICB2YXIgbGluZVN0YXJ0UG9zID0gMDtcblxuICB3aGlsZSAoY3VyclBvcyA8IHBvcykge1xuICAgIHZhciBjID0gc3RyLmNoYXJBdChjdXJyUG9zKyspO1xuICAgIGlmIChjID09PSAnXFxuJykge1xuICAgICAgbGluZU51bSsrO1xuICAgICAgY29sTnVtID0gMTtcbiAgICAgIGxpbmVTdGFydFBvcyA9IGN1cnJQb3M7XG4gICAgfSBlbHNlIGlmIChjICE9PSAnXFxyJykge1xuICAgICAgY29sTnVtKys7XG4gICAgfVxuICB9XG5cbiAgdmFyIGxpbmVFbmRQb3MgPSBzdHIuaW5kZXhPZignXFxuJywgbGluZVN0YXJ0UG9zKTtcbiAgaWYgKGxpbmVFbmRQb3MgPCAwKSB7XG4gICAgbGluZUVuZFBvcyA9IHN0ci5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxpbmVOdW06IGxpbmVOdW0sXG4gICAgY29sTnVtOiBjb2xOdW0sXG4gICAgbGluZTogc3RyLnN1YnN0cihsaW5lU3RhcnRQb3MsIGxpbmVFbmRQb3MgLSBsaW5lU3RhcnRQb3MpXG4gIH07XG59XG5cbi8vIENyZWF0ZSBhIHZlcmJvc2UgZXJyb3IgbWVzc2FnZSBmb3IgYW4gZXJyb3IgdGhhdCBvY2N1cnJlZCBkdXJpbmcgbWF0Y2hpbmcuXG5mdW5jdGlvbiBnZXRNYXRjaEVycm9yTWVzc2FnZShwb3MsIHNvdXJjZSwgZGV0YWlsKSB7XG4gIHZhciBlcnJvckluZm8gPSB0b0Vycm9ySW5mbyhwb3MsIHNvdXJjZSk7XG4gIHZhciBzYiA9IG5ldyBjb21tb24uU3RyaW5nQnVmZmVyKCk7XG4gIHNiLmFwcGVuZCgnTGluZSAnICsgZXJyb3JJbmZvLmxpbmVOdW0gKyAnLCBjb2wgJyArIGVycm9ySW5mby5jb2xOdW0gKyAnOlxcbicpO1xuICBzYi5hcHBlbmQoJz4gfCAnICsgZXJyb3JJbmZvLmxpbmUgKyAnXFxuICAgICcpO1xuICBmb3IgKHZhciBpZHggPSAxOyBpZHggPCBlcnJvckluZm8uY29sTnVtOyBpZHgrKykge1xuICAgIHNiLmFwcGVuZCgnICcpO1xuICB9XG4gIHNiLmFwcGVuZCgnXlxcbicpO1xuICBzYi5hcHBlbmQoZGV0YWlsKTtcbiAgcmV0dXJuIHNiLmNvbnRlbnRzKCk7XG59XG5cbi8vIENyZWF0ZSBhIHNob3J0IGVycm9yIG1lc3NhZ2UgZm9yIGFuIGVycm9yIHRoYXQgb2NjdXJyZWQgZHVyaW5nIG1hdGNoaW5nLlxuZnVuY3Rpb24gZ2V0U2hvcnRNYXRjaEVycm9yTWVzc2FnZShwb3MsIHNvdXJjZSwgZGV0YWlsKSB7XG4gIHZhciBlcnJvckluZm8gPSB0b0Vycm9ySW5mbyhwb3MsIHNvdXJjZSk7XG4gIHJldHVybiAnTGluZSAnICsgZXJyb3JJbmZvLmxpbmVOdW0gKyAnLCBjb2wgJyArIGVycm9ySW5mby5jb2xOdW0gKyAnOiAnICsgZGV0YWlsO1xufVxuXG5mdW5jdGlvbiBkZXNjcmliZVJ1bGVTdGFja3Moc3RhY2tzKSB7XG4gIHJldHVybiBzdGFja3MubWFwKGZ1bmN0aW9uKHMpIHtcbiAgICByZXR1cm4gcy5tYXAoZnVuY3Rpb24oYXBwKSB7IHJldHVybiBhcHAucnVsZU5hbWU7IH0pLmpvaW4oJyA+ICcpO1xuICB9KS5qb2luKCc7ICcpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBydW50aW1lIGVycm9ycyAtLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgSW5maW5pdGVMb29wID0gbWFrZUN1c3RvbUVycm9yKFxuICAnb2htLmVycm9yLkluZmluaXRlTG9vcCcsXG4gIGZ1bmN0aW9uKHN0YXRlLCBleHByKSB7XG4gICAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gICAgdmFyIGRldGFpbCA9IFwiSW5maW5pdGUgbG9vcCBkZXRlY3RlZCB3aGVuIG1hdGNoaW5nICdcIiArIGV4cHIudG9EaXNwbGF5U3RyaW5nKCkgKyBcIidcIjtcbiAgICB0aGlzLm1lc3NhZ2UgPSBnZXRNYXRjaEVycm9yTWVzc2FnZShpbnB1dFN0cmVhbS5wb3MsIGlucHV0U3RyZWFtLnNvdXJjZSwgZGV0YWlsKTtcbiAgfVxuKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gZXJyb3JzIGFib3V0IGludGVydmFscyAtLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgSW50ZXJ2YWxTb3VyY2VzRG9udE1hdGNoID0gbWFrZUN1c3RvbUVycm9yKFxuICAgICdvaG0uZXJyb3IuSW50ZXJ2YWxTb3VyY2VzRG9udE1hdGNoJyxcbiAgICBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMubWVzc2FnZSA9IFwiaW50ZXJ2YWwgc291cmNlcyBkb24ndCBtYXRjaFwiO1xuICAgIH1cbik7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIGVycm9ycyBhYm91dCBncmFtbWFycyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBVbmRlY2xhcmVkIGdyYW1tYXJcblxudmFyIFVuZGVjbGFyZWRHcmFtbWFyID0gbWFrZUN1c3RvbUVycm9yKFxuICAgICdvaG0uZXJyb3IuVW5kZWNsYXJlZEdyYW1tYXInLFxuICAgIGZ1bmN0aW9uKGdyYW1tYXJOYW1lLCBuYW1lc3BhY2UpIHtcbiAgICAgIHRoaXMuZ3JhbW1hck5hbWUgPSBncmFtbWFyTmFtZTtcbiAgICAgIHRoaXMubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICAgICAgaWYgKHRoaXMubmFtZXNwYWNlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdncmFtbWFyICcgKyB0aGlzLmdyYW1tYXJOYW1lICtcbiAgICAgICAgICAgICcgaXMgbm90IGRlY2xhcmVkIGluIG5hbWVzcGFjZSAnICsgTmFtZXNwYWNlLnRvU3RyaW5nKHRoaXMubmFtZXNwYWNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICd1bmRlY2xhcmVkIGdyYW1tYXIgJyArIHRoaXMuZ3JhbW1hck5hbWU7XG4gICAgICB9XG4gICAgfVxuKTtcblxuLy8gRHVwbGljYXRlIGdyYW1tYXIgZGVjbGFyYXRpb25cblxudmFyIER1cGxpY2F0ZUdyYW1tYXJEZWNsYXJhdGlvbiA9IG1ha2VDdXN0b21FcnJvcihcbiAgICAnb2htLmVycm9yLkR1cGxpY2F0ZUdyYW1tYXJEZWNsYXJhdGlvbicsXG4gICAgZnVuY3Rpb24oZ3JhbW1hck5hbWUsIG5hbWVzcGFjZSkge1xuICAgICAgdGhpcy5ncmFtbWFyTmFtZSA9IGdyYW1tYXJOYW1lO1xuICAgICAgdGhpcy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSAnZ3JhbW1hciAnICsgdGhpcy5ncmFtbWFyTmFtZSArXG4gICAgICAgICAgJyBpcyBhbHJlYWR5IGRlY2xhcmVkIGluIG5hbWVzcGFjZSAnICsgTmFtZXNwYWNlLnRvU3RyaW5nKHRoaXMubmFtZXNwYWNlKTtcbiAgICB9XG4pO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBydWxlcyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBVbmRlY2xhcmVkIHJ1bGVcblxudmFyIFVuZGVjbGFyZWRSdWxlID0gbWFrZUN1c3RvbUVycm9yKFxuICAgICdvaG0uZXJyb3IuVW5kZWNsYXJlZFJ1bGUnLFxuICAgIGZ1bmN0aW9uKHJ1bGVOYW1lLCBvcHRHcmFtbWFyTmFtZSkge1xuICAgICAgdGhpcy5ydWxlTmFtZSA9IHJ1bGVOYW1lO1xuICAgICAgdGhpcy5ncmFtbWFyTmFtZSA9IG9wdEdyYW1tYXJOYW1lO1xuICAgICAgdGhpcy5tZXNzYWdlID0gdGhpcy5ncmFtbWFyTmFtZSA/XG4gICAgICAgICAgJ3J1bGUgJyArIHRoaXMucnVsZU5hbWUgKyAnIGlzIG5vdCBkZWNsYXJlZCBpbiBncmFtbWFyICcgKyB0aGlzLmdyYW1tYXJOYW1lIDpcbiAgICAgICAgICAndW5kZWNsYXJlZCBydWxlICcgKyB0aGlzLnJ1bGVOYW1lO1xuICAgIH1cbik7XG5cbi8vIER1cGxpY2F0ZSBydWxlIGRlY2xhcmF0aW9uXG5cbnZhciBEdXBsaWNhdGVSdWxlRGVjbGFyYXRpb24gPSBtYWtlQ3VzdG9tRXJyb3IoXG4gICAgJ29obS5lcnJvci5EdXBsaWNhdGVSdWxlRGVjbGFyYXRpb24nLFxuICAgIGZ1bmN0aW9uKHJ1bGVOYW1lLCBvZmZlbmRpbmdHcmFtbWFyTmFtZSwgZGVjbEdyYW1tYXJOYW1lKSB7XG4gICAgICB0aGlzLnJ1bGVOYW1lID0gcnVsZU5hbWU7XG4gICAgICB0aGlzLm9mZmVuZGluZ0dyYW1tYXJOYW1lID0gb2ZmZW5kaW5nR3JhbW1hck5hbWU7XG4gICAgICB0aGlzLmRlY2xHcmFtbWFyTmFtZSA9IGRlY2xHcmFtbWFyTmFtZTtcbiAgICAgIHRoaXMubWVzc2FnZSA9ICdkdXBsaWNhdGUgZGVjbGFyYXRpb24gZm9yIHJ1bGUgJyArIHRoaXMucnVsZU5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAgJyBpbiBncmFtbWFyICcgKyB0aGlzLm9mZmVuZGluZ0dyYW1tYXJOYW1lO1xuICAgICAgaWYgKHRoaXMub2ZmZW5kaW5nR3JhbW1hck5hbWUgIT09IGRlY2xHcmFtbWFyTmFtZSkge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgKz0gJyAoaXQgd2FzIG9yaWdpbmFsbHkgZGVjbGFyZWQgaW4gZ3JhbW1hciAnICsgdGhpcy5kZWNsR3JhbW1hck5hbWUgKyAnKSc7XG4gICAgICB9XG4gICAgfVxuKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gYXJpdHkgLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gSW5jb25zaXN0ZW50IGFyaXR5XG5cbnZhciBJbmNvbnNpc3RlbnRBcml0eSA9IG1ha2VDdXN0b21FcnJvcihcbiAgICAnb2htLmVycm9yLkluY29uc2lzdGVudEFyaXR5JyxcbiAgICBmdW5jdGlvbihydWxlTmFtZSwgZXhwZWN0ZWQsIGFjdHVhbCkge1xuICAgICAgdGhpcy5ydWxlTmFtZSA9IHJ1bGVOYW1lO1xuICAgICAgdGhpcy5leHBlY3RlZCA9IGV4cGVjdGVkO1xuICAgICAgdGhpcy5hY3R1YWwgPSBhY3R1YWw7XG4gICAgICB0aGlzLm1lc3NhZ2UgPVxuICAgICAgICAgICdydWxlICcgKyB0aGlzLnJ1bGVOYW1lICsgJyBpbnZvbHZlcyBhbiBhbHRlcm5hdGlvbiB3aGljaCBoYXMgaW5jb25zaXN0ZW50IGFyaXR5ICcgK1xuICAgICAgICAgICcoZXhwZWN0ZWQgJyArIHRoaXMuZXhwZWN0ZWQgKyAnLCBnb3QgJyArIHRoaXMuYWN0dWFsICsgJyknO1xuICAgIH1cbik7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIHByb3BlcnRpZXMgLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gRHVwbGljYXRlIHByb3BlcnR5IG5hbWVzXG5cbnZhciBEdXBsaWNhdGVQcm9wZXJ0eU5hbWVzID0gbWFrZUN1c3RvbUVycm9yKFxuICAgICdvaG0uZXJyb3IuRHVwbGljYXRlUHJvcGVydHlOYW1lcycsXG4gICAgZnVuY3Rpb24oZHVwbGljYXRlcykge1xuICAgICAgdGhpcy5kdXBsaWNhdGVzID0gZHVwbGljYXRlcztcbiAgICAgIHRoaXMubWVzc2FnZSA9ICdvYmplY3QgcGF0dGVybiBoYXMgZHVwbGljYXRlIHByb3BlcnR5IG5hbWVzOiAnICsgdGhpcy5kdXBsaWNhdGVzLmpvaW4oJywgJyk7XG4gICAgfVxuKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gc3ludGF4IC0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBNYXRjaEZhaWx1cmUgPSBtYWtlQ3VzdG9tRXJyb3IoXG4gICAgJ29obS5lcnJvci5NYXRjaEZhaWx1cmUnLFxuICAgIGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICBjb21tb24uZGVmaW5lTGF6eVByb3BlcnR5KHRoaXMsICdleHByc0FuZFN0YWNrcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5nZXRGYWlsdXJlcygpO1xuICAgICAgfSk7XG4gICAgICAvLyBgZGlzcGxheVN0cmluZ2AgaXMgaW50ZW5kZWQgdG8gYmUgc2hvd24gdG8gdXNlcnMgb2YgYSBncmFtbWFyLlxuICAgICAgY29tbW9uLmRlZmluZUxhenlQcm9wZXJ0eSh0aGlzLCAnZGlzcGxheVN0cmluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNZXNzYWdlKCk7XG4gICAgICB9KTtcbiAgICAgIC8vIGBtZXNzYWdlYCBpcyBpbnRlbmRlZCB0byBiZSBzaG93biB0byBkZXZlbG9wZXJzIG9mIGEgZ3JhbW1hci5cbiAgICAgIGNvbW1vbi5kZWZpbmVMYXp5UHJvcGVydHkodGhpcywgJ21lc3NhZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWVzc2FnZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cbik7XG5cbk1hdGNoRmFpbHVyZS5wcm90b3R5cGUuZ2V0U2hvcnRNZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0eXBlb2YgdGhpcy5zdGF0ZS5pbnB1dFN0cmVhbS5zb3VyY2UgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuICdtYXRjaCBmYWlsZWQgYXQgcG9zaXRpb24gJyArIHRoaXMuZ2V0UG9zKCk7XG4gIH1cbiAgdmFyIGRldGFpbCA9ICdleHBlY3RlZCcgKyB0aGlzLmdldEV4cGVjdGVkVGV4dCgpO1xuICByZXR1cm4gZ2V0U2hvcnRNYXRjaEVycm9yTWVzc2FnZSh0aGlzLmdldFBvcygpLCB0aGlzLnN0YXRlLmlucHV0U3RyZWFtLnNvdXJjZSwgZGV0YWlsKTtcbn07XG5cbk1hdGNoRmFpbHVyZS5wcm90b3R5cGUuZ2V0TWVzc2FnZSA9IGZ1bmN0aW9uKG9wdEluY2x1ZGVSdWxlcykge1xuICB2YXIgc291cmNlID0gdGhpcy5zdGF0ZS5pbnB1dFN0cmVhbS5zb3VyY2U7XG4gIGlmICh0eXBlb2Ygc291cmNlICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAnbWF0Y2ggZmFpbGVkIGF0IHBvc2l0aW9uICcgKyB0aGlzLmdldFBvcygpO1xuICB9XG5cbiAgdmFyIGRldGFpbCA9ICdFeHBlY3RlZCAnICsgdGhpcy5nZXRFeHBlY3RlZFRleHQoISFvcHRJbmNsdWRlUnVsZXMpO1xuICByZXR1cm4gZ2V0TWF0Y2hFcnJvck1lc3NhZ2UodGhpcy5nZXRQb3MoKSwgc291cmNlLCBkZXRhaWwpO1xufTtcblxuTWF0Y2hGYWlsdXJlLnByb3RvdHlwZS5nZXRQb3MgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc3RhdGUuZ2V0RmFpbHVyZXNQb3MoKTtcbn07XG5cbi8vIFJldHVybiBhIHN0cmluZyBzdW1tYXJpemluZyB0aGUgZXhwZWN0ZWQgY29udGVudHMgb2YgdGhlIGlucHV0IHN0cmVhbSB3aGVuXG4vLyB0aGUgbWF0Y2ggZmFpbHVyZSBvY2N1cnJlZC4gSWYgYGluY2x1ZGVSdWxlc2AgaXMgdHJ1ZSwgdGhlIHN0cmluZyB3aWxsXG4vLyBpbmNsdWRlIGluZm9ybWF0aW9uIGFib3V0IHRoZSBydWxlIHN0YWNrcyBmb3IgZWFjaCB0ZXJtaW5hbCBvciBydWxlLlxuTWF0Y2hGYWlsdXJlLnByb3RvdHlwZS5nZXRFeHBlY3RlZFRleHQgPSBmdW5jdGlvbihpbmNsdWRlUnVsZXMpIHtcbiAgdmFyIHNiID0gbmV3IGNvbW1vbi5TdHJpbmdCdWZmZXIoKTtcbiAgdmFyIGV4cGVjdGVkID0gaW5jbHVkZVJ1bGVzID8gdGhpcy5nZXRFeHBlY3RlZFdpdGhSdWxlcygpIDogdGhpcy5nZXRFeHBlY3RlZCgpO1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBleHBlY3RlZC5sZW5ndGg7IGlkeCsrKSB7XG4gICAgaWYgKGlkeCA+IDApIHtcbiAgICAgIGlmIChpZHggPT09IGV4cGVjdGVkLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgc2IuYXBwZW5kKChleHBlY3RlZC5sZW5ndGggPiAyID8gJywgb3IgJyA6ICcgb3IgJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2IuYXBwZW5kKCcsICcpO1xuICAgICAgfVxuICAgIH1cbiAgICBzYi5hcHBlbmQoZXhwZWN0ZWRbaWR4XSk7XG4gIH1cbiAgcmV0dXJuIHNiLmNvbnRlbnRzKCk7XG59O1xuXG4vLyBSZXR1cm4gYW4gQXJyYXkgb2YgdW5pcXVlIHN0cmluZ3MgcmVwcmVzZW50aW5nIHRoZSB0ZXJtaW5hbHMgb3IgcnVsZXMgdGhhdFxuLy8gd2VyZSBleHBlY3RlZCB0byBiZSBtYXRjaGVkLlxuTWF0Y2hGYWlsdXJlLnByb3RvdHlwZS5nZXRFeHBlY3RlZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZXhwZWN0ZWQgPSB7fTtcbiAgdmFyIHJ1bGVEaWN0ID0gdGhpcy5zdGF0ZS5ncmFtbWFyLnJ1bGVEaWN0O1xuICB0aGlzLmV4cHJzQW5kU3RhY2tzLmZvckVhY2goZnVuY3Rpb24ob2JqKSB7XG4gICAgZXhwZWN0ZWRbb2JqLmV4cHIudG9FeHBlY3RlZChydWxlRGljdCldID0gdHJ1ZTtcbiAgfSk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhleHBlY3RlZCk7XG59O1xuXG4vLyBSZXR1cm4gYW4gQXJyYXkgb2Ygc3RyaW5ncyByZXByZXNlbnRpbmcgdGhlIHRlcm1pbmFscyBvciBydWxlcyB0aGF0IHdlcmVcbi8vIGV4cGVjdGVkIHRvIGJlIG1hdGNoZWQsIGFzIHdlbGwgYXMgaW5mb3JtYXRpb24gYWJvdXQgZWFjaCBydWxlIHN0YWNrLlxuTWF0Y2hGYWlsdXJlLnByb3RvdHlwZS5nZXRFeHBlY3RlZFdpdGhSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYW5zID0gW107XG4gIHZhciBydWxlRGljdCA9IHRoaXMuc3RhdGUuZ3JhbW1hci5ydWxlRGljdDtcbiAgdGhpcy5leHByc0FuZFN0YWNrcy5mb3JFYWNoKGZ1bmN0aW9uKG9iaikge1xuICAgIGFucy5wdXNoKG9iai5leHByLnRvRXhwZWN0ZWQocnVsZURpY3QpICsgJyAoJyArIGRlc2NyaWJlUnVsZVN0YWNrcyhvYmouc3RhY2tzKSArICcpJyk7XG4gIH0sIHRoaXMpO1xuICByZXR1cm4gYW5zO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gY29uc3RydWN0b3JzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFR5cGUgZXJyb3JcblxudmFyIEludmFsaWRDb25zdHJ1Y3RvckNhbGwgPSBtYWtlQ3VzdG9tRXJyb3IoXG4gICAgJ29obS5lcnJvci5JbnZhbGlkQ29uc3RydWN0b3JDYWxsJyxcbiAgICBmdW5jdGlvbihncmFtbWFyLCBjdG9yTmFtZSwgY2hpbGRyZW4pIHtcbiAgICAgIHRoaXMuZ3JhbW1hciA9IGdyYW1tYXI7XG4gICAgICB0aGlzLmN0b3JOYW1lID0gY3Rvck5hbWU7XG4gICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICB0aGlzLm1lc3NhZ2UgPSAnQXR0ZW1wdCB0byBpbnZva2UgY29uc3RydWN0b3IgJyArIHRoaXMuY3Rvck5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAgJyB3aXRoIGludmFsaWQgb3IgdW5leHBlY3RlZCBhcmd1bWVudHMnO1xuICAgIH1cbik7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgRXJyb3I6IE9obUVycm9yLFxuICBJbmZpbml0ZUxvb3A6IEluZmluaXRlTG9vcCxcbiAgSW50ZXJ2YWxTb3VyY2VzRG9udE1hdGNoOiBJbnRlcnZhbFNvdXJjZXNEb250TWF0Y2gsXG4gIFVuZGVjbGFyZWRHcmFtbWFyOiBVbmRlY2xhcmVkR3JhbW1hcixcbiAgRHVwbGljYXRlR3JhbW1hckRlY2xhcmF0aW9uOiBEdXBsaWNhdGVHcmFtbWFyRGVjbGFyYXRpb24sXG4gIFVuZGVjbGFyZWRSdWxlOiBVbmRlY2xhcmVkUnVsZSxcbiAgRHVwbGljYXRlUnVsZURlY2xhcmF0aW9uOiBEdXBsaWNhdGVSdWxlRGVjbGFyYXRpb24sXG4gIEluY29uc2lzdGVudEFyaXR5OiBJbmNvbnNpc3RlbnRBcml0eSxcbiAgRHVwbGljYXRlUHJvcGVydHlOYW1lczogRHVwbGljYXRlUHJvcGVydHlOYW1lcyxcbiAgTWF0Y2hGYWlsdXJlOiBNYXRjaEZhaWx1cmUsXG4gIEludmFsaWRDb25zdHJ1Y3RvckNhbGw6IEludmFsaWRDb25zdHJ1Y3RvckNhbGxcbn07XG4iLCIvKiBnbG9iYWwgWE1MSHR0cFJlcXVlc3QgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIEJ1aWxkZXIgPSByZXF1aXJlKCcuL0J1aWxkZXIuanMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzLmpzJyk7XG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycy5qcycpO1xuXG52YXIgTmFtZXNwYWNlID0gcmVxdWlyZSgnLi9OYW1lc3BhY2UuanMnKTtcbnZhciBVbmljb2RlQ2F0ZWdvcmllcyA9IHJlcXVpcmUoJy4uL3RoaXJkX3BhcnR5L3VuaWNvZGUuanMnKS5Vbmljb2RlQ2F0ZWdvcmllcztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFRoZSBtZXRhZ3JhbW1hciwgaS5lLiB0aGUgZ3JhbW1hciBmb3IgT2htIGdyYW1tYXJzLiBJbml0aWFsaXplZCBhdCB0aGVcbi8vIGJvdHRvbSBvZiB0aGlzIGZpbGUgYmVjYXVzZSBsb2FkaW5nIHRoZSBncmFtbWFyIHJlcXVpcmVzIE9obSBpdHNlbGYuXG52YXIgb2htR3JhbW1hcjtcblxuLy8gQ2hlY2sgaWYgYG9iamAgaXMgYSBET00gZWxlbWVudC5cbmZ1bmN0aW9uIGlzRWxlbWVudChvYmopIHtcbiAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT09IDEpO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gdm9pZCAwO1xufVxuXG4vLyBUT0RPOiBqdXN0IHVzZSB0aGUgalF1ZXJ5IHRoaW5nXG5mdW5jdGlvbiBsb2FkKHVybCkge1xuICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHJlcS5vcGVuKCdHRVQnLCB1cmwsIGZhbHNlKTtcbiAgdHJ5IHtcbiAgICByZXEuc2VuZCgpO1xuICAgIGlmIChyZXEuc3RhdHVzID09PSAwIHx8IHJlcS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgcmV0dXJuIHJlcS5yZXNwb25zZVRleHQ7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7fVxuICB0aHJvdyBuZXcgRXJyb3IoJ3VuYWJsZSB0byBsb2FkIHVybCAnICsgdXJsKTtcbn1cblxuLy8gUmV0dXJucyBhIEdyYW1tYXIgaW5zdGFuY2UgKGkuZS4sIGFuIG9iamVjdCB3aXRoIGEgYG1hdGNoYCBtZXRob2QpIGZvclxuLy8gYHRyZWVgLCB3aGljaCBpcyB0aGUgY29uY3JldGUgc3ludGF4IHRyZWUgb2YgYSB1c2VyLXdyaXR0ZW4gZ3JhbW1hci5cbi8vIFRoZSBncmFtbWFyIHdpbGwgYmUgYXNzaWduZWQgaW50byBgbmFtZXNwYWNlYCB1bmRlciB0aGUgbmFtZSBvZiB0aGUgZ3JhbW1hclxuLy8gYXMgc3BlY2lmaWVkIGluIHRoZSBzb3VyY2UuXG5mdW5jdGlvbiBidWlsZEdyYW1tYXIodHJlZSwgbmFtZXNwYWNlLCBvcHRPaG1HcmFtbWFyRm9yVGVzdGluZykge1xuICB2YXIgYnVpbGRlcjtcbiAgdmFyIGRlY2w7XG4gIHZhciBjdXJyZW50UnVsZU5hbWU7XG4gIHZhciBvdmVycmlkaW5nID0gZmFsc2U7XG4gIHZhciBtZXRhR3JhbW1hciA9IG9wdE9obUdyYW1tYXJGb3JUZXN0aW5nIHx8IG9obUdyYW1tYXI7XG5cbiAgLy8gQSBzZXQgb2Ygc2VtYW50aWMgYWN0aW9ucyB0aGF0IHByb2R1Y2VzIGEgR3JhbW1hciBpbnN0YW5jZSBmcm9tIHRoZSBDU1QuXG4gIHZhciB2YWx1ZSA9IG1ldGFHcmFtbWFyLnNlbWFudGljQWN0aW9uKHtcbiAgICBHcmFtbWFyOiBmdW5jdGlvbihuLCBzLCBvcGVuLCBycywgY2xvc2UpIHtcbiAgICAgIGJ1aWxkZXIgPSBuZXcgQnVpbGRlcigpO1xuICAgICAgdmFyIGdyYW1tYXJOYW1lID0gdmFsdWUobik7XG4gICAgICBkZWNsID0gYnVpbGRlci5uZXdHcmFtbWFyKGdyYW1tYXJOYW1lLCBuYW1lc3BhY2UpO1xuICAgICAgdmFsdWUocyk7ICAvLyBmb3JjZSBldmFsdWF0aW9uXG4gICAgICB2YWx1ZShycyk7ICAvLyBmb3JjZSBldmFsdWF0aW9uXG4gICAgICB2YXIgZyA9IGRlY2wuYnVpbGQoKTtcbiAgICAgIC8vIEZJWE1FOiBNYXliZSBwdXNoIHRoaXMgY2hlY2sgdG8gR3JhbW1hckRlY2wgb3IgR3JhbW1hci5cbiAgICAgIGlmIChncmFtbWFyTmFtZSBpbiBuYW1lc3BhY2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5EdXBsaWNhdGVHcmFtbWFyRGVjbGFyYXRpb24oZ3JhbW1hck5hbWUsIG5hbWVzcGFjZSk7XG4gICAgICB9XG4gICAgICBuYW1lc3BhY2VbZ3JhbW1hck5hbWVdID0gZztcbiAgICAgIHJldHVybiBnO1xuICAgIH0sXG5cbiAgICBTdXBlckdyYW1tYXI6IGZ1bmN0aW9uKF8sIG4pIHtcbiAgICAgIHZhciBzdXBlckdyYW1tYXJOYW1lID0gdmFsdWUobik7XG4gICAgICAvLyBGSVhNRTogTWF5YmUgcHVzaCB0aGlzIGNoZWNrIHRvIEdyYW1tYXJEZWNsLlxuICAgICAgaWYgKCFuYW1lc3BhY2UgfHwgIShzdXBlckdyYW1tYXJOYW1lIGluIG5hbWVzcGFjZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5VbmRlY2xhcmVkR3JhbW1hcihzdXBlckdyYW1tYXJOYW1lLCBuYW1lc3BhY2UpO1xuICAgICAgfVxuICAgICAgZGVjbC53aXRoU3VwZXJHcmFtbWFyKG5hbWVzcGFjZVtzdXBlckdyYW1tYXJOYW1lXSk7XG4gICAgfSxcblxuICAgIFJ1bGVfZGVmaW5lOiBmdW5jdGlvbihuLCBmcywgZCwgXywgYikge1xuICAgICAgY3VycmVudFJ1bGVOYW1lID0gdmFsdWUobik7XG4gICAgICB2YXIgYm9keSA9IHZhbHVlKGIpO1xuICAgICAgYm9keS5kZWZpbml0aW9uSW50ZXJ2YWwgPSB0aGlzLmludGVydmFsLnRyaW1tZWQoKTtcbiAgICAgIHJldHVybiBkZWNsLmRlZmluZShjdXJyZW50UnVsZU5hbWUsIGJvZHksIHZhbHVlKGQpKTtcbiAgICB9LFxuICAgIFJ1bGVfb3ZlcnJpZGU6IGZ1bmN0aW9uKG4sIGZzLCBfLCBiKSB7XG4gICAgICBjdXJyZW50UnVsZU5hbWUgPSB2YWx1ZShuKTtcbiAgICAgIG92ZXJyaWRpbmcgPSB0cnVlO1xuICAgICAgdmFyIGJvZHkgPSB2YWx1ZShiKTtcbiAgICAgIGJvZHkuZGVmaW5pdGlvbkludGVydmFsID0gdGhpcy5pbnRlcnZhbC50cmltbWVkKCk7XG4gICAgICB2YXIgYW5zID0gZGVjbC5vdmVycmlkZShjdXJyZW50UnVsZU5hbWUsIGJvZHkpO1xuICAgICAgb3ZlcnJpZGluZyA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGFucztcbiAgICB9LFxuICAgIFJ1bGVfZXh0ZW5kOiBmdW5jdGlvbihuLCBmcywgXywgYikge1xuICAgICAgY3VycmVudFJ1bGVOYW1lID0gdmFsdWUobik7XG4gICAgICB2YXIgYW5zID0gZGVjbC5leHRlbmQoY3VycmVudFJ1bGVOYW1lLCB2YWx1ZShiKSk7XG4gICAgICBkZWNsLnJ1bGVEaWN0W2N1cnJlbnRSdWxlTmFtZV0uZGVmaW5pdGlvbkludGVydmFsID0gdGhpcy5pbnRlcnZhbC50cmltbWVkKCk7XG4gICAgICByZXR1cm4gYW5zO1xuICAgIH0sXG5cbiAgICBBbHQ6IGZ1bmN0aW9uKHRlcm0sIF8sIHRlcm1zKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5hbHQuYXBwbHkoXG4gICAgICAgICAgYnVpbGRlciwgW3ZhbHVlKHRlcm0pXS5jb25jYXQodmFsdWUodGVybXMpKSkud2l0aEludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgIH0sXG5cbiAgICBUZXJtX2lubGluZTogZnVuY3Rpb24oYiwgbikge1xuICAgICAgdmFyIGlubGluZVJ1bGVOYW1lID0gY3VycmVudFJ1bGVOYW1lICsgJ18nICsgdmFsdWUobik7XG4gICAgICB2YXIgYm9keSA9IHZhbHVlKGIpO1xuICAgICAgYm9keS5kZWZpbml0aW9uSW50ZXJ2YWwgPSB0aGlzLmludGVydmFsLnRyaW1tZWQoKTtcbiAgICAgIGlmIChvdmVycmlkaW5nKSB7XG4gICAgICAgIGRlY2wub3ZlcnJpZGUoaW5saW5lUnVsZU5hbWUsIGJvZHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVjbC5kZWZpbmUoaW5saW5lUnVsZU5hbWUsIGJvZHkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJ1aWxkZXIuYXBwKGlubGluZVJ1bGVOYW1lKS53aXRoSW50ZXJ2YWwoYm9keS5pbnRlcnZhbCk7XG4gICAgfSxcblxuICAgIFNlcTogZnVuY3Rpb24oZXhwcikge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIuc2VxLmFwcGx5KGJ1aWxkZXIsIHZhbHVlKGV4cHIpKS53aXRoSW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgfSxcblxuICAgIEl0ZXJfc3RhcjogZnVuY3Rpb24oeCwgXykge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIubWFueSh2YWx1ZSh4KSwgMCkud2l0aEludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgIH0sXG4gICAgSXRlcl9wbHVzOiBmdW5jdGlvbih4LCBfKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5tYW55KHZhbHVlKHgpLCAxKS53aXRoSW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgfSxcbiAgICBJdGVyX29wdDogZnVuY3Rpb24oeCwgXykge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIub3B0KHZhbHVlKHgpKS53aXRoSW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgfSxcblxuICAgIFByZWRfbm90OiBmdW5jdGlvbihfLCB4KSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5ub3QodmFsdWUoeCkpLndpdGhJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICB9LFxuICAgIFByZWRfbG9va2FoZWFkOiBmdW5jdGlvbihfLCB4KSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5sYSh2YWx1ZSh4KSkud2l0aEludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgIH0sXG5cbiAgICBCYXNlX2FwcGxpY2F0aW9uOiBmdW5jdGlvbihydWxlLCBwcykge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIuYXBwKHZhbHVlKHJ1bGUpKS53aXRoSW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgfSxcbiAgICBCYXNlX3ByaW06IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICAgIHJldHVybiBidWlsZGVyLnByaW0odmFsdWUoZXhwcikpLndpdGhJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICB9LFxuICAgIEJhc2VfcGFyZW46IGZ1bmN0aW9uKG9wZW4sIHgsIGNsb3NlKSB7XG4gICAgICByZXR1cm4gdmFsdWUoeCk7XG4gICAgfSxcbiAgICBCYXNlX2FycjogZnVuY3Rpb24ob3BlbiwgeCwgY2xvc2UpIHtcbiAgICAgIHJldHVybiBidWlsZGVyLmFycih2YWx1ZSh4KSkud2l0aEludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgIH0sXG4gICAgQmFzZV9zdHI6IGZ1bmN0aW9uKG9wZW4sIHgsIGNsb3NlKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5zdHIodmFsdWUoeCkpO1xuICAgIH0sXG4gICAgQmFzZV9vYmo6IGZ1bmN0aW9uKG9wZW4sIGxlbmllbnQsIGNsb3NlKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5vYmooW10sIHZhbHVlKGxlbmllbnQpKTtcbiAgICB9LFxuICAgIEJhc2Vfb2JqV2l0aFByb3BzOiBmdW5jdGlvbihvcGVuLCBwcywgXywgbGVuaWVudCwgY2xvc2UpIHtcbiAgICAgIHJldHVybiBidWlsZGVyLm9iaih2YWx1ZShwcyksIHZhbHVlKGxlbmllbnQpKS53aXRoSW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgfSxcblxuICAgIFByb3BzOiBmdW5jdGlvbihwLCBfLCBwcykge1xuICAgICAgcmV0dXJuIFt2YWx1ZShwKV0uY29uY2F0KHZhbHVlKHBzKSk7XG4gICAgfSxcbiAgICBQcm9wOiBmdW5jdGlvbihuLCBfLCBwKSB7XG4gICAgICByZXR1cm4ge25hbWU6IHZhbHVlKG4pLCBwYXR0ZXJuOiB2YWx1ZShwKX07XG4gICAgfSxcblxuICAgIHJ1bGVEZXNjcjogZnVuY3Rpb24ob3BlbiwgdCwgY2xvc2UpIHtcbiAgICAgIHJldHVybiB2YWx1ZSh0KTtcbiAgICB9LFxuICAgIHJ1bGVEZXNjclRleHQ6IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiB0aGlzLmludGVydmFsLmNvbnRlbnRzLnRyaW0oKTtcbiAgICB9LFxuXG4gICAgY2FzZU5hbWU6IGZ1bmN0aW9uKF8sIHNwYWNlMSwgbiwgc3BhY2UyLCBlbmQpIHtcbiAgICAgIHJldHVybiB2YWx1ZShuKTtcbiAgICB9LFxuXG4gICAgbmFtZTogZnVuY3Rpb24oZmlyc3QsIHJlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLmludGVydmFsLmNvbnRlbnRzO1xuICAgIH0sXG4gICAgbmFtZUZpcnN0OiBmdW5jdGlvbihleHByKSB7fSxcbiAgICBuYW1lUmVzdDogZnVuY3Rpb24oZXhwcikge30sXG5cbiAgICBrZXl3b3JkX3VuZGVmaW5lZDogZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIGtleXdvcmRfbnVsbDogZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBrZXl3b3JkX3RydWU6IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAga2V5d29yZF9mYWxzZTogZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzdHJpbmc6IGZ1bmN0aW9uKG9wZW4sIGNzLCBjbG9zZSkge1xuICAgICAgcmV0dXJuIHZhbHVlKGNzKS5tYXAoZnVuY3Rpb24oYykgeyByZXR1cm4gY29tbW9uLnVuZXNjYXBlQ2hhcihjKTsgfSkuam9pbignJyk7XG4gICAgfSxcblxuICAgIHN0ckNoYXI6IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiB0aGlzLmludGVydmFsLmNvbnRlbnRzO1xuICAgIH0sXG5cbiAgICBlc2NhcGVDaGFyOiBmdW5jdGlvbihfKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnRlcnZhbC5jb250ZW50cztcbiAgICB9LFxuXG4gICAgcmVnRXhwOiBmdW5jdGlvbihvcGVuLCBlLCBjbG9zZSkge1xuICAgICAgcmV0dXJuIHZhbHVlKGUpO1xuICAgIH0sXG5cbiAgICByZUNoYXJDbGFzc191bmljb2RlOiBmdW5jdGlvbihvcGVuLCB1bmljb2RlQ2xhc3MsIGNsb3NlKSB7XG4gICAgICByZXR1cm4gVW5pY29kZUNhdGVnb3JpZXNbdmFsdWUodW5pY29kZUNsYXNzKS5qb2luKCcnKV07XG4gICAgfSxcbiAgICByZUNoYXJDbGFzc19vcmRpbmFyeTogZnVuY3Rpb24ob3BlbiwgXywgY2xvc2UpIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKHRoaXMuaW50ZXJ2YWwuY29udGVudHMpO1xuICAgIH0sXG5cbiAgICBudW1iZXI6IGZ1bmN0aW9uKF8sIGRpZ2l0cykge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuaW50ZXJ2YWwuY29udGVudHMpO1xuICAgIH0sXG5cbiAgICBzcGFjZTogZnVuY3Rpb24oZXhwcikge30sXG4gICAgc3BhY2VfbXVsdGlMaW5lOiBmdW5jdGlvbihzdGFydCwgXywgZW5kKSB7fSxcbiAgICBzcGFjZV9zaW5nbGVMaW5lOiBmdW5jdGlvbihzdGFydCwgXywgZW5kKSB7fSxcblxuICAgIF9tYW55OiBhdHRyaWJ1dGVzLmFjdGlvbnMubWFrZUFycmF5LFxuICAgIF90ZXJtaW5hbDogYXR0cmlidXRlcy5hY3Rpb25zLmdldFZhbHVlLFxuICAgIF9kZWZhdWx0OiBhdHRyaWJ1dGVzLmFjdGlvbnMucGFzc1Rocm91Z2hcbiAgfSk7XG4gIHJldHVybiB2YWx1ZSh0cmVlKTtcbn1cblxuZnVuY3Rpb24gY29tcGlsZUFuZExvYWQoc291cmNlLCB3aGF0SXRJcywgbmFtZXNwYWNlKSB7XG4gIHRyeSB7XG4gICAgdmFyIG5vZGUgPSBvaG1HcmFtbWFyLm1hdGNoKHNvdXJjZSwgd2hhdEl0SXMsIHRydWUpO1xuICAgIHJldHVybiBidWlsZEdyYW1tYXIobm9kZSwgbmFtZXNwYWNlKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgZXJyb3JzLk1hdGNoRmFpbHVyZSkge1xuICAgICAgY29uc29sZS5sb2coJ1xcbicgKyBlLmdldE1lc3NhZ2UoKSk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfVxufVxuXG4vLyBSZXR1cm4gdGhlIGNvbnRlbnRzIG9mIGEgc2NyaXB0IGVsZW1lbnQsIGZldGNoaW5nIGl0IHZpYSBYSFIgaWYgbmVjZXNzYXJ5LlxuZnVuY3Rpb24gZ2V0U2NyaXB0RWxlbWVudENvbnRlbnRzKGVsKSB7XG4gIGlmICghaXNFbGVtZW50KGVsKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgRE9NIE5vZGUnKTtcbiAgfVxuICBpZiAoZWwudHlwZSAhPT0gJ3RleHQvb2htLWpzJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcInNjcmlwdCB0YWcncyB0eXBlIGF0dHJpYnV0ZSBtdXN0IGJlIHRleHQvb2htLWpzXCIpO1xuICB9XG4gIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ3NyYycpID8gbG9hZChlbC5nZXRBdHRyaWJ1dGUoJ3NyYycpKSA6IGVsLmlubmVySFRNTDtcbn1cblxuZnVuY3Rpb24gbWFrZUdyYW1tYXIoc3RyaW5nT3JOb2RlLCBvcHROYW1lc3BhY2UpIHtcbiAgdmFyIG5zID0gTmFtZXNwYWNlLmV4dGVuZChOYW1lc3BhY2UuYXNOYW1lc3BhY2Uob3B0TmFtZXNwYWNlKSk7XG4gIHZhciBzb3VyY2UgPSB0eXBlb2Ygc3RyaW5nT3JOb2RlID09PSAnc3RyaW5nJyA/IHN0cmluZ09yTm9kZSA6IFtzdHJpbmdPck5vZGVdO1xuICBtYWtlKHNvdXJjZSwgJ0dyYW1tYXInLCBucyk7XG4gIHJldHVybiBuc1tPYmplY3Qua2V5cyhucylbMF1dOyAgLy8gUmV0dXJuIHRoZSBvbmUgYW5kIG9ubHkgcHJvcGVydHkuXG59XG5cbmZ1bmN0aW9uIG1ha2VHcmFtbWFycyhzdHJpbmdPck5vZGVMaXN0LCBvcHROYW1lc3BhY2UpIHtcbiAgdmFyIG5zID0gTmFtZXNwYWNlLmV4dGVuZChOYW1lc3BhY2UuYXNOYW1lc3BhY2Uob3B0TmFtZXNwYWNlKSk7XG4gIG1ha2Uoc3RyaW5nT3JOb2RlTGlzdCwgJ0dyYW1tYXJzJywgbnMpO1xuICByZXR1cm4gbnM7XG59XG5cbi8vIE1ha2VzIGEgZ3JhbW1hciBvciBncmFtbWFycyBmcm9tIGBzb3VyY2VgLCB3aGljaCBtYXkgYmUgYSBzdHJpbmcsIE5vZGVMaXN0LCBvciBBcnJheS5cbmZ1bmN0aW9uIG1ha2Uoc291cmNlLCB3aGF0SXRJcywgbmFtZXNwYWNlKSB7XG4gIGlmICghc291cmNlIHx8IGlzVW5kZWZpbmVkKHNvdXJjZS5sZW5ndGgpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc3RyaW5nIG9yIE5vZGVMaXN0IGFzIGZpcnN0IGFyZ3VtZW50Jyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgY29tcGlsZUFuZExvYWQoc291cmNlLCB3aGF0SXRJcywgbmFtZXNwYWNlKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7ICsraSkge1xuICAgICAgY29tcGlsZUFuZExvYWQoZ2V0U2NyaXB0RWxlbWVudENvbnRlbnRzKHNvdXJjZVtpXSksIHdoYXRJdElzLCBuYW1lc3BhY2UpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtYWtlUmVjaXBlKHJlY2lwZUZuKSB7XG4gIHJldHVybiByZWNpcGVGbi5jYWxsKG5ldyBCdWlsZGVyKCkpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gU3R1ZmYgdGhhdCB1c2VycyBzaG91bGQga25vdyBhYm91dFxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWN0aW9uczogYXR0cmlidXRlcy5hY3Rpb25zLFxuICBjcmVhdGVOYW1lc3BhY2U6IE5hbWVzcGFjZS5jcmVhdGVOYW1lc3BhY2UsXG4gIGVycm9yOiBlcnJvcnMsXG4gIG1ha2VHcmFtbWFyOiBtYWtlR3JhbW1hcixcbiAgbWFrZUdyYW1tYXJzOiBtYWtlR3JhbW1hcnMsXG4gIG1ha2VSZWNpcGU6IG1ha2VSZWNpcGVcbn07XG5cbi8vIFN0dWZmIHRoYXQncyBvbmx5IGhlcmUgZm9yIGJvb3RzdHJhcHBpbmcsIHRlc3RpbmcsIGV0Yy5cbm9obUdyYW1tYXIgPSByZXF1aXJlKCcuLi9kaXN0L29obS1ncmFtbWFyLmpzJyk7XG5tb2R1bGUuZXhwb3J0cy5fYnVpbGRHcmFtbWFyID0gYnVpbGRHcmFtbWFyO1xubW9kdWxlLmV4cG9ydHMub2htR3JhbW1hciA9IG9obUdyYW1tYXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycy5qcycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24gPSBjb21tb24uYWJzdHJhY3Q7XG5cbnBleHBycy5hbnl0aGluZy5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24gPSBmdW5jdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKSB7XG4gIC8vIG5vLW9wXG59O1xuXG5wZXhwcnMuZW5kLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbiA9IGZ1bmN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5QcmltLnByb3RvdHlwZS5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24gPSBmdW5jdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKSB7XG4gIC8vIG5vLW9wXG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24gPSBmdW5jdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKSB7XG4gIHZhciBhbnMgPSBmYWxzZTtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy50ZXJtcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdmFyIHRlcm0gPSB0aGlzLnRlcm1zW2lkeF07XG4gICAgYW5zIHw9IHRlcm0uYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpO1xuICB9XG4gIHJldHVybiBhbnM7XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24gPSBmdW5jdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKSB7XG4gIHZhciBhbnMgPSBmYWxzZTtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5mYWN0b3JzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB2YXIgZmFjdG9yID0gdGhpcy5mYWN0b3JzW2lkeF07XG4gICAgYW5zIHw9IGZhY3Rvci5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCk7XG4gIH1cbiAgcmV0dXJuIGFucztcbn07XG5cbnBleHBycy5NYW55LnByb3RvdHlwZS5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24gPSBmdW5jdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpO1xufTtcblxucGV4cHJzLk9wdC5wcm90b3R5cGUuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uID0gZnVuY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCkge1xuICByZXR1cm4gdGhpcy5leHByLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKTtcbn07XG5cbnBleHBycy5Ob3QucHJvdG90eXBlLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbiA9IGZ1bmN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24oZGljdCwgZmFsc2UpO1xufTtcblxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uID0gZnVuY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCkge1xuICByZXR1cm4gdGhpcy5leHByLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKTtcbn07XG5cbnBleHBycy5BcnIucHJvdG90eXBlLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbiA9IGZ1bmN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCk7XG59O1xuXG5wZXhwcnMuU3RyLnByb3RvdHlwZS5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24gPSBmdW5jdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpO1xufTtcblxucGV4cHJzLk9iai5wcm90b3R5cGUuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uID0gZnVuY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCkge1xuICByZXR1cm4gdGhpcy5leHByLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uID0gZnVuY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCkge1xuICBpZiAoIXZhbHVlUmVxdWlyZWQgfHwgZGljdFt0aGlzLnJ1bGVOYW1lXSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBkaWN0W3RoaXMucnVsZU5hbWVdID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMuanMnKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycy5qcycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGNvbW1vbi5hYnN0cmFjdDtcblxucGV4cHJzLmFueXRoaW5nLmFzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLmVuZC5hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5QcmltLnByb3RvdHlwZS5hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmFzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnRlcm1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzLnRlcm1zW2lkeF0uYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQoZ3JhbW1hcik7XG4gIH1cbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLmFzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXMuZmFjdG9yc1tpZHhdLmFzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkKGdyYW1tYXIpO1xuICB9XG59O1xuXG5wZXhwcnMuTWFueS5wcm90b3R5cGUuYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHRoaXMuZXhwci5hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZChncmFtbWFyKTtcbn07XG5cbnBleHBycy5PcHQucHJvdG90eXBlLmFzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICB0aGlzLmV4cHIuYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQoZ3JhbW1hcik7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS5hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgdGhpcy5leHByLmFzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkKGdyYW1tYXIpO1xufTtcblxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHRoaXMuZXhwci5hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZChncmFtbWFyKTtcbn07XG5cbnBleHBycy5BcnIucHJvdG90eXBlLmFzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICB0aGlzLmV4cHIuYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQoZ3JhbW1hcik7XG59O1xuXG5wZXhwcnMuU3RyLnByb3RvdHlwZS5hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgdGhpcy5leHByLmFzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkKGdyYW1tYXIpO1xufTtcblxucGV4cHJzLk9iai5wcm90b3R5cGUuYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMucHJvcGVydGllcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzW2lkeF0ucGF0dGVybi5hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZChncmFtbWFyKTtcbiAgfVxufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgaWYgKCFncmFtbWFyLnJ1bGVEaWN0W3RoaXMucnVsZU5hbWVdKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5VbmRlY2xhcmVkUnVsZSh0aGlzLnJ1bGVOYW1lLCBncmFtbWFyLm5hbWUpO1xuICB9XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycy5qcycpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzLmpzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID0gY29tbW9uLmFic3RyYWN0O1xuXG5wZXhwcnMuYW55dGhpbmcuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLmVuZC5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIG5vLW9wXG59O1xuXG5wZXhwcnMuUHJpbS5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICBpZiAodGhpcy50ZXJtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGFyaXR5ID0gdGhpcy50ZXJtc1swXS5nZXRBcml0eSgpO1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnRlcm1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICB2YXIgdGVybSA9IHRoaXMudGVybXNbaWR4XTtcbiAgICB0ZXJtLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5KCk7XG4gICAgdmFyIG90aGVyQXJpdHkgPSB0ZXJtLmdldEFyaXR5KCk7XG4gICAgaWYgKGFyaXR5ICE9PSBvdGhlckFyaXR5KSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLkluY29uc2lzdGVudEFyaXR5KHJ1bGVOYW1lLCBhcml0eSwgb3RoZXJBcml0eSk7XG4gICAgfVxuICB9XG59O1xuXG5wZXhwcnMuRXh0ZW5kLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIEV4dGVuZCBpcyBhIHNwZWNpYWwgY2FzZSBvZiBBbHQgdGhhdCdzIGd1YXJhbnRlZWQgdG8gaGF2ZSBleGFjdGx5IHR3b1xuICAvLyBjYXNlczogW2V4dGVuc2lvbnMsIG9yaWdCb2R5XS5cbiAgdmFyIGFjdHVhbEFyaXR5ID0gdGhpcy50ZXJtc1swXS5nZXRBcml0eSgpO1xuICB2YXIgZXhwZWN0ZWRBcml0eSA9IHRoaXMudGVybXNbMV0uZ2V0QXJpdHkoKTtcbiAgaWYgKGFjdHVhbEFyaXR5ICE9PSBleHBlY3RlZEFyaXR5KSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5JbmNvbnNpc3RlbnRBcml0eShydWxlTmFtZSwgZXhwZWN0ZWRBcml0eSwgYWN0dWFsQXJpdHkpO1xuICB9XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuZmFjdG9ycy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy5mYWN0b3JzW2lkeF0uYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkocnVsZU5hbWUpO1xuICB9XG59O1xuXG5wZXhwcnMuTWFueS5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkocnVsZU5hbWUpO1xufTtcblxucGV4cHJzLk9wdC5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkocnVsZU5hbWUpO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBuby1vcCAobm90IHJlcXVpcmVkIGIvYyB0aGUgbmVzdGVkIGV4cHIgZG9lc24ndCBzaG93IHVwIGluIHRoZSBDU1QpXG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eShydWxlTmFtZSk7XG59O1xuXG5wZXhwcnMuQXJyLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eShydWxlTmFtZSk7XG59O1xuXG5wZXhwcnMuU3RyLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eShydWxlTmFtZSk7XG59O1xuXG5wZXhwcnMuT2JqLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMucHJvcGVydGllcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzW2lkeF0ucGF0dGVybi5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eShydWxlTmFtZSk7XG4gIH1cbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBuby1vcFxufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJyk7XG52YXIgTm9kZSA9IHJlcXVpcmUoJy4vTm9kZS5qcycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzLmpzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmNoZWNrID0gY29tbW9uLmFic3RyYWN0O1xuXG5wZXhwcnMuYW55dGhpbmcuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB2YWxzLmxlbmd0aCA+PSAxO1xufTtcblxucGV4cHJzLmVuZC5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgcmV0dXJuIHZhbHNbMF0gaW5zdGFuY2VvZiBOb2RlICYmIHZhbHNbMF0uaXNWYWx1ZSgpICYmIHZhbHNbMF0udmFsdWUoKSA9PT0gdW5kZWZpbmVkO1xufTtcblxucGV4cHJzLlByaW0ucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICByZXR1cm4gdmFsc1swXSBpbnN0YW5jZW9mIE5vZGUgJiYgdmFsc1swXS5pc1ZhbHVlKCkgJiYgdmFsc1swXS52YWx1ZSgpID09PSB0aGlzLm9iajtcbn07XG5cbnBleHBycy5SZWdFeHBQcmltLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgLy8gVE9ETzogbW9yZSBlZmZpY2llbnQgXCJ0b3RhbCBtYXRjaCBjaGVja2VyXCIgdGhhbiB0aGUgdXNlIG9mIC5yZXBsYWNlIGhlcmVcbiAgcmV0dXJuIHZhbHNbMF0gaW5zdGFuY2VvZiBOb2RlICYmXG4gICAgICAgICB2YWxzWzBdLmlzVmFsdWUoKSAmJlxuICAgICAgICAgdHlwZW9mIHZhbHNbMF0udmFsdWUoKSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgIHZhbHNbMF0udmFsdWUoKS5yZXBsYWNlKHRoaXMub2JqLCAnJykgPT09ICcnO1xufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50ZXJtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0ZXJtID0gdGhpcy50ZXJtc1tpXTtcbiAgICBpZiAodGVybS5jaGVjayhncmFtbWFyLCB2YWxzKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICB2YXIgcG9zID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZmFjdG9yID0gdGhpcy5mYWN0b3JzW2ldO1xuICAgIGlmIChmYWN0b3IuY2hlY2soZ3JhbW1hciwgdmFscy5zbGljZShwb3MpKSkge1xuICAgICAgcG9zICs9IGZhY3Rvci5nZXRBcml0eSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLk1hbnkucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICB2YXIgYXJpdHkgPSB0aGlzLmdldEFyaXR5KCk7XG4gIGlmIChhcml0eSA9PT0gMCkge1xuICAgIC8vIFRPRE86IG1ha2UgdGhpcyBhIHN0YXRpYyBjaGVjayB3LyBhIG5pY2UgZXJyb3IgbWVzc2FnZSwgdGhlbiByZW1vdmUgdGhlIGR5bmFtaWMgY2hlY2suXG4gICAgLy8gY2YuIHBleHBycy1ldmFsLmpzIGZvciBNYW55XG4gICAgdGhyb3cgbmV3IEVycm9yKCdmaXggbWUhJyk7XG4gIH1cblxuICB2YXIgY29sdW1ucyA9IHZhbHMuc2xpY2UoMCwgYXJpdHkpO1xuICBpZiAoY29sdW1ucy5sZW5ndGggIT09IGFyaXR5KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciByb3djb3VudCA9IGNvbHVtbnNbMF0ubGVuZ3RoO1xuICB2YXIgaTtcbiAgZm9yIChpID0gMTsgaSA8IGFyaXR5OyBpKyspIHtcbiAgICBpZiAoY29sdW1uc1tpXS5sZW5ndGggIT09IHJvd2NvdW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IHJvd2NvdW50OyBpKyspIHtcbiAgICB2YXIgcm93ID0gW107XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcml0eTsgaisrKSB7XG4gICAgICByb3cucHVzaChjb2x1bW5zW2pdW2ldKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmV4cHIuY2hlY2soZ3JhbW1hciwgcm93KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLk9wdC5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHZhciBhcml0eSA9IHRoaXMuZ2V0QXJpdHkoKTtcbiAgdmFyIGFsbFVuZGVmaW5lZCA9IHRydWU7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJpdHk7IGkrKykge1xuICAgIGlmICh2YWxzW2ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGFsbFVuZGVmaW5lZCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFsbFVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmV4cHIuY2hlY2soZ3JhbW1hciwgdmFscyk7XG4gIH1cbn07XG5cbnBleHBycy5Ob3QucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICByZXR1cm4gdGhpcy5leHByLmNoZWNrKGdyYW1tYXIsIHZhbHMpO1xufTtcblxucGV4cHJzLkFyci5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuY2hlY2soZ3JhbW1hciwgdmFscyk7XG59O1xuXG5wZXhwcnMuU3RyLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5jaGVjayhncmFtbWFyLCB2YWxzKTtcbn07XG5cbnBleHBycy5PYmoucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICB2YXIgZml4ZWRBcml0eSA9IHRoaXMuZ2V0QXJpdHkoKTtcbiAgaWYgKHRoaXMuaXNMZW5pZW50KSB7XG4gICAgZml4ZWRBcml0eS0tO1xuICB9XG5cbiAgdmFyIHBvcyA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZml4ZWRBcml0eTsgaSsrKSB7XG4gICAgdmFyIHBhdHRlcm4gPSB0aGlzLnByb3BlcnRpZXNbaV0ucGF0dGVybjtcbiAgICBpZiAocGF0dGVybi5jaGVjayhncmFtbWFyLCB2YWxzLnNsaWNlKHBvcykpKSB7XG4gICAgICBwb3MgKz0gcGF0dGVybi5nZXRBcml0eSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuaXNMZW5pZW50ID8gdHlwZW9mIHZhbHNbcG9zXSA9PT0gJ29iamVjdCcgJiYgdmFsc1twb3NdIDogdHJ1ZTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIGlmICghKHZhbHNbMF0gaW5zdGFuY2VvZiBOb2RlICYmXG4gICAgICAgIHZhbHNbMF0uZ3JhbW1hciA9PT0gZ3JhbW1hciAmJlxuICAgICAgICB2YWxzWzBdLmN0b3JOYW1lID09PSB0aGlzLnJ1bGVOYW1lKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRPRE86IHRoaW5rIGFib3V0ICpub3QqIGRvaW5nIHRoZSBmb2xsb3dpbmcgY2hlY2tzLCBpLmUuLCB0cnVzdGluZyB0aGF0IHRoZSBydWxlXG4gIC8vIHdhcyBjb3JyZWN0bHkgY29uc3RydWN0ZWQuXG4gIHZhciBydWxlTm9kZSA9IHZhbHNbMF07XG4gIHZhciBib2R5ID0gZ3JhbW1hci5ydWxlRGljdFt0aGlzLnJ1bGVOYW1lXTtcbiAgcmV0dXJuIGJvZHkuY2hlY2soZ3JhbW1hciwgcnVsZU5vZGUuY2hpbGRyZW4pICYmIHJ1bGVOb2RlLm51bUNoaWxkcmVuKCkgPT09IGJvZHkuZ2V0QXJpdHkoKTtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbi5qcycpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzLmpzJyk7XG52YXIgTm9kZSA9IHJlcXVpcmUoJy4vTm9kZS5qcycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzLmpzJyk7XG52YXIgSW5wdXRTdHJlYW0gPSByZXF1aXJlKCcuL0lucHV0U3RyZWFtLmpzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgYXBwbHlTcGFjZXNfID0gbmV3IHBleHBycy5BcHBseSgnc3BhY2VzXycpO1xuXG5mdW5jdGlvbiBza2lwU3BhY2VzSWZBcHByb3ByaWF0ZShzdGF0ZSkge1xuICB2YXIgY3VycmVudFJ1bGUgPSBzdGF0ZS5ydWxlU3RhY2tbc3RhdGUucnVsZVN0YWNrLmxlbmd0aCAtIDFdO1xuICB2YXIgcnVsZU5hbWUgPSBjdXJyZW50UnVsZS5ydWxlTmFtZSB8fCAnJztcbiAgaWYgKHR5cGVvZiBzdGF0ZS5pbnB1dFN0cmVhbS5zb3VyY2UgPT09ICdzdHJpbmcnICYmIGNvbW1vbi5pc1N5bnRhY3RpYyhydWxlTmFtZSkpIHtcbiAgICBza2lwU3BhY2VzKHN0YXRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBza2lwU3BhY2VzKHN0YXRlKSB7XG4gIHN0YXRlLmlnbm9yZUZhaWx1cmVzKCk7XG4gIGFwcGx5U3BhY2VzXy5ldmFsKHN0YXRlKTtcbiAgc3RhdGUuYmluZGluZ3MucG9wKCk7XG4gIHN0YXRlLnJlY29yZEZhaWx1cmVzKCk7XG59XG5cbi8vIEV2YWx1YXRlIHRoZSBleHByZXNzaW9uIGFuZCByZXR1cm4gdHJ1ZSBpZiBpdCBzdWNjZWVkZWQsIG90aGVyd2lzZSBmYWxzZS5cbi8vIE9uIHN1Y2Nlc3MsIHRoZSBiaW5kaW5ncyB3aWxsIGhhdmUgYHRoaXMuYXJpdHlgIG1vcmUgZWxlbWVudHMgdGhhbiBiZWZvcmUsXG4vLyBhbmQgdGhlIHBvc2l0aW9uIGNvdWxkIGJlIGFueXdoZXJlLiBPbiBmYWlsdXJlLCB0aGUgYmluZGluZ3MgYW5kIHBvc2l0aW9uXG4vLyB3aWxsIGJlIHVuY2hhbmdlZC5cbnBleHBycy5QRXhwci5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBvcmlnUG9zID0gc3RhdGUuaW5wdXRTdHJlYW0ucG9zO1xuICB2YXIgb3JpZ051bUJpbmRpbmdzID0gc3RhdGUuYmluZGluZ3MubGVuZ3RoO1xuICB2YXIgb3JpZ1RyYWNlID0gc3RhdGUudHJhY2U7XG4gIGlmIChzdGF0ZS5pc1RyYWNpbmcoKSkge1xuICAgIHN0YXRlLnRyYWNlID0gW107XG4gIH1cblxuICAvLyBEbyB0aGUgYWN0dWFsIGV2YWx1YXRpb24uXG4gIHZhciBhbnMgPSB0aGlzLl9ldmFsKHN0YXRlKTtcblxuICBpZiAoc3RhdGUuaXNUcmFjaW5nKCkpIHtcbiAgICB2YXIgdHJhY2VFbnRyeSA9IHN0YXRlLmdldFRyYWNlRW50cnkob3JpZ1BvcywgdGhpcywgYW5zKTtcbiAgICBvcmlnVHJhY2UucHVzaCh0cmFjZUVudHJ5KTtcbiAgICBzdGF0ZS50cmFjZSA9IG9yaWdUcmFjZTtcbiAgfVxuXG4gIGlmICghYW5zKSB7XG4gICAgdGhpcy5tYXliZVJlY29yZEZhaWx1cmUoc3RhdGUsIG9yaWdQb3MpO1xuXG4gICAgLy8gUmVzZXQgdGhlIHBvc2l0aW9uIGFuZCB0aGUgYmluZGluZ3MuXG4gICAgc3RhdGUuaW5wdXRTdHJlYW0ucG9zID0gb3JpZ1BvcztcbiAgICBzdGF0ZS5iaW5kaW5ncy5sZW5ndGggPSBvcmlnTnVtQmluZGluZ3M7XG4gIH1cbiAgcmV0dXJuIGFucztcbn07XG5cbi8vIEV2YWx1YXRlIHRoZSBleHByZXNzaW9uIGFuZCByZXR1cm4gdHJ1ZSBpZiBpdCBzdWNjZWVkZWQsIG90aGVyd2lzZSBmYWxzZS5cbi8vIFRoaXMgc2hvdWxkIG5vdCBiZSBjYWxsZWQgZGlyZWN0bHkgZXhjZXB0IGJ5IGBldmFsYC5cbi8vXG4vLyBUaGUgY29udHJhY3Qgb2YgdGhpcyBtZXRob2QgaXMgYXMgZm9sbG93czpcbi8vICogV2hlbiB0aGUgcmV0dXJuIHZhbHVlIGlzIHRydWU6XG4vLyAgIC0tIGJpbmRpbmdzIHdpbGwgaGF2ZSBleHByLmFyaXR5IG1vcmUgZWxlbWVudHMgdGhhbiBiZWZvcmVcbi8vICogV2hlbiB0aGUgcmV0dXJuIHZhbHVlIGlzIGZhbHNlOlxuLy8gICAtLSBiaW5kaW5ncyB3aWxsIGhhdmUgZXhhY3RseSB0aGUgc2FtZSBudW1iZXIgb2YgZWxlbWVudHMgYXMgYmVmb3JlXG4vLyAgIC0tIHBvc2l0aW9uIGNvdWxkIGJlIGFueXdoZXJlXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUuX2V2YWwgPSBjb21tb24uYWJzdHJhY3Q7XG5cbnBleHBycy5hbnl0aGluZy5fZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIHZhbHVlID0gaW5wdXRTdHJlYW0ubmV4dCgpO1xuICBpZiAodmFsdWUgPT09IGNvbW1vbi5mYWlsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHZhciBpbnRlcnZhbCA9IGlucHV0U3RyZWFtLmludGVydmFsRnJvbShvcmlnUG9zKTtcbiAgICBzdGF0ZS5iaW5kaW5ncy5wdXNoKG5ldyBOb2RlKHN0YXRlLmdyYW1tYXIsICdfdGVybWluYWwnLCBbdmFsdWVdLCBpbnRlcnZhbCkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5wZXhwcnMuZW5kLl9ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gIGlmIChzdGF0ZS5pbnB1dFN0cmVhbS5hdEVuZCgpKSB7XG4gICAgdmFyIGludGVydmFsID0gaW5wdXRTdHJlYW0uaW50ZXJ2YWxGcm9tKGlucHV0U3RyZWFtLnBvcyk7XG4gICAgc3RhdGUuYmluZGluZ3MucHVzaChuZXcgTm9kZShzdGF0ZS5ncmFtbWFyLCAnX3Rlcm1pbmFsJywgW3VuZGVmaW5lZF0sIGludGVydmFsKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5wZXhwcnMuUHJpbS5wcm90b3R5cGUuX2V2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIGlmICh0aGlzLm1hdGNoKGlucHV0U3RyZWFtKSA9PT0gY29tbW9uLmZhaWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGludGVydmFsID0gaW5wdXRTdHJlYW0uaW50ZXJ2YWxGcm9tKG9yaWdQb3MpO1xuICAgIHN0YXRlLmJpbmRpbmdzLnB1c2gobmV3IE5vZGUoc3RhdGUuZ3JhbW1hciwgJ190ZXJtaW5hbCcsIFt0aGlzLm9ial0sIGludGVydmFsKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbnBleHBycy5QcmltLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uKGlucHV0U3RyZWFtKSB7XG4gIHJldHVybiBpbnB1dFN0cmVhbS5tYXRjaEV4YWN0bHkodGhpcy5vYmopO1xufTtcblxucGV4cHJzLlN0cmluZ1ByaW0ucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24oaW5wdXRTdHJlYW0pIHtcbiAgcmV0dXJuIGlucHV0U3RyZWFtLm1hdGNoU3RyaW5nKHRoaXMub2JqKTtcbn07XG5cbnBleHBycy5SZWdFeHBQcmltLnByb3RvdHlwZS5fZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgaWYgKGlucHV0U3RyZWFtLm1hdGNoUmVnRXhwKHRoaXMub2JqKSA9PT0gY29tbW9uLmZhaWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGludGVydmFsID0gaW5wdXRTdHJlYW0uaW50ZXJ2YWxGcm9tKG9yaWdQb3MpO1xuICAgIHN0YXRlLmJpbmRpbmdzLnB1c2goXG4gICAgICAgIG5ldyBOb2RlKHN0YXRlLmdyYW1tYXIsICdfdGVybWluYWwnLCBbaW5wdXRTdHJlYW0uc291cmNlW29yaWdQb3NdXSwgaW50ZXJ2YWwpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuX2V2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgYmluZGluZ3MgPSBzdGF0ZS5iaW5kaW5ncztcbiAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICB2YXIgb3JpZ051bUJpbmRpbmdzID0gYmluZGluZ3MubGVuZ3RoO1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnRlcm1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICBpZiAodGhpcy50ZXJtc1tpZHhdLmV2YWwoc3RhdGUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXRTdHJlYW0ucG9zID0gb3JpZ1BvcztcbiAgICAgIGJpbmRpbmdzLmxlbmd0aCA9IG9yaWdOdW1CaW5kaW5ncztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUuX2V2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgIHNraXBTcGFjZXNJZkFwcHJvcHJpYXRlKHN0YXRlKTtcbiAgICB2YXIgZmFjdG9yID0gdGhpcy5mYWN0b3JzW2lkeF07XG4gICAgaWYgKCFmYWN0b3IuZXZhbChzdGF0ZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5wZXhwcnMuTWFueS5wcm90b3R5cGUuX2V2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgYXJpdHkgPSB0aGlzLmdldEFyaXR5KCk7XG4gIGlmIChhcml0eSA9PT0gMCkge1xuICAgIC8vIFRPRE86IG1ha2UgdGhpcyBhIHN0YXRpYyBjaGVjayB3LyBhIG5pY2UgZXJyb3IgbWVzc2FnZSwgdGhlbiByZW1vdmUgdGhlIGR5bmFtaWMgY2hlY2suXG4gICAgLy8gY2YuIHBleHBycy1jaGVjay5qcyBmb3IgTWFueVxuICAgIHRocm93IG5ldyBFcnJvcignZml4IG1lIScpO1xuICB9XG5cbiAgdmFyIGNvbHVtbnMgPSBjb21tb24ucmVwZWF0Rm4oZnVuY3Rpb24oKSB7IHJldHVybiBbXTsgfSwgYXJpdHkpO1xuICB2YXIgbnVtTWF0Y2hlcyA9IDA7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIGlkeDtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICB2YXIgYmFja3RyYWNrUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICAgIHNraXBTcGFjZXNJZkFwcHJvcHJpYXRlKHN0YXRlKTtcbiAgICBpZiAodGhpcy5leHByLmV2YWwoc3RhdGUpKSB7XG4gICAgICBudW1NYXRjaGVzKys7XG4gICAgICB2YXIgcm93ID0gc3RhdGUuYmluZGluZ3Muc3BsaWNlKHN0YXRlLmJpbmRpbmdzLmxlbmd0aCAtIGFyaXR5LCBhcml0eSk7XG4gICAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IHJvdy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgIGNvbHVtbnNbaWR4XS5wdXNoKHJvd1tpZHhdKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbnB1dFN0cmVhbS5wb3MgPT09IGJhY2t0cmFja1Bvcykge1xuICAgICAgICAvLyBUT0RPOiBDb25zaWRlciBtYWtpbmcgaXQgYSBzdGF0aWMgZXJyb3IgZm9yIGEgbnVsbGFibGUgZXhwcmVzc2lvbiB0b1xuICAgICAgICAvLyBiZSBpbnNpZGUgYE1hbnlgLlxuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLkluZmluaXRlTG9vcChzdGF0ZSwgdGhpcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0U3RyZWFtLnBvcyA9IGJhY2t0cmFja1BvcztcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAobnVtTWF0Y2hlcyA8IHRoaXMubWluTnVtTWF0Y2hlcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IGNvbHVtbnMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgdmFyIGludGVydmFsID0gaW5wdXRTdHJlYW0uaW50ZXJ2YWxGcm9tKG9yaWdQb3MpO1xuICAgICAgc3RhdGUuYmluZGluZ3MucHVzaChuZXcgTm9kZShzdGF0ZS5ncmFtbWFyLCAnX21hbnknLCBjb2x1bW5zW2lkeF0sIGludGVydmFsKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5wZXhwcnMuT3B0LnByb3RvdHlwZS5fZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIGFyaXR5ID0gdGhpcy5nZXRBcml0eSgpO1xuICB2YXIgcm93O1xuICBpZiAodGhpcy5leHByLmV2YWwoc3RhdGUpKSB7XG4gICAgcm93ID0gc3RhdGUuYmluZGluZ3Muc3BsaWNlKHN0YXRlLmJpbmRpbmdzLmxlbmd0aCAtIGFyaXR5LCBhcml0eSk7XG4gIH0gZWxzZSB7XG4gICAgaW5wdXRTdHJlYW0ucG9zID0gb3JpZ1BvcztcbiAgICB2YXIgaW50ZXJ2YWwgPSBpbnB1dFN0cmVhbS5pbnRlcnZhbEZyb20ob3JpZ1Bvcyk7XG4gICAgcm93ID0gY29tbW9uLnJlcGVhdChuZXcgTm9kZShzdGF0ZS5ncmFtbWFyLCAnX3Rlcm1pbmFsJywgW3VuZGVmaW5lZF0sIGludGVydmFsKSwgYXJpdHkpO1xuICB9XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGFyaXR5OyBpZHgrKykge1xuICAgIHN0YXRlLmJpbmRpbmdzLnB1c2gocm93W2lkeF0pO1xuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUuX2V2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAvLyBUT0RPOlxuICAvLyAqIFJpZ2h0IG5vdyB3ZSdyZSBqdXN0IHRocm93aW5nIGF3YXkgYWxsIG9mIHRoZSBmYWlsdXJlcyB0aGF0IGhhcHBlbiBpbnNpZGUgYSBgbm90YCxcbiAgLy8gICBhbmQgcmVjb3JkaW5nIGB0aGlzYCBhcyBhIGZhaWxlZCBleHByZXNzaW9uLlxuICAvLyAqIERvdWJsZSBuZWdhdGlvbiBzaG91bGQgYmUgZXF1aXZhbGVudCB0byBsb29rYWhlYWQsIGJ1dCB0aGF0J3Mgbm90IHRoZSBjYXNlIHJpZ2h0IG5vdyB3cnRcbiAgLy8gICBmYWlsdXJlcy4gRS5nLiwgfn4nZm9vJyBwcm9kdWNlcyBhIGZhaWx1cmUgZm9yIH5+J2ZvbycsIGJ1dCBtYXliZSBpdCBzaG91bGQgcHJvZHVjZVxuICAvLyAgIGEgZmFpbHVyZSBmb3IgJ2ZvbycgaW5zdGVhZC5cblxuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHN0YXRlLmlnbm9yZUZhaWx1cmVzKCk7XG4gIHZhciBhbnMgPSB0aGlzLmV4cHIuZXZhbChzdGF0ZSk7XG4gIHN0YXRlLnJlY29yZEZhaWx1cmVzKCk7XG4gIGlmIChhbnMpIHtcbiAgICBzdGF0ZS5iaW5kaW5ncy5sZW5ndGggLT0gdGhpcy5nZXRBcml0eSgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBpbnB1dFN0cmVhbS5wb3MgPSBvcmlnUG9zO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5fZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgaWYgKHRoaXMuZXhwci5ldmFsKHN0YXRlKSkge1xuICAgIGlucHV0U3RyZWFtLnBvcyA9IG9yaWdQb3M7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5wZXhwcnMuQXJyLnByb3RvdHlwZS5fZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb2JqID0gaW5wdXRTdHJlYW0ubmV4dCgpO1xuICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICB2YXIgb2JqSW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5uZXdGb3Iob2JqKTtcbiAgICBzdGF0ZS5wdXNoSW5wdXRTdHJlYW0ob2JqSW5wdXRTdHJlYW0pO1xuICAgIHZhciBhbnMgPSB0aGlzLmV4cHIuZXZhbChzdGF0ZSkgJiYgc3RhdGUuaW5wdXRTdHJlYW0uYXRFbmQoKTtcbiAgICBzdGF0ZS5wb3BJbnB1dFN0cmVhbSgpO1xuICAgIHJldHVybiBhbnM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5wZXhwcnMuU3RyLnByb3RvdHlwZS5fZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb2JqID0gaW5wdXRTdHJlYW0ubmV4dCgpO1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgc3RySW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5uZXdGb3Iob2JqKTtcbiAgICBzdGF0ZS5wdXNoSW5wdXRTdHJlYW0oc3RySW5wdXRTdHJlYW0pO1xuICAgIHZhciBhbnMgPSB0aGlzLmV4cHIuZXZhbChzdGF0ZSkgJiYgKHNraXBTcGFjZXNJZkFwcHJvcHJpYXRlKHN0YXRlKSwgc3RhdGUuaW5wdXRTdHJlYW0uYXRFbmQoKSk7XG4gICAgc3RhdGUucG9wSW5wdXRTdHJlYW0oKTtcbiAgICByZXR1cm4gYW5zO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxucGV4cHJzLk9iai5wcm90b3R5cGUuX2V2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHZhciBvYmogPSBpbnB1dFN0cmVhbS5uZXh0KCk7XG4gIGlmIChvYmogIT09IGNvbW1vbi5mYWlsICYmIG9iaiAmJiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB2YXIgbnVtT3duUHJvcGVydGllc01hdGNoZWQgPSAwO1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMucHJvcGVydGllcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICB2YXIgcHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbaWR4XTtcbiAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KHByb3BlcnR5Lm5hbWUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHZhciB2YWx1ZSA9IG9ialtwcm9wZXJ0eS5uYW1lXTtcbiAgICAgIHZhciB2YWx1ZUlucHV0U3RyZWFtID0gSW5wdXRTdHJlYW0ubmV3Rm9yKFt2YWx1ZV0pO1xuICAgICAgc3RhdGUucHVzaElucHV0U3RyZWFtKHZhbHVlSW5wdXRTdHJlYW0pO1xuICAgICAgdmFyIG1hdGNoZWQgPSBwcm9wZXJ0eS5wYXR0ZXJuLmV2YWwoc3RhdGUpICYmIHN0YXRlLmlucHV0U3RyZWFtLmF0RW5kKCk7XG4gICAgICBzdGF0ZS5wb3BJbnB1dFN0cmVhbSgpO1xuICAgICAgaWYgKCFtYXRjaGVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG51bU93blByb3BlcnRpZXNNYXRjaGVkKys7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzTGVuaWVudCkge1xuICAgICAgdmFyIHJlbWFpbmRlciA9IHt9O1xuICAgICAgZm9yICh2YXIgcCBpbiBvYmopIHtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSAmJiB0aGlzLnByb3BlcnRpZXMuaW5kZXhPZihwKSA8IDApIHtcbiAgICAgICAgICByZW1haW5kZXJbcF0gPSBvYmpbcF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBpbnRlcnZhbCA9IGlucHV0U3RyZWFtLmludGVydmFsRnJvbShvcmlnUG9zKTtcbiAgICAgIHN0YXRlLmJpbmRpbmdzLnB1c2gobmV3IE5vZGUoc3RhdGUuZ3JhbW1hciwgJ190ZXJtaW5hbCcsIFtyZW1haW5kZXJdLCBpbnRlcnZhbCkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudW1Pd25Qcm9wZXJ0aWVzTWF0Y2hlZCA9PT0gT2JqZWN0LmtleXMob2JqKS5sZW5ndGg7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5fZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gIHZhciBncmFtbWFyID0gc3RhdGUuZ3JhbW1hcjtcbiAgdmFyIGJpbmRpbmdzID0gc3RhdGUuYmluZGluZ3M7XG5cbiAgZnVuY3Rpb24gdXNlTWVtb2l6ZWRSZXN1bHQobWVtb1JlY09yTFIpIHtcbiAgICBpbnB1dFN0cmVhbS5wb3MgPSBtZW1vUmVjT3JMUi5wb3M7XG4gICAgaWYgKG1lbW9SZWNPckxSLmZhaWx1cmVEZXNjcmlwdG9yKSB7XG4gICAgICBzdGF0ZS5yZWNvcmRGYWlsdXJlcyhtZW1vUmVjT3JMUi5mYWlsdXJlRGVzY3JpcHRvciwgc2VsZik7XG4gICAgfVxuICAgIGlmIChzdGF0ZS5pc1RyYWNpbmcoKSkge1xuICAgICAgc3RhdGUudHJhY2UucHVzaChtZW1vUmVjT3JMUi50cmFjZUVudHJ5KTtcbiAgICB9XG4gICAgaWYgKG1lbW9SZWNPckxSLnZhbHVlKSB7XG4gICAgICBiaW5kaW5ncy5wdXNoKG1lbW9SZWNPckxSLnZhbHVlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgdmFyIHJ1bGVOYW1lID0gdGhpcy5ydWxlTmFtZTtcbiAgdmFyIG1lbW9LZXkgPSB0aGlzLnRvTWVtb0tleSgpO1xuXG4gIGlmIChjb21tb24uaXNTeW50YWN0aWMocnVsZU5hbWUpKSB7XG4gICAgc2tpcFNwYWNlcyhzdGF0ZSk7XG4gIH1cblxuICB2YXIgb3JpZ1Bvc0luZm8gPSBzdGF0ZS5nZXRDdXJyZW50UG9zSW5mbygpO1xuXG4gIHZhciBtZW1vUmVjID0gb3JpZ1Bvc0luZm8ubWVtb1ttZW1vS2V5XTtcbiAgdmFyIGN1cnJlbnRMUjtcbiAgaWYgKG1lbW9SZWMgJiYgb3JpZ1Bvc0luZm8uc2hvdWxkVXNlTWVtb2l6ZWRSZXN1bHQobWVtb1JlYykpIHtcbiAgICByZXR1cm4gdXNlTWVtb2l6ZWRSZXN1bHQobWVtb1JlYyk7XG4gIH0gZWxzZSBpZiAob3JpZ1Bvc0luZm8uaXNBY3RpdmUocnVsZU5hbWUpKSB7XG4gICAgY3VycmVudExSID0gb3JpZ1Bvc0luZm8uZ2V0Q3VycmVudExlZnRSZWN1cnNpb24oKTtcbiAgICBpZiAoY3VycmVudExSICYmIGN1cnJlbnRMUi5uYW1lID09PSBydWxlTmFtZSkge1xuICAgICAgb3JpZ1Bvc0luZm8udXBkYXRlSW52b2x2ZWRSdWxlcygpO1xuICAgICAgcmV0dXJuIHVzZU1lbW9pemVkUmVzdWx0KGN1cnJlbnRMUik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9yaWdQb3NJbmZvLnN0YXJ0TGVmdFJlY3Vyc2lvbihydWxlTmFtZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBib2R5ID0gZ3JhbW1hci5ydWxlRGljdFtydWxlTmFtZV07XG4gICAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gICAgb3JpZ1Bvc0luZm8uZW50ZXIodGhpcyk7XG4gICAgaWYgKGJvZHkuZGVzY3JpcHRpb24pIHtcbiAgICAgIHN0YXRlLmlnbm9yZUZhaWx1cmVzKCk7XG4gICAgfVxuICAgIHZhciB2YWx1ZSA9IHRoaXMuZXZhbE9uY2UoYm9keSwgc3RhdGUpO1xuICAgIGN1cnJlbnRMUiA9IG9yaWdQb3NJbmZvLmdldEN1cnJlbnRMZWZ0UmVjdXJzaW9uKCk7XG4gICAgaWYgKGN1cnJlbnRMUikge1xuICAgICAgaWYgKGN1cnJlbnRMUi5uYW1lID09PSBydWxlTmFtZSkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuaGFuZGxlTGVmdFJlY3Vyc2lvbihib2R5LCBzdGF0ZSwgb3JpZ1BvcywgY3VycmVudExSLCB2YWx1ZSk7XG4gICAgICAgIG9yaWdQb3NJbmZvLm1lbW9bbWVtb0tleV0gPSB7XG4gICAgICAgICAgcG9zOiBpbnB1dFN0cmVhbS5wb3MsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgIGludm9sdmVkUnVsZXM6IGN1cnJlbnRMUi5pbnZvbHZlZFJ1bGVzXG4gICAgICAgIH07XG4gICAgICAgIG9yaWdQb3NJbmZvLmVuZExlZnRSZWN1cnNpb24ocnVsZU5hbWUpO1xuICAgICAgfSBlbHNlIGlmICghY3VycmVudExSLmludm9sdmVkUnVsZXNbcnVsZU5hbWVdKSB7XG4gICAgICAgIC8vIE9ubHkgbWVtb2l6ZSBpZiB0aGlzIHJ1bGUgaXMgbm90IGludm9sdmVkIGluIHRoZSBjdXJyZW50IGxlZnQgcmVjdXJzaW9uXG4gICAgICAgIG9yaWdQb3NJbmZvLm1lbW9bbWVtb0tleV0gPSB7cG9zOiBpbnB1dFN0cmVhbS5wb3MsIHZhbHVlOiB2YWx1ZX07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG9yaWdQb3NJbmZvLm1lbW9bbWVtb0tleV0gPSB7cG9zOiBpbnB1dFN0cmVhbS5wb3MsIHZhbHVlOiB2YWx1ZX07XG4gICAgfVxuICAgIGlmIChib2R5LmRlc2NyaXB0aW9uKSB7XG4gICAgICBzdGF0ZS5yZWNvcmRGYWlsdXJlcygpO1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICBzdGF0ZS5yZWNvcmRGYWlsdXJlKG9yaWdQb3MsIHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZWNvcmQgdHJhY2UgaW5mb3JtYXRpb24gaW4gdGhlIG1lbW8gdGFibGUsIHNvIHRoYXQgaXQgaXNcbiAgICAvLyBhdmFpbGFibGUgaWYgdGhlIG1lbW9pemVkIHJlc3VsdCBpcyB1c2VkIGxhdGVyLlxuICAgIGlmIChzdGF0ZS5pc1RyYWNpbmcoKSAmJiBvcmlnUG9zSW5mby5tZW1vW21lbW9LZXldKSB7XG4gICAgICB2YXIgZW50cnkgPSBzdGF0ZS5nZXRUcmFjZUVudHJ5KG9yaWdQb3MsIHRoaXMsIHZhbHVlKTtcbiAgICAgIGVudHJ5LnNldExlZnRSZWN1cnNpdmUoY3VycmVudExSICYmIChjdXJyZW50TFIubmFtZSA9PT0gcnVsZU5hbWUpKTtcbiAgICAgIG9yaWdQb3NJbmZvLm1lbW9bbWVtb0tleV0udHJhY2VFbnRyeSA9IGVudHJ5O1xuICAgIH1cbiAgICB2YXIgYW5zO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgYmluZGluZ3MucHVzaCh2YWx1ZSk7XG4gICAgICBpZiAoc3RhdGUucnVsZVN0YWNrLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAoY29tbW9uLmlzU3ludGFjdGljKHJ1bGVOYW1lKSkge1xuICAgICAgICAgIHNraXBTcGFjZXMoc3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGFucyA9IHBleHBycy5lbmQuZXZhbChzdGF0ZSk7XG4gICAgICAgIGJpbmRpbmdzLnBvcCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYW5zID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYW5zID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb3JpZ1Bvc0luZm8uZXhpdCgpO1xuICAgIHJldHVybiBhbnM7XG4gIH1cbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuZXZhbE9uY2UgPSBmdW5jdGlvbihleHByLCBzdGF0ZSkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIGlmIChleHByLmV2YWwoc3RhdGUpKSB7XG4gICAgdmFyIGFyaXR5ID0gZXhwci5nZXRBcml0eSgpO1xuICAgIHZhciBiaW5kaW5ncyA9IHN0YXRlLmJpbmRpbmdzLnNwbGljZShzdGF0ZS5iaW5kaW5ncy5sZW5ndGggLSBhcml0eSwgYXJpdHkpO1xuICAgIHZhciBhbnMgPSBuZXcgTm9kZShzdGF0ZS5ncmFtbWFyLCB0aGlzLnJ1bGVOYW1lLCBiaW5kaW5ncywgaW5wdXRTdHJlYW0uaW50ZXJ2YWxGcm9tKG9yaWdQb3MpKTtcbiAgICByZXR1cm4gYW5zO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5oYW5kbGVMZWZ0UmVjdXJzaW9uID0gZnVuY3Rpb24oYm9keSwgc3RhdGUsIG9yaWdQb3MsIGN1cnJlbnRMUiwgc2VlZFZhbHVlKSB7XG4gIGlmICghc2VlZFZhbHVlKSB7XG4gICAgcmV0dXJuIHNlZWRWYWx1ZTtcbiAgfVxuXG4gIHZhciB2YWx1ZSA9IHNlZWRWYWx1ZTtcbiAgY3VycmVudExSLnZhbHVlID0gc2VlZFZhbHVlO1xuICBjdXJyZW50TFIucG9zID0gc3RhdGUuaW5wdXRTdHJlYW0ucG9zO1xuXG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgaWYgKHN0YXRlLmlzVHJhY2luZygpKSB7XG4gICAgICBjdXJyZW50TFIudHJhY2VFbnRyeSA9IGNvbW1vbi5jbG9uZShzdGF0ZS50cmFjZVtzdGF0ZS50cmFjZS5sZW5ndGggLSAxXSk7XG4gICAgfVxuXG4gICAgaW5wdXRTdHJlYW0ucG9zID0gb3JpZ1BvcztcbiAgICB2YWx1ZSA9IHRoaXMuZXZhbE9uY2UoYm9keSwgc3RhdGUpO1xuICAgIGlmICh2YWx1ZSAmJiBpbnB1dFN0cmVhbS5wb3MgPiBjdXJyZW50TFIucG9zKSB7XG4gICAgICAvLyBUaGUgbGVmdC1yZWN1cnNpdmUgcmVzdWx0IHdhcyBleHBhbmRlZCAtLSBrZWVwIGxvb3BpbmcuXG4gICAgICBjdXJyZW50TFIudmFsdWUgPSB2YWx1ZTtcbiAgICAgIGN1cnJlbnRMUi5wb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZhaWxlZCB0byBleHBhbmQgdGhlIHJlc3VsdC5cbiAgICAgIGlucHV0U3RyZWFtLnBvcyA9IGN1cnJlbnRMUi5wb3M7XG4gICAgICBpZiAoc3RhdGUuaXNUcmFjaW5nKCkpIHtcbiAgICAgICAgc3RhdGUudHJhY2UucG9wKCk7ICAvLyBEcm9wIGxhc3QgdHJhY2UgZW50cnkgc2luY2UgYHZhbHVlYCB3YXMgdW51c2VkLlxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyZW50TFIudmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzLmpzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmdldEFyaXR5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAxO1xufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuZ2V0QXJpdHkgPSBmdW5jdGlvbigpIHtcbiAgLy8gVGhpcyBpcyBvayBiL2MgYWxsIHRlcm1zIG11c3QgaGF2ZSB0aGUgc2FtZSBhcml0eSAtLSB0aGlzIHByb3BlcnR5IGlzXG4gIC8vIGNoZWNrZWQgYnkgdGhlIEdyYW1tYXIgY29uc3RydWN0b3IuXG4gIHJldHVybiB0aGlzLnRlcm1zLmxlbmd0aCA9PT0gMCA/IDAgOiB0aGlzLnRlcm1zWzBdLmdldEFyaXR5KCk7XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5nZXRBcml0eSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYXJpdHkgPSAwO1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgIGFyaXR5ICs9IHRoaXMuZmFjdG9yc1tpZHhdLmdldEFyaXR5KCk7XG4gIH1cbiAgcmV0dXJuIGFyaXR5O1xufTtcblxucGV4cHJzLk1hbnkucHJvdG90eXBlLmdldEFyaXR5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuZ2V0QXJpdHkoKTtcbn07XG5cbnBleHBycy5PcHQucHJvdG90eXBlLmdldEFyaXR5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuZ2V0QXJpdHkoKTtcbn07XG5cbnBleHBycy5Ob3QucHJvdG90eXBlLmdldEFyaXR5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAwO1xufTtcblxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuZ2V0QXJpdHkgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5nZXRBcml0eSgpO1xufTtcblxucGV4cHJzLkFyci5wcm90b3R5cGUuZ2V0QXJpdHkgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5nZXRBcml0eSgpO1xufTtcblxucGV4cHJzLlN0ci5wcm90b3R5cGUuZ2V0QXJpdHkgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5nZXRBcml0eSgpO1xufTtcblxucGV4cHJzLk9iai5wcm90b3R5cGUuZ2V0QXJpdHkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGFyaXR5ID0gdGhpcy5pc0xlbmllbnQgPyAxIDogMDtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5wcm9wZXJ0aWVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICBhcml0eSArPSB0aGlzLnByb3BlcnRpZXNbaWR4XS5wYXR0ZXJuLmdldEFyaXR5KCk7XG4gIH1cbiAgcmV0dXJuIGFyaXR5O1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzLmpzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBEbyBub3RoaW5nIGJ5IGRlZmF1bHQuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLm1heWJlUmVjb3JkRmFpbHVyZSA9IGZ1bmN0aW9uKHN0YXRlLCBzdGFydFBvcykge1xufTtcblxuLy8gRm9yIFBFeHBycyB0aGF0IGRpcmVjdGx5IGNvbnN1bWUgaW5wdXQsIHJlY29yZCB0aGUgZmFpbHVyZSBpbiB0aGUgc3RhdGUgb2JqZWN0LlxucGV4cHJzLmFueXRoaW5nLm1heWJlUmVjb3JkRmFpbHVyZSA9XG5wZXhwcnMuZW5kLm1heWJlUmVjb3JkRmFpbHVyZSA9XG5wZXhwcnMuUHJpbS5wcm90b3R5cGUubWF5YmVSZWNvcmRGYWlsdXJlID1cbnBleHBycy5Ob3QucHJvdG90eXBlLm1heWJlUmVjb3JkRmFpbHVyZSA9IGZ1bmN0aW9uKHN0YXRlLCBzdGFydFBvcykge1xuICBzdGF0ZS5yZWNvcmRGYWlsdXJlKHN0YXJ0UG9zLCB0aGlzKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycy5qcycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBjb21tb24uYWJzdHJhY3Q7XG5cbnBleHBycy5hbnl0aGluZy5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihzYikge1xuICBzYi5hcHBlbmQoJ3RoaXMuYW55dGhpbmcoKScpO1xufTtcblxucGV4cHJzLmVuZC5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihzYikge1xuICBzYi5hcHBlbmQoJ3RoaXMuZW5kKCknKTtcbn07XG5cbnBleHBycy5QcmltLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihzYikge1xuICBzYi5hcHBlbmQoJ3RoaXMucHJpbSgnKTtcbiAgc2IuYXBwZW5kKHR5cGVvZiB0aGlzLm9iaiA9PT0gJ3N0cmluZycgPyBjb21tb24udG9TdHJpbmdMaXRlcmFsKHRoaXMub2JqKSA6ICcnICsgdGhpcy5vYmopO1xuICBzYi5hcHBlbmQoJyknKTtcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKHNiKSB7XG4gIHNiLmFwcGVuZCgndGhpcy5hbHQoJyk7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMudGVybXMubGVuZ3RoOyBpZHgrKykge1xuICAgIGlmIChpZHggPiAwKSB7XG4gICAgICBzYi5hcHBlbmQoJywgJyk7XG4gICAgfVxuICAgIHRoaXMudGVybXNbaWR4XS5vdXRwdXRSZWNpcGUoc2IpO1xuICB9XG4gIHNiLmFwcGVuZCgnKScpO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oc2IpIHtcbiAgc2IuYXBwZW5kKCd0aGlzLnNlcSgnKTtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5mYWN0b3JzLmxlbmd0aDsgaWR4KyspIHtcbiAgICBpZiAoaWR4ID4gMCkge1xuICAgICAgc2IuYXBwZW5kKCcsICcpO1xuICAgIH1cbiAgICB0aGlzLmZhY3RvcnNbaWR4XS5vdXRwdXRSZWNpcGUoc2IpO1xuICB9XG4gIHNiLmFwcGVuZCgnKScpO1xufTtcblxucGV4cHJzLk1hbnkucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKHNiKSB7XG4gIHNiLmFwcGVuZCgndGhpcy5tYW55KCcpO1xuICB0aGlzLmV4cHIub3V0cHV0UmVjaXBlKHNiKTtcbiAgc2IuYXBwZW5kKCcsICcpO1xuICBzYi5hcHBlbmQodGhpcy5taW5OdW1NYXRjaGVzKTtcbiAgc2IuYXBwZW5kKCcpJyk7XG59O1xuXG5wZXhwcnMuT3B0LnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihzYikge1xuICBzYi5hcHBlbmQoJ3RoaXMub3B0KCcpO1xuICB0aGlzLmV4cHIub3V0cHV0UmVjaXBlKHNiKTtcbiAgc2IuYXBwZW5kKCcpJyk7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihzYikge1xuICBzYi5hcHBlbmQoJ3RoaXMubm90KCcpO1xuICB0aGlzLmV4cHIub3V0cHV0UmVjaXBlKHNiKTtcbiAgc2IuYXBwZW5kKCcpJyk7XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihzYikge1xuICBzYi5hcHBlbmQoJ3RoaXMubGEoJyk7XG4gIHRoaXMuZXhwci5vdXRwdXRSZWNpcGUoc2IpO1xuICBzYi5hcHBlbmQoJyknKTtcbn07XG5cbnBleHBycy5BcnIucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKHNiKSB7XG4gIHNiLmFwcGVuZCgndGhpcy5hcnIoJyk7XG4gIHRoaXMuZXhwci5vdXRwdXRSZWNpcGUoc2IpO1xuICBzYi5hcHBlbmQoJyknKTtcbn07XG5cbnBleHBycy5TdHIucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKHNiKSB7XG4gIHNiLmFwcGVuZCgndGhpcy5zdHIoJyk7XG4gIHRoaXMuZXhwci5vdXRwdXRSZWNpcGUoc2IpO1xuICBzYi5hcHBlbmQoJyknKTtcbn07XG5cbnBleHBycy5PYmoucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKHNiKSB7XG4gIGZ1bmN0aW9uIG91dHB1dFByb3BlcnR5UmVjaXBlKHByb3ApIHtcbiAgICBzYi5hcHBlbmQoJ3tuYW1lOiAnKTtcbiAgICBzYi5hcHBlbmQoY29tbW9uLnRvU3RyaW5nTGl0ZXJhbChwcm9wLm5hbWUpKTtcbiAgICBzYi5hcHBlbmQoJywgcGF0dGVybjogJyk7XG4gICAgcHJvcC5wYXR0ZXJuLm91dHB1dFJlY2lwZShzYik7XG4gICAgc2IuYXBwZW5kKCd9Jyk7XG4gIH1cblxuICBzYi5hcHBlbmQoJ3RoaXMub2JqKFsnKTtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5wcm9wZXJ0aWVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICBpZiAoaWR4ID4gMCkge1xuICAgICAgc2IuYXBwZW5kKCcsICcpO1xuICAgIH1cbiAgICBvdXRwdXRQcm9wZXJ0eVJlY2lwZSh0aGlzLnByb3BlcnRpZXNbaWR4XSk7XG4gIH1cbiAgc2IuYXBwZW5kKCddLCAnKTtcbiAgc2IuYXBwZW5kKCEhdGhpcy5pc0xlbmllbnQpO1xuICBzYi5hcHBlbmQoJyknKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oc2IpIHtcbiAgc2IuYXBwZW5kKCd0aGlzLmFwcCgnKTtcbiAgc2IuYXBwZW5kKGNvbW1vbi50b1N0cmluZ0xpdGVyYWwodGhpcy5ydWxlTmFtZSkpO1xuICBzYi5hcHBlbmQoJyknKTtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycy5qcycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIFBFeHByLCBmb3IgdXNlIGFzIGEgVUkgbGFiZWwsIGV0Yy5cbnBleHBycy5QRXhwci5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmludGVydmFsKSB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJ2YWwudHJpbW1lZCgpLmNvbnRlbnRzO1xuICB9XG4gIHJldHVybiAnWycgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnXSc7XG59O1xuXG5wZXhwcnMuUHJpbS5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBTdHJpbmcodGhpcy5vYmopO1xufTtcblxucGV4cHJzLlN0cmluZ1ByaW0ucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ1wiJyArIHRoaXMub2JqICsgJ1wiJztcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnJ1bGVOYW1lO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbi5qcycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzLmpzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLnRvRXhwZWN0ZWQgPSBmdW5jdGlvbihydWxlRGljdCkge1xuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxucGV4cHJzLmFueXRoaW5nLnRvRXhwZWN0ZWQgPSBmdW5jdGlvbihydWxlRGljdCkge1xuICByZXR1cm4gJ2FueSBvYmplY3QnO1xufTtcblxucGV4cHJzLmVuZC50b0V4cGVjdGVkID0gZnVuY3Rpb24ocnVsZURpY3QpIHtcbiAgcmV0dXJuICdlbmQgb2YgaW5wdXQnO1xufTtcblxucGV4cHJzLlByaW0ucHJvdG90eXBlLnRvRXhwZWN0ZWQgPSBmdW5jdGlvbihydWxlRGljdCkge1xuICByZXR1cm4gY29tbW9uLnRvU3RyaW5nTGl0ZXJhbCh0aGlzLm9iaik7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS50b0V4cGVjdGVkID0gZnVuY3Rpb24ocnVsZURpY3QpIHtcbiAgaWYgKHRoaXMuZXhwciA9PT0gcGV4cHJzLmFueXRoaW5nKSB7XG4gICAgcmV0dXJuICdub3RoaW5nJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJ25vdCAnICsgdGhpcy5leHByLnRvRXhwZWN0ZWQocnVsZURpY3QpO1xuICB9XG59O1xuXG4vLyBUT0RPOiB0aGluayBhYm91dCBBcnIsIFN0ciwgYW5kIE9ialxuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLnRvRXhwZWN0ZWQgPSBmdW5jdGlvbihydWxlRGljdCkge1xuICB2YXIgZGVzY3JpcHRpb24gPSBydWxlRGljdFt0aGlzLnJ1bGVOYW1lXS5kZXNjcmlwdGlvbjtcbiAgaWYgKGRlc2NyaXB0aW9uKSB7XG4gICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICB9IGVsc2Uge1xuICAgIHZhciBhcnRpY2xlID0gKC9eW2FlaW91QUVJT1VdLy50ZXN0KHRoaXMucnVsZU5hbWUpID8gJ2FuJyA6ICdhJyk7XG4gICAgcmV0dXJuIGFydGljbGUgKyAnICcgKyB0aGlzLnJ1bGVOYW1lO1xuICB9XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycy5qcycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLypcbiAgZTEudG9TdHJpbmcoKSA9PT0gZTIudG9TdHJpbmcoKSA9PT4gZTEgYW5kIGUyIGFyZSBzZW1hbnRpY2FsbHkgZXF1aXZhbGVudC5cbiAgTm90ZSB0aGF0IHRoaXMgaXMgbm90IGFuIGlmZiAoPD09Pik6IGUuZy4sXG4gICh+XCJiXCIgXCJhXCIpLnRvU3RyaW5nKCkgIT09IChcImFcIikudG9TdHJpbmcoKSwgZXZlbiB0aG91Z2hcbiAgflwiYlwiIFwiYVwiIGFuZCBcImFcIiBhcmUgaW50ZXJjaGFuZ2VhYmxlIGluIGFueSBncmFtbWFyLFxuICBib3RoIGluIHRlcm1zIG9mIHRoZSBsYW5ndWFnZXMgdGhleSBhY2NlcHQgYW5kIHRoZWlyIGFyaXRpZXMuXG4qL1xucGV4cHJzLlBFeHByLnByb3RvdHlwZS50b1N0cmluZyA9IGNvbW1vbi5hYnN0cmFjdDtcblxucGV4cHJzLmFueXRoaW5nLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnXyc7XG59O1xuXG5wZXhwcnMuZW5kLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnZW5kJztcbn07XG5cbnBleHBycy5QcmltLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5vYmopO1xufTtcblxucGV4cHJzLlJlZ0V4cFByaW0ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9iai50b1N0cmluZygpO1xufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudGVybXMubGVuZ3RoID09PSAxID9cbiAgICB0aGlzLnRlcm1zWzBdLnRvU3RyaW5nKCkgOlxuICAgICcoJyArIHRoaXMudGVybXMubWFwKGZ1bmN0aW9uKHRlcm0pIHsgcmV0dXJuIHRlcm0udG9TdHJpbmcoKTsgfSkuam9pbignIHwgJykgKyAnKSc7XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5mYWN0b3JzLmxlbmd0aCA9PT0gMSA/XG4gICAgdGhpcy5mYWN0b3JzWzBdLnRvU3RyaW5nKCkgOlxuICAgICcoJyArIHRoaXMuZmFjdG9ycy5tYXAoZnVuY3Rpb24oZmFjdG9yKSB7IHJldHVybiBmYWN0b3IudG9TdHJpbmcoKTsgfSkuam9pbignICcpICsgJyknO1xufTtcblxucGV4cHJzLk1hbnkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmV4cHIgKyAodGhpcy5taW5OdW1NYXRjaGVzID09PSAwID8gJyonIDogJysnKTtcbn07XG5cbnBleHBycy5PcHQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmV4cHIgKyAnPyc7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ34nICsgdGhpcy5leHByO1xufTtcblxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICcmJyArIHRoaXMuZXhwcjtcbn07XG5cbnBleHBycy5BcnIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnWycgKyB0aGlzLmV4cHIudG9TdHJpbmcoKSArICddJztcbn07XG5cbnBleHBycy5TdHIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnYGAnICsgdGhpcy5leHByLnRvU3RyaW5nKCkgKyBcIicnXCI7XG59O1xuXG5wZXhwcnMuT2JqLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcGFydHMgPSBbJ3snXTtcblxuICB2YXIgZmlyc3QgPSB0cnVlO1xuICBmdW5jdGlvbiBlbWl0KHBhcnQpIHtcbiAgICBpZiAoZmlyc3QpIHtcbiAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRzLnB1c2goJywgJyk7XG4gICAgfVxuICAgIHBhcnRzLnB1c2gocGFydCk7XG4gIH1cblxuICB0aGlzLnByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIGVtaXQoSlNPTi5zdHJpbmdpZnkocHJvcGVydHkubmFtZSkgKyAnOiAnICsgcHJvcGVydHkucGF0dGVybi50b1N0cmluZygpKTtcbiAgfSk7XG4gIGlmICh0aGlzLmlzTGVuaWVudCkge1xuICAgIGVtaXQoJy4uLicpO1xuICB9XG5cbiAgcGFydHMucHVzaCgnfScpO1xuICByZXR1cm4gcGFydHMuam9pbignJyk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnJ1bGVOYW1lO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbi5qcycpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzLmpzJyk7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gR2VuZXJhbCBzdHVmZlxuXG5mdW5jdGlvbiBQRXhwcigpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiUEV4cHIgY2Fubm90IGJlIGluc3RhbnRpYXRlZCAtLSBpdCdzIGFic3RyYWN0XCIpO1xufVxuXG5QRXhwci5wcm90b3R5cGUud2l0aERlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICByZXR1cm4gdGhpcztcbn07XG5cblBFeHByLnByb3RvdHlwZS53aXRoSW50ZXJ2YWwgPSBmdW5jdGlvbihpbnRlcnZhbCkge1xuICB0aGlzLmludGVydmFsID0gaW50ZXJ2YWwudHJpbW1lZCgpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIEFueXRoaW5nXG5cbnZhciBhbnl0aGluZyA9IE9iamVjdC5jcmVhdGUoUEV4cHIucHJvdG90eXBlKTtcblxuLy8gRW5kXG5cbnZhciBlbmQgPSBPYmplY3QuY3JlYXRlKFBFeHByLnByb3RvdHlwZSk7XG5cbi8vIFByaW1pdGl2ZXNcblxuZnVuY3Rpb24gUHJpbShvYmosIG9wdEZyb21JbnRlcnZhbCkge1xuICB0aGlzLm9iaiA9IG9iajtcbiAgaWYgKG9wdEZyb21JbnRlcnZhbCkge1xuICAgIHRoaXMuZnJvbUludGVydmFsID0gb3B0RnJvbUludGVydmFsO1xuICB9XG59XG5pbmhlcml0cyhQcmltLCBQRXhwcik7XG5cbmZ1bmN0aW9uIFN0cmluZ1ByaW0ob2JqLCBvcHRGcm9tSW50ZXJ2YWwpIHtcbiAgdGhpcy5vYmogPSBvYmo7XG4gIGlmIChvcHRGcm9tSW50ZXJ2YWwpIHtcbiAgICB0aGlzLmZyb21JbnRlcnZhbCA9IG9wdEZyb21JbnRlcnZhbDtcbiAgfVxufVxuaW5oZXJpdHMoU3RyaW5nUHJpbSwgUHJpbSk7XG5cbmZ1bmN0aW9uIFJlZ0V4cFByaW0ob2JqLCBvcHRGcm9tSW50ZXJ2YWwpIHtcbiAgdGhpcy5vYmogPSBvYmo7XG4gIGlmIChvcHRGcm9tSW50ZXJ2YWwpIHtcbiAgICB0aGlzLmZyb21JbnRlcnZhbCA9IG9wdEZyb21JbnRlcnZhbDtcbiAgfVxufVxuaW5oZXJpdHMoUmVnRXhwUHJpbSwgUHJpbSk7XG5cbi8vIEFsdGVybmF0aW9uXG5cbmZ1bmN0aW9uIEFsdCh0ZXJtcykge1xuICB0aGlzLnRlcm1zID0gdGVybXM7XG59XG5pbmhlcml0cyhBbHQsIFBFeHByKTtcblxuLy8gRXh0ZW5kIGlzIGFuIGltcGxlbWVudGF0aW9uIGRldGFpbCBvZiBydWxlIGV4dGVuc2lvblxuXG5mdW5jdGlvbiBFeHRlbmQoc3VwZXJHcmFtbWFyLCBuYW1lLCBib2R5KSB7XG4gIHZhciBvcmlnQm9keSA9IHN1cGVyR3JhbW1hci5ydWxlRGljdFtuYW1lXTtcbiAgdGhpcy50ZXJtcyA9IFtib2R5LCBvcmlnQm9keV07XG59XG5pbmhlcml0cyhFeHRlbmQsIEFsdCk7XG5cbi8vIFNlcXVlbmNlc1xuXG5mdW5jdGlvbiBTZXEoZmFjdG9ycykge1xuICB0aGlzLmZhY3RvcnMgPSBmYWN0b3JzO1xufVxuaW5oZXJpdHMoU2VxLCBQRXhwcik7XG5cbi8vIEl0ZXJhdG9ycyBhbmQgb3B0aW9uYWxzXG5cbmZ1bmN0aW9uIE1hbnkoZXhwciwgbWluTnVtTWF0Y2hlcykge1xuICB0aGlzLmV4cHIgPSBleHByO1xuICB0aGlzLm1pbk51bU1hdGNoZXMgPSBtaW5OdW1NYXRjaGVzO1xufVxuaW5oZXJpdHMoTWFueSwgUEV4cHIpO1xuXG5mdW5jdGlvbiBPcHQoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoT3B0LCBQRXhwcik7XG5cbi8vIFByZWRpY2F0ZXNcblxuZnVuY3Rpb24gTm90KGV4cHIpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbn1cbmluaGVyaXRzKE5vdCwgUEV4cHIpO1xuXG5mdW5jdGlvbiBMb29rYWhlYWQoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoTG9va2FoZWFkLCBQRXhwcik7XG5cbi8vIEFycmF5IGRlY29tcG9zaXRpb25cblxuZnVuY3Rpb24gQXJyKGV4cHIpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbn1cbmluaGVyaXRzKEFyciwgUEV4cHIpO1xuXG4vLyBTdHJpbmcgZGVjb21wb3NpdGlvblxuXG5mdW5jdGlvbiBTdHIoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoU3RyLCBQRXhwcik7XG5cbi8vIE9iamVjdCBkZWNvbXBvc2l0aW9uXG5cbmZ1bmN0aW9uIE9iaihwcm9wZXJ0aWVzLCBpc0xlbmllbnQpIHtcbiAgdmFyIG5hbWVzID0gcHJvcGVydGllcy5tYXAoZnVuY3Rpb24ocHJvcGVydHkpIHsgcmV0dXJuIHByb3BlcnR5Lm5hbWU7IH0pO1xuICB2YXIgZHVwbGljYXRlcyA9IGNvbW1vbi5nZXREdXBsaWNhdGVzKG5hbWVzKTtcbiAgaWYgKGR1cGxpY2F0ZXMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuRHVwbGljYXRlUHJvcGVydHlOYW1lcyhkdXBsaWNhdGVzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuICAgIHRoaXMuaXNMZW5pZW50ID0gaXNMZW5pZW50O1xuICB9XG59XG5pbmhlcml0cyhPYmosIFBFeHByKTtcblxuLy8gUnVsZSBhcHBsaWNhdGlvblxuXG5mdW5jdGlvbiBBcHBseShydWxlTmFtZSwgb3B0RnJvbUludGVydmFsKSB7XG4gIHRoaXMucnVsZU5hbWUgPSBydWxlTmFtZTtcbiAgaWYgKG9wdEZyb21JbnRlcnZhbCkge1xuICAgIHRoaXMuZnJvbUludGVydmFsID0gb3B0RnJvbUludGVydmFsO1xuICB9XG59XG5pbmhlcml0cyhBcHBseSwgUEV4cHIpO1xuXG4vLyBUaGlzIG1ldGhvZCBqdXN0IGNhY2hlcyB0aGUgcmVzdWx0IG9mIGB0aGlzLnRvU3RyaW5nKClgIGluIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHkuXG5BcHBseS5wcm90b3R5cGUudG9NZW1vS2V5ID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5fbWVtb0tleSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX21lbW9LZXknLCB7dmFsdWU6IHRoaXMudG9TdHJpbmcoKX0pO1xuICB9XG4gIHJldHVybiB0aGlzLl9tZW1vS2V5O1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydHMubWFrZVByaW0gPSBmdW5jdGlvbihvYmosIG9wdEZyb21JbnRlcnZhbCkge1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgJiYgb2JqLmxlbmd0aCAhPT0gMSkge1xuICAgIHJldHVybiBuZXcgU3RyaW5nUHJpbShvYmosIG9wdEZyb21JbnRlcnZhbCk7XG4gIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHBQcmltKG9iaiwgb3B0RnJvbUludGVydmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IFByaW0ob2JqLCBvcHRGcm9tSW50ZXJ2YWwpO1xuICB9XG59O1xuXG5leHBvcnRzLlBFeHByID0gUEV4cHI7XG5leHBvcnRzLmFueXRoaW5nID0gYW55dGhpbmc7XG5leHBvcnRzLmVuZCA9IGVuZDtcbmV4cG9ydHMuUHJpbSA9IFByaW07XG5leHBvcnRzLlN0cmluZ1ByaW0gPSBTdHJpbmdQcmltO1xuZXhwb3J0cy5SZWdFeHBQcmltID0gUmVnRXhwUHJpbTtcbmV4cG9ydHMuQWx0ID0gQWx0O1xuZXhwb3J0cy5FeHRlbmQgPSBFeHRlbmQ7XG5leHBvcnRzLlNlcSA9IFNlcTtcbmV4cG9ydHMuTWFueSA9IE1hbnk7XG5leHBvcnRzLk9wdCA9IE9wdDtcbmV4cG9ydHMuTm90ID0gTm90O1xuZXhwb3J0cy5Mb29rYWhlYWQgPSBMb29rYWhlYWQ7XG5leHBvcnRzLkFyciA9IEFycjtcbmV4cG9ydHMuU3RyID0gU3RyO1xuZXhwb3J0cy5PYmogPSBPYmo7XG5leHBvcnRzLkFwcGx5ID0gQXBwbHk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHRlbnNpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5yZXF1aXJlKCcuL3BleHBycy1hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24uanMnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWFzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkLmpzJyk7XG5yZXF1aXJlKCcuL3BleHBycy1hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eS5qcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtY2hlY2suanMnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWV2YWwuanMnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLW1heWJlUmVjb3JkRmFpbHVyZS5qcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtZ2V0QXJpdHkuanMnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLW91dHB1dFJlY2lwZS5qcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtdG9EaXNwbGF5U3RyaW5nLmpzJyk7XG5yZXF1aXJlKCcuL3BleHBycy10b0V4cGVjdGVkLmpzJyk7XG5yZXF1aXJlKCcuL3BleHBycy10b1N0cmluZy5qcycpO1xuIiwiLy8gRnJvbSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2VzLWxhYi9zb3VyY2UvYnJvd3NlL3RydW5rL3NyYy9wYXJzZXIvdW5pY29kZS5qc1xuZXhwb3J0cy5Vbmljb2RlQ2F0ZWdvcmllcyA9IHtcbiAgWldOSiA6IC9cXHUyMDBDLyxcbiAgWldKICA6IC9cXHUyMDBELyxcbiAgVEFCICA6IC9cXHUwMDA5LyxcbiAgVlQgICA6IC9cXHUwMDBCLyxcbiAgRkYgICA6IC9cXHUwMDBDLyxcbiAgU1AgICA6IC9cXHUwMDIwLyxcbiAgTkJTUCA6IC9cXHUwMEEwLyxcbiAgQk9NICA6IC9cXHVGRUZGLyxcbiAgTEYgICA6IC9cXHUwMDBBLyxcbiAgQ1IgICA6IC9cXHUwMDBELyxcbiAgTFMgICA6IC9cXHUyMDI4LyxcbiAgUFMgICA6IC9cXHUyMDI5LyxcbiAgTCAgICA6IC9bXFx1MDA0MS1cXHUwMDVBXXxbXFx1MDBDMC1cXHUwMEQ2XXxbXFx1MDBEOC1cXHUwMERFXXxbXFx1MDEwMC1cXHUwMTAwXXxbXFx1MDEwMi1cXHUwMTAyXXxbXFx1MDEwNC1cXHUwMTA0XXxbXFx1MDEwNi1cXHUwMTA2XXxbXFx1MDEwOC1cXHUwMTA4XXxbXFx1MDEwQS1cXHUwMTBBXXxbXFx1MDEwQy1cXHUwMTBDXXxbXFx1MDEwRS1cXHUwMTBFXXxbXFx1MDExMC1cXHUwMTEwXXxbXFx1MDExMi1cXHUwMTEyXXxbXFx1MDExNC1cXHUwMTE0XXxbXFx1MDExNi1cXHUwMTE2XXxbXFx1MDExOC1cXHUwMTE4XXxbXFx1MDExQS1cXHUwMTFBXXxbXFx1MDExQy1cXHUwMTFDXXxbXFx1MDExRS1cXHUwMTFFXXxbXFx1MDEyMC1cXHUwMTIwXXxbXFx1MDEyMi1cXHUwMTIyXXxbXFx1MDEyNC1cXHUwMTI0XXxbXFx1MDEyNi1cXHUwMTI2XXxbXFx1MDEyOC1cXHUwMTI4XXxbXFx1MDEyQS1cXHUwMTJBXXxbXFx1MDEyQy1cXHUwMTJDXXxbXFx1MDEyRS1cXHUwMTJFXXxbXFx1MDEzMC1cXHUwMTMwXXxbXFx1MDEzMi1cXHUwMTMyXXxbXFx1MDEzNC1cXHUwMTM0XXxbXFx1MDEzNi1cXHUwMTM2XXxbXFx1MDEzOS1cXHUwMTM5XXxbXFx1MDEzQi1cXHUwMTNCXXxbXFx1MDEzRC1cXHUwMTNEXXxbXFx1MDEzRi1cXHUwMTNGXXxbXFx1MDE0MS1cXHUwMTQxXXxbXFx1MDE0My1cXHUwMTQzXXxbXFx1MDE0NS1cXHUwMTQ1XXxbXFx1MDE0Ny1cXHUwMTQ3XXxbXFx1MDE0QS1cXHUwMTRBXXxbXFx1MDE0Qy1cXHUwMTRDXXxbXFx1MDE0RS1cXHUwMTRFXXxbXFx1MDE1MC1cXHUwMTUwXXxbXFx1MDE1Mi1cXHUwMTUyXXxbXFx1MDE1NC1cXHUwMTU0XXxbXFx1MDE1Ni1cXHUwMTU2XXxbXFx1MDE1OC1cXHUwMTU4XXxbXFx1MDE1QS1cXHUwMTVBXXxbXFx1MDE1Qy1cXHUwMTVDXXxbXFx1MDE1RS1cXHUwMTVFXXxbXFx1MDE2MC1cXHUwMTYwXXxbXFx1MDE2Mi1cXHUwMTYyXXxbXFx1MDE2NC1cXHUwMTY0XXxbXFx1MDE2Ni1cXHUwMTY2XXxbXFx1MDE2OC1cXHUwMTY4XXxbXFx1MDE2QS1cXHUwMTZBXXxbXFx1MDE2Qy1cXHUwMTZDXXxbXFx1MDE2RS1cXHUwMTZFXXxbXFx1MDE3MC1cXHUwMTcwXXxbXFx1MDE3Mi1cXHUwMTcyXXxbXFx1MDE3NC1cXHUwMTc0XXxbXFx1MDE3Ni1cXHUwMTc2XXxbXFx1MDE3OC1cXHUwMTc5XXxbXFx1MDE3Qi1cXHUwMTdCXXxbXFx1MDE3RC1cXHUwMTdEXXxbXFx1MDE4MS1cXHUwMTgyXXxbXFx1MDE4NC1cXHUwMTg0XXxbXFx1MDE4Ni1cXHUwMTg3XXxbXFx1MDE4OS1cXHUwMThCXXxbXFx1MDE4RS1cXHUwMTkxXXxbXFx1MDE5My1cXHUwMTk0XXxbXFx1MDE5Ni1cXHUwMTk4XXxbXFx1MDE5Qy1cXHUwMTlEXXxbXFx1MDE5Ri1cXHUwMUEwXXxbXFx1MDFBMi1cXHUwMUEyXXxbXFx1MDFBNC1cXHUwMUE0XXxbXFx1MDFBNi1cXHUwMUE3XXxbXFx1MDFBOS1cXHUwMUE5XXxbXFx1MDFBQy1cXHUwMUFDXXxbXFx1MDFBRS1cXHUwMUFGXXxbXFx1MDFCMS1cXHUwMUIzXXxbXFx1MDFCNS1cXHUwMUI1XXxbXFx1MDFCNy1cXHUwMUI4XXxbXFx1MDFCQy1cXHUwMUJDXXxbXFx1MDFDNC1cXHUwMUM0XXxbXFx1MDFDNy1cXHUwMUM3XXxbXFx1MDFDQS1cXHUwMUNBXXxbXFx1MDFDRC1cXHUwMUNEXXxbXFx1MDFDRi1cXHUwMUNGXXxbXFx1MDFEMS1cXHUwMUQxXXxbXFx1MDFEMy1cXHUwMUQzXXxbXFx1MDFENS1cXHUwMUQ1XXxbXFx1MDFENy1cXHUwMUQ3XXxbXFx1MDFEOS1cXHUwMUQ5XXxbXFx1MDFEQi1cXHUwMURCXXxbXFx1MDFERS1cXHUwMURFXXxbXFx1MDFFMC1cXHUwMUUwXXxbXFx1MDFFMi1cXHUwMUUyXXxbXFx1MDFFNC1cXHUwMUU0XXxbXFx1MDFFNi1cXHUwMUU2XXxbXFx1MDFFOC1cXHUwMUU4XXxbXFx1MDFFQS1cXHUwMUVBXXxbXFx1MDFFQy1cXHUwMUVDXXxbXFx1MDFFRS1cXHUwMUVFXXxbXFx1MDFGMS1cXHUwMUYxXXxbXFx1MDFGNC1cXHUwMUY0XXxbXFx1MDFGQS1cXHUwMUZBXXxbXFx1MDFGQy1cXHUwMUZDXXxbXFx1MDFGRS1cXHUwMUZFXXxbXFx1MDIwMC1cXHUwMjAwXXxbXFx1MDIwMi1cXHUwMjAyXXxbXFx1MDIwNC1cXHUwMjA0XXxbXFx1MDIwNi1cXHUwMjA2XXxbXFx1MDIwOC1cXHUwMjA4XXxbXFx1MDIwQS1cXHUwMjBBXXxbXFx1MDIwQy1cXHUwMjBDXXxbXFx1MDIwRS1cXHUwMjBFXXxbXFx1MDIxMC1cXHUwMjEwXXxbXFx1MDIxMi1cXHUwMjEyXXxbXFx1MDIxNC1cXHUwMjE0XXxbXFx1MDIxNi1cXHUwMjE2XXxbXFx1MDM4Ni1cXHUwMzg2XXxbXFx1MDM4OC1cXHUwMzhBXXxbXFx1MDM4Qy1cXHUwMzhDXXxbXFx1MDM4RS1cXHUwMzhGXXxbXFx1MDM5MS1cXHUwM0ExXXxbXFx1MDNBMy1cXHUwM0FCXXxbXFx1MDNEMi1cXHUwM0Q0XXxbXFx1MDNEQS1cXHUwM0RBXXxbXFx1MDNEQy1cXHUwM0RDXXxbXFx1MDNERS1cXHUwM0RFXXxbXFx1MDNFMC1cXHUwM0UwXXxbXFx1MDNFMi1cXHUwM0UyXXxbXFx1MDNFNC1cXHUwM0U0XXxbXFx1MDNFNi1cXHUwM0U2XXxbXFx1MDNFOC1cXHUwM0U4XXxbXFx1MDNFQS1cXHUwM0VBXXxbXFx1MDNFQy1cXHUwM0VDXXxbXFx1MDNFRS1cXHUwM0VFXXxbXFx1MDQwMS1cXHUwNDBDXXxbXFx1MDQwRS1cXHUwNDJGXXxbXFx1MDQ2MC1cXHUwNDYwXXxbXFx1MDQ2Mi1cXHUwNDYyXXxbXFx1MDQ2NC1cXHUwNDY0XXxbXFx1MDQ2Ni1cXHUwNDY2XXxbXFx1MDQ2OC1cXHUwNDY4XXxbXFx1MDQ2QS1cXHUwNDZBXXxbXFx1MDQ2Qy1cXHUwNDZDXXxbXFx1MDQ2RS1cXHUwNDZFXXxbXFx1MDQ3MC1cXHUwNDcwXXxbXFx1MDQ3Mi1cXHUwNDcyXXxbXFx1MDQ3NC1cXHUwNDc0XXxbXFx1MDQ3Ni1cXHUwNDc2XXxbXFx1MDQ3OC1cXHUwNDc4XXxbXFx1MDQ3QS1cXHUwNDdBXXxbXFx1MDQ3Qy1cXHUwNDdDXXxbXFx1MDQ3RS1cXHUwNDdFXXxbXFx1MDQ4MC1cXHUwNDgwXXxbXFx1MDQ5MC1cXHUwNDkwXXxbXFx1MDQ5Mi1cXHUwNDkyXXxbXFx1MDQ5NC1cXHUwNDk0XXxbXFx1MDQ5Ni1cXHUwNDk2XXxbXFx1MDQ5OC1cXHUwNDk4XXxbXFx1MDQ5QS1cXHUwNDlBXXxbXFx1MDQ5Qy1cXHUwNDlDXXxbXFx1MDQ5RS1cXHUwNDlFXXxbXFx1MDRBMC1cXHUwNEEwXXxbXFx1MDRBMi1cXHUwNEEyXXxbXFx1MDRBNC1cXHUwNEE0XXxbXFx1MDRBNi1cXHUwNEE2XXxbXFx1MDRBOC1cXHUwNEE4XXxbXFx1MDRBQS1cXHUwNEFBXXxbXFx1MDRBQy1cXHUwNEFDXXxbXFx1MDRBRS1cXHUwNEFFXXxbXFx1MDRCMC1cXHUwNEIwXXxbXFx1MDRCMi1cXHUwNEIyXXxbXFx1MDRCNC1cXHUwNEI0XXxbXFx1MDRCNi1cXHUwNEI2XXxbXFx1MDRCOC1cXHUwNEI4XXxbXFx1MDRCQS1cXHUwNEJBXXxbXFx1MDRCQy1cXHUwNEJDXXxbXFx1MDRCRS1cXHUwNEJFXXxbXFx1MDRDMS1cXHUwNEMxXXxbXFx1MDRDMy1cXHUwNEMzXXxbXFx1MDRDNy1cXHUwNEM3XXxbXFx1MDRDQi1cXHUwNENCXXxbXFx1MDREMC1cXHUwNEQwXXxbXFx1MDREMi1cXHUwNEQyXXxbXFx1MDRENC1cXHUwNEQ0XXxbXFx1MDRENi1cXHUwNEQ2XXxbXFx1MDREOC1cXHUwNEQ4XXxbXFx1MDREQS1cXHUwNERBXXxbXFx1MDREQy1cXHUwNERDXXxbXFx1MDRERS1cXHUwNERFXXxbXFx1MDRFMC1cXHUwNEUwXXxbXFx1MDRFMi1cXHUwNEUyXXxbXFx1MDRFNC1cXHUwNEU0XXxbXFx1MDRFNi1cXHUwNEU2XXxbXFx1MDRFOC1cXHUwNEU4XXxbXFx1MDRFQS1cXHUwNEVBXXxbXFx1MDRFRS1cXHUwNEVFXXxbXFx1MDRGMC1cXHUwNEYwXXxbXFx1MDRGMi1cXHUwNEYyXXxbXFx1MDRGNC1cXHUwNEY0XXxbXFx1MDRGOC1cXHUwNEY4XXxbXFx1MDUzMS1cXHUwNTU2XXxbXFx1MTBBMC1cXHUxMEM1XXxbXFx1MUUwMC1cXHUxRTAwXXxbXFx1MUUwMi1cXHUxRTAyXXxbXFx1MUUwNC1cXHUxRTA0XXxbXFx1MUUwNi1cXHUxRTA2XXxbXFx1MUUwOC1cXHUxRTA4XXxbXFx1MUUwQS1cXHUxRTBBXXxbXFx1MUUwQy1cXHUxRTBDXXxbXFx1MUUwRS1cXHUxRTBFXXxbXFx1MUUxMC1cXHUxRTEwXXxbXFx1MUUxMi1cXHUxRTEyXXxbXFx1MUUxNC1cXHUxRTE0XXxbXFx1MUUxNi1cXHUxRTE2XXxbXFx1MUUxOC1cXHUxRTE4XXxbXFx1MUUxQS1cXHUxRTFBXXxbXFx1MUUxQy1cXHUxRTFDXXxbXFx1MUUxRS1cXHUxRTFFXXxbXFx1MUUyMC1cXHUxRTIwXXxbXFx1MUUyMi1cXHUxRTIyXXxbXFx1MUUyNC1cXHUxRTI0XXxbXFx1MUUyNi1cXHUxRTI2XXxbXFx1MUUyOC1cXHUxRTI4XXxbXFx1MUUyQS1cXHUxRTJBXXxbXFx1MUUyQy1cXHUxRTJDXXxbXFx1MUUyRS1cXHUxRTJFXXxbXFx1MUUzMC1cXHUxRTMwXXxbXFx1MUUzMi1cXHUxRTMyXXxbXFx1MUUzNC1cXHUxRTM0XXxbXFx1MUUzNi1cXHUxRTM2XXxbXFx1MUUzOC1cXHUxRTM4XXxbXFx1MUUzQS1cXHUxRTNBXXxbXFx1MUUzQy1cXHUxRTNDXXxbXFx1MUUzRS1cXHUxRTNFXXxbXFx1MUU0MC1cXHUxRTQwXXxbXFx1MUU0Mi1cXHUxRTQyXXxbXFx1MUU0NC1cXHUxRTQ0XXxbXFx1MUU0Ni1cXHUxRTQ2XXxbXFx1MUU0OC1cXHUxRTQ4XXxbXFx1MUU0QS1cXHUxRTRBXXxbXFx1MUU0Qy1cXHUxRTRDXXxbXFx1MUU0RS1cXHUxRTRFXXxbXFx1MUU1MC1cXHUxRTUwXXxbXFx1MUU1Mi1cXHUxRTUyXXxbXFx1MUU1NC1cXHUxRTU0XXxbXFx1MUU1Ni1cXHUxRTU2XXxbXFx1MUU1OC1cXHUxRTU4XXxbXFx1MUU1QS1cXHUxRTVBXXxbXFx1MUU1Qy1cXHUxRTVDXXxbXFx1MUU1RS1cXHUxRTVFXXxbXFx1MUU2MC1cXHUxRTYwXXxbXFx1MUU2Mi1cXHUxRTYyXXxbXFx1MUU2NC1cXHUxRTY0XXxbXFx1MUU2Ni1cXHUxRTY2XXxbXFx1MUU2OC1cXHUxRTY4XXxbXFx1MUU2QS1cXHUxRTZBXXxbXFx1MUU2Qy1cXHUxRTZDXXxbXFx1MUU2RS1cXHUxRTZFXXxbXFx1MUU3MC1cXHUxRTcwXXxbXFx1MUU3Mi1cXHUxRTcyXXxbXFx1MUU3NC1cXHUxRTc0XXxbXFx1MUU3Ni1cXHUxRTc2XXxbXFx1MUU3OC1cXHUxRTc4XXxbXFx1MUU3QS1cXHUxRTdBXXxbXFx1MUU3Qy1cXHUxRTdDXXxbXFx1MUU3RS1cXHUxRTdFXXxbXFx1MUU4MC1cXHUxRTgwXXxbXFx1MUU4Mi1cXHUxRTgyXXxbXFx1MUU4NC1cXHUxRTg0XXxbXFx1MUU4Ni1cXHUxRTg2XXxbXFx1MUU4OC1cXHUxRTg4XXxbXFx1MUU4QS1cXHUxRThBXXxbXFx1MUU4Qy1cXHUxRThDXXxbXFx1MUU4RS1cXHUxRThFXXxbXFx1MUU5MC1cXHUxRTkwXXxbXFx1MUU5Mi1cXHUxRTkyXXxbXFx1MUU5NC1cXHUxRTk0XXxbXFx1MUVBMC1cXHUxRUEwXXxbXFx1MUVBMi1cXHUxRUEyXXxbXFx1MUVBNC1cXHUxRUE0XXxbXFx1MUVBNi1cXHUxRUE2XXxbXFx1MUVBOC1cXHUxRUE4XXxbXFx1MUVBQS1cXHUxRUFBXXxbXFx1MUVBQy1cXHUxRUFDXXxbXFx1MUVBRS1cXHUxRUFFXXxbXFx1MUVCMC1cXHUxRUIwXXxbXFx1MUVCMi1cXHUxRUIyXXxbXFx1MUVCNC1cXHUxRUI0XXxbXFx1MUVCNi1cXHUxRUI2XXxbXFx1MUVCOC1cXHUxRUI4XXxbXFx1MUVCQS1cXHUxRUJBXXxbXFx1MUVCQy1cXHUxRUJDXXxbXFx1MUVCRS1cXHUxRUJFXXxbXFx1MUVDMC1cXHUxRUMwXXxbXFx1MUVDMi1cXHUxRUMyXXxbXFx1MUVDNC1cXHUxRUM0XXxbXFx1MUVDNi1cXHUxRUM2XXxbXFx1MUVDOC1cXHUxRUM4XXxbXFx1MUVDQS1cXHUxRUNBXXxbXFx1MUVDQy1cXHUxRUNDXXxbXFx1MUVDRS1cXHUxRUNFXXxbXFx1MUVEMC1cXHUxRUQwXXxbXFx1MUVEMi1cXHUxRUQyXXxbXFx1MUVENC1cXHUxRUQ0XXxbXFx1MUVENi1cXHUxRUQ2XXxbXFx1MUVEOC1cXHUxRUQ4XXxbXFx1MUVEQS1cXHUxRURBXXxbXFx1MUVEQy1cXHUxRURDXXxbXFx1MUVERS1cXHUxRURFXXxbXFx1MUVFMC1cXHUxRUUwXXxbXFx1MUVFMi1cXHUxRUUyXXxbXFx1MUVFNC1cXHUxRUU0XXxbXFx1MUVFNi1cXHUxRUU2XXxbXFx1MUVFOC1cXHUxRUU4XXxbXFx1MUVFQS1cXHUxRUVBXXxbXFx1MUVFQy1cXHUxRUVDXXxbXFx1MUVFRS1cXHUxRUVFXXxbXFx1MUVGMC1cXHUxRUYwXXxbXFx1MUVGMi1cXHUxRUYyXXxbXFx1MUVGNC1cXHUxRUY0XXxbXFx1MUVGNi1cXHUxRUY2XXxbXFx1MUVGOC1cXHUxRUY4XXxbXFx1MUYwOC1cXHUxRjBGXXxbXFx1MUYxOC1cXHUxRjFEXXxbXFx1MUYyOC1cXHUxRjJGXXxbXFx1MUYzOC1cXHUxRjNGXXxbXFx1MUY0OC1cXHUxRjREXXxbXFx1MUY1OS1cXHUxRjU5XXxbXFx1MUY1Qi1cXHUxRjVCXXxbXFx1MUY1RC1cXHUxRjVEXXxbXFx1MUY1Ri1cXHUxRjVGXXxbXFx1MUY2OC1cXHUxRjZGXXxbXFx1MUY4OC1cXHUxRjhGXXxbXFx1MUY5OC1cXHUxRjlGXXxbXFx1MUZBOC1cXHUxRkFGXXxbXFx1MUZCOC1cXHUxRkJDXXxbXFx1MUZDOC1cXHUxRkNDXXxbXFx1MUZEOC1cXHUxRkRCXXxbXFx1MUZFOC1cXHUxRkVDXXxbXFx1MUZGOC1cXHUxRkZDXXxbXFx1MjEwMi1cXHUyMTAyXXxbXFx1MjEwNy1cXHUyMTA3XXxbXFx1MjEwQi1cXHUyMTBEXXxbXFx1MjExMC1cXHUyMTEyXXxbXFx1MjExNS1cXHUyMTE1XXxbXFx1MjExOS1cXHUyMTFEXXxbXFx1MjEyNC1cXHUyMTI0XXxbXFx1MjEyNi1cXHUyMTI2XXxbXFx1MjEyOC1cXHUyMTI4XXxbXFx1MjEyQS1cXHUyMTJEXXxbXFx1MjEzMC1cXHUyMTMxXXxbXFx1MjEzMy1cXHUyMTMzXXxbXFx1RkYyMS1cXHVGRjNBXXxbXFx1MDA2MS1cXHUwMDdBXXxbXFx1MDBBQS1cXHUwMEFBXXxbXFx1MDBCNS1cXHUwMEI1XXxbXFx1MDBCQS1cXHUwMEJBXXxbXFx1MDBERi1cXHUwMEY2XXxbXFx1MDBGOC1cXHUwMEZGXXxbXFx1MDEwMS1cXHUwMTAxXXxbXFx1MDEwMy1cXHUwMTAzXXxbXFx1MDEwNS1cXHUwMTA1XXxbXFx1MDEwNy1cXHUwMTA3XXxbXFx1MDEwOS1cXHUwMTA5XXxbXFx1MDEwQi1cXHUwMTBCXXxbXFx1MDEwRC1cXHUwMTBEXXxbXFx1MDEwRi1cXHUwMTBGXXxbXFx1MDExMS1cXHUwMTExXXxbXFx1MDExMy1cXHUwMTEzXXxbXFx1MDExNS1cXHUwMTE1XXxbXFx1MDExNy1cXHUwMTE3XXxbXFx1MDExOS1cXHUwMTE5XXxbXFx1MDExQi1cXHUwMTFCXXxbXFx1MDExRC1cXHUwMTFEXXxbXFx1MDExRi1cXHUwMTFGXXxbXFx1MDEyMS1cXHUwMTIxXXxbXFx1MDEyMy1cXHUwMTIzXXxbXFx1MDEyNS1cXHUwMTI1XXxbXFx1MDEyNy1cXHUwMTI3XXxbXFx1MDEyOS1cXHUwMTI5XXxbXFx1MDEyQi1cXHUwMTJCXXxbXFx1MDEyRC1cXHUwMTJEXXxbXFx1MDEyRi1cXHUwMTJGXXxbXFx1MDEzMS1cXHUwMTMxXXxbXFx1MDEzMy1cXHUwMTMzXXxbXFx1MDEzNS1cXHUwMTM1XXxbXFx1MDEzNy1cXHUwMTM4XXxbXFx1MDEzQS1cXHUwMTNBXXxbXFx1MDEzQy1cXHUwMTNDXXxbXFx1MDEzRS1cXHUwMTNFXXxbXFx1MDE0MC1cXHUwMTQwXXxbXFx1MDE0Mi1cXHUwMTQyXXxbXFx1MDE0NC1cXHUwMTQ0XXxbXFx1MDE0Ni1cXHUwMTQ2XXxbXFx1MDE0OC1cXHUwMTQ5XXxbXFx1MDE0Qi1cXHUwMTRCXXxbXFx1MDE0RC1cXHUwMTREXXxbXFx1MDE0Ri1cXHUwMTRGXXxbXFx1MDE1MS1cXHUwMTUxXXxbXFx1MDE1My1cXHUwMTUzXXxbXFx1MDE1NS1cXHUwMTU1XXxbXFx1MDE1Ny1cXHUwMTU3XXxbXFx1MDE1OS1cXHUwMTU5XXxbXFx1MDE1Qi1cXHUwMTVCXXxbXFx1MDE1RC1cXHUwMTVEXXxbXFx1MDE1Ri1cXHUwMTVGXXxbXFx1MDE2MS1cXHUwMTYxXXxbXFx1MDE2My1cXHUwMTYzXXxbXFx1MDE2NS1cXHUwMTY1XXxbXFx1MDE2Ny1cXHUwMTY3XXxbXFx1MDE2OS1cXHUwMTY5XXxbXFx1MDE2Qi1cXHUwMTZCXXxbXFx1MDE2RC1cXHUwMTZEXXxbXFx1MDE2Ri1cXHUwMTZGXXxbXFx1MDE3MS1cXHUwMTcxXXxbXFx1MDE3My1cXHUwMTczXXxbXFx1MDE3NS1cXHUwMTc1XXxbXFx1MDE3Ny1cXHUwMTc3XXxbXFx1MDE3QS1cXHUwMTdBXXxbXFx1MDE3Qy1cXHUwMTdDXXxbXFx1MDE3RS1cXHUwMTgwXXxbXFx1MDE4My1cXHUwMTgzXXxbXFx1MDE4NS1cXHUwMTg1XXxbXFx1MDE4OC1cXHUwMTg4XXxbXFx1MDE4Qy1cXHUwMThEXXxbXFx1MDE5Mi1cXHUwMTkyXXxbXFx1MDE5NS1cXHUwMTk1XXxbXFx1MDE5OS1cXHUwMTlCXXxbXFx1MDE5RS1cXHUwMTlFXXxbXFx1MDFBMS1cXHUwMUExXXxbXFx1MDFBMy1cXHUwMUEzXXxbXFx1MDFBNS1cXHUwMUE1XXxbXFx1MDFBOC1cXHUwMUE4XXxbXFx1MDFBQi1cXHUwMUFCXXxbXFx1MDFBRC1cXHUwMUFEXXxbXFx1MDFCMC1cXHUwMUIwXXxbXFx1MDFCNC1cXHUwMUI0XXxbXFx1MDFCNi1cXHUwMUI2XXxbXFx1MDFCOS1cXHUwMUJBXXxbXFx1MDFCRC1cXHUwMUJEXXxbXFx1MDFDNi1cXHUwMUM2XXxbXFx1MDFDOS1cXHUwMUM5XXxbXFx1MDFDQy1cXHUwMUNDXXxbXFx1MDFDRS1cXHUwMUNFXXxbXFx1MDFEMC1cXHUwMUQwXXxbXFx1MDFEMi1cXHUwMUQyXXxbXFx1MDFENC1cXHUwMUQ0XXxbXFx1MDFENi1cXHUwMUQ2XXxbXFx1MDFEOC1cXHUwMUQ4XXxbXFx1MDFEQS1cXHUwMURBXXxbXFx1MDFEQy1cXHUwMUREXXxbXFx1MDFERi1cXHUwMURGXXxbXFx1MDFFMS1cXHUwMUUxXXxbXFx1MDFFMy1cXHUwMUUzXXxbXFx1MDFFNS1cXHUwMUU1XXxbXFx1MDFFNy1cXHUwMUU3XXxbXFx1MDFFOS1cXHUwMUU5XXxbXFx1MDFFQi1cXHUwMUVCXXxbXFx1MDFFRC1cXHUwMUVEXXxbXFx1MDFFRi1cXHUwMUYwXXxbXFx1MDFGMy1cXHUwMUYzXXxbXFx1MDFGNS1cXHUwMUY1XXxbXFx1MDFGQi1cXHUwMUZCXXxbXFx1MDFGRC1cXHUwMUZEXXxbXFx1MDFGRi1cXHUwMUZGXXxbXFx1MDIwMS1cXHUwMjAxXXxbXFx1MDIwMy1cXHUwMjAzXXxbXFx1MDIwNS1cXHUwMjA1XXxbXFx1MDIwNy1cXHUwMjA3XXxbXFx1MDIwOS1cXHUwMjA5XXxbXFx1MDIwQi1cXHUwMjBCXXxbXFx1MDIwRC1cXHUwMjBEXXxbXFx1MDIwRi1cXHUwMjBGXXxbXFx1MDIxMS1cXHUwMjExXXxbXFx1MDIxMy1cXHUwMjEzXXxbXFx1MDIxNS1cXHUwMjE1XXxbXFx1MDIxNy1cXHUwMjE3XXxbXFx1MDI1MC1cXHUwMkE4XXxbXFx1MDM5MC1cXHUwMzkwXXxbXFx1MDNBQy1cXHUwM0NFXXxbXFx1MDNEMC1cXHUwM0QxXXxbXFx1MDNENS1cXHUwM0Q2XXxbXFx1MDNFMy1cXHUwM0UzXXxbXFx1MDNFNS1cXHUwM0U1XXxbXFx1MDNFNy1cXHUwM0U3XXxbXFx1MDNFOS1cXHUwM0U5XXxbXFx1MDNFQi1cXHUwM0VCXXxbXFx1MDNFRC1cXHUwM0VEXXxbXFx1MDNFRi1cXHUwM0YyXXxbXFx1MDQzMC1cXHUwNDRGXXxbXFx1MDQ1MS1cXHUwNDVDXXxbXFx1MDQ1RS1cXHUwNDVGXXxbXFx1MDQ2MS1cXHUwNDYxXXxbXFx1MDQ2My1cXHUwNDYzXXxbXFx1MDQ2NS1cXHUwNDY1XXxbXFx1MDQ2Ny1cXHUwNDY3XXxbXFx1MDQ2OS1cXHUwNDY5XXxbXFx1MDQ2Qi1cXHUwNDZCXXxbXFx1MDQ2RC1cXHUwNDZEXXxbXFx1MDQ2Ri1cXHUwNDZGXXxbXFx1MDQ3MS1cXHUwNDcxXXxbXFx1MDQ3My1cXHUwNDczXXxbXFx1MDQ3NS1cXHUwNDc1XXxbXFx1MDQ3Ny1cXHUwNDc3XXxbXFx1MDQ3OS1cXHUwNDc5XXxbXFx1MDQ3Qi1cXHUwNDdCXXxbXFx1MDQ3RC1cXHUwNDdEXXxbXFx1MDQ3Ri1cXHUwNDdGXXxbXFx1MDQ4MS1cXHUwNDgxXXxbXFx1MDQ5MS1cXHUwNDkxXXxbXFx1MDQ5My1cXHUwNDkzXXxbXFx1MDQ5NS1cXHUwNDk1XXxbXFx1MDQ5Ny1cXHUwNDk3XXxbXFx1MDQ5OS1cXHUwNDk5XXxbXFx1MDQ5Qi1cXHUwNDlCXXxbXFx1MDQ5RC1cXHUwNDlEXXxbXFx1MDQ5Ri1cXHUwNDlGXXxbXFx1MDRBMS1cXHUwNEExXXxbXFx1MDRBMy1cXHUwNEEzXXxbXFx1MDRBNS1cXHUwNEE1XXxbXFx1MDRBNy1cXHUwNEE3XXxbXFx1MDRBOS1cXHUwNEE5XXxbXFx1MDRBQi1cXHUwNEFCXXxbXFx1MDRBRC1cXHUwNEFEXXxbXFx1MDRBRi1cXHUwNEFGXXxbXFx1MDRCMS1cXHUwNEIxXXxbXFx1MDRCMy1cXHUwNEIzXXxbXFx1MDRCNS1cXHUwNEI1XXxbXFx1MDRCNy1cXHUwNEI3XXxbXFx1MDRCOS1cXHUwNEI5XXxbXFx1MDRCQi1cXHUwNEJCXXxbXFx1MDRCRC1cXHUwNEJEXXxbXFx1MDRCRi1cXHUwNEJGXXxbXFx1MDRDMi1cXHUwNEMyXXxbXFx1MDRDNC1cXHUwNEM0XXxbXFx1MDRDOC1cXHUwNEM4XXxbXFx1MDRDQy1cXHUwNENDXXxbXFx1MDREMS1cXHUwNEQxXXxbXFx1MDREMy1cXHUwNEQzXXxbXFx1MDRENS1cXHUwNEQ1XXxbXFx1MDRENy1cXHUwNEQ3XXxbXFx1MDREOS1cXHUwNEQ5XXxbXFx1MDREQi1cXHUwNERCXXxbXFx1MDRERC1cXHUwNEREXXxbXFx1MDRERi1cXHUwNERGXXxbXFx1MDRFMS1cXHUwNEUxXXxbXFx1MDRFMy1cXHUwNEUzXXxbXFx1MDRFNS1cXHUwNEU1XXxbXFx1MDRFNy1cXHUwNEU3XXxbXFx1MDRFOS1cXHUwNEU5XXxbXFx1MDRFQi1cXHUwNEVCXXxbXFx1MDRFRi1cXHUwNEVGXXxbXFx1MDRGMS1cXHUwNEYxXXxbXFx1MDRGMy1cXHUwNEYzXXxbXFx1MDRGNS1cXHUwNEY1XXxbXFx1MDRGOS1cXHUwNEY5XXxbXFx1MDU2MS1cXHUwNTg3XXxbXFx1MTBEMC1cXHUxMEY2XXxbXFx1MUUwMS1cXHUxRTAxXXxbXFx1MUUwMy1cXHUxRTAzXXxbXFx1MUUwNS1cXHUxRTA1XXxbXFx1MUUwNy1cXHUxRTA3XXxbXFx1MUUwOS1cXHUxRTA5XXxbXFx1MUUwQi1cXHUxRTBCXXxbXFx1MUUwRC1cXHUxRTBEXXxbXFx1MUUwRi1cXHUxRTBGXXxbXFx1MUUxMS1cXHUxRTExXXxbXFx1MUUxMy1cXHUxRTEzXXxbXFx1MUUxNS1cXHUxRTE1XXxbXFx1MUUxNy1cXHUxRTE3XXxbXFx1MUUxOS1cXHUxRTE5XXxbXFx1MUUxQi1cXHUxRTFCXXxbXFx1MUUxRC1cXHUxRTFEXXxbXFx1MUUxRi1cXHUxRTFGXXxbXFx1MUUyMS1cXHUxRTIxXXxbXFx1MUUyMy1cXHUxRTIzXXxbXFx1MUUyNS1cXHUxRTI1XXxbXFx1MUUyNy1cXHUxRTI3XXxbXFx1MUUyOS1cXHUxRTI5XXxbXFx1MUUyQi1cXHUxRTJCXXxbXFx1MUUyRC1cXHUxRTJEXXxbXFx1MUUyRi1cXHUxRTJGXXxbXFx1MUUzMS1cXHUxRTMxXXxbXFx1MUUzMy1cXHUxRTMzXXxbXFx1MUUzNS1cXHUxRTM1XXxbXFx1MUUzNy1cXHUxRTM3XXxbXFx1MUUzOS1cXHUxRTM5XXxbXFx1MUUzQi1cXHUxRTNCXXxbXFx1MUUzRC1cXHUxRTNEXXxbXFx1MUUzRi1cXHUxRTNGXXxbXFx1MUU0MS1cXHUxRTQxXXxbXFx1MUU0My1cXHUxRTQzXXxbXFx1MUU0NS1cXHUxRTQ1XXxbXFx1MUU0Ny1cXHUxRTQ3XXxbXFx1MUU0OS1cXHUxRTQ5XXxbXFx1MUU0Qi1cXHUxRTRCXXxbXFx1MUU0RC1cXHUxRTREXXxbXFx1MUU0Ri1cXHUxRTRGXXxbXFx1MUU1MS1cXHUxRTUxXXxbXFx1MUU1My1cXHUxRTUzXXxbXFx1MUU1NS1cXHUxRTU1XXxbXFx1MUU1Ny1cXHUxRTU3XXxbXFx1MUU1OS1cXHUxRTU5XXxbXFx1MUU1Qi1cXHUxRTVCXXxbXFx1MUU1RC1cXHUxRTVEXXxbXFx1MUU1Ri1cXHUxRTVGXXxbXFx1MUU2MS1cXHUxRTYxXXxbXFx1MUU2My1cXHUxRTYzXXxbXFx1MUU2NS1cXHUxRTY1XXxbXFx1MUU2Ny1cXHUxRTY3XXxbXFx1MUU2OS1cXHUxRTY5XXxbXFx1MUU2Qi1cXHUxRTZCXXxbXFx1MUU2RC1cXHUxRTZEXXxbXFx1MUU2Ri1cXHUxRTZGXXxbXFx1MUU3MS1cXHUxRTcxXXxbXFx1MUU3My1cXHUxRTczXXxbXFx1MUU3NS1cXHUxRTc1XXxbXFx1MUU3Ny1cXHUxRTc3XXxbXFx1MUU3OS1cXHUxRTc5XXxbXFx1MUU3Qi1cXHUxRTdCXXxbXFx1MUU3RC1cXHUxRTdEXXxbXFx1MUU3Ri1cXHUxRTdGXXxbXFx1MUU4MS1cXHUxRTgxXXxbXFx1MUU4My1cXHUxRTgzXXxbXFx1MUU4NS1cXHUxRTg1XXxbXFx1MUU4Ny1cXHUxRTg3XXxbXFx1MUU4OS1cXHUxRTg5XXxbXFx1MUU4Qi1cXHUxRThCXXxbXFx1MUU4RC1cXHUxRThEXXxbXFx1MUU4Ri1cXHUxRThGXXxbXFx1MUU5MS1cXHUxRTkxXXxbXFx1MUU5My1cXHUxRTkzXXxbXFx1MUU5NS1cXHUxRTlCXXxbXFx1MUVBMS1cXHUxRUExXXxbXFx1MUVBMy1cXHUxRUEzXXxbXFx1MUVBNS1cXHUxRUE1XXxbXFx1MUVBNy1cXHUxRUE3XXxbXFx1MUVBOS1cXHUxRUE5XXxbXFx1MUVBQi1cXHUxRUFCXXxbXFx1MUVBRC1cXHUxRUFEXXxbXFx1MUVBRi1cXHUxRUFGXXxbXFx1MUVCMS1cXHUxRUIxXXxbXFx1MUVCMy1cXHUxRUIzXXxbXFx1MUVCNS1cXHUxRUI1XXxbXFx1MUVCNy1cXHUxRUI3XXxbXFx1MUVCOS1cXHUxRUI5XXxbXFx1MUVCQi1cXHUxRUJCXXxbXFx1MUVCRC1cXHUxRUJEXXxbXFx1MUVCRi1cXHUxRUJGXXxbXFx1MUVDMS1cXHUxRUMxXXxbXFx1MUVDMy1cXHUxRUMzXXxbXFx1MUVDNS1cXHUxRUM1XXxbXFx1MUVDNy1cXHUxRUM3XXxbXFx1MUVDOS1cXHUxRUM5XXxbXFx1MUVDQi1cXHUxRUNCXXxbXFx1MUVDRC1cXHUxRUNEXXxbXFx1MUVDRi1cXHUxRUNGXXxbXFx1MUVEMS1cXHUxRUQxXXxbXFx1MUVEMy1cXHUxRUQzXXxbXFx1MUVENS1cXHUxRUQ1XXxbXFx1MUVENy1cXHUxRUQ3XXxbXFx1MUVEOS1cXHUxRUQ5XXxbXFx1MUVEQi1cXHUxRURCXXxbXFx1MUVERC1cXHUxRUREXXxbXFx1MUVERi1cXHUxRURGXXxbXFx1MUVFMS1cXHUxRUUxXXxbXFx1MUVFMy1cXHUxRUUzXXxbXFx1MUVFNS1cXHUxRUU1XXxbXFx1MUVFNy1cXHUxRUU3XXxbXFx1MUVFOS1cXHUxRUU5XXxbXFx1MUVFQi1cXHUxRUVCXXxbXFx1MUVFRC1cXHUxRUVEXXxbXFx1MUVFRi1cXHUxRUVGXXxbXFx1MUVGMS1cXHUxRUYxXXxbXFx1MUVGMy1cXHUxRUYzXXxbXFx1MUVGNS1cXHUxRUY1XXxbXFx1MUVGNy1cXHUxRUY3XXxbXFx1MUVGOS1cXHUxRUY5XXxbXFx1MUYwMC1cXHUxRjA3XXxbXFx1MUYxMC1cXHUxRjE1XXxbXFx1MUYyMC1cXHUxRjI3XXxbXFx1MUYzMC1cXHUxRjM3XXxbXFx1MUY0MC1cXHUxRjQ1XXxbXFx1MUY1MC1cXHUxRjU3XXxbXFx1MUY2MC1cXHUxRjY3XXxbXFx1MUY3MC1cXHUxRjdEXXxbXFx1MUY4MC1cXHUxRjg3XXxbXFx1MUY5MC1cXHUxRjk3XXxbXFx1MUZBMC1cXHUxRkE3XXxbXFx1MUZCMC1cXHUxRkI0XXxbXFx1MUZCNi1cXHUxRkI3XXxbXFx1MUZCRS1cXHUxRkJFXXxbXFx1MUZDMi1cXHUxRkM0XXxbXFx1MUZDNi1cXHUxRkM3XXxbXFx1MUZEMC1cXHUxRkQzXXxbXFx1MUZENi1cXHUxRkQ3XXxbXFx1MUZFMC1cXHUxRkU3XXxbXFx1MUZGMi1cXHUxRkY0XXxbXFx1MUZGNi1cXHUxRkY3XXxbXFx1MjA3Ri1cXHUyMDdGXXxbXFx1MjEwQS1cXHUyMTBBXXxbXFx1MjEwRS1cXHUyMTBGXXxbXFx1MjExMy1cXHUyMTEzXXxbXFx1MjExOC1cXHUyMTE4XXxbXFx1MjEyRS1cXHUyMTJGXXxbXFx1MjEzNC1cXHUyMTM0XXxbXFx1RkIwMC1cXHVGQjA2XXxbXFx1RkIxMy1cXHVGQjE3XXxbXFx1RkY0MS1cXHVGRjVBXXxbXFx1MDFDNS1cXHUwMUM1XXxbXFx1MDFDOC1cXHUwMUM4XXxbXFx1MDFDQi1cXHUwMUNCXXxbXFx1MDFGMi1cXHUwMUYyXXxbXFx1MDJCMC1cXHUwMkI4XXxbXFx1MDJCQi1cXHUwMkMxXXxbXFx1MDJEMC1cXHUwMkQxXXxbXFx1MDJFMC1cXHUwMkU0XXxbXFx1MDM3QS1cXHUwMzdBXXxbXFx1MDU1OS1cXHUwNTU5XXxbXFx1MDY0MC1cXHUwNjQwXXxbXFx1MDZFNS1cXHUwNkU2XXxbXFx1MEU0Ni1cXHUwRTQ2XXxbXFx1MEVDNi1cXHUwRUM2XXxbXFx1MzAwNS1cXHUzMDA1XXxbXFx1MzAzMS1cXHUzMDM1XXxbXFx1MzA5RC1cXHUzMDlFXXxbXFx1MzBGQy1cXHUzMEZFXXxbXFx1RkY3MC1cXHVGRjcwXXxbXFx1RkY5RS1cXHVGRjlGXXxbXFx1MDFBQS1cXHUwMUFBXXxbXFx1MDFCQi1cXHUwMUJCXXxbXFx1MDFCRS1cXHUwMUMzXXxbXFx1MDNGMy1cXHUwM0YzXXxbXFx1MDRDMC1cXHUwNEMwXXxbXFx1MDVEMC1cXHUwNUVBXXxbXFx1MDVGMC1cXHUwNUYyXXxbXFx1MDYyMS1cXHUwNjNBXXxbXFx1MDY0MS1cXHUwNjRBXXxbXFx1MDY3MS1cXHUwNkI3XXxbXFx1MDZCQS1cXHUwNkJFXXxbXFx1MDZDMC1cXHUwNkNFXXxbXFx1MDZEMC1cXHUwNkQzXXxbXFx1MDZENS1cXHUwNkQ1XXxbXFx1MDkwNS1cXHUwOTM5XXxbXFx1MDkzRC1cXHUwOTNEXXxbXFx1MDk1MC1cXHUwOTUwXXxbXFx1MDk1OC1cXHUwOTYxXXxbXFx1MDk4NS1cXHUwOThDXXxbXFx1MDk4Ri1cXHUwOTkwXXxbXFx1MDk5My1cXHUwOUE4XXxbXFx1MDlBQS1cXHUwOUIwXXxbXFx1MDlCMi1cXHUwOUIyXXxbXFx1MDlCNi1cXHUwOUI5XXxbXFx1MDlEQy1cXHUwOUREXXxbXFx1MDlERi1cXHUwOUUxXXxbXFx1MDlGMC1cXHUwOUYxXXxbXFx1MEEwNS1cXHUwQTBBXXxbXFx1MEEwRi1cXHUwQTEwXXxbXFx1MEExMy1cXHUwQTI4XXxbXFx1MEEyQS1cXHUwQTMwXXxbXFx1MEEzMi1cXHUwQTMzXXxbXFx1MEEzNS1cXHUwQTM2XXxbXFx1MEEzOC1cXHUwQTM5XXxbXFx1MEE1OS1cXHUwQTVDXXxbXFx1MEE1RS1cXHUwQTVFXXxbXFx1MEE3Mi1cXHUwQTc0XXxbXFx1MEE4NS1cXHUwQThCXXxbXFx1MEE4RC1cXHUwQThEXXxbXFx1MEE4Ri1cXHUwQTkxXXxbXFx1MEE5My1cXHUwQUE4XXxbXFx1MEFBQS1cXHUwQUIwXXxbXFx1MEFCMi1cXHUwQUIzXXxbXFx1MEFCNS1cXHUwQUI5XXxbXFx1MEFCRC1cXHUwQUJEXXxbXFx1MEFEMC1cXHUwQUQwXXxbXFx1MEFFMC1cXHUwQUUwXXxbXFx1MEIwNS1cXHUwQjBDXXxbXFx1MEIwRi1cXHUwQjEwXXxbXFx1MEIxMy1cXHUwQjI4XXxbXFx1MEIyQS1cXHUwQjMwXXxbXFx1MEIzMi1cXHUwQjMzXXxbXFx1MEIzNi1cXHUwQjM5XXxbXFx1MEIzRC1cXHUwQjNEXXxbXFx1MEI1Qy1cXHUwQjVEXXxbXFx1MEI1Ri1cXHUwQjYxXXxbXFx1MEI4NS1cXHUwQjhBXXxbXFx1MEI4RS1cXHUwQjkwXXxbXFx1MEI5Mi1cXHUwQjk1XXxbXFx1MEI5OS1cXHUwQjlBXXxbXFx1MEI5Qy1cXHUwQjlDXXxbXFx1MEI5RS1cXHUwQjlGXXxbXFx1MEJBMy1cXHUwQkE0XXxbXFx1MEJBOC1cXHUwQkFBXXxbXFx1MEJBRS1cXHUwQkI1XXxbXFx1MEJCNy1cXHUwQkI5XXxbXFx1MEMwNS1cXHUwQzBDXXxbXFx1MEMwRS1cXHUwQzEwXXxbXFx1MEMxMi1cXHUwQzI4XXxbXFx1MEMyQS1cXHUwQzMzXXxbXFx1MEMzNS1cXHUwQzM5XXxbXFx1MEM2MC1cXHUwQzYxXXxbXFx1MEM4NS1cXHUwQzhDXXxbXFx1MEM4RS1cXHUwQzkwXXxbXFx1MEM5Mi1cXHUwQ0E4XXxbXFx1MENBQS1cXHUwQ0IzXXxbXFx1MENCNS1cXHUwQ0I5XXxbXFx1MENERS1cXHUwQ0RFXXxbXFx1MENFMC1cXHUwQ0UxXXxbXFx1MEQwNS1cXHUwRDBDXXxbXFx1MEQwRS1cXHUwRDEwXXxbXFx1MEQxMi1cXHUwRDI4XXxbXFx1MEQyQS1cXHUwRDM5XXxbXFx1MEQ2MC1cXHUwRDYxXXxbXFx1MEUwMS1cXHUwRTMwXXxbXFx1MEUzMi1cXHUwRTMzXXxbXFx1MEU0MC1cXHUwRTQ1XXxbXFx1MEU4MS1cXHUwRTgyXXxbXFx1MEU4NC1cXHUwRTg0XXxbXFx1MEU4Ny1cXHUwRTg4XXxbXFx1MEU4QS1cXHUwRThBXXxbXFx1MEU4RC1cXHUwRThEXXxbXFx1MEU5NC1cXHUwRTk3XXxbXFx1MEU5OS1cXHUwRTlGXXxbXFx1MEVBMS1cXHUwRUEzXXxbXFx1MEVBNS1cXHUwRUE1XXxbXFx1MEVBNy1cXHUwRUE3XXxbXFx1MEVBQS1cXHUwRUFCXXxbXFx1MEVBRC1cXHUwRUIwXXxbXFx1MEVCMi1cXHUwRUIzXXxbXFx1MEVCRC1cXHUwRUJEXXxbXFx1MEVDMC1cXHUwRUM0XXxbXFx1MEVEQy1cXHUwRUREXXxbXFx1MEYwMC1cXHUwRjAwXXxbXFx1MEY0MC1cXHUwRjQ3XXxbXFx1MEY0OS1cXHUwRjY5XXxbXFx1MEY4OC1cXHUwRjhCXXxbXFx1MTEwMC1cXHUxMTU5XXxbXFx1MTE1Ri1cXHUxMUEyXXxbXFx1MTFBOC1cXHUxMUY5XXxbXFx1MjEzNS1cXHUyMTM4XXxbXFx1MzAwNi1cXHUzMDA2XXxbXFx1MzA0MS1cXHUzMDk0XXxbXFx1MzBBMS1cXHUzMEZBXXxbXFx1MzEwNS1cXHUzMTJDXXxbXFx1MzEzMS1cXHUzMThFXXxbXFx1NEUwMC1cXHU5RkE1XXxbXFx1QUMwMC1cXHVEN0EzXXxbXFx1RjkwMC1cXHVGQTJEXXxbXFx1RkIxRi1cXHVGQjI4XXxbXFx1RkIyQS1cXHVGQjM2XXxbXFx1RkIzOC1cXHVGQjNDXXxbXFx1RkIzRS1cXHVGQjNFXXxbXFx1RkI0MC1cXHVGQjQxXXxbXFx1RkI0My1cXHVGQjQ0XXxbXFx1RkI0Ni1cXHVGQkIxXXxbXFx1RkJEMy1cXHVGRDNEXXxbXFx1RkQ1MC1cXHVGRDhGXXxbXFx1RkQ5Mi1cXHVGREM3XXxbXFx1RkRGMC1cXHVGREZCXXxbXFx1RkU3MC1cXHVGRTcyXXxbXFx1RkU3NC1cXHVGRTc0XXxbXFx1RkU3Ni1cXHVGRUZDXXxbXFx1RkY2Ni1cXHVGRjZGXXxbXFx1RkY3MS1cXHVGRjlEXXxbXFx1RkZBMC1cXHVGRkJFXXxbXFx1RkZDMi1cXHVGRkM3XXxbXFx1RkZDQS1cXHVGRkNGXXxbXFx1RkZEMi1cXHVGRkQ3XXxbXFx1RkZEQS1cXHVGRkRDXS8sXG5cbi8qIEwgPSB1bmlvbiBvZiB0aGUgYmVsb3cgVW5pY29kZSBjYXRlZ29yaWVzICovXG4gIEx1ICAgOiAvW1xcdTAwNDEtXFx1MDA1QV18W1xcdTAwQzAtXFx1MDBENl18W1xcdTAwRDgtXFx1MDBERV18W1xcdTAxMDAtXFx1MDEwMF18W1xcdTAxMDItXFx1MDEwMl18W1xcdTAxMDQtXFx1MDEwNF18W1xcdTAxMDYtXFx1MDEwNl18W1xcdTAxMDgtXFx1MDEwOF18W1xcdTAxMEEtXFx1MDEwQV18W1xcdTAxMEMtXFx1MDEwQ118W1xcdTAxMEUtXFx1MDEwRV18W1xcdTAxMTAtXFx1MDExMF18W1xcdTAxMTItXFx1MDExMl18W1xcdTAxMTQtXFx1MDExNF18W1xcdTAxMTYtXFx1MDExNl18W1xcdTAxMTgtXFx1MDExOF18W1xcdTAxMUEtXFx1MDExQV18W1xcdTAxMUMtXFx1MDExQ118W1xcdTAxMUUtXFx1MDExRV18W1xcdTAxMjAtXFx1MDEyMF18W1xcdTAxMjItXFx1MDEyMl18W1xcdTAxMjQtXFx1MDEyNF18W1xcdTAxMjYtXFx1MDEyNl18W1xcdTAxMjgtXFx1MDEyOF18W1xcdTAxMkEtXFx1MDEyQV18W1xcdTAxMkMtXFx1MDEyQ118W1xcdTAxMkUtXFx1MDEyRV18W1xcdTAxMzAtXFx1MDEzMF18W1xcdTAxMzItXFx1MDEzMl18W1xcdTAxMzQtXFx1MDEzNF18W1xcdTAxMzYtXFx1MDEzNl18W1xcdTAxMzktXFx1MDEzOV18W1xcdTAxM0ItXFx1MDEzQl18W1xcdTAxM0QtXFx1MDEzRF18W1xcdTAxM0YtXFx1MDEzRl18W1xcdTAxNDEtXFx1MDE0MV18W1xcdTAxNDMtXFx1MDE0M118W1xcdTAxNDUtXFx1MDE0NV18W1xcdTAxNDctXFx1MDE0N118W1xcdTAxNEEtXFx1MDE0QV18W1xcdTAxNEMtXFx1MDE0Q118W1xcdTAxNEUtXFx1MDE0RV18W1xcdTAxNTAtXFx1MDE1MF18W1xcdTAxNTItXFx1MDE1Ml18W1xcdTAxNTQtXFx1MDE1NF18W1xcdTAxNTYtXFx1MDE1Nl18W1xcdTAxNTgtXFx1MDE1OF18W1xcdTAxNUEtXFx1MDE1QV18W1xcdTAxNUMtXFx1MDE1Q118W1xcdTAxNUUtXFx1MDE1RV18W1xcdTAxNjAtXFx1MDE2MF18W1xcdTAxNjItXFx1MDE2Ml18W1xcdTAxNjQtXFx1MDE2NF18W1xcdTAxNjYtXFx1MDE2Nl18W1xcdTAxNjgtXFx1MDE2OF18W1xcdTAxNkEtXFx1MDE2QV18W1xcdTAxNkMtXFx1MDE2Q118W1xcdTAxNkUtXFx1MDE2RV18W1xcdTAxNzAtXFx1MDE3MF18W1xcdTAxNzItXFx1MDE3Ml18W1xcdTAxNzQtXFx1MDE3NF18W1xcdTAxNzYtXFx1MDE3Nl18W1xcdTAxNzgtXFx1MDE3OV18W1xcdTAxN0ItXFx1MDE3Ql18W1xcdTAxN0QtXFx1MDE3RF18W1xcdTAxODEtXFx1MDE4Ml18W1xcdTAxODQtXFx1MDE4NF18W1xcdTAxODYtXFx1MDE4N118W1xcdTAxODktXFx1MDE4Ql18W1xcdTAxOEUtXFx1MDE5MV18W1xcdTAxOTMtXFx1MDE5NF18W1xcdTAxOTYtXFx1MDE5OF18W1xcdTAxOUMtXFx1MDE5RF18W1xcdTAxOUYtXFx1MDFBMF18W1xcdTAxQTItXFx1MDFBMl18W1xcdTAxQTQtXFx1MDFBNF18W1xcdTAxQTYtXFx1MDFBN118W1xcdTAxQTktXFx1MDFBOV18W1xcdTAxQUMtXFx1MDFBQ118W1xcdTAxQUUtXFx1MDFBRl18W1xcdTAxQjEtXFx1MDFCM118W1xcdTAxQjUtXFx1MDFCNV18W1xcdTAxQjctXFx1MDFCOF18W1xcdTAxQkMtXFx1MDFCQ118W1xcdTAxQzQtXFx1MDFDNF18W1xcdTAxQzctXFx1MDFDN118W1xcdTAxQ0EtXFx1MDFDQV18W1xcdTAxQ0QtXFx1MDFDRF18W1xcdTAxQ0YtXFx1MDFDRl18W1xcdTAxRDEtXFx1MDFEMV18W1xcdTAxRDMtXFx1MDFEM118W1xcdTAxRDUtXFx1MDFENV18W1xcdTAxRDctXFx1MDFEN118W1xcdTAxRDktXFx1MDFEOV18W1xcdTAxREItXFx1MDFEQl18W1xcdTAxREUtXFx1MDFERV18W1xcdTAxRTAtXFx1MDFFMF18W1xcdTAxRTItXFx1MDFFMl18W1xcdTAxRTQtXFx1MDFFNF18W1xcdTAxRTYtXFx1MDFFNl18W1xcdTAxRTgtXFx1MDFFOF18W1xcdTAxRUEtXFx1MDFFQV18W1xcdTAxRUMtXFx1MDFFQ118W1xcdTAxRUUtXFx1MDFFRV18W1xcdTAxRjEtXFx1MDFGMV18W1xcdTAxRjQtXFx1MDFGNF18W1xcdTAxRkEtXFx1MDFGQV18W1xcdTAxRkMtXFx1MDFGQ118W1xcdTAxRkUtXFx1MDFGRV18W1xcdTAyMDAtXFx1MDIwMF18W1xcdTAyMDItXFx1MDIwMl18W1xcdTAyMDQtXFx1MDIwNF18W1xcdTAyMDYtXFx1MDIwNl18W1xcdTAyMDgtXFx1MDIwOF18W1xcdTAyMEEtXFx1MDIwQV18W1xcdTAyMEMtXFx1MDIwQ118W1xcdTAyMEUtXFx1MDIwRV18W1xcdTAyMTAtXFx1MDIxMF18W1xcdTAyMTItXFx1MDIxMl18W1xcdTAyMTQtXFx1MDIxNF18W1xcdTAyMTYtXFx1MDIxNl18W1xcdTAzODYtXFx1MDM4Nl18W1xcdTAzODgtXFx1MDM4QV18W1xcdTAzOEMtXFx1MDM4Q118W1xcdTAzOEUtXFx1MDM4Rl18W1xcdTAzOTEtXFx1MDNBMV18W1xcdTAzQTMtXFx1MDNBQl18W1xcdTAzRDItXFx1MDNENF18W1xcdTAzREEtXFx1MDNEQV18W1xcdTAzREMtXFx1MDNEQ118W1xcdTAzREUtXFx1MDNERV18W1xcdTAzRTAtXFx1MDNFMF18W1xcdTAzRTItXFx1MDNFMl18W1xcdTAzRTQtXFx1MDNFNF18W1xcdTAzRTYtXFx1MDNFNl18W1xcdTAzRTgtXFx1MDNFOF18W1xcdTAzRUEtXFx1MDNFQV18W1xcdTAzRUMtXFx1MDNFQ118W1xcdTAzRUUtXFx1MDNFRV18W1xcdTA0MDEtXFx1MDQwQ118W1xcdTA0MEUtXFx1MDQyRl18W1xcdTA0NjAtXFx1MDQ2MF18W1xcdTA0NjItXFx1MDQ2Ml18W1xcdTA0NjQtXFx1MDQ2NF18W1xcdTA0NjYtXFx1MDQ2Nl18W1xcdTA0NjgtXFx1MDQ2OF18W1xcdTA0NkEtXFx1MDQ2QV18W1xcdTA0NkMtXFx1MDQ2Q118W1xcdTA0NkUtXFx1MDQ2RV18W1xcdTA0NzAtXFx1MDQ3MF18W1xcdTA0NzItXFx1MDQ3Ml18W1xcdTA0NzQtXFx1MDQ3NF18W1xcdTA0NzYtXFx1MDQ3Nl18W1xcdTA0NzgtXFx1MDQ3OF18W1xcdTA0N0EtXFx1MDQ3QV18W1xcdTA0N0MtXFx1MDQ3Q118W1xcdTA0N0UtXFx1MDQ3RV18W1xcdTA0ODAtXFx1MDQ4MF18W1xcdTA0OTAtXFx1MDQ5MF18W1xcdTA0OTItXFx1MDQ5Ml18W1xcdTA0OTQtXFx1MDQ5NF18W1xcdTA0OTYtXFx1MDQ5Nl18W1xcdTA0OTgtXFx1MDQ5OF18W1xcdTA0OUEtXFx1MDQ5QV18W1xcdTA0OUMtXFx1MDQ5Q118W1xcdTA0OUUtXFx1MDQ5RV18W1xcdTA0QTAtXFx1MDRBMF18W1xcdTA0QTItXFx1MDRBMl18W1xcdTA0QTQtXFx1MDRBNF18W1xcdTA0QTYtXFx1MDRBNl18W1xcdTA0QTgtXFx1MDRBOF18W1xcdTA0QUEtXFx1MDRBQV18W1xcdTA0QUMtXFx1MDRBQ118W1xcdTA0QUUtXFx1MDRBRV18W1xcdTA0QjAtXFx1MDRCMF18W1xcdTA0QjItXFx1MDRCMl18W1xcdTA0QjQtXFx1MDRCNF18W1xcdTA0QjYtXFx1MDRCNl18W1xcdTA0QjgtXFx1MDRCOF18W1xcdTA0QkEtXFx1MDRCQV18W1xcdTA0QkMtXFx1MDRCQ118W1xcdTA0QkUtXFx1MDRCRV18W1xcdTA0QzEtXFx1MDRDMV18W1xcdTA0QzMtXFx1MDRDM118W1xcdTA0QzctXFx1MDRDN118W1xcdTA0Q0ItXFx1MDRDQl18W1xcdTA0RDAtXFx1MDREMF18W1xcdTA0RDItXFx1MDREMl18W1xcdTA0RDQtXFx1MDRENF18W1xcdTA0RDYtXFx1MDRENl18W1xcdTA0RDgtXFx1MDREOF18W1xcdTA0REEtXFx1MDREQV18W1xcdTA0REMtXFx1MDREQ118W1xcdTA0REUtXFx1MDRERV18W1xcdTA0RTAtXFx1MDRFMF18W1xcdTA0RTItXFx1MDRFMl18W1xcdTA0RTQtXFx1MDRFNF18W1xcdTA0RTYtXFx1MDRFNl18W1xcdTA0RTgtXFx1MDRFOF18W1xcdTA0RUEtXFx1MDRFQV18W1xcdTA0RUUtXFx1MDRFRV18W1xcdTA0RjAtXFx1MDRGMF18W1xcdTA0RjItXFx1MDRGMl18W1xcdTA0RjQtXFx1MDRGNF18W1xcdTA0RjgtXFx1MDRGOF18W1xcdTA1MzEtXFx1MDU1Nl18W1xcdTEwQTAtXFx1MTBDNV18W1xcdTFFMDAtXFx1MUUwMF18W1xcdTFFMDItXFx1MUUwMl18W1xcdTFFMDQtXFx1MUUwNF18W1xcdTFFMDYtXFx1MUUwNl18W1xcdTFFMDgtXFx1MUUwOF18W1xcdTFFMEEtXFx1MUUwQV18W1xcdTFFMEMtXFx1MUUwQ118W1xcdTFFMEUtXFx1MUUwRV18W1xcdTFFMTAtXFx1MUUxMF18W1xcdTFFMTItXFx1MUUxMl18W1xcdTFFMTQtXFx1MUUxNF18W1xcdTFFMTYtXFx1MUUxNl18W1xcdTFFMTgtXFx1MUUxOF18W1xcdTFFMUEtXFx1MUUxQV18W1xcdTFFMUMtXFx1MUUxQ118W1xcdTFFMUUtXFx1MUUxRV18W1xcdTFFMjAtXFx1MUUyMF18W1xcdTFFMjItXFx1MUUyMl18W1xcdTFFMjQtXFx1MUUyNF18W1xcdTFFMjYtXFx1MUUyNl18W1xcdTFFMjgtXFx1MUUyOF18W1xcdTFFMkEtXFx1MUUyQV18W1xcdTFFMkMtXFx1MUUyQ118W1xcdTFFMkUtXFx1MUUyRV18W1xcdTFFMzAtXFx1MUUzMF18W1xcdTFFMzItXFx1MUUzMl18W1xcdTFFMzQtXFx1MUUzNF18W1xcdTFFMzYtXFx1MUUzNl18W1xcdTFFMzgtXFx1MUUzOF18W1xcdTFFM0EtXFx1MUUzQV18W1xcdTFFM0MtXFx1MUUzQ118W1xcdTFFM0UtXFx1MUUzRV18W1xcdTFFNDAtXFx1MUU0MF18W1xcdTFFNDItXFx1MUU0Ml18W1xcdTFFNDQtXFx1MUU0NF18W1xcdTFFNDYtXFx1MUU0Nl18W1xcdTFFNDgtXFx1MUU0OF18W1xcdTFFNEEtXFx1MUU0QV18W1xcdTFFNEMtXFx1MUU0Q118W1xcdTFFNEUtXFx1MUU0RV18W1xcdTFFNTAtXFx1MUU1MF18W1xcdTFFNTItXFx1MUU1Ml18W1xcdTFFNTQtXFx1MUU1NF18W1xcdTFFNTYtXFx1MUU1Nl18W1xcdTFFNTgtXFx1MUU1OF18W1xcdTFFNUEtXFx1MUU1QV18W1xcdTFFNUMtXFx1MUU1Q118W1xcdTFFNUUtXFx1MUU1RV18W1xcdTFFNjAtXFx1MUU2MF18W1xcdTFFNjItXFx1MUU2Ml18W1xcdTFFNjQtXFx1MUU2NF18W1xcdTFFNjYtXFx1MUU2Nl18W1xcdTFFNjgtXFx1MUU2OF18W1xcdTFFNkEtXFx1MUU2QV18W1xcdTFFNkMtXFx1MUU2Q118W1xcdTFFNkUtXFx1MUU2RV18W1xcdTFFNzAtXFx1MUU3MF18W1xcdTFFNzItXFx1MUU3Ml18W1xcdTFFNzQtXFx1MUU3NF18W1xcdTFFNzYtXFx1MUU3Nl18W1xcdTFFNzgtXFx1MUU3OF18W1xcdTFFN0EtXFx1MUU3QV18W1xcdTFFN0MtXFx1MUU3Q118W1xcdTFFN0UtXFx1MUU3RV18W1xcdTFFODAtXFx1MUU4MF18W1xcdTFFODItXFx1MUU4Ml18W1xcdTFFODQtXFx1MUU4NF18W1xcdTFFODYtXFx1MUU4Nl18W1xcdTFFODgtXFx1MUU4OF18W1xcdTFFOEEtXFx1MUU4QV18W1xcdTFFOEMtXFx1MUU4Q118W1xcdTFFOEUtXFx1MUU4RV18W1xcdTFFOTAtXFx1MUU5MF18W1xcdTFFOTItXFx1MUU5Ml18W1xcdTFFOTQtXFx1MUU5NF18W1xcdTFFQTAtXFx1MUVBMF18W1xcdTFFQTItXFx1MUVBMl18W1xcdTFFQTQtXFx1MUVBNF18W1xcdTFFQTYtXFx1MUVBNl18W1xcdTFFQTgtXFx1MUVBOF18W1xcdTFFQUEtXFx1MUVBQV18W1xcdTFFQUMtXFx1MUVBQ118W1xcdTFFQUUtXFx1MUVBRV18W1xcdTFFQjAtXFx1MUVCMF18W1xcdTFFQjItXFx1MUVCMl18W1xcdTFFQjQtXFx1MUVCNF18W1xcdTFFQjYtXFx1MUVCNl18W1xcdTFFQjgtXFx1MUVCOF18W1xcdTFFQkEtXFx1MUVCQV18W1xcdTFFQkMtXFx1MUVCQ118W1xcdTFFQkUtXFx1MUVCRV18W1xcdTFFQzAtXFx1MUVDMF18W1xcdTFFQzItXFx1MUVDMl18W1xcdTFFQzQtXFx1MUVDNF18W1xcdTFFQzYtXFx1MUVDNl18W1xcdTFFQzgtXFx1MUVDOF18W1xcdTFFQ0EtXFx1MUVDQV18W1xcdTFFQ0MtXFx1MUVDQ118W1xcdTFFQ0UtXFx1MUVDRV18W1xcdTFFRDAtXFx1MUVEMF18W1xcdTFFRDItXFx1MUVEMl18W1xcdTFFRDQtXFx1MUVENF18W1xcdTFFRDYtXFx1MUVENl18W1xcdTFFRDgtXFx1MUVEOF18W1xcdTFFREEtXFx1MUVEQV18W1xcdTFFREMtXFx1MUVEQ118W1xcdTFFREUtXFx1MUVERV18W1xcdTFFRTAtXFx1MUVFMF18W1xcdTFFRTItXFx1MUVFMl18W1xcdTFFRTQtXFx1MUVFNF18W1xcdTFFRTYtXFx1MUVFNl18W1xcdTFFRTgtXFx1MUVFOF18W1xcdTFFRUEtXFx1MUVFQV18W1xcdTFFRUMtXFx1MUVFQ118W1xcdTFFRUUtXFx1MUVFRV18W1xcdTFFRjAtXFx1MUVGMF18W1xcdTFFRjItXFx1MUVGMl18W1xcdTFFRjQtXFx1MUVGNF18W1xcdTFFRjYtXFx1MUVGNl18W1xcdTFFRjgtXFx1MUVGOF18W1xcdTFGMDgtXFx1MUYwRl18W1xcdTFGMTgtXFx1MUYxRF18W1xcdTFGMjgtXFx1MUYyRl18W1xcdTFGMzgtXFx1MUYzRl18W1xcdTFGNDgtXFx1MUY0RF18W1xcdTFGNTktXFx1MUY1OV18W1xcdTFGNUItXFx1MUY1Ql18W1xcdTFGNUQtXFx1MUY1RF18W1xcdTFGNUYtXFx1MUY1Rl18W1xcdTFGNjgtXFx1MUY2Rl18W1xcdTFGODgtXFx1MUY4Rl18W1xcdTFGOTgtXFx1MUY5Rl18W1xcdTFGQTgtXFx1MUZBRl18W1xcdTFGQjgtXFx1MUZCQ118W1xcdTFGQzgtXFx1MUZDQ118W1xcdTFGRDgtXFx1MUZEQl18W1xcdTFGRTgtXFx1MUZFQ118W1xcdTFGRjgtXFx1MUZGQ118W1xcdTIxMDItXFx1MjEwMl18W1xcdTIxMDctXFx1MjEwN118W1xcdTIxMEItXFx1MjEwRF18W1xcdTIxMTAtXFx1MjExMl18W1xcdTIxMTUtXFx1MjExNV18W1xcdTIxMTktXFx1MjExRF18W1xcdTIxMjQtXFx1MjEyNF18W1xcdTIxMjYtXFx1MjEyNl18W1xcdTIxMjgtXFx1MjEyOF18W1xcdTIxMkEtXFx1MjEyRF18W1xcdTIxMzAtXFx1MjEzMV18W1xcdTIxMzMtXFx1MjEzM118W1xcdUZGMjEtXFx1RkYzQV0vLFxuICBMbCAgIDogL1tcXHUwMDYxLVxcdTAwN0FdfFtcXHUwMEFBLVxcdTAwQUFdfFtcXHUwMEI1LVxcdTAwQjVdfFtcXHUwMEJBLVxcdTAwQkFdfFtcXHUwMERGLVxcdTAwRjZdfFtcXHUwMEY4LVxcdTAwRkZdfFtcXHUwMTAxLVxcdTAxMDFdfFtcXHUwMTAzLVxcdTAxMDNdfFtcXHUwMTA1LVxcdTAxMDVdfFtcXHUwMTA3LVxcdTAxMDddfFtcXHUwMTA5LVxcdTAxMDldfFtcXHUwMTBCLVxcdTAxMEJdfFtcXHUwMTBELVxcdTAxMERdfFtcXHUwMTBGLVxcdTAxMEZdfFtcXHUwMTExLVxcdTAxMTFdfFtcXHUwMTEzLVxcdTAxMTNdfFtcXHUwMTE1LVxcdTAxMTVdfFtcXHUwMTE3LVxcdTAxMTddfFtcXHUwMTE5LVxcdTAxMTldfFtcXHUwMTFCLVxcdTAxMUJdfFtcXHUwMTFELVxcdTAxMURdfFtcXHUwMTFGLVxcdTAxMUZdfFtcXHUwMTIxLVxcdTAxMjFdfFtcXHUwMTIzLVxcdTAxMjNdfFtcXHUwMTI1LVxcdTAxMjVdfFtcXHUwMTI3LVxcdTAxMjddfFtcXHUwMTI5LVxcdTAxMjldfFtcXHUwMTJCLVxcdTAxMkJdfFtcXHUwMTJELVxcdTAxMkRdfFtcXHUwMTJGLVxcdTAxMkZdfFtcXHUwMTMxLVxcdTAxMzFdfFtcXHUwMTMzLVxcdTAxMzNdfFtcXHUwMTM1LVxcdTAxMzVdfFtcXHUwMTM3LVxcdTAxMzhdfFtcXHUwMTNBLVxcdTAxM0FdfFtcXHUwMTNDLVxcdTAxM0NdfFtcXHUwMTNFLVxcdTAxM0VdfFtcXHUwMTQwLVxcdTAxNDBdfFtcXHUwMTQyLVxcdTAxNDJdfFtcXHUwMTQ0LVxcdTAxNDRdfFtcXHUwMTQ2LVxcdTAxNDZdfFtcXHUwMTQ4LVxcdTAxNDldfFtcXHUwMTRCLVxcdTAxNEJdfFtcXHUwMTRELVxcdTAxNERdfFtcXHUwMTRGLVxcdTAxNEZdfFtcXHUwMTUxLVxcdTAxNTFdfFtcXHUwMTUzLVxcdTAxNTNdfFtcXHUwMTU1LVxcdTAxNTVdfFtcXHUwMTU3LVxcdTAxNTddfFtcXHUwMTU5LVxcdTAxNTldfFtcXHUwMTVCLVxcdTAxNUJdfFtcXHUwMTVELVxcdTAxNURdfFtcXHUwMTVGLVxcdTAxNUZdfFtcXHUwMTYxLVxcdTAxNjFdfFtcXHUwMTYzLVxcdTAxNjNdfFtcXHUwMTY1LVxcdTAxNjVdfFtcXHUwMTY3LVxcdTAxNjddfFtcXHUwMTY5LVxcdTAxNjldfFtcXHUwMTZCLVxcdTAxNkJdfFtcXHUwMTZELVxcdTAxNkRdfFtcXHUwMTZGLVxcdTAxNkZdfFtcXHUwMTcxLVxcdTAxNzFdfFtcXHUwMTczLVxcdTAxNzNdfFtcXHUwMTc1LVxcdTAxNzVdfFtcXHUwMTc3LVxcdTAxNzddfFtcXHUwMTdBLVxcdTAxN0FdfFtcXHUwMTdDLVxcdTAxN0NdfFtcXHUwMTdFLVxcdTAxODBdfFtcXHUwMTgzLVxcdTAxODNdfFtcXHUwMTg1LVxcdTAxODVdfFtcXHUwMTg4LVxcdTAxODhdfFtcXHUwMThDLVxcdTAxOERdfFtcXHUwMTkyLVxcdTAxOTJdfFtcXHUwMTk1LVxcdTAxOTVdfFtcXHUwMTk5LVxcdTAxOUJdfFtcXHUwMTlFLVxcdTAxOUVdfFtcXHUwMUExLVxcdTAxQTFdfFtcXHUwMUEzLVxcdTAxQTNdfFtcXHUwMUE1LVxcdTAxQTVdfFtcXHUwMUE4LVxcdTAxQThdfFtcXHUwMUFCLVxcdTAxQUJdfFtcXHUwMUFELVxcdTAxQURdfFtcXHUwMUIwLVxcdTAxQjBdfFtcXHUwMUI0LVxcdTAxQjRdfFtcXHUwMUI2LVxcdTAxQjZdfFtcXHUwMUI5LVxcdTAxQkFdfFtcXHUwMUJELVxcdTAxQkRdfFtcXHUwMUM2LVxcdTAxQzZdfFtcXHUwMUM5LVxcdTAxQzldfFtcXHUwMUNDLVxcdTAxQ0NdfFtcXHUwMUNFLVxcdTAxQ0VdfFtcXHUwMUQwLVxcdTAxRDBdfFtcXHUwMUQyLVxcdTAxRDJdfFtcXHUwMUQ0LVxcdTAxRDRdfFtcXHUwMUQ2LVxcdTAxRDZdfFtcXHUwMUQ4LVxcdTAxRDhdfFtcXHUwMURBLVxcdTAxREFdfFtcXHUwMURDLVxcdTAxRERdfFtcXHUwMURGLVxcdTAxREZdfFtcXHUwMUUxLVxcdTAxRTFdfFtcXHUwMUUzLVxcdTAxRTNdfFtcXHUwMUU1LVxcdTAxRTVdfFtcXHUwMUU3LVxcdTAxRTddfFtcXHUwMUU5LVxcdTAxRTldfFtcXHUwMUVCLVxcdTAxRUJdfFtcXHUwMUVELVxcdTAxRURdfFtcXHUwMUVGLVxcdTAxRjBdfFtcXHUwMUYzLVxcdTAxRjNdfFtcXHUwMUY1LVxcdTAxRjVdfFtcXHUwMUZCLVxcdTAxRkJdfFtcXHUwMUZELVxcdTAxRkRdfFtcXHUwMUZGLVxcdTAxRkZdfFtcXHUwMjAxLVxcdTAyMDFdfFtcXHUwMjAzLVxcdTAyMDNdfFtcXHUwMjA1LVxcdTAyMDVdfFtcXHUwMjA3LVxcdTAyMDddfFtcXHUwMjA5LVxcdTAyMDldfFtcXHUwMjBCLVxcdTAyMEJdfFtcXHUwMjBELVxcdTAyMERdfFtcXHUwMjBGLVxcdTAyMEZdfFtcXHUwMjExLVxcdTAyMTFdfFtcXHUwMjEzLVxcdTAyMTNdfFtcXHUwMjE1LVxcdTAyMTVdfFtcXHUwMjE3LVxcdTAyMTddfFtcXHUwMjUwLVxcdTAyQThdfFtcXHUwMzkwLVxcdTAzOTBdfFtcXHUwM0FDLVxcdTAzQ0VdfFtcXHUwM0QwLVxcdTAzRDFdfFtcXHUwM0Q1LVxcdTAzRDZdfFtcXHUwM0UzLVxcdTAzRTNdfFtcXHUwM0U1LVxcdTAzRTVdfFtcXHUwM0U3LVxcdTAzRTddfFtcXHUwM0U5LVxcdTAzRTldfFtcXHUwM0VCLVxcdTAzRUJdfFtcXHUwM0VELVxcdTAzRURdfFtcXHUwM0VGLVxcdTAzRjJdfFtcXHUwNDMwLVxcdTA0NEZdfFtcXHUwNDUxLVxcdTA0NUNdfFtcXHUwNDVFLVxcdTA0NUZdfFtcXHUwNDYxLVxcdTA0NjFdfFtcXHUwNDYzLVxcdTA0NjNdfFtcXHUwNDY1LVxcdTA0NjVdfFtcXHUwNDY3LVxcdTA0NjddfFtcXHUwNDY5LVxcdTA0NjldfFtcXHUwNDZCLVxcdTA0NkJdfFtcXHUwNDZELVxcdTA0NkRdfFtcXHUwNDZGLVxcdTA0NkZdfFtcXHUwNDcxLVxcdTA0NzFdfFtcXHUwNDczLVxcdTA0NzNdfFtcXHUwNDc1LVxcdTA0NzVdfFtcXHUwNDc3LVxcdTA0NzddfFtcXHUwNDc5LVxcdTA0NzldfFtcXHUwNDdCLVxcdTA0N0JdfFtcXHUwNDdELVxcdTA0N0RdfFtcXHUwNDdGLVxcdTA0N0ZdfFtcXHUwNDgxLVxcdTA0ODFdfFtcXHUwNDkxLVxcdTA0OTFdfFtcXHUwNDkzLVxcdTA0OTNdfFtcXHUwNDk1LVxcdTA0OTVdfFtcXHUwNDk3LVxcdTA0OTddfFtcXHUwNDk5LVxcdTA0OTldfFtcXHUwNDlCLVxcdTA0OUJdfFtcXHUwNDlELVxcdTA0OURdfFtcXHUwNDlGLVxcdTA0OUZdfFtcXHUwNEExLVxcdTA0QTFdfFtcXHUwNEEzLVxcdTA0QTNdfFtcXHUwNEE1LVxcdTA0QTVdfFtcXHUwNEE3LVxcdTA0QTddfFtcXHUwNEE5LVxcdTA0QTldfFtcXHUwNEFCLVxcdTA0QUJdfFtcXHUwNEFELVxcdTA0QURdfFtcXHUwNEFGLVxcdTA0QUZdfFtcXHUwNEIxLVxcdTA0QjFdfFtcXHUwNEIzLVxcdTA0QjNdfFtcXHUwNEI1LVxcdTA0QjVdfFtcXHUwNEI3LVxcdTA0QjddfFtcXHUwNEI5LVxcdTA0QjldfFtcXHUwNEJCLVxcdTA0QkJdfFtcXHUwNEJELVxcdTA0QkRdfFtcXHUwNEJGLVxcdTA0QkZdfFtcXHUwNEMyLVxcdTA0QzJdfFtcXHUwNEM0LVxcdTA0QzRdfFtcXHUwNEM4LVxcdTA0QzhdfFtcXHUwNENDLVxcdTA0Q0NdfFtcXHUwNEQxLVxcdTA0RDFdfFtcXHUwNEQzLVxcdTA0RDNdfFtcXHUwNEQ1LVxcdTA0RDVdfFtcXHUwNEQ3LVxcdTA0RDddfFtcXHUwNEQ5LVxcdTA0RDldfFtcXHUwNERCLVxcdTA0REJdfFtcXHUwNERELVxcdTA0RERdfFtcXHUwNERGLVxcdTA0REZdfFtcXHUwNEUxLVxcdTA0RTFdfFtcXHUwNEUzLVxcdTA0RTNdfFtcXHUwNEU1LVxcdTA0RTVdfFtcXHUwNEU3LVxcdTA0RTddfFtcXHUwNEU5LVxcdTA0RTldfFtcXHUwNEVCLVxcdTA0RUJdfFtcXHUwNEVGLVxcdTA0RUZdfFtcXHUwNEYxLVxcdTA0RjFdfFtcXHUwNEYzLVxcdTA0RjNdfFtcXHUwNEY1LVxcdTA0RjVdfFtcXHUwNEY5LVxcdTA0RjldfFtcXHUwNTYxLVxcdTA1ODddfFtcXHUxMEQwLVxcdTEwRjZdfFtcXHUxRTAxLVxcdTFFMDFdfFtcXHUxRTAzLVxcdTFFMDNdfFtcXHUxRTA1LVxcdTFFMDVdfFtcXHUxRTA3LVxcdTFFMDddfFtcXHUxRTA5LVxcdTFFMDldfFtcXHUxRTBCLVxcdTFFMEJdfFtcXHUxRTBELVxcdTFFMERdfFtcXHUxRTBGLVxcdTFFMEZdfFtcXHUxRTExLVxcdTFFMTFdfFtcXHUxRTEzLVxcdTFFMTNdfFtcXHUxRTE1LVxcdTFFMTVdfFtcXHUxRTE3LVxcdTFFMTddfFtcXHUxRTE5LVxcdTFFMTldfFtcXHUxRTFCLVxcdTFFMUJdfFtcXHUxRTFELVxcdTFFMURdfFtcXHUxRTFGLVxcdTFFMUZdfFtcXHUxRTIxLVxcdTFFMjFdfFtcXHUxRTIzLVxcdTFFMjNdfFtcXHUxRTI1LVxcdTFFMjVdfFtcXHUxRTI3LVxcdTFFMjddfFtcXHUxRTI5LVxcdTFFMjldfFtcXHUxRTJCLVxcdTFFMkJdfFtcXHUxRTJELVxcdTFFMkRdfFtcXHUxRTJGLVxcdTFFMkZdfFtcXHUxRTMxLVxcdTFFMzFdfFtcXHUxRTMzLVxcdTFFMzNdfFtcXHUxRTM1LVxcdTFFMzVdfFtcXHUxRTM3LVxcdTFFMzddfFtcXHUxRTM5LVxcdTFFMzldfFtcXHUxRTNCLVxcdTFFM0JdfFtcXHUxRTNELVxcdTFFM0RdfFtcXHUxRTNGLVxcdTFFM0ZdfFtcXHUxRTQxLVxcdTFFNDFdfFtcXHUxRTQzLVxcdTFFNDNdfFtcXHUxRTQ1LVxcdTFFNDVdfFtcXHUxRTQ3LVxcdTFFNDddfFtcXHUxRTQ5LVxcdTFFNDldfFtcXHUxRTRCLVxcdTFFNEJdfFtcXHUxRTRELVxcdTFFNERdfFtcXHUxRTRGLVxcdTFFNEZdfFtcXHUxRTUxLVxcdTFFNTFdfFtcXHUxRTUzLVxcdTFFNTNdfFtcXHUxRTU1LVxcdTFFNTVdfFtcXHUxRTU3LVxcdTFFNTddfFtcXHUxRTU5LVxcdTFFNTldfFtcXHUxRTVCLVxcdTFFNUJdfFtcXHUxRTVELVxcdTFFNURdfFtcXHUxRTVGLVxcdTFFNUZdfFtcXHUxRTYxLVxcdTFFNjFdfFtcXHUxRTYzLVxcdTFFNjNdfFtcXHUxRTY1LVxcdTFFNjVdfFtcXHUxRTY3LVxcdTFFNjddfFtcXHUxRTY5LVxcdTFFNjldfFtcXHUxRTZCLVxcdTFFNkJdfFtcXHUxRTZELVxcdTFFNkRdfFtcXHUxRTZGLVxcdTFFNkZdfFtcXHUxRTcxLVxcdTFFNzFdfFtcXHUxRTczLVxcdTFFNzNdfFtcXHUxRTc1LVxcdTFFNzVdfFtcXHUxRTc3LVxcdTFFNzddfFtcXHUxRTc5LVxcdTFFNzldfFtcXHUxRTdCLVxcdTFFN0JdfFtcXHUxRTdELVxcdTFFN0RdfFtcXHUxRTdGLVxcdTFFN0ZdfFtcXHUxRTgxLVxcdTFFODFdfFtcXHUxRTgzLVxcdTFFODNdfFtcXHUxRTg1LVxcdTFFODVdfFtcXHUxRTg3LVxcdTFFODddfFtcXHUxRTg5LVxcdTFFODldfFtcXHUxRThCLVxcdTFFOEJdfFtcXHUxRThELVxcdTFFOERdfFtcXHUxRThGLVxcdTFFOEZdfFtcXHUxRTkxLVxcdTFFOTFdfFtcXHUxRTkzLVxcdTFFOTNdfFtcXHUxRTk1LVxcdTFFOUJdfFtcXHUxRUExLVxcdTFFQTFdfFtcXHUxRUEzLVxcdTFFQTNdfFtcXHUxRUE1LVxcdTFFQTVdfFtcXHUxRUE3LVxcdTFFQTddfFtcXHUxRUE5LVxcdTFFQTldfFtcXHUxRUFCLVxcdTFFQUJdfFtcXHUxRUFELVxcdTFFQURdfFtcXHUxRUFGLVxcdTFFQUZdfFtcXHUxRUIxLVxcdTFFQjFdfFtcXHUxRUIzLVxcdTFFQjNdfFtcXHUxRUI1LVxcdTFFQjVdfFtcXHUxRUI3LVxcdTFFQjddfFtcXHUxRUI5LVxcdTFFQjldfFtcXHUxRUJCLVxcdTFFQkJdfFtcXHUxRUJELVxcdTFFQkRdfFtcXHUxRUJGLVxcdTFFQkZdfFtcXHUxRUMxLVxcdTFFQzFdfFtcXHUxRUMzLVxcdTFFQzNdfFtcXHUxRUM1LVxcdTFFQzVdfFtcXHUxRUM3LVxcdTFFQzddfFtcXHUxRUM5LVxcdTFFQzldfFtcXHUxRUNCLVxcdTFFQ0JdfFtcXHUxRUNELVxcdTFFQ0RdfFtcXHUxRUNGLVxcdTFFQ0ZdfFtcXHUxRUQxLVxcdTFFRDFdfFtcXHUxRUQzLVxcdTFFRDNdfFtcXHUxRUQ1LVxcdTFFRDVdfFtcXHUxRUQ3LVxcdTFFRDddfFtcXHUxRUQ5LVxcdTFFRDldfFtcXHUxRURCLVxcdTFFREJdfFtcXHUxRURELVxcdTFFRERdfFtcXHUxRURGLVxcdTFFREZdfFtcXHUxRUUxLVxcdTFFRTFdfFtcXHUxRUUzLVxcdTFFRTNdfFtcXHUxRUU1LVxcdTFFRTVdfFtcXHUxRUU3LVxcdTFFRTddfFtcXHUxRUU5LVxcdTFFRTldfFtcXHUxRUVCLVxcdTFFRUJdfFtcXHUxRUVELVxcdTFFRURdfFtcXHUxRUVGLVxcdTFFRUZdfFtcXHUxRUYxLVxcdTFFRjFdfFtcXHUxRUYzLVxcdTFFRjNdfFtcXHUxRUY1LVxcdTFFRjVdfFtcXHUxRUY3LVxcdTFFRjddfFtcXHUxRUY5LVxcdTFFRjldfFtcXHUxRjAwLVxcdTFGMDddfFtcXHUxRjEwLVxcdTFGMTVdfFtcXHUxRjIwLVxcdTFGMjddfFtcXHUxRjMwLVxcdTFGMzddfFtcXHUxRjQwLVxcdTFGNDVdfFtcXHUxRjUwLVxcdTFGNTddfFtcXHUxRjYwLVxcdTFGNjddfFtcXHUxRjcwLVxcdTFGN0RdfFtcXHUxRjgwLVxcdTFGODddfFtcXHUxRjkwLVxcdTFGOTddfFtcXHUxRkEwLVxcdTFGQTddfFtcXHUxRkIwLVxcdTFGQjRdfFtcXHUxRkI2LVxcdTFGQjddfFtcXHUxRkJFLVxcdTFGQkVdfFtcXHUxRkMyLVxcdTFGQzRdfFtcXHUxRkM2LVxcdTFGQzddfFtcXHUxRkQwLVxcdTFGRDNdfFtcXHUxRkQ2LVxcdTFGRDddfFtcXHUxRkUwLVxcdTFGRTddfFtcXHUxRkYyLVxcdTFGRjRdfFtcXHUxRkY2LVxcdTFGRjddfFtcXHUyMDdGLVxcdTIwN0ZdfFtcXHUyMTBBLVxcdTIxMEFdfFtcXHUyMTBFLVxcdTIxMEZdfFtcXHUyMTEzLVxcdTIxMTNdfFtcXHUyMTE4LVxcdTIxMThdfFtcXHUyMTJFLVxcdTIxMkZdfFtcXHUyMTM0LVxcdTIxMzRdfFtcXHVGQjAwLVxcdUZCMDZdfFtcXHVGQjEzLVxcdUZCMTddfFtcXHVGRjQxLVxcdUZGNUFdLyxcbiAgTHQgICA6IC9bXFx1MDFDNS1cXHUwMUM1XXxbXFx1MDFDOC1cXHUwMUM4XXxbXFx1MDFDQi1cXHUwMUNCXXxbXFx1MDFGMi1cXHUwMUYyXS8sXG4gIExtICAgOiAvW1xcdTAyQjAtXFx1MDJCOF18W1xcdTAyQkItXFx1MDJDMV18W1xcdTAyRDAtXFx1MDJEMV18W1xcdTAyRTAtXFx1MDJFNF18W1xcdTAzN0EtXFx1MDM3QV18W1xcdTA1NTktXFx1MDU1OV18W1xcdTA2NDAtXFx1MDY0MF18W1xcdTA2RTUtXFx1MDZFNl18W1xcdTBFNDYtXFx1MEU0Nl18W1xcdTBFQzYtXFx1MEVDNl18W1xcdTMwMDUtXFx1MzAwNV18W1xcdTMwMzEtXFx1MzAzNV18W1xcdTMwOUQtXFx1MzA5RV18W1xcdTMwRkMtXFx1MzBGRV18W1xcdUZGNzAtXFx1RkY3MF18W1xcdUZGOUUtXFx1RkY5Rl0vLFxuICBMbyAgIDogL1tcXHUwMUFBLVxcdTAxQUFdfFtcXHUwMUJCLVxcdTAxQkJdfFtcXHUwMUJFLVxcdTAxQzNdfFtcXHUwM0YzLVxcdTAzRjNdfFtcXHUwNEMwLVxcdTA0QzBdfFtcXHUwNUQwLVxcdTA1RUFdfFtcXHUwNUYwLVxcdTA1RjJdfFtcXHUwNjIxLVxcdTA2M0FdfFtcXHUwNjQxLVxcdTA2NEFdfFtcXHUwNjcxLVxcdTA2QjddfFtcXHUwNkJBLVxcdTA2QkVdfFtcXHUwNkMwLVxcdTA2Q0VdfFtcXHUwNkQwLVxcdTA2RDNdfFtcXHUwNkQ1LVxcdTA2RDVdfFtcXHUwOTA1LVxcdTA5MzldfFtcXHUwOTNELVxcdTA5M0RdfFtcXHUwOTUwLVxcdTA5NTBdfFtcXHUwOTU4LVxcdTA5NjFdfFtcXHUwOTg1LVxcdTA5OENdfFtcXHUwOThGLVxcdTA5OTBdfFtcXHUwOTkzLVxcdTA5QThdfFtcXHUwOUFBLVxcdTA5QjBdfFtcXHUwOUIyLVxcdTA5QjJdfFtcXHUwOUI2LVxcdTA5QjldfFtcXHUwOURDLVxcdTA5RERdfFtcXHUwOURGLVxcdTA5RTFdfFtcXHUwOUYwLVxcdTA5RjFdfFtcXHUwQTA1LVxcdTBBMEFdfFtcXHUwQTBGLVxcdTBBMTBdfFtcXHUwQTEzLVxcdTBBMjhdfFtcXHUwQTJBLVxcdTBBMzBdfFtcXHUwQTMyLVxcdTBBMzNdfFtcXHUwQTM1LVxcdTBBMzZdfFtcXHUwQTM4LVxcdTBBMzldfFtcXHUwQTU5LVxcdTBBNUNdfFtcXHUwQTVFLVxcdTBBNUVdfFtcXHUwQTcyLVxcdTBBNzRdfFtcXHUwQTg1LVxcdTBBOEJdfFtcXHUwQThELVxcdTBBOERdfFtcXHUwQThGLVxcdTBBOTFdfFtcXHUwQTkzLVxcdTBBQThdfFtcXHUwQUFBLVxcdTBBQjBdfFtcXHUwQUIyLVxcdTBBQjNdfFtcXHUwQUI1LVxcdTBBQjldfFtcXHUwQUJELVxcdTBBQkRdfFtcXHUwQUQwLVxcdTBBRDBdfFtcXHUwQUUwLVxcdTBBRTBdfFtcXHUwQjA1LVxcdTBCMENdfFtcXHUwQjBGLVxcdTBCMTBdfFtcXHUwQjEzLVxcdTBCMjhdfFtcXHUwQjJBLVxcdTBCMzBdfFtcXHUwQjMyLVxcdTBCMzNdfFtcXHUwQjM2LVxcdTBCMzldfFtcXHUwQjNELVxcdTBCM0RdfFtcXHUwQjVDLVxcdTBCNURdfFtcXHUwQjVGLVxcdTBCNjFdfFtcXHUwQjg1LVxcdTBCOEFdfFtcXHUwQjhFLVxcdTBCOTBdfFtcXHUwQjkyLVxcdTBCOTVdfFtcXHUwQjk5LVxcdTBCOUFdfFtcXHUwQjlDLVxcdTBCOUNdfFtcXHUwQjlFLVxcdTBCOUZdfFtcXHUwQkEzLVxcdTBCQTRdfFtcXHUwQkE4LVxcdTBCQUFdfFtcXHUwQkFFLVxcdTBCQjVdfFtcXHUwQkI3LVxcdTBCQjldfFtcXHUwQzA1LVxcdTBDMENdfFtcXHUwQzBFLVxcdTBDMTBdfFtcXHUwQzEyLVxcdTBDMjhdfFtcXHUwQzJBLVxcdTBDMzNdfFtcXHUwQzM1LVxcdTBDMzldfFtcXHUwQzYwLVxcdTBDNjFdfFtcXHUwQzg1LVxcdTBDOENdfFtcXHUwQzhFLVxcdTBDOTBdfFtcXHUwQzkyLVxcdTBDQThdfFtcXHUwQ0FBLVxcdTBDQjNdfFtcXHUwQ0I1LVxcdTBDQjldfFtcXHUwQ0RFLVxcdTBDREVdfFtcXHUwQ0UwLVxcdTBDRTFdfFtcXHUwRDA1LVxcdTBEMENdfFtcXHUwRDBFLVxcdTBEMTBdfFtcXHUwRDEyLVxcdTBEMjhdfFtcXHUwRDJBLVxcdTBEMzldfFtcXHUwRDYwLVxcdTBENjFdfFtcXHUwRTAxLVxcdTBFMzBdfFtcXHUwRTMyLVxcdTBFMzNdfFtcXHUwRTQwLVxcdTBFNDVdfFtcXHUwRTgxLVxcdTBFODJdfFtcXHUwRTg0LVxcdTBFODRdfFtcXHUwRTg3LVxcdTBFODhdfFtcXHUwRThBLVxcdTBFOEFdfFtcXHUwRThELVxcdTBFOERdfFtcXHUwRTk0LVxcdTBFOTddfFtcXHUwRTk5LVxcdTBFOUZdfFtcXHUwRUExLVxcdTBFQTNdfFtcXHUwRUE1LVxcdTBFQTVdfFtcXHUwRUE3LVxcdTBFQTddfFtcXHUwRUFBLVxcdTBFQUJdfFtcXHUwRUFELVxcdTBFQjBdfFtcXHUwRUIyLVxcdTBFQjNdfFtcXHUwRUJELVxcdTBFQkRdfFtcXHUwRUMwLVxcdTBFQzRdfFtcXHUwRURDLVxcdTBFRERdfFtcXHUwRjAwLVxcdTBGMDBdfFtcXHUwRjQwLVxcdTBGNDddfFtcXHUwRjQ5LVxcdTBGNjldfFtcXHUwRjg4LVxcdTBGOEJdfFtcXHUxMTAwLVxcdTExNTldfFtcXHUxMTVGLVxcdTExQTJdfFtcXHUxMUE4LVxcdTExRjldfFtcXHUyMTM1LVxcdTIxMzhdfFtcXHUzMDA2LVxcdTMwMDZdfFtcXHUzMDQxLVxcdTMwOTRdfFtcXHUzMEExLVxcdTMwRkFdfFtcXHUzMTA1LVxcdTMxMkNdfFtcXHUzMTMxLVxcdTMxOEVdfFtcXHU0RTAwLVxcdTlGQTVdfFtcXHVBQzAwLVxcdUQ3QTNdfFtcXHVGOTAwLVxcdUZBMkRdfFtcXHVGQjFGLVxcdUZCMjhdfFtcXHVGQjJBLVxcdUZCMzZdfFtcXHVGQjM4LVxcdUZCM0NdfFtcXHVGQjNFLVxcdUZCM0VdfFtcXHVGQjQwLVxcdUZCNDFdfFtcXHVGQjQzLVxcdUZCNDRdfFtcXHVGQjQ2LVxcdUZCQjFdfFtcXHVGQkQzLVxcdUZEM0RdfFtcXHVGRDUwLVxcdUZEOEZdfFtcXHVGRDkyLVxcdUZEQzddfFtcXHVGREYwLVxcdUZERkJdfFtcXHVGRTcwLVxcdUZFNzJdfFtcXHVGRTc0LVxcdUZFNzRdfFtcXHVGRTc2LVxcdUZFRkNdfFtcXHVGRjY2LVxcdUZGNkZdfFtcXHVGRjcxLVxcdUZGOURdfFtcXHVGRkEwLVxcdUZGQkVdfFtcXHVGRkMyLVxcdUZGQzddfFtcXHVGRkNBLVxcdUZGQ0ZdfFtcXHVGRkQyLVxcdUZGRDddfFtcXHVGRkRBLVxcdUZGRENdLyxcbi8qIC0tLSAqL1xuXG4gIE5sICAgOiAvW1xcdTIxNjAtXFx1MjE4Ml18W1xcdTMwMDctXFx1MzAwN118W1xcdTMwMjEtXFx1MzAyOV0vLFxuICBNbiAgIDogL1tcXHUwMzAwLVxcdTAzNDVdfFtcXHUwMzYwLVxcdTAzNjFdfFtcXHUwNDgzLVxcdTA0ODZdfFtcXHUwNTkxLVxcdTA1QTFdfFtcXHUwNUEzLVxcdTA1QjldfFtcXHUwNUJCLVxcdTA1QkRdfFtcXHUwNUJGLVxcdTA1QkZdfFtcXHUwNUMxLVxcdTA1QzJdfFtcXHUwNUM0LVxcdTA1QzRdfFtcXHUwNjRCLVxcdTA2NTJdfFtcXHUwNjcwLVxcdTA2NzBdfFtcXHUwNkQ2LVxcdTA2RENdfFtcXHUwNkRGLVxcdTA2RTRdfFtcXHUwNkU3LVxcdTA2RThdfFtcXHUwNkVBLVxcdTA2RURdfFtcXHUwOTAxLVxcdTA5MDJdfFtcXHUwOTNDLVxcdTA5M0NdfFtcXHUwOTQxLVxcdTA5NDhdfFtcXHUwOTRELVxcdTA5NERdfFtcXHUwOTUxLVxcdTA5NTRdfFtcXHUwOTYyLVxcdTA5NjNdfFtcXHUwOTgxLVxcdTA5ODFdfFtcXHUwOUJDLVxcdTA5QkNdfFtcXHUwOUMxLVxcdTA5QzRdfFtcXHUwOUNELVxcdTA5Q0RdfFtcXHUwOUUyLVxcdTA5RTNdfFtcXHUwQTAyLVxcdTBBMDJdfFtcXHUwQTNDLVxcdTBBM0NdfFtcXHUwQTQxLVxcdTBBNDJdfFtcXHUwQTQ3LVxcdTBBNDhdfFtcXHUwQTRCLVxcdTBBNERdfFtcXHUwQTcwLVxcdTBBNzFdfFtcXHUwQTgxLVxcdTBBODJdfFtcXHUwQUJDLVxcdTBBQkNdfFtcXHUwQUMxLVxcdTBBQzVdfFtcXHUwQUM3LVxcdTBBQzhdfFtcXHUwQUNELVxcdTBBQ0RdfFtcXHUwQjAxLVxcdTBCMDFdfFtcXHUwQjNDLVxcdTBCM0NdfFtcXHUwQjNGLVxcdTBCM0ZdfFtcXHUwQjQxLVxcdTBCNDNdfFtcXHUwQjRELVxcdTBCNERdfFtcXHUwQjU2LVxcdTBCNTZdfFtcXHUwQjgyLVxcdTBCODJdfFtcXHUwQkMwLVxcdTBCQzBdfFtcXHUwQkNELVxcdTBCQ0RdfFtcXHUwQzNFLVxcdTBDNDBdfFtcXHUwQzQ2LVxcdTBDNDhdfFtcXHUwQzRBLVxcdTBDNERdfFtcXHUwQzU1LVxcdTBDNTZdfFtcXHUwQ0JGLVxcdTBDQkZdfFtcXHUwQ0M2LVxcdTBDQzZdfFtcXHUwQ0NDLVxcdTBDQ0RdfFtcXHUwRDQxLVxcdTBENDNdfFtcXHUwRDRELVxcdTBENERdfFtcXHUwRTMxLVxcdTBFMzFdfFtcXHUwRTM0LVxcdTBFM0FdfFtcXHUwRTQ3LVxcdTBFNEVdfFtcXHUwRUIxLVxcdTBFQjFdfFtcXHUwRUI0LVxcdTBFQjldfFtcXHUwRUJCLVxcdTBFQkNdfFtcXHUwRUM4LVxcdTBFQ0RdfFtcXHUwRjE4LVxcdTBGMTldfFtcXHUwRjM1LVxcdTBGMzVdfFtcXHUwRjM3LVxcdTBGMzddfFtcXHUwRjM5LVxcdTBGMzldfFtcXHUwRjcxLVxcdTBGN0VdfFtcXHUwRjgwLVxcdTBGODRdfFtcXHUwRjg2LVxcdTBGODddfFtcXHUwRjkwLVxcdTBGOTVdfFtcXHUwRjk3LVxcdTBGOTddfFtcXHUwRjk5LVxcdTBGQURdfFtcXHUwRkIxLVxcdTBGQjddfFtcXHUwRkI5LVxcdTBGQjldfFtcXHUyMEQwLVxcdTIwRENdfFtcXHUyMEUxLVxcdTIwRTFdfFtcXHUzMDJBLVxcdTMwMkZdfFtcXHUzMDk5LVxcdTMwOUFdfFtcXHVGQjFFLVxcdUZCMUVdfFtcXHVGRTIwLVxcdUZFMjNdLyxcbiAgTWMgICA6IC9bXFx1MDkwMy1cXHUwOTAzXXxbXFx1MDkzRS1cXHUwOTQwXXxbXFx1MDk0OS1cXHUwOTRDXXxbXFx1MDk4Mi1cXHUwOTgzXXxbXFx1MDlCRS1cXHUwOUMwXXxbXFx1MDlDNy1cXHUwOUM4XXxbXFx1MDlDQi1cXHUwOUNDXXxbXFx1MDlENy1cXHUwOUQ3XXxbXFx1MEEzRS1cXHUwQTQwXXxbXFx1MEE4My1cXHUwQTgzXXxbXFx1MEFCRS1cXHUwQUMwXXxbXFx1MEFDOS1cXHUwQUM5XXxbXFx1MEFDQi1cXHUwQUNDXXxbXFx1MEIwMi1cXHUwQjAzXXxbXFx1MEIzRS1cXHUwQjNFXXxbXFx1MEI0MC1cXHUwQjQwXXxbXFx1MEI0Ny1cXHUwQjQ4XXxbXFx1MEI0Qi1cXHUwQjRDXXxbXFx1MEI1Ny1cXHUwQjU3XXxbXFx1MEI4My1cXHUwQjgzXXxbXFx1MEJCRS1cXHUwQkJGXXxbXFx1MEJDMS1cXHUwQkMyXXxbXFx1MEJDNi1cXHUwQkM4XXxbXFx1MEJDQS1cXHUwQkNDXXxbXFx1MEJENy1cXHUwQkQ3XXxbXFx1MEMwMS1cXHUwQzAzXXxbXFx1MEM0MS1cXHUwQzQ0XXxbXFx1MEM4Mi1cXHUwQzgzXXxbXFx1MENCRS1cXHUwQ0JFXXxbXFx1MENDMC1cXHUwQ0M0XXxbXFx1MENDNy1cXHUwQ0M4XXxbXFx1MENDQS1cXHUwQ0NCXXxbXFx1MENENS1cXHUwQ0Q2XXxbXFx1MEQwMi1cXHUwRDAzXXxbXFx1MEQzRS1cXHUwRDQwXXxbXFx1MEQ0Ni1cXHUwRDQ4XXxbXFx1MEQ0QS1cXHUwRDRDXXxbXFx1MEQ1Ny1cXHUwRDU3XXxbXFx1MEYzRS1cXHUwRjNGXXxbXFx1MEY3Ri1cXHUwRjdGXS8sXG4gIE5kICAgOiAvW1xcdTAwMzAtXFx1MDAzOV18W1xcdTA2NjAtXFx1MDY2OV18W1xcdTA2RjAtXFx1MDZGOV18W1xcdTA5NjYtXFx1MDk2Rl18W1xcdTA5RTYtXFx1MDlFRl18W1xcdTBBNjYtXFx1MEE2Rl18W1xcdTBBRTYtXFx1MEFFRl18W1xcdTBCNjYtXFx1MEI2Rl18W1xcdTBCRTctXFx1MEJFRl18W1xcdTBDNjYtXFx1MEM2Rl18W1xcdTBDRTYtXFx1MENFRl18W1xcdTBENjYtXFx1MEQ2Rl18W1xcdTBFNTAtXFx1MEU1OV18W1xcdTBFRDAtXFx1MEVEOV18W1xcdTBGMjAtXFx1MEYyOV18W1xcdUZGMTAtXFx1RkYxOV0vLFxuICBQYyAgIDogL1tcXHUwMDVGLVxcdTAwNUZdfFtcXHUyMDNGLVxcdTIwNDBdfFtcXHUzMEZCLVxcdTMwRkJdfFtcXHVGRTMzLVxcdUZFMzRdfFtcXHVGRTRELVxcdUZFNEZdfFtcXHVGRjNGLVxcdUZGM0ZdfFtcXHVGRjY1LVxcdUZGNjVdLyxcbiAgWnMgICA6IC9bXFx1MjAwMC1cXHUyMDBCXXxbXFx1MzAwMC1cXHUzMDAwXS8sXG59O1xuIl19
(27)
});
