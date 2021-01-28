import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userFound :  Array <any> = [];
  userID :  any;
  user_id : any;

  constructor( private apiService : ApiserviceService ,  private route: ActivatedRoute) {
    this.userID = this.route
    .queryParams
    .subscribe(params => {
      this.user_id = params['user_id'];
    });
    this.getAllUser();
   }

  ngOnInit(): void {
  }

  getAllUser()
  {
    this.userFound = [];
    this.apiService.getAllUser().subscribe((data)=>{
      if(data['status'])
      {
        data['results'].forEach(user => {
          if(user._id == this.user_id)
          {
            this.userFound.push(user)
          }
        });
      }
      console.log(this.userFound,"user Array")
    })
  }

  ngOnDestroy() {
    this.userID.unsubscribe();
  }

}
