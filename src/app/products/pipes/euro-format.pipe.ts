import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euroFormat'
})
export class EuroFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value)) {
      return 'Invalid Number';
    }

    const formattedValue = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);

    return formattedValue;
  }

}
