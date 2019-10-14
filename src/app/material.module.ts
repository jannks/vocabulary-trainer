import {NgModule} from '@angular/core';

import {
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule
} from '@angular/material';

@NgModule({
    imports: [
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatListModule
    ],
    exports: [
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatListModule
    ]
})

export class CustomMaterialModule {
}
