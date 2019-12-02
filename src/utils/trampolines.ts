const trampoline = (fn: Function) => (...args) => {
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
