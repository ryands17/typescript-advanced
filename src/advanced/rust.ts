type Maybe<T> = T | null | undefined;
type Some<T> = { type: 'some'; value: T };
type None = { type: 'none' };
type Option<T> = Some<T> | None;

const None: None = { type: 'none' };
const Some = <T>(value: T): Some<T> => ({ type: 'some', value });

export const getValue = <T>(fn: () => T): Option<T> => {
  try {
    return Some(fn());
  } catch (error) {
    return None;
  }
};

export const getValueAsync = async <T>(arg: Promise<T>): Promise<Option<T>> => {
  try {
    return Some(await arg);
  } catch (error) {
    return None;
  }
};

type User = {
  id: number;
  name: string;
};

const getUser = (id: number): User => {
  if (id === 0) throw Error('Cannot find user');
  return { id, name: 'John' };
};

const getUserAsync = async (id: number): Promise<Maybe<User>> => {
  if (id === 0) return null;
  await sleep();
  return { id, name: 'John' };
};

function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// TODO: add unwrap for the result type
export const unwrap = <T>(rawValue: Option<T>, errorMessage?: string): T => {
  if (rawValue.type === 'none')
    throw Error(errorMessage || 'Cannot unwrap None');
  return rawValue.value;
};

export const unwrapOr = <T>(rawValue: Option<T>, defaultValue: T): T => {
  try {
    return unwrap(rawValue);
  } catch (error) {
    return defaultValue;
  }
};

// export const optionWrapper = <T, U extends T>(fn: (value: T) => value is U) => {
//   return (value: T): Option<U> => {
//     try {
//       if (fn(value)) return Some(value);
//       return None;
//     } catch (error) {
//       return None;
//     }
//   };
// };

// export const createOption = optionWrapper(
//   <T>(value: Maybe<T>): value is T =>
//     value !== null && value !== undefined
// );

export const createOption = <T>(value: Maybe<T>): Option<T> => {
  const fn = (value: Maybe<T>): value is T =>
    value !== null && value !== undefined;

  return fn(value) ? Some(value) : None;
};

export const strictOption = <T>(value: Option<Maybe<T>>): Option<T> => {
  const fn = (value: Option<Maybe<T>>): value is Option<T> =>
    value.type === 'some' && value.value !== null && value.value !== undefined;

  return fn(value) ? value : None;
};

const arr = [1, 2, 3];
const val = createOption(arr.find((x) => x === 4));
console.log('Find value:', unwrapOr(val, 1));

const user1 = unwrap(getValue(() => getUser(1)));
const user2 = unwrapOr(
  getValue(() => getUser(1)),
  { id: 1, name: 'John' }
);

(async () => {
  const user = strictOption(await getValueAsync(getUserAsync(1)));

  console.log('Using unwrap:', unwrap(user, 'Cannot find user'));

  if (user.type === 'some') {
    console.log('Using a condition:', user.value.name);
  }
})();

type Ok<T> = { type: 'ok'; value: T };
type Err = { type: 'err'; error: unknown };

type Result<T> = Ok<T> | Err;

const Ok = <T>(value: T): Ok<T> => ({ type: 'ok', value });
const Err = (error: unknown): Err => ({ type: 'err', error });

export const getResult = <Args extends unknown[], Res>(
  fn: (...args: Args) => Res
) => {
  return (...args: Args): Result<Res> => {
    try {
      return Ok(fn(...args));
    } catch (error) {
      return Err(error);
    }
  };
};

const user = getResult(getUser)(1);
if (user.type === 'ok') {
  console.log('Using the result type:', user.value.name);
}
