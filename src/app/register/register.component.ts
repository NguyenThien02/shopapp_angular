import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  phone: string = '';
  password: string = '';
  retypePassword: string = '';
  fullName: string = '';
  address: string = '';
  isAccepted: boolean = false;
  dateOfBirth: Date;

  constructor() {
    this.phone;
    this.password;
    this.retypePassword;
    this.fullName;
    this.address;
    this.isAccepted;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  onPhoneChange() {
    console.log(`Phone typed: ${this.phone}`);
  }

  register() {
    const message = `phone: ${this.phone}` +
      `fullName: ${this.fullName}`;

    alert(message);
  }
}
