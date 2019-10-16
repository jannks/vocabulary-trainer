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

@NgModule({
    declarations: [
        AppComponent,
        VocabularyComponent,
        NavbarComponent,
        AddVocableDialogComponent,
        AddUnitDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CustomMaterialModule,
        FlexLayoutModule,
        FormsModule
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
