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
  let fullName = it.nombre +' '+it.apellidop + ' ' + it.apellidom
  return fullName.toLowerCase().includes(searchText);
   /* ============
      FALTA BUSQUEDA POR ARTICULO
   ==============================*/ 
});
return mames;
   }
}