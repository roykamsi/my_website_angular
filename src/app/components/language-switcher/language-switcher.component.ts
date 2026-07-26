
import { Component, inject, OnInit, OnDestroy, ChangeDetectionStrategy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NzSelectModule } from "ng-zorro-antd/select";
import { TranslationService } from "../../services/translation.service";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";


@Component({
    selector: 'app-language-switcher',
    imports: [NzSelectModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.Eager,
    template: `
    <nz-select
      [(ngModel)]="currentLanguage"
      (ngModelChange)="onCurrentLanguageChange($event)"
      nzSize="small"
      class="lang-switcher"
      [nzCustomTemplate]="selectedFlagTpl">
      <nz-option nzValue="en-GB" nzCustomContent nzLabel="English">
        <span title="English">🇬🇧</span>
      </nz-option>
      <nz-option nzValue="it" nzCustomContent nzLabel="Italiano">
        <span title="Italiano">🇮🇹</span>
      </nz-option>
    </nz-select>
    <ng-template #selectedFlagTpl let-selected>{{ flagFor(selected.nzValue) }}</ng-template>
    `,
    styles: [`
      .lang-switcher {
        display: inline-block;
      }

      .lang-switcher ::ng-deep .ant-select-selector {
        background: #fff !important;
        border-radius: 999px !important;
        padding: 0 8px !important;
      }

      .lang-switcher ::ng-deep .ant-select-selection-item {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }

      .lang-switcher ::ng-deep .ant-select-arrow {
        color: rgba(0, 0, 0, .45);
      }
    `]
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

  flagFor(lang: string): string {
    return lang === 'it' ? '🇮🇹' : '🇬🇧';
  }
}
