import { Component, OnInit, ViewChild } from "@angular/core";
import { Employee } from "../../classes/employee";
import { EmployeeService } from "../../services/employee.service";
import { DepartmentService } from "../../services/department.service";
import { Department } from "../../classes/department";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"]
})
export class EmployeesComponent implements OnInit {
  showEmployeeForm: boolean = false;
  submit: string = "Create";
  employees: Employee[];
  departments: Department[];
  term: string;
  keys: string[] = ["id", "first_name", "last_name"];
  key: string = this.keys[0];

  @ViewChild("employeeForm") form: any;
  employee: Employee = {
    id: null,
    department_id: null,
    first_name: null,
    last_name: null,
    birth_date: null
  };

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.fetchEmployees();
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  onSelect(employee: Employee) {
    this.showEmployeeForm = true;
    this.employee.first_name = employee.first_name;
    this.employee.last_name = employee.last_name;
    this.employee.department_id = employee.department_id;
    this.employee.birth_date = employee.birth_date;

    this.submit = "Update";
  }

  createEmployee() {
    this.showEmployeeForm =
      this.submit === "Update" ? true : !this.showEmployeeForm;
    this.employee.first_name = null;
    this.employee.last_name = null;
    this.employee.department_id = null;
    this.employee.birth_date = null;

    this.submit = "Create";
  }

  onDelete(employee: Employee) {
    if (confirm("Are you sure?")) {
      this.employeeService.removeEmployee(employee.id).subscribe(
        val => {},
        response => {
          confirm("DELETE call in error" + response);
        },
        // The DELETE observable is now completed.
        () => {
          this.removeEmployeeById(employee);
        }
      );
    }
  }

  onSubmit({ value, valid }: { value: Employee; valid: boolean }) {
    if (!valid) {
      console.log("Form is not valid");
    } else {
      value.birth_date =  this.employeeService.getFormatDate(value.birth_date);
      // Create a employee
      if (this.submit === "Create") {
        this.employeeService
          .saveEmployee(value as Employee)
          .subscribe(employees => {
            this.fetchEmployees();
          });
      }
      // Update a employee
      else {
        this.employeeService.updateEmployee(value as Employee).subscribe(
          Employee => {},
          response => {
            confirm("UPDATE call in error");
          },
          // The Update observable is now completed.
          () => {
            confirm("The Update observable is now completed");
            this.fetchEmployees();
          }
        );
      }
      this.form.reset();
    }
  }

  fetchEmployees(): void {
    // get all the departments
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

  removeEmployeeById(employee: Employee): void {
    this.employees.forEach((cur, index) => {
      if (employee.id === cur.id) {
        this.employees.splice(index, 1);
      }
    });
  }

  replaceUnderscores(value: string): string {
    return value.replace(/_/g, " ");
  }
}
