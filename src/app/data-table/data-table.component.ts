import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { DataTableDataSource } from "./data-table-datasource";
import { MatTableDataSource } from "@angular/material";
import { Observable } from "rxjs";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.css"]
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  @Input() displayedColumnsData: string[];
  @Input() pageSizeData: number;
  @Input() pageSizeOptionsData: number[];
  @Input() data: any;

  displayedColumns: string[] = null;
  pageSize: number = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  test: string[] = null;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes["data"]) {
      this.displayedColumns = this.displayedColumnsData;

      this.pageSize =
        this.pageSizeData == null ? this.pageSize : this.pageSizeData;
      this.pageSizeOptions =
        this.pageSizeOptionsData == null
          ? this.pageSizeOptions
          : this.pageSizeOptionsData;
      this.dataSource = new DataTableDataSource(
        this.paginator,
        this.sort,
        this.data,
        this.displayedColumns
      );
    }
  }

  replaceUnderscores(value: string): string {
    return value.replace(/_/g, " ");
  }
}
