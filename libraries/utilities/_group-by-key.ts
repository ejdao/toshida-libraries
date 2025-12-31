export interface TsdGrouped<T> {
  key: any;
  name: any;
  rows: T[];
}

export function groupByKey<T>(data: Array<T>, columnWithKey: string, columnWithName?: string) {
  const newArray: TsdGrouped<T>[] = [];

  const dataFrezzed = Object.freeze(data);

  dataFrezzed.forEach((el) => {
    const tempArray = newArray.filter((j) => j.key === (el as any)[columnWithKey]);
    if (tempArray.length > 0) {
      newArray[newArray.indexOf(tempArray[0])].rows.push(el);
    } else {
      newArray.push({
        key: (el as any)[columnWithKey] as string,
        name: (el as any)[columnWithName || columnWithKey] as string,
        rows: [el],
      });
    }
  });

  return newArray;
}
