import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ControlRoomService } from '../../control-room.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ValidationService } from '../../../../core/services/validation.service';

@Component({
    selector: 'app-control-room-setup',
    templateUrl: './control-room-setup.component.html'
})
export class ControlRoomSetupComponent implements OnInit {
    form!: FormGroup;
    isEdit = false;
    title = 'Add Control Room';

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ControlRoomSetupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private service: ControlRoomService,
        private toast: ToastService
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            ControlRoomId: [0],
            ControlRoomName: ['', [Validators.required]],
            Location: ['', [Validators.required]],
            Latitude: [
                '',
                [
                    Validators.required,
                    ValidationService.patternValidator(ValidationService.patterns.latitude, 'invalidLatitude'),
                ],
            ],
            Longitude: [
                '',
                [
                    Validators.required,
                    ValidationService.patternValidator(ValidationService.patterns.longitude, 'invalidLongitude'),
                ],
            ],
            Chainage: [
                '',
                [
                    Validators.required,
                    ValidationService.patternValidator(ValidationService.patterns.chainage, 'invalidChainage'),
                ],
            ],
            DataStatus: [true],
        });


        if (this.data) {
            this.isEdit = true;
            this.title = 'Edit Control Room';
            this.form.patchValue(this.data);
        }
    }

    save(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.toast.show('Please fill required fields correctly.', 'error');
            return;
        }

        const payload = this.form.value;
        this.service.saveControlRoom(payload).subscribe((res: any) => {
            this.toast.show(res?.AlertMessage || 'Saved successfully!', 'success');
            this.dialogRef.close('saved');
        });
    }

    close(): void {
        this.dialogRef.close();
    }

    getError(controlName: string): string | null {
        const control: AbstractControl | null = this.form.get(controlName);
        return control ? ValidationService.getErrorMessage(control) : null;
    }
}
