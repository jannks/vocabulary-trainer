import {NgModule} from '@angular/core';

import {
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    MatMenuModule
} from '@angular/material';

@NgModule({
    imports: [
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatListModule,
        MatDialogModule,
        MatInputModule,
        MatExpansionModule,
        MatCardModule,
        MatMenuModule
    ],
    exports: [
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatDialogModule,
        MatInputModule,
        MatExpansionModule,
        MatCardModule,
        MatMenuModule
    ]
})

export class CustomMaterialModule {
}
