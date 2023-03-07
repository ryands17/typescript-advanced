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

const getUserAsync = async (id: number): Promise<User | null | undefined> => {
  if (id === 0) return null;
  await sleep();
  return { id, name: 'John' };
};

function sleep(time = 2000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const unwrap = <T>(option: Option<T>, errorMessage?: string): T => {
  if (option.type === 'none') throw Error(errorMessage || 'Cannot unwrap None');
  return option.value;
};

export const unwrapOr = <T>(option: Option<T>, defaultValue: T): T => {
  try {
    return unwrap(option);
  } catch (error) {
    return defaultValue;
  }
};

export const optionWrapper = <T, U extends T>(fn: (value: T) => value is U) => {
  return (value: T): Option<U> => {
    try {
      if (fn(value)) return Some(value);
      return None;
    } catch (error) {
      return None;
    }
  };
};

export const createOption = optionWrapper(
  <T>(value: T | null | undefined): value is T =>
    value !== null && value !== undefined
);

export const strictOption = <T>(
  value: Option<T | null | undefined>
): Option<T> => {
  const fn = (value: Option<T | null | undefined>): value is Option<T> =>
    value.type === 'some' && value.value !== null && value.value !== undefined;

  return fn(value) ? value : None;
};

const arr = [1, 2, 3];
const val = createOption(arr.pop());
console.log(unwrapOr(val, 1));

const user1 = unwrap(getValue(() => getUser(1)));
const user2 = unwrapOr(
  getValue(() => getUser(1)),
  { id: 1, name: 'John' }
);

(async () => {
  const user = strictOption(await getValueAsync(getUserAsync(1)));

  if (user.type === 'some') {
    console.log(user.value.name);
  }
})();
