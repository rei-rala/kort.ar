export function removeKeysFromObject<T>(
  object: T,
  keys: readonly string[]
): Omit<T, keyof typeof keys> {
  for (let key of keys) {
    delete (object as Partial<T>)[key as keyof T];
  }

  return object;
}
