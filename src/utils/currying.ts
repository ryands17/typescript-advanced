// currying the sum method

type Sum = (a: number) => Sum2
type Sum2 = ((b: number) => Sum2) & (() => number)

const sum = ((a: number) => {
  return (b: number) => (b === undefined ? a : sum(a + b))
}) as Sum

console.log(`Sum: ${sum(1)(2)(3)()}`)

export {}
