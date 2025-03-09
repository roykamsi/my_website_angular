import { Component } from '@angular/core';
import { ContactFormComponent } from '../../fragments/contact-form/contact-form.component';


@Component({
  selector: 'app-homepage',
  imports: [ContactFormComponent],
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  websiteUrl: string = '/'

}
