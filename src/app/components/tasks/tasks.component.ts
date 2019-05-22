import { Component, OnInit, ViewChild } from "@angular/core";
import { Task } from "../../classes/Task";
import { TaskService } from "../../services/task.service";
import { DepartmentService } from "../../services/department.service";
import { FilterPipe } from "../../pipe/filter.pipe";
import { post } from "selenium-webdriver/http";
import { Employee } from "./../../classes/employee";
import { Department } from "./../../classes/department";
import { EmployeeService } from "../../services/employee.service";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"]
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  employees: Employee[];
  departments: Department[];
  showTaskForm: boolean = false;
  submit: string = "Create";
  term: string;
  keys: string[] = ["id", "name", "department_id"];
  key: string = this.keys[0];

  @ViewChild("taskForm") form: any;

  task: Task = {
    id: null,
    department_id: null,
    name: null,
    employees: null,
    due_date: null
  };

  constructor(
    private taskService: TaskService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.fetchTask();
    // get Departments data
    this.departmentService
      .getDepartments()
      .subscribe(values => (this.departments = values));

    // get Employees data
    this.employeeService
      .getEmployees()
      .subscribe(values => (this.employees = values));
  }

  fetchTask(): void {
    //Get all the tasks
    this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks));
  }



  onSubmit({ value, valid }: { value: Task; valid: boolean }) {
    if (!valid) {
      console.log("Form is not valid");
    }
    // Add new Task
    else {
      // Create date due date for task
      value.due_date = this.taskService.getCurrentDate();
      value.department_id = 1500;

      if (this.submit === "Create") {
        this.taskService.saveTask(value as Task).subscribe(task => {
          this.fetchTask();
        });
      }
      // Update target task
      else {
        this.taskService.updateTask(value as Task).subscribe(
          task => {},
          response => {
            confirm("UPDATE call in error");
          },
          // The Update observable is now completed.
          () => {
            confirm("The Update observable is now completed");
            this.fetchTask();
          }
        );
      }
      this.form.reset();
    }
  }

  // Upper form create new task
  createTask() {
    this.showTaskForm = this.submit === "Update" ? true : !this.showTaskForm;
    this.task.id = null;
    this.task.name = null;
    this.task.employees = null;
    this.submit = "Create";
  }

  // Upper form update existing task
  onSelect(task: Task) {
    this.showTaskForm = true;
    this.task.id = task.id;
    this.task.name = task.name;
    this.submit = "Update";
  }

  // Remove target task form the tasks array
  onDelete(task: Task) {
    if (confirm("Are you sure?")) {
      this.taskService.removeTask(task.id).subscribe(
        val => {},
        response => {
          confirm("DELETE call in error" + response);
        },
        // The DELETE observable is now completed.
        () => {
          this.removeTaskById(task);
        }
      );
    }
  }

  removeTaskById(task: Task): void {
    this.tasks.forEach((cur, index) => {
      if (task.id === cur.id) {
        this.tasks.splice(index, 1);
      }
    });
  }
}
