import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ContactFormComponent } from '../../components/email-form/fragments/contact-form/contact-form.component';
import { MapComponent } from '../../components/email-form/fragments/map/map.component';
import { EmailFormComponent } from '../../components/email-form/email-form.component';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Nl2brPipe } from '../../pipes/nl2br.pipe';


@Component({
    selector: 'app-homepage',
    imports: [ContactFormComponent, MapComponent, EmailFormComponent, TranslatePipe, Nl2brPipe],
    templateUrl: './homepage.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  websiteUrl: string = '/'

}
