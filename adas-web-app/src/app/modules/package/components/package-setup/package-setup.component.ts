import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { ValidationService } from '../../../../core/services/validation.service';
import { PackageMasterComponent } from '../package-master/package-master.component';
import { PackageService } from '../../package.service';
import { ControlRoomService } from '../../../control-room/control-room.service';

@Component({
    selector: 'app-package-setup',
    templateUrl: './package-setup.component.html'
})
export class PackageSetupComponent implements OnInit {
    form!: FormGroup;
    isEdit = false;
    title = 'Add Package Details';
    controlRooms: any[] = [];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<PackageMasterComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private service: PackageService,
        private toast: ToastService,
        private crService: ControlRoomService
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            PackageId: [0],
            ControlRoomId: [null, Validators.required],

            StartLatitude: ['', [
                Validators.required,
                ValidationService.patternValidator(ValidationService.patterns.latitude, 'invalidLatitude'),
            ]],
            StartLongitude: ['', [
                Validators.required,
                ValidationService.patternValidator(ValidationService.patterns.longitude, 'invalidLongitude'),
            ]],
            StartChainage: ['', [
                Validators.required,
                ValidationService.patternValidator(ValidationService.patterns.chainage, 'invalidChainage'),
            ]],

            EndLatitude: ['', [
                Validators.required,
                ValidationService.patternValidator(ValidationService.patterns.latitude, 'invalidLatitude'),
            ]],
            EndLongitude: ['', [
                Validators.required,
                ValidationService.patternValidator(ValidationService.patterns.longitude, 'invalidLongitude'),
            ]],
            EndChainage: ['', [
                Validators.required,
                ValidationService.patternValidator(ValidationService.patterns.chainage, 'invalidChainage'),
            ]],

            DataStatus: [true, Validators.required]  // 1=Active default
        });

        if (this.data) {
            this.isEdit = true;
            this.title = 'Edit Package Details';
            const mappedData = {
                ...this.data,
                DataStatus: Number(this.data.DataStatus) === 1
            };
            this.form.patchValue(mappedData);
        }


        this.loadControlRooms();
    }

    save(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.toast.show('Please fill required fields correctly.', 'error');
            return;
        }

        const payload = this.form.value;
        this.service.savePackage(payload).subscribe({
            next: (res: any) => {
                this.toast.show(res?.AlertMessage || 'Package saved successfully!', 'success');
                this.dialogRef.close('saved');
            },
            error: () => this.toast.show('Failed to save package.', 'error')
        });
    }

    close(): void {
        this.dialogRef.close();
    }

    getError(controlName: string): string | null {
        const control: AbstractControl | null = this.form.get(controlName);
        return control ? ValidationService.getErrorMessage(control) : null;
    }

    private loadControlRooms(): void {
  this.crService.getAll().subscribe({
    next: (res: any) => {
      let records: any[] = [];

      // 🧩 Case 1: SP-style result (AlertData as JSON)
      if (Array.isArray(res) && res[0]?.AlertData) {
        try {
          records = JSON.parse(res[0].AlertData);
        } catch {
          records = [];
        }
      }
      // 🧩 Case 2: Single object
      else if (res && !Array.isArray(res)) {
        records = [res];
      }
      // 🧩 Case 3: Already an array
      else if (Array.isArray(res)) {
        records = res;
      }

      // ✅ Filter based on mode
      this.controlRooms = this.isEdit
        ? records
        : records.filter((r: any) => Number(r.DataStatus) === 1);

      console.log('✅ Control rooms loaded:', this.controlRooms);
    },
    error: (err) => {
      console.error('❌ Failed to load control rooms:', err);
      this.toast.show('Unable to load control rooms.', 'error');
    }
  });
}


}
