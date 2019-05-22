import { Component, OnInit, ViewChild } from "@angular/core";
import { Department } from "../../classes/department";
import { DepartmentService } from "../../services/department.service";
import { EmployeeService } from "../../services/employee.service";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.css"]
})
export class DepartmentComponent implements OnInit {
  departments: Department[];
  showDepartmentForm: boolean = false;
  submit: string = "Create";
  term: string;
  keys: string[] = ["id", "name", "building"];
  key: string = this.keys[0];

  @ViewChild("departmentForm") form: any;

  department: Department = {
    id: null,
    name: null,
    building: null,
    employees: null
  };

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.fetchDepartments();
  }

  fetchDepartments(): void {
    // get all the departments
    this.departmentService
      .getDepartments()
      .subscribe(departments => (this.departments = departments));
  }

  onSelect(department: Department) {
    this.showDepartmentForm = true;
    this.department.id = department.id;
    this.department.name = department.name;
    this.department.building = department.building;
    this.submit = "Update";
  }

  createDepartment() {
    this.showDepartmentForm =
      this.submit === "Update" ? true : !this.showDepartmentForm;
    this.department.id = null;
    this.department.name = null;
    this.department.building = null;
    this.submit = "Create";
  }

  onDelete(department: Department) {
    if (confirm("Are you sure?")) {
      this.departmentService.removeDepartment(department.id).subscribe(
        val => {},
        response => {
          confirm("DELETE call in error" + response);
        },
        // The DELETE observable is now completed.
        () => {
          this.removeDepartmentById(department);
        }
      );
    }
  }

  removeDepartmentById(department: Department) {
    this.departments.forEach((cur, index) => {
      if (department.id === cur.id) {
        this.departments.splice(index, 1);
      }
    });
  }

  onSubmit({ value, valid }: { value: Department; valid: boolean }) {
    if (!valid) {
      console.log("Form is not valid");
    } else {
      // Create a department
      if (this.submit === "Create") {
        this.departmentService
          .saveDepartment(value as Department)
          .subscribe(department => {
            this.fetchDepartments();
          });
      }
      // Update a department
      else {
        this.departmentService.updateDepartment(value as Department).subscribe(
          department => {},
          response => {
            confirm("UPDATE call in error");
          },
          // The Update observable is now completed.
          () => {
            confirm("The Update observable is now completed");
            this.fetchDepartments();
          }
        );
      }
      this.form.reset();
    }
  }
}
