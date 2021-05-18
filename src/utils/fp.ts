// trampolines: use to prevent a stack overflow for tail recursive functions.

export const trampoline = <T extends any[], U extends any>(
  fn: (...args: T) => U
) => (...args: T) => {
  let result = fn(...args)
  while (typeof result === 'function') {
    result = result()
  }
  return result
}

const factorialRec = (num: number, result = 1) => {
  return num < 2 ? result : () => factorialRec(num - 1, num * result)
}

const sumOfRec = (number: number, sum = 0) =>
  number <= 0 ? sum : () => sumOfRec(number - 1, sum + number)

const sumOf = trampoline(sumOfRec)
const factorial = trampoline(factorialRec)

console.log(`Sum is: ${sumOf(100000)}`)
console.log(`Factorial is: ${factorial(20)}`)

// curry: allow a function to lazily evaluate by passing it's arguments one by one (converting an n-ary to a unary function).
function add(n1: number, n2: number, n3: number, n4: number) {
  return n1 + n2 + n3 + n4
}

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    }
    return function partial(...args2) {
      return curried.apply(this, [...args, ...args2])
    }
  }
}

const addCurry = curry(add)
console.log(addCurry(1, 2, 3, 4))
console.log(addCurry(1)(2, 3, 4))
console.log(addCurry(1)(2)(3, 4))
console.log(addCurry(1)(2)(3)(4))

// this a reduce method delay thunk action.
const thunk = <T>(x: T) => () => x

const five = thunk(4)
const nine = thunk(7)

const values = [five, thunk(2), thunk(3), nine, thunk(10)]

const addFn = (fn1: () => number, fn2: () => number) => fn1() + fn2()

const addAll = (values: Array<() => number>) => {
  return values.reduce((acc, fn) => {
    return () => addFn(acc, fn)
  })()
}

console.log(`Sum: ${addAll(values)}`)
