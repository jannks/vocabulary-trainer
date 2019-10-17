import {Injectable} from '@angular/core';
import Dexie from 'dexie';
import {DexieService} from './dexie.service';

@Injectable({
    providedIn: 'root'
})
export class UnitService {

    private table: Dexie.Table<UnitModel, number>;

    constructor(private dexieService: DexieService) {
        this.table = this.dexieService.table('units');
    }

    public get(id: number): Promise<UnitModel> {
        return this.table.where('id').equals(id).first();
    }

    public getAll(): Promise<UnitModel[]> {
        return this.table.reverse().toArray();
    }

    public add(unit: UnitModel): Promise<number> {
        return this.table.add(unit);
    }

    public update(unit: UnitModel): Promise<number> {
        return this.table.update(unit.id, unit);
    }

    public remove(unit: UnitModel): Promise<void> {
        return this.table.delete(unit.id);
    }
}
