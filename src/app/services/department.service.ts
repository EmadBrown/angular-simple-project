import { Injectable } from "@angular/core";
import { Department } from "../classes/department";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private url = 'http://i875395.hera.fhict.nl/api/410456/department';

  constructor( private http: HttpClient) {}

  // get request API
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url);
  }

  // Store a new post in API request
  saveDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.url, department, httpOptions);
  }

  // Remove a department API request
  removeDepartment(id: number): Observable<Department> {
    return this.http.delete<Department>(this.url + '?id=' + id, httpOptions);
  }

  // Update departments
  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(this.url + '?id=' + department.id, department, httpOptions);
  }

  // Get departments by id
  fetchDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(this.url + '?id=' + id);
  }

}
