import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
// import { ControlRoomService } from '../../../core/services/controlroom.service';
// import { ControlRoomFormComponent } from './control-room-form.component';

@Component({
  selector: 'app-control-room-master',
  templateUrl: 'control-room-master.component.html'
})
export class ControlRoomMasterComponent implements OnInit {
  rowData: any[] = [];
  columnDefs: ColDef[] = [
    { headerName: '#', valueGetter: 'node.rowIndex + 1', width: 70 },
    { headerName: 'Control Room', field: 'ControlRoomName', sortable: true, filter: true },
    { headerName: 'Location', field: 'Location', sortable: true, filter: true },
    { headerName: 'Incharge', field: 'InchargeName', sortable: true },
    { headerName: 'Contact', field: 'ContactNumber', sortable: true },
    {
      headerName: 'Status',
      field: 'Status',
      width: 100,
      cellRenderer: (p: any) =>
        `<span style="color:${p.value ? 'green' : 'red'}; font-weight:600">
          ${p.value ? 'Active' : 'Inactive'}
        </span>`
    },
    {
      headerName: 'Action',
      width: 100,
      cellRenderer: () =>
        `<button class="btn-edit" mat-icon-button title="Edit">
          <mat-icon>edit</mat-icon>
        </button>`
    }
  ];

  gridOptions = {
    sortable: true,
    filter: true,
    resizable: true,
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 25, 50, 100],
    onCellClicked: (event: any) => {
      if (event.colDef.headerName === 'Action') {
        this.openDialog(event.data);
      }
    }
  };

noRowsTemplate = `
  <div class="no-rows-message">
    <i class="mdi mdi-information-outline text-4xl text-gray-400"></i>
    <p>No data available</p>
  </div>
`;
  private gridApi!: GridApi;
  // constructor(private service: ControlRoomService, private dialog: MatDialog) {}
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  onQuickFilter(event: any): void {
  const value = event.target.value;
  //this.gridApi?.setQuickFilter(value);
}

toggleFilter(): void {
  // const current = this.gridOptions?.isFilterVisible ?? true;
  // this.gridApi?.setGridOption('isFilterVisible', !current);
  // this.gridApi?.setFilterModel(null); // optional: reset filters
}

refreshGrid(): void {
  this.loadData();
}

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    if (!this.rowData || this.rowData.length === 0) {
      this.gridApi.showNoRowsOverlay();
    }
  }

  loadData(): void {
    // Example static test (replace with API)
    // this.service.getAll().subscribe({
    //   next: (res) => {
    //     this.rowData = res || [];
    //     if (this.gridApi) {
    //       this.rowData.length === 0
    //         ? this.gridApi.showNoRowsOverlay()
    //         : this.gridApi.hideOverlay();
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Failed to load control room data:', err);
    //     this.gridApi?.showNoRowsOverlay();
    //   }
    // });
  }

  openDialog(data: any = null): void {
    // const dialogRef = this.dialog.open(ControlRoomFormComponent, {
    //   width: '500px',
    //   data
    // });
    //
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 'saved') {
    //     this.loadData();
    //   }
    // });
  }
}
