import { Pipe, PipeTransform, inject, OnDestroy } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private translationService = inject(TranslationService);

  ngOnDestroy(): void {
    // Clean up if needed
  }

  transform(key: string): string {
    return this.translationService.translate(key);
  }
}
