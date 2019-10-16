import {Injectable} from '@angular/core';
import Dexie from 'dexie';
import {DexieService} from './dexie.service';
import {VocableModel} from '../models/vocable.model';

@Injectable({
    providedIn: 'root'
})
export class VocableService {

    private table: Dexie.Table<VocableModel, number>;

    constructor(private dexieService: DexieService) {
        this.table = this.dexieService.table('vocables');
    }

    public getAll(): Promise<VocableModel[]> {
        return this.table.reverse().toArray();
    }

    public getAllFromUnit(unit: UnitModel): Promise<VocableModel[]> {
        return this.table.where('unitId').equals(unit.id).reverse().toArray();
    }

    public add(vocable: VocableModel): Promise<number> {
        return this.table.add(vocable);
    }

    public update(vocable: VocableModel): Promise<number> {
        return this.table.update(vocable.id, vocable);
    }

    public remove(vocable: VocableModel): Promise<void> {
        return this.table.delete(vocable.id);
    }

    public bulkRemove(vocables: VocableModel[]): Promise<number> {
        const ids: number[] = [];
        for (const vocable of vocables) {
            ids.push(vocable.id);
        }
        return this.table.where('id').anyOf(ids).delete();
    }

    public removeAllFromUnit(unit: UnitModel): Promise<number> {
        return this.table.where('unitId').equals(unit.id).delete();
    }
}
