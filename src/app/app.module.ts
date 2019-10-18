import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {VocabularyComponent} from './pages/vocabulary/vocabulary.component';
import {NavbarComponent} from './elements/navbar/navbar.component';
import {DexieService} from './services/dexie.service';
import {AddVocableDialogComponent} from './pages/vocabulary/add-vocable-dialog/add-vocable-dialog.component';
import { AddUnitDialogComponent } from './pages/vocabulary/add-unit-dialog/add-unit-dialog.component';
import {FormsModule} from '@angular/forms';
import { VocabularyTestComponent } from './pages/vocabulary-test/vocabulary-test.component';
import { ImportComponent } from './pages/import/import.component';
import { ExportComponent } from './pages/export/export.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        VocabularyComponent,
        NavbarComponent,
        AddVocableDialogComponent,
        AddUnitDialogComponent,
        VocabularyTestComponent,
        ImportComponent,
        ExportComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CustomMaterialModule,
        FlexLayoutModule,
        FormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    entryComponents: [
        AddVocableDialogComponent,
        AddUnitDialogComponent
    ],
    providers: [
        DexieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
