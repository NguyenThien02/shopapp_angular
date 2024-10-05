import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from '../../dtos/users/login.dto';
import { UserService } from '../../services/user.service';
import { LoginResponse } from 'src/app/responses/user/LoginResponse';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string = '';
  password: string = '';

  constructor(private router: Router, 
    private userService: UserService,
    private tokenService: TokenService){

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
      next: (response: LoginResponse) => {
        debugger
        const {token} = response;
        // this.router.navigate(['/login']);
        this.tokenService.setToken(token);
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
