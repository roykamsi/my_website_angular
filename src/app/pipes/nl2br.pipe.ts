import { Pipe, PipeTransform } from "@angular/core";

/**
 * Pipe to convert new line characters to <br> HTML tags.
 * Usage: {{ 'text with\nnew line' | nl2br }}
 */
@Pipe({
  name: "nl2br",
  standalone: true
})
export class Nl2brPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.replace(/\n/g, '<br>')
  }
}
