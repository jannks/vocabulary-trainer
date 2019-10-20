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
    MatDividerModule,
    MatPaginatorModule
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
        MatDividerModule,
        MatPaginatorModule
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
        MatDividerModule,
        MatPaginatorModule
    ]
})

export class CustomMaterialModule {
}
