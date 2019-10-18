import {Component, OnInit} from '@angular/core';
import {ExportUnitModel} from '../../models/export.model';
import {UnitService} from '../../services/unit.service';
import {VocableService} from '../../services/vocable.service';

@Component({
    selector: 'app-import',
    templateUrl: './import.component.html',
    styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

    public activeImport: boolean;
    public units: ExportUnitModel[];
    public selectedUnits: ExportUnitModel[];

    constructor(
        private unitService: UnitService,
        private vocableService: VocableService) {
    }

    ngOnInit() {
        this.activeImport = false;
        this.units = [];
        this.selectedUnits = [];
    }

    public fileUploadEvent(evt: any) {
        if (!evt.target) {
            return;
        }
        if (!evt.target.files) {
            return;
        }
        if (evt.target.files.length !== 1) {
            return;
        }
        const file = evt.target.files[0];

        const reader = new FileReader();
        reader.onload = (loadEvent: any) => {
            try {
                this.units = JSON.parse(loadEvent.target.result);
                this.selectedUnits = [];
            } catch (error) {
                console.error(error);
            }
        };
        reader.readAsText(file);
    }

    public async save(): Promise<void> {
        if (this.selectedUnits.length < 1 || this.activeImport) {
            return;
        }

        this.activeImport = true;

        for (const unit of this.selectedUnits) {
            const id: number = await this.unitService.add({name: unit.name});
            for (const vocable of unit.vocables) {
                await this.vocableService.add({
                    firstMeaning: vocable.firstMeaning,
                    secondMeaning: vocable.secondMeaning,
                    unitId: id
                });
            }
        }

        this.selectedUnits = [];
        this.units = [];
        this.activeImport = false;
    }

}
