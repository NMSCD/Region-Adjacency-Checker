import { i18n, messages } from '../i18n';

// inspired by https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object

type Join<FirstType, SecondType> = FirstType extends string | number
  ? SecondType extends string | number
    ? `${FirstType}${'' extends SecondType ? '' : '.'}${SecondType}`
    : never
  : never;

/**
 * Helper type that transforms an object tree into a union type of all possibles leaves.
 */
type Leaves<ObjectType> =
  ObjectType extends Record<string, unknown>
    ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { [Key in keyof ObjectType]-?: Join<Key, Leaves<ObjectType[Key]>> }[keyof ObjectType]
    : '';

export type I18NLeaves = Leaves<(typeof messages)['Español']>;

// This function adds type safety to the i18n t function.
export function useI18n() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { t, te, d, n, tm, rt, ...globalApi } = i18n.global;

  type RemoveFirstFromTuple<T extends unknown[]> = ((...b: T) => void) extends (...b: infer I) => void ? I : [];

  const typedT = t as (...args: [I18NLeaves, ...Partial<RemoveFirstFromTuple<Parameters<typeof t>>>]) => string;

  return {
    t: typedT.bind(i18n),
    d: d.bind(i18n),
    te: te.bind(i18n),
    tm: tm.bind(i18n),
    rt: rt.bind(i18n),
    n: n.bind(i18n),
    ...globalApi,
  };
}
