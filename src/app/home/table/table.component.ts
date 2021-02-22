import { Zones } from './../../model/zone.model';
import { TableDialogComponent } from './table-dialog/table-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tables } from 'src/app/model/table.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'zone', 'seat', 'action'];
  dataSource = new MatTableDataSource<Tables>(ELEMENT_DATA);
  table: Tables;
  zone: Zones;

  constructor(private http: HttpClient, public dialog: MatDialog) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getTable();
    this.getZone();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getZone(): void {
    this.http.get(`${environment.apiUrl}zones`).subscribe((res: Zones) => {
      this.zone = res;
    });
  }

  getTable(): void {
    this.http.get(`${environment.apiUrl}tables`).subscribe((res: Tables[]) => {
      this.dataSource.data = res;
    });
  }

  openDialog(method: string, element?: Tables): void {
    if (method === 'editTable') {
      const dialogRef = this.dialog.open(TableDialogComponent, {
        data: { method: method, table: element, zone: this.zone },
      });
    } else if (method === 'addTable') {
      const dialogRef = this.dialog.open(TableDialogComponent, {
        data: { method: method, zone: this.zone },
      });
    }

    this.dialog.afterAllClosed.subscribe((res) => {
      this.getTable();
    });
  }

  editData(element: Tables): void {
    this.openDialog('editTable', element);
  }

  deleteData(element: Tables): void {
    this.http
      .delete(`${environment.apiUrl}tables/` + element.id)
      .subscribe((res) => {
        console.log('Table ' + element.table_number + ' has delete!');
        this.getTable();
      });
  }
}

const ELEMENT_DATA: Tables[] = [];
