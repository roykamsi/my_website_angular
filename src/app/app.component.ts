import { Component, ChangeDetectionStrategy, HostListener, inject } from '@angular/core';

import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';

@Component({
    selector: 'app-root',
    imports: [
    RouterLink,
    RouterOutlet,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    LanguageSwitcherComponent
],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private router = inject(Router);

  isCollapsed = true;

  currentYear = () => {
    return new Date().getFullYear();
  }

  // Intercept any in-page anchor (href="#...") so it preserves the current
  // language prefix (e.g. /it) instead of resolving against <base href="/">.
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const anchor = (event.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!anchor) {
      return;
    }

    const fragment = anchor.getAttribute('href')!.slice(1);
    if (!fragment) {
      return;
    }

    event.preventDefault();

    const urlTree = this.router.parseUrl(this.router.url);
    urlTree.fragment = fragment;
    this.router.navigateByUrl(urlTree);

    document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
  }
}
