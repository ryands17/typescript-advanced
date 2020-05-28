export const prettyPrint = (json: any) => JSON.stringify(json, null, 2)

export const sum = (a: number, b: number) => {
  console.log(a, b)
  return a + b
}

export const hoc = <T extends any[], U extends any>(fn: (...args: T) => U) => {
  console.log('mapping function')
  return (...args: T) => {
    return fn(...args)
  }
}

// this has the same types as the `sum` function!
const anotherFn = hoc(sum)

console.log('called: ', anotherFn(1, 5))
