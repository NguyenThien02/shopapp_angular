import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  phone: string = '';
  password: string = '';
  retypePassword: string = '';
  fullName: string = '';
  address: string = '';
  isAccepted: boolean = false;
  dateOfBirth: Date;

  constructor(private router: Router, private userService: UserService) {
    this.phone = "0384503232";
    this.password = "12345678";
    this.retypePassword = "12345678";
    this.fullName = "nguyen thien";
    this.address = "Thanh Hoa";
    this.isAccepted = true;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  onPhoneChange() {
    console.log(`Phone typed: ${this.phone}`);
  }

  register() {
    const message = `phone: ${this.phone}` +
      `fullName: ${this.fullName}`;
    // alert(message);
    debugger
    const registerData = {
      "fullname": this.fullName,
      "phone_number": this.phone,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1
    }
    this.userService.register(this.userService).subscribe({
      next: (response: any) => {
        debugger
        this.router.navigate(['/login']);
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {   
        //xử lý lỗi nếu có
        alert(`Cannot register, error: ${error.error}`)      
      }
    })
  }

  //how to check password match ?
  checkPasswordsMatch() {
    if (this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword']
        .setErrors({ 'passwordMismatch': true });
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }

  //Kiểm tra đủ 18 tuổi chưa
  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({ 'invalidAge': true });
      } else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }
}
