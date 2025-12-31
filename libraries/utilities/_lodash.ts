import zxhiddenCustomCloneDeepByJeremyAshkenas from './js/_clone-deep';
import zxhiddenCustomOrderByByJeremyAshkenas from './js/_order-by';

type List<T> = ArrayLike<T>;
type Many<T> = T | ReadonlyArray<T>;
type ListIterator<T, TResult> = (value: T, index: number, collection: List<T>) => TResult;
type PartialShallow<T> = {
  [P in keyof T]?: T[P] extends object ? object : T[P];
};
type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | PartialShallow<T>;
type ListIteratee<T> = ListIterator<T, unknown> | IterateeShorthand<T>;

/**
 * This method is like _.clone except that it recursively clones value.
 *
 * @param value The value to recursively clone.
 * @return Returns the deep cloned value.
 */
export function cloneDeep<T>(value: T): T {
  return zxhiddenCustomCloneDeepByJeremyAshkenas(value);
}

/**
 * Creates a shallow clone of value.
 *
 * @param value The value to clone.
 * @return Returns the cloned value.
 */
export function clone<T>(value: T): T | Array<T> | Date {
  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof Array) return value.slice();
  if (typeof value === 'object') return JSON.parse(JSON.stringify(value));

  return value;
}

/**
 * Creates an array of elements, sorted in ascending / descending order by
 * the results of running each element in a collection through each iteratee.
 * This method performs a stable sort, that is, it preserves the original
 * sort order of equal elements. The iteratees are invoked with one argument:
 * (value).
 *
 * @category Collection
 * @param collection The collection to iterate over.
 * @param [iteratees=[_.identity]] The iteratees to sort by.
 * @param [orders] The sort orders of `iteratees`.
 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.reduce`.
 * @returns Returns the new sorted array.
 * @example
 *
 * const users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 42 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * // sort by `user` in ascending order and by `age` in descending order
 * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
 */
export function orderBy<T>(
  collection: ArrayLike<T> | null | undefined,
  iteratees?: Many<ListIteratee<T>>,
  orders?: Many<boolean | 'asc' | 'desc'>
): T[] {
  return zxhiddenCustomOrderByByJeremyAshkenas(collection as any, iteratees as any, orders as any);
}

/**
 * Return a clone without duplicated values.
 *
 * @param collection
 * @param key
 * @example
 *
 * const data = [1,2,2,3,4,4];
 * const result = uniq(data); // [1,2,3,4]
 *
 * const dataArr = [
 * {nombre : 'Enrique', lastName : 'Cuello'},
 * {nombre : 'Maria', lastName : 'Aponte'},
 * {nombre : 'Enrique', lastName : 'De Armas'},
 * ];
 *
 * const resultArr = uniq(dataArr, 'nombre');
 * // [{nombre : 'Enrique', lastName : 'Cuello'},{nombre : 'Maria', lastName : 'Aponte'}]
 */
export function uniq<T>(collection: Array<T>, key?: string): T[] {
  let result: any[] = [];

  collection.forEach((_: any, i) => {
    if (!i) result.push(_);
    if (!key) {
      if (!result.filter(_2 => _2 === _).length) result.push(_);
    } else {
      if (!result.filter(_2 => _2[key] === _[key]).length) result.push(_);
    }
  });

  return result;
}
