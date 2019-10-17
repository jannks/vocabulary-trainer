import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VocabularyComponent} from './pages/vocabulary/vocabulary.component';
import {VocabularyTestComponent} from './pages/vocabulary-test/vocabulary-test.component';


const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'vocabulary'},
    {path: 'vocabulary', component: VocabularyComponent},
    {path: 'vocabulary-test/:id', component: VocabularyTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
