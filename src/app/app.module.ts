import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomMaterialModule} from "./material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { VocabularyComponent } from './pages/vocabulary/vocabulary.component';
import { NavbarComponent } from './elements/navbar/navbar.component';
import {DexieService} from './services/dexie.service';

@NgModule({
  declarations: [
    AppComponent,
    VocabularyComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FlexLayoutModule
  ],
  providers: [
      DexieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
