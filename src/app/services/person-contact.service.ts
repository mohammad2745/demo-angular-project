import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonContactService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public insertData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }
}
