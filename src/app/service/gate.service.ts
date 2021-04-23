import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GateService {
readonly APIUrl="http://localhost:50000/api";

  constructor(private http:HttpClient) {

   }
   getList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/user');
   }
}
