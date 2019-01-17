import deepAssign from './deep-assign'

export default function deepClone (obj: object): object {
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item))
  } else if (typeof obj === 'object') {
    return deepAssign({}, obj)
  }
  return obj
}
