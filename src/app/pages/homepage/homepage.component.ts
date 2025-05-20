import { Component } from '@angular/core';
import { ContactFormComponent } from '../../fragments/contact-form/contact-form.component';
import { MapComponent } from '../../fragments/map/map.component';
import { EmailFormComponent } from '../../email-form/email-form.component';


@Component({
  selector: 'app-homepage',
  imports: [ContactFormComponent, MapComponent, EmailFormComponent],
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  websiteUrl: string = '/'

}
