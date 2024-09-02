export function getUniqueValues<T, K extends keyof T>(
  items: T[],

  field: K
): string[] {
  const uniqueValues = new Set<string>();

  items.forEach((item) => {
    uniqueValues.add(String(item[field]));
  });

  return Array.from(uniqueValues);
}
