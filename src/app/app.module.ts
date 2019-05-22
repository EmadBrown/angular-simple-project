import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms"; // <-- ng model lives here
import { NgbModule } from "@ng-bootstrap/ng-bootstrap"; // Bootstrap widgets
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; // Angular Material
import {
  MatTabsModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule
} from "@angular/material"; // Angular Material

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TasksComponent } from "./components/tasks/tasks.component";
import { DepartmentComponent } from "./components/department/department.component";
import { EmployeesComponent } from "./components/employees/employees.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DataTableComponent } from "./data-table/data-table.component";
import { FilterPipe } from "./pipe/filter.pipe";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { FlatpickrModule } from "angularx-flatpickr";
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    DepartmentComponent,
    EmployeesComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    DataTableComponent,
    FilterPipe,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,

    FormsModule,
    FlatpickrModule.forRoot(),

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),

    // import ng-bootstrap
    NgbModule,
    // import platform-browser
    BrowserAnimationsModule,

    // import Angular Material
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule
  ],
  providers: [DatePipe, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
