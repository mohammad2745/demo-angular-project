import { Component } from '@angular/core';
import { PersonContactService } from '../services/person-contact.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private personContactService: PersonContactService) {}

  formData = {
    email: '',
    message: ''
  };

  formSubmitted = false;

  submitForm() {
    this.formSubmitted = true;
    console.log("form data", this.formData, this.personContactService);

    this.personContactService.insertData(this.formData).subscribe(
      (response) => {
        console.log('Data inserted successfully:', response);
      },
      (error) => {
        console.error('Error inserting data:', error);
      }
    );
  }
}
