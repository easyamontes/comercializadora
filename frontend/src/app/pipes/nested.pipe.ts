import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: "Hijos" })

export class NestedPipe implements PipeTransform {
  transform(value: any[], ...args: string[]): any[] {

    let hashMap = {};
    let filterKey = args[0];

    for (let v of value) {
      const hashKey = createHashKey(v, filterKey);
      hashMap[hashKey] = v;
    }
    return Object.values(hashMap);
  }
}
function createHashKey(obj: any, filterKey: string): string {
  // For demonstration purposes only:
  return JSON.stringify(obj.filterKey);
}

