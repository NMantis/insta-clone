import { NgModule } from '@angular/core';
import { Tab2Page } from './tab2.page';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    SharedModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page, ModalComponent]
})
export class Tab2PageModule {}
