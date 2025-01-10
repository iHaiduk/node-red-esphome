import { isNonNullish, isNumber as checkNumber, isString as checkString } from 'remeda';

export const isExist = <T>(value: T | null | undefined): value is NonNullable<T> => isNonNullish(value);

export const isString = (value?: string | null, isTrimmed = false): value is NonNullable<string> =>
  checkString(value) && (isTrimmed ? value.trim() : value).length > 0;

export const isNumber = (value?: number | null): value is NonNullable<number> =>
  checkNumber(value) && !Number.isNaN(value);
