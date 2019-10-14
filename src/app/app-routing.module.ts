import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VocabularyComponent} from './pages/vocabulary/vocabulary.component';


const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'vocabulary'},
    {path: 'vocabulary', component: VocabularyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
