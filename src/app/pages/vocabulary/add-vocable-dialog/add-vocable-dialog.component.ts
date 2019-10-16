import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {VocableModel} from '../../../models/vocable.model';

export interface AddVocableDialog {
    firstMeaning: string;
    secondMeaning: string;
}


@Component({
    selector: 'app-add-vocable-dialog',
    templateUrl: './add-vocable-dialog.component.html',
    styleUrls: ['./add-vocable-dialog.component.scss']
})
export class AddVocableDialogComponent implements OnInit {

    public firstMeaning: string;
    public secondMeaning: string;

    constructor(
        public dialogRef: MatDialogRef<AddVocableDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: AddVocableDialog) {
    }

    ngOnInit() {
        this.firstMeaning = this.data.firstMeaning;
        this.secondMeaning = this.data.secondMeaning;
    }

    public save(): void {
        this.dialogRef.close({
            firstMeaning: this.firstMeaning,
            secondMeaning: this.secondMeaning
        } as VocableModel);
    }

}
