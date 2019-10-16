import {Component, OnInit} from '@angular/core';
import {UnitService} from '../../services/unit.service';
import {VocableModel} from '../../models/vocable.model';
import {VocableService} from '../../services/vocable.service';
import {MatDialog} from '@angular/material';
import {AddUnitDialog, AddUnitDialogComponent} from './add-unit-dialog/add-unit-dialog.component';
import {AddVocableDialog, AddVocableDialogComponent} from './add-vocable-dialog/add-vocable-dialog.component';

@Component({
    selector: 'app-vocabulary',
    templateUrl: './vocabulary.component.html',
    styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit {

    public units: UnitModel[];
    public vocables: Map<number, VocableModel[]>;

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

    private async initVocables(): Promise<void> {
        this.vocables = new Map();
        for (const unit of this.units) {
            this.vocables.set(unit.id, await this.vocableService.getAllFromUnit(unit));
        }
    }

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
        this.vocables.delete(unit.id);
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
                    this.vocables.get(unit.id).unshift(result);
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
        this.vocables.get(unit.id).splice(index, 1);
        this.vocableService.remove(vocable).catch(
            (error) => {
                console.error(error);
            }
        );
    }


}
