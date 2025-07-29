import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, OnDestroy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NzSelectModule } from "ng-zorro-antd/select";
import { TranslationService } from "../../services/translation.service";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";


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
export class LanguageSwitcherComponent implements OnInit, OnDestroy {
  private translationService = inject(TranslationService);
  private router = inject(Router);
  private routerSubscription?: Subscription;

  currentLanguage = this.translationService.getCurrentLanguage();

  ngOnInit(): void {
    this.currentLanguage = this.translationService.getCurrentLanguage();
    
    // Listen to route changes to update the language switcher
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentLanguage = this.translationService.getCurrentLanguage();
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  onCurrentLanguageChange(lang: string): void {
    this.translationService.setLanguage(lang);
    this.translationService.navigateWithLanguage(lang);
    this.currentLanguage = lang;
  }
}
