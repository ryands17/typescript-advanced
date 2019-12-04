export class Stack<T> {
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

  depth(): number {
    return this.items.length
  }
}

const s = new Stack<string>()
s.push('Linkin Park')
s.push('Led Zeppelin')
s.push('Green Day')
console.log(`
Stack top: ${s.top()}
Total items: ${s.depth()}
`)

// using composition
type Stackable = {
  push: (item: number) => void
  pop: () => number | string
  top: () => number
  depth: () => number
}

type Clearable = Stackable & {
  clearAll: () => void
}

const stackable = (stack = {}): Stackable => {
  const items: number[] = []
  return {
    ...stack,
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
    depth(): number {
      return items.length
    },
  }
}

const clearable = (stack: Stackable): Clearable => {
  return {
    ...stack,
    clearAll() {
      while (stack.depth()) {
        stack.pop()
      }
    },
  }
}

const stack = clearable(stackable())
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)

console.log(`
Composed Stack top: ${stack.top()}
Composed Stack total items: ${stack.depth()}
`)
