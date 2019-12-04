class Amount {
  constructor(private amount: number) {}

  getAmount() {
    return this.amount
  }
}

// typescript allows cleaner depiction of numbers
const moneyIWishIHad = new Amount(1_000_000_00)

console.log('amount', moneyIWishIHad.getAmount())

export {}
