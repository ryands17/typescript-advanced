// making a DeepPartial utility type using Recursion
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : Partial<T>;

type Result = {
  a: boolean;
  b: number;
  c: number;
  d: {
    e: string;
    f: string;
  };
  g: {
    h: string;
    i: number;
  }[];
};

type MockResult = DeepPartial<Result>;

// creating a discriminated union of events
interface DispatchableEvent {
  LOG_IN: {
    username: string;
    password: string;
  };
  UPDATED_USERNAME: {
    username: string;
  };
  SIGN_OUT: {};
}

export type DispatchableEvents = {
  [K in keyof DispatchableEvent]: { type: K } & DispatchableEvent[K];
}[keyof DispatchableEvent];

// branded types
declare const brand: unique symbol;

type Brand<T, TBrand extends string> = T & {
  [brand]: TBrand;
};

type User = {
  id: number;
  name: string;
};

type AuthorisedUser = Brand<User, 'AuthorisedUser'>;

function validateUser(user: User): user is AuthorisedUser {
  return user.id === 1;
}

let user1 = {
  id: 1,
  name: 'abc',
} as const satisfies User;

function makePayment(user: AuthorisedUser) {
  // user is valid here
  console.log(user.id, 'made payment of €20');
}

if (validateUser(user1)) {
  makePayment(user1);
}

// generic mapper function
function sum<T>(arr: readonly T[], mapper: (item: T) => number) {
  return arr.reduce((acc, val) => acc + mapper(val), 0);
}

console.log(sum([1, 2, 3], (item) => item * 2));
