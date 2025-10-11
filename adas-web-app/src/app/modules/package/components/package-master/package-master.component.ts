import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { PackageService } from '../../package.service';
import { PackageSetupComponent } from '../package-setup/package-setup.component';


@Component({
  selector: 'app-package-master',
  templateUrl: 'package-master.component.html'
})
export class PackageMasterComponent implements OnInit {
  rowData: any[] = [];
  columnDefs: ColDef[] = [
  { headerName: '#', valueGetter: 'node.rowIndex + 1', width: 70 },
  { headerName: 'Control Room', field: 'ControlRoomName', sortable: true, filter: true },

  // 🔹 Combined Chainage
  {
    headerName: 'Chainage',
    width: 160,
    valueGetter: (p) =>
      `${(p.data?.StartChainage ?? 0).toFixed(3)} - ${(p.data?.EndChainage ?? 0).toFixed(3)}`
  },

  // 🔹 Combined Coordinates
  {
    headerName: 'Coordinates',
    width: 280,
    cellRenderer: (p: any) => {
      const sLat = p.data?.StartLatitude?.toFixed(6) ?? '0.000000';
      const sLon = p.data?.StartLongitude?.toFixed(6) ?? '0.000000';
      const eLat = p.data?.EndLatitude?.toFixed(6) ?? '0.000000';
      const eLon = p.data?.EndLongitude?.toFixed(6) ?? '0.000000';
      return `<span>(${sLat}, ${sLon}) → (${eLat}, ${eLon})</span>`;
    }
  },

  // 🔹 Status with color
  {
    headerName: 'Status',
    field: 'DataStatus',
    width: 120,
    cellRenderer: (p: any) => {
      const val = Number(p.value);
      const map: Record<number, { color: string; text: string }> = {
        1: { color: 'green', text: 'Active' },
        2: { color: 'orange', text: 'Inactive' },
        0: { color: 'red', text: 'Deleted' },
      };
      const { color, text } = map[val] || { color: 'gray', text: 'Unknown' };
      return `<span style="color:${color};font-weight:600">${text}</span>`;
    },
  },

  // 🔹 Action buttons
  {
    headerName: 'Action',
    width: 100,
    cellRenderer: () =>
      `<button class="btn-edit" title="Edit">
         <i class="mdi mdi-pencil text-[#E53935] text-lg"></i>
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
  constructor(private service: PackageService, private dialog: MatDialog) { }

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
    const dialogRef = this.dialog.open(PackageSetupComponent, {
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
