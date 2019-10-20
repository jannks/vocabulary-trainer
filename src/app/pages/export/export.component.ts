import {Component, OnInit} from '@angular/core';
import {UnitService} from '../../services/unit.service';
import {VocableService} from '../../services/vocable.service';
import {ExportUnitModel, ExportVocableModel} from '../../models/export.model';

@Component({
    selector: 'app-export',
    templateUrl: './export.component.html',
    styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

    public activeExport: boolean;
    public downloadReady: boolean;
    public units: UnitModel[];
    public selectedUnits: UnitModel[];

    constructor(
        private unitService: UnitService,
        private vocableService: VocableService) {
    }

    ngOnInit() {
        this.activeExport = false;
        this.downloadReady = false;
        this.selectedUnits = [];

        this.unitService.getAll().then(
            (units: UnitModel[]) => {
                this.units = units;
            }
        );
    }

    public async prepareFile(): Promise<void> {
        if (this.selectedUnits.length < 1 || this.activeExport) {
            return;
        }

        this.activeExport = true;
        this.downloadReady = false;
        const exportUnits: ExportUnitModel[] = [];

        for (const unit of this.selectedUnits) {

            const exportUnit: ExportUnitModel = {name: unit.name, vocables: []};
            const vocables = await this.vocableService.getAllFromUnit(unit)

            if (vocables) {
                for (const vocable of vocables) {
                    exportUnit.vocables.push({
                        firstMeaning: vocable.firstMeaning,
                        secondMeaning: vocable.secondMeaning
                    } as ExportVocableModel);
                }
            }

            exportUnits.push(exportUnit);
        }

        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportUnits));
        const element = document.getElementById('downloadLink');

        await element.setAttribute('href', dataStr);
        await element.setAttribute('download', 'units.json');

        this.activeExport = false;
        this.downloadReady = true;
    }

}
