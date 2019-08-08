import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
let mames =  items.filter( it => {
  return it.concepto.toLowerCase().includes(searchText);
   /* ============
      FALTA BUSQUEDA POR ARTICULO
   ==============================*/ 
});
return mames;
   }
}