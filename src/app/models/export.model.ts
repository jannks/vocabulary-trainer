export interface ExportUnitModel {
    name: string;
    vocables: ExportVocableModel[];
}

export interface ExportVocableModel {
    firstMeaning: string;
    secondMeaning: string;
}
