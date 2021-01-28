import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.scss']
})
export class FindUserComponent implements OnInit {
  userFound :  Array <any> = [];
  userID :  any;
  user_id : any;

  constructor( private apiService : ApiserviceService ,  private route: ActivatedRoute) {
    this.userID = this.route
    .queryParams
    .subscribe(params => {
      this.user_id = params['search_term'];
    });
    
   }

  ngOnInit(): void {
    this.userGot();
  }


  userGot()
  {
    this.apiService.getUserBy(this.user_id).subscribe((data)=>{
      if(data['status'])
      {
        let search_obj = {
          user_number : this.user_id
        }
        this.apiService.getUserBy(search_obj).subscribe((data)=>{
          if(data['status'])
          {
            this.userFound = [];
            this.userFound.push(data['data'])
          }
        })
      }
    })
  }
  

  ngOnDestroy() {
    this.userID.unsubscribe();
  }

}

