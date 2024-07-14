export function removeKeysFromObject<T>(object: T, keys: string[]): Omit<T, keyof typeof keys> {
  if (!object) return object;
  
  for (let key of keys) {
    delete (object as Partial<T>)[key as keyof T];
  }

  return object;
}
