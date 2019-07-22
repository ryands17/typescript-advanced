class Stack<T> {
  private items: T[] = []

  push(item: T): void {
    this.items.push(item)
  }

  pop(): T | string {
    let item = this.items.pop()
    if (item) {
      return item
    }
    return 'Stack is empty!'
  }

  top(): T {
    return this.items[this.items.length - 1]
  }

  length(): number {
    return this.items.length
  }
}

const s = new Stack<string>()
s.push('Linkin Park')
s.push('Led Zeppelin')
s.push('Green Day')
console.log(`
Stack top: ${s.top()}
Total items: ${s.length()}
`)

// using composition
const Stackable = (initialValue = {}) => {
  const items: number[] = []
  return {
    ...initialValue,
    push(item: number) {
      items.push(item)
    },
    pop(): number | string {
      let item = items.pop()
      if (item) {
        return item
      }
      return 'Stack is empty!'
    },
    top(): number {
      return items[items.length - 1]
    },
    length(): number {
      return items.length
    },
  }
}

const s1 = Stackable()
s1.push(1)
s1.push(2)
s1.push(3)
s1.push(4)

console.log(`
Composed Stack top: ${s1.top()}
Composed Stack total items: ${s1.length()}
`)
