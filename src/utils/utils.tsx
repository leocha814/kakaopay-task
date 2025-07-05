import { theme } from '@/constants/theme';

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

export type ThemeKeys<TCategory extends keyof typeof theme> =
  keyof (typeof theme)[TCategory];

export function getThemeValue<TCategory extends keyof typeof theme>(
  categoryObj: (typeof theme)[TCategory],
  value: ThemeKeys<TCategory> | string | number,
): string | number {
  if (Object.prototype.hasOwnProperty.call(categoryObj, value)) {
    return categoryObj[value as ThemeKeys<TCategory>] as string | number;
  }
  return value as string | number;
}
