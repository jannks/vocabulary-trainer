import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface AddUnitDialog {
    name: string;
}

@Component({
    selector: 'app-add-unit-dialog',
    templateUrl: './add-unit-dialog.component.html',
    styleUrls: ['./add-unit-dialog.component.scss']
})
export class AddUnitDialogComponent implements OnInit {

    public name: string;

    constructor(
        public dialogRef: MatDialogRef<AddUnitDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: AddUnitDialog) {
    }

    ngOnInit() {
        this.name = this.data.name;
    }

    public save(): void {
        this.dialogRef.close({
            name: this.name
        } as UnitModel);
    }

}
