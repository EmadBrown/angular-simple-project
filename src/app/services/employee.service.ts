import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../classes/employee";
import { DatePipe } from "@angular/common";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  private url = "http://i875395.hera.fhict.nl/api/410456/employee";

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  // get request API
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  // Store a new post in API request
  saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, employee, httpOptions);
  }

  // Remove a department API request
  removeEmployee(id: number): Observable<any> {
    return this.http.delete<any>(this.url + "?id=" + id, httpOptions);
  }

  // Update departments
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      this.url + "?id=" + employee.id,
      employee,
      httpOptions
    );
  }

  // Get departments by id
  fetchEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.url + "?id=" + id);
  }

  // Get Format 
  getFormatDate(date: string): string {
    return this.datePipe.transform(date, "y-MM-d");
  }
}
