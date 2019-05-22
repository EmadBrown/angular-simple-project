export interface Task {
  id: number,
  department_id: number,
  name: string,
  employees: number[], // array of id of employees assigned to this task
  due_date: string
}
