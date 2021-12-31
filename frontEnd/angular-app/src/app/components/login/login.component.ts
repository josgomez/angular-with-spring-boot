import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faLock = faLock;

  errorLogin = '';

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['admin']);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.errorLogin='';
      let resp: string;
      this.authService.login(this.loginForm.value).subscribe({
        next: data => {
            if(!data.hasError){         
              resp = data.response            
            }
        },
        error: error => {
          this.errorLogin = 'Failed to login';
          throwError(() => new Error(this.errorLogin))
        },
        complete: () => {  
          if(resp.length > 0){
            this.authService.setToken(resp);
            this.router.navigate(['/admin']);  
          }      
        } 
    })
    
    }
  }

}
