import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieTitle',
})
export class MovieTitlePipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().replace(/ /g, '_');
  }
}
