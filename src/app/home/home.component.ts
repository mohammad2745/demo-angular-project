import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  formData = {
    name: '',
    message: ''
  };

  formSubmitted = false;

  submitForm() {
    this.formSubmitted = true;
  }
}
