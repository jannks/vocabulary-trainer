import {Component, OnInit} from '@angular/core';
import {UnitService} from '../../services/unit.service';
import {VocableModel} from '../../models/vocable.model';
import {VocableService} from '../../services/vocable.service';
import {MatDialog, PageEvent} from '@angular/material';
import {AddUnitDialog, AddUnitDialogComponent} from './add-unit-dialog/add-unit-dialog.component';
import {AddVocableDialog, AddVocableDialogComponent} from './add-vocable-dialog/add-vocable-dialog.component';

export interface VocablePage {
    vocables: VocableModel[];
    vocableLength: number;
    size: number;
    index: number;
}

@Component({
    selector: 'app-vocabulary',
    templateUrl: './vocabulary.component.html',
    styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit {

    public defaultPageSize = window.innerWidth < 960 ? 3 : 12;
    public pageSizeOptions = [3, 6, 12, 24, 48];

    public units: UnitModel[];
    public vocablePages: Map<number, VocablePage>;

    constructor(
        private unitService: UnitService,
        private vocableService: VocableService,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.unitService.getAll().then(
            (units: UnitModel[]) => {
                this.units = units;
                this.initVocables().catch(
                    (error) => {
                        console.error(error);
                    }
                );
            }
        );
    }

    // Controls

    private async initVocables(): Promise<void> {
        this.vocablePages = new Map();
        for (const unit of this.units) {
            this.vocablePages.set(unit.id, {
                vocables: await this.vocableService.getUnitRange(unit, 0, this.defaultPageSize),
                vocableLength: await this.vocableService.getUnitSize(unit),
                size:  this.defaultPageSize,
                index: 0
            } as VocablePage);
        }
    }

    public async pageChange(event: PageEvent, unit: UnitModel): Promise<void> {
        const page = this.vocablePages.get(unit.id);
        page.size = event.pageSize;
        page.index = event.pageIndex;
        page.vocables = await this.vocableService.getUnitRange(unit, page.size * page.index, page.size);
    }

    // Service

    public addUnit(): void {
        const dialogRef = this.dialog.open(AddUnitDialogComponent, {
            minWidth: '280px',
            data: {
                name: ''
            } as AddUnitDialog
        });
        dialogRef.afterClosed().subscribe(
            (result: UnitModel) => {
                if (result !== null) {
                    this.units.unshift(result);
                    this.unitService.add(result).then(
                        (id: number) => {
                            result.id = id;
                            this.vocablePages.set(id,  {
                                vocables: [],
                                vocableLength: 0,
                                size:  this.defaultPageSize,
                                index: 0
                            } as VocablePage);
                        });
                }
            });
    }

    public updateUnit(unit: UnitModel): void {
        const dialogRef = this.dialog.open(AddUnitDialogComponent, {
            minWidth: '300px',
            data: {
                name: unit.name
            } as AddUnitDialog
        });
        dialogRef.afterClosed().subscribe(
            (result: UnitModel) => {
                if (result !== null) {
                    unit.name = result.name;
                    this.unitService.update(unit).catch(
                        (error) => {
                            console.error(error);
                        }
                    );
                }
            });
    }

    public deleteUnit(unit: UnitModel, index: number): void {
        this.units.splice(index, 1);
        this.vocablePages.delete(unit.id);
        this.unitService.remove(unit).catch(
            (error) => {
                console.error(error);
            }
        );
    }

    public addVocable(unit: UnitModel): void {
        const dialogRef = this.dialog.open(AddVocableDialogComponent, {
            minWidth: '300px',
            data: {
                firstMeaning: '',
                secondMeaning: ''
            } as AddVocableDialog
        });
        dialogRef.afterClosed().subscribe(
            (result: VocableModel) => {
                if (result !== null) {
                    result.unitId = unit.id;

                    const page = this.vocablePages.get(unit.id);
                    if (page.vocables.length >= page.size) {
                        page.vocables.pop();
                    }
                    page.vocables.unshift(result);
                    page.vocableLength++;

                    this.vocableService.add(result).then(
                        (id: number) => {
                            result.id = id;
                        });
                }
            });
    }

    public updateVocable(vocable: VocableModel): void {
        const dialogRef = this.dialog.open(AddVocableDialogComponent, {
            minWidth: '300px',
            data: {
                firstMeaning: vocable.firstMeaning,
                secondMeaning: vocable.secondMeaning
            } as AddVocableDialog
        });
        dialogRef.afterClosed().subscribe(
            (result: VocableModel) => {
                if (result !== null) {
                    vocable.firstMeaning = result.firstMeaning;
                    vocable.secondMeaning = result.secondMeaning;
                    this.vocableService.update(vocable).catch(
                        (error) => {
                            console.error(error);
                        }
                    );
                }
            });
    }

    public deleteVocable(vocable: VocableModel, index: number, unit: UnitModel): void {
        const page = this.vocablePages.get(unit.id);
        page.vocables.splice(index, 1);
        page.vocableLength--;
        this.vocableService.remove(vocable).then(
            () => {
                if (page.vocableLength >= page.size) {
                    this.vocableService.getUnitRange(unit, page.size * page.index, page.size).then(
                        (vocables: VocableModel[]) => {
                            page.vocables = vocables;
                        }
                    );
                }
            }
        );
    }


}
