import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './components/tasks/tasks.component';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';



const routes: Routes = [
  {path: 'tasks', component: TasksComponent},
  {path: '', component: DepartmentComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'dashboard', component: DashboardComponent}


  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
