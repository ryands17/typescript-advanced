import { z } from 'zod';
import fetch from 'node-fetch';

export async function tsFetch<TData>(
  schema: z.Schema<TData>,
  ...args: Parameters<typeof fetch>
) {
  const raw = await fetch(...args);
  const result = await raw.json();

  return schema.parse(result);
}

const users = await tsFetch(
  z.array(z.object({ id: z.number(), name: z.string() })),
  'https://jsonplaceholder.typicode.com/users'
);

console.log(users);

export class TSLocalStorage<TData> {
  constructor(
    private schema: z.Schema<TData>,
    private key: string,
    value: TData
  ) {
    window.localStorage.setItem(
      this.key,
      JSON.stringify(this.schema.parse(value))
    );
  }

  setValue(value: TData) {
    window.localStorage.setItem(
      this.key,
      JSON.stringify(this.schema.parse(value))
    );
  }

  getValue() {
    return this.schema.parse(
      JSON.parse(window.localStorage.getItem(this.key) || '{}')
    );
  }
}
