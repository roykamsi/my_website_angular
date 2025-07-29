import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NzSelectModule } from "ng-zorro-antd/select";
import { TranslationService } from "../../services/translation.service";


@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [NzSelectModule, CommonModule, FormsModule],
  template: `
    <nz-select
      [(ngModel)]="currentLanguage"
      (ngModelChange)="onCurrentLanguageChange($event)"
      nzSize="small"
    class="min-w-[100px]">
      <nz-option nzValue="en-GB" nzLabel="🇬🇧 English"></nz-option>
      <nz-option nzValue="it" nzLabel="🇮🇹 Italiano"></nz-option>
    </nz-select>
    `
})
export class LanguageSwitcherComponent implements OnInit {
  private translationService = inject(TranslationService);

  currentLanguage = this.translationService.getCurrentLanguage();

  ngOnInit(): void {
    this.currentLanguage = this.translationService.getCurrentLanguage();
  }

  onCurrentLanguageChange(lang: string): void {
    this.translationService.setLanguage(lang);
    this.currentLanguage = lang;
  }
}
