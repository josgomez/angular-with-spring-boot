import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  sendToken(){     
        let resp: string;
        this.authService.getData().subscribe({
          next: data => {
              if(!data.hasError){         
                resp = data.response            
              }
          },
          error: error => {
            console.log('object 1');;
            
          },
          complete: () => {  
            console.log('object 2');      
          } 
      })
  

  }

}
