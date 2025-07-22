import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.scss'
})
export class EmailFormComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitMessage = '';

    // Create FormData to send to Formspree
    const formData = new FormData();
    formData.append('name', this.formData.name);
    formData.append('email', this.formData.email);
    formData.append('subject', this.formData.subject);
    formData.append('message', this.formData.message);

    // Send to Formspree
    fetch('https://formspree.io/f/mdkdeaow', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        this.submitSuccess = true;
        this.submitMessage = 'The message has been sent successfully. I\'ll get in touch with you soon!';
        this.resetForm();
      } else {
        throw new Error('Failed to send message');
      }
    })
    .catch(error => {
      this.submitSuccess = false;
      this.submitMessage = 'An error occurred while sending the message. Please try again later.';
    })
    .finally(() => {
      this.isSubmitting = false;
    });
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
