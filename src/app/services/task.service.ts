import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import "rxjs/add/operator/map";
import { Task } from "../classes/Task";
import { DatePipe } from "@angular/common";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class TaskService {
  private url = "http://i875395.hera.fhict.nl/api/410456/task";

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  // Get request APi
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  // Store a new post in API request
  saveTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task, httpOptions);
  }

  // Remove a task API request
  removeTask(id: number): Observable<Task> {
    return this.http.delete<Task>(this.url + "?id=" + id, httpOptions);
  }

  // Update task
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.url + "?id=" + task.id, task, httpOptions);
  }

  // Get task by id
  fetchTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(this.url + "?id=" + id);
  }

  // Get current date with medium format EX: output - Feb 14, 2019, 3:45:06 PM
  getCurrentDate(): string {
    return this.datePipe.transform(new Date(), "y,MM,d:h:mm");
  }
  
}
