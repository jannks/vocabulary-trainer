import Dexie from 'dexie';

export class DexieService extends Dexie {
    constructor() {
        super('VocabularyTrainer');
        this.version(1).stores({
            units: '++id, name',
            vocables: '++id, unitId, firstMeaning, secondMeaning'
        });
    }
}
