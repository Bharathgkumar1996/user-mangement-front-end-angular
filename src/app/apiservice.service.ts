import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { Router } from '@angular/router';
import { map,catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  baseUrl : string = 'http://localhost:3000';
  constructor(private http : HttpClient,private router: Router) { }

  getAllUser()
  {
   return this.http.get(`${this.baseUrl}/user/getall`)
  }

  createUser(userObj)
  {
    return this.http.post(`${this.baseUrl}/user/create`,userObj)
  }

  getUserBy(userDetail)
  {
    return this.http.post(`${this.baseUrl}/user/find`,userDetail)
  }
}
