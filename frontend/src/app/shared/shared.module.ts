import { DirectivesModule } from './directives/directives.module';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        DirectivesModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule
    ],
    exports: [
        FormsModule,
        IonicModule,
        CommonModule,
        ReactiveFormsModule,
        DirectivesModule
    ]

})
export class SharedModule {

    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule
        }
    }
}
