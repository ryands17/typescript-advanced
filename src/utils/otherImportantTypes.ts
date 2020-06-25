/*
  Typescript Utility Types 
*/

// Pick<K,T>: Constructs a type by picking the set of properties K from T.
// Omit: The opposite of Pick
type IUser = {
  name: string
  age: number
  location: {
    lat: number
    lng: number
  }
}

type ILocation = Pick<IUser['location'], 'lat' | 'lng'>
type IUser2 = Omit<IUser, 'location'>

const _coords: ILocation = {
  lat: 37.422,
  lng: 122.0841,
}

// Exclude<T, U>: Constructs a type by excluding from T all properties that are assignable to U
type Exclude1 = Exclude<
  string | number | (() => void),
  <T extends any[], U extends any>(...args: T) => U
>

// Extract<T, U>: Constructs a type by extracting from T all properties that are assignable to U (opposite of Exclude)
type Extract1 = Extract<string | number | (() => void), string | number>

type IUser3 = {
  name: string
  company: null | undefined
}

// NonNullable<T>: Constructs a type by excluding nu<ll and undefined from T
type IUser4 = {
  [K in keyof IUser3]: NonNullable<IUser3[K]>
}

// ReturnType<T>: Constructs a type consisting of the return type of function T.
const add = (a: number, b: number) => a + b
type AddType = ReturnType<typeof add>

// InstanceType<T>: Constructs a type consisting of the instance type of a constructor function type T
class MyClass {
  constructor(private num: number) {}

  getNum() {
    return this.num
  }
}
type InstanceType1 = InstanceType<typeof String>
type InstanceType2 = InstanceType<typeof MyClass>

// Required<T>: Constructs a type consisting of all properties of T set to required.
type INotRequired = {
  name: string
  age?: number
}
type IRequired = Required<INotRequired>

// Parameters<T>: This lets us extract all parameter types of a function type. It produces a tuple type with all the parameter type or the type never if T is not a function.
type AddParams = Parameters<typeof add>

// ConstructorParameters<T>: This lets us extract all parameter types of a constructor function type. It produces a tuple type with all the parameter types or the type never if T is not a function.
type ClassParams = ConstructorParameters<typeof MyClass>

export {}
