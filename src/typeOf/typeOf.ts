// tslint:disable:ban-types

export interface ITypeOf {
  (value: any): string
  isBoolean: (value: any) => value is boolean
  isNull: (value: any) => value is null
  isUndefined: (value: any) => value is undefined
  isString: (value: any) => value is string
  isNumber: (value: any) => value is number
  isSymbol: (value: any) => value is symbol
  isFunction: (value: any) => value is Function
  isArray: (value: any) => value is any[]
  isObject: (value: any) => value is object
  isRegExp: (value: any) => value is RegExp
  isDate: (value: any) => value is Date
}

// Primitives
export const isBoolean = (value): value is boolean => typeof value === 'boolean'
export const isNull = (value): value is null => value === null
export const isUndefined = (value): value is undefined => value === undefined
export const isString = (value): value is string => typeof value === 'string'
export const isNumber = (value): value is number => typeof value === 'number' && !isNaN(value)
export const isSymbol = (value): value is symbol => typeof value === 'symbol'

// Object obfuscated types
export const isFunction = (value): value is Function => typeof value === 'function'
export const isArray = (value): value is any[] => Array.isArray(value)
export const isObject = (value): value is object => typeOf(value) === 'object'
export const isRegExp = (value): value is RegExp => typeOf(value) === 'regexp'
export const isDate = (value): value is Date => typeOf(value) === 'date'

export const typeOf: ITypeOf = (() => {
  const toString = Object.prototype.toString

  const fn: any = (value: any): string => {
    // For performance
    if (typeof value === 'number' && isNaN(value)) { return 'nan' }

    const type = toString.call(value)
      .slice(8, -1)
      .toLowerCase()

    return type
  }

  fn.isBoolean = isBoolean
  fn.isNull = isNull
  fn.isUndefined = isUndefined
  fn.isString = isString
  fn.isNumber = isNumber
  fn.isSymbol = isSymbol
  fn.isFunction = isFunction
  fn.isArray = isArray
  fn.isObject = isObject
  fn.isRegExp = isRegExp
  fn.isDate = isDate

  return fn
})()