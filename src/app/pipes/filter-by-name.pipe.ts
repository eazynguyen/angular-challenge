import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilterByName',
})
export class FilterByNamePipe implements PipeTransform {
  transform<T extends { slug: string }>(
    values: T[] = [],
    key = ''
  ): T[] {
    key = key.trim().toLowerCase();
    if (!key) return values;

    return values.filter(
      (v) =>
        v.slug.toLowerCase().includes(key)
    );
  }
}
