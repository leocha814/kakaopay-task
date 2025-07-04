export const toSnakeCase = (str: string): string => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};

export const keysToSnakeCase = <T,>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(keysToSnakeCase) as unknown as T;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([k, v]) => [
        toSnakeCase(k),
        keysToSnakeCase(v),
      ]),
    ) as T;
  }
  return obj;
};
