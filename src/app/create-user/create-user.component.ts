import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl,FormGroupDirective} from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm : FormGroup;
  submitted = false;
  userList : Array <any> = [];
  searchForm : FormGroup;
  searchSubmitted = false;

  constructor(private router : Router,private _formBuilder: FormBuilder , private apiService : ApiserviceService) {
    this.userForm = this._formBuilder.group({
      user_name:['', [Validators.required,Validators.minLength(5)]],
      user_number: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      user_address : ['',[Validators.required,Validators.minLength(5)]]
    });

    this.searchForm = this._formBuilder.group({
      search_employee:['', [Validators.required]],
    });

    this.getAllUser();
   }

  ngOnInit(): void {
  }

  get f()   { return this.userForm.controls };
  get s()   { return this.searchForm.controls };


  addUser()
  {
    this.submitted = true;
    if(this.userForm.valid)
    {
     this.apiService.createUser(this.userForm.getRawValue()).subscribe((data) => {
       if(data['status'])
       {
        
        alert("User Added Sucessfully!!");
        this.userForm.reset();
        this.getAllUser();
        this.userForm.controls['user_name'].setErrors(null);
        this.userForm.controls['user_number'].setErrors(null);
        this.userForm.controls['user_address'].setErrors(null);
       }
       else{
        alert(data['data']);
       }
     })
    }
    else{
      alert("Please Fill User Create Form With All needed Details")
    }
  }


  getAllUser()
  {
    this.apiService.getAllUser().subscribe((data)=>{
      if(data['status'])
      {
        this.userList = [];
        data['results'].forEach(user => {
          this.userList.push(user)
        });
      }
      this.userList.sort((a, b) => a.user_name.localeCompare(b.user_name));
    })
  }


  changeUser(event)
  {
    this.router.navigate(['/user-details'],{ queryParams: { user_id : event.target.value }});
  }

  searchUser()
  {
    this.searchSubmitted = true;
  if(this.searchForm.valid)
  {
    this.router.navigate(['/find-user'],{ queryParams: { search_term: this.searchForm.get('search_employee').value }});
  }
  }
}
