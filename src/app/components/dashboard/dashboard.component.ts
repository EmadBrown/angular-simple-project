import { Component, OnInit, ViewChild } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { Task } from "../../classes/Task";
import { Department } from "../../classes/department";
import { Employee } from "../../classes/employee";
import { DepartmentService } from "../../services/department.service";
import { EmployeeService } from "../../services/employee.service";
import { MatPaginator, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  viewDate: Date = new Date();
  events = [];
  tab: number = 1;
  dataSourceTasks: any = null;
  tasks: Task[];
  departments: Department[];
  employees: Employee[];
  dataSource: any;

  displayColumnsTasks: string[] = [
    "id",
    "name",
    "department_id",
    "employees",
    "due_date"
  ];
  displayColumnsDepartments: string[] = ["id", "name", "building", "employees"];
  displayColumnsEmployees: string[] = [
    "id",
    "department_id",
    "first_name",
    "last_name",
    "birth_date"
  ];

  constructor(
    private taskService: TaskService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks));    
    this.departmentService.getDepartments().subscribe(departments => (this.departments = departments)); 
    this.employeeService.getEmployees().subscribe(employees => (this.employees = employees));    
  }

  // Change status of employee, department or task
  changeStatus(obj: any) {
    obj.isActive = !obj.isActive;
  }

  applyFilter(filterValue: string) {
    this.dataSourceTasks.filter = filterValue.trim().toLowerCase();
  }
}
