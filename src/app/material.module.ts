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
    MatMenuModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDividerModule
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
        MatMenuModule,
        MatTabsModule,
        MatSnackBarModule,
        MatDividerModule
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
        MatMenuModule,
        MatTabsModule,
        MatSnackBarModule,
        MatDividerModule
    ]
})

export class CustomMaterialModule {
}
