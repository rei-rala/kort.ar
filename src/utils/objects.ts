export function removeKeysFromObject<T>(object: T, keys: string[]): Omit<T, keyof typeof keys> {
  if (!object) return object;

  for (let key of keys) {
    delete (object as Partial<T>)[key as keyof T];
  }

  return object;
}

// lol no funciona con Pick por si mismo
export function getObjectWithSomeKeys<T>(
  object: T,
  keys: string[]
): Pick<T, keyof Omit<T, keyof typeof keys>> {
  let newObject: Partial<T> = {};

  for (let key in object) {
    if (keys.includes(key)) {
      newObject[key] = object[key];
    }
  }

  return newObject as Pick<T, keyof Omit<T, keyof typeof keys>>;
}

// reemplazar uso de removeKeysFromObject
export function getObjectWithoutSomeKeys<T>(object: T, keys: string[]): Omit<T, keyof typeof keys> {
  let newObject: Partial<T> = {};

  for (let key in object) {
    if (!keys.includes(key)) {
      newObject[key] = object[key];
    }
  }

  return newObject as Omit<T, keyof typeof keys>;
}
