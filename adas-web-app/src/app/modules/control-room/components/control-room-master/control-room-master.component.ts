import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ControlRoomService } from '../../control-room.service';
import { ControlRoomSetupComponent } from '../control-room-setup/control-room-setup.component';

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
    { headerName: 'Chainage', field: 'Chainage', width: 120 },
    { headerName: 'Latitude', field: 'Latitude', width: 120 },
    { headerName: 'Longitude', field: 'Longitude', width: 120 },
    {
      headerName: 'Status',
      field: 'DataStatus',
      width: 120,
      cellRenderer: (p: any) => {
        const isActive = Number(p.value) === 1;
        return `<span style="color:${isActive ? 'green' : 'red'}; font-weight:600">
                ${isActive ? 'Active' : 'Inactive'}
              </span>`;
      }
    },
    {
      headerName: 'Action',
      width: 100,
      cellRenderer: () =>
        `<button class="btn-edit" title="Edit">
         <i class="mdi mdi-pencil"></i>
       </button>`
    }
  ];

  gridOptions: GridOptions = {
    theme: 'legacy' as any,   // 👈 important fix for v34 CSS themes
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
  constructor(private service: ControlRoomService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  onQuickFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim().toLowerCase();
    this.gridApi?.setGridOption('quickFilterText', value);
  }

  toggleFilter(): void {

  }

  refreshGrid(): void {
    this.loadData();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    if (!this.rowData || this.rowData.length === 0) {
      this.gridApi.showNoRowsOverlay();
    }
  }

  loadData(): void {
    this.service.getAll().subscribe({
      next: (res) => {
        this.rowData = res || [];
        console.log(this.rowData)
        if (this.gridApi) {
          this.rowData.length === 0
            ? this.gridApi.showNoRowsOverlay()
            : this.gridApi.hideOverlay();
        }
      },
      error: (err) => {
        this.gridApi?.showNoRowsOverlay();
      }
    });
  }

  openDialog(data: any = null): void {
    const dialogRef = this.dialog.open(ControlRoomSetupComponent, {
      width: '500px',
      data
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'saved') {
        this.loadData();
      }
    });
  }
}
