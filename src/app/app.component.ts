import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterLink,
        RouterOutlet,
        NzLayoutModule,
        NzMenuModule,
        NzIconModule,
        LanguageSwitcherComponent,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = true;
}
