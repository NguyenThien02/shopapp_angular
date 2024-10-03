import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from '../dtos/users/login.dto';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService){

  }
  onPhoneNumberChange() {
    console.log(`Phone typed: ${this.phoneNumber}`);
  }
  login(){
    debugger
    const loginDTO: LoginDTO = {
      "password": this.password,
      "phone_number": this.phoneNumber
    } 
    this.userService.login(loginDTO).subscribe({
      next: (response: any) => {
        debugger
        // this.router.navigate(['/login']);
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {   
        //xử lý lỗi nếu có
        alert(`Cannot login, error: ${error.error}`)      
      }
    })
  }
}
